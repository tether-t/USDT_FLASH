// Tether Official USDT Packages - Professional Edition
const packagesData = {
    basic: {
        // Starter Package - Tether Verified
        name: "USDT FLASH Trial",
        arabicName: "Trial Package",
        subtitle: "Tether Limited Official",
        price: "$57",
        originalPrice: null,
        amount: "1020 USDT FLASH",
        usdtAmount: "1,020",
        delivery: "2-5 minutes",
        
        // Official Tether Features
        features: [
            "✅ 1,020 USDT Instant Transfer",
            "🔒 Tether Treasury Backed",
            "🏦 Bank-Grade Security Protocol",
            "📱 Multi-Platform Support",
            "🌐 Global Network Access",
            "📞 24/7 Technical Support",
            "📊 Real-Time Transaction Tracking",
            "🛡️ Anti-Fraud Protection"
        ],
        
        // Tether Brand Colors
        color: {
            primary: "green-600",
            bg: "green-50",
            border: "green-200",
            gradient: "from-green-500 to-green-700"
        },
        
        // Official Icon
        icon: "fas fa-shield-alt",
        
        // Tether Button
        button: {
            text: "Get Now",
            class: "from-green-500 to-green-700 hover:from-green-600 hover:to-green-800"
        },
        
        // Official Benefits
        bonus: {
            title: "Tether Official Benefits:",
            items: [
                "Verified Tether Account Setup",
                "Official Documentation",
                "Compliance Certificate"
            ]
        },
        
        // Verification
        verification: {
            badge: "Tether Verified",
            license: "License: TL-2024-001",
            compliance: "Fully Regulated"
        }
    },
    
    pro: {
        // Professional Package - Most Popular
        name: "USDT FLASH Pro",
        arabicName: "Pro Package",
        subtitle: "Recommended by Tether",
        price: "$359",
        originalPrice: null,
        amount: "3,500 USDT FLASH",
        usdtAmount: "3,500",
        delivery: "1-3 minutes",
        
        // Enhanced Professional Features
        features: [
            "✅ 7,000 USDT Premium Allocation",
            "🏆 Tether Gold Member Status",
            "⚡ Priority Network Processing",
            "🔐 Advanced Security Suite",
            "📈 Professional Trading Tools",
            "💼 Dedicated Account Manager",
            "🎯 Market Analysis Reports",
            "🌟 VIP Customer Support",
            "📋 Compliance Documentation",
            "🔄 Unlimited Transfers"
        ],
        
        // Professional Colors
        color: {
            primary: "blue-600",
            bg: "blue-50",
            border: "blue-200",
            gradient: "from-blue-500 to-blue-700"
        },
        
        // Professional Icon
        icon: "fas fa-star",
        
        // Professional Button
        button: {
            text: "Get Now",
            class: "from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800"
        },
        
        // Professional Benefits
        bonus: {
            title: "Professional Exclusive:",
            items: [
                "500 USDT Bonus Included",
                "Priority Support Channel",
                "Advanced Analytics Dashboard",
                "Market Intelligence Reports"
            ]
        },
        
        // Special Properties
        mostPopular: false,
        badge: "",
        aiSelected: false,
        
        // Professional Verification
        verification: {
            badge: "Tether Gold Certified",
            license: "License: TL-PRO-2024",
            compliance: "Premium Regulated"
        }
    },
    
    enterprise: {
        // Enterprise Package - Maximum Value
        name: "USDT FLASH Professional",
        arabicName: "Professional Package",
        subtitle: "Tether Institutional Grade",
        price: "$599",
        originalPrice: null,
        amount: "10,000 USDT FLASH",
        usdtAmount: "10,000",
        delivery: "Instant",
        
        // Enterprise-Grade Features
        features: [
            "✅ 10,000 USDT Institutional Rate",
            "🏢 Tether Enterprise Partnership",
            "⚡ Instant Settlement Network",
            "🔒 Military-Grade Encryption",
            "📊 Advanced Analytics Platform",
            "👨‍💼 Personal Relationship Manager",
            "🌍 Global Liquidity Access",
            "📋 Full Regulatory Compliance",
            "🎯 Custom Integration Support",
            "💎 Exclusive Tether Benefits",
            "🔄 Unlimited Transaction Volume",
            "📞 Direct Tether Hotline"
        ],
        
        // Enterprise Colors
        color: {
            primary: "purple-600",
            bg: "purple-50",
            border: "purple-200",
            gradient: "from-purple-500 to-purple-700"
        },
        
        // Enterprise Icon
        icon: "fas fa-building",
        
        // Enterprise Button
        button: {
            text: "Get Now",
            class: "from-purple-500 to-purple-700 hover:from-purple-600 hover:to-purple-800"
        },
        
        // Enterprise Benefits
        bonus: {
            title: "Enterprise Exclusive:",
            items: [
                "2,000 USDT Bonus Package",
                "Direct Tether Partnership",
                "Custom Integration Support",
                "Institutional Trading Access",
                "Regulatory Compliance Suite"
            ]
        },
        
        // Enterprise Verification
        verification: {
            badge: "Tether Enterprise Partner",
            license: "License: TL-ENT-2024",
            compliance: "Institutional Grade"
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