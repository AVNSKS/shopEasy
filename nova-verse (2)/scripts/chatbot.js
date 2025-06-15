class ShopEasyChatbot {
  constructor() {
    this.isOpen = false;
    this.messages = [];
    this.products = [];
    this.isTyping = false;
    this.currentContext = null;
    this.lastMentionedProduct = null;
    this.recognition = null;
    this.isVoiceListening = false;
    this.cart = [];
    this.conversationHistory = [];
    this.contextDepth = 3;

    this.init();
    this.loadProducts();
    this.setupKeyboardShortcuts();
    this.updateInternalCartFromGlobal();
  }

  init() {
    this.showNotification();
    setTimeout(() => {
      this.hideNotification();
    }, 5000);

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      this.recognition = new SpeechRecognition();
      this.recognition.continuous = false;
      this.recognition.interimResults = false;
      this.recognition.lang = 'en-IN';

      this.recognition.onstart = () => {
        this.isVoiceListening = true;
        document.getElementById('chatbot-input').placeholder = "Listening...";
        document.querySelector('.quick-action[title="Voice message"]').classList.add('active');
      };

      this.recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        document.getElementById('chatbot-input').value = transcript;
        this.sendMessage();
      };

      this.recognition.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        if (event.error === 'not-allowed' || event.error === 'permission-denied') {
            this.addMessage("🎤 I need microphone permission to listen. Please allow access in your browser settings.", "bot");
        } else if (event.error === 'no-speech') {
            this.addMessage("🎤 Didn't catch that. Please try speaking again clearly.", "bot");
        } else {
            this.addMessage("🎤 Sorry, I'm having trouble with voice input right now. Please try typing.", "bot");
        }
        this.stopVoiceListening();
      };

      this.recognition.onend = () => {
        this.stopVoiceListening();
      };
    } else {
      console.warn("Speech Recognition API not supported in this browser.");
    }
  }

  stopVoiceListening() {
    if (this.isVoiceListening) {
      this.recognition.stop();
    }
    this.isVoiceListening = false;
    document.getElementById('chatbot-input').placeholder = "Type your message...";
    document.querySelector('.quick-action[title="Voice message"]').classList.remove('active');
  }

  loadProducts() {
    this.products = [
      {
        id: 1,
        name: "Premium Sofa Set",
        category: "furniture",
        price: 25999,
        emoji: "🛋️",
        specs: {
          material: "Velvet fabric, Solid Wood Frame",
          dimensions: "3-seater: 80x35x32 inches",
          features: "High-density foam, Removable cushion covers",
          color: "Grey",
          warranty: "2 years",
        },
        ar_enabled: true,
      },
      {
        id: 2,
        name: "Wireless Headphones",
        category: "electronics",
        price: 1999,
        emoji: "🎧",
        specs: {
          brand: "AudioPro",
          connection: "Bluetooth 5.0",
          battery: "20 hours playtime",
          features: "Noise-cancelling, Foldable design",
          color: "Black",
          warranty: "1 year",
        },
        ar_enabled: false,
      },
      {
        id: 3,
        name: "Cotton Saree",
        category: "fashion",
        price: 1500,
        emoji: "👗",
        specs: {
          material: "Pure Cotton",
          length: "5.5 meters (saree) + 0.8 meter (blouse piece)",
          design: "Traditional prints",
          occasion: "Daily Wear, Casual Events",
          color: "Various",
        },
        ar_enabled: false,
      },
      {
        id: 4,
        name: "Samsung Galaxy M34 5G",
        category: "electronics",
        price: 18999,
        emoji: "📱",
        specs: {
          processor: "Exynos 1280 Octa-core",
          ram_storage: "6GB RAM, 128GB Storage (expandable up to 1TB)",
          display: "6.5-inch Super AMOLED (120Hz refresh rate), FHD+",
          camera: "50MP OIS (main), 8MP (ultrawide), 2MP (macro) | 13MP (front)",
          battery: "6000 mAh, 25W fast charging support",
          os: "Android 13 with One UI 5.1",
          connectivity: "5G, Wi-Fi, Bluetooth 5.3",
        },
        ar_enabled: true,
      },
      {
        id: 5,
        name: "Dell XPS 15 Laptop",
        category: "electronics",
        price: 120000,
        emoji: "💻",
        specs: {
          processor: "Intel Core i7 (13th Gen)",
          ram_storage: "16GB DDR5 RAM, 512GB PCIe Gen4 SSD",
          display: "15.6-inch FHD+ (1920 x 1200) InfinityEdge, Anti-Glare",
          graphics: "NVIDIA GeForce RTX 4050 6GB GDDR6",
          os: "Windows 11 Home",
          battery_life: "Up to 12 hours",
        },
        ar_enabled: false,
      },
      {
        id: 6,
        name: "Handmade Clay Pot",
        category: "indian_handicraft",
        price: 450,
        emoji: "🏺",
        specs: {
          material: "Terracotta Clay",
          dimensions: "10 inches height, 8 inches diameter",
          features: "Eco-friendly, Hand-painted traditional designs",
          usage: "Decoration, Cooking (earthenware), Planter",
        },
        ar_enabled: true,
      },
      {
        id: 7,
        name: "Smart TV 55-inch",
        category: "electronics",
        price: 45000,
        emoji: "📺",
        specs: {
          resolution: "4K Ultra HD",
          display_tech: "LED",
          smart_features: "Android TV, Voice Assistant, Built-in Chromecast",
          ports: "3 HDMI, 2 USB",
          refresh_rate: "60Hz",
        },
        ar_enabled: false,
      },
      {
        id: 8,
        name: "Yoga Mat",
        category: "fitness",
        price: 800,
        emoji: "🧘",
        specs: {
          material: "Eco-friendly TPE",
          thickness: "6mm",
          features: "Non-slip surface, Lightweight, Easy to clean",
          color: "Blue",
        },
        ar_enabled: false,
      },
    ];
  }

  setupKeyboardShortcuts() {
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && this.isOpen) {
        this.closeChat();
      }
      if (e.ctrlKey && e.key === "k") {
        e.preventDefault();
        this.toggleChat();
      }
    });
  }

  toggleChat() {
    if (this.isOpen) {
      this.closeChat();
    } else {
      this.openChat();
    }
  }

  openChat() {
    const container = document.getElementById("chatbot-container");
    const overlay = document.getElementById("chatbot-overlay");
    const input = document.getElementById("chatbot-input");

    container.classList.add("open");
    overlay.classList.add("active");
    this.isOpen = true;

    setTimeout(() => {
      input.focus();
    }, 300);

    this.hideNotification();

    const welcomeMessageExists = this.messages.some(msg => msg.sender === 'bot' && msg.text.includes("Hi! 👋 I'm your ShopEasy assistant."));

    if (this.messages.length === 0 || !welcomeMessageExists) {
        this.addMessage(
            `Hi! 👋 I'm your ShopEasy assistant. I can help you with:
            <br /><br />
            🛍️ Product questions & recommendations<br />
            📱 AR/VR features guidance<br />
            🇮🇳 Indian traditional products info<br />
            🛒 Shopping cart assistance<br />
            📍 Store locations & bargaining tips`,
            "bot",
            true
        );
    }

    this.trackEvent("chat_opened");
  }

  closeChat() {
    const container = document.getElementById("chatbot-container");
    const overlay = document.getElementById("chatbot-overlay");

    container.classList.remove("open");
    overlay.classList.remove("active");
    this.isOpen = false;
    this.stopVoiceListening();

    this.trackEvent("chat_closed");
  }

  showNotification() {
    const notification = document.getElementById("chatbot-notification");
    if (notification) {
      notification.style.display = "flex";
    }
  }

  hideNotification() {
    const notification = document.getElementById("chatbot-notification");
    if (notification) {
      notification.classList.add("hide");
      setTimeout(() => {
        notification.style.display = "none";
        notification.classList.remove("hide");
      }, 300);
    }
  }

  handleKeyPress(event) {
    if (event.key === "Enter") {
      this.sendMessage();
    }
  }

  sendMessage() {
    const input = document.getElementById("chatbot-input");
    const message = input.value.trim();

    if (!message) return;

    this.addMessage(message, "user");
    input.value = "";

    this.showTyping();

    setTimeout(() => {
      this.processMessage(message);
    }, 800 + Math.random() * 1200);
  }

  addMessage(text, sender, isHTML = false) {
    const messagesContainer = document.getElementById("chatbot-messages");
    if (!messagesContainer) {
      console.error("Chatbot messages container not found!");
      return;
    }

    const messageDiv = document.createElement("div");
    messageDiv.className = `chatbot-message ${sender}-message`;

    const now = new Date();
    const time = now.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    const botAvatarSVG = `<path d="M12 1c-5.523 0-10 4.477-10 10s4.477 10 10 10 10-4.477 10-10-4.477-10-10-10zM12 18a6 6 0 1 1 0-12 6 6 0 0 1 0 12zM12 13a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"/><path d="M16 11v2h2v-2h-2zm-8 0v2H6v-2h2z"/>`;
    const userAvatarSVG = `<path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>`;

    const avatarIcon = sender === "bot" ? botAvatarSVG : userAvatarSVG;

    messageDiv.innerHTML = `
            <div class="message-avatar">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    ${avatarIcon}
                </svg>
            </div>
            <div class="message-content">
                <div class="message-text">${isHTML ? text : this.escapeHtml(text)}</div>
                <div class="message-time">${time}</div>
            </div>
        `;

    messagesContainer.appendChild(messageDiv);
    this.scrollToBottom();

    this.messages.push({ text, sender, time: now });
    this.conversationHistory.push({ role: sender, content: text });
  }

  showTyping() {
    const typingDiv = document.getElementById("chatbot-typing");
    if (typingDiv) {
      typingDiv.style.display = "flex";
      this.isTyping = true;
      this.scrollToBottom();
    }
  }

  hideTyping() {
    const typingDiv = document.getElementById("chatbot-typing");
    if (typingDiv) {
      typingDiv.style.display = "none";
      this.isTyping = false;
    }
  }

  processMessage(message) {
    this.hideTyping();
    const lowerMessage = message.toLowerCase();
    let response = "";
    let isHTML = false;
    
    const followUpResponse = this.handleFollowUp(message);
    if (followUpResponse) {
        this.addMessage(followUpResponse, "bot", true);
        this.updateSuggestions(lowerMessage);
        return;
    }

    if (this.isGreeting(lowerMessage)) {
        response = this.getGreetingResponse();
    }
    else if (lowerMessage.includes("add to cart") || lowerMessage.includes("add this") || lowerMessage.includes("product to cart") || lowerMessage.includes("add to card") || lowerMessage.includes("buy")) {
        const productMatch = this.fuzzyMatchProduct(lowerMessage);
        if (productMatch) {
            response = this.handleAddToCart(productMatch.id);
            isHTML = true;
            this.lastMentionedProduct = productMatch;
        } else {
            response = "Which product would you like to add to your cart? Please specify the name, e.g., 'add Samsung Galaxy M34 5G to cart'.";
        }
    }
    else if (this.currentContext && (lowerMessage === "yes" || lowerMessage === "yep" || lowerMessage === "yeah")) {
        response = this.handleContextualYes(lowerMessage);
        isHTML = true;
    }
    else if (this.currentContext && (lowerMessage === "no" || lowerMessage === "nope")) {
        response = this.handleContextualNo(lowerMessage);
    }
    else {
        const specificProductMatch = this.fuzzyMatchProduct(lowerMessage);
        if (specificProductMatch) {
            this.lastMentionedProduct = specificProductMatch;
            if (lowerMessage.includes("specifications") || lowerMessage.includes("specs") || lowerMessage.includes("details") || lowerMessage.includes("about")) {
                response = this.getProductSpecifications(specificProductMatch);
                isHTML = true;
            } else if (this.isARQuery(lowerMessage) && specificProductMatch.ar_enabled) {
                response = `Yes, you can visualize the **${specificProductMatch.name}** using our AR feature! ${specificProductMatch.emoji} Just find the 'AR View' button on its product page or click this: <button class="suggestion-btn" onclick="chatbot.openProduct(${specificProductMatch.id})">View ${specificProductMatch.name} AR</button>.`;
                isHTML = true;
            } else {
                response = this.getDefaultProductResponse(specificProductMatch);
                isHTML = true;
            }
        }
        else if (this.isCartQuery(lowerMessage)) {
            response = this.handleCartQuery(lowerMessage);
            isHTML = true;
        }
        else if (this.isProductQuery(lowerMessage)) {
          response = this.handleProductQuery(lowerMessage);
          isHTML = true;
        } else if (this.isARQuery(lowerMessage)) {
          response = this.handleARQuery(lowerMessage);
          isHTML = true;
        } else if (this.isIndianProductsQuery(lowerMessage)) {
          response = this.handleIndianProductsQuery(lowerMessage);
          isHTML = true;
        } else if (this.isStoreQuery(lowerMessage)) {
          response = this.handleStoreQuery(lowerMessage);
          isHTML = true;
        } else if (this.isNavigationQuery(lowerMessage)) {
          response = this.handleNavigationQuery(lowerMessage);
          isHTML = true;
        } else if (this.isGeneralInfoQuery(lowerMessage)) {
            response = this.handleGeneralInfoQuery(lowerMessage);
            isHTML = true;
        }
        else {
          response = this.getDefaultResponse(lowerMessage);
        }
    }

    this.addMessage(response, "bot", isHTML);
    this.updateSuggestions(lowerMessage);
  }

  fuzzyMatchProduct(query) {
    const queryLower = query.toLowerCase();
    const exactMatch = this.products.find(p => 
        p.name.toLowerCase() === queryLower ||
        p.name.toLowerCase().includes(queryLower)
    );
    if (exactMatch) return exactMatch;

    const scoredProducts = this.products.map(p => {
        const nameLower = p.name.toLowerCase();
        const categoryLower = p.category.toLowerCase();
        
        let score = 0;
        if (nameLower.includes(queryLower)) score += 3;
        if (categoryLower.includes(queryLower)) score += 2;
        if (p.specs && Object.values(p.specs).some(v => 
            v.toString().toLowerCase().includes(queryLower))
        ) score += 1;
        
        return { product: p, score };
    }).filter(p => p.score > 0)
      .sort((a, b) => b.score - a.score);

    return scoredProducts.length > 0 ? scoredProducts[0].product : null;
  }

  handleFollowUp(message) {
    const lowerMessage = message.toLowerCase();
    const lastBotMessage = [...this.conversationHistory].reverse()
        .find(m => m.role === "bot");
    
    if (!lastBotMessage) return null;
    
    if (lastBotMessage.content.includes("product") && 
        (lowerMessage.includes("more") || lowerMessage.includes("else"))) {
        const productMatch = this.lastMentionedProduct || 
            this.extractProductFromMessage(lastBotMessage.content);
        if (productMatch) {
            return this.getProductSpecifications(productMatch);
        }
    }
    
    if (lastBotMessage.content.includes("cart") && 
        lowerMessage.includes("what else")) {
        return "Would you like me to suggest some complementary products or help with anything else?";
    }
    
    return null;
  }

  extractProductFromMessage(message) {
    for (const product of this.products) {
        if (message.includes(product.name)) {
            return product;
        }
    }
    return null;
  }

  isProductQuery(message) {
    const productKeywords = [
      "product", "item", "buy", "price", "cost", "cheap", "expensive",
      "recommend", "suggest", "show me", "latest", "new", "popular", "best",
      "sofa", "phone", "laptop", "headphones", "dress", "shoes",
      "electronics", "furniture", "fashion", "appliance", "details", "about",
      "features", "specifications", "info", "collection",
      "what is", "tell me about", "model", "series",
      "samsung", "iphone", "xiaomi", "oneplus"
    ];
    return productKeywords.some((keyword) => message.includes(keyword));
  }

  isARQuery(message) {
    const arKeywords = [
      "ar", "augmented reality", "3d", "camera", "view in room", "try on",
      "visualize", "see how it looks", "ar feature", "ar experience", "augmented"
    ];
    return arKeywords.some((keyword) => message.includes(keyword)) &&
           !message.includes("card") &&
           !message.includes("cart") &&
           !message.includes("add to");
  }

  isIndianProductsQuery(message) {
    const indianKeywords = [
      "indian", "traditional", "saree", "kurta", "dhoti", "lehenga",
      "handicraft", "made in india", "desi", "ethnic", "local"
    ];
    return indianKeywords.some((keyword) => message.includes(keyword));
  }

  isStoreQuery(message) {
    const storeKeywords = [
      "store", "location", "near me", "address", "visit", "offline",
      "bargain", "negotiate", "shop", "outlet"
    ];
    return storeKeywords.some((keyword) => message.includes(keyword));
  }

  isCartQuery(message) {
    const cartKeywords = [
      "cart", "basket", "checkout", "buy", "purchase", "order", "payment",
      "shipping", "delivery", "track order", "return", "refund", "my cart",
      "view cart", "clear cart"
    ];
    return cartKeywords.some((keyword) => message.includes(keyword)) &&
           !(message.includes("add to cart") || message.includes("add this") || message.includes("product to cart") || message.includes("add to card") || message.includes("buy"));
  }

  isNavigationQuery(message) {
    const navKeywords = [
      "navigate", "how to", "where is", "find", "search", "menu", "page",
      "section", "go to", "website", "explore"
    ];
    return navKeywords.some((keyword) => message.includes(keyword));
  }

  isGreeting(message) {
    const greetings = [
      "hi", "hello", "hey", "namaste", "good morning", "good afternoon",
      "good evening", "how are you", "what's up", "how do you do",
      "greetings", "yo", "sup", "hola"
    ];
    return greetings.some((greeting) => message.includes(greeting));
  }

  isGeneralInfoQuery(message) {
      const generalKeywords = [
          "help", "info", "information", "what can you do", "about", "customer service",
          "contact", "hours", "policy", "faq", "support", "how to"
      ];
      return generalKeywords.some(keyword => message.includes(keyword));
  }

  getProductSpecifications(product) {
    let specsHtml = `Here are the specifications for **${product.name}** ${product.emoji}:<br><br><ul>`;
    for (const key in product.specs) {
        specsHtml += `<li><strong>${key.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase())}:</strong> ${product.specs[key]}</li>`;
    }
    specsHtml += `</ul><br>It costs **₹${product.price.toLocaleString()}**.`;
    if (product.ar_enabled) {
        specsHtml += `<br><br>This product supports **Augmented Reality (AR)** viewing! You can see it in your space.`;
    }
    specsHtml += `<br><br>Would you like to <button class="suggestion-btn" onclick="chatbot.handleSuggestion('add ${product.name} to cart')">add it to your cart</button>?`;
    this.currentContext = { type: 'product_specs_asked', productId: product.id };
    return specsHtml;
  }

  getDefaultProductResponse(product) {
    let response = `The **${product.name}** ${product.emoji} is a great choice! It's in our **${product.category}** category and is priced at **₹${product.price.toLocaleString()}**.`;
    if (product.ar_enabled) {
        response += ` It also supports AR viewing.`;
    }
    response += `<br><br>Would you like to know its <button class="suggestion-btn" onclick="chatbot.handleSuggestion('tell me about ${product.name} specifications')">specifications</button> or <button class="suggestion-btn" onclick="chatbot.handleSuggestion('add ${product.name} to cart')">add it to your cart</button>?`;
    this.currentContext = { type: 'product_info_given', productId: product.id };
    return response;
  }

  handleProductQuery(message) {
    if (message.includes("samsung m34") || message.includes("galaxy m34 5g")) {
        const product = this.products.find(p => p.name === "Samsung Galaxy M34 5G");
        if (product) {
            if (message.includes("specifications") || message.includes("specs") || message.includes("details") || message.includes("about")) {
                return this.getProductSpecifications(product);
            }
            return this.getDefaultProductResponse(product);
        }
    }

    let matchedProducts = [];
    let queryLower = message.toLowerCase();
    let introductoryText = "";

    if (queryLower.includes("sofa") || queryLower.includes("furniture")) {
      matchedProducts = this.products.filter(p => p.category === "furniture");
      introductoryText = "Looking for furniture? Here are some options: 🛋️<br><br>";
    } else if (queryLower.includes("phone") || queryLower.includes("mobile") || queryLower.includes("electronics")) {
      matchedProducts = this.products.filter(p => p.category === "electronics");
      introductoryText = "Explore our electronics collection! 📱<br><br>";
    } else if (queryLower.includes("dress") || queryLower.includes("fashion") || queryLower.includes("clothing") || queryLower.includes("saree") || queryLower.includes("kurta") || queryLower.includes("lehenga")) {
      matchedProducts = this.products.filter(p => p.category === "fashion" || p.category === "indian_handicraft");
      introductoryText = "Check out our latest fashion wear! 👗<br><br>";
    } else if (queryLower.includes("latest") || queryLower.includes("new") || queryLower.includes("trending")) {
      matchedProducts = this.products.slice(0, 3);
      introductoryText = "Here are some of our latest and trending products: 🔥<br><br>";
    } else if (queryLower.includes("cheap") || queryLower.includes("affordable") || queryLower.includes("budget")) {
      matchedProducts = this.products.filter(p => p.price < 5000).sort((a, b) => a.price - b.price).slice(0, 3);
      introductoryText = "Looking for affordable options? Here are some great deals: 💰<br><br>";
    } else if (queryLower.includes("premium") || queryLower.includes("expensive") || queryLower.includes("high-end")) {
      matchedProducts = this.products.filter(p => p.price > 10000).sort((a, b) => b.price - a.price).slice(0, 3);
      introductoryText = "Discover our premium collection: ✨<br><br>";
    } else if (queryLower.includes("all products") || queryLower.includes("show all")) {
        matchedProducts = this.products;
        introductoryText = "Here is a list of all products in our catalog: 📦<br><br>";
    }
    else {
        introductoryText = "I couldn't find specific products matching your exact request. Here are some popular items: 🛍️<br><br>";
        matchedProducts = this.products.slice(0, 3);
    }

    if (matchedProducts.length === 0) {
      return "I couldn't find any products matching your specific request. Please try a different query or browse our categories.";
    }

    return introductoryText + this.generateProductCards(matchedProducts.slice(0, 5));
  }

  generateProductCards(products) {
    if (products.length === 0) {
        return "No products found.";
    }
    return products
      .map(
        (product) => `
            <div class="product-suggestion" onclick="chatbot.openProduct(${product.id})">
                <div class="product-suggestion-header">
                    <div class="product-suggestion-image">${product.emoji || "📦"}</div>
                    <div class="product-suggestion-info">
                        <h4>${product.name}</h4>
                        <p class="product-suggestion-price">₹${product.price.toLocaleString()}</p>
                        <p>${product.specs && product.specs.display ? product.specs.display : (product.specs && product.specs.material ? product.specs.material.substring(0,40) + '...' : product.category)}</p>
                    </div>
                </div>
            </div>
        `,
      )
      .join("");
  }

  handleARQuery(message) {
    let arProducts = this.products.filter(p => p.ar_enabled);
    let productList = arProducts.map(p => `${p.emoji} ${p.name}`).join(", ") || "No specific AR-enabled products listed at the moment.";

    return `Great question about our AR features! 📱✨

Our AR (Augmented Reality) feature lets you visualize products in your real space using your device camera. Here's how to use it:

🔍 **How to Access AR:**
• Look for the 'AR View' button on product cards (if available for that product)
• Available for categories like furniture and some electronics
• Works on both mobile and desktop with camera

📐 **AR Controls:**
• Scale products from 10% to 300%
• Rotate 360° to see all angles
• Adjust height from 0 to 2 meters
• Take screenshots to save or share

💡 **Tips for Best Experience:**
• Use in well-lit environments
• Point camera at flat surfaces
• Move slowly for better tracking
• Make sure you have camera permissions enabled

Currently, these products support AR viewing: ${productList}. Would you like me to guide you to specific products that support AR viewing?`;
  }

  handleIndianProductsQuery(message) {
    const indianProducts = this.products.filter(p => p.category === "indian_handicraft" || p.name.toLowerCase().includes("saree"));

    return (
      `Namaste! 🙏 Here are some beautiful traditional Indian products:<br><br>` +
      this.generateProductCards(indianProducts.slice(0,3)) +
      `<br>🇮🇳 **Our Indian Collection includes:**<br>
               • Traditional clothing (sarees, kurtas, lehengas, dupattas)<br>
               • Authentic handicrafts (pottery, wooden items, textiles)<br>
               • Indian groceries & spices<br>
               • Regional specialties<br><br>
               Visit our dedicated <a href="your_indian_products_page_url_here" target="_blank">Indian Products section</a> for the complete collection!`
    );
  }

  handleStoreQuery(message) {
    return `🏪 **Store Locator & Bargaining**

We have 10+ physical stores across major Indian cities! Here's what you can do:

📍 **Find Stores:**
• Mumbai, Delhi, Bangalore, Chennai, Pune, Kolkata, Hyderabad, Ahmedabad (and more!)
• Use our <a href="your_store_locator_page_url_here" target="_blank">Store Locator</a> feature on the website to find the nearest store.
• Get detailed directions and contact details for each outlet.

💰 **Bargaining System (In-store only):**
• Available in all physical stores for select products.
• Feel free to negotiate prices with our store managers, especially for higher value items.
• Average savings of 10-25% possible on successful negotiations.
• Special discounts and bundles might be available for bulk purchases.

🎯 **Bargaining Tips:**
• Compare our online prices with in-store offers.
• Be polite and clear about your budget.
• Consider buying multiple items to get a better deal.
• Ask about any ongoing seasonal sales or promotions.

Would you like me to help you find stores in your city or give you specific bargaining strategies?`;
  }

  handleAddToCart(productId) {
    const productToAdd = this.products.find(p => p.id === productId);

    if (productToAdd) {
        if (window.cartManager && typeof window.cartManager.addToCart === 'function') {
            const addedSuccessfully = window.cartManager.addToCart(productToAdd);

            if (addedSuccessfully) {
                this.trackEvent("add_to_cart_success", { productId: productToAdd.id, productName: productToAdd.name });
                this.updateInternalCartFromGlobal();
                this.currentContext = null;
                return `✅ **${productToAdd.name}** has been added to your cart! Your cart now has **${this.getCartItemCount()}** item(s). Would you like to <button class="suggestion-btn" onclick="chatbot.handleSuggestion('view my cart')">view your cart</button>?`;
            } else {
                return "There was an issue adding the product to your cart. Please try again or ensure the product details are correct.";
            }
        } else {
            console.error("window.cartManager or addToCart function not found.");
            return "I'm having trouble connecting to the main shopping cart system. Please try adding products directly from the website's product pages.";
        }
    } else {
        return "I couldn't find that product to add to your cart. Please try specifying the product name (e.g., 'add Samsung Galaxy M34 5G to cart').";
    }
  }

  updateInternalCartFromGlobal() {
      if (window.cartManager && typeof window.cartManager.getCart === 'function') {
          this.cart = window.cartManager.getCart();
      } else {
          this.cart = [];
      }
  }

  getCartItemCount() {
      if (window.cartManager && typeof window.cartManager.getCart === 'function') {
          return window.cartManager.getCart().reduce((sum, item) => sum + item.quantity, 0);
      }
      return 0;
  }

  handleCartQuery(message) {
    this.updateInternalCartFromGlobal();

    if (message.includes("view") || message.includes("show") || message.includes("my cart")) {
      return this.viewCart();
    } else if (message.includes("clear") || message.includes("empty")) {
      return this.clearCart();
    } else if (message.includes("checkout") || message.includes("payment") || message.includes("shipping")) {
        return `🛒 **Checkout & Payment Information**

        To proceed to checkout, please <button class="suggestion-btn" onclick="chatbot.viewCart()">view your cart</button> first and click 'Checkout'.

        **Payment Options:**
        • Credit/Debit Cards (Visa, MasterCard, Amex)
        • UPI (PhonePe, Google Pay, Paytm, BHIM)
        • Net Banking (all major Indian banks)
        • Cash on Delivery (COD) - available for select pincodes
        • EMI options available on credit cards

        **Shipping & Delivery:**
        • Standard delivery: 3-7 business days
        • Express delivery: 1-2 business days (additional charges apply)
        • Free shipping on orders above ₹5000!

        Is there anything specific you need help with regarding payment or delivery?`;
    }
    else {
      return `🛒 **Shopping Cart Help**<br><br>Current cart items: **${this.getCartItemCount()}** total item(s).<br>
              ${this.getCartItemCount() > 0 ? "" : "Your cart is currently empty."}<br><br>
              Need help adding specific products to your cart? Just tell me the product name (e.g., "add Samsung Galaxy M34 5G to cart")! You can also ask me to 'view my cart' or 'clear my cart'.`;
    }
  }

  viewCart() {
    this.updateInternalCartFromGlobal();
    if (this.cart.length === 0) {
      return "Your cart is currently empty. Time to find some amazing products! 🛍️";
    }

    let cartSummary = "Here's what's in your cart: 🛒<br><br><ul class='cart-items'>";
    let total = 0;
    this.cart.forEach(item => {
      const product = this.products.find(p => p.id === item.id) || item;
      const itemTotal = item.price * item.quantity;
      cartSummary += `
          <li class="cart-item">
              <strong>${product.name}</strong> 
              <span class="cart-item-qty">(Qty: ${item.quantity})</span>
              <span class="cart-item-price">₹${itemTotal.toLocaleString()}</span>
              <button class="suggestion-btn small" onclick="chatbot.handleSuggestion('remove ${product.name} from cart')">Remove</button>
          </li>`;
      total += itemTotal;
    });
    cartSummary += `</ul><br>
        <div class="cart-total">Your total: <strong>₹${total.toLocaleString()}</strong></div><br>
        <div class="cart-actions">
            <button class="suggestion-btn" onclick="chatbot.handleSuggestion('proceed to checkout')">Proceed to Checkout</button>
            <button class="suggestion-btn secondary" onclick="chatbot.handleSuggestion('continue shopping')">Continue Shopping</button>
            <button class="suggestion-btn secondary" onclick="chatbot.handleSuggestion('clear my cart')">Clear Cart</button>
        </div>`;
    
    this.currentContext = { type: 'view_cart' };
    return cartSummary;
  }

  clearCart() {
    if (window.cartManager && typeof window.cartManager.clearCart === 'function') {
        window.cartManager.clearCart();
        this.updateInternalCartFromGlobal();
        this.currentContext = null;
        this.trackEvent("cart_cleared");
        return "Your cart has been cleared. It's now empty! ✅";
    } else {
        return "I'm having trouble clearing the main shopping cart. Please try clearing it directly from the website's cart page.";
    }
  }

  handleNavigationQuery(message) {
    return `🧭 **Navigation Help**

I can help you find your way around ShopEasy. Here are the main sections and quick actions:

**Main Sections:**
• 🏠 **Home:** Featured products, daily deals, and new arrivals.
• 🛍️ **Products:** Browse all categories like Electronics, Furniture, Fashion, Home Decor, etc.
• 🇮🇳 **Indian Products:** Our special collection of traditional Indian items.
• 🛒 **Cart:** Review your selected items and proceed to checkout.
• 👤 **Account:** Login/signup, manage your profile, orders, and addresses.
• ❓ **Help/FAQ:** Find answers to common questions.

**Quick Actions:**
• 🔍 **Search Bar:** Use the search bar at the top of the page to find specific products.
• 🎤 **Voice Search:** Click the microphone icon in the main search bar for voice commands.
• 📱 **AR View:** Available on product cards for visualizing items in your space.
• 🗺️ **Store Locator:** Find our physical stores near you.

What specific section or product are you trying to find?`;
  }

  getGreetingResponse() {
    const now = new Date();
    const hour = now.getHours();
    let timeOfDay = "day";
    if (hour < 12) timeOfDay = "morning";
    else if (hour < 17) timeOfDay = "afternoon";
    else timeOfDay = "evening";
    
    const greetings = [
        `Good ${timeOfDay}! 👋 I'm your ShopEasy assistant. How can I make your shopping experience better today?`,
        `Hello there! 😊 What brings you to ShopEasy this ${timeOfDay}? I'm happy to help!`,
        `Namaste! 🙏 A very good ${timeOfDay} to you. How may I assist with your shopping needs today?`,
        `Hi! 🎉 Welcome to ShopEasy. What can I help you find this lovely ${timeOfDay}?`
    ];
    
    return greetings[Math.floor(Math.random() * greetings.length)];
  }

  handleGeneralInfoQuery(message) {
      if (message.includes("contact") || message.includes("customer service") || message.includes("support")) {
          return `Need to contact **Customer Service**? 📞

          You can reach us via:
          • **Email:** <a href="mailto:support@shopeasy.com">support@shopeasy.com</a>
          • **Phone:** 1800-123-4567 (Toll-Free, Mon-Sat, 9 AM - 6 PM IST)
          • **Live Chat:** Click the 'Chat with Us' button on our website (during business hours).

          We're here to help you with any queries or issues!`;
      } else if (message.includes("hours") || message.includes("working")) {
          return `Our online store is open 24/7! 🏪 For customer support:

          • **Phone/Live Chat:** Monday to Saturday, 9:00 AM - 6:00 PM IST.
          • **Physical Stores:** Please check our <a href="your_store_locator_page_url_here" target="_blank">Store Locator</a> for individual store timings.`;
      } else if (message.includes("policy") || message.includes("faq")) {
          return `We have various policies to ensure a smooth shopping experience:

          • **Return & Refund Policy:** Details on how to return items and get refunds.
          • **Privacy Policy:** How we handle your personal data.
          • **Terms & Conditions:** Our service agreements.
          • **Shipping Policy:** Information on delivery times and charges.

          You can find links to all these on our website's footer or visit our comprehensive <a href="your_faq_page_url_here" target="_blank">FAQ Page</a>.`;
      } else if (message.includes("what can you do") || message.includes("how can you help")) {
        return `I'm your ShopEasy assistant! I can help you with:
        <br /><br />
        🛍️ Product questions & recommendations (e.g., "Show me electronics", "Details about Premium Sofa Set")<br />
        📱 AR/VR features guidance (e.g., "How AR works")<br />
        🇮🇳 Indian traditional products info (e.g., "Tell me about Indian sarees")<br />
        🛒 Shopping cart & order assistance (e.g., "Payment options", "How to return an item")<br />
        📍 Store locations & bargaining tips (e.g., "Stores near Mumbai")<br />
        ❓ General questions about ShopEasy (e.g., "Contact us", "What are your hours")

        Just type your question, and I'll do my best to help!`;
      }
      return `I can provide general information about ShopEasy. What specific information are you looking for? You can ask about our 'contact details', 'return policy', 'shipping', or 'what I can do'.`;
  }

  getDefaultResponse(message) {
    const lastBotMessage = [...this.conversationHistory].reverse()
        .find(m => m.role === "bot");
        
    if (lastBotMessage) {
        if (lastBotMessage.content.includes("product") && 
            (message.includes("it") || message.includes("that"))) {
            return "Are you asking about the product we just discussed? " + 
                   "You can say 'add it to cart' or ask for more details.";
        }
    }
    
    const responses = [
        `I want to make sure I understand correctly. Could you rephrase your question or tell me more about what you're looking for?`,
        `I'm still learning all the ways to help! Could you ask about products, your cart, or our services?`,
        `That's an interesting question! While I specialize in product info and shopping help, I might need a bit more context to assist perfectly.`,
        `Let me think how best to help with that... Could you tell me if this is about a specific product, your order, or something else?`
    ];
    
    this.currentContext = null;
    return responses[Math.floor(Math.random() * responses.length)];
  }

  handleContextualYes(message) {
    if (this.currentContext && (this.currentContext.type === 'product_specs_asked' || this.currentContext.type === 'product_info_given')) {
        const productToAdd = this.products.find(p => p.id === this.currentContext.productId);
        if (productToAdd) {
            this.currentContext = null;
            return this.handleAddToCart(productToAdd.id);
        }
    } else if (this.currentContext && this.currentContext.type === 'view_cart') {
        this.currentContext = null;
        return `Great! Redirecting you to checkout...<br><br>
                _This is a demo. In a real application, you would be redirected to the actual checkout page._`;
    }
    this.currentContext = null;
    return "Okay, what else can I help you with?";
  }

  handleContextualNo(message) {
    this.currentContext = null;
    return "Okay, no problem. Is there anything else I can assist you with?";
  }

  handleSuggestion(suggestion) {
    const input = document.getElementById("chatbot-input");
    input.value = suggestion;
    this.sendMessage();
  }

  updateSuggestions(lastMessage) {
    const suggestionsContainer = document.querySelector(".chatbot-suggestions");
    if (!suggestionsContainer) {
      console.warn("Chatbot suggestions container not found.");
      return;
    }
    let newSuggestions = [];

    this.updateInternalCartFromGlobal();

    if (this.currentContext && this.currentContext.type === 'product_specs_asked') {
        newSuggestions = ["yes", "no", "view my cart", "continue shopping"];
    } else if (this.currentContext && this.currentContext.type === 'view_cart') {
        newSuggestions = ["yes (proceed to checkout)", "clear my cart", "continue shopping"];
    } else if (this.lastMentionedProduct) {
        newSuggestions = [`${this.lastMentionedProduct.name} specifications`, `add ${this.lastMentionedProduct.name} to cart`, "view my cart", "continue shopping"];
    }
    else if (lastMessage.includes("product") || lastMessage.includes("buy") || lastMessage.includes("show me")) {
      newSuggestions = [
        "show me electronics",
        "indian traditional wear",
        "furniture with AR view",
        "best deals today",
        "Samsung Galaxy M34 5G specifications",
        "add Samsung Galaxy M34 5G to cart"
      ];
    } else if (lastMessage.includes("ar") || lastMessage.includes("3d")) {
      newSuggestions = [
        "AR furniture placement",
        "how to take AR screenshots",
        "AR compatible products",
        "camera permissions help",
      ];
    } else if (lastMessage.includes("store") || lastMessage.includes("location")) {
        newSuggestions = [
            "find stores near me",
            "bargaining tips",
            "store hours Mumbai",
            "physical outlets"
        ];
    } else if (lastMessage.includes("cart") || lastMessage.includes("order") || lastMessage.includes("payment")) {
        newSuggestions = [
            "how to track my order",
            "return policy",
            "shipping details",
            "payment options",
            "view my cart",
            "clear my cart"
        ];
    } else if (lastMessage.includes("help") || lastMessage.includes("info") || lastMessage.includes("contact")) {
        newSuggestions = [
            "what can you do",
            "contact customer service",
            "about ShopEasy",
            "FAQ page"
        ];
    }
    else {
      newSuggestions = [
        "trending products",
        "store locations",
        "payment options",
        "return policy",
        "what can you do?",
        "view my cart"
      ];
    }

    suggestionsContainer.innerHTML = newSuggestions
      .map(
        (suggestion) =>
          `<button class="suggestion-btn" onclick="chatbot.handleSuggestion('${suggestion}')">${suggestion}</button>`,
      )
      .join("");
  }

  handleQuickAction(action) {
    switch (action) {
      case "voice":
        this.handleVoiceMessage();
        break;
      case "camera":
        this.handlePhotoUpload();
        break;
      case "products":
        this.navigateToProducts();
        break;
    }
  }

  handleVoiceMessage() {
    if (!this.recognition) {
        this.addMessage("🎤 Voice recognition is not supported by your browser or device.", "bot");
        return;
    }

    if (this.isVoiceListening) {
      this.stopVoiceListening();
      this.addMessage("🎤 Voice input stopped.", "bot");
    } else {
      try {
        this.recognition.start();
        this.addMessage("🎤 I'm listening... Please speak clearly.", "bot");
      } catch (error) {
        console.error("Error starting speech recognition:", error);
        this.addMessage("🎤 Failed to start voice input. Please ensure microphone access is granted and try again.", "bot");
      }
    }
  }

  handlePhotoUpload() {
    this.addMessage(
      "📸 The photo upload feature for product identification would typically require a backend image processing service (like Google Cloud Vision or a custom AI model). As this is a client-side demo, this functionality is not enabled. For now, you can use our AR feature to visualize products in your space if they support it!",
      "bot",
    );
  }

  navigateToProducts() {
    this.addMessage("🛍️ Redirecting you to our products page...", "bot");
    setTimeout(() => {
      window.location.href = "products.html";
    }, 1000);
  }

  openProduct(productId) {
    this.addMessage(`🔍 Opening product details for you...`, "bot");
    setTimeout(() => {
      window.location.href = `product-detail.html?id=${productId}`;
    }, 1000);
  }

  scrollToBottom() {
    const messagesContainer = document.getElementById("chatbot-messages");
    if (messagesContainer) {
      setTimeout(() => {
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
      }, 100);
    }
  }

  escapeHtml(text) {
    const div = document.createElement("div");
    div.textContent = text;
    return div.innerHTML;
  }

  trackEvent(eventName, data = {}) {
    console.log(`Chatbot Event: ${eventName}`, data);
  }
}

document.addEventListener("DOMContentLoaded", function () {
  window.chatbot = new ShopEasyChatbot();

  window.addEventListener('cartUpdated', () => {
      if (window.chatbot) {
          window.chatbot.updateInternalCartFromGlobal();
          console.log('Chatbot internal cart synced with global cart.');
      }
  });
});