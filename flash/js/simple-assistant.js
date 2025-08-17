// 🤖 نظام المساعد الاحترافي المتطور
function initAssistant() {
    
    // إنشاء HTML المساعد
    const assistantHTML = `
        <div class="assistant-container">
            <div class="assistant-sidebar">
                <div class="sidebar-header">
                    <div class="logo-section">
                        <i class="fas fa-robot"></i>
                        <h3>USDT-FLASH Assistant</h3>
                        <span class="status-badge">🟢 متاح الآن</span>
                    </div>
                </div>
                
                <div class="questions-panel">
                    <h4>الأسئلة الشائعة</h4>
                    <div class="questions-grid">
                        <button class="question-card" data-msg="ما هي USDT-FLASH وكيف تعمل؟">
                            <div class="card-icon">⚡</div>
                            <div class="card-text">ما هي USDT-FLASH؟</div>
                        </button>
                        <button class="question-card" data-msg="أين يمكنني تخزين USDT-FLASH؟">
                            <div class="card-icon">💼</div>
                            <div class="card-text">أين أخزنها؟</div>
                        </button>
                        <button class="question-card" data-msg="كيف أحول USDT-FLASH إلى عملات ميم؟">
                            <div class="card-icon">🔄</div>
                            <div class="card-text">كيف أحولها؟</div>
                        </button>
                        <button class="question-card" data-msg="ما هي رسوم الخدمة 25%؟">
                            <div class="card-icon">💰</div>
                            <div class="card-text">رسوم الخدمة</div>
                        </button>
                        <button class="question-card" data-msg="كم مدة صلاحية USDT-FLASH؟">
                            <div class="card-icon">⏳</div>
                            <div class="card-text">مدة الصلاحية</div>
                        </button>
                        <button class="question-card" data-msg="لماذا يجب الانتظار 24 ساعة؟">
                            <div class="card-icon">⏰</div>
                            <div class="card-text">انتظار 24 ساعة</div>
                        </button>
                        <button class="question-card" data-msg="ما هي عملات الميم المدعومة؟">
                            <div class="card-icon">🐶</div>
                            <div class="card-text">عملات الميم</div>
                        </button>
                        <button class="question-card" data-msg="هل يمكنني بيع USDT-FLASH مباشرة؟">
                            <div class="card-icon">⚠️</div>
                            <div class="card-text">البيع المباشر</div>
                        </button>
                        <button class="question-card" data-msg="ما هي المنصات المدعومة؟">
                            <div class="card-icon">🎯</div>
                            <div class="card-text">المنصات المدعومة</div>
                        </button>
                        <button class="question-card" data-msg="كيف أتجنب فقدان رصيدي؟">
                            <div class="card-icon">🛡️</div>
                            <div class="card-text">تجنب الفقدان</div>
                        </button>
                        <button class="question-card" data-msg="هل USDT-FLASH آمن وموثوق؟">
                            <div class="card-icon">🔒</div>
                            <div class="card-text">الأمان والثقة</div>
                        </button>
                        <button class="question-card" data-msg="لماذا يثق الآلاف في USDT-FLASH؟">
                            <div class="card-icon">🎆</div>
                            <div class="card-text">لماذا الثقة؟</div>
                        </button>
                        <button class="question-card" data-msg="كيف أبدأ رحلة التداول؟">
                            <div class="card-icon">🚀</div>
                            <div class="card-text">بداية التداول</div>
                        </button>
                        <button class="question-card" data-msg="ما هو Web3 ولماذا مهم؟">
                            <div class="card-icon">🌐</div>
                            <div class="card-text">ما هو Web3؟</div>
                        </button>
                        <button class="question-card" data-msg="طرق الدفع المتاحة">
                            <div class="card-icon">💳</div>
                            <div class="card-text">طرق الدفع</div>
                        </button>
                        <button class="question-card" data-msg="الدعم الفني 24/7">
                            <div class="card-icon">🎧</div>
                            <div class="card-text">الدعم الفني</div>
                        </button>
                    </div>
                </div>
            </div>
            
            <div class="chat-main">
                <div class="chat-header">
                    <h2>💬 محادثة مباشرة</h2>
                    <button class="minimize-btn" id="minimizeBtn">🗕</button>
                </div>
                
                <div class="chat-messages" id="chatMessages">
                    <div class="welcome-message">
                        <div class="bot-avatar">🤖</div>
                        <div class="message-content">
                            <strong>مرحباً بك في USDT-FLASH Assistant!</strong><br>
                            اختر سؤالاً من القائمة أو اكتب سؤالك مباشرة
                        </div>
                    </div>
                </div>
                
                <div class="chat-input-area">
                    <div class="input-wrapper">
                        <input type="text" id="userInput" placeholder="اكتب سؤالك هنا..." autocomplete="off">
                        <button id="sendBtn" title="إرسال">
                            <i class="fas fa-paper-plane"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // إضافة HTML للصفحة
    const container = document.createElement('div');
    container.style.position = 'fixed';
    container.style.top = '0';
    container.style.left = '0';
    container.style.width = '100vw';
    container.style.height = '100vh';
    container.style.zIndex = '999999';
    container.innerHTML = assistantHTML;
    
    document.body.appendChild(container);
    
    // إخفاء محتوى الصفحة الأصلي
    document.body.style.overflow = 'hidden';
    
    // الحصول على العناصر
    const userInput = document.getElementById('userInput');
    const sendBtn = document.getElementById('sendBtn');
    const minimizeBtn = document.getElementById('minimizeBtn');
    const chatMessages = document.getElementById('chatMessages');
    const assistantContainer = document.querySelector('.assistant-container');
    
    // تصغير/تكبير النافذة
    let isMinimized = false;
    minimizeBtn.addEventListener('click', () => {
        isMinimized = !isMinimized;
        assistantContainer.classList.toggle('minimized', isMinimized);
        minimizeBtn.textContent = isMinimized ? '🗖' : '🗕';
        minimizeBtn.title = isMinimized ? 'تكبير' : 'تصغير';
        
        // إظهار/إخفاء محتوى الصفحة
        document.body.style.overflow = isMinimized ? 'auto' : 'hidden';
    });
    
    // إرسال رسالة
    function sendMessage() {
        const message = userInput.value.trim();
        if (!message) return;
        
        addMessage(message, 'user');
        userInput.value = '';
        
        setTimeout(() => {
            const response = getResponse(message);
            addMessage(response, 'bot');
        }, 800);
    }
    
    // إضافة رسالة
    function addMessage(text, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `chat-message ${sender}-message`;
        
        if (sender === 'user') {
            messageDiv.innerHTML = `
                <div class="user-avatar">👤</div>
                <div class="message-content user-content">${text}</div>
            `;
        } else {
            messageDiv.innerHTML = `
                <div class="bot-avatar">🤖</div>
                <div class="message-content bot-content">${text}</div>
            `;
        }
        
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
    
    // الحصول على رد
    function getResponse(message) {
        const msg = message.toLowerCase();
        
        if (msg.includes('ما هي usdt-flash') || msg.includes('كيف تعمل')) {
            return '<strong>⚡ USDT-FLASH هو رصيد رقمي ذكي وآمن</strong><br>• يعمل في بيئة Web3<br>• صالح لمدة 365 يوم<br>• يمنحك وصول سريع ومرن لمنصات التداول العالمية';
        }
        
        if (msg.includes('تخزين') || msg.includes('أين يمكنني')) {
            return '<strong>💼 يمكنك تخزين USDT-FLASH في:</strong><br>• MetaMask<br>• Trust Wallet<br>• Binance<br>• Bybit<br>• أي محفظة Web3 مدعومة';
        }
        
        if (msg.includes('تحويل') || msg.includes('عملات ميم')) {
            return '<strong>🔄 خطوات التحويل:</strong><br>1. استلم USDT-FLASH في محفظتك<br>2. حوّله إلى عملة ميم (PEPE, DOGE, SHIBA)<br>3. احتفظ بالعملة 24 ساعة<br>4. بع واحصل على USDT حقيقي';
        }
        
        if (msg.includes('رسوم') || msg.includes('25%')) {
            return '<strong>💰 رسوم الخدمة 25%:</strong><br>• يتم خصم 25% عند بيع عملة الميم<br>• هذه الرسوم بناء على اتفاقية رسمية<br>• بين منصتنا والبورصات الشريكة';
        }
        
        if (msg.includes('صلاحية') || msg.includes('365')) {
            return '<strong>⏳ مدة الصلاحية:</strong><br>• USDT-FLASH صالح لمدة 365 يوم<br>• من لحظة استلامه<br>• يمكنك استخدامه في أي وقت خلال هذه الفترة';
        }
        
        if (msg.includes('24 ساعة') || msg.includes('انتظار')) {
            return '<strong>⏰ لماذا الانتظار 24 ساعة؟</strong><br>• لضمان التفعيل الكامل للعملة<br>• لتجنب أي مشاكل تقنية<br>• لضمان حصولك على USDT حقيقي';
        }
        
        if (msg.includes('عملات الميم المدعومة')) {
            return '<strong>🐶 عملات الميم المدعومة:</strong><br>• PEPE - عملة الضفدع الشهيرة<br>• DOGE - عملة الكلب الرقمية<br>• SHIBA - عملة شيبا إينو<br>• جميعها مدعومة رسمياً';
        }
        
        if (msg.includes('بيع') && msg.includes('مباشرة')) {
            return '<strong>⚠️ لا تبع USDT-FLASH مباشرة!</strong><br>• يجب تحويله أولاً إلى عملة ميم<br>• وإلا ستفقد رصيدك<br>• اتبع الخطوات الصحيحة دائماً';
        }
        
        if (msg.includes('منصات') || msg.includes('مدعومة')) {
            return '<strong>🎯 المنصات المدعومة:</strong><br>• Binance - البورصة الأولى عالمياً<br>• Bybit - منصة تداول متقدمة<br>• OKX - بورصة عالمية موثوقة<br>• ومنصات أخرى كبرى';
        }
        
        if (msg.includes('تجنب') || msg.includes('فقدان')) {
            return '<strong>🛡️ قواعد مهمة لتجنب فقدان الرصيد:</strong><br>• لا تبع USDT-FLASH مباشرة<br>• لا ترسل باسم مستخدم - استخدم عنوان محفظة كامل<br>• استخدم محافظ Web3 فقط<br>• انتظر 24 ساعة بعد التحويل';
        }
        
        if (msg.includes('آمن') || msg.includes('موثوق')) {
            return '<strong>🔒 USDT-FLASH آمن وموثوق 100%:</strong><br>• متوافق مع Web3 بالكامل<br>• نظام شفاف بلا خدع<br>• مدعوم من منصات عالمية<br>• آلاف العملاء الراضين';
        }
        
        if (msg.includes('يثق') || msg.includes('آلاف')) {
            return '<strong>🎆 لماذا يثق الآلاف في USDT-FLASH:</strong><br>• آمن ومتوافق مع Web3<br>• يتحول بسهولة إلى USDT حقيقي<br>• الأرباح قابلة للاستخدام في أي بورصة<br>• نظام شفاف بلا تعقيد';
        }
        
        if (msg.includes('أبدأ') || msg.includes('رحلة')) {
            return '<strong>🚀 ابدأ رحلة التداول الآن:</strong><br>• احصل على USDT-FLASH<br>• ابدأ بثقة واستراتيجية ذكية<br>• حقق أرباح حقيقية<br>• كلما بدأت أبكر، زادت أرباحك!';
        }
        
        if (msg.includes('web3')) {
            return '<strong>🌐 Web3 - مستقبل الإنترنت:</strong><br>• أنت مالك بياناتك وأموالك<br>• لا وسطاء أو أطراف ثالثة<br>• حرية كاملة في التداول<br>• مستقبل العملات الرقمية';
        }
        
        if (msg.includes('دفع') || msg.includes('متاحة')) {
            return '<strong>💳 طريقة الدفع المتاحة:</strong><br>• TRC20 فقط<br>• شبكة TRON الآمنة والسريعة<br>• رسوم منخفضة جداً<br>• تأكيد فوري للمعاملات';
        }
        
        if (msg.includes('دعم') || msg.includes('24/7')) {
            return '<strong>🎧 الدعم الفني 24/7:</strong><br>• فريق متخصص محترف<br>• رد خلال دقائق<br>• دعم بعدة لغات<br>• حلول سريعة وفعالة';
        }
        
        return '<strong>🤖 شكراً لسؤالك!</strong><br>يمكنك اختيار أحد المواضيع أعلاه أو التواصل مع فريق الدعم للمساعدة المتخصصة.';
    }
    
    // مستمعات الأحداث
    sendBtn.addEventListener('click', sendMessage);
    userInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') sendMessage();
    });
    
    // الخيارات السريعة
    document.addEventListener('click', (e) => {
        const questionCard = e.target.closest('.question-card');
        if (questionCard) {
            const message = questionCard.dataset.msg;
            addMessage(message, 'user');
            setTimeout(() => {
                const response = getResponse(message);
                addMessage(response, 'bot');
            }, 800);
        }
    });
    
    console.log('✅ Assistant loaded');
}

// تشغيل عند الطلب فقط
window.initAssistant = initAssistant;