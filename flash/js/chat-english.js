// English Chat System for USDT-FLASH
class ChatSystem {
    constructor() {
        this.isOpen = false;
        this.init();
        this.initFAQ();
    }

    init() {
        this.createChatInterface();
        this.setupEventListeners();
    }

    initFAQ() {
        this.faqData = {
            'what_is_usdt': {
                keywords: ['what', 'usdt', 'usdt-flash', 'definition', 'meaning', 'about'],
                title: '💰 What is USDT-FLASH?',
                answer: `🚀 **USDT-FLASH** is a special token based on Tether (USDT) technology with enhancements for fast transactions.

⚡ **Key Features:**
• Instant transactions (less than 5 seconds)
• Very low fees
• Compatible with popular digital wallets
• Used in e-commerce and fast transfers

📊 **Use Cases:**
• Quick purchases
• International transfers
• Investment and trading
• Commercial payments`
            },
            'how_to_buy': {
                keywords: ['how', 'buy', 'purchase', 'steps', 'buying', 'order'],
                title: '🛒 How can I buy USDT-FLASH?',
                answer: `🎯 **Simple Purchase Steps:**

**1️⃣ Choose Package:**
• Basic Package: 499 USDT-FLASH for $29.99
• Professional Package: 2,500 USDT-FLASH for $99.99  
• Enterprise Package: 10,000 USDT-FLASH for $199

**2️⃣ Available Payment Methods:**
• USDT (TRC20/ERC20)
• Bitcoin (BTC)
• Ethereum (ETH)
• Bank Transfer

**3️⃣ Delivery:**
• Instant delivery after payment confirmation
• Receive directly to your wallet
• 24/7 customer support`
            },
            'security': {
                keywords: ['security', 'safe', 'protection', 'secure', 'trust', 'safety'],
                title: '🔒 Is USDT-FLASH secure?',
                answer: `🛡️ **Maximum Security Standards:**

✅ **Official Tether Partnership:**
• Verified and certified by Tether
• Full compliance with international standards
• Regular security audits

🔐 **Advanced Protection:**
• Multi-signature wallets
• Cold storage systems
• 256-bit encryption
• Two-factor authentication (2FA)

🏆 **Trust Indicators:**
• 10,000+ satisfied customers
• 99.9% uptime guarantee
• ISO 27001 certified
• Full insurance coverage`
            },
            'support': {
                keywords: ['support', 'help', 'contact', 'assistance', 'customer', 'service'],
                title: '🎧 Customer Support',
                answer: `💬 **24/7 Customer Support Available:**

📞 **Contact Methods:**
• Live Chat: Available now
• Email: support@usdt-flash.com
• Telegram: @USDTFlashSupport
• WhatsApp: +1-555-FLASH

⏰ **Response Times:**
• Live Chat: Instant
• Email: Within 2 hours
• Telegram: Within 1 hour
• WhatsApp: Within 30 minutes

🌟 **Support Languages:**
• English
• Spanish
• French
• German
• Russian`
            },
            'fees': {
                keywords: ['fees', 'cost', 'charges', 'price', 'commission'],
                title: '💸 Transaction Fees',
                answer: `💰 **Transparent Fee Structure:**

🎯 **Low Transaction Fees:**
• Internal transfers: FREE
• External transfers: 0.1%
• Withdrawal fees: $1 USDT
• No hidden charges

🚀 **Black Friday Special:**
• 200 USDT-FLASH for only $15
• 92% discount (was $200)
• Limited time offer
• No additional fees

💎 **VIP Benefits:**
• Volumes over $1000: 50% fee reduction
• Monthly traders: Special rates
• Enterprise clients: Custom pricing`
            },
            'delivery': {
                keywords: ['delivery', 'receive', 'time', 'when', 'fast', 'instant'],
                title: '⚡ Delivery Time',
                answer: `🚀 **Lightning Fast Delivery:**

⏱️ **Instant Processing:**
• Payment confirmation: 1-3 minutes
• Token delivery: Instant
• Wallet crediting: Under 30 seconds
• Full transaction: Under 5 minutes

🔄 **Automated System:**
• 24/7 automated processing
• No manual delays
• Real-time notifications
• Instant confirmations

📱 **Track Your Order:**
• Real-time status updates
• SMS notifications
• Email confirmations
• Transaction ID provided`
            }
        };
    }

    createChatInterface() {
        const chatHTML = `
            <div id="chat-widget" class="chat-widget">
                <div class="chat-toggle" onclick="chatSystem.toggleChat()">
                    <i class="fas fa-comments"></i>
                    <span class="chat-badge">💬</span>
                </div>
                
                <div class="chat-container" id="chatContainer">
                    <div class="chat-header">
                        <div class="chat-title">
                            <i class="fas fa-headset mr-2"></i>
                            USDT-FLASH Support
                        </div>
                        <button class="chat-close" onclick="chatSystem.toggleChat()">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>
                    
                    <div class="chat-messages" id="chatMessages">
                        <div class="message bot-message">
                            <div class="message-content">
                                👋 Welcome to USDT-FLASH Support!<br>
                                How can I help you today?
                            </div>
                        </div>
                    </div>
                    
                    <div class="quick-actions">
                        <button onclick="chatSystem.sendQuickMessage('What is USDT-FLASH?')">What is USDT-FLASH?</button>
                        <button onclick="chatSystem.sendQuickMessage('How to buy?')">How to buy?</button>
                        <button onclick="chatSystem.sendQuickMessage('Is it secure?')">Security</button>
                        <button onclick="chatSystem.sendQuickMessage('Support contact')">Contact Support</button>
                    </div>
                    
                    <div class="chat-input-container">
                        <input type="text" id="chatInput" placeholder="Type your message..." onkeypress="chatSystem.handleKeyPress(event)">
                        <button onclick="chatSystem.sendMessage()" class="chat-send-btn">
                            <i class="fas fa-paper-plane"></i>
                        </button>
                    </div>
                </div>
            </div>
        `;
        
        document.body.insertAdjacentHTML('beforeend', chatHTML);
        this.addChatStyles();
    }

    addChatStyles() {
        const styles = `
            <style>
                .chat-widget {
                    position: fixed;
                    bottom: 20px;
                    right: 20px;
                    z-index: 9999;
                    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                }
                
                .chat-toggle {
                    width: 60px;
                    height: 60px;
                    background: linear-gradient(135deg, #10b981, #059669);
                    border-radius: 50%;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: white;
                    font-size: 24px;
                    box-shadow: 0 4px 20px rgba(16, 185, 129, 0.4);
                    transition: all 0.3s ease;
                    position: relative;
                }
                
                .chat-toggle:hover {
                    transform: scale(1.1);
                    box-shadow: 0 6px 25px rgba(16, 185, 129, 0.6);
                }
                
                .chat-badge {
                    position: absolute;
                    top: -5px;
                    right: -5px;
                    background: #ef4444;
                    border-radius: 50%;
                    width: 20px;
                    height: 20px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 10px;
                    animation: pulse 2s infinite;
                }
                
                .chat-container {
                    position: absolute;
                    bottom: 80px;
                    right: 0;
                    width: 350px;
                    height: 500px;
                    background: white;
                    border-radius: 16px;
                    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
                    display: none;
                    flex-direction: column;
                    overflow: hidden;
                }
                
                .chat-container.active {
                    display: flex;
                    animation: slideUp 0.3s ease-out;
                }
                
                @keyframes slideUp {
                    from { transform: translateY(20px); opacity: 0; }
                    to { transform: translateY(0); opacity: 1; }
                }
                
                .chat-header {
                    background: linear-gradient(135deg, #10b981, #059669);
                    color: white;
                    padding: 16px;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }
                
                .chat-title {
                    font-weight: 600;
                    font-size: 16px;
                }
                
                .chat-close {
                    background: none;
                    border: none;
                    color: white;
                    cursor: pointer;
                    font-size: 18px;
                    padding: 4px;
                }
                
                .chat-messages {
                    flex: 1;
                    padding: 16px;
                    overflow-y: auto;
                    background: #f9fafb;
                }
                
                .message {
                    margin-bottom: 12px;
                }
                
                .message-content {
                    padding: 12px 16px;
                    border-radius: 18px;
                    max-width: 80%;
                    word-wrap: break-word;
                    line-height: 1.4;
                }
                
                .bot-message .message-content {
                    background: #e5e7eb;
                    color: #374151;
                    margin-right: auto;
                }
                
                .user-message .message-content {
                    background: linear-gradient(135deg, #10b981, #059669);
                    color: white;
                    margin-left: auto;
                }
                
                .quick-actions {
                    padding: 12px 16px;
                    display: flex;
                    flex-wrap: wrap;
                    gap: 8px;
                    background: white;
                    border-top: 1px solid #e5e7eb;
                }
                
                .quick-actions button {
                    padding: 6px 12px;
                    border: 1px solid #d1d5db;
                    border-radius: 16px;
                    background: white;
                    color: #6b7280;
                    font-size: 12px;
                    cursor: pointer;
                    transition: all 0.2s ease;
                }
                
                .quick-actions button:hover {
                    background: #10b981;
                    color: white;
                    border-color: #10b981;
                }
                
                .chat-input-container {
                    padding: 16px;
                    background: white;
                    border-top: 1px solid #e5e7eb;
                    display: flex;
                    gap: 8px;
                }
                
                #chatInput {
                    flex: 1;
                    padding: 12px 16px;
                    border: 1px solid #d1d5db;
                    border-radius: 24px;
                    outline: none;
                    font-size: 14px;
                }
                
                #chatInput:focus {
                    border-color: #10b981;
                    box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.1);
                }
                
                .chat-send-btn {
                    width: 48px;
                    height: 48px;
                    background: linear-gradient(135deg, #10b981, #059669);
                    border: none;
                    border-radius: 50%;
                    color: white;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    transition: all 0.2s ease;
                }
                
                .chat-send-btn:hover {
                    transform: scale(1.05);
                    box-shadow: 0 2px 10px rgba(16, 185, 129, 0.3);
                }
                
                @media (max-width: 768px) {
                    .chat-container {
                        width: 320px;
                        height: 450px;
                    }
                }
            </style>
        `;
        
        document.head.insertAdjacentHTML('beforeend', styles);
    }

    toggleChat() {
        const container = document.getElementById('chatContainer');
        this.isOpen = !this.isOpen;
        
        if (this.isOpen) {
            container.classList.add('active');
            // Show welcome toast
            if (typeof showInfoToast === 'function') {
                showInfoToast('💬 Chat support is now active!', 3000);
            }
        } else {
            container.classList.remove('active');
        }
    }

    sendMessage() {
        const input = document.getElementById('chatInput');
        const message = input.value.trim();
        
        if (message) {
            this.addMessage(message, 'user');
            input.value = '';
            
            setTimeout(() => {
                this.processMessage(message);
            }, 500);
        }
    }

    sendQuickMessage(message) {
        this.addMessage(message, 'user');
        setTimeout(() => {
            this.processMessage(message);
        }, 500);
    }

    addMessage(content, type) {
        const messagesContainer = document.getElementById('chatMessages');
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${type}-message`;
        messageDiv.innerHTML = `<div class="message-content">${content}</div>`;
        
        messagesContainer.appendChild(messageDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    processMessage(message) {
        const lowerMessage = message.toLowerCase();
        let response = null;

        // Find matching FAQ
        for (const [key, faq] of Object.entries(this.faqData)) {
            if (faq.keywords.some(keyword => lowerMessage.includes(keyword.toLowerCase()))) {
                response = faq;
                break;
            }
        }

        if (response) {
            this.addMessage(`<strong>${response.title}</strong><br><br>${response.answer}`, 'bot');
        } else {
            // Default response
            this.addMessage(`Thank you for your message! 🙏<br><br>
                For immediate assistance, please contact our support team:<br>
                📧 Email: support@usdt-flash.com<br>
                💬 Telegram: @USDTFlashSupport<br>
                📱 WhatsApp: +1-555-FLASH<br><br>
                Or try asking about:<br>
                • What is USDT-FLASH?<br>
                • How to buy?<br>
                • Security features<br>
                • Transaction fees`, 'bot');
        }

        // Show success toast
        if (typeof showSuccessToast === 'function') {
            showSuccessToast('✅ Response received!', 2000);
        }
    }

    handleKeyPress(event) {
        if (event.key === 'Enter') {
            this.sendMessage();
        }
    }
}

// Initialize chat system when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    window.chatSystem = new ChatSystem();
});