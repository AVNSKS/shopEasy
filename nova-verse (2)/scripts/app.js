// Main Application JavaScript - Replacing App.tsx

class ShopEasyApp {
  constructor() {
    this.isInitialized = false;
    this.init();
  }

  init() {
    // Wait for DOM to be ready
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", () => this.bootstrap());
    } else {
      this.bootstrap();
    }
  }

  bootstrap() {
    if (this.isInitialized) return;

    try {
      // Initialize all components
      this.initializeComponents();

      // Set up global event listeners
      this.setupGlobalEventListeners();

      // Initialize router (already done in router.js)
      this.initializeRouter();

      // Setup header functionality
      this.initializeHeader();

      // Setup cart functionality
      this.initializeCart();

      // Setup search functionality
      this.initializeSearch();

      // Setup toast notifications
      this.initializeToasts();

      this.isInitialized = true;
      console.log("ShopEasy app initialized successfully");
    } catch (error) {
      console.error("Error initializing ShopEasy app:", error);
      this.showErrorMessage("Failed to initialize the application");
    }
  }

  initializeComponents() {
    // Initialize product card renderer if not already done
    if (!window.ProductCardRenderer && window.productCardRenderer) {
      window.ProductCardRenderer = window.productCardRenderer;
    }

    // Initialize cart manager if not already done
    if (!window.CartManager) {
      console.warn("CartManager not found - cart functionality may be limited");
    }

    // Initialize product manager if not already done
    if (!window.ProductManager) {
      console.warn(
        "ProductManager not found - product functionality may be limited",
      );
    }
  }

  setupGlobalEventListeners() {
    // Global error handler
    window.addEventListener("error", (event) => {
      console.error("Global error:", event.error);
      this.showErrorMessage("An unexpected error occurred");
    });

    // Handle unhandled promise rejections
    window.addEventListener("unhandledrejection", (event) => {
      console.error("Unhandled promise rejection:", event.reason);
      this.showErrorMessage("An unexpected error occurred");
    });

    // Handle cart updates
    window.addEventListener("cartUpdated", () => {
      this.updateCartDisplay();
    });

    // Handle browser back/forward buttons
    window.addEventListener("popstate", () => {
      this.updateActiveNavigation();
    });

    // Handle link clicks to prevent default navigation
    document.addEventListener("click", (event) => {
      const link = event.target.closest("a[href]");
      if (link && this.isInternalLink(link.href)) {
        event.preventDefault();
        const path = new URL(link.href).pathname + new URL(link.href).search;
        router.navigateTo(path);
      }
    });
  }

  initializeRouter() {
    // Router is already initialized in router.js
    // Just update navigation on initial load
    this.updateActiveNavigation();
  }

  initializeHeader() {
    // Update cart count
    this.updateCartDisplay();

    // Set up mobile menu toggle
    const mobileMenuBtn = document.querySelector(".mobile-menu-btn");
    const navBar = document.querySelector(".nav-bar");

    if (mobileMenuBtn && navBar) {
      mobileMenuBtn.addEventListener("click", () => {
        navBar.classList.toggle("mobile-open");
      });
    }
  }

  initializeCart() {
    // Initial cart count update
    this.updateCartDisplay();

    // Listen for storage changes (for multiple tabs)
    window.addEventListener("storage", (event) => {
      if (event.key === "cartItems") {
        this.updateCartDisplay();
      }
    });
  }

  initializeSearch() {
    // Global search functionality
    const searchForm = document.querySelector(".search-form");
    const searchInput = document.getElementById("main-search-input");

    if (searchForm && searchInput) {
      searchForm.addEventListener("submit", (event) => {
        event.preventDefault();
        this.handleGlobalSearch(searchInput.value.trim());
      });
    }

    // Voice search button (if available)
    const voiceSearchBtn = document.querySelector(".voice-search-btn");
    if (voiceSearchBtn) {
      voiceSearchBtn.addEventListener("click", () => {
        this.handleVoiceSearch();
      });
    }
  }

  initializeToasts() {
    // Create toast container if it doesn't exist
    if (!document.getElementById("toast-container")) {
      const toastContainer = document.createElement("div");
      toastContainer.id = "toast-container";
      toastContainer.className = "toast-container";
      document.body.appendChild(toastContainer);
    }
  }

  // Update cart display in header
  updateCartDisplay() {
    try {
      const cartBadge = document.getElementById("cart-badge");
      if (!cartBadge) return;

      const cartItems = JSON.parse(localStorage.getItem("cartItems") || "[]");
      const itemCount = cartItems.reduce(
        (total, item) => total + (item.quantity || 1),
        0,
      );

      if (itemCount > 0) {
        cartBadge.textContent = itemCount > 99 ? "99+" : itemCount.toString();
        cartBadge.classList.remove("hidden");
      } else {
        cartBadge.classList.add("hidden");
      }
    } catch (error) {
      console.error("Error updating cart display:", error);
    }
  }

  // Update active navigation state
  updateActiveNavigation() {
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll(".nav-link");

    navLinks.forEach((link) => {
      link.classList.remove("active");

      // Check if this nav link matches current path
      const linkPath = new URL(link.href).pathname;
      if (
        linkPath === currentPath ||
        (linkPath === "/" && currentPath === "/") ||
        (linkPath === "/products" && currentPath.startsWith("/product"))
      ) {
        link.classList.add("active");
      }
    });
  }

  // Handle global search
  handleGlobalSearch(searchTerm) {
    if (!searchTerm) return;

    router.navigateTo(`/products?search=${encodeURIComponent(searchTerm)}`);
  }

  // Handle voice search
  handleVoiceSearch() {
    if (
      !("webkitSpeechRecognition" in window) &&
      !("SpeechRecognition" in window)
    ) {
      this.showToast("Voice search is not supported in your browser", "error");
      return;
    }

    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();

    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = "en-US";

    recognition.onstart = () => {
      this.showToast("Listening...", "info");
    };

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      const searchInput = document.getElementById("main-search-input");
      if (searchInput) {
        searchInput.value = transcript;
        this.handleGlobalSearch(transcript);
      }
    };

    recognition.onerror = (event) => {
      console.error("Speech recognition error:", event.error);
      this.showToast("Voice search failed. Please try again.", "error");
    };

    recognition.onend = () => {
      // Recognition ended
    };

    recognition.start();
  }

  // Check if a link is internal (same origin)
  isInternalLink(href) {
    try {
      const url = new URL(href);
      return url.origin === window.location.origin;
    } catch {
      return false;
    }
  }

  // Show error message
  showErrorMessage(message) {
    this.showToast(message, "error");
  }

  // Show toast notification
  showToast(message, type = "info", duration = 3000) {
    const toastContainer = document.getElementById("toast-container");
    if (!toastContainer) return;

    const toast = document.createElement("div");
    toast.className = `toast toast-${type}`;

    const typeIcons = {
      success: "✓",
      error: "✗",
      warning: "⚠",
      info: "ℹ",
    };

    toast.innerHTML = `
      <div class="toast-content">
        <span class="toast-icon">${typeIcons[type] || "ℹ"}</span>
        <span class="toast-message">${message}</span>
        <button class="toast-close" onclick="this.parentElement.parentElement.remove()">×</button>
      </div>
    `;

    toastContainer.appendChild(toast);

    // Animate in
    setTimeout(() => {
      toast.classList.add("toast-show");
    }, 10);

    // Auto remove
    setTimeout(() => {
      toast.classList.remove("toast-show");
      setTimeout(() => {
        if (toast.parentNode) {
          toast.parentNode.removeChild(toast);
        }
      }, 300);
    }, duration);
  }

  // Utility method to format currency
  formatCurrency(amount) {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount);
  }

  // Utility method to format numbers
  formatNumber(number) {
    return new Intl.NumberFormat("en-IN").format(number);
  }

  // Method to handle loading states
  showLoading(element) {
    if (element) {
      element.classList.add("loading");
    }
  }

  hideLoading(element) {
    if (element) {
      element.classList.remove("loading");
    }
  }

  // Method to handle API calls (if needed in future)
  async apiCall(url, options = {}) {
    try {
      const response = await fetch(url, {
        ...options,
        headers: {
          "Content-Type": "application/json",
          ...options.headers,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error("API call failed:", error);
      this.showToast("Network error. Please try again.", "error");
      throw error;
    }
  }
}

// Global utility functions
function handleAccountClick() {
  if (
    window.authSystem &&
    typeof window.authSystem.showLoginModal === "function"
  ) {
    window.authSystem.showLoginModal();
  } else {
    app.showToast("Account functionality coming soon!", "info");
  }
}

function toggleMobileMenu() {
  const navBar = document.querySelector(".nav-bar");
  if (navBar) {
    navBar.classList.toggle("mobile-open");
  }
}

function handleSearch(event) {
  event.preventDefault();
  const searchInput = event.target.querySelector("input");
  if (searchInput && searchInput.value.trim()) {
    app.handleGlobalSearch(searchInput.value.trim());
  }
}

function handleAddToCart(productId) {
  if (!window.ProductManager || !window.CartManager) {
    app.showToast("Cart functionality is not available", "error");
    return;
  }

  const product = window.ProductManager.getProductById(productId);
  if (!product) {
    app.showToast("Product not found", "error");
    return;
  }

  if (!product.inStock) {
    app.showToast("Product is out of stock", "warning");
    return;
  }

  const success = window.CartManager.addToCart(product);
  if (success) {
    app.showToast(`${product.name} added to cart!`, "success");
  } else {
    app.showToast("Failed to add product to cart", "error");
  }
}

// Initialize the application
const app = new ShopEasyApp();

// Make app globally available for debugging
window.ShopEasyApp = app;

// Export for module usage if needed
if (typeof module !== "undefined" && module.exports) {
  module.exports = ShopEasyApp;
}
