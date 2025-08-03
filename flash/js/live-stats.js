// تحديث الإحصائيات المباشرة ديناميكياً
function updateLiveStats() {
    // تحديث عدد المستخدمين المتصلين بأمان
    try {
        const userCounts = document.querySelectorAll('.user-count');
        userCounts.forEach(element => {
            if (element && element.textContent !== undefined) {
                const currentCount = parseInt(element.textContent) || 50;
                const change = Math.floor(Math.random() * 6) - 3; // تغيير من -3 إلى +3
                const newCount = Math.max(15, Math.min(150, currentCount + change));
                element.textContent = newCount;
            }
        });
    } catch (e) { /* ignore */ }

    // تحديث الإحصائيات الرئيسية بأمان
    try {
        const totalVolumeEl = document.querySelector('.total-volume');
        if (totalVolumeEl && totalVolumeEl.textContent !== undefined) {
            const volumes = ['$2.1M', '$2.3M', '$2.4M', '$2.6M', '$2.8M'];
            totalVolumeEl.textContent = volumes[Math.floor(Math.random() * volumes.length)];
        }
    } catch (e) { /* ignore */ }

    try {
        const avgTransactionEl = document.querySelector('.avg-transaction');
        if (avgTransactionEl && avgTransactionEl.textContent !== undefined) {
            const avg = Math.floor(Math.random() * 500) + 1000; // 1000-1500
            avgTransactionEl.textContent = '$' + avg.toLocaleString();
        }
    } catch (e) { /* ignore */ }

    try {
        const successRateEl = document.querySelector('.success-rate');
        if (successRateEl && successRateEl.textContent !== undefined) {
            const rates = ['99.6%', '99.7%', '99.8%', '99.9%'];
            successRateEl.textContent = rates[Math.floor(Math.random() * rates.length)];
        }
    } catch (e) { /* ignore */ }

    try {
        const responseTimeEl = document.querySelector('.response-time');
        if (responseTimeEl && responseTimeEl.textContent !== undefined) {
            const time = (Math.random() * 2 + 1.5).toFixed(1); // 1.5-3.5s
            responseTimeEl.textContent = time + 's';
        }
    } catch (e) { /* ignore */ }
}

// تشغيل التحديث عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', function() {
    // تحديث فوري
    updateLiveStats();
    
    // تحديث كل 3 ثواني
    setInterval(updateLiveStats, 3000);
    
    // تأثير الوميض عند التحديث
    setInterval(() => {
        const stats = document.querySelectorAll('.stat-number, .user-count');
        stats.forEach(stat => {
            stat.style.color = '#10b981';
            setTimeout(() => {
                stat.style.color = '';
            }, 200);
        });
    }, 3000);
});
