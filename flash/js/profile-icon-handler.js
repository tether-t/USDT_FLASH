// Profile Icon Handler - Manages profile icon behavior based on login status

class ProfileIconHandler {
    constructor() {
        this.init();
    }

    init() {
        this.updateProfileIcon();
        this.setupEventListeners();
    }

    // Update profile icon based on login status
    updateProfileIcon() {
        const userData = JSON.parse(localStorage.getItem('user') || '{}');
        const profileIcon = document.querySelector('.profile-icon i');
        const profileWrapper = document.querySelector('.pro-nav-icon');

        if (profileIcon && profileWrapper) {
            if (userData.email || userData.isLoggedIn) {
                // User is logged in - show profile icon
                profileIcon.className = 'fas fa-user-circle';
                profileWrapper.title = 'الملف الشخصي';
                profileWrapper.setAttribute('aria-label', 'الملف الشخصي');
                
                // Add logged-in styling
                profileWrapper.classList.add('logged-in');
            } else {
                // User is not logged in - show registration icon
                profileIcon.className = 'fas fa-user-plus';
                profileWrapper.title = 'تسجيل الدخول';
                profileWrapper.setAttribute('aria-label', 'تسجيل الدخول');
                
                // Remove logged-in styling
                profileWrapper.classList.remove('logged-in');
            }
        }
    }

    // Handle profile access
    handleProfileAccess() {
        const userData = JSON.parse(localStorage.getItem('user') || '{}');
        
        if (userData.email || userData.isLoggedIn) {
            // User is logged in, go to profile page
            window.location.href = 'pages/profile.html';
        } else {
            // User is not logged in, go to registration page
            window.location.href = 'pages/register.html';
        }
    }

    // Setup event listeners
    setupEventListeners() {
        // Listen for login status changes
        window.addEventListener('storage', (e) => {
            if (e.key === 'user') {
                this.updateProfileIcon();
            }
        });

        // Listen for custom events
        window.addEventListener('userLoggedIn', () => {
            this.updateProfileIcon();
        });

        window.addEventListener('userLoggedOut', () => {
            this.updateProfileIcon();
        });

        // Update icon periodically
        setInterval(() => {
            this.updateProfileIcon();
        }, 5000);
    }

    // Get user display info
    getUserDisplayInfo() {
        const userData = JSON.parse(localStorage.getItem('user') || '{}');
        const userSettings = JSON.parse(localStorage.getItem('userSettings') || '{}');
        const profilePicture = localStorage.getItem('profilePicture');

        const displayName = userSettings.firstName && userSettings.lastName 
            ? `${userSettings.firstName} ${userSettings.lastName}`.trim()
            : userData.name || userData.displayName || 'مستخدم';

        return {
            displayName,
            profilePicture,
            isLoggedIn: userData.email || userData.isLoggedIn
        };
    }

    // Add visual feedback for icon interaction
    addInteractionFeedback() {
        const profileWrapper = document.querySelector('.pro-nav-icon');
        
        if (profileWrapper) {
            profileWrapper.addEventListener('mouseenter', () => {
                profileWrapper.style.transform = 'translateY(-3px) scale(1.05)';
            });

            profileWrapper.addEventListener('mouseleave', () => {
                profileWrapper.style.transform = 'translateY(0) scale(1)';
            });

            profileWrapper.addEventListener('click', (e) => {
                e.preventDefault();
                
                // Add click animation
                profileWrapper.style.transform = 'translateY(0) scale(0.95)';
                setTimeout(() => {
                    profileWrapper.style.transform = 'translateY(-2px) scale(1.05)';
                }, 100);

                // Handle the click
                this.handleProfileAccess();
            });
        }
    }
}

// Initialize profile icon handler when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    const profileHandler = new ProfileIconHandler();
    
    // Make handleProfileAccess available globally
    window.handleProfileAccess = () => profileHandler.handleProfileAccess();
    
    // Add interaction feedback
    setTimeout(() => {
        profileHandler.addInteractionFeedback();
    }, 1000);
});

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ProfileIconHandler;
}