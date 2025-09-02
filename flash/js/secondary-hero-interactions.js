// 🚀 Secondary Hero Header Interactions

// Profile Access Handler
function handleProfileAccess() {
    // Check if user is logged in
    const isLoggedIn = localStorage.getItem('userLoggedIn') === 'true';
    
    if (isLoggedIn) {
        // Open profile page
        window.open('pages/profile.html', '_blank');
    } else {
        // Show login modal or redirect to login
        showLoginModal();
    }
}

// Login Modal Function
function showLoginModal() {
    const modal = document.createElement('div');
    modal.className = 'login-modal-overlay';
    modal.innerHTML = `
        <div class="login-modal">
            <div class="login-modal-header">
                <h3>🔐 Login Required</h3>
                <button class="close-modal" onclick="this.closest('.login-modal-overlay').remove()">×</button>
            </div>
            <div class="login-modal-body">
                <p>Please login to access your profile</p>
                <div class="login-buttons">
                    <button class="btn-primary" onclick="redirectToLogin()">Login</button>
                    <button class="btn-secondary" onclick="this.closest('.login-modal-overlay').remove()">Cancel</button>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Add styles
    const style = document.createElement('style');
    style.textContent = `
        .login-modal-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.8);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
            backdrop-filter: blur(10px);
        }
        .login-modal {
            background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
            border-radius: 20px;
            padding: 30px;
            max-width: 400px;
            width: 90%;
            border: 1px solid rgba(255, 255, 255, 0.1);
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
        }
        .login-modal-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 20px;
        }
        .login-modal-header h3 {
            color: white;
            margin: 0;
            font-size: 18px;
        }
        .close-modal {
            background: none;
            border: none;
            color: white;
            font-size: 24px;
            cursor: pointer;
            padding: 0;
            width: 30px;
            height: 30px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 50%;
            transition: background 0.3s;
        }
        .close-modal:hover {
            background: rgba(255, 255, 255, 0.1);
        }
        .login-modal-body p {
            color: rgba(255, 255, 255, 0.8);
            margin-bottom: 20px;
            text-align: center;
        }
        .login-buttons {
            display: flex;
            gap: 15px;
            justify-content: center;
        }
        .login-buttons button {
            padding: 12px 24px;
            border: none;
            border-radius: 10px;
            cursor: pointer;
            font-weight: 600;
            transition: all 0.3s;
        }
        .btn-primary {
            background: linear-gradient(135deg, #10b981 0%, #059669 100%);
            color: white;
        }
        .btn-primary:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 25px rgba(16, 185, 129, 0.4);
        }
        .btn-secondary {
            background: rgba(255, 255, 255, 0.1);
            color: white;
            border: 1px solid rgba(255, 255, 255, 0.2);
        }
        .btn-secondary:hover {
            background: rgba(255, 255, 255, 0.2);
        }
    `;
    document.head.appendChild(style);
}

// Redirect to Login
function redirectToLogin() {
    window.location.href = 'pages/login.html';
}

// Initialize Hero Icons Interactions
document.addEventListener('DOMContentLoaded', function() {
    // Add click animations
    const heroCards = document.querySelectorAll('.hero-icon-card');
    
    heroCards.forEach(card => {
        card.addEventListener('click', function() {
            // Add click effect
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
        
        // Add keyboard support
        card.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
        
        // Make focusable
        card.setAttribute('tabindex', '0');
    });
    
    // Update notification badges dynamically
    updateNotificationBadges();
});

// Update Notification Badges
function updateNotificationBadges() {
    // Simulate dynamic badge updates
    const profileBadge = document.querySelector('.hero-icon-card .hero-badge');
    const newsBadge = document.querySelector('.hero-icon-card:last-child .hero-badge');
    
    // Check for new features or updates
    const hasNewFeatures = !localStorage.getItem('seenNewFeatures');
    if (hasNewFeatures && profileBadge) {
        profileBadge.textContent = 'NEW';
        profileBadge.style.display = 'block';
    }
    
    // Check for news updates
    const newsCount = getUnreadNewsCount();
    if (newsBadge && newsCount > 0) {
        newsBadge.textContent = newsCount;
        newsBadge.style.display = 'block';
    }
}

// Get Unread News Count
function getUnreadNewsCount() {
    // Simulate news count from localStorage or API
    const lastReadTime = localStorage.getItem('lastNewsRead') || '0';
    const currentTime = Date.now();
    const daysSinceLastRead = (currentTime - parseInt(lastReadTime)) / (1000 * 60 * 60 * 24);
    
    // Return simulated count based on days
    return Math.min(Math.floor(daysSinceLastRead), 9);
}

// Mark features as seen
function markFeaturesAsSeen() {
    localStorage.setItem('seenNewFeatures', 'true');
    const badge = document.querySelector('.hero-icon-card .hero-badge');
    if (badge) {
        badge.style.display = 'none';
    }
}

// Mark news as read
function markNewsAsRead() {
    localStorage.setItem('lastNewsRead', Date.now().toString());
    const badge = document.querySelector('.hero-icon-card:last-child .hero-badge');
    if (badge) {
        badge.style.display = 'none';
    }
}