// Router - Replacing React Router with vanilla JavaScript

class SimpleRouter {
  constructor() {
    this.routes = new Map();
    this.currentRoute = null;
    this.init();
  }

  init() {
    // Listen for browser navigation
    window.addEventListener("popstate", () => this.handleRouteChange());

    // Handle initial load
    this.handleRouteChange();
  }

  // Register a route
  addRoute(path, handler) {
    this.routes.set(path, handler);
  }

  // Navigate to a route
  navigateTo(path, pushState = true) {
    if (pushState) {
      history.pushState(null, "", path);
    }
    this.handleRouteChange();
  }

  // Get current path
  getCurrentPath() {
    return window.location.pathname + window.location.search;
  }

  // Parse URL parameters
  getUrlParams() {
    const urlParams = new URLSearchParams(window.location.search);
    const params = {};
    for (const [key, value] of urlParams) {
      params[key] = value;
    }
    return params;
  }

  // Handle route changes
  handleRouteChange() {
    const path = this.getCurrentPath();
    const basePath = window.location.pathname;

    // Find matching route
    let handler = this.routes.get(basePath);

    // If no exact match, try to find a pattern match
    if (!handler) {
      for (const [routePath, routeHandler] of this.routes) {
        if (this.matchRoute(routePath, basePath)) {
          handler = routeHandler;
          break;
        }
      }
    }

    // If still no handler, use default (404)
    if (!handler) {
      handler = this.routes.get("*") || this.default404Handler;
    }

    this.currentRoute = basePath;

    // Execute the handler
    if (typeof handler === "function") {
      handler(this.getUrlParams());
    }
  }

  // Simple route pattern matching
  matchRoute(pattern, path) {
    // Convert pattern like "/product/:id" to regex
    const regexPattern = pattern
      .replace(/:\w+/g, "([^/]+)")
      .replace(/\*/g, ".*");

    const regex = new RegExp(`^${regexPattern}$`);
    return regex.test(path);
  }

  // Extract parameters from URL
  extractParams(pattern, path) {
    const patternParts = pattern.split("/");
    const pathParts = path.split("/");
    const params = {};

    for (let i = 0; i < patternParts.length; i++) {
      const patternPart = patternParts[i];
      if (patternPart.startsWith(":")) {
        const paramName = patternPart.slice(1);
        params[paramName] = pathParts[i];
      }
    }

    return params;
  }

  // Default 404 handler
  default404Handler() {
    const mainContent = document.getElementById("main-content");
    if (mainContent) {
      mainContent.innerHTML = `
        <div class="page-section" style="text-align: center; padding: 4rem 0;">
          <div class="container">
            <h1 style="font-size: 4rem; margin-bottom: 1rem; color: var(--muted-foreground);">404</h1>
            <h2 style="font-size: 1.5rem; margin-bottom: 1rem;">Page Not Found</h2>
            <p style="margin-bottom: 2rem; color: var(--muted-foreground);">
              The page you're looking for doesn't exist.
            </p>
            <button class="btn btn-primary" onclick="router.navigateTo('/')">
              Go Home
            </button>
          </div>
        </div>
      `;
    }
  }
}

// Page handlers
class PageHandlers {
  static homePage(params = {}) {
    const mainContent = document.getElementById("main-content");
    if (!mainContent) return;

    mainContent.innerHTML = `
      <!-- Hero Section -->
      <section class="page-section hero">
        <div class="container">
          <h1>Welcome to ShopEasy</h1>
          <p>Your one-stop destination for all daily essentials at the best prices</p>
          <button class="btn btn-primary btn-lg" onclick="router.navigateTo('/products')">
            Start Shopping
          </button>
        </div>
      </section>

      <!-- Categories Section -->
      <section class="page-section">
        <div class="container">
          <h2 style="text-align: center; margin-bottom: 2rem; font-size: 2rem;">Shop by Category</h2>
          <div id="categories-container" class="categories-grid">
            <!-- Categories will be loaded here -->
          </div>
        </div>
      </section>

      <!-- Featured Products -->
      <section class="page-section">
        <div class="container">
          <h2 style="text-align: center; margin-bottom: 2rem; font-size: 2rem;">Featured Products</h2>
          <div id="featured-products" class="products-grid">
            <!-- Featured products will be loaded here -->
          </div>
        </div>
      </section>
    `;

    // Load categories and products
    PageHandlers.loadCategories();
    PageHandlers.loadFeaturedProducts();
  }

  static productsPage(params = {}) {
    const mainContent = document.getElementById("main-content");
    if (!mainContent) return;

    const { search, category } = params;

    mainContent.innerHTML = `
      <!-- Filters Section -->
      <section class="filters-section">
        <div class="container">
          <div class="filters-container">
            <select id="category-filter" class="filter-select" onchange="PageHandlers.handleFilterChange()">
              <option value="">All Categories</option>
            </select>
            <select id="sort-filter" class="filter-select" onchange="PageHandlers.handleFilterChange()">
              <option value="popular">Most Popular</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
            <input 
              type="text" 
              id="search-filter" 
              class="form-input" 
              placeholder="Search products..." 
              value="${search || ""}"
              oninput="PageHandlers.handleSearchChange()"
              style="max-width: 300px;"
            />
          </div>
        </div>
      </section>

      <!-- Products Section -->
      <section class="page-section">
        <div class="container">
          <h2 id="products-title" style="margin-bottom: 2rem; font-size: 1.5rem;">
            ${category ? `${category} Products` : search ? `Search Results for "${search}"` : "All Products"}
          </h2>
          <div id="products-container" class="products-grid">
            <!-- Products will be loaded here -->
          </div>
          <div id="no-products" class="hidden" style="text-align: center; padding: 2rem;">
            <p>No products found. Try adjusting your filters.</p>
          </div>
        </div>
      </section>
    `;

    // Load filter options
    PageHandlers.loadFilterOptions();

    // Load products based on parameters
    PageHandlers.loadProducts({ search, category });
  }

  static productDetailPage(params = {}) {
    const productId = window.location.pathname.split("/").pop();
    const product = window.ProductManager
      ? window.ProductManager.getProductById(productId)
      : null;

    const mainContent = document.getElementById("main-content");
    if (!mainContent) return;

    if (!product) {
      mainContent.innerHTML = `
        <div class="page-section" style="text-align: center;">
          <div class="container">
            <h1>Product Not Found</h1>
            <p>The product you're looking for doesn't exist.</p>
            <button class="btn btn-primary" onclick="router.navigateTo('/products')">
              Back to Products
            </button>
          </div>
        </div>
      `;
      return;
    }

    mainContent.innerHTML = `
      <section class="page-section">
        <div class="container">
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 3rem; margin-bottom: 3rem;">
            <!-- Product Image -->
            <div>
              <img 
                src="${product.image}" 
                alt="${product.name}"
                style="width: 100%; height: 400px; object-fit: cover; border-radius: var(--radius);"
              />
            </div>

            <!-- Product Details -->
            <div>
              <h1 style="font-size: 2rem; margin-bottom: 1rem;">${product.name}</h1>
              
              <div style="display: flex; align-items: center; gap: 1rem; margin-bottom: 1rem;">
                <span style="font-size: 2rem; font-weight: bold; color: var(--primary);">
                  ₹${product.price.toLocaleString()}
                </span>
                ${
                  product.originalPrice
                    ? `
                  <span style="font-size: 1.2rem; color: var(--muted-foreground); text-decoration: line-through;">
                    ₹${product.originalPrice.toLocaleString()}
                  </span>
                  <span class="badge badge-destructive">${product.discount}% OFF</span>
                `
                    : ""
                }
              </div>

              <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 1rem;">
                <span style="color: #fbbf24;">⭐</span>
                <span style="font-weight: 600;">${product.rating}</span>
                <span style="color: var(--muted-foreground);">(${product.reviews.toLocaleString()} reviews)</span>
              </div>

              <p style="margin-bottom: 2rem; line-height: 1.6;">${product.description}</p>

              ${
                product.features
                  ? `
                <div style="margin-bottom: 2rem;">
                  <h3 style="margin-bottom: 1rem;">Features:</h3>
                  <ul style="list-style: none; padding: 0;">
                    ${product.features
                      .map(
                        (feature) => `
                      <li style="padding: 0.5rem 0; border-bottom: 1px solid var(--border);">
                        ✓ ${feature}
                      </li>
                    `,
                      )
                      .join("")}
                  </ul>
                </div>
              `
                  : ""
              }

              <div style="display: flex; gap: 1rem;">
                <button 
                  class="btn btn-primary btn-lg" 
                  onclick="handleAddToCart('${product.id}')"
                  ${!product.inStock ? "disabled" : ""}
                >
                  ${!product.inStock ? "Out of Stock" : "Add to Cart"}
                </button>
                <button class="btn btn-outline btn-lg" onclick="router.navigateTo('/products')">
                  Back to Products
                </button>
              </div>
            </div>
          </div>

          <!-- Related Products -->
          <div>
            <h2 style="margin-bottom: 2rem;">Related Products</h2>
            <div id="related-products" class="products-grid">
              <!-- Related products will be loaded here -->
            </div>
          </div>
        </div>
      </section>
    `;

    // Load related products
    PageHandlers.loadRelatedProducts(product.id, product.category);
  }

  static cartPage(params = {}) {
    const mainContent = document.getElementById("main-content");
    if (!mainContent) return;

    const cartItems = window.CartManager
      ? window.CartManager.getCartItems()
      : [];

    if (cartItems.length === 0) {
      mainContent.innerHTML = `
        <section class="page-section">
          <div class="container" style="text-align: center;">
            <h1 style="margin-bottom: 2rem;">Your Cart is Empty</h1>
            <p style="margin-bottom: 2rem; color: var(--muted-foreground);">
              Looks like you haven't added any items to your cart yet.
            </p>
            <button class="btn btn-primary btn-lg" onclick="router.navigateTo('/products')">
              Start Shopping
            </button>
          </div>
        </section>
      `;
      return;
    }

    const total = cartItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0,
    );

    mainContent.innerHTML = `
      <section class="page-section">
        <div class="container">
          <h1 style="margin-bottom: 2rem;">Shopping Cart</h1>
          
          <div style="display: grid; grid-template-columns: 2fr 1fr; gap: 3rem;">
            <!-- Cart Items -->
            <div>
              <div id="cart-items-container">
                ${cartItems
                  .map(
                    (item) => `
                  <div class="card" style="margin-bottom: 1rem;">
                    <div class="card-content" style="display: flex; align-items: center; gap: 1rem;">
                      <img 
                        src="${item.image}" 
                        alt="${item.name}"
                        style="width: 80px; height: 80px; object-fit: cover; border-radius: var(--radius);"
                      />
                      <div style="flex: 1;">
                        <h3 style="margin-bottom: 0.5rem;">${item.name}</h3>
                        <p style="color: var(--muted-foreground); margin-bottom: 0.5rem;">₹${item.price.toLocaleString()}</p>
                        <div style="display: flex; align-items: center; gap: 1rem;">
                          <div style="display: flex; align-items: center; gap: 0.5rem;">
                            <button class="btn btn-outline btn-sm" onclick="updateCartQuantity('${item.id}', ${item.quantity - 1})">-</button>
                            <span>${item.quantity}</span>
                            <button class="btn btn-outline btn-sm" onclick="updateCartQuantity('${item.id}', ${item.quantity + 1})">+</button>
                          </div>
                          <button class="btn btn-destructive btn-sm" onclick="removeFromCart('${item.id}')">Remove</button>
                        </div>
                      </div>
                      <div style="text-align: right;">
                        <p style="font-weight: bold;">₹${(item.price * item.quantity).toLocaleString()}</p>
                      </div>
                    </div>
                  </div>
                `,
                  )
                  .join("")}
              </div>
            </div>

            <!-- Cart Summary -->
            <div>
              <div class="card">
                <div class="card-header">
                  <h3 class="card-title">Order Summary</h3>
                </div>
                <div class="card-content">
                  <div style="display: flex; justify-content: space-between; margin-bottom: 1rem;">
                    <span>Subtotal:</span>
                    <span>₹${total.toLocaleString()}</span>
                  </div>
                  <div style="display: flex; justify-content: space-between; margin-bottom: 1rem;">
                    <span>Shipping:</span>
                    <span>${total >= 999 ? "Free" : "₹99"}</span>
                  </div>
                  <div style="border-top: 1px solid var(--border); padding-top: 1rem; margin-top: 1rem;">
                    <div style="display: flex; justify-content: space-between; font-weight: bold; font-size: 1.1rem;">
                      <span>Total:</span>
                      <span>₹${(total + (total >= 999 ? 0 : 99)).toLocaleString()}</span>
                    </div>
                  </div>
                </div>
                <div class="card-footer">
                  <button class="btn btn-primary" style="width: 100%;" onclick="proceedToCheckout()">
                    Proceed to Checkout
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    `;
  }

  // Helper methods
  static loadCategories() {
    const container = document.getElementById("categories-container");
    if (!container || !window.categoryInfo) return;

    const categories = Object.entries(window.categoryInfo);
    container.innerHTML = categories
      .map(
        ([key, category]) => `
      <div class="category-card" onclick="filterByCategory('${key}')">
        <img src="${category.image}" alt="${category.title}" />
        <h3>${category.title}</h3>
        <p>${category.description}</p>
      </div>
    `,
      )
      .join("");
  }

  static loadFeaturedProducts() {
    const container = document.getElementById("featured-products");
    if (!container || !window.ProductManager) return;

    const products = window.ProductManager.getTrendingProducts();
    PageHandlers.renderProducts(products, container);
  }

  static loadProducts({ search, category } = {}) {
    const container = document.getElementById("products-container");
    const noProductsEl = document.getElementById("no-products");
    if (!container || !window.ProductManager) return;

    let products = window.ProductManager.getAllProducts();

    // Apply filters
    if (category) {
      products = window.ProductManager.getProductsByCategory(category);
    }
    if (search) {
      products = window.ProductManager.searchProducts(search);
    }

    // Apply sorting
    const sortFilter = document.getElementById("sort-filter");
    if (sortFilter) {
      products = window.ProductManager.sortProducts(products, sortFilter.value);
    }

    if (products.length === 0) {
      container.classList.add("hidden");
      noProductsEl?.classList.remove("hidden");
    } else {
      container.classList.remove("hidden");
      noProductsEl?.classList.add("hidden");
      PageHandlers.renderProducts(products, container);
    }
  }

  static loadRelatedProducts(productId, category) {
    const container = document.getElementById("related-products");
    if (!container || !window.ProductManager) return;

    const products = window.ProductManager.getRelatedProducts(
      productId,
      category,
    );
    PageHandlers.renderProducts(products, container);
  }

  static loadFilterOptions() {
    const categoryFilter = document.getElementById("category-filter");
    if (!categoryFilter || !window.categories) return;

    categoryFilter.innerHTML =
      '<option value="">All Categories</option>' +
      window.categories
        .slice(1)
        .map((cat) => `<option value="${cat}">${cat}</option>`)
        .join("");
  }

  static renderProducts(products, container) {
    if (!window.ProductCardRenderer) {
      container.innerHTML = '<div class="loading-spinner"></div>';
      return;
    }

    container.innerHTML = "";
    products.forEach((product) => {
      const cardElement = window.ProductCardRenderer.createProductCard(product);
      if (cardElement) {
        container.appendChild(cardElement);
      }
    });
  }

  static handleFilterChange() {
    const params = router.getUrlParams();
    const categoryFilter = document.getElementById("category-filter");
    const sortFilter = document.getElementById("sort-filter");

    if (categoryFilter?.value) {
      params.category = categoryFilter.value;
    } else {
      delete params.category;
    }

    const newUrl =
      "/products" +
      (Object.keys(params).length
        ? "?" + new URLSearchParams(params).toString()
        : "");
    router.navigateTo(newUrl);
  }

  static handleSearchChange() {
    const searchFilter = document.getElementById("search-filter");
    const params = router.getUrlParams();

    if (searchFilter?.value.trim()) {
      params.search = searchFilter.value.trim();
    } else {
      delete params.search;
    }

    const newUrl =
      "/products" +
      (Object.keys(params).length
        ? "?" + new URLSearchParams(params).toString()
        : "");
    router.navigateTo(newUrl);
  }
}

// Initialize router
const router = new SimpleRouter();

// Register routes
router.addRoute("/", PageHandlers.homePage);
router.addRoute("/products", PageHandlers.productsPage);
router.addRoute("/product/*", PageHandlers.productDetailPage);
router.addRoute("/cart", PageHandlers.cartPage);

// Global navigation functions
function navigateTo(page) {
  const routes = {
    home: "/",
    products: "/products",
    cart: "/cart",
  };

  router.navigateTo(routes[page] || page);
}

function filterByCategory(category) {
  router.navigateTo(`/products?category=${encodeURIComponent(category)}`);
}

function showAllCategories() {
  router.navigateTo("/products");
}

// Global cart functions
function updateCartQuantity(productId, newQuantity) {
  if (newQuantity <= 0) {
    removeFromCart(productId);
    return;
  }

  if (window.CartManager) {
    const cartItems = window.CartManager.getCartItems();
    const item = cartItems.find((item) => item.id === productId);
    if (item) {
      item.quantity = newQuantity;
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
      window.dispatchEvent(new CustomEvent("cartUpdated"));
      router.handleRouteChange(); // Refresh the page
    }
  }
}

function removeFromCart(productId) {
  if (window.CartManager) {
    window.CartManager.removeFromCart(productId);
    router.handleRouteChange(); // Refresh the page
  }
}

function proceedToCheckout() {
  alert("Checkout functionality would be implemented here!");
}

// Make router globally available
window.router = router;
window.PageHandlers = PageHandlers;
