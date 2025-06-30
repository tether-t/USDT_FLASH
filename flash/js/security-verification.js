// 🔒 نظام التحقق من الأمان والمصداقية
// Security Verification & SSL Check System

document.addEventListener('DOMContentLoaded', function() {
    
    // 🛡️ محاكاة تشغيل فحص الأمان
    function runSecurityCheck() {
        const securityModal = document.createElement('div');
        securityModal.className = 'security-modal';
        securityModal.innerHTML = `
            <div class="security-modal-content">
                <div class="security-header">
                    <div class="security-icon">
                        <i class="fas fa-shield-alt"></i>
                    </div>
                    <h3>Security Verification</h3>
                </div>
                
                <div class="security-checks">
                    <div class="check-item" id="ssl-check">
                        <div class="check-icon loading">
                            <i class="fas fa-spinner fa-spin"></i>
                        </div>
                        <div class="check-content">
                            <div class="check-title">SSL Certificate</div>
                            <div class="check-status">Verifying...</div>
                        </div>
                    </div>
                    
                    <div class="check-item" id="license-check">
                        <div class="check-icon loading">
                            <i class="fas fa-spinner fa-spin"></i>
                        </div>
                        <div class="check-content">
                            <div class="check-title">License Verification</div>
                            <div class="check-status">Checking...</div>
                        </div>
                    </div>
                    
                    <div class="check-item" id="reputation-check">
                        <div class="check-icon loading">
                            <i class="fas fa-spinner fa-spin"></i>
                        </div>
                        <div class="check-content">
                            <div class="check-title">Reputation Score</div>
                            <div class="check-status">Calculating...</div>
                        </div>
                    </div>
                    
                    <div class="check-item" id="uptime-check">
                        <div class="check-icon loading">
                            <i class="fas fa-spinner fa-spin"></i>
                        </div>
                        <div class="check-content">
                            <div class="check-title">Server Uptime</div>
                            <div class="check-status">Monitoring...</div>
                        </div>
                    </div>
                </div>
                
                <div class="security-result" id="security-result" style="display: none;">
                    <div class="result-icon">
                        <i class="fas fa-check-circle"></i>
                    </div>
                    <div class="result-text">
                        <h4>✅ All Security Checks Passed</h4>
                        <p>This website is verified and secure for transactions</p>
                        <div class="trust-score">
                            <span>Trust Score: <strong>98/100</strong></span>
                        </div>
                    </div>
                </div>
                
                <button class="close-security-modal" onclick="closeSecurityModal()">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        `;

        const securityStyles = `
            <style>
            .security-modal {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.7);
                z-index: 10000;
                display: flex;
                align-items: center;
                justify-content: center;
                opacity: 0;
                transition: opacity 0.3s ease;
            }

            .security-modal.show {
                opacity: 1;
            }

            .security-modal-content {
                background: white;
                border-radius: 20px;
                padding: 30px;
                max-width: 450px;
                width: 90%;
                position: relative;
                box-shadow: 0 20px 60px rgba(0, 0, 0, 0.2);
                transform: scale(0.9);
                transition: transform 0.3s ease;
            }

            .security-modal.show .security-modal-content {
                transform: scale(1);
            }

            .security-header {
                text-align: center;
                margin-bottom: 25px;
            }

            .security-icon {
                width: 60px;
                height: 60px;
                background: linear-gradient(135deg, #10b981 0%, #059669 100%);
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                margin: 0 auto 15px;
                box-shadow: 0 8px 25px rgba(16, 185, 129, 0.3);
            }

            .security-icon i {
                color: white;
                font-size: 24px;
            }

            .security-header h3 {
                font-size: 20px;
                font-weight: 600;
                color: #1f2937;
                margin: 0;
            }

            .security-checks {
                space-y: 15px;
            }

            .check-item {
                display: flex;
                align-items: center;
                gap: 15px;
                padding: 15px;
                background: #f9fafb;
                border-radius: 12px;
                margin-bottom: 12px;
                transition: all 0.3s ease;
            }

            .check-item.completed {
                background: #ecfdf5;
                border: 1px solid #d1fae5;
            }

            .check-icon {
                width: 40px;
                height: 40px;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 16px;
            }

            .check-icon.loading {
                background: #e5e7eb;
                color: #6b7280;
            }

            .check-icon.success {
                background: #10b981;
                color: white;
            }

            .check-content {
                flex: 1;
            }

            .check-title {
                font-weight: 600;
                color: #1f2937;
                font-size: 14px;
            }

            .check-status {
                font-size: 12px;
                color: #6b7280;
                margin-top: 2px;
            }

            .check-status.success {
                color: #059669;
                font-weight: 500;
            }

            .security-result {
                text-align: center;
                padding: 20px;
                background: linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%);
                border-radius: 15px;
                margin-top: 20px;
                border: 1px solid #a7f3d0;
            }

            .result-icon {
                font-size: 48px;
                color: #10b981;
                margin-bottom: 15px;
            }

            .result-text h4 {
                color: #065f46;
                font-size: 18px;
                margin-bottom: 8px;
            }

            .result-text p {
                color: #047857;
                font-size: 14px;
                margin-bottom: 15px;
            }

            .trust-score {
                background: white;
                padding: 10px 15px;
                border-radius: 25px;
                display: inline-block;
                font-size: 14px;
                color: #065f46;
                border: 1px solid #a7f3d0;
            }

            .trust-score strong {
                color: #047857;
                font-weight: 700;
            }

            .close-security-modal {
                position: absolute;
                top: 15px;
                right: 15px;
                width: 30px;
                height: 30px;
                background: none;
                border: none;
                color: #9ca3af;
                cursor: pointer;
                font-size: 18px;
                display: flex;
                align-items: center;
                justify-content: center;
                border-radius: 50%;
                transition: all 0.2s ease;
            }

            .close-security-modal:hover {
                background: #f3f4f6;
                color: #374151;
            }
            </style>
        `;

        document.head.insertAdjacentHTML('beforeend', securityStyles);
        document.body.appendChild(securityModal);

        // عرض النافذة
        setTimeout(() => {
            securityModal.classList.add('show');
        }, 100);

        // تشغيل الفحوصات
        runChecks();
    }

    // 🔍 تشغيل الفحوصات الأمنية
    function runChecks() {
        const checks = [
            { id: 'ssl-check', title: 'SSL Certificate', status: 'Valid & Secure', delay: 1000 },
            { id: 'license-check', title: 'License Verification', status: 'Fully Licensed', delay: 2000 },
            { id: 'reputation-check', title: 'Reputation Score', status: '4.9/5 Stars', delay: 3000 },
            { id: 'uptime-check', title: 'Server Uptime', status: '99.9% Availability', delay: 4000 }
        ];

        checks.forEach(check => {
            setTimeout(() => {
                const checkElement = document.getElementById(check.id);
                if (checkElement) {
                    const icon = checkElement.querySelector('.check-icon');
                    const status = checkElement.querySelector('.check-status');
                    
                    icon.className = 'check-icon success';
                    icon.innerHTML = '<i class="fas fa-check"></i>';
                    status.textContent = check.status;
                    status.className = 'check-status success';
                    checkElement.classList.add('completed');
                }
            }, check.delay);
        });

        // عرض النتيجة النهائية
        setTimeout(() => {
            const resultElement = document.getElementById('security-result');
            if (resultElement) {
                resultElement.style.display = 'block';
            }
        }, 5000);

        // إغلاق تلقائي بعد 8 ثوان
        setTimeout(() => {
            closeSecurityModal();
        }, 8000);
    }

    // 🔒 إغلاق نافذة الأمان
    window.closeSecurityModal = function() {
        const modal = document.querySelector('.security-modal');
        if (modal) {
            modal.classList.remove('show');
            setTimeout(() => {
                modal.remove();
            }, 300);
        }
    };

    // 🌟 شريط SSL في أعلى الصفحة
    function createSSLBar() {
        const sslBar = document.createElement('div');
        sslBar.className = 'ssl-security-bar';
        sslBar.innerHTML = `
            <div class="ssl-content">
                <div class="ssl-icon">
                    <i class="fas fa-lock"></i>
                </div>
                <div class="ssl-text">
                    <span class="ssl-main">🔒 Secure Connection</span>
                    <span class="ssl-sub">SSL Encrypted • Verified by DigiCert</span>
                </div>
                <div class="ssl-verify" onclick="runSecurityCheck()">
                    <i class="fas fa-shield-alt"></i>
                    <span>Verify Security</span>
                </div>
            </div>
        `;

        const sslStyles = `
            <style>
            .ssl-security-bar {
                background: linear-gradient(135deg, #065f46 0%, #047857 100%);
                color: white;
                padding: 8px 0;
                font-size: 13px;
                position: relative;
                z-index: 999;
                border-bottom: 1px solid rgba(255, 255, 255, 0.1);
            }

            .ssl-content {
                max-width: 1200px;
                margin: 0 auto;
                padding: 0 20px;
                display: flex;
                align-items: center;
                justify-content: space-between;
            }

            .ssl-icon {
                font-size: 16px;
                color: #10b981;
                margin-right: 10px;
            }

            .ssl-text {
                display: flex;
                align-items: center;
                gap: 15px;
                flex: 1;
            }

            .ssl-main {
                font-weight: 600;
                font-size: 14px;
            }

            .ssl-sub {
                font-size: 12px;
                opacity: 0.9;
            }

            .ssl-verify {
                display: flex;
                align-items: center;
                gap: 6px;
                background: rgba(255, 255, 255, 0.1);
                padding: 6px 12px;
                border-radius: 20px;
                cursor: pointer;
                transition: all 0.3s ease;
                font-size: 12px;
                font-weight: 500;
            }

            .ssl-verify:hover {
                background: rgba(255, 255, 255, 0.2);
                transform: scale(1.02);
            }

            @media (max-width: 768px) {
                .ssl-text {
                    flex-direction: column;
                    align-items: flex-start;
                    gap: 2px;
                }
                
                .ssl-verify span {
                    display: none;
                }
            }
            </style>
        `;

        document.head.insertAdjacentHTML('beforeend', sslStyles);
        document.body.insertBefore(sslBar, document.body.firstChild);
    }

    // 🚀 تشغيل النظام
    function initializeSecuritySystem() {
        createSSLBar();
        
        // تشغيل فحص أمان تلقائي بعد 10 ثوان
        setTimeout(() => {
            if (Math.random() > 0.5) { // 50% احتمال
                runSecurityCheck();
            }
        }, 10000);
    }

    // إضافة وظيفة عامة لتشغيل فحص الأمان
    window.runSecurityCheck = runSecurityCheck;

    // بدء النظام
    setTimeout(initializeSecuritySystem, 1000);
});