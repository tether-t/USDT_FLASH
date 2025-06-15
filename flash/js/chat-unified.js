// وظائف الدردشة الموحدة - دمج chat.js و chat-icon-float.js و floating-assistant.js

document.addEventListener('DOMContentLoaded', function() {
    // إضافة عناصر الدردشة إلى الصفحة
    const chatHTML = `
        <div class="chat-icon" id="chat-icon">
            <i class="fas fa-comments"></i>
        </div>
        <div class="chat-window" id="chat-window">
            <div class="chat-header">
                <h3>USDT-FLASH Assistant</h3>
                <button class="close-chat" id="close-chat">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="chat-messages" id="chat-messages">
                <div class="message assistant">
                    Welcome to USDT-FLASH! I can help you with many inquiries.
                    
What would you like to know?
                </div>
                <div class="chat-options">
                    <div class="chat-option" data-query="How to purchase and pay">
                        <i class="fas fa-shopping-cart"></i>
                        <span>How to purchase and pay</span>
                    </div>
                    <div class="chat-option" data-query="Package details and pricing">
                        <i class="fas fa-tags"></i>
                        <span>Packages and pricing</span>
                    </div>
                    <div class="chat-option" data-query="Account creation and management">
                        <i class="fas fa-user-circle"></i>
                        <span>Account management</span>
                    </div>
                    <div class="chat-option" data-query="Transaction security">
                        <i class="fas fa-shield-alt"></i>
                        <span>Security and privacy</span>
                    </div>
                    <div class="chat-option" data-query="Information about USDT-FLASH">
                        <i class="fas fa-info-circle"></i>
                        <span>About USDT-FLASH</span>
                    </div>
                </div>
            </div>
            <div class="chat-input">
                <input type="text" id="chat-input-field" placeholder="Type your message here...">
                <button id="send-message">
                    <i class="fas fa-paper-plane"></i>
                </button>
            </div>
        </div>
    `;
    
    // إضافة عناصر الدردشة إلى الصفحة
    const chatContainer = document.createElement('div');
    chatContainer.innerHTML = chatHTML;
    document.body.appendChild(chatContainer);
    
    // الحصول على العناصر
    const chatIcon = document.getElementById('chat-icon');
    const chatWindow = document.getElementById('chat-window');
    const closeChat = document.getElementById('close-chat');
    const chatMessages = document.getElementById('chat-messages');
    const chatInputField = document.getElementById('chat-input-field');
    const sendMessage = document.getElementById('send-message');
    
    // تطبيق أنماط العائمة على أيقونة الدردشة
    applyFloatingStyles(chatIcon);
    
    // إضافة مستمعي الأحداث للأيقونات التفاعلية
    setTimeout(() => {
        const chatOptions = document.querySelectorAll('.chat-option');
        chatOptions.forEach(option => {
            option.addEventListener('click', function() {
                const query = this.getAttribute('data-query');
                chatInputField.value = query;
                sendUserMessage();
                
                // إزالة خيارات الدردشة بعد النقر على أحدها
                const chatOptionsContainer = document.querySelector('.chat-options');
                if (chatOptionsContainer) {
                    chatOptionsContainer.remove();
                }
            });
        });
    }, 100);
    
    // فتح/إغلاق نافذة الدردشة
    chatIcon.addEventListener('click', function() {
        chatWindow.classList.toggle('active');
    });
    
    closeChat.addEventListener('click', function() {
        chatWindow.classList.remove('active');
    });
    
    // إرسال رسالة
    function sendUserMessage() {
        const message = chatInputField.value.trim();
        if (message) {
            // إضافة رسالة المستخدم
            addMessage(message, 'user');
            chatInputField.value = '';
            
            // محاكاة رد المساعد بعد ثانية واحدة
            setTimeout(function() {
                const response = getAssistantResponse(message.toLowerCase());
                addMessage(response, 'assistant');
                
                // إضافة أيقونات الخيارات بعد الرد الافتراضي
                if (response.includes('ما الذي ترغب في معرفته؟')) {
                    addChatOptions();
                }
            }, 1000);
        }
    }
    
    // تطبيق أنماط العائمة على أيقونة الدردشة
    function applyFloatingStyles(icon) {
        // Set position to fixed
        icon.style.position = 'fixed';
        icon.style.bottom = '20px';
        icon.style.right = '20px';
        icon.style.zIndex = '1000';
        icon.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
        icon.style.borderRadius = '50%';
        icon.style.transition = 'all 0.3s ease';
        
        // Add hover effect
        icon.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1)';
            this.style.boxShadow = '0 6px 16px rgba(0, 0, 0, 0.2)';
        });
        
        icon.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
            this.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
        });
        
        // Check for RTL
        const htmlDir = document.documentElement.dir || 'ltr';
        if (htmlDir === 'rtl') {
            icon.style.left = '20px';
            icon.style.right = 'auto';
        }
    }
    
    // Get assistant response based on user question
    function getAssistantResponse(question) {
        // Questions about how to purchase
        if (question.includes('how') && (question.includes('purchase') || question.includes('buy'))) {
            return `To purchase USDT-FLASH, follow these steps:
            
1. Create an account on our platform or log in if you already have an account.
2. Choose the package that suits you from the available packages (Basic, Professional, or Enterprise).
3. Go to the payment page and enter the required payment information.
4. After confirming the payment, USDT-FLASH will be added to your account immediately.

Do you need help with any of these steps?`;
        }
        
        // Questions about how to pay
        else if (question.includes('how') && question.includes('pay')) {
            return `To complete the payment process, follow these steps:
            
1. After selecting the package, you will automatically be directed to the payment page.
2. Send the required amount of USDT to the wallet address displayed on the screen.
3. Make sure to use the Tron (TRC20) network when sending USDT to avoid any additional fees.
4. Enter the transaction ID in the designated field.
5. Click on "Complete Payment" and wait for the transaction confirmation.

Are you experiencing any difficulties with the payment process?`;
        }
        
        // Questions about packages
        else if (question.includes('package') || question.includes('plan') || question.includes('price')) {
            return `We offer 3 main packages:
            
1. Basic Package: $50 for 250 USDT-FLASH
   - Includes basic support and email verification.

2. Professional Package: $200 for 2500 USDT-FLASH
   - Includes priority support, phone and email support, and identity verification.

3. Enterprise Package: $500 for 10,000 USDT-FLASH
   - Includes 24/7 dedicated support, VIP account manager, and advanced security.

Which package suits your needs?`;
        }
        
        // Questions about security
        else if (question.includes('security') || question.includes('secure') || question.includes('protection')) {
            return `We take the security of your transactions seriously:
            
1. We use 256-bit encryption to protect all data and transactions.
2. We implement a cold storage system for funds to protect them from hacking.
3. We conduct regular third-party audits to ensure system security.
4. We use bank-level security protocols to protect your personal information.

Do you have any specific concerns about security?`;
        }
        
        // Questions about account
        else if (question.includes('account') || question.includes('register') || question.includes('login')) {
            return `To manage your account:
            
1. Create an account: Click on "Register" in the top bar and enter your information.
2. Log in: Use the email and password you created your account with.
3. Edit account: After logging in, you can edit your account information from the dashboard.
4. Password recovery: If you forgot your password, click on "Forgot Password?" on the login page.

Do you need help with any of these processes?`;
        }
        
        // Questions about USDT-FLASH
        else if (question.includes('usdt') || question.includes('flash') || question.includes('currency')) {
            return `USDT-FLASH is a stable digital currency pegged to the US dollar:
            
1. Value: Each USDT-FLASH equals one US dollar.
2. Usage: It can be used for online transactions, investments, and cross-border payments.
3. Features: Low fees, fast transactions, and high security.
4. Compatibility: Compatible with most digital wallets that support USDT.

Would you like to know more about USDT-FLASH features?`;
        }
        
        // Questions about support
        else if (question.includes('support') || question.includes('help') || question.includes('problem')) {
            return `To get support:
            
1. Live chat: You can contact us through this window 24/7.
2. Email: Contact us at support@flashusdt.com for assistance.
3. Phone: Call us at +1 (555) 123-4567 during business hours.
4. Help center: Visit the FAQ section on our website for quick answers.

How can I assist you today?`;
        }
        
        // Default welcome message
        else {
            return `Welcome to USDT-FLASH! I can help you with many inquiries.

What would you like to know?`;
        }
    }
    
    // إضافة رسالة إلى نافذة الدردشة
    function addMessage(text, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message', sender);
        messageDiv.textContent = text;
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
        
        // إعادة إظهار الأيقونات بعد رد المساعد إذا كان الرد هو الرد الافتراضي
        if (sender === 'assistant' && text.includes('ما الذي ترغب في معرفته؟')) {
            addChatOptions();
        }
    }
    
    // Add chat options
    function addChatOptions() {
        // Check if options already exist
        if (document.querySelector('.chat-options')) {
            return;
        }
        
        const optionsHTML = `
            <div class="chat-options">
                <div class="chat-option" data-query="How to purchase and pay">
                    <i class="fas fa-shopping-cart"></i>
                    <span>How to purchase and pay</span>
                </div>
                <div class="chat-option" data-query="Package details and pricing">
                    <i class="fas fa-tags"></i>
                    <span>Packages and pricing</span>
                </div>
                <div class="chat-option" data-query="Account creation and management">
                    <i class="fas fa-user-circle"></i>
                    <span>Account management</span>
                </div>
                <div class="chat-option" data-query="Transaction security">
                    <i class="fas fa-shield-alt"></i>
                    <span>Security and privacy</span>
                </div>
                <div class="chat-option" data-query="Information about USDT-FLASH">
                    <i class="fas fa-info-circle"></i>
                    <span>About USDT-FLASH</span>
                </div>
            </div>
        `;
        
        const optionsContainer = document.createElement('div');
        optionsContainer.innerHTML = optionsHTML;
        chatMessages.appendChild(optionsContainer.firstElementChild);
        
        // إضافة مستمعي الأحداث للأيقونات الجديدة
        const chatOptions = document.querySelectorAll('.chat-option');
        chatOptions.forEach(option => {
            option.addEventListener('click', function() {
                const query = this.getAttribute('data-query');
                chatInputField.value = query;
                sendUserMessage();
                
                // إزالة خيارات الدردشة بعد النقر على أحدها
                const chatOptionsContainer = document.querySelector('.chat-options');
                if (chatOptionsContainer) {
                    chatOptionsContainer.remove();
                }
            });
        });
    }
    
    // إرسال رسالة عند النقر على زر الإرسال
    sendMessage.addEventListener('click', sendUserMessage);
    
    // إرسال رسالة عند الضغط على Enter
    chatInputField.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            sendUserMessage();
        }
    });
    
    // إخفاء الدردشة في صفحات الدفع
    if (window.location.pathname.includes('payment.html')) {
        chatIcon.style.display = 'none';
    }
});