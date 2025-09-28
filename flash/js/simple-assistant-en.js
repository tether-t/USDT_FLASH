// 🤖 Professional Advanced Assistant System - English Version
function initAssistant() {
    
    // Create Assistant HTML
    const assistantHTML = `
        <div class="assistant-container">
            <div class="assistant-sidebar">
                <div class="sidebar-header">
                    <div class="logo-section">
                        <i class="fas fa-robot"></i>
                        <h3>USDT-FLASH Assistant</h3>
                        <span class="status-badge">🟢 Available Now</span>
                    </div>
                </div>
                
                <div class="questions-panel">
                    <h4>Frequently Asked Questions</h4>
                    <div class="questions-grid">
                        <button class="question-card" data-msg="What is USDT-FLASH and how does it work?">
                            <div class="card-icon">⚡</div>
                            <div class="card-text">What is USDT-FLASH?</div>
                        </button>
                        <button class="question-card" data-msg="Where can I store USDT-FLASH?">
                            <div class="card-icon">💼</div>
                            <div class="card-text">Where to store it?</div>
                        </button>
                        <button class="question-card" data-msg="How do I convert USDT-FLASH to meme coins?">
                            <div class="card-icon">🔄</div>
                            <div class="card-text">How to convert it?</div>
                        </button>
                        <button class="question-card" data-msg="What is the 25% service fee?">
                            <div class="card-icon">💰</div>
                            <div class="card-text">Service Fee</div>
                        </button>
                        <button class="question-card" data-msg="How long is USDT-FLASH valid?">
                            <div class="card-icon">⏳</div>
                            <div class="card-text">Validity Period</div>
                        </button>
                        <button class="question-card" data-msg="Why wait 24 hours?">
                            <div class="card-icon">⏰</div>
                            <div class="card-text">24 Hour Wait</div>
                        </button>
                        <button class="question-card" data-msg="What meme coins are supported?">
                            <div class="card-icon">🐶</div>
                            <div class="card-text">Meme Coins</div>
                        </button>
                        <button class="question-card" data-msg="Can I sell USDT-FLASH directly?">
                            <div class="card-icon">⚠️</div>
                            <div class="card-text">Direct Selling</div>
                        </button>
                        <button class="question-card" data-msg="What platforms are supported?">
                            <div class="card-icon">🎯</div>
                            <div class="card-text">Supported Platforms</div>
                        </button>
                        <button class="question-card" data-msg="How to avoid losing my balance?">
                            <div class="card-icon">🛡️</div>
                            <div class="card-text">Avoid Loss</div>
                        </button>
                        <button class="question-card" data-msg="Is USDT-FLASH safe and trusted?">
                            <div class="card-icon">🔒</div>
                            <div class="card-text">Safety & Trust</div>
                        </button>
                        <button class="question-card" data-msg="Why do thousands trust USDT-FLASH?">
                            <div class="card-icon">🎆</div>
                            <div class="card-text">Why Trust?</div>
                        </button>
                        <button class="question-card" data-msg="How to start trading journey?">
                            <div class="card-icon">🚀</div>
                            <div class="card-text">Start Trading</div>
                        </button>
                        <button class="question-card" data-msg="What is Web3 and why important?">
                            <div class="card-icon">🌐</div>
                            <div class="card-text">What is Web3?</div>
                        </button>
                        <button class="question-card" data-msg="Available payment methods">
                            <div class="card-icon">💳</div>
                            <div class="card-text">Payment Methods</div>
                        </button>
                        <button class="question-card" data-msg="24/7 Technical Support">
                            <div class="card-icon">🎧</div>
                            <div class="card-text">Technical Support</div>
                        </button>
                    </div>
                </div>
            </div>
            
            <div class="chat-main">
                <div class="chat-header">
                    <h2>💬 Live Chat</h2>
                    <button class="minimize-btn" id="minimizeBtn">🗕</button>
                </div>
                
                <div class="chat-messages" id="chatMessages">
                    <div class="welcome-message">
                        <div class="bot-avatar">🤖</div>
                        <div class="message-content">
                            <strong>Welcome to USDT-FLASH Assistant!</strong><br>
                            Choose a question from the list or type your question directly
                        </div>
                    </div>
                </div>
                
                <div class="chat-input-area">
                    <div class="input-wrapper">
                        <input type="text" id="userInput" placeholder="Type your question here..." autocomplete="off">
                        <button id="sendBtn" title="Send">
                            <i class="fas fa-paper-plane"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // Add HTML to page
    const container = document.createElement('div');
    container.style.position = 'fixed';
    container.style.top = '0';
    container.style.left = '0';
    container.style.width = '100vw';
    container.style.height = '100vh';
    container.style.zIndex = '999999';
    container.innerHTML = assistantHTML;
    
    document.body.appendChild(container);
    
    // Hide original page content
    document.body.style.overflow = 'hidden';
    
    // Get elements
    const userInput = document.getElementById('userInput');
    const sendBtn = document.getElementById('sendBtn');
    const minimizeBtn = document.getElementById('minimizeBtn');
    const chatMessages = document.getElementById('chatMessages');
    const assistantContainer = document.querySelector('.assistant-container');
    
    // Minimize/maximize window
    let isMinimized = false;
    minimizeBtn.addEventListener('click', () => {
        isMinimized = !isMinimized;
        assistantContainer.classList.toggle('minimized', isMinimized);
        minimizeBtn.textContent = isMinimized ? '🗖' : '🗕';
        minimizeBtn.title = isMinimized ? 'Maximize' : 'Minimize';
        
        // Show/hide page content
        document.body.style.overflow = isMinimized ? 'auto' : 'hidden';
    });
    
    // Send message
    function sendMessage() {
        const message = userInput.value.trim();
        if (!message) return;
        
        addMessage(message, 'user');
        userInput.value = '';
        
        setTimeout(() => {
            const response = getResponse(message);
            addMessage(response, 'bot');
        }, 800);
    }
    
    // Add message
    function addMessage(text, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `chat-message ${sender}-message`;
        
        if (sender === 'user') {
            messageDiv.innerHTML = `
                <div class="user-avatar">👤</div>
                <div class="message-content user-content">${text}</div>
            `;
        } else {
            messageDiv.innerHTML = `
                <div class="bot-avatar">🤖</div>
                <div class="message-content bot-content">${text}</div>
            `;
        }
        
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
    
    // Get response
    function getResponse(message) {
        const msg = message.toLowerCase();
        
        if (msg.includes('what is usdt-flash') || msg.includes('how does it work')) {
            return '<strong>⚡ USDT-FLASH is a smart and secure digital balance</strong><br>• Works in Web3 environment<br>• Valid for 365 days<br>• Gives you fast and flexible access to global trading platforms';
        }
        
        if (msg.includes('store') || msg.includes('where can i')) {
            return '<strong>💼 You can store USDT-FLASH in:</strong><br>• MetaMask<br>• Trust Wallet<br>• Binance<br>• Bybit<br>• Any supported Web3 wallet';
        }
        
        if (msg.includes('convert') || msg.includes('meme coins')) {
            return '<strong>🔄 Conversion Steps:</strong><br>1. Receive USDT-FLASH in your wallet<br>2. Convert it to meme coin (PEPE, DOGE, SHIBA)<br>3. Hold the coin for 24 hours<br>4. Sell and get real USDT';
        }
        
        if (msg.includes('fee') || msg.includes('25%')) {
            return '<strong>💰 25% Service Fee:</strong><br>• 25% is deducted when selling meme coin<br>• This fee is based on official agreement<br>• Between our platform and partner exchanges';
        }
        
        if (msg.includes('valid') || msg.includes('365')) {
            return '<strong>⏳ Validity Period:</strong><br>• USDT-FLASH is valid for 365 days<br>• From the moment you receive it<br>• You can use it anytime during this period';
        }
        
        if (msg.includes('24 hours') || msg.includes('wait')) {
            return '<strong>⏰ Why wait 24 hours?</strong><br>• To ensure full activation of the coin<br>• To avoid any technical issues<br>• To guarantee you get real USDT';
        }
        
        if (msg.includes('meme coins are supported')) {
            return '<strong>🐶 Supported Meme Coins:</strong><br>• PEPE - The famous frog coin<br>• DOGE - The digital dog coin<br>• SHIBA - Shiba Inu coin<br>• All officially supported';
        }
        
        if (msg.includes('sell') && msg.includes('directly')) {
            return '<strong>⚠️ Do not sell USDT-FLASH directly!</strong><br>• You must convert it to meme coin first<br>• Otherwise you will lose your balance<br>• Always follow the correct steps';
        }
        
        if (msg.includes('platforms') || msg.includes('supported')) {
            return '<strong>🎯 Supported Platforms:</strong><br>• Binance - World\'s #1 exchange<br>• Bybit - Advanced trading platform<br>• OKX - Trusted global exchange<br>• And other major platforms';
        }
        
        if (msg.includes('avoid') || msg.includes('losing')) {
            return '<strong>🛡️ Important rules to avoid losing balance:</strong><br>• Don\'t sell USDT-FLASH directly<br>• Don\'t send with username - use full wallet address<br>• Use Web3 wallets only<br>• Wait 24 hours after conversion';
        }
        
        if (msg.includes('safe') || msg.includes('trusted')) {
            return '<strong>🔒 USDT-FLASH is 100% safe and trusted:</strong><br>• Fully Web3 compatible<br>• Transparent system with no tricks<br>• Supported by global platforms<br>• Thousands of satisfied customers';
        }
        
        if (msg.includes('trust') || msg.includes('thousands')) {
            return '<strong>🎆 Why thousands trust USDT-FLASH:</strong><br>• Safe and Web3 compatible<br>• Easily converts to real USDT<br>• Profits can be used on any exchange<br>• Transparent system with no complexity';
        }
        
        if (msg.includes('start') || msg.includes('journey')) {
            return '<strong>🚀 Start your trading journey now:</strong><br>• Get USDT-FLASH<br>• Start with confidence and smart strategy<br>• Achieve real profits<br>• The earlier you start, the more you earn!';
        }
        
        if (msg.includes('web3')) {
            return '<strong>🌐 Web3 - The future of internet:</strong><br>• You own your data and money<br>• No intermediaries or third parties<br>• Complete freedom in trading<br>• The future of digital currencies';
        }
        
        if (msg.includes('payment') || msg.includes('methods')) {
            return '<strong>💳 Available Payment Method:</strong><br>• TRC20 only<br>• Safe and fast TRON network<br>• Very low fees<br>• Instant transaction confirmation';
        }
        
        if (msg.includes('support') || msg.includes('24/7')) {
            return '<strong>🎧 24/7 Technical Support:</strong><br>• Professional specialized team<br>• Response within minutes<br>• Multi-language support<br>• Fast and effective solutions';
        }
        
        return '<strong>🤖 Thank you for your question!</strong><br>You can choose one of the topics above or contact our support team for specialized assistance.';
    }
    
    // Event listeners
    sendBtn.addEventListener('click', sendMessage);
    userInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') sendMessage();
    });
    
    // Quick options
    document.addEventListener('click', (e) => {
        const questionCard = e.target.closest('.question-card');
        if (questionCard) {
            const message = questionCard.dataset.msg;
            addMessage(message, 'user');
            setTimeout(() => {
                const response = getResponse(message);
                addMessage(response, 'bot');
            }, 800);
        }
    });
    
    console.log('✅ Assistant loaded');
}

// Run on demand only
window.initAssistant = initAssistant;