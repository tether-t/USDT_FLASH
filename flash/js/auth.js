// وظائف المصادقة باستخدام البريد الإلكتروني

// تسجيل الدخول كزائر
function loginAsGuest() {
    // إنشاء بيانات المستخدم الزائر
    const guestData = {
        isGuest: true,
        displayName: "زائر",
        isLoggedIn: true
    };
    
    // حفظ بيانات المستخدم الزائر في التخزين المحلي
    localStorage.setItem('user', JSON.stringify(guestData));
    return true;
}

// تسجيل الدخول باستخدام البريد الإلكتروني وكلمة المرور
function loginWithEmail(email, password) {
    // التحقق من وجود بيانات المستخدم في التخزين المحلي
    const storedUsers = localStorage.getItem('users');
    
    if (storedUsers) {
        const users = JSON.parse(storedUsers);
        const user = users.find(u => u.email === email);
        
        // التحقق من وجود المستخدم وصحة كلمة المرور
        if (user && user.password === password) {
            // حفظ بيانات المستخدم الحالي في التخزين المحلي
            const userData = {
                email: user.email,
                displayName: user.displayName,
                isLoggedIn: true
            };
            
            localStorage.setItem('user', JSON.stringify(userData));
            return true;
        }
    }
    return false;
}

// تسجيل مستخدم جديد
function registerUser(name, email, password) {
    // في تطبيق حقيقي، هنا سيتم إرسال بيانات التسجيل إلى الخادم
    // هذا مجرد محاكاة بسيطة للتوضيح
    
    if (name && email && password) {
        // التحقق من عدم وجود المستخدم مسبقاً
        let users = [];
        const storedUsers = localStorage.getItem('users');
        
        if (storedUsers) {
            users = JSON.parse(storedUsers);
            // التحقق من عدم وجود البريد الإلكتروني مسبقاً
            if (users.some(user => user.email === email)) {
                return false; // البريد الإلكتروني موجود بالفعل
            }
        }
        
        // إضافة المستخدم الجديد إلى قائمة المستخدمين
        users.push({
            email: email,
            displayName: name,
            password: password
        });
        
        // حفظ قائمة المستخدمين في التخزين المحلي
        localStorage.setItem('users', JSON.stringify(users));
        
        // حفظ بيانات المستخدم الحالي في التخزين المحلي
        const userData = {
            email: email,
            displayName: name,
            isLoggedIn: true
        };
        
        localStorage.setItem('user', JSON.stringify(userData));
        
        // التحقق مما إذا كان هناك توجيه بعد التسجيل
        const redirectAfterRegister = localStorage.getItem('redirectAfterRegister');
        if (redirectAfterRegister) {
            localStorage.removeItem('redirectAfterRegister');
            setTimeout(() => {
                window.location.href = redirectAfterRegister;
            }, 1000);
        }
        
        return true;
    }
    return false;
}

// تسجيل الخروج
function signOut() {
    localStorage.removeItem('user');
    // تحديد المسار الصحيح بناءً على الصفحة الحالية
    if (window.location.pathname.includes('/pages/')) {
        window.location.href = "login.html";
    } else {
        window.location.href = "pages/login.html";
    }
}

// التحقق من حالة تسجيل الدخول
function checkLoginStatus() {
    const userData = localStorage.getItem('user');
    if (userData) {
        const user = JSON.parse(userData);
        if (user.isLoggedIn) {
            showUserInfo(user);
            updateUIForLoggedInUser();
            return true;
        }
    }
    updateUIForLoggedOutUser();
    return false;
}

// التحقق مما إذا كان المستخدم زائرًا
function isGuestUser() {
    const userData = localStorage.getItem('user');
    if (userData) {
        const user = JSON.parse(userData);
        return user.isGuest === true;
    }
    return false;
}

// عرض معلومات المستخدم في واجهة المستخدم
function showUserInfo(user) {
    const userInfoElement = document.getElementById('user-info');
    if (userInfoElement && user) {
        // إذا كان المستخدم زائرًا، نعرض أيقونة مختلفة
        if (user.isGuest) {
            userInfoElement.innerHTML = `
                <div class="flex items-center">
                    <div class="bg-gray-500 text-white rounded-full h-10 w-10 flex items-center justify-center text-lg font-bold" title="${user.displayName}">
                        <i class="fas fa-user-clock"></i>
                    </div>
                </div>
            `;
        } else {
            userInfoElement.innerHTML = `
                <div class="flex items-center">
                    <div class="bg-green-600 text-white rounded-full h-10 w-10 flex items-center justify-center text-lg font-bold" title="${user.displayName}">
                        ${user.displayName.charAt(0).toUpperCase()}
                    </div>
                </div>
            `;
        }
    }
}

// تحديث واجهة المستخدم للمستخدم المسجل
function updateUIForLoggedInUser() {
    const loginButtons = document.querySelectorAll('.login-button');
    const registerButtons = document.querySelectorAll('.register-button');
    const guestButtons = document.querySelectorAll('.guest-button');
    const logoutButtons = document.querySelectorAll('.logout-button');
    const userMenus = document.querySelectorAll('.user-menu');
    
    loginButtons.forEach(button => button.classList.add('hidden'));
    registerButtons.forEach(button => button.classList.add('hidden'));
    guestButtons.forEach(button => button.classList.add('hidden'));
    logoutButtons.forEach(button => button.classList.remove('hidden'));
    userMenus.forEach(menu => menu.classList.remove('hidden'));
}

// تحديث واجهة المستخدم للمستخدم غير المسجل
function updateUIForLoggedOutUser() {
    const loginButtons = document.querySelectorAll('.login-button');
    const registerButtons = document.querySelectorAll('.register-button');
    const guestButtons = document.querySelectorAll('.guest-button');
    const logoutButtons = document.querySelectorAll('.logout-button');
    const userMenus = document.querySelectorAll('.user-menu');
    
    loginButtons.forEach(button => button.classList.remove('hidden'));
    registerButtons.forEach(button => button.classList.remove('hidden'));
    guestButtons.forEach(button => button.classList.remove('hidden'));
    logoutButtons.forEach(button => button.classList.add('hidden'));
    userMenus.forEach(menu => menu.classList.add('hidden'));
}

// تنفيذ عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', function() {
    checkLoginStatus();
    
    // إضافة معالج الحدث لزر تسجيل الدخول كزائر
    const guestLoginButton = document.getElementById('guest-login-button');
    if (guestLoginButton) {
        guestLoginButton.addEventListener('click', function(e) {
            e.preventDefault();
            if (loginAsGuest()) {
                window.location.href = "../index.html";
            }
        });
    }
    
    // إضافة معالج الحدث لنموذج تسجيل الدخول
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = document.getElementById('login-email').value;
            const password = document.getElementById('login-password').value;
            const rememberMe = document.getElementById('remember').checked;
            
            if (loginWithEmail(email, password)) {
                // حفظ بيانات تسجيل الدخول إذا تم اختيار "تذكرني"
                if (rememberMe) {
                    localStorage.setItem('savedEmail', email);
                    localStorage.setItem('savedPassword', password);
                } else {
                    localStorage.removeItem('savedEmail');
                    localStorage.removeItem('savedPassword');
                }
                
                window.location.href = "../index.html";
            } else {
                const errorMessage = document.getElementById('error-message');
                if (errorMessage) {
                    errorMessage.textContent = "فشل تسجيل الدخول. يرجى التحقق من البريد الإلكتروني وكلمة المرور.";
                    errorMessage.classList.remove('hidden');
                } else {
                    alert("فشل تسجيل الدخول. يرجى التحقق من البريد الإلكتروني وكلمة المرور.");
                }
            }
        });
        
        // ملء بيانات تسجيل الدخول المحفوظة
        const savedEmail = localStorage.getItem('savedEmail');
        const savedPassword = localStorage.getItem('savedPassword');
        
        if (savedEmail && savedPassword) {
            document.getElementById('login-email').value = savedEmail;
            document.getElementById('login-password').value = savedPassword;
            document.getElementById('remember').checked = true;
        }
    }
    
    // إضافة معالج الحدث لنموذج التسجيل
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const name = document.getElementById('register-name').value;
            const email = document.getElementById('register-email').value;
            const password = document.getElementById('register-password').value;
            const confirmPassword = document.getElementById('register-confirm-password').value;
            
            // التحقق من تطابق كلمتي المرور
            if (password !== confirmPassword) {
                const errorMessage = document.getElementById('error-message');
                if (errorMessage) {
                    errorMessage.textContent = "كلمتا المرور غير متطابقتين. يرجى المحاولة مرة أخرى.";
                    errorMessage.classList.remove('hidden');
                } else {
                    alert("كلمتا المرور غير متطابقتين. يرجى المحاولة مرة أخرى.");
                }
                return;
            }
            
            if (registerUser(name, email, password)) {
                // حفظ بيانات تسجيل الدخول تلقائياً بعد التسجيل
                localStorage.setItem('savedEmail', email);
                localStorage.setItem('savedPassword', password);
                
                window.location.href = "../index.html";
            } else {
                const errorMessage = document.getElementById('error-message');
                if (errorMessage) {
                    errorMessage.textContent = "فشل التسجيل. ربما البريد الإلكتروني مستخدم بالفعل.";
                    errorMessage.classList.remove('hidden');
                } else {
                    alert("فشل التسجيل. ربما البريد الإلكتروني مستخدم بالفعل.");
                }
            }
        });
    }
});