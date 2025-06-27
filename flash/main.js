// Global variables for chat elements
let sendButton, chatInput, chatbox;

// ---------------------
// CHATBOT UI FUNCTIONS
// ---------------------

// Simulate typing effect for assistant messages
function simulateTypingEffect(container, message) {
  container.innerHTML = ''; // Clear the container
  const typingEffect = document.createElement('span');
  typingEffect.className = 'typing-effect';
  container.appendChild(typingEffect);

  let i = 0;
  function typeCharacter() {
    if (i < message.length) {
      typingEffect.innerHTML += message.charAt(i); // Use innerHTML to render <br>, <b> etc.
      i++;
      setTimeout(typeCharacter, 15); // Adjust typing speed here
    } else {
      typingEffect.style.border = 'none'; // Remove caret after typing
    }
  }
  typeCharacter();
}

// Display a message in the chatbox
function displayMessage(message, isUser) {
  if (!chatbox) return; // Exit if chatbox is not ready
  const msgElem = document.createElement("div");
  msgElem.className = `chat-message ${isUser ? "user-message" : "assistant-message"}`;

  if (isUser) {
    msgElem.textContent = message;
  } else {
    simulateTypingEffect(msgElem, message);
  }

  chatbox.appendChild(msgElem);
  chatbox.scrollTop = chatbox.scrollHeight; // Scroll to the bottom
}

// --------------------------
// CHATBOT RESPONSE LOGIC
// --------------------------

// Fetch response from the API or use static replies
async function fetchResponse(userMessage) {
  const normalized = userMessage.trim().toLowerCase();
  let staticReply = '';

  // Static replies for common questions
  if (normalized.includes('المنصات المدعومة') || normalized.includes('supported platforms')) {
    staticReply = `المنصات المدعومة رسميًا هي: <br><b>Binance</b>, <b>Trust Wallet</b>, <b>Bybit</b>, <b>MetaMask</b>، وجميع منصات DeFi.`;
  } else if (normalized.includes('كيف أستخدم metamask')) {
    staticReply = `لاستخدام MetaMask:<br>1. ثبّت الإضافة.<br>2. أضف شبكة Ethereum.<br>3. أضف رمز USDT FLASH.<br>4. يمكنك الآن الإرسال والاستقبال.`;
  } else if (normalized.includes('آمن') || normalized.includes('security')) {
    staticReply = `نعم، الموقع آمن تمامًا. نستخدم تشفير SSL 256-bit ولا نطلب أي بيانات حساسة.`;
  } else if (normalized.includes('الدعم') || normalized.includes('support')) {
    staticReply = `للتواصل مع الدعم، يرجى استخدام البريد الإلكتروني الرسمي في أسفل الموقع.`;
  } else if (normalized.includes('طريقة التحويل') || normalized.includes('transfer')) {
    staticReply = `لتحويل USDT FLASH:<br>1. اختر الباقة.<br>2. أدخل بياناتك والمنصة المستقبِلة.<br>3. اتبع تعليمات الدفع.`;
  }

  // If a static reply is found, display it and stop
  if (staticReply) {
    displayMessage(staticReply, false);
    return;
  }

  // If no static reply, call the backend API
  const assistantDetails = `أنا مساعد USDT-FLASH الرسمي. أساعدك في كل ما يتعلق بخدماتنا، التحويلات، الأمان، والمنصات المدعومة.`;
  const prompt = `${assistantDetails}: ${userMessage}`;

  chatInput.value = "Typing...";
  chatInput.disabled = true;
  sendButton.disabled = true;

  try {
    const response = await fetch("https://backend.buildpicoapps.com/aero/run/llm-api?pk=v1-Z0FBQUFBQm5HUEtMSjJkakVjcF9IQ0M0VFhRQ0FmSnNDSHNYTlJSblE0UXo1Q3RBcjFPcl9YYy1OZUhteDZWekxHdWRLM1M1alNZTkJMWEhNOWd4S1NPSDBTWC12M0U2UGc9PQ==", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt }),
    });
    const data = await response.json();
    if (data.status === "success") {
      displayMessage(data.text, false);
    } else {
      displayMessage("حدث خطأ تقني. يرجى المحاولة لاحقاً.", false);
    }
  } catch (error) {
    console.error("Error fetching API:", error);
    displayMessage("حدث خطأ تقني. يرجى المحاولة لاحقاً.", false);
  } finally {
    chatInput.value = "";
    chatInput.disabled = false;
    sendButton.disabled = false;
    chatInput.focus();
  }
}

// --------------------------
// CHAT INITIALIZATION
// --------------------------

function initChat() {
  // Initialize chat elements
  sendButton = document.getElementById("sendButton");
  chatInput = document.getElementById("chatInput");
  chatbox = document.getElementById("chatbox");
  const floatBtn = document.getElementById('assistant-float-btn');
  const chatboxContainer = document.getElementById('chatbox-container');
  const closeChat = document.getElementById('close-chatbox');

  // --- Event Listeners ---

  // Toggle chatbox visibility
  if (floatBtn && chatboxContainer) {
    floatBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const isHidden = chatboxContainer.style.display === 'none' || chatboxContainer.style.display === '';
      chatboxContainer.style.display = isHidden ? 'flex' : 'none';
      if (isHidden && chatInput) {
        setTimeout(() => chatInput.focus(), 100);
      }
    });
  }

  if (closeChat) {
    closeChat.addEventListener('click', (e) => {
      e.preventDefault();
      if (chatboxContainer) chatboxContainer.style.display = 'none';
    });
  }

  // Handle sending messages
  async function sendMessage() {
    console.log('sendMessage called');
    if (!chatInput || !chatbox) {
      console.error('Chat elements not found');
      return;
    }
    
    const userMessage = chatInput.value.trim();
    if (!userMessage) {
      console.log('Empty message, not sending');
      return;
    }
    
    console.log('Sending message:', userMessage);
    displayMessage(userMessage, true);
    chatInput.value = "";
    
    try {
      await fetchResponse(userMessage);
    } catch (error) {
      console.error('Error in sendMessage:', error);
      displayMessage('عذراً، حدث خطأ أثناء معالجة طلبك. يرجى المحاولة مرة أخرى لاحقاً.', false);
    }
  }

  // Add event listeners if elements exist
  if (sendButton) {
    sendButton.addEventListener("click", sendMessage);
  }
  
  if (chatInput) {
    chatInput.addEventListener("keypress", (event) => {
      if (event.key === "Enter") {
        sendMessage();
      }
    });
  }

  // --- Initial Chat State ---
  if (chatbox && chatbox.children.length === 0) {
    // Only show welcome message if chat is empty
    displayMessage('مرحباً بك في USDT-FLASH! كيف يمكنني مساعدتك اليوم؟', false);
    
    // Display suggestion buttons
    let suggestions = document.createElement('div');
    suggestions.className = 'chat-suggestions flex flex-wrap gap-2 mt-2';
    suggestions.innerHTML = `
      <button class="suggestion-btn bg-gray-100 hover:bg-gray-200 text-gray-800 text-xs font-medium px-3 py-1 rounded-full transition-colors">المنصات المدعومة</button>
      <button class="suggestion-btn bg-gray-100 hover:bg-gray-200 text-gray-800 text-xs font-medium px-3 py-1 rounded-full transition-colors">كيف أستخدم MetaMask؟</button>
      <button class="suggestion-btn bg-gray-100 hover:bg-gray-200 text-gray-800 text-xs font-medium px-3 py-1 rounded-full transition-colors">هل الموقع آمن؟</button>
    `;
    
    // Add event listeners to suggestion buttons
    suggestions.querySelectorAll('.suggestion-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        if (chatInput) {
          chatInput.value = btn.textContent;
          sendMessage();
        }
      });
    });
    
    chatbox.appendChild(suggestions);
  }
}

// Initialize chat when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  initChat();
});

// --- Legacy Menu Button (Kept for other site functionality) ---
const menuButton = document.querySelector(".menu-button");
if (menuButton) {
    const navigationMenu = document.createElement("nav");
    navigationMenu.classList.add("hidden");
    navigationMenu.innerHTML = `
      <ul>
        <li><a href="homepage.html">Home</a></li>
        <li><a href="image.html">Image Generation</a></li>
        <li><a href="feedback.html">Feedback</a></li>
        <li><a href="contact.html">Contact</a></li> 
        <li><a href="about.html">About</a></li> 
      </ul>
    `;
    document.body.appendChild(navigationMenu);

    menuButton.addEventListener("click", () => {
      navigationMenu.classList.toggle("hidden");
      navigationMenu.classList.toggle("visible");
    });
}