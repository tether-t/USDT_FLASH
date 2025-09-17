// Advanced Persuasion & Conversion System
(function() {
    'use strict';
    
    // Persuasion Configuration
    const PERSUASION_CONFIG = {
        conversionMessages: [
            "🚀 USDT FLASH → Real USDT in 24 hours!",
            "💰 Convert to PEPE/DOGE/SHIBA → Get Real USDT!",
            "⚡ Web3 Freedom: Your wallet, Your control!",
            "🎯 Join 78,420+ users earning real USDT daily!"
        ],
        
        urgencyTriggers: [
            "⏰ Limited Web3 slots available today",
            "🔥 High demand: Only 12 packages left",
            "💎 Exclusive Web3 early access ending soon",
            "⚠️ Price increase in 2 hours"
        ],
        
        socialProof: [
            "Ahmed from Dubai just converted 4000 USDT FLASH → Real USDT",
            "Sarah from Cairo earned $300 real USDT in 24 hours",
            "Mohamed from Riyadh: 'Best Web3 experience ever!'",
            "Fatima from Kuwait successfully withdrew real USDT"
        ]
    };
    
    // Advanced Persuasion Techniques
    class AdvancedPersuasion {
        constructor() {
            this.init();
        }
        
        init() {
            this.createFloatingConversionReminder();
            this.addRealTimeConversionCounter();
            this.implementScarcityIndicators();
            this.addSocialProofStream();
            this.createUrgencyOverlay();
            this.addWeb3TransitionMessages();
            this.implementFOMOTriggers();
        }
        
        // Floating Conversion Reminder
        createFloatingConversionReminder() {
            const reminder = document.createElement('div');
            reminder.id = 'conversion-reminder';
            reminder.innerHTML = `
                <div class="fixed bottom-4 right-4 bg-gradient-to-r from-green-500 to-blue-500 text-white p-4 rounded-lg shadow-2xl z-50 max-w-sm transform transition-all duration-500 hover:scale-105">
                    <div class="flex items-center mb-2">
                        <i class="fas fa-exchange-alt text-yellow-300 mr-2 animate-spin"></i>
                        <span class="font-bold">USDT FLASH → Real USDT</span>
                    </div>
                    <p class="text-sm mb-3">Convert your USDT FLASH to real USDT in just 24 hours through meme coins!</p>
                    <div class="flex items-center justify-between">
                        <div class="text-xs">
                            <span class="bg-yellow-400 text-black px-2 py-1 rounded font-bold">24H</span>
                            <span class="ml-1">Process</span>
                        </div>
                        <button onclick="this.parentElement.parentElement.parentElement.remove()" class="text-white hover:text-gray-200">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>
                </div>
            `;
            
            document.body.appendChild(reminder);
            
            // Auto-show after 10 seconds
            setTimeout(() => {
                reminder.style.opacity = '1';
                reminder.style.transform = 'translateX(0)';
            }, 10000);
        }
        
        // Real-time Conversion Counter
        addRealTimeConversionCounter() {
            const counter = document.createElement('div');
            counter.innerHTML = `
                <div class="fixed top-20 left-4 bg-black bg-opacity-80 text-white p-3 rounded-lg z-40 backdrop-blur-sm">
                    <div class="text-xs font-bold text-green-400 mb-1">LIVE CONVERSIONS</div>
                    <div class="flex items-center">
                        <div class="w-2 h-2 bg-green-500 rounded-full animate-pulse mr-2"></div>
                        <span class="text-sm" id="conversion-count">247</span>
                        <span class="text-xs ml-1">USDT FLASH → Real USDT today</span>
                    </div>
                </div>
            `;
            
            document.body.appendChild(counter);
            
            // Update counter every 15 seconds
            setInterval(() => {
                const countElement = document.getElementById('conversion-count');
                if (countElement) {
                    const current = parseInt(countElement.textContent);
                    countElement.textContent = current + Math.floor(Math.random() * 3) + 1;
                }
            }, 15000);
        }
        
        // Scarcity Indicators
        implementScarcityIndicators() {
            const scarcityBar = document.createElement('div');
            scarcityBar.innerHTML = `
                <div class="fixed top-0 left-0 right-0 bg-red-600 text-white text-center py-2 z-50 animate-pulse">
                    <div class="flex items-center justify-center">
                        <i class="fas fa-exclamation-triangle mr-2"></i>
                        <span class="font-bold">URGENT:</span>
                        <span class="ml-1" id="scarcity-message">Only 8 Web3 conversion slots left today!</span>
                        <i class="fas fa-clock ml-2 animate-spin"></i>
                    </div>
                </div>
            `;
            
            document.body.appendChild(scarcityBar);
            
            // Update scarcity message
            let scarcityIndex = 0;
            setInterval(() => {
                const messageElement = document.getElementById('scarcity-message');
                if (messageElement) {
                    messageElement.textContent = PERSUASION_CONFIG.urgencyTriggers[scarcityIndex % PERSUASION_CONFIG.urgencyTriggers.length];
                    scarcityIndex++;
                }
            }, 8000);
        }
        
        // Social Proof Stream
        addSocialProofStream() {
            const proofContainer = document.createElement('div');
            proofContainer.id = 'social-proof-stream';
            proofContainer.innerHTML = `
                <div class="fixed bottom-20 left-4 max-w-xs z-40">
                    <div id="proof-notification" class="bg-white border-l-4 border-green-500 p-3 rounded shadow-lg transform translate-x-full transition-transform duration-500">
                        <div class="flex items-center">
                            <div class="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center mr-3">
                                <i class="fas fa-user text-white text-xs"></i>
                            </div>
                            <div class="flex-1">
                                <p class="text-sm font-medium text-gray-800" id="proof-message"></p>
                                <p class="text-xs text-gray-500">Just now</p>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            
            document.body.appendChild(proofContainer);
            
            // Show social proof every 20 seconds
            let proofIndex = 0;
            setInterval(() => {
                const notification = document.getElementById('proof-notification');
                const message = document.getElementById('proof-message');
                
                if (notification && message) {
                    message.textContent = PERSUASION_CONFIG.socialProof[proofIndex % PERSUASION_CONFIG.socialProof.length];
                    
                    // Show notification
                    notification.style.transform = 'translateX(0)';
                    
                    // Hide after 5 seconds
                    setTimeout(() => {
                        notification.style.transform = 'translateX(-100%)';
                    }, 5000);
                    
                    proofIndex++;
                }\n            }, 20000);\n        }\n        \n        // Urgency Overlay\n        createUrgencyOverlay() {\n            let urgencyShown = false;\n            \n            // Show after 30 seconds of inactivity\n            let inactivityTimer = setTimeout(() => {\n                if (!urgencyShown) {\n                    this.showUrgencyPopup();\n                    urgencyShown = true;\n                }\n            }, 30000);\n            \n            // Reset timer on user activity\n            ['click', 'scroll', 'mousemove'].forEach(event => {\n                document.addEventListener(event, () => {\n                    clearTimeout(inactivityTimer);\n                    if (!urgencyShown) {\n                        inactivityTimer = setTimeout(() => {\n                            this.showUrgencyPopup();\n                            urgencyShown = true;\n                        }, 30000);\n                    }\n                });\n            });\n        }\n        \n        showUrgencyPopup() {\n            const popup = document.createElement('div');\n            popup.innerHTML = `\n                <div class=\"fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center\">\n                    <div class=\"bg-white rounded-xl p-8 max-w-md mx-4 text-center transform animate-pulse\">\n                        <div class=\"text-6xl mb-4\">⚡</div>\n                        <h3 class=\"text-2xl font-bold text-gray-800 mb-4\">Don't Miss Out!</h3>\n                        <p class=\"text-gray-600 mb-6\">Join thousands converting USDT FLASH to real USDT daily through Web3!</p>\n                        <div class=\"bg-gradient-to-r from-green-500 to-blue-500 text-white p-4 rounded-lg mb-6\">\n                            <div class=\"font-bold\">🚀 USDT FLASH → Real USDT</div>\n                            <div class=\"text-sm\">24-hour conversion process</div>\n                        </div>\n                        <div class=\"flex gap-4\">\n                            <button onclick=\"window.location.href='#pricing'\" class=\"flex-1 bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg transition\">\n                                Start Converting Now\n                            </button>\n                            <button onclick=\"this.closest('.fixed').remove()\" class=\"flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-3 px-6 rounded-lg transition\">\n                                Maybe Later\n                            </button>\n                        </div>\n                    </div>\n                </div>\n            `;\n            \n            document.body.appendChild(popup);\n        }\n        \n        // Web3 Transition Messages\n        addWeb3TransitionMessages() {\n            const messages = [\n                \"🌐 Welcome to Web3 - Your wallet, Your control!\",\n                \"💎 USDT FLASH: The bridge to decentralized finance\",\n                \"🚀 Experience true financial freedom with Web3\",\n                \"⚡ Convert USDT FLASH → Real USDT in 24 hours!\"\n            ];\n            \n            let messageIndex = 0;\n            \n            // Create message banner\n            const banner = document.createElement('div');\n            banner.innerHTML = `\n                <div class=\"fixed top-16 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-2 rounded-full shadow-lg z-40 transition-all duration-500\">\n                    <div class=\"flex items-center\">\n                        <i class=\"fas fa-cube mr-2 animate-spin\"></i>\n                        <span id=\"web3-message\" class=\"font-semibold\"></span>\n                    </div>\n                </div>\n            `;\n            \n            document.body.appendChild(banner);\n            \n            // Update message every 12 seconds\n            setInterval(() => {\n                const messageElement = document.getElementById('web3-message');\n                if (messageElement) {\n                    messageElement.textContent = messages[messageIndex % messages.length];\n                    messageIndex++;\n                }\n            }, 12000);\n            \n            // Initialize first message\n            setTimeout(() => {\n                const messageElement = document.getElementById('web3-message');\n                if (messageElement) {\n                    messageElement.textContent = messages[0];\n                }\n            }, 2000);\n        }\n        \n        // FOMO Triggers\n        implementFOMOTriggers() {\n            // Price increase countdown\n            const priceCountdown = document.createElement('div');\n            priceCountdown.innerHTML = `\n                <div class=\"fixed bottom-4 left-4 bg-red-600 text-white p-4 rounded-lg shadow-2xl z-40 max-w-sm\">\n                    <div class=\"flex items-center mb-2\">\n                        <i class=\"fas fa-fire text-yellow-300 mr-2 animate-bounce\"></i>\n                        <span class=\"font-bold\">PRICE ALERT!</span>\n                    </div>\n                    <p class=\"text-sm mb-2\">USDT FLASH prices increasing in:</p>\n                    <div class=\"text-2xl font-bold\" id=\"price-countdown\">02:47:33</div>\n                    <p class=\"text-xs mt-1\">Secure your rate now!</p>\n                </div>\n            `;\n            \n            document.body.appendChild(priceCountdown);\n            \n            // Countdown timer\n            let timeLeft = 2 * 3600 + 47 * 60 + 33; // 2:47:33\n            \n            setInterval(() => {\n                const countdownElement = document.getElementById('price-countdown');\n                if (countdownElement && timeLeft > 0) {\n                    const hours = Math.floor(timeLeft / 3600);\n                    const minutes = Math.floor((timeLeft % 3600) / 60);\n                    const seconds = timeLeft % 60;\n                    \n                    countdownElement.textContent = \n                        `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;\n                    \n                    timeLeft--;\n                }\n            }, 1000);\n        }\n    }\n    \n    // Enhanced Package Buttons with Conversion Focus\n    function enhancePackageButtons() {\n        const packageButtons = document.querySelectorAll('.package-card button, .tether-action-button');\n        \n        packageButtons.forEach(button => {\n            // Add conversion messaging\n            const originalText = button.textContent;\n            \n            button.addEventListener('mouseenter', () => {\n                button.innerHTML = `\n                    <i class=\"fas fa-exchange-alt mr-2\"></i>\n                    Convert to Real USDT\n                `;\n            });\n            \n            button.addEventListener('mouseleave', () => {\n                button.textContent = originalText;\n            });\n            \n            // Add click tracking\n            button.addEventListener('click', () => {\n                // Store conversion intent\n                localStorage.setItem('conversionIntent', 'true');\n                localStorage.setItem('conversionTimestamp', Date.now());\n            });\n        });\n    }\n    \n    // Conversion Success Stories\n    function addConversionStories() {\n        const stories = [\n            {\n                name: \"Ahmed M.\",\n                location: \"Dubai\",\n                story: \"Converted 4000 USDT FLASH → Got 3000 real USDT after 24h!\",\n                profit: \"+$3000\"\n            },\n            {\n                name: \"Sarah K.\",\n                location: \"Cairo\",\n                story: \"Used PEPE conversion method, withdrew real USDT to Binance!\",\n                profit: \"+$1500\"\n            },\n            {\n                name: \"Mohamed R.\",\n                location: \"Riyadh\",\n                story: \"DOGE conversion worked perfectly, real USDT in my wallet!\",\n                profit: \"+$2200\"\n            }\n        ];\n        \n        const storiesContainer = document.createElement('div');\n        storiesContainer.innerHTML = `\n            <div class=\"fixed top-1/2 right-4 transform -translate-y-1/2 max-w-xs z-30\">\n                <div id=\"success-story\" class=\"bg-green-50 border border-green-200 p-4 rounded-lg shadow-lg transform translate-x-full transition-transform duration-500\">\n                    <div class=\"flex items-center mb-2\">\n                        <div class=\"w-8 h-8 bg-green-500 rounded-full flex items-center justify-center mr-3\">\n                            <i class=\"fas fa-check text-white text-xs\"></i>\n                        </div>\n                        <div>\n                            <div class=\"font-bold text-green-800\" id=\"story-name\"></div>\n                            <div class=\"text-xs text-green-600\" id=\"story-location\"></div>\n                        </div>\n                    </div>\n                    <p class=\"text-sm text-green-700 mb-2\" id=\"story-text\"></p>\n                    <div class=\"text-right\">\n                        <span class=\"bg-green-500 text-white px-2 py-1 rounded text-xs font-bold\" id=\"story-profit\"></span>\n                    </div>\n                </div>\n            </div>\n        `;\n        \n        document.body.appendChild(storiesContainer);\n        \n        // Show success stories every 25 seconds\n        let storyIndex = 0;\n        setInterval(() => {\n            const story = stories[storyIndex % stories.length];\n            const storyElement = document.getElementById('success-story');\n            \n            if (storyElement) {\n                document.getElementById('story-name').textContent = story.name;\n                document.getElementById('story-location').textContent = story.location;\n                document.getElementById('story-text').textContent = story.story;\n                document.getElementById('story-profit').textContent = story.profit;\n                \n                // Show story\n                storyElement.style.transform = 'translateX(0)';\n                \n                // Hide after 7 seconds\n                setTimeout(() => {\n                    storyElement.style.transform = 'translateX(100%)';\n                }, 7000);\n                \n                storyIndex++;\n            }\n        }, 25000);\n    }\n    \n    // Initialize Advanced Persuasion System\n    document.addEventListener('DOMContentLoaded', function() {\n        // Small delay to ensure page is fully loaded\n        setTimeout(() => {\n            new AdvancedPersuasion();\n            enhancePackageButtons();\n            addConversionStories();\n            \n            console.log('🧠 Advanced Persuasion System Activated');\n            console.log('💰 USDT FLASH → Real USDT conversion messaging enabled');\n        }, 2000);\n    });\n    \n})();"
