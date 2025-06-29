// 🤖 نظام الدردشة المتطور - USDT-FLASH Advanced Chat System
// تم تطويره بواسطة Zencoder لتجربة مستخدم متقدمة

document.addEventListener('DOMContentLoaded', function() {
    // قاعدة بيانات الأسئلة الشائعة المتقدمة
    const advancedFAQ = {
        'what_is_usdt_flash': {
            keywords: ['ما هي', 'what is', 'usdt-flash', 'usdt flash', 'عملة', 'currency', 'معلومات'],
            title: '💰 ما هي عملة USDT-FLASH؟',
            answer: `💎 **USDT-FLASH** هي عملة رقمية مستقرة (Stablecoin) مربوطة بالدولار الأمريكي

✅ **المميزات الرئيسية:**
• قيمة ثابتة: 1 USDT-FLASH = 1 USD
• تحويلات سريعة وآمنة
• رسوم منخفضة جداً
• متوافقة مع أشهر المحافظ الرقمية
• تُستخدم في التجارة الإلكترونية والتحويلات السريعة

📊 **الاستخدامات:**
• عمليات الشراء السريعة
• التحويلات الدولية
• الاستثمار والتداول
• المدفوعات التجارية`
        },
        'how_to_buy': {
            keywords: ['كيف', 'how', 'شراء', 'buy', 'purchase', 'اشتري', 'كيفية الشراء', 'خطوات'],
            title: '🛒 كيف يمكنني شراء USDT-FLASH؟',
            answer: `🎯 **خطوات الشراء البسيطة:**

**1️⃣ اختيار الباقة:**
• Basic Package: 499 USDT-FLASH بـ $29.99
• Professional Package: 2,500 USDT-FLASH بـ $99.99  
• Enterprise Package: 10,000 USDT-FLASH بـ $199

**2️⃣ طرق الدفع المتاحة:**
💳 البطاقات البنكية (Visa, MasterCard)
🏦 التحويل البنكي المباشر
💰 PayPal
₿ العملات الرقمية (BTC, ETH, USDT)

**3️⃣ إدخال عنوان المحفظة:**
• تأكد من صحة عنوان المحفظة
• اختر الشبكة المناسبة (TRC20 مُوصى بها)

**4️⃣ تأكيد العملية:**
• مراجعة البيانات
• تأكيد الدفع
• استلام العملة خلال 5-15 دقيقة`
        },
        'security_trust': {
            keywords: ['أمان', 'security', 'آمن', 'safe', 'موثوق', 'trust', 'حماية', 'تشفير'],
            title: '🔐 هل الموقع آمن وموثوق؟',
            answer: `🛡️ **نعم، أمانك هو أولويتنا القصوى!**

**🔒 تقنيات الحماية:**
• تشفير SSL 256-bit لجميع البيانات
• نظام حماية من الاختراق
• مراقبة مستمرة 24/7
• عمليات تدقيق أمني منتظمة

**🏆 الشهادات والثقة:**
✅ شريك رسمي معتمد لـ Tether
✅ مرخص ومنظم
✅ أكثر من 50,000 عميل راضي
✅ تقييم 4.9/5 نجوم

**💎 ضمانات إضافية:**
• حماية بيانات العملاء
• عدم مشاركة المعلومات مع أطراف ثالثة  
• نظام استرداد في حالة المشاكل
• دعم فني مخصص لحل أي مشكلة`
        },
        'delivery_time': {
            keywords: ['وقت', 'time', 'متى', 'when', 'استلام', 'delivery', 'تسليم', 'سرعة'],
            title: '⏱️ كم يستغرق وقت الاستلام؟',
            answer: `⚡ **أوقات التسليم السريعة:**

**🚀 التسليم العادي:**
• 5-15 دقيقة (95% من الحالات)
• تلقائي بعد تأكيد الدفع
• إشعار فوري عند التسليم

**⚡ التسليم السريع (VIP):**
• 1-5 دقائق لعملاء البرو والإنتربرايز
• أولوية في المعالجة
• دعم مخصص

**📋 حالات التأخير النادرة:**
• حتى 60 دقيقة في الذروة
• مشاكل فنية مؤقتة
• عمليات تحقق إضافية للأمان

**📞 في حالة التأخير:**
اتصل بالدعم الفني فوراً للمساعدة المباشرة`
        },
        'payment_methods': {
            keywords: ['دفع', 'payment', 'بايبال', 'paypal', 'بطاقة', 'card', 'تحويل', 'transfer'],
            title: '💳 ما هي طرق الدفع المتاحة؟',
            answer: `💰 **طرق دفع متنوعة ومرنة:**

**💳 البطاقات البنكية:**
• Visa & MasterCard
• American Express  
• الخصم المباشر والائتمان
• حماية كاملة للمعاملات

**🏦 التحويلات البنكية:**
• التحويل البنكي المحلي
• SWIFT للتحويلات الدولية
• حوالات فورية

**💰 المحافظ الرقمية:**  
• PayPal (الأكثر شيوعاً)
• Skrill & Neteller
• Apple Pay & Google Pay

**₿ العملات الرقمية:**
• Bitcoin (BTC)
• Ethereum (ETH) 
• USDT (Tether)
• Binance Coin (BNB)

💡 **نصيحة:** استخدم USDT عبر شبكة TRC20 لأقل رسوم وأسرع معالجة!`
        },
        'minimum_purchase': {
            keywords: ['أقل', 'minimum', 'حد أدنى', 'مقدار', 'كمية', 'amount'],
            title: '📊 ما هو الحد الأدنى للشراء؟',
            answer: `💵 **الحد الأدنى للشراء:**

**🎯 Basic Package:**
• الحد الأدنى: 100 USDT-FLASH
• السعر: $19.99 فقط
• مثالي للمبتدئين

**📈 لا يوجد حد أقصى:**
• يمكنك شراء أي كمية تريدها
• خصومات للكميات الكبيرة
• عروض خاصة للعملاء المميزين

**💡 نصائح للشراء:**
• ابدأ بكمية صغيرة لاختبار الخدمة
• استفد من العروض الشهرية
• احصل على مكافآت الولاء`
        },
        'wallet_compatible': {
            keywords: ['محفظة', 'wallet', 'متوافق', 'compatible', 'metamask', 'trust'],
            title: '👛 ما هي المحافظ المتوافقة؟',
            answer: `🔗 **المحافظ المدعومة:**

**📱 محافظ الهاتف المحمول:**
• Trust Wallet (الأكثر استخداماً)
• MetaMask Mobile
• Binance Wallet
• Coinbase Wallet
• SafePal

**💻 محافظ سطح المكتب:**
• MetaMask Browser Extension
• Exodus Wallet
• Atomic Wallet
• MyEtherWallet (MEW)

**🏛️ المحافظ الباردة:**
• Ledger Hardware Wallets
• Trezor Devices
• SafePal Hardware

**⚙️ الشبكات المدعومة:**
• Ethereum (ERC-20)
• TRON (TRC-20) - الأسرع والأرخص
• Binance Smart Chain (BEP-20)
• Polygon (MATIC)

💡 **نوصي بـ TRC-20 لأقل الرسوم!**`
        },
        'refund_policy': {
            keywords: ['استرداد', 'refund', 'إلغاء', 'cancel', 'مشكلة', 'خطأ'],
            title: '↩️ ما هي سياسة الاسترداد؟',
            answer: `🔄 **سياسة الاسترداد والضمان:**

**✅ حالات الاسترداد الكامل:**
• عدم استلام العملة خلال 24 ساعة
• خطأ في إرسال كمية مختلفة
• مشاكل تقنية من جانبنا
• عنوان محفظة خاطئ من جانبنا

**⏰ المدة الزمنية:**
• الاسترداد خلال 1-3 أيام عمل
• إشعار فوري عند بدء العملية
• متابعة مع الدعم الفني

**📋 شروط الاسترداد:**
• تقديم إثبات المشكلة
• التواصل خلال 48 ساعة من الشراء
• عدم استخدام العملة المستلمة

**⚠️ حالات عدم الاسترداد:**
• خطأ في عنوان المحفظة من العميل
• اختيار شبكة خاطئة من العميل
• طلب الاسترداد بعد مرور 7 أيام

💬 **للاستعلام:** تواصل مع الدعم الفني`
        },
        'fees_charges': {
            keywords: ['رسوم', 'fees', 'تكلفة', 'cost', 'إضافية', 'عمولة'],
            title: '💸 هل هناك رسوم إضافية؟',
            answer: `💰 **هيكل الرسوم الشفاف:**

**✅ بدون رسوم مخفية:**
• السعر المعروض = السعر النهائي
• لا توجد رسوم إضافية على الباقات
• شفافية كاملة في التسعير

**🔄 رسوم الشبكة:**
• TRC-20: 1-3 USDT (الأرخص)
• ERC-20: 15-50 USDT (حسب الازدحام)
• BEP-20: 0.5-2 USDT
• يتحملها العميل عادة

**💳 رسوم الدفع:**
• البطاقات البنكية: مجاناً
• PayPal: مجاناً
• العملات الرقمية: رسوم الشبكة فقط

**🎁 عروض خاصة:**
• خصم 10% للطلبات الكبيرة (+$500)
• خصم 15% للعملاء المتكررين
• مكافآت نقاط الولاء

💡 **نصيحة:** اختر TRC-20 لتوفير الرسوم`
        },
        'support_contact': {
            keywords: ['دعم', 'support', 'مساعدة', 'help', 'تواصل', 'contact', 'خدمة عملاء'],
            title: '📞 كيف أتواصل مع الدعم الفني؟',
            answer: `🎧 **الدعم الفني متاح 24/7:**

**💬 الدردشة المباشرة:**
• متاح على الموقع حالياً
• رد فوري خلال 2-5 دقائق
• دعم بالعربية والإنجليزية

**📧 البريد الإلكتروني:**
• support@flashusdt.com
• رد خلال 1-6 ساعات
• للاستفسارات المفصلة

**📱 تطبيقات التواصل:**
• واتساب: +1-555-USDT-HELP
• تليجرام: @USDTFlashSupport
• الرد خلال 15-30 دقيقة

**📞 المكالمات الهاتفية:**
• الخط الساخن: +1-800-FLASHUSDT
• متاح من الأحد إلى الخميس
• من 9 صباحاً حتى 6 مساءً (GMT)

**🚨 للحالات العاجلة:**
• استخدم الدردشة المباشرة
• اكتب "عاجل" في بداية الرسالة
• أولوية قصوى في الرد

👨‍💻 **فريق الدعم المتخصص:**
متخصصون في العملات الرقمية والمدفوعات`
        },
        'kyc_verification': {
            keywords: ['تحقق', 'verification', 'kyc', 'هوية', 'identity', 'وثائق'],
            title: '🆔 هل أحتاج للتحقق من الهوية؟',
            answer: `📋 **متطلبات التحقق (KYC):**

**💚 للمبالغ الصغيرة ($500 وأقل):**
• لا يتطلب تحقق من الهوية
• فقط عنوان بريد إلكتروني صالح
• شراء فوري وبسيط

**📄 للمبالغ المتوسطة ($500 - $5000):**
• صورة من الهوية أو جواز السفر
• إثبات العنوان (فاتورة خدمات)
• التحقق خلال 1-24 ساعة

**🏦 للمبالغ الكبيرة (+$5000):**
• تحقق كامل من الهوية
• إثبات مصدر الأموال
• مراجعة إضافية للأمان

**⚡ عملية التحقق السريعة:**
• رفع الوثائق آلياً
• تحقق بالذكاء الاصطناعي
• إشعار فوري بالنتيجة

**🔒 حماية البيانات:**
• تشفير كامل للوثائق
• عدم مشاركة مع أطراف ثالثة
• حذف تلقائي بعد المعالجة`
        },
        'countries_supported': {
            keywords: ['دول', 'countries', 'متاح', 'available', 'مقيد', 'restricted'],
            title: '🌍 في أي دول متاح الشراء؟',
            answer: `🗺️ **التغطية الجغرافية:**

**✅ الدول المدعومة بالكامل:**
• جميع دول الخليج العربي
• معظم الدول العربية
• الولايات المتحدة وكندا
• دول الاتحاد الأوروبي
• أستراليا ونيوزيلندا
• دول آسيا الرئيسية

**⚠️ قيود جزئية:**
• بعض الدول الأفريقية (حسب البنك)
• دول معينة في أمريكا الجنوبية
• التحقق من القوانين المحلية مطلوب

**❌ دول محظورة:**
• الدول الخاضعة لعقوبات دولية
• المناطق عالية المخاطر
• حسب القوانين الدولية

**🔍 كيف أتحقق من بلدي؟**
• أدخل رمز البلد في صفحة الدفع
• سيظهر لك إذا كان مدعوماً
• تواصل مع الدعم للاستفسار

**📞 للاستفسارات:**
تواصل مع فريق الدعم لمعرفة حالة بلدك`
        },
        'transaction_failed': {
            keywords: ['فشل', 'failed', 'خطأ', 'error', 'مشكلة', 'problem', 'لم يصل'],
            title: '❌ ماذا أفعل إذا فشلت المعاملة؟',
            answer: `🔧 **حلول المشاكل الشائعة:**

**🔍 أولاً: تحقق من الآتي:**
• صحة عنوان المحفظة
• اختيار الشبكة الصحيحة
• رصيد كافي في المحفظة لرسوم الشبكة
• حالة الشبكة (ازدحام مؤقت)

**⚡ خطوات حل سريعة:**
1. انتظر 30 دقيقة إضافية
2. تحقق من رسائل البريد الإلكتروني
3. راجع تاريخ المعاملات في المحفظة
4. تواصل مع الدعم الفني

**🆘 معلومات مطلوبة للدعم:**
• رقم الطلب (Transaction ID)
• لقطة شاشة من صفحة الدفع
• عنوان المحفظة المستخدم
• الشبكة المختارة

**💡 منع المشاكل مستقبلاً:**
• تحقق مضاعف من العنوان
• استخدم Copy/Paste للعناوين
• تأكد من رصيد رسوم الشبكة
• اختر TRC-20 للسرعة والموثوقية

**🚀 الحل السريع:**
استخدم الدردشة المباشرة للحصول على مساعدة فورية`
        }
    };

    // إضافة عناصر الدردشة المحسنة إلى الصفحة
    const chatHTML = `
        <div class="chat-icon" id="chat-icon">
            <i class="fas fa-robot"></i>
            <div class="chat-notification" id="chat-notification">1</div>
        </div>
        <div class="chat-window" id="chat-window">
            <div class="chat-header">
                <div class="assistant-info">
                    <div class="assistant-avatar">
                        <i class="fas fa-robot"></i>
                    </div>
                    <div class="assistant-details">
                        <h3>🤖 USDT-FLASH Assistant</h3>
                        <span class="status">• متاح الآن</span>
                    </div>
                </div>
                <button class="close-chat" id="close-chat">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="chat-messages" id="chat-messages">
                <div class="message assistant">
                    <div class="message-content">
                        👋 **مرحباً بك في USDT-FLASH!**
                        
أنا مساعدك الذكي، يمكنني مساعدتك في:
• شراء USDT-FLASH
• معلومات الأمان والثقة  
• طرق الدفع والتسليم
• الدعم الفني

**ما الذي تود معرفته؟** 👇
                    </div>
                </div>
                <div class="chat-options">
                    <div class="chat-option" data-query="what_is_usdt_flash">
                        <i class="fas fa-coins"></i>
                        <span>ما هي USDT-FLASH؟</span>
                    </div>
                    <div class="chat-option" data-query="how_to_buy">
                        <i class="fas fa-shopping-cart"></i>
                        <span>كيفية الشراء</span>
                    </div>
                    <div class="chat-option" data-query="security_trust">
                        <i class="fas fa-shield-alt"></i>
                        <span>الأمان والثقة</span>
                    </div>
                    <div class="chat-option" data-query="delivery_time">
                        <i class="fas fa-clock"></i>
                        <span>أوقات التسليم</span>
                    </div>
                    <div class="chat-option" data-query="payment_methods">
                        <i class="fas fa-credit-card"></i>
                        <span>طرق الدفع</span>
                    </div>
                    <div class="chat-option" data-query="support">
                        <i class="fas fa-headset"></i>
                        <span>الدعم الفني</span>
                    </div>
                </div>
            </div>
            <div class="chat-suggestions" id="chat-suggestions"></div>
            <div class="chat-input">
                <input type="text" id="chat-input-field" placeholder="اكتب سؤالك هنا... 💬">
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
    
    // 🎮 إعداد المستمعات المتقدمة للأيقونات التفاعلية
    setTimeout(() => {
        setupAdvancedOptionListeners();
    }, 100);
    
    // 🎭 فتح/إغلاق نافذة الدردشة مع تأثيرات متقدمة
    chatIcon.addEventListener('click', function() {
        chatWindow.classList.toggle('active');
        
        // إخفاء إشعار الدردشة عند الفتح
        const notification = document.getElementById('chat-notification');
        if (notification && chatWindow.classList.contains('active')) {
            notification.style.display = 'none';
        }
        
        // تشغيل صوت التنبيه (اختياري)
        playNotificationSound();
    });
    
    closeChat.addEventListener('click', function() {
        chatWindow.classList.remove('active');
        
        // إضافة تأثير الإغلاق
        chatWindow.style.transform = 'translateY(20px) scale(0.95)';
        setTimeout(() => {
            chatWindow.style.transform = '';
        }, 300);
    });
    
    // تشغيل صوت تنبيه خفيف (اختياري)
    function playNotificationSound() {
        // يمكن إضافة ملف صوتي هنا للتنبيه
        // const audio = new Audio('sounds/notification.mp3');
        // audio.play().catch(() => {}); // تجاهل الأخطاء
    }
    
    // 🚀 إرسال رسالة مع نظام ذكي محسن
    function sendUserMessage() {
        const message = chatInputField.value.trim();
        if (message) {
            // إضافة رسالة المستخدم
            addAdvancedMessage(message, 'user');
            chatInputField.value = '';
            
            // إظهار مؤشر الكتابة
            showTypingIndicator();
            
            // محاكاة رد المساعد الذكي
            setTimeout(function() {
                hideTypingIndicator();
                const response = getAdvancedAssistantResponse(message);
                addAdvancedMessage(response, 'assistant');
                
                // إضافة اقتراحات ذكية
                showSmartSuggestions(message);
                
            }, Math.random() * 1000 + 800); // رد عشوائي من 0.8 إلى 1.8 ثانية
        }
    }
    
    // إظهار مؤشر الكتابة
    function showTypingIndicator() {
        const typingIndicator = document.createElement('div');
        typingIndicator.className = 'message assistant typing-indicator';
        typingIndicator.id = 'typing-indicator';
        typingIndicator.innerHTML = `
            <div class="typing-animation">
                <span></span>
                <span></span>
                <span></span>
                الكتابة...
            </div>
        `;
        chatMessages.appendChild(typingIndicator);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
    
    // إخفاء مؤشر الكتابة
    function hideTypingIndicator() {
        const indicator = document.getElementById('typing-indicator');
        if (indicator) {
            indicator.remove();
        }
    }
    
    // إظهار اقتراحات ذكية
    function showSmartSuggestions(userMessage) {
        const suggestions = getSmartSuggestions(userMessage.toLowerCase());
        if (suggestions.length > 0) {
            setTimeout(() => {
                const suggestionsHTML = `
                    <div class="smart-suggestions">
                        <div class="suggestions-title">💡 مواضيع قد تهمك:</div>
                        <div class="suggestions-list">
                            ${suggestions.map(suggestion => 
                                `<div class="suggestion-item" data-query="${suggestion.key}">
                                    <i class="${suggestion.icon}"></i>
                                    <span>${suggestion.text}</span>
                                </div>`
                            ).join('')}
                        </div>
                    </div>
                `;
                
                const suggestionsDiv = document.createElement('div');
                suggestionsDiv.innerHTML = suggestionsHTML;
                chatMessages.appendChild(suggestionsDiv.firstElementChild);
                
                // إضافة مستمعات للاقتراحات
                document.querySelectorAll('.suggestion-item').forEach(item => {
                    item.addEventListener('click', function() {
                        const query = this.getAttribute('data-query');
                        chatInputField.value = advancedFAQ[query].title.replace(/[💰🛒🔐⏱️💳]/g, '').trim();
                        sendUserMessage();
                        
                        // إزالة الاقتراحات
                        document.querySelector('.smart-suggestions')?.remove();
                    });
                });
                
                chatMessages.scrollTop = chatMessages.scrollHeight;
            }, 1500);
        }
    }
    
    // الحصول على اقتراحات ذكية
    function getSmartSuggestions(userMessage) {
        const suggestions = [];
        
        if (userMessage.includes('شراء') || userMessage.includes('buy')) {
            suggestions.push(
                { key: 'payment_methods', icon: 'fas fa-credit-card', text: 'طرق الدفع المتاحة' },
                { key: 'delivery_time', icon: 'fas fa-clock', text: 'أوقات التسليم' }
            );
        }
        
        if (userMessage.includes('أمان') || userMessage.includes('security')) {
            suggestions.push(
                { key: 'what_is_usdt_flash', icon: 'fas fa-info-circle', text: 'ما هي USDT-FLASH؟' },
                { key: 'how_to_buy', icon: 'fas fa-shopping-cart', text: 'كيفية الشراء الآمن' }
            );
        }
        
        if (userMessage.includes('سعر') || userMessage.includes('price')) {
            suggestions.push(
                { key: 'how_to_buy', icon: 'fas fa-tags', text: 'باقات الأسعار' },
                { key: 'payment_methods', icon: 'fas fa-credit-card', text: 'طرق الدفع' }
            );
        }
        
        // اقتراحات عامة إذا لم تكن هناك اقتراحات محددة
        if (suggestions.length === 0) {
            const randomSuggestions = [
                { key: 'security_trust', icon: 'fas fa-shield-alt', text: 'الأمان والثقة' },
                { key: 'delivery_time', icon: 'fas fa-rocket', text: 'سرعة التسليم' },
                { key: 'payment_methods', icon: 'fas fa-wallet', text: 'طرق الدفع' }
            ];
            suggestions.push(...randomSuggestions.slice(0, 2));
        }
        
        return suggestions.slice(0, 3); // حد أقصى 3 اقتراحات
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
    
    // 🧠 نظام الذكاء الاصطناعي المتقدم للردود
    function getAdvancedAssistantResponse(question) {
        const normalizedQuestion = question.toLowerCase().trim();
        
        // البحث في قاعدة البيانات بناءً على الكلمات المفتاحية
        for (const [key, faq] of Object.entries(advancedFAQ)) {
            for (const keyword of faq.keywords) {
                if (normalizedQuestion.includes(keyword.toLowerCase())) {
                    return formatAdvancedResponse(faq);
                }
            }
        }
        
        // ردود ذكية إضافية للحالات الخاصة
        if (isGreeting(normalizedQuestion)) {
            return getGreetingResponse();
        }
        
        if (isComplaint(normalizedQuestion)) {
            return getComplaintResponse();
        }
        
        if (isPriceQuestion(normalizedQuestion)) {
            return getPriceComparisonResponse();
        }
        
        if (isUrgentRequest(normalizedQuestion)) {
            return getUrgentResponse();
        }
        
        // الرد الافتراضي المحسن
        return getDefaultResponse();
    }
    
    // تنسيق الردود المتقدمة
    function formatAdvancedResponse(faq) {
        return `${faq.title}

${faq.answer}

━━━━━━━━━━━━━━━━━━━━
💡 **هل تحتاج مساعدة إضافية؟**
اكتب سؤالك أو اختر من الخيارات أدناه 👇`;
    }
    
    // التحقق من الترحيبات
    function isGreeting(question) {
        const greetings = ['مرحبا', 'السلام عليكم', 'hello', 'hi', 'hey', 'صباح الخير', 'مساء الخير'];
        return greetings.some(greeting => question.includes(greeting));
    }
    
    // رد الترحيب
    function getGreetingResponse() {
        const greetings = [
            '👋 مرحباً بك! سعيد بوجودك معنا في USDT-FLASH',
            '🎉 أهلاً وسهلاً! كيف يمكنني مساعدتك اليوم؟',
            '😊 مرحباً! أنا هنا لأجيب على جميع أسئلتك',
        ];
        const randomGreeting = greetings[Math.floor(Math.random() * greetings.length)];
        
        return `${randomGreeting}

🚀 **يمكنني مساعدتك في:**
• شراء USDT-FLASH بأفضل الأسعار
• معلومات الأمان والثقة
• طرق الدفع المتنوعة  
• الدعم الفني السريع

**ما الذي تود معرفته؟** 💫`;
    }
    
    // التحقق من الشكاوى
    function isComplaint(question) {
        const complaints = ['مشكلة', 'خطأ', 'لا يعمل', 'problem', 'error', 'issue', 'complaint'];
        return complaints.some(complaint => question.includes(complaint));
    }
    
    // رد الشكاوى
    function getComplaintResponse() {
        return `😔 **نعتذر عن أي مشكلة واجهتك!**

🔧 **للحصول على مساعدة سريعة:**
1️⃣ وصف المشكلة بالتفصيل
2️⃣ إرسال لقطة شاشة إن أمكن
3️⃣ ذكر رقم المعاملة (إن وجد)

📞 **تواصل فوري:**
• الدردشة المباشرة: متاح الآن  
• البريد الإلكتروني: support@flashusdt.com
• الهاتف: +1 (555) 123-4567

⚡ **نضمن حل مشكلتك خلال 30 دقيقة!**`;
    }
    
    // التحقق من أسئلة الأسعار
    function isPriceQuestion(question) {
        const priceKeywords = ['سعر', 'price', 'cost', 'كم', 'how much', 'تكلفة'];
        return priceKeywords.some(keyword => question.includes(keyword));
    }
    
    // رد مقارنة الأسعار
    function getPriceComparisonResponse() {
        return `💰 **أسعارنا التنافسية - لفترة محدودة!**

🥉 **Basic Package** - الأشهر
• 499 USDT-FLASH مقابل $29.99
• $0.06 لكل وحدة - توفير 40%!

🥈 **Professional Package** - القيمة الأفضل  
• 2,500 USDT-FLASH مقابل $99.99
• $0.04 لكل وحدة - توفير 60%!

🥇 **Enterprise Package** - للمحترفين
• 10,000 USDT-FLASH مقابل $199
• $0.02 لكل وحدة - توفير 80%!

🎁 **مكافآت إضافية:**
✅ USDT-FLASH إضافية مجانية
✅ معالجة سريعة للمعاملات  
✅ دعم أولوية

⏰ **العرض ينتهي قريباً - احجز الآن!**`;
    }
    
    // التحقق من الطلبات العاجلة
    function isUrgentRequest(question) {
        const urgentKeywords = ['عاجل', 'urgent', 'سريع', 'fast', 'فوراً', 'immediately'];
        return urgentKeywords.some(keyword => question.includes(keyword));
    }
    
    // رد الحالات العاجلة
    function getUrgentResponse() {
        return `🚨 **نفهم أن طلبك عاجل!**

⚡ **للمساعدة الفورية:**
📞 اتصل بنا مباشرة: +1 (555) 123-4567
💬 الدردشة المباشرة: أولوية قصوى
✉️ إيميل طوارئ: urgent@flashusdt.com

🏃‍♂️ **خدمة VIP السريعة:**
• معالجة خلال 5 دقائق
• مندوب مخصص لحالتك
• متابعة حتى الانتهاء

**نحن هنا لخدمتك 24/7! 🌟**`;
    }
    
    // الرد الافتراضي المحسن
    function getDefaultResponse() {
        const responses = [
            '🤔 لم أفهم سؤالك تماماً، ولكن يمكنني مساعدتك!',
            '💭 دعني أساعدك في العثور على الإجابة المناسبة',
            '🔍 لم أجد إجابة مطابقة، ولكن لدي معلومات مفيدة لك',
        ];
        const randomResponse = responses[Math.floor(Math.random() * responses.length)];
        
        return `${randomResponse}

🎯 **المواضيع الأكثر شيوعاً:**
• ما هي USDT-FLASH؟
• كيفية الشراء والدفع
• معلومات الأمان والثقة
• أوقات التسليم
• طرق الدفع المتاحة

💡 **نصيحة:** اكتب سؤالك بكلمات بسيطة أو اختر من الخيارات أعلاه`;
    }
    
    // 📝 إضافة رسالة متقدمة إلى نافذة الدردشة
    function addAdvancedMessage(text, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message', sender);
        
        if (sender === 'assistant') {
            // تنسيق متقدم لرسائل المساعد
            const formattedText = formatAssistantMessage(text);
            messageDiv.innerHTML = `
                <div class="message-avatar">
                    <i class="fas fa-robot"></i>
                </div>
                <div class="message-content">
                    ${formattedText}
                </div>
                <div class="message-time">
                    ${getCurrentTime()}
                </div>
            `;
        } else {
            // تنسيق بسيط لرسائل المستخدم
            messageDiv.innerHTML = `
                <div class="message-content">
                    ${text}
                </div>
                <div class="message-time">
                    ${getCurrentTime()}
                </div>
            `;
        }
        
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
        
        // إضافة تأثير ظهور متدرج
        setTimeout(() => {
            messageDiv.classList.add('message-appeared');
        }, 100);
    }
    
    // تنسيق رسائل المساعد
    function formatAssistantMessage(text) {
        return text
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') // نص عريض
            .replace(/• /g, '<li>') // تحويل النقاط إلى قائمة
            .replace(/✅ /g, '<span class="checkmark">✅</span> ') // علامات صح مميزة
            .replace(/🎯|🚀|💰|🔐|⏱️|💳|📞|✉️|🌟/g, '<span class="emoji">$&</span>') // تنسيق الرموز التعبيرية
            .replace(/━━━━━━━━━━━━━━━━━━━━/g, '<hr class="separator">') // خط فاصل
            .replace(/\n/g, '<br>'); // فواصل الأسطر
    }
    
    // الحصول على الوقت الحالي
    function getCurrentTime() {
        const now = new Date();
        return now.toLocaleTimeString('ar-SA', { 
            hour: '2-digit', 
            minute: '2-digit',
            hour12: false
        });
    }
    
    // 🎯 نظام خيارات الدردشة المتقدم
    function addAdvancedChatOptions() {
        // التحقق من وجود خيارات موجودة
        if (document.querySelector('.chat-options')) {
            return;
        }
        
        const optionsHTML = `
            <div class="chat-options advanced-options">
                <div class="options-title">🎯 اختر موضوعاً:</div>
                <div class="chat-option" data-query="what_is_usdt_flash">
                    <i class="fas fa-coins"></i>
                    <span>ما هي USDT-FLASH؟</span>
                </div>
                <div class="chat-option" data-query="how_to_buy">
                    <i class="fas fa-shopping-cart"></i>
                    <span>كيفية الشراء</span>
                </div>
                <div class="chat-option" data-query="security_trust">
                    <i class="fas fa-shield-alt"></i>
                    <span>الأمان والثقة</span>
                </div>
                <div class="chat-option" data-query="delivery_time">
                    <i class="fas fa-clock"></i>
                    <span>أوقات التسليم</span>
                </div>
                <div class="chat-option" data-query="payment_methods">
                    <i class="fas fa-credit-card"></i>
                    <span>طرق الدفع</span>
                </div>
                <div class="chat-option" data-query="support_contact">
                    <i class="fas fa-headset"></i>
                    <span>الدعم الفني</span>
                </div>
                <div class="chat-option" data-query="minimum_purchase">
                    <i class="fas fa-chart-line"></i>
                    <span>الحد الأدنى للشراء</span>
                </div>
                <div class="chat-option" data-query="wallet_compatible">
                    <i class="fas fa-wallet"></i>
                    <span>المحافظ المتوافقة</span>
                </div>
                <div class="chat-option" data-query="refund_policy">
                    <i class="fas fa-undo"></i>
                    <span>سياسة الاسترداد</span>
                </div>
                <div class="chat-option" data-query="fees_charges">
                    <i class="fas fa-percentage"></i>
                    <span>الرسوم والعمولات</span>
                </div>
                <div class="chat-option" data-query="kyc_verification">
                    <i class="fas fa-id-card"></i>
                    <span>التحقق من الهوية</span>
                </div>
                <div class="chat-option" data-query="countries_supported">
                    <i class="fas fa-globe"></i>
                    <span>الدول المدعومة</span>
                </div>
            </div>
        `;
        
        const optionsContainer = document.createElement('div');
        optionsContainer.innerHTML = optionsHTML;
        chatMessages.appendChild(optionsContainer.firstElementChild);
        
        // إضافة مستمعات الأحداث المحسنة
        setupAdvancedOptionListeners();
        
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
    
    // إعداد مستمعات الأحداث المتقدمة
    function setupAdvancedOptionListeners() {
        const chatOptions = document.querySelectorAll('.chat-option');
        chatOptions.forEach(option => {
            option.addEventListener('click', function() {
                const queryKey = this.getAttribute('data-query');
                
                // إضافة تأثير النقر
                this.classList.add('option-clicked');
                
                // تنفيذ الإجراء بعد تأثير بصري
                setTimeout(() => {
                    if (advancedFAQ[queryKey]) {
                        // إضافة سؤال المستخدم أولاً
                        const userQuestion = advancedFAQ[queryKey].title.replace(/[💰🛒🔐⏱️💳]/g, '').trim();
                        addAdvancedMessage(userQuestion, 'user');
                        
                        // ثم إضافة الرد
                        setTimeout(() => {
                            const response = formatAdvancedResponse(advancedFAQ[queryKey]);
                            addAdvancedMessage(response, 'assistant');
                            
                            // إضافة اقتراحات ذكية
                            showSmartSuggestions(userQuestion);
                        }, 800);
                    }
                    
                    // إزالة خيارات الدردشة
                    const chatOptionsContainer = document.querySelector('.chat-options');
                    if (chatOptionsContainer) {
                        chatOptionsContainer.classList.add('options-fade-out');
                        setTimeout(() => chatOptionsContainer.remove(), 300);
                    }
                }, 200);
            });
            
            // تأثيرات الهوفر المحسنة
            option.addEventListener('mouseenter', function() {
                this.classList.add('option-hover');
            });
            
            option.addEventListener('mouseleave', function() {
                this.classList.remove('option-hover');
            });
        });
    }
    
    // دعم إضافي للحالات الخاصة
    function addSupportOptions() {
        const supportHTML = `
            <div class="support-options">
                <div class="support-title">💬 تحتاج مساعدة إضافية؟</div>
                <div class="support-buttons">
                    <button class="support-btn email-support">
                        <i class="fas fa-envelope"></i>
                        إرسال إيميل
                    </button>
                    <button class="support-btn phone-support">
                        <i class="fas fa-phone"></i>
                        اتصال مباشر
                    </button>
                    <button class="support-btn live-chat">
                        <i class="fas fa-comments"></i>
                        دردشة مباشرة
                    </button>
                </div>
            </div>
        `;
        
        const supportContainer = document.createElement('div');
        supportContainer.innerHTML = supportHTML;
        chatMessages.appendChild(supportContainer.firstElementChild);
        
        // إضافة وظائف أزرار الدعم
        document.querySelector('.email-support')?.addEventListener('click', () => {
            window.open('mailto:support@flashusdt.com?subject=طلب مساعدة من الموقع');
        });
        
        document.querySelector('.phone-support')?.addEventListener('click', () => {
            addAdvancedMessage('📞 يمكنك الاتصال بنا على: +1 (555) 123-4567\n\nأوقات العمل: 24/7', 'assistant');
        });
        
        document.querySelector('.live-chat')?.addEventListener('click', () => {
            addAdvancedMessage('💬 أنت الآن في الدردشة المباشرة! كيف يمكنني مساعدتك؟', 'assistant');
        });
        
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
    
    // 📤 إرسال رسالة مع تحسينات متقدمة
    sendMessage.addEventListener('click', sendUserMessage);
    
    // إرسال رسالة عند الضغط على Enter مع دعم Shift+Enter للسطر الجديد
    chatInputField.addEventListener('keypress', function(e) {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendUserMessage();
        }
    });
    
    // اقتراحات تلقائية أثناء الكتابة
    chatInputField.addEventListener('input', function() {
        const query = this.value.toLowerCase();
        if (query.length > 2) {
            showAutoSuggestions(query);
        } else {
            hideAutoSuggestions();
        }
    });
    
    // إظهار اقتراحات تلقائية
    function showAutoSuggestions(query) {
        const suggestions = [];
        
        // البحث في قاعدة البيانات
        for (const [key, faq] of Object.entries(advancedFAQ)) {
            for (const keyword of faq.keywords) {
                if (keyword.includes(query) && suggestions.length < 3) {
                    suggestions.push({
                        title: faq.title,
                        key: key
                    });
                    break;
                }
            }
        }
        
        if (suggestions.length > 0) {
            const suggestionsElement = document.getElementById('chat-suggestions');
            suggestionsElement.innerHTML = `
                <div class="auto-suggestions">
                    ${suggestions.map(s => 
                        `<div class="auto-suggestion" data-key="${s.key}">
                            ${s.title}
                        </div>`
                    ).join('')}
                </div>
            `;
            
            // إضافة مستمعات للاقتراحات
            suggestionsElement.querySelectorAll('.auto-suggestion').forEach(item => {
                item.addEventListener('click', function() {
                    const key = this.getAttribute('data-key');
                    chatInputField.value = advancedFAQ[key].title.replace(/[💰🛒🔐⏱️💳]/g, '').trim();
                    hideAutoSuggestions();
                    sendUserMessage();
                });
            });
            
            suggestionsElement.style.display = 'block';
        }
    }
    
    // إخفاء الاقتراحات التلقائية
    function hideAutoSuggestions() {
        const suggestionsElement = document.getElementById('chat-suggestions');
        suggestionsElement.style.display = 'none';
        suggestionsElement.innerHTML = '';
    }
    
    // 🔒 إعدادات الأمان والخصوصية
    // إخفاء الدردشة في صفحات الدفع لحماية الخصوصية
    if (window.location.pathname.includes('payment.html')) {
        chatIcon.style.display = 'none';
    }
    
    // حفظ محادثة المستخدم محلياً (اختياري)
    function saveChatHistory(message, sender) {
        const chatHistory = JSON.parse(localStorage.getItem('chat_history') || '[]');
        chatHistory.push({
            message: message,
            sender: sender,
            timestamp: new Date().toISOString()
        });
        
        // الاحتفاظ بآخر 50 رسالة فقط
        if (chatHistory.length > 50) {
            chatHistory.splice(0, chatHistory.length - 50);
        }
        
        localStorage.setItem('chat_history', JSON.stringify(chatHistory));
    }
    
    // استعادة محادثة المستخدم السابقة (اختياري)
    function loadChatHistory() {
        const chatHistory = JSON.parse(localStorage.getItem('chat_history') || '[]');
        chatHistory.slice(-5).forEach(chat => {
            addAdvancedMessage(chat.message, chat.sender);
        });
    }
    
    // 🌟 تحسينات إضافية للتجربة
    // إضافة تحديث للإشعارات
    setInterval(() => {
        const notification = document.getElementById('chat-notification');
        if (notification && !chatWindow.classList.contains('active')) {
            notification.style.display = 'block';
            // يمكن إضافة منطق لإظهار رسائل ترويجية هنا
        }
    }, 300000); // كل 5 دقائق
    
    console.log('🤖 USDT-FLASH Advanced Chat System loaded successfully!');
});