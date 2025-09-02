// Email authentication functions

// Guest login function
function loginAsGuest() {
    // Create guest user data
    const guestData = {
        isGuest: true,
        displayName: "Guest",
        isLoggedIn: true
    };
    
    // Save guest user data to local storage
    localStorage.setItem('user', JSON.stringify(guestData));
    return true;
}

// Email and password login function
function loginWithEmail(email, password) {
    // Check for existing user data in local storage
    const storedUsers = localStorage.getItem('users');
    
    if (storedUsers) {
        const users = JSON.parse(storedUsers);
        const user = users.find(u => u.email === email);
        
        // Verify user exists and password is correct
        if (user && user.password === password) {
            // Update user data ensuring meme coins data is available
            const userData = {
                email: user.email,
                displayName: user.displayName || user.name,
                isLoggedIn: true,
                memeCoins: user.memeCoins || {},  // Meme coins balance (created if not exists)
                purchaseHistory: user.purchaseHistory || [],  // Purchase history (created if not exists)
                flashExpiry: user.flashExpiry !== undefined ? user.flashExpiry : null
            };
            
            // Update last login time
            user.lastLogin = new Date().toISOString();
            localStorage.setItem('users', JSON.stringify(users));
            
            // Save current user data to local storage
            localStorage.setItem('user', JSON.stringify(userData));
            return true;
        }
    }
    return false;
}

// Register new user
function registerUser(name, email, password) {
    // In a real application, registration data would be sent to server
    // This is just a simple simulation for demonstration
    
    if (name && email && password) {
        // Check if user doesn't already exist
        let users = [];
        const storedUsers = localStorage.getItem('users');
        
        if (storedUsers) {
            users = JSON.parse(storedUsers);
            // Check if email doesn't already exist
            if (users.some(user => user.email === email)) {
                return false; // Email already exists
            }
        }
        
        // Add new user to users list with meme coins data
        users.push({
            name,
            email,
            password,
            balance: 0,
            memeCoins: {},  // Meme coins balance
            purchaseHistory: [],  // Purchase history
            flashExpiry: null,  // USDT-FLASH expiry date
            lastLogin: new Date().toISOString(),
            isGuest: false
        });
        
        // Save users list to local storage
        localStorage.setItem('users', JSON.stringify(users));
        
        // Save current user data to local storage
        const userData = {
            email: email,
            displayName: name,
            isLoggedIn: true
        };
        
        localStorage.setItem('user', JSON.stringify(userData));
        
        // Check if there's a redirect after registration
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

// Sign out function
function signOut() {
    localStorage.removeItem('user');
    // Determine correct path based on current page
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
        // Get updated name from settings
        const userSettings = JSON.parse(localStorage.getItem('userSettings') || '{}');
        const profilePicture = localStorage.getItem('profilePicture');
        
        // Get display name from settings first, then fallback to user data
        const displayName = userSettings.firstName && userSettings.lastName 
            ? `${userSettings.firstName} ${userSettings.lastName}`.trim()
            : user.displayName || user.name || 'User';
        
        // إذا كان المستخدم زائرًا، نعرض أيقونة مختلفة
        if (user.isGuest) {
            userInfoElement.innerHTML = `
                <a href="pages/profile.html" class="block">
                    <div class="flex items-center">
                        <div class="bg-gray-500 text-white rounded-full h-10 w-10 flex items-center justify-center text-lg font-bold" title="${displayName}">
                            <i class="fas fa-user-clock"></i>
                        </div>
                        <span class="mr-2 hidden md:block">${displayName}</span>
                    </div>
                </a>
            `;
        } else {
            if (profilePicture) {
                userInfoElement.innerHTML = `
                    <a href="pages/profile.html" class="block">
                        <div class="flex items-center">
                            <div class="w-10 h-10 rounded-full overflow-hidden border-2 border-white/20">
                                <img src="${profilePicture}" alt="Profile Picture" class="w-full h-full object-cover">
                            </div>
                            <span class="mr-2 hidden md:block text-white font-medium">${displayName}</span>
                        </div>
                    </a>
                `;
            } else {
                userInfoElement.innerHTML = `
                    <a href="pages/profile.html" class="block">
                        <div class="flex items-center">
                            <div class="bg-green-600 text-white rounded-full h-10 w-10 flex items-center justify-center text-lg font-bold" title="${displayName}">
                                ${displayName.charAt(0).toUpperCase()}
                            </div>
                            <span class="mr-2 hidden md:block text-white font-medium">${displayName}</span>
                        </div>
                    </a>
                `;
            }
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

// Update user info when settings change
function updateUserInfoFromSettings() {
    const userData = JSON.parse(localStorage.getItem('user') || '{}');
    if (userData.isLoggedIn) {
        showUserInfo(userData);
    }
}

// Listen for storage changes to update user info across tabs
window.addEventListener('storage', function(e) {
    if (e.key === 'userSettings' || e.key === 'profilePicture') {
        updateUserInfoFromSettings();
    }
});

// تنفيذ عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', function() {
    checkLoginStatus();
    
    // Check for settings updates every 2 seconds
    setInterval(updateUserInfoFromSettings, 2000);
    
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
                
                // Check if there's a selected card type to redirect to payment
                const selectedCardType = localStorage.getItem('selectedCardType');
                if (selectedCardType) {
                    localStorage.removeItem('selectedCardType');
                    const paymentPages = {
                        'classic': 'payment-classic.html',
                        'premium': 'payment-premium.html',
                        'gold': 'payment-elite.html'
                    };
                    window.location.href = paymentPages[selectedCardType] || 'payment-classic.html';
                } else {
                    window.location.href = "../index.html";
                }
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
