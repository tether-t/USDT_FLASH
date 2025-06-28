// Advanced Toast Notification System - English Version
class ToastSystem {
    constructor() {
        this.container = null;
        this.init();
    }

    init() {
        this.createContainer();
        this.addStyles();
    }

    createContainer() {
        // Create toast container if it doesn't exist
        if (!document.getElementById('toastContainer')) {
            const container = document.createElement('div');
            container.id = 'toastContainer';
            container.className = 'toast-container';
            document.body.appendChild(container);
        }
        this.container = document.getElementById('toastContainer');
    }

    addStyles() {
        // Check if styles already exist
        if (document.getElementById('toast-styles')) return;

        const styles = document.createElement('style');
        styles.id = 'toast-styles';
        styles.innerHTML = `
            .toast-container {
                position: fixed;
                top: 20px;
                right: 20px;
                z-index: 99999;
                display: flex;
                flex-direction: column;
                gap: 10px;
                max-width: 400px;
                pointer-events: none;
            }
            
            .toast {
                padding: 16px 20px;
                border-radius: 12px;
                color: white;
                font-weight: 500;
                font-size: 14px;
                box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
                backdrop-filter: blur(10px);
                border: 1px solid rgba(255, 255, 255, 0.1);
                animation: slideInRight 0.4s ease-out;
                transition: all 0.3s ease;
                position: relative;
                overflow: hidden;
                pointer-events: auto;
                min-width: 300px;
                display: flex;
                align-items: center;
                gap: 12px;
            }
            
            .toast.success {
                background: linear-gradient(135deg, #10b981 0%, #059669 100%);
                border-left: 4px solid #34d399;
            }
            
            .toast.error {
                background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
                border-left: 4px solid #f87171;
            }
            
            .toast.warning {
                background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
                border-left: 4px solid #fbbf24;
            }
            
            .toast.info {
                background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
                border-left: 4px solid #60a5fa;
            }
            
            .toast::before {
                content: '';
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                height: 3px;
                background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent);
                animation: shimmer 2s infinite;
            }
            
            @keyframes slideInRight {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
            
            @keyframes slideOutRight {
                from {
                    transform: translateX(0);
                    opacity: 1;
                }
                to {
                    transform: translateX(100%);
                    opacity: 0;
                }
            }
            
            @keyframes shimmer {
                0% { transform: translateX(-100%); }
                100% { transform: translateX(100%); }
            }
            
            .toast.removing {
                animation: slideOutRight 0.3s ease-in forwards;
            }
            
            .toast-icon {
                font-size: 18px;
                flex-shrink: 0;
                display: flex;
                align-items: center;
                justify-content: center;
                width: 24px;
                height: 24px;
            }
            
            .toast-content {
                flex: 1;
                line-height: 1.4;
            }
            
            .toast-close {
                background: none;
                border: none;
                color: rgba(255, 255, 255, 0.7);
                cursor: pointer;
                font-size: 20px;
                padding: 0;
                margin-left: 8px;
                line-height: 1;
                transition: color 0.2s ease;
                flex-shrink: 0;
                width: 24px;
                height: 24px;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            
            .toast-close:hover {
                color: white;
                transform: scale(1.1);
            }
            
            .toast-progress {
                position: absolute;
                bottom: 0;
                left: 0;
                height: 3px;
                background: rgba(255, 255, 255, 0.3);
                transition: width linear;
            }
            
            /* Mobile Responsive Toast */
            @media (max-width: 768px) {
                .toast-container {
                    right: 10px;
                    left: 10px;
                    max-width: none;
                }
                
                .toast {
                    padding: 12px 16px;
                    font-size: 13px;
                    min-width: auto;
                }
                
                .toast-icon {
                    font-size: 16px;
                    width: 20px;
                    height: 20px;
                }
            }
            
            /* Toast Animations */
            @keyframes bounce {
                0%, 20%, 50%, 80%, 100% {
                    transform: translateY(0);
                }
                40% {
                    transform: translateY(-10px);
                }
                60% {
                    transform: translateY(-5px);
                }
            }
            
            .toast.bounce {
                animation: bounce 0.6s ease;
            }
            
            /* Success variants */
            .toast.success-payment {
                background: linear-gradient(135deg, #059669 0%, #047857 100%);
                border-left: 4px solid #10b981;
            }
            
            .toast.success-copy {
                background: linear-gradient(135deg, #0891b2 0%, #0e7490 100%);
                border-left: 4px solid #06b6d4;
            }
            
            /* Error variants */
            .toast.error-payment {
                background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%);
                border-left: 4px solid #ef4444;
            }
            
            .toast.error-network {
                background: linear-gradient(135deg, #b91c1c 0%, #991b1b 100%);
                border-left: 4px solid #dc2626;
            }
            
            /* Warning variants */
            .toast.warning-time {
                background: linear-gradient(135deg, #d97706 0%, #b45309 100%);
                border-left: 4px solid #f59e0b;
            }
            
            .toast.warning-limit {
                background: linear-gradient(135deg, #b45309 0%, #92400e 100%);
                border-left: 4px solid #d97706;
            }
        `;
        
        document.head.appendChild(styles);
    }

    showToast(message, type = 'success', duration = 5000, options = {}) {
        const toast = document.createElement('div');
        
        // Get appropriate icon and styling
        const icons = {
            success: '✅',
            error: '❌',
            warning: '⚠️',
            info: 'ℹ️'
        };

        // Apply custom styling if provided
        const toastClass = options.variant ? `${type}-${options.variant}` : type;
        
        toast.className = `toast ${toastClass}`;
        
        // Create progress bar if duration > 0
        let progressBar = '';
        if (duration > 0) {
            progressBar = '<div class="toast-progress"></div>';
        }
        
        toast.innerHTML = `
            <div class="toast-icon">${options.icon || icons[type] || icons.success}</div>
            <div class="toast-content">${message}</div>
            <button class="toast-close" onclick="toastSystem.removeToast(this.parentElement)">&times;</button>
            ${progressBar}
        `;
        
        this.container.appendChild(toast);
        
        // Animate progress bar
        if (duration > 0) {
            const progress = toast.querySelector('.toast-progress');
            if (progress) {
                setTimeout(() => {
                    progress.style.width = '100%';
                    progress.style.transitionDuration = `${duration}ms`;
                }, 100);
            }
        }
        
        // Add bounce effect for certain types
        if (options.bounce) {
            setTimeout(() => {
                toast.classList.add('bounce');
            }, 100);
        }
        
        // Auto remove after duration
        if (duration > 0) {
            setTimeout(() => {
                this.removeToast(toast);
            }, duration);
        }
        
        return toast;
    }

    removeToast(toast) {
        if (toast && toast.parentElement) {
            toast.classList.add('removing');
            setTimeout(() => {
                if (toast.parentElement) {
                    toast.parentElement.removeChild(toast);
                }
            }, 300);
        }
    }

    // Success Toast Variants
    showSuccess(message, duration = 5000, options = {}) {
        return this.showToast(message, 'success', duration, options);
    }

    showSuccessPayment(message, duration = 6000) {
        return this.showToast(message, 'success', duration, {
            variant: 'payment',
            icon: '💰',
            bounce: true
        });
    }

    showSuccessCopy(message, duration = 3000) {
        return this.showToast(message, 'success', duration, {
            variant: 'copy',
            icon: '📋'
        });
    }

    // Error Toast Variants
    showError(message, duration = 7000, options = {}) {
        return this.showToast(message, 'error', duration, options);
    }

    showErrorPayment(message, duration = 8000) {
        return this.showToast(message, 'error', duration, {
            variant: 'payment',
            icon: '💳',
            bounce: true
        });
    }

    showErrorNetwork(message, duration = 6000) {
        return this.showToast(message, 'error', duration, {
            variant: 'network',
            icon: '🌐'
        });
    }

    // Warning Toast Variants
    showWarning(message, duration = 6000, options = {}) {
        return this.showToast(message, 'warning', duration, options);
    }

    showWarningTime(message, duration = 8000) {
        return this.showToast(message, 'warning', duration, {
            variant: 'time',
            icon: '⏰',
            bounce: true
        });
    }

    showWarningLimit(message, duration = 7000) {
        return this.showToast(message, 'warning', duration, {
            variant: 'limit',
            icon: '🚫'
        });
    }

    // Info Toast
    showInfo(message, duration = 5000, options = {}) {
        return this.showToast(message, 'info', duration, options);
    }

    // Clear all toasts
    clearAll() {
        const toasts = this.container.querySelectorAll('.toast');
        toasts.forEach(toast => {
            this.removeToast(toast);
        });
    }
}

// Initialize toast system
window.toastSystem = new ToastSystem();

// Global helper functions for backward compatibility
window.showToast = (message, type, duration) => window.toastSystem.showToast(message, type, duration);
window.showSuccessToast = (message, duration) => window.toastSystem.showSuccess(message, duration);
window.showErrorToast = (message, duration) => window.toastSystem.showError(message, duration);
window.showWarningToast = (message, duration) => window.toastSystem.showWarning(message, duration);
window.showInfoToast = (message, duration) => window.toastSystem.showInfo(message, duration);
window.removeToast = (toast) => window.toastSystem.removeToast(toast);