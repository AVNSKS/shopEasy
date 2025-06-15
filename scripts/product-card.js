// Product Card Component JavaScript

class ProductCardRenderer {
  constructor() {
    this.template = null;
    this.init();
  }

  init() {
    // Get the template element
    this.template = document.getElementById("product-card-template");
    if (!this.template) {
      console.warn("Product card template not found");
    }
  }

  createProductCard(product, className = "") {
    if (!this.template) {
      console.error("Product card template not available");
      return null;
    }

    // Clone the template content
    const cardElement = this.template.content.cloneNode(true);

    // Get the main card elements
    const cardLink = cardElement.querySelector(".product-card-link");
    const card = cardElement.querySelector(".product-card");
    const image = cardElement.querySelector(".product-image");
    const badgesContainer = cardElement.querySelector(".product-badges");
    const productName = cardElement.querySelector(".product-name");
    const ratingValue = cardElement.querySelector(".rating-value");
    const reviewsCount = cardElement.querySelector(".reviews-count");
    const currentPrice = cardElement.querySelector(".current-price");
    const originalPrice = cardElement.querySelector(".original-price");
    const featuresContainer = cardElement.querySelector(".product-features");
    const addToCartBtn = cardElement.querySelector(".add-to-cart-btn");

    // Set basic product information
    if (cardLink) {
      cardLink.href = `/product-detail.html?id=${product.id}`;
    }

    if (className) {
      card.classList.add(className);
    }

    // Set product image
    if (image) {
      image.src = product.image || "/placeholder-image.jpg";
      image.alt = product.name || "Product image";
    }

    // Set product name
    if (productName) {
      productName.textContent = product.name || "Unknown Product";
    }

    // Set rating
    if (ratingValue) {
      ratingValue.textContent = product.rating || "0";
    }

    if (reviewsCount) {
      reviewsCount.textContent = `(${this.formatNumber(product.reviews || 0)})`;
    }

    // Set pricing
    if (currentPrice) {
      currentPrice.textContent = this.formatPrice(product.price || 0);
    }

    if (originalPrice) {
      if (product.originalPrice && product.originalPrice > product.price) {
        originalPrice.textContent = this.formatPrice(product.originalPrice);
        originalPrice.classList.remove("hidden");
      } else {
        originalPrice.classList.add("hidden");
      }
    }

    // Set features
    if (featuresContainer) {
      if (product.features && product.features.length > 0) {
        featuresContainer.textContent = product.features
          .slice(0, 2)
          .join(" • ");
        featuresContainer.classList.remove("hidden");
      } else {
        featuresContainer.classList.add("hidden");
      }
    }

    // Add badges
    this.addBadges(badgesContainer, product);

    // Setup add to cart button
    this.setupAddToCartButton(addToCartBtn, product);

    return cardElement;
  }

  addBadges(container, product) {
    if (!container) return;

    // Clear existing badges
    container.innerHTML = "";

    const leftBadges = document.createElement("div");
    const rightBadges = document.createElement("div");

    // Add discount badge
    if (product.discount && product.discount > 0) {
      const discountBadge = document.createElement("div");
      discountBadge.className = "discount-badge";
      discountBadge.textContent = `${product.discount}% OFF`;
      leftBadges.appendChild(discountBadge);
    }

    // Add brand badge
    if (product.brand) {
      const brandBadge = document.createElement("div");
      brandBadge.className = "brand-badge";
      brandBadge.textContent = product.brand;
      rightBadges.appendChild(brandBadge);
    }

    container.appendChild(leftBadges);
    container.appendChild(rightBadges);

    // Add out of stock overlay
    if (!product.inStock) {
      const overlay = document.createElement("div");
      overlay.className = "out-of-stock-overlay";

      const badge = document.createElement("div");
      badge.className = "out-of-stock-badge";
      badge.textContent = "Out of Stock";

      overlay.appendChild(badge);
      container.appendChild(overlay);
    }
  }

  setupAddToCartButton(button, product) {
    if (!button) return;

    // Set product data
    button.dataset.productId = product.id;
    button.dataset.product = JSON.stringify(product);

    // Update button state based on stock and cart status
    const isInCart = this.isInCart(product.id);
    const isOutOfStock = !product.inStock;

    if (isOutOfStock) {
      button.disabled = true;
      button.querySelector(".btn-text").textContent = "Out of Stock";
    } else if (isInCart) {
      button.classList.add("added");
      button.querySelector(".btn-text").textContent = "Added to Cart";
    } else {
      button.querySelector(".btn-text").textContent = "Add to Cart";
    }
  }

  formatPrice(price) {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(price);
  }

  formatNumber(number) {
    return new Intl.NumberFormat("en-IN").format(number);
  }

  isInCart(productId) {
    try {
      const cartItems = JSON.parse(localStorage.getItem("cartItems") || "[]");
      return cartItems.some((item) => item.id === productId);
    } catch (error) {
      console.error("Error checking cart:", error);
      return false;
    }
  }

  // Render multiple products in a container
  renderProducts(products, containerId, className = "") {
    const container = document.getElementById(containerId);
    if (!container) {
      console.error(`Container with id "${containerId}" not found`);
      return;
    }

    // Clear existing content
    container.innerHTML = "";

    // Add loading class temporarily
    container.classList.add("loading");

    // Simulate loading delay for better UX
    setTimeout(() => {
      products.forEach((product) => {
        const cardElement = this.createProductCard(product, className);
        if (cardElement) {
          container.appendChild(cardElement);
        }
      });

      container.classList.remove("loading");
    }, 100);
  }

  // Create loading placeholder
  createLoadingCard() {
    const card = document.createElement("div");
    card.className = "product-card loading";
    card.innerHTML = `
      <div class="product-image-container">
        <div class="loading-placeholder" style="height: 100%;"></div>
      </div>
      <div class="product-content">
        <div class="product-info">
          <div class="loading-placeholder" style="height: 1rem; margin-bottom: 0.5rem;"></div>
          <div class="loading-placeholder" style="height: 0.875rem; width: 60%; margin-bottom: 0.5rem;"></div>
          <div class="loading-placeholder" style="height: 1.125rem; width: 40%; margin-bottom: 0.5rem;"></div>
        </div>
        <div class="loading-placeholder" style="height: 2.25rem;"></div>
      </div>
    `;
    return card;
  }

  // Show loading state
  showLoading(containerId, count = 8) {
    const container = document.getElementById(containerId);
    if (!container) return;

    container.innerHTML = "";
    for (let i = 0; i < count; i++) {
      container.appendChild(this.createLoadingCard());
    }
  }
}

// Global function for handling add to cart clicks
function handleAddToCart(event) {
  event.preventDefault();
  event.stopPropagation();

  const button = event.currentTarget;
  const productId = button.dataset.productId;
  const productData = button.dataset.product;

  if (!productId || !productData) {
    console.error("Product data not found");
    return;
  }

  try {
    const product = JSON.parse(productData);

    // Check if CartManager is available (from header.js)
    if (window.CartManager) {
      const success = window.CartManager.addToCart(product);
      if (success) {
        updateAddToCartButton(button, true);
        showCartNotification(product.name);
      }
    } else if (window.addToCart) {
      // Fallback to global addToCart function
      const success = window.addToCart(product);
      if (success) {
        updateAddToCartButton(button, true);
        showCartNotification(product.name);
      }
    } else {
      console.error("Cart functionality not available");
    }
  } catch (error) {
    console.error("Error adding to cart:", error);
  }
}

function updateAddToCartButton(button, isAdded) {
  if (isAdded) {
    button.classList.add("added");
    button.querySelector(".btn-text").textContent = "Added to Cart";
  } else {
    button.classList.remove("added");
    button.querySelector(".btn-text").textContent = "Add to Cart";
  }
}

function showCartNotification(productName) {
  // Simple notification - can be enhanced with a proper notification system
  const notification = document.createElement("div");
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: #10b981;
    color: white;
    padding: 1rem;
    border-radius: 0.5rem;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    z-index: 9999;
    max-width: 300px;
    font-size: 0.875rem;
    animation: slideIn 0.3s ease-out;
  `;

  notification.innerHTML = `
    <div style="display: flex; align-items: center; gap: 0.5rem;">
      <svg style="width: 1.25rem; height: 1.25rem; flex-shrink: 0;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <polyline points="20,6 9,17 4,12"></polyline>
      </svg>
      <span><strong>${productName}</strong> added to cart!</span>
    </div>
  `;

  // Add CSS for animation
  if (!document.getElementById("notification-styles")) {
    const style = document.createElement("style");
    style.id = "notification-styles";
    style.textContent = `
      @keyframes slideIn {
        from {
          transform: translateX(100%);
          opacity: 0;
        }
        to {
          transform: translateX(0);
          opacity: 1;
        }
      }
    `;
    document.head.appendChild(style);
  }

  document.body.appendChild(notification);

  // Remove notification after 3 seconds
  setTimeout(() => {
    notification.style.animation = "slideIn 0.3s ease-out reverse";
    setTimeout(() => {
      document.body.removeChild(notification);
    }, 300);
  }, 3000);
}

// Initialize product card renderer
let productCardRenderer;
document.addEventListener("DOMContentLoaded", () => {
  productCardRenderer = new ProductCardRenderer();
  window.ProductCardRenderer = productCardRenderer;
});

// Listen for cart updates to refresh button states
window.addEventListener("cartUpdated", () => {
  // Update all add to cart buttons
  document.querySelectorAll(".add-to-cart-btn").forEach((button) => {
    const productId = button.dataset.productId;
    if (productId) {
      const isInCart = productCardRenderer?.isInCart(productId) || false;
      updateAddToCartButton(button, isInCart);
    }
  });
});

// Export for module usage if needed
if (typeof module !== "undefined" && module.exports) {
  module.exports = { ProductCardRenderer };
}
