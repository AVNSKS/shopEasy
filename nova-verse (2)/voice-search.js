// Voice Search Functionality
class VoiceSearch {
  constructor() {
    this.recognition = null;
    this.isListening = false;
    this.supportsSpeechRecognition = this.checkSupport();
    this.init();
  }

  checkSupport() {
    return "webkitSpeechRecognition" in window || "SpeechRecognition" in window;
  }

  init() {
    if (!this.supportsSpeechRecognition) {
      console.warn("Speech Recognition not supported in this browser");
      return;
    }

    // Use webkitSpeechRecognition for broader browser support
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    this.recognition = new SpeechRecognition();

    // Configure recognition settings
    this.recognition.continuous = false;
    this.recognition.interimResults = false;
    this.recognition.lang = "en-IN"; // Indian English for better recognition of Indian terms
    this.recognition.maxAlternatives = 1;

    // Set up event listeners
    this.setupEventListeners();
  }

  setupEventListeners() {
    if (!this.recognition) return;

    this.recognition.onstart = () => {
      this.isListening = true;
      this.updateVoiceButtons("listening");
      this.showVoiceModal(
        "🎤 Listening... Say something like 'biryani' or 'smartphone'",
      );
    };

    this.recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      this.handleVoiceResult(transcript);
    };

    this.recognition.onerror = (event) => {
      this.isListening = false;
      this.updateVoiceButtons("error");
      this.hideVoiceModal();

      let errorMessage = "Voice search error. Please try again.";
      switch (event.error) {
        case "network":
          errorMessage = "Network error. Please check your connection.";
          break;
        case "not-allowed":
          errorMessage =
            "Microphone access denied. Please allow microphone permission.";
          break;
        case "no-speech":
          errorMessage = "No speech detected. Please try again.";
          break;
        case "aborted":
          errorMessage = "Voice search was cancelled.";
          break;
      }

      this.showNotification(errorMessage, "error");
    };

    this.recognition.onend = () => {
      this.isListening = false;
      this.updateVoiceButtons("idle");
      this.hideVoiceModal();
    };
  }

  startVoiceSearch(searchType = "products") {
    if (!this.supportsSpeechRecognition) {
      this.showNotification(
        "Voice search is not supported in your browser. Please try Chrome or Edge.",
        "error",
      );
      return;
    }

    if (this.isListening) {
      this.stopVoiceSearch();
      return;
    }

    try {
      this.currentSearchType = searchType;
      this.recognition.start();
    } catch (error) {
      console.error("Error starting voice recognition:", error);
      this.showNotification(
        "Failed to start voice search. Please try again.",
        "error",
      );
    }
  }

  stopVoiceSearch() {
    if (this.recognition && this.isListening) {
      this.recognition.stop();
    }
  }

  handleVoiceResult(transcript) {
    const cleanTranscript = transcript.trim().toLowerCase();

    if (!cleanTranscript) {
      this.showNotification("No speech detected. Please try again.", "error");
      return;
    }

    this.showNotification(`Heard: "${transcript}"`, "success");

    // Determine which search to perform based on current context
    if (this.currentSearchType === "recipes") {
      this.performRecipeSearch(cleanTranscript);
    } else {
      this.performProductSearch(cleanTranscript);
    }
  }

  performProductSearch(query) {
    // Fill the main search input
    const searchInput = document.getElementById("searchInput");
    if (searchInput) {
      searchInput.value = query;

      // Trigger search
      const searchForm = searchInput.closest("form");
      if (searchForm) {
        // Dispatch a submit event
        const submitEvent = new Event("submit", {
          bubbles: true,
          cancelable: true,
        });
        searchForm.dispatchEvent(submitEvent);
      } else {
        // Fallback: redirect to products page with search
        window.location.href = `products.html?search=${encodeURIComponent(query)}`;
      }
    }
  }

  performRecipeSearch(query) {
    // Check if we're on recipe search page
    const recipeSearchInput = document.getElementById("recipeSearchInput");
    if (recipeSearchInput) {
      recipeSearchInput.value = query;

      // Trigger recipe search
      if (typeof performRecipeSearch === "function") {
        performRecipeSearch(query);
      } else {
        // Fallback form submission
        const searchForm = recipeSearchInput.closest("form");
        if (searchForm) {
          const submitEvent = new Event("submit", {
            bubbles: true,
            cancelable: true,
          });
          searchForm.dispatchEvent(submitEvent);
        }
      }
    } else {
      // Redirect to recipe search page with query
      window.location.href = `recipe-search.html?search=${encodeURIComponent(query)}`;
    }
  }

  updateVoiceButtons(state) {
    const voiceButtons = document.querySelectorAll(".voice-search-btn");
    voiceButtons.forEach((button) => {
      const icon = button.querySelector(".voice-icon");
      const buttonEl = button;

      switch (state) {
        case "listening":
          if (icon) icon.innerHTML = this.getListeningIcon();
          buttonEl.classList.add("listening");
          buttonEl.classList.remove("error");
          buttonEl.title = "Click to stop listening";
          break;
        case "error":
          if (icon) icon.innerHTML = this.getErrorIcon();
          buttonEl.classList.add("error");
          buttonEl.classList.remove("listening");
          buttonEl.title = "Voice search error - click to try again";
          break;
        default:
          if (icon) icon.innerHTML = this.getIdleIcon();
          buttonEl.classList.remove("listening", "error");
          buttonEl.title = "Click to start voice search";
      }
    });
  }

  getIdleIcon() {
    return `
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/>
        <path d="M19 10v2a7 7 0 0 1-14 0v-2"/>
        <line x1="12" x2="12" y1="19" y2="22"/>
        <line x1="8" x2="16" y1="22" y2="22"/>
      </svg>
    `;
  }

  getListeningIcon() {
    return `
      <svg viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2">
        <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/>
        <path d="M19 10v2a7 7 0 0 1-14 0v-2"/>
        <line x1="12" x2="12" y1="19" y2="22"/>
        <line x1="8" x2="16" y1="22" y2="22"/>
      </svg>
    `;
  }

  getErrorIcon() {
    return `
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/>
        <path d="M19 10v2a7 7 0 0 1-14 0v-2"/>
        <line x1="12" x2="12" y1="19" y2="22"/>
        <line x1="8" x2="16" y1="22" y2="22"/>
        <line x1="18" x2="6" y1="6" y2="18"/>
      </svg>
    `;
  }

  showVoiceModal(message) {
    // Remove existing modal if any
    this.hideVoiceModal();

    const modal = document.createElement("div");
    modal.id = "voiceModal";
    modal.style.cssText = `
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: linear-gradient(135deg, #3b82f6, #1d4ed8);
      color: white;
      padding: 2rem;
      border-radius: 1rem;
      box-shadow: 0 20px 25px rgba(0, 0, 0, 0.25);
      z-index: 10000;
      text-align: center;
      min-width: 300px;
      animation: modalFadeIn 0.3s ease-out;
    `;

    modal.innerHTML = `
      <div style="font-size: 2rem; margin-bottom: 1rem;">
        <div class="pulse-animation">${message.includes("🎤") ? "🎤" : "🔊"}</div>
      </div>
      <p style="font-size: 1.125rem; margin-bottom: 1rem;">${message}</p>
      <button onclick="voiceSearch.stopVoiceSearch()" style="
        background: rgba(255, 255, 255, 0.2);
        color: white;
        border: 1px solid rgba(255, 255, 255, 0.3);
        padding: 0.5rem 1rem;
        border-radius: 0.5rem;
        cursor: pointer;
        font-weight: 500;
      ">Stop Listening</button>
    `;

    // Add backdrop
    const backdrop = document.createElement("div");
    backdrop.id = "voiceModalBackdrop";
    backdrop.style.cssText = `
      position: fixed;
      inset: 0;
      background: rgba(0, 0, 0, 0.5);
      z-index: 9999;
    `;
    backdrop.onclick = () => this.stopVoiceSearch();

    document.body.appendChild(backdrop);
    document.body.appendChild(modal);

    // Add animations
    const style = document.createElement("style");
    style.textContent = `
      @keyframes modalFadeIn {
        from { opacity: 0; transform: translate(-50%, -50%) scale(0.9); }
        to { opacity: 1; transform: translate(-50%, -50%) scale(1); }
      }
      .pulse-animation {
        animation: pulse 1.5s infinite;
      }
      @keyframes pulse {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.1); }
      }
    `;
    document.head.appendChild(style);
  }

  hideVoiceModal() {
    const modal = document.getElementById("voiceModal");
    const backdrop = document.getElementById("voiceModalBackdrop");
    if (modal) modal.remove();
    if (backdrop) backdrop.remove();
  }

  showNotification(message, type = "success") {
    const notification = document.createElement("div");
    notification.className = `voice-notification ${type}`;
    notification.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: ${type === "success" ? "#10b981" : "#ef4444"};
      color: white;
      padding: 1rem 1.5rem;
      border-radius: 0.5rem;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      z-index: 10000;
      font-weight: 500;
      max-width: 300px;
      animation: slideIn 0.3s ease-out;
    `;
    notification.textContent = message;

    document.body.appendChild(notification);

    // Add slide-in animation
    const style = document.createElement("style");
    style.textContent = `
      @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
      }
    `;
    document.head.appendChild(style);

    setTimeout(() => {
      if (notification.parentNode) {
        notification.style.animation = "slideIn 0.3s ease-out reverse";
        setTimeout(() => notification.remove(), 300);
      }
    }, 3000);
  }
}

// Initialize voice search when DOM is loaded
let voiceSearch;
document.addEventListener("DOMContentLoaded", function () {
  voiceSearch = new VoiceSearch();
});

// Export for global use
window.voiceSearch = voiceSearch;
