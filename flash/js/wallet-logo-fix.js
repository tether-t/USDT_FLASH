// 🎨 Wallet Logo Enhancement Script
// تحسينات شعارات المحافظ

document.addEventListener('DOMContentLoaded', function() {
    
    // 🔧 إصلاح أسماء المحافظ للشعارات
    function fixWalletClassName(walletType) {
        const walletMappings = {
            'Trust Wallet': 'trust',
            'MetaMask': 'metamask',
            'Binance': 'binance',
            'Bybit': 'bybit'
        };
        return walletMappings[walletType] || walletType.toLowerCase().replace(/\s+/g, '');
    }

    // 🎯 تحديث الشعارات بعد إنشاء المعاملات
    function updateWalletLogos() {
        document.querySelectorAll('.wallet-logo, .notification-wallet-logo').forEach(logo => {
            if (!logo.classList.contains('binance') && 
                !logo.classList.contains('trust') && 
                !logo.classList.contains('metamask') && 
                !logo.classList.contains('bybit')) {
                
                // البحث عن اسم المحفظة من العنصر المجاور
                const walletName = logo.closest('.wallet-transfer-info, .wallet-display')
                    ?.querySelector('.wallet-name, .wallet-name-notification')?.textContent;
                
                if (walletName) {
                    const correctClass = fixWalletClassName(walletName);
                    logo.classList.add(correctClass);
                }
            }
        });
    }

    // 🚀 تشغيل التحديث كل ثانيتين
    setInterval(updateWalletLogos, 2000);
    
    // ✨ تشغيل فوري
    setTimeout(updateWalletLogos, 1000);

    // 🎨 إضافة تأثيرات بصرية إضافية
    function addWalletEffects() {
        const style = document.createElement('style');
        style.textContent = `
            /* تحسينات إضافية للشعارات */
            .wallet-logo, .notification-wallet-logo {
                position: relative;
                overflow: hidden;
            }

            .wallet-logo::after, .notification-wallet-logo::after {
                content: '';
                position: absolute;
                top: -50%;
                left: -50%;
                width: 200%;
                height: 200%;
                background: linear-gradient(45deg, transparent, rgba(255,255,255,0.1), transparent);
                transform: rotate(45deg);
                transition: all 0.6s;
                opacity: 0;
            }

            .wallet-logo:hover::after, .notification-wallet-logo:hover::after {
                animation: shine 0.6s ease-in-out;
            }

            @keyframes shine {
                0% { transform: translateX(-100%) translateY(-100%) rotate(45deg); opacity: 0; }
                50% { opacity: 1; }
                100% { transform: translateX(100%) translateY(100%) rotate(45deg); opacity: 0; }
            }

            /* تأثيرات خاصة لكل محفظة */
            .wallet-logo.binance, .notification-wallet-logo.binance {
                box-shadow: 0 0 10px rgba(240, 185, 11, 0.3);
            }

            .wallet-logo.trust, .notification-wallet-logo.trust {
                box-shadow: 0 0 10px rgba(51, 117, 187, 0.3);
            }

            .wallet-logo.metamask, .notification-wallet-logo.metamask {
                box-shadow: 0 0 10px rgba(246, 133, 27, 0.3);
            }

            .wallet-logo.bybit, .notification-wallet-logo.bybit {
                box-shadow: 0 0 10px rgba(247, 166, 0, 0.3);
            }

            /* تحسين الرؤية */
            .wallet-transfer-info {
                background: rgba(16, 185, 129, 0.05) !important;
                border: 1px solid rgba(16, 185, 129, 0.15) !important;
            }
        `;
        document.head.appendChild(style);
    }

    // تشغيل التحسينات
    addWalletEffects();
});
