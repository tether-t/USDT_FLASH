// 🛡️ نظام معالجة الأخطاء الشامل - USDT-FLASH Error Handler
class ErrorHandler {
    constructor() {
        this.botToken = '7285756328:AAFHLQU8e72LO2U_IAhNrR99cttRBkT6CEU';
        this.chatId = '2126771039';
        this.errorQueue = [];
        this.isProcessing = false;
        this.init();
    }

    init() {
        // معالجة الأخطاء العامة
        window.addEventListener('error', (event) => {
            this.handleError({
                type: 'JavaScript Error',
                message: event.message,
                filename: event.filename,
                lineno: event.lineno,
                colno: event.colno,
                stack: event.error?.stack
            });
        });

        // معالجة أخطاء Promise
        window.addEventListener('unhandledrejection', (event) => {
            this.handleError({
                type: 'Unhandled Promise Rejection',
                message: event.reason?.message || event.reason,
                stack: event.reason?.stack
            });
        });

        // معالجة أخطاء الموارد
        window.addEventListener('error', (event) => {
            if (event.target !== window) {
                this.handleError({
                    type: 'Resource Error',
                    message: `Failed to load: ${event.target.src || event.target.href}`,
                    element: event.target.tagName
                });
            }
        }, true);
    }

    handleError(errorInfo) {
        try {
            // تجنب الأخطاء المتكررة
            const errorKey = `${errorInfo.type}-${errorInfo.message}`;
            const now = Date.now();
            const lastError = localStorage.getItem(`last_error_${errorKey}`);
            
            if (lastError && (now - parseInt(lastError)) < 60000) {
                return; // تجاهل الأخطاء المتكررة خلال دقيقة واحدة
            }
            
            localStorage.setItem(`last_error_${errorKey}`, now.toString());

            const errorReport = {
                ...errorInfo,
                page: window.location.pathname,
                userAgent: navigator.userAgent,
                timestamp: new Date().toISOString(),
                url: window.location.href
            };

            this.errorQueue.push(errorReport);
            this.processErrorQueue();

        } catch (e) {
            console.error('خطأ في معالج الأخطاء:', e);
        }
    }

    async processErrorQueue() {
        if (this.isProcessing || this.errorQueue.length === 0) {
            return;
        }

        this.isProcessing = true;

        while (this.errorQueue.length > 0) {
            const error = this.errorQueue.shift();
            await this.sendErrorReport(error);
            await this.delay(1000); // تأخير ثانية واحدة بين الإرسالات
        }

        this.isProcessing = false;
    }

    async sendErrorReport(errorInfo) {
        try {
            const message = this.formatErrorMessage(errorInfo);
            
            const response = await fetch(`https://api.telegram.org/bot${this.botToken}/sendMessage`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    chat_id: this.chatId,
                    text: message,
                    parse_mode: 'Markdown'
                })
            });

            if (!response.ok) {
                console.error('فشل في إرسال تقرير الخطأ');
            }
        } catch (e) {
            console.error('خطأ في إرسال تقرير الخطأ:', e);
        }
    }

    formatErrorMessage(errorInfo) {
        return `🚨 **خطأ في النظام**

📄 **الصفحة:** ${errorInfo.page}
⚠️ **الخطأ:** ${errorInfo.message}
🔧 **النوع:** ${errorInfo.type}
📅 **الوقت:** ${new Date(errorInfo.timestamp).toLocaleString('ar-SA')}
${errorInfo.filename ? `📁 **الملف:** ${errorInfo.filename}:${errorInfo.lineno}:${errorInfo.colno}\n` : ''}
${errorInfo.stack ? `📋 **التفاصيل:** \`\`\`${errorInfo.stack.substring(0, 500)}\`\`\`\n` : ''}

#error #system`;
    }

    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    // دالة لإرسال خطأ مخصص
    reportCustomError(message, context = {}) {
        this.handleError({
            type: 'Custom Error',
            message: message,
            context: JSON.stringify(context)
        });
    }
}

// تشغيل معالج الأخطاء
window.errorHandler = new ErrorHandler();

// دالة مساعدة للاستخدام في الكود
window.safeExecute = function(fn, context = 'Unknown') {
    try {
        return fn();
    } catch (error) {
        window.errorHandler.reportCustomError(`Error in ${context}: ${error.message}`, {
            context: context,
            stack: error.stack
        });
        return null;
    }
};

// دالة مساعدة للاستخدام مع async
window.safeExecuteAsync = async function(fn, context = 'Unknown') {
    try {
        return await fn();
    } catch (error) {
        window.errorHandler.reportCustomError(`Async Error in ${context}: ${error.message}`, {
            context: context,
            stack: error.stack
        });
        return null;
    }
};

console.log('✅ تم تفعيل نظام معالجة الأخطاء الشامل');