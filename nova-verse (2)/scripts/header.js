// Header Component JavaScript

class HeaderManager {
  constructor() {
    this.searchTerm = "";
    this.cartItemsCount = 0;
    this.onSearchCallback = null;
    this.init();
  }

  init() {
    this.initSearchBar();
    this.updateCartCount();
    this.setupEventListeners();

    // Update cart count periodically
    setInterval(() => this.updateCartCount(), 1000);
  }

  initSearchBar() {
    const searchContainer = document.getElementById("search-container");
    if (searchContainer) {
      searchContainer.innerHTML = `
        <form class="search-form" onsubmit="headerManager.handleSearch(event)">
          <input
            type="text"
            class="search-input"
            placeholder="Search for products, brands and more..."
            value="${this.searchTerm}"
            oninput="headerManager.setSearchTerm(this.value)"
          />
          <button type="submit" class="search-btn">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.3-4.3"></path>
            </svg>
          </button>
        </form>
      `;
    }
  }

  setupEventListeners() {
    // Listen for storage changes to update cart count
    window.addEventListener("storage", (e) => {
      if (e.key === "cartItems" || e.key === "cartCount") {
        this.updateCartCount();
      }
    });

    // Listen for custom cart update events
    window.addEventListener("cartUpdated", () => {
      this.updateCartCount();
    });
  }

  setSearchTerm(value) {
    this.searchTerm = value;
  }

  handleSearch(event) {
    event.preventDefault();

    if (this.searchTerm.trim()) {
      if (this.onSearchCallback) {
        this.onSearchCallback(this.searchTerm);
      } else {
        // Default search behavior - redirect to products page
        window.location.href = `/products.html?search=${encodeURIComponent(this.searchTerm)}`;
      }
    }
  }

  setOnSearchCallback(callback) {
    this.onSearchCallback = callback;
  }

  updateCartCount() {
    try {
      // Get cart items from localStorage
      const cartItems = JSON.parse(localStorage.getItem("cartItems") || "[]");
      const count = cartItems.reduce(
        (total, item) => total + (item.quantity || 1),
        0,
      );

      this.cartItemsCount = count;
      this.updateCartBadge();
    } catch (error) {
      console.error("Error updating cart count:", error);
      this.cartItemsCount = 0;
      this.updateCartBadge();
    }
  }

  updateCartBadge() {
    const cartBadge = document.getElementById("cart-badge");
    if (cartBadge) {
      if (this.cartItemsCount > 0) {
        cartBadge.textContent =
          this.cartItemsCount > 99 ? "99+" : this.cartItemsCount.toString();
        cartBadge.classList.remove("hidden");
      } else {
        cartBadge.classList.add("hidden");
      }
    }
  }

  getCartItemsCount() {
    return this.cartItemsCount;
  }
}

// Cart functionality
class CartManager {
  static addToCart(product) {
    try {
      const cartItems = JSON.parse(localStorage.getItem("cartItems") || "[]");
      const existingItem = cartItems.find((item) => item.id === product.id);

      if (existingItem) {
        existingItem.quantity = (existingItem.quantity || 1) + 1;
      } else {
        cartItems.push({ ...product, quantity: 1 });
      }

      localStorage.setItem("cartItems", JSON.stringify(cartItems));

      // Dispatch custom event for cart update
      window.dispatchEvent(new CustomEvent("cartUpdated"));

      return true;
    } catch (error) {
      console.error("Error adding to cart:", error);
      return false;
    }
  }

  static removeFromCart(productId) {
    try {
      const cartItems = JSON.parse(localStorage.getItem("cartItems") || "[]");
      const updatedItems = cartItems.filter((item) => item.id !== productId);

      localStorage.setItem("cartItems", JSON.stringify(updatedItems));

      // Dispatch custom event for cart update
      window.dispatchEvent(new CustomEvent("cartUpdated"));

      return true;
    } catch (error) {
      console.error("Error removing from cart:", error);
      return false;
    }
  }

  static isInCart(productId) {
    try {
      const cartItems = JSON.parse(localStorage.getItem("cartItems") || "[]");
      return cartItems.some((item) => item.id === productId);
    } catch (error) {
      console.error("Error checking cart:", error);
      return false;
    }
  }

  static getCartItems() {
    try {
      return JSON.parse(localStorage.getItem("cartItems") || "[]");
    } catch (error) {
      console.error("Error getting cart items:", error);
      return [];
    }
  }
}

// Global functions for onclick handlers
function handleAccountClick() {
  // Check if authentication system is available
  if (
    window.authSystem &&
    typeof window.authSystem.showLoginModal === "function"
  ) {
    window.authSystem.showLoginModal();
  } else {
    // Fallback - redirect to login page or show simple alert
    window.location.href = "/login.html";
  }
}

function toggleMobileMenu() {
  // Toggle mobile menu functionality
  const navBar = document.querySelector(".nav-bar");
  if (navBar) {
    navBar.classList.toggle("mobile-open");
  }
}

// Initialize header manager when DOM is loaded
let headerManager;
document.addEventListener("DOMContentLoaded", () => {
  headerManager = new HeaderManager();

  // Make header manager globally available
  window.headerManager = headerManager;
  window.CartManager = CartManager;
});

// Utility functions for other scripts
window.addToCart = function (product) {
  return CartManager.addToCart(product);
};

window.removeFromCart = function (productId) {
  return CartManager.removeFromCart(productId);
};

window.isInCart = function (productId) {
  return CartManager.isInCart(productId);
};

window.getCartItems = function () {
  return CartManager.getCartItems();
};

// Export for module usage if needed
if (typeof module !== "undefined" && module.exports) {
  module.exports = { HeaderManager, CartManager };
}
