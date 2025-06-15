// Product Recommendation Engine
class RecommendationEngine {
  constructor() {
    this.browsingHistory = this.loadBrowsingHistory();
    this.userPreferences = this.loadUserPreferences();
    this.init();
  }

  init() {
    // Track page views automatically
    this.trackPageView();

    // Update recommendations every time the engine is initialized
    this.updateRecommendations();

    console.log("Recommendation Engine initialized");
  }

  // Load browsing history from localStorage
  loadBrowsingHistory() {
    try {
      const history = localStorage.getItem("shopeasy-browsing-history");
      return history ? JSON.parse(history) : [];
    } catch (error) {
      console.error("Error loading browsing history:", error);
      return [];
    }
  }

  // Load user preferences from localStorage
  loadUserPreferences() {
    try {
      const preferences = localStorage.getItem("shopeasy-user-preferences");
      return preferences
        ? JSON.parse(preferences)
        : {
            favoriteCategories: {},
            favoriteBrands: {},
            priceRange: { min: 0, max: 100000 },
            lastUpdated: Date.now(),
          };
    } catch (error) {
      console.error("Error loading user preferences:", error);
      return {
        favoriteCategories: {},
        favoriteBrands: {},
        priceRange: { min: 0, max: 100000 },
        lastUpdated: Date.now(),
      };
    }
  }

  // Save browsing history to localStorage
  saveBrowsingHistory() {
    try {
      localStorage.setItem(
        "shopeasy-browsing-history",
        JSON.stringify(this.browsingHistory),
      );
    } catch (error) {
      console.error("Error saving browsing history:", error);
    }
  }

  // Save user preferences to localStorage
  saveUserPreferences() {
    try {
      this.userPreferences.lastUpdated = Date.now();
      localStorage.setItem(
        "shopeasy-user-preferences",
        JSON.stringify(this.userPreferences),
      );
    } catch (error) {
      console.error("Error saving user preferences:", error);
    }
  }

  // Track when user views a product
  trackProductView(product) {
    if (!product || !product.id) return;

    const viewRecord = {
      productId: product.id,
      name: product.name,
      category: product.category,
      brand: product.brand,
      price: product.price,
      timestamp: Date.now(),
      url: window.location.href,
    };

    // Remove any existing record for this product
    this.browsingHistory = this.browsingHistory.filter(
      (item) => item.productId !== product.id,
    );

    // Add new record at the beginning
    this.browsingHistory.unshift(viewRecord);

    // Keep only last 50 items
    if (this.browsingHistory.length > 50) {
      this.browsingHistory = this.browsingHistory.slice(0, 50);
    }

    // Update user preferences
    this.updateUserPreferences(product);

    // Save to localStorage
    this.saveBrowsingHistory();
    this.saveUserPreferences();

    console.log("Product view tracked:", product.name);
  }

  // Track page views automatically
  trackPageView() {
    // Check if we're on a product detail page
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get("id");

    if (productId && window.products) {
      const product = window.products.find((p) => p.id === productId);
      if (product) {
        // Small delay to ensure page is loaded
        setTimeout(() => {
          this.trackProductView(product);
        }, 1000);
      }
    }
  }

  // Update user preferences based on product views
  updateUserPreferences(product) {
    // Update favorite categories
    if (product.category) {
      this.userPreferences.favoriteCategories[product.category] =
        (this.userPreferences.favoriteCategories[product.category] || 0) + 1;
    }

    // Update favorite brands
    if (product.brand) {
      this.userPreferences.favoriteBrands[product.brand] =
        (this.userPreferences.favoriteBrands[product.brand] || 0) + 1;
    }

    // Update price range preferences
    if (product.price) {
      const currentPrices = this.browsingHistory
        .filter((item) => item.price)
        .map((item) => item.price);

      if (currentPrices.length > 0) {
        this.userPreferences.priceRange.min = Math.min(...currentPrices);
        this.userPreferences.priceRange.max = Math.max(...currentPrices);
      }
    }
  }

  // Get personalized product recommendations
  getRecommendations(excludeProductId = null, maxResults = 6) {
    if (!window.products) return [];

    const recommendations = [];
    const availableProducts = window.products.filter(
      (p) => p.id !== excludeProductId,
    );

    // If no browsing history, return popular products
    if (this.browsingHistory.length === 0) {
      return this.getPopularProducts(maxResults);
    }

    // Get category-based recommendations
    const categoryRecs = this.getCategoryBasedRecommendations(
      availableProducts,
      maxResults / 2,
    );
    recommendations.push(...categoryRecs);

    // Get brand-based recommendations
    const brandRecs = this.getBrandBasedRecommendations(
      availableProducts,
      maxResults / 3,
    );
    recommendations.push(...brandRecs);

    // Get price-range recommendations
    const priceRecs = this.getPriceBasedRecommendations(
      availableProducts,
      maxResults / 3,
    );
    recommendations.push(...priceRecs);

    // Remove duplicates and limit results
    const uniqueRecs = recommendations.filter(
      (product, index, self) =>
        index === self.findIndex((p) => p.id === product.id),
    );

    // Score and sort recommendations
    const scoredRecs = uniqueRecs
      .map((product) => ({
        ...product,
        score: this.calculateRecommendationScore(product),
      }))
      .sort((a, b) => b.score - a.score);

    return scoredRecs.slice(0, maxResults);
  }

  // Get recommendations based on favorite categories
  getCategoryBasedRecommendations(products, maxResults) {
    const topCategories = Object.entries(
      this.userPreferences.favoriteCategories,
    )
      .sort(([, a], [, b]) => b - a)
      .slice(0, 3)
      .map(([category]) => category);

    if (topCategories.length === 0) return [];

    return products
      .filter((product) => topCategories.includes(product.category))
      .slice(0, maxResults);
  }

  // Get recommendations based on favorite brands
  getBrandBasedRecommendations(products, maxResults) {
    const topBrands = Object.entries(this.userPreferences.favoriteBrands)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 3)
      .map(([brand]) => brand);

    if (topBrands.length === 0) return [];

    return products
      .filter((product) => product.brand && topBrands.includes(product.brand))
      .slice(0, maxResults);
  }

  // Get recommendations based on price preferences
  getPriceBasedRecommendations(products, maxResults) {
    const { min, max } = this.userPreferences.priceRange;
    const priceBuffer = (max - min) * 0.2; // 20% buffer

    return products
      .filter(
        (product) =>
          product.price >= min - priceBuffer &&
          product.price <= max + priceBuffer,
      )
      .sort((a, b) => a.rating - b.rating) // Sort by rating
      .slice(0, maxResults);
  }

  // Calculate recommendation score for sorting
  calculateRecommendationScore(product) {
    let score = 0;

    // Category preference score
    const categoryScore =
      this.userPreferences.favoriteCategories[product.category] || 0;
    score += categoryScore * 3;

    // Brand preference score
    const brandScore = this.userPreferences.favoriteBrands[product.brand] || 0;
    score += brandScore * 2;

    // Price preference score (closer to user's range = higher score)
    const { min, max } = this.userPreferences.priceRange;
    const avgPrice = (min + max) / 2;
    const priceDiff = Math.abs(product.price - avgPrice);
    const maxPriceDiff = Math.max(avgPrice - min, max - avgPrice);
    const priceScore =
      maxPriceDiff > 0 ? (1 - priceDiff / maxPriceDiff) * 5 : 5;
    score += priceScore;

    // Product rating score
    score += product.rating || 0;

    // Discount score (discounted products get bonus)
    if (product.discount && product.discount > 0) {
      score += product.discount * 0.1;
    }

    // Recency boost for recently viewed categories
    const recentViews = this.browsingHistory.slice(0, 10);
    const recentCategories = recentViews.map((item) => item.category);
    if (recentCategories.includes(product.category)) {
      score += 5;
    }

    return score;
  }

  // Get popular products as fallback
  getPopularProducts(maxResults) {
    if (!window.products) return [];

    return window.products
      .sort((a, b) => {
        // Sort by rating and reviews
        const aScore = (a.rating || 0) * Math.log(a.reviews || 1);
        const bScore = (b.rating || 0) * Math.log(b.reviews || 1);
        return bScore - aScore;
      })
      .slice(0, maxResults);
  }

  // Get recently viewed products
  getRecentlyViewed(maxResults = 6) {
    return this.browsingHistory
      .slice(0, maxResults)
      .map((item) => window.products?.find((p) => p.id === item.productId))
      .filter(Boolean);
  }

  // Get recommendations for homepage
  getHomepageRecommendations() {
    const recommendations = {
      forYou: this.getRecommendations(null, 4),
      recentlyViewed: this.getRecentlyViewed(4),
      trending: this.getPopularProducts(4),
    };

    return recommendations;
  }

  // Get "You might also like" for product detail page
  getRelatedProducts(currentProductId, maxResults = 4) {
    if (!window.products) return [];

    const currentProduct = window.products.find(
      (p) => p.id === currentProductId,
    );
    if (!currentProduct) return [];

    // Get products from same category
    const sameCategoryProducts = window.products.filter(
      (p) =>
        p.id !== currentProductId && p.category === currentProduct.category,
    );

    // Get products from favorite brands in any category
    const favoriteBrandProducts = window.products.filter(
      (p) =>
        p.id !== currentProductId &&
        p.brand &&
        this.userPreferences.favoriteBrands[p.brand],
    );

    // Combine and score
    const combined = [...sameCategoryProducts, ...favoriteBrandProducts];
    const unique = combined.filter(
      (product, index, self) =>
        index === self.findIndex((p) => p.id === product.id),
    );

    const scored = unique
      .map((product) => ({
        ...product,
        score: this.calculateRecommendationScore(product),
      }))
      .sort((a, b) => b.score - a.score);

    return scored.slice(0, maxResults);
  }

  // Clear browsing history
  clearBrowsingHistory() {
    this.browsingHistory = [];
    this.userPreferences = {
      favoriteCategories: {},
      favoriteBrands: {},
      priceRange: { min: 0, max: 100000 },
      lastUpdated: Date.now(),
    };

    localStorage.removeItem("shopeasy-browsing-history");
    localStorage.removeItem("shopeasy-user-preferences");

    console.log("Browsing history cleared");
  }

  // Get user insights for analytics
  getUserInsights() {
    const topCategories = Object.entries(
      this.userPreferences.favoriteCategories,
    )
      .sort(([, a], [, b]) => b - a)
      .slice(0, 5);

    const topBrands = Object.entries(this.userPreferences.favoriteBrands)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 5);

    return {
      totalViews: this.browsingHistory.length,
      topCategories,
      topBrands,
      priceRange: this.userPreferences.priceRange,
      lastActivity: this.browsingHistory[0]?.timestamp || null,
    };
  }

  // Update recommendations whenever called
  updateRecommendations() {
    // Update homepage recommendations
    this.displayHomepageRecommendations();

    // Update product detail page recommendations if applicable
    this.displayProductPageRecommendations();
  }

  // Display recommendations on homepage
  displayHomepageRecommendations() {
    const recommendationsContainer = document.getElementById(
      "recommendationsSection",
    );
    if (!recommendationsContainer) return;

    const recommendations = this.getHomepageRecommendations();

    let html = "";

    // For You section
    if (recommendations.forYou.length > 0) {
      html += this.createRecommendationSection(
        "Just for You",
        "🎯",
        recommendations.forYou,
        "Based on your browsing history",
      );
    }

    // Recently Viewed section
    if (recommendations.recentlyViewed.length > 0) {
      html += this.createRecommendationSection(
        "Recently Viewed",
        "👀",
        recommendations.recentlyViewed,
        "Pick up where you left off",
      );
    }

    // Trending section (fallback)
    if (
      recommendations.forYou.length === 0 &&
      recommendations.recentlyViewed.length === 0
    ) {
      html += this.createRecommendationSection(
        "Trending Now",
        "🔥",
        recommendations.trending,
        "Popular products everyone is buying",
      );
    }

    recommendationsContainer.innerHTML = html;
  }

  // Display recommendations on product detail page
  displayProductPageRecommendations() {
    const productId = new URLSearchParams(window.location.search).get("id");
    if (!productId) return;

    const container = document.getElementById("productRecommendations");
    if (!container) return;

    const relatedProducts = this.getRelatedProducts(productId);
    if (relatedProducts.length === 0) return;

    const html = this.createRecommendationSection(
      "You might also like",
      "💡",
      relatedProducts,
      "Based on your preferences and this product",
    );

    container.innerHTML = html;
  }

  // Create HTML for recommendation section
  createRecommendationSection(title, emoji, products, subtitle) {
    if (products.length === 0) return "";

    return `
      <section class="recommendation-section" style="margin: 3rem 0; padding: 2rem 0;">
        <div class="container" style="max-width: 1200px; margin: 0 auto; padding: 0 1rem;">
          <div class="section-header" style="margin-bottom: 2rem;">
            <h2 style="
              font-size: 1.875rem; 
              font-weight: 700; 
              color: #111827;
              display: flex;
              align-items: center;
              gap: 0.75rem;
              margin-bottom: 0.5rem;
            ">
              <span style="font-size: 2rem;">${emoji}</span>
              ${title}
            </h2>
            <p style="color: #6b7280; font-size: 1rem;">${subtitle}</p>
          </div>
          <div class="products-grid" style="
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
            gap: 1.5rem;
          ">
            ${products.map((product) => this.createRecommendationProductCard(product)).join("")}
          </div>
        </div>
      </section>
    `;
  }

  // Create product card for recommendations
  createRecommendationProductCard(product) {
    const inCart = window.cart?.some((item) => item.id === product.id) || false;

    return `
      <div class="recommendation-product-card" style="
        background: white;
        border-radius: 0.75rem;
        overflow: hidden;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        transition: all 0.3s;
        cursor: pointer;
        height: 100%;
        display: flex;
        flex-direction: column;
      " onmouseover="this.style.transform='translateY(-4px)'; this.style.boxShadow='0 8px 25px rgba(0, 0, 0, 0.15)'" onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 1px 3px rgba(0, 0, 0, 0.1)'">
        <a href="product-detail.html?id=${product.id}" style="text-decoration: none; color: inherit; flex: 1; display: flex; flex-direction: column;">
          <div style="position: relative; height: 12rem; overflow: hidden;">
            <img src="${product.image}" alt="${product.name}" style="
              width: 100%;
              height: 100%;
              object-fit: cover;
              transition: transform 0.3s;
            " onmouseover="this.style.transform='scale(1.05)'" onmouseout="this.style.transform='scale(1)'">
            ${
              product.discount
                ? `
              <div style="
                position: absolute;
                top: 0.5rem;
                left: 0.5rem;
                background: #ef4444;
                color: white;
                padding: 0.25rem 0.5rem;
                border-radius: 0.25rem;
                font-size: 0.75rem;
                font-weight: 600;
              ">${product.discount}% OFF</div>
            `
                : ""
            }
            ${
              product.brand
                ? `
              <div style="
                position: absolute;
                top: 0.5rem;
                right: 0.5rem;
                background: rgba(255, 255, 255, 0.9);
                color: #374151;
                padding: 0.25rem 0.5rem;
                border-radius: 0.25rem;
                font-size: 0.75rem;
                font-weight: 500;
              ">${product.brand}</div>
            `
                : ""
            }
          </div>
          <div style="padding: 1rem; flex: 1; display: flex; flex-direction: column;">
            <h3 style="
              font-weight: 600;
              font-size: 0.875rem;
              margin-bottom: 0.5rem;
              display: -webkit-box;
              -webkit-line-clamp: 2;
              -webkit-box-orient: vertical;
              overflow: hidden;
              line-height: 1.4;
            ">${product.name}</h3>
            
            <div style="display: flex; align-items: center; gap: 0.25rem; margin-bottom: 0.5rem;">
              <div style="display: flex; align-items: center;">
                ${this.createStarRating(product.rating)}
                <span style="font-size: 0.875rem; font-weight: 500; margin-left: 0.25rem;">${product.rating}</span>
              </div>
              <span style="font-size: 0.75rem; color: #6b7280;">(${this.formatNumber(product.reviews)})</span>
            </div>
            
            <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 1rem;">
              <span style="font-size: 1.125rem; font-weight: 700; color: #111827;">
                ${this.formatPrice(product.price)}
              </span>
              ${
                product.originalPrice
                  ? `
                <span style="font-size: 0.875rem; color: #6b7280; text-decoration: line-through;">
                  ${this.formatPrice(product.originalPrice)}
                </span>
              `
                  : ""
              }
            </div>
            
            <div style="margin-top: auto;">
              <div class="product-card-actions" style="display: flex; gap: 0.5rem;">
                <button
                  onclick="event.preventDefault(); event.stopPropagation(); window.addToCart('${product.id}')"
                  ${!product.inStock || inCart ? "disabled" : ""}
                  style="
                    flex: 1;
                    background: ${inCart ? "#9ca3af" : "#f97316"};
                    color: white;
                    border: none;
                    padding: 0.75rem;
                    border-radius: 0.5rem;
                    font-weight: 500;
                    cursor: ${inCart ? "not-allowed" : "pointer"};
                    transition: background-color 0.2s;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 0.5rem;
                    font-size: 0.875rem;
                  "
                  onmouseover="if (!this.disabled) this.style.background='#ea580c'"
                  onmouseout="if (!this.disabled) this.style.background='#f97316'"
                >
                  <svg style="width: 1rem; height: 1rem;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="m9 22 3-3-3-3M3 3h.621a1 1 0 0 1 .958.713l1.42 4.982A1 1 0 0 0 6.957 9H19a1 1 0 0 1 .97 1.243l-2 8A1 1 0 0 1 17 19H6a1 1 0 0 1-.97-.757L2 2H1"/>
                    <circle cx="9" cy="22" r="1"/>
                    <circle cx="20" cy="22" r="1"/>
                  </svg>
                  ${inCart ? "Added" : "Add to Cart"}
                </button>
                <button
                  onclick="event.preventDefault(); event.stopPropagation(); window.arViewer && window.arViewer.open3DViewer(${JSON.stringify(product).replace(/"/g, "&quot;")})"
                  style="
                    background: linear-gradient(135deg, #8b5cf6, #7c3aed);
                    color: white;
                    border: none;
                    padding: 0.75rem;
                    border-radius: 0.5rem;
                    cursor: pointer;
                    transition: all 0.2s;
                    min-width: 2.5rem;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                  "
                  title="View in AR/3D"
                  onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 4px 8px rgba(139, 92, 246, 0.3)'"
                  onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='none'"
                >
                  <svg style="width: 1rem; height: 1rem;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/>
                    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </a>
      </div>
    `;
  }

  // Utility functions
  formatPrice(price) {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(price);
  }

  formatNumber(num) {
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + "k";
    }
    return num.toString();
  }

  createStarRating(rating) {
    let stars = "";
    for (let i = 1; i <= 5; i++) {
      if (i <= Math.floor(rating)) {
        stars +=
          '<svg style="width: 1rem; height: 1rem; color: #fbbf24; fill: currentColor;" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>';
      } else {
        stars +=
          '<svg style="width: 1rem; height: 1rem; color: #d1d5db;" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>';
      }
    }
    return stars;
  }
}

// Initialize recommendation engine when DOM is loaded
let recommendationEngine;
document.addEventListener("DOMContentLoaded", function () {
  recommendationEngine = new RecommendationEngine();
});

// Export for global use
window.recommendationEngine = recommendationEngine;
