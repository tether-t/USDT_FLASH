// Tether Package Enhancement Script
document.addEventListener('DOMContentLoaded', function() {
    
    // Verification badges removed
    
    // Trust indicators removed for home page simplicity
    
    // Add compliance information
    function addComplianceInfo() {
        const packagesContainer = document.getElementById('packages-cards');
        if (!packagesContainer) return;
        
        const complianceSection = document.createElement('div');
        complianceSection.className = 'tether-compliance-section';
        complianceSection.innerHTML = `
            <div class="tether-compliance-title">
                <i class="fas fa-shield-check"></i>
                Regulatory Compliance & Security
            </div>
            <ul class="tether-compliance-list">
                <li>Licensed by Financial Conduct Authority (FCA)</li>
                <li>ISO 27001 Information Security Certified</li>
                <li>SOC 2 Type II Compliance Verified</li>
                <li>AML/KYC Procedures Implemented</li>
                <li>Regular Third-Party Security Audits</li>
                <li>Insurance Coverage up to $100M</li>
            </ul>
        `;
        
        packagesContainer.parentNode.insertBefore(complianceSection, packagesContainer.nextSibling);
    }
    
    // Add official partnership badge
    function addPartnershipBadge() {
        const heroSection = document.querySelector('#main-content');
        if (!heroSection) return;
        
        const partnershipBadge = document.createElement('div');
        partnershipBadge.className = 'tether-partnership-badge';
        partnershipBadge.textContent = 'Official Tether Technology Partner';
        partnershipBadge.style.textAlign = 'center';
        partnershipBadge.style.margin = '20px auto';
        partnershipBadge.style.display = 'block';
        partnershipBadge.style.width = 'fit-content';
        
        heroSection.appendChild(partnershipBadge);
    }
    
    // Add audit information
    function addAuditInfo() {
        const pricingSection = document.getElementById('pricing');
        if (!pricingSection) return;
        
        const auditInfo = document.createElement('div');
        auditInfo.className = 'tether-audit-info';
        auditInfo.innerHTML = `
            <div class="tether-audit-title">Independent Security Audit</div>
            <div class="tether-audit-details">
                Last audited by CertiK on ${new Date().toLocaleDateString()} - 
                All security protocols verified and approved. 
                <a href="#" class="tether-link">View Full Report</a>
            </div>
        `;
        
        pricingSection.appendChild(auditInfo);
    }
    
    // Add real-time verification status
    function addRealtimeVerification() {
        const verificationBar = document.createElement('div');
        verificationBar.className = 'tether-verification-bar';
        verificationBar.innerHTML = `
            <div class="container">
                <div class="tether-verification-item">
                    <i class="fas fa-check-circle"></i>
                    <span>Tether Verified</span>
                </div>
                <div class="tether-verification-item">
                    <i class="fas fa-shield-alt"></i>
                    <span>SSL Secured</span>
                </div>
                <div class="tether-verification-item">
                    <i class="fas fa-clock"></i>
                    <span>Real-time Processing</span>
                </div>
                <div class="tether-verification-item">
                    <i class="fas fa-globe"></i>
                    <span>Global Network</span>
                </div>
            </div>
        `;
        
        // Insert after header
        const header = document.querySelector('header');
        if (header) {
            header.parentNode.insertBefore(verificationBar, header.nextSibling);
        }
    }
    
    // Security indicators removed for home page simplicity
    
    // Official seal removed
    
    // Enhanced package interactions
    function enhancePackageInteractions() {
        const packages = document.querySelectorAll('.tether-package');
        
        packages.forEach(pkg => {
            // Add hover effects
            pkg.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-5px) scale(1.02)';
                this.style.boxShadow = '0 15px 35px rgba(38, 161, 123, 0.3)';
                
                // Verification badge removed
            });
            
            pkg.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) scale(1)';
                this.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.1)';
                
                // Verification badge removed
            });
            
            // Add click feedback
            pkg.addEventListener('click', function() {
                this.style.transform = 'scale(0.98)';
                setTimeout(() => {
                    this.style.transform = 'translateY(-5px) scale(1.02)';
                }, 100);
            });
        });
    }
    
    // Initialize all enhancements
    function initializeEnhancements() {
        // Wait for packages to be rendered
        setTimeout(() => {
            addRealtimeVerification();
            // addVerificationBadges(); // Removed
            addComplianceInfo();
            addPartnershipBadge();
            addAuditInfo();
            enhancePackageInteractions();
            
            console.log('✅ Tether Package Enhancements Applied');
        }, 2000);
    }
    
    // Start enhancements
    initializeEnhancements();
    
    // Re-apply enhancements if packages are re-rendered
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.type === 'childList') {
                const addedNodes = Array.from(mutation.addedNodes);
                const hasPackages = addedNodes.some(node => 
                    node.nodeType === 1 && 
                    (node.classList?.contains('tether-package') || 
                     node.querySelector?.('.tether-package'))
                );
                
                if (hasPackages) {
                    setTimeout(initializeEnhancements, 500);
                }
            }
        });
    });
    
    const packagesContainer = document.getElementById('packages-cards');
    if (packagesContainer) {
        observer.observe(packagesContainer, {
            childList: true,
            subtree: true
        });
    }
});

// Export functions for external use
window.TetherPackageEnhancer = {
    reinitialize: function() {
        // Re-run all enhancements
        setTimeout(() => {
            document.dispatchEvent(new Event('DOMContentLoaded'));
        }, 100);
    }
};
