// AR Integration - Add AR functionality to existing product system

class ARIntegration {
  constructor() {
    this.init();
  }

  init() {
    this.addARButtonsToProductCards();
    this.setupARButtonEvents();
    this.checkARSupport();
  }

  checkARSupport() {
    // Check if device supports AR
    this.isARSupported = this.detectARSupport();

    if (!this.isARSupported) {
      console.warn("AR not supported on this device");
      this.hideARButtons();
    }
  }

  detectARSupport() {
    // Check for required APIs
    const hasCamera = !!(
      navigator.mediaDevices && navigator.mediaDevices.getUserMedia
    );
    const hasWebGL = this.detectWebGL();
    const hasDeviceOrientation = !!(
      window.DeviceOrientationEvent || window.DeviceMotionEvent
    );

    return hasCamera && hasWebGL;
  }

  detectWebGL() {
    try {
      const canvas = document.createElement("canvas");
      const gl =
        canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
      return !!gl;
    } catch (e) {
      return false;
    }
  }

  addARButtonsToProductCards() {
    // Find all existing product cards
    const productCards = document.querySelectorAll(".product-card");

    productCards.forEach((card) => {
      this.addARButtonToCard(card);
    });

    // Also observe for new product cards added dynamically
    this.observeForNewProductCards();
  }

  addARButtonToCard(card) {
    // Check if AR button already exists
    if (card.querySelector(".ar-view-btn")) return;

    // Get product data from the card
    const productData = this.extractProductDataFromCard(card);
    if (!productData) return;

    // Check if product is suitable for AR (3D visualization)
    if (!this.isProductARSuitable(productData)) return;

    // Create AR button
    const arButton = this.createARButton(productData);

    // Find the best place to insert the AR button
    const actionButtons = card.querySelector(".product-actions");
    const addToCartBtn = card.querySelector(".btn-add-cart");

    if (actionButtons) {
      // Insert before add to cart button
      actionButtons.insertBefore(arButton, addToCartBtn);
    } else if (addToCartBtn) {
      // Insert before add to cart button
      addToCartBtn.parentNode.insertBefore(arButton, addToCartBtn);
    } else {
      // Add to the end of the card content
      const cardContent = card.querySelector(".product-card-content");
      if (cardContent) {
        cardContent.appendChild(arButton);
      }
    }
  }

  extractProductDataFromCard(card) {
    try {
      // Try to get product data from data attributes
      const productBtn = card.querySelector("[data-product]");
      if (productBtn && productBtn.dataset.product) {
        return JSON.parse(productBtn.dataset.product);
      }

      // Try to get product ID and look it up
      const productId = this.extractProductIdFromCard(card);
      if (productId && window.ProductManager) {
        return window.ProductManager.getProductById(productId);
      }

      // Try to extract from card elements
      return this.extractProductDataFromElements(card);
    } catch (error) {
      console.error("Error extracting product data:", error);
      return null;
    }
  }

  extractProductIdFromCard(card) {
    // Try to get product ID from various sources
    const link = card.querySelector("a[href*='/product/']");
    if (link) {
      const href = link.getAttribute("href");
      const matches = href.match(/\/product\/([^/?]+)/);
      return matches ? matches[1] : null;
    }

    // Try data attributes
    const dataId = card.dataset.productId || card.dataset.id;
    if (dataId) return dataId;

    // Try button data
    const button = card.querySelector("[data-product-id]");
    if (button) return button.dataset.productId;

    return null;
  }

  extractProductDataFromElements(card) {
    // Extract product data from card elements
    const name = card
      .querySelector(".product-title, .product-name")
      ?.textContent?.trim();
    const priceText = card
      .querySelector(".product-price, .current-price")
      ?.textContent?.trim();
    const image = card.querySelector("img")?.src;
    const category = this.inferCategoryFromCard(card);

    if (!name || !priceText) return null;

    // Parse price
    const price = this.parsePrice(priceText);

    return {
      id: `extracted_${Date.now()}`,
      name,
      price,
      image,
      category,
      inStock: true,
    };
  }

  parsePrice(priceText) {
    // Extract numeric price from text like "₹1,999"
    const matches = priceText.match(/[\d,]+/);
    if (matches) {
      return parseInt(matches[0].replace(/,/g, ""));
    }
    return 0;
  }

  inferCategoryFromCard(card) {
    // Try to infer category from card content or page context
    const name =
      card
        .querySelector(".product-title, .product-name")
        ?.textContent?.toLowerCase() || "";

    if (
      name.includes("sofa") ||
      name.includes("chair") ||
      name.includes("table") ||
      name.includes("furniture")
    ) {
      return "Home & Kitchen";
    } else if (
      name.includes("phone") ||
      name.includes("laptop") ||
      name.includes("tv") ||
      name.includes("electronics")
    ) {
      return "Electronics";
    } else if (
      name.includes("shirt") ||
      name.includes("dress") ||
      name.includes("shoe") ||
      name.includes("fashion")
    ) {
      return "Fashion";
    }

    // Default category
    return "General";
  }

  isProductARSuitable(product) {
    if (!product) return false;

    const category = product.category?.toLowerCase() || "";
    const name = product.name?.toLowerCase() || "";

    // Categories that work well with AR
    const arSuitableCategories = [
      "home & kitchen",
      "furniture",
      "home",
      "electronics",
      "fashion",
      "toys & games",
      "toys",
      "games",
      "sports & fitness",
      "sports",
      "fitness",
    ];

    // Check if category is AR suitable
    const categoryMatch = arSuitableCategories.some((cat) =>
      category.includes(cat),
    );

    // Check if product name suggests 3D visualization would be useful
    const arSuitableProducts = [
      "sofa",
      "chair",
      "table",
      "bed",
      "desk",
      "shelf",
      "tv",
      "laptop",
      "phone",
      "speaker",
      "headphone",
      "shoe",
      "bag",
      "watch",
      "furniture",
      "appliance",
    ];

    const nameMatch = arSuitableProducts.some((product) =>
      name.includes(product),
    );

    return categoryMatch || nameMatch;
  }

  createARButton(productData) {
    const button = document.createElement("button");
    button.className = "ar-view-btn btn btn-secondary btn-sm";
    button.innerHTML = `
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width: 1rem; height: 1rem; margin-right: 0.25rem;">
        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
        <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
      </svg>
      AR View
    `;

    // Add click handler
    button.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();
      this.openARViewer(productData);
    });

    // Add hover effect
    button.style.transition = "all 0.2s";
    button.addEventListener("mouseenter", () => {
      button.style.transform = "scale(1.05)";
    });
    button.addEventListener("mouseleave", () => {
      button.style.transform = "scale(1)";
    });

    return button;
  }

  openARViewer(productData) {
    if (!window.ARViewer) {
      console.error("AR Viewer not available");
      this.showARNotAvailable();
      return;
    }

    // Load AR Viewer
    this.loadARViewer(() => {
      ARViewer.open(productData);
    });
  }

  loadARViewer(callback) {
    // Check if AR Viewer HTML is loaded
    if (!document.getElementById("ar-viewer-modal")) {
      this.loadARViewerHTML(callback);
    } else {
      callback();
    }
  }

  loadARViewerHTML(callback) {
    // Create a temporary container
    const tempContainer = document.createElement("div");

    // Load AR Viewer HTML
    fetch("components/ar-viewer.html")
      .then((response) => response.text())
      .then((html) => {
        // Extract the body content (everything between <body> tags)
        const bodyMatch = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
        const bodyContent = bodyMatch ? bodyMatch[1] : html;

        tempContainer.innerHTML = bodyContent;

        // Move elements to document body
        while (tempContainer.firstChild) {
          document.body.appendChild(tempContainer.firstChild);
        }

        // Load AR Viewer CSS if not already loaded
        this.loadARViewerCSS();

        // Initialize AR Viewer
        if (callback) callback();
      })
      .catch((error) => {
        console.error("Error loading AR Viewer:", error);
        this.showARNotAvailable();
      });
  }

  loadARViewerCSS() {
    // Check if AR CSS is already loaded
    if (document.querySelector('link[href*="ar-viewer.css"]')) return;

    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "styles/ar-viewer.css";
    document.head.appendChild(link);
  }

  showARNotAvailable() {
    if (window.app && window.app.showToast) {
      window.app.showToast(
        "AR feature is not available on this device",
        "warning",
      );
    } else {
      alert("AR feature is not available on this device");
    }
  }

  hideARButtons() {
    const arButtons = document.querySelectorAll(".ar-view-btn");
    arButtons.forEach((btn) => {
      btn.style.display = "none";
    });
  }

  setupARButtonEvents() {
    // Listen for new product cards being added
    document.addEventListener("click", (event) => {
      if (event.target.closest(".ar-view-btn")) {
        // Handle AR button clicks
        event.preventDefault();
        event.stopPropagation();
      }
    });
  }

  observeForNewProductCards() {
    // Use MutationObserver to watch for new product cards
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (node.nodeType === Node.ELEMENT_NODE) {
            // Check if the added node is a product card
            if (node.classList && node.classList.contains("product-card")) {
              this.addARButtonToCard(node);
            }

            // Check for product cards within the added node
            const productCards = node.querySelectorAll
              ? node.querySelectorAll(".product-card")
              : [];
            productCards.forEach((card) => {
              this.addARButtonToCard(card);
            });
          }
        });
      });
    });

    // Start observing
    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });
  }

  // Method to manually add AR buttons to specific containers
  static addARToContainer(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const integration = new ARIntegration();
    const productCards = container.querySelectorAll(".product-card");
    productCards.forEach((card) => {
      integration.addARButtonToCard(card);
    });
  }

  // Method to add AR button to a specific product card
  static addARToProductCard(cardElement, productData) {
    const integration = new ARIntegration();
    if (productData) {
      // Store product data in the card for extraction
      cardElement.dataset.arProductData = JSON.stringify(productData);
    }
    integration.addARButtonToCard(cardElement);
  }
}

// CSS for AR buttons (inject into page)
const arButtonStyles = `
<style>
.ar-view-btn {
  background: linear-gradient(135deg, #667eea, #764ba2) !important;
  color: white !important;
  border: none !important;
  font-size: 0.8rem !important;
  padding: 0.5rem 0.75rem !important;
  display: inline-flex !important;
  align-items: center !important;
  gap: 0.25rem !important;
  border-radius: 0.375rem !important;
  cursor: pointer !important;
  transition: all 0.2s ease !important;
  margin-right: 0.5rem !important;
}

.ar-view-btn:hover {
  background: linear-gradient(135deg, #5a6fd8, #6b42b5) !important;
  transform: translateY(-1px) !important;
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4) !important;
}

.ar-view-btn:active {
  transform: translateY(0) !important;
}

.ar-view-btn svg {
  width: 1rem !important;
  height: 1rem !important;
  stroke: currentColor !important;
}

@media (max-width: 768px) {
  .ar-view-btn {
    font-size: 0.75rem !important;
    padding: 0.4rem 0.6rem !important;
  }
}
</style>
`;

// Inject AR button styles
document.head.insertAdjacentHTML("beforeend", arButtonStyles);

// Initialize AR Integration when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  // Small delay to ensure other components are loaded
  setTimeout(() => {
    new ARIntegration();
  }, 500);
});

// Listen for product cards being rendered
document.addEventListener("productsRendered", () => {
  setTimeout(() => {
    new ARIntegration();
  }, 100);
});

// Make ARIntegration globally available
window.ARIntegration = ARIntegration;

// Export for module usage if needed
if (typeof module !== "undefined" && module.exports) {
  module.exports = ARIntegration;
}
