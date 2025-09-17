// ... existing code at the top ...

// عرض معلومات الملف الشخصي للمستخدم
function displayUserProfile() {
    const userData = JSON.parse(localStorage.getItem('user'));
    const users = JSON.parse(localStorage.getItem('users'));
    
    if (!userData || !users) return;

    // البحث عن بيانات المستخدم الكاملة
    const currentUser = users.find(user => user.email === userData.email);
    
    if (!currentUser) return;

    // ملء معلومات الحساب
    const accountInfo = document.querySelector('.grid-cols-1 .font-medium');
    if (accountInfo) {
        accountInfo.textContent = currentUser.name;
    }
    
    const emailInfo = document.querySelectorAll('.grid-cols-1 .font-medium')[1];
    if (emailInfo) {
        emailInfo.textContent = currentUser.email;
    }
    
    const registrationDate = document.querySelectorAll('.grid-cols-1 .font-medium')[2];
    if (registrationDate) {
        registrationDate.textContent = new Date(currentUser.lastLogin).toLocaleDateString();
    }
    
    const lastLogin = document.querySelectorAll('.grid-cols-2 .font-medium')[0];
    if (lastLogin) {
        lastLogin.textContent = new Date(currentUser.lastLogin).toLocaleString();
    }
    
    const accountType = document.querySelectorAll('.grid-cols-2 .font-medium')[1];
    if (accountType) {
        accountType.textContent = currentUser.isGuest ? 'زائر' : 'مسجل';
    }
    
    const accountLevel = document.querySelectorAll('.grid-cols-2 .font-medium')[2];
    if (accountLevel) {
        accountLevel.textContent = currentUser.isGuest ? 'أساسي' : 'مميز';
    }
    
    // ملء معلومات الرصيد
    const balanceAmount = document.querySelector('.from-blue-400.to-orange-500');
    if (balanceAmount) {
        balanceAmount.textContent = `${currentUser.balance || 0} USDT-FLASH`;
    }
    
    const balanceExpiry = document.querySelector('.mt-2 span:last-child');
    if (balanceExpiry) {
        balanceExpiry.textContent = `صلاحية حتى: ${currentUser.flashExpiry ? new Date(currentUser.flashExpiry).toLocaleDateString() : 'غير محدد'}`;
    }
    
    const memeCoinsCount = document.querySelector('.text-green-400 + .font-bold');
    if (memeCoinsCount) {
        const memeCoinCount = Object.keys(currentUser.memeCoins).length;
        memeCoinsCount.textContent = `${memeCoinCount} عملات`;
    }
}

// عرض سجل عمليات الشراء
function displayPurchaseHistory() {
    const userData = JSON.parse(localStorage.getItem('user'));
    const users = JSON.parse(localStorage.getItem('users'));
    
    if (!userData || !users) return;

    // البحث عن بيانات المستخدم الكاملة
    const currentUser = users.find(user => user.email === userData.email);
    
    if (!currentUser || !currentUser.purchaseHistory || currentUser.purchaseHistory.length === 0) {
        document.getElementById('purchase-history').innerHTML = `
            <tr>
                <td colspan="4" class="px-6 py-4 text-center text-gray-400">لا يوجد سجل عمليات شراء</td>
            </tr>
        `;
        return;
    }

    // إنشاء HTML لسجل العمليات
    let historyHTML = '';
    currentUser.purchaseHistory.forEach((purchase, index) => {
        historyHTML += `
            <tr class="hover:bg-gray-700/30 transition-colors">
                <td class="px-6 py-4 whitespace-nowrap font-medium">${purchase.packageName}</td>
                <td class="px-6 py-4 whitespace-nowrap">${new Date(purchase.date).toLocaleString()}</td>
                <td class="px-6 py-4 whitespace-nowrap">+${purchase.amount} USDT-FLASH</td>
                <td class="px-6 py-4 whitespace-nowrap">
                    <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-800 text-green-200">
                        ناجحة
                    </span>
                </td>
            </tr>
        `;
    });

    document.getElementById('purchase-history').innerHTML = historyHTML;
}
