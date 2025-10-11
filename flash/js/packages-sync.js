// Package Synchronization Functions
// لضمان تطابق البيانات بين الصفحة الرئيسية وصفحة الدفع

// Save package selection to localStorage
function savePackageSelection(packageType, customPrice = null) {
    const selectedPackage = {
        type: packageType,
        ...packagesData[packageType],
        timestamp: Date.now(),
        customPrice: customPrice
    };
    
    localStorage.setItem('selectedPackage', JSON.stringify(selectedPackage));
    console.log('Package saved:', selectedPackage);
}

// Load package selection from localStorage
function loadPackageSelection() {
    const saved = localStorage.getItem('selectedPackage');
    if (saved) {
        try {
            const selectedPackage = JSON.parse(saved);
            
            // Check if data is not older than 1 hour
            const oneHour = 60 * 60 * 1000;
            if (Date.now() - selectedPackage.timestamp < oneHour) {
                return selectedPackage;
            } else {
                // Clear old data
                localStorage.removeItem('selectedPackage');
            }
        } catch (error) {
            console.error('Error loading package selection:', error);
            localStorage.removeItem('selectedPackage');
        }
    }
    return null;
}

// Update package pricing globally
function updatePackagePrice(packageType, newPrice) {
    if (packagesData[packageType]) {
        packagesData[packageType].price = newPrice;
        packagesData[packageType].usdtAmount = newPrice.replace('$', '');
        
        // Update on all pages
        if (typeof renderAllPackages === 'function') {
            renderAllPackages();
        }
        
        // Save to localStorage for persistence
        localStorage.setItem('packagesData', JSON.stringify(packagesData));
        
        console.log(`Package ${packageType} price updated to ${newPrice}`);
    }
}

// Sync packages data across pages
function syncPackagesData() {
    const saved = localStorage.getItem('packagesData');
    if (saved) {
        try {
            const savedData = JSON.parse(saved);
            
            // Update current data
            Object.keys(savedData).forEach(packageType => {
                if (packagesData[packageType]) {
                    packagesData[packageType] = { ...packagesData[packageType], ...savedData[packageType] };
                }
            });
            
            console.log('Packages data synchronized');
        } catch (error) {
            console.error('Error syncing packages data:', error);
        }
    }
}

// Validate package consistency
function validatePackageConsistency() {
    const issues = [];
    
    Object.keys(packagesData).forEach(packageType => {
        const pkg = packagesData[packageType];
        
        // Check if price matches usdtAmount
        const priceNumber = parseInt(pkg.price.replace('$', ''));
        const usdtNumber = parseInt(pkg.usdtAmount);
        
        if (priceNumber !== usdtNumber) {
            issues.push(`${packageType}: Price (${pkg.price}) doesn't match USDT amount (${pkg.usdtAmount})`);
        }
        
        // Check required fields
        const requiredFields = ['name', 'price', 'amount', 'delivery', 'features'];
        requiredFields.forEach(field => {
            if (!pkg[field]) {
                issues.push(`${packageType}: Missing required field '${field}'`);
            }
        });
        
        // Check features array
        if (pkg.features && !Array.isArray(pkg.features)) {
            issues.push(`${packageType}: Features must be an array`);
        }
    });
    
    if (issues.length > 0) {
        console.warn('Package consistency issues found:', issues);
        return false;
    }
    
    console.log('All packages are consistent');
    return true;
}

// Export package data for external use
function exportPackageData() {
    const exportData = {
        packages: packagesData,
        timestamp: Date.now(),
        version: '1.0.0'
    };
    
    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = 'packages-data-export.json';
    a.click();
    
    URL.revokeObjectURL(url);
}

// Import package data from external source
function importPackageData(jsonData) {
    try {
        const importData = JSON.parse(jsonData);
        
        if (importData.packages) {
            Object.keys(importData.packages).forEach(packageType => {
                packagesData[packageType] = importData.packages[packageType];
            });
            
            // Save to localStorage
            localStorage.setItem('packagesData', JSON.stringify(packagesData));
            
            // Re-render packages
            if (typeof renderAllPackages === 'function') {
                renderAllPackages();
            }
            
            console.log('Package data imported successfully');
            return true;
        }
    } catch (error) {
        console.error('Error importing package data:', error);
        return false;
    }
}

// Initialize sync on page load
document.addEventListener('DOMContentLoaded', function() {
    syncPackagesData();
    validatePackageConsistency();
});

// Auto-sync every 30 seconds
setInterval(syncPackagesData, 30000);
