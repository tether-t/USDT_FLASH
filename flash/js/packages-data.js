// Unified Package Data - مصدر واحد للبيانات
const packagesData = {
    basic: {
        // Basic Package Info
        name: "🚀 Trial Package",
        arabicName: "باقة البداية",
        subtitle: "",
        price: "$30",
        originalPrice: null,
        amount: "500 USDT-FLASH",
        usdtAmount: "99",
        delivery: "5 minutes",
        
        // Package Features
        features: [
            "500 USDT-FLASH Instant Delivery",
            "Bank-Grade Security",
            "7-Day Premium Support",
            "Real-Time Tracking",
            "Complete Setup Guide",
            "Free Expert Consultation"
        ],
        
        // Visual Properties
        color: {
            primary: "blue-600",
            bg: "blue-50",
            border: "blue-200",
            gradient: "from-blue-500 to-blue-700"
        },
        
        // Package Icon
        icon: "fas fa-play-circle",
        
        // Button Properties
        button: {
            text: "🚀 Start Now",
            class: "from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800"
        },
        
        // Bonus Information
        bonus: {
            title: "Included Bonus:",
            items: [
                "Complete Setup Guide",
                "30min Expert Consultation"
            ]
        }
    },
    
    pro: {
        // Pro Package Info
        name: "🔥 Basic Package",
        arabicName: "باقة المحترفين",
        subtitle: "",
        price: "$80",
        originalPrice: "$107",
        amount: "1,500 USDT-FLASH",
        usdtAmount: "179",
        delivery: "3 minutes",
        
        // Package Features
        features: [
            "1,500 USDT-FLASH Premium Rate",
            "Enhanced Security + Insurance",
            "30-Day VIP Support",
            "Advanced Analytics Dashboard",
            "100 USDT-FLASH Bonus Included",
            "Priority Customer Service",
            "Professional Trading Tools",
            "Exclusive Market Insights"
        ],
        
        // Visual Properties
        color: {
            primary: "red-600",
            bg: "red-50",
            border: "red-200",
            gradient: "from-red-500 to-red-700"
        },
        
        // Package Icon
        icon: "fas fa-fire",
        
        // Button Properties
        button: {
            text: "🔥 Get Started",
            class: "from-red-500 to-red-700 hover:from-red-600 hover:to-red-800"
        },
        
        // Bonus Information
        bonus: {
            title: "Exclusive Benefits:",
            items: [
                "VIP Priority Support",
                "Professional Trading Insights",
                "Early Access to New Features"
            ]
        },
        
        // Special Properties
        mostPopular: false,
        badge: "",
        aiSelected: false
    },
    
    enterprise: {
        // Enterprise Package Info
        name: "👑 Professional Package",
        arabicName: "باقة الشركات",
        subtitle: "",
        price: "$224",
        originalPrice: null,
        amount: "5,000 USDT-FLASH",
        usdtAmount: "499",
        delivery: "1 minute",
        
        // Package Features
        features: [
            "5,000 USDT-FLASH Bulk Pricing",
            "Lifetime Service Guarantee",
            "24/7 Dedicated Account Manager",
            "Enterprise Analytics Suite",
            "500 USDT-FLASH Bonus Package",
            "Strategic Investment Consulting",
            "One-on-One Expert Training",
            "Institutional Trading Platform",
            "Exclusive VIP Community Access"
        ],
        
        // Visual Properties
        color: {
            primary: "purple-600",
            bg: "purple-50",
            border: "purple-200",
            gradient: "from-purple-500 to-purple-700"
        },
        
        // Package Icon
        icon: "fas fa-crown",
        
        // Button Properties
        button: {
            text: "👑 For Professionals",
            class: "from-purple-500 to-purple-700 hover:from-purple-600 hover:to-purple-800"
        },
        
        // Bonus Information
        bonus: {
            title: "Enterprise Benefits:",
            items: [
                "Strategic Consultation",
                "Personal Account Training",
                "Advanced Trading Tools",
                "VIP Expert Network"
            ]
        }
    }
};

// Package Display Functions
function getPackageData(packageType) {
    return packagesData[packageType] || packagesData.basic;
}

function getAllPackages() {
    return packagesData;
}

// Package Price Calculation
function calculatePackagePrice(packageType, quantity = 1) {
    const pkg = getPackageData(packageType);
    const basePrice = parseInt(pkg.price.replace('$', ''));
    return basePrice * quantity;
}

// Package Comparison Functions
function comparePackages(packageType1, packageType2) {
    const pkg1 = getPackageData(packageType1);
    const pkg2 = getPackageData(packageType2);
    
    return {
        price: parseInt(pkg1.price.replace('$', '')) - parseInt(pkg2.price.replace('$', '')),
        features: pkg1.features.length - pkg2.features.length,
        delivery: pkg1.delivery.localeCompare(pkg2.delivery)
    };
}

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { packagesData, getPackageData, getAllPackages, calculatePackagePrice, comparePackages };
}