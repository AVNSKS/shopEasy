class ImageSearchSystem {
  constructor() {
    this.isModalOpen = false;
    this.isCameraOpen = false;
    this.currentImage = null;
    this.analysisResults = null;
    this.products = [];
    this.cameraStream = null;
    this.facingMode = "environment"; // back camera by default

    this.init();
    this.loadProducts();
  }

  init() {
    // Initialize after DOM is loaded
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", () =>
        this.setupEventListeners(),
      );
    } else {
      this.setupEventListeners();
    }
  }

  loadProducts() {
    // Load products from existing data
    if (typeof window.products !== "undefined") {
      this.products = window.products;
    } else if (typeof products !== "undefined") {
      this.products = products;
    } else {
      // Fallback products for demonstration
      this.products = [
        {
          id: 1,
          name: "Premium Sofa Set",
          category: "furniture",
          price: 25999,
          emoji: "🛋️",
          colors: ["brown", "beige"],
          keywords: ["sofa", "furniture", "living room"],
        },
        {
          id: 2,
          name: "Wireless Headphones",
          category: "electronics",
          price: 1999,
          emoji: "🎧",
          colors: ["black", "white"],
          keywords: ["headphones", "audio", "electronics"],
        },
        {
          id: 3,
          name: "Cotton Dress",
          category: "fashion",
          price: 1500,
          emoji: "👗",
          colors: ["blue", "white"],
          keywords: ["dress", "fashion", "clothing"],
        },
        {
          id: 4,
          name: "Running Shoes",
          category: "footwear",
          price: 2999,
          emoji: "👟",
          colors: ["black", "red"],
          keywords: ["shoes", "sports", "footwear"],
        },
        {
          id: 5,
          name: "Smartphone",
          category: "electronics",
          price: 15999,
          emoji: "📱",
          colors: ["black", "blue"],
          keywords: ["phone", "mobile", "electronics"],
        },
        {
          id: 6,
          name: "Dining Table",
          category: "furniture",
          price: 18999,
          emoji: "🪑",
          colors: ["brown", "wood"],
          keywords: ["table", "furniture", "dining"],
        },
      ];
    }
  }

  setupEventListeners() {
    // Filter button clicks
    document.addEventListener("click", (e) => {
      if (e.target.classList.contains("filter-btn")) {
        this.handleFilterClick(e.target);
      }
    });

    // Keyboard shortcuts
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        if (this.isCameraOpen) {
          this.closeCamera();
        } else if (this.isModalOpen) {
          this.closeModal();
        }
      }
    });
  }

  // Public API methods
  openModal() {
    const modal = document.getElementById("image-search-modal");
    if (modal) {
      modal.classList.add("active");
      this.isModalOpen = true;
      this.resetToUploadSection();
      this.trackEvent("image_search_opened");
    }
  }

  closeModal() {
    const modal = document.getElementById("image-search-modal");
    if (modal) {
      modal.classList.remove("active");
      this.isModalOpen = false;
      this.resetState();
      this.trackEvent("image_search_closed");
    }
  }

  triggerFileInput() {
    const input = document.getElementById("image-input");
    if (input) {
      input.click();
    }
  }

  handleFileSelect(event) {
    const file = event.target.files[0];
    if (file && this.validateFile(file)) {
      this.processImageFile(file);
    }
  }

  handleDrop(event) {
    event.preventDefault();
    const dropZone = document.getElementById("drop-zone");
    dropZone.classList.remove("drag-over");

    const files = event.dataTransfer.files;
    if (files.length > 0 && this.validateFile(files[0])) {
      this.processImageFile(files[0]);
    }
  }

  handleDragOver(event) {
    event.preventDefault();
    const dropZone = document.getElementById("drop-zone");
    dropZone.classList.add("drag-over");
  }

  handleDragLeave(event) {
    const dropZone = document.getElementById("drop-zone");
    dropZone.classList.remove("drag-over");
  }

  openCamera() {
    const cameraModal = document.getElementById("camera-modal");
    if (cameraModal) {
      cameraModal.classList.add("active");
      this.isCameraOpen = true;
      this.startCamera();
    }
  }

  closeCamera() {
    const cameraModal = document.getElementById("camera-modal");
    if (cameraModal) {
      cameraModal.classList.remove("active");
      this.isCameraOpen = false;
      this.stopCamera();
    }
  }

  async startCamera() {
    try {
      const video = document.getElementById("camera-video");
      const constraints = {
        video: {
          facingMode: this.facingMode,
          width: { ideal: 640 },
          height: { ideal: 480 },
        },
      };

      this.cameraStream =
        await navigator.mediaDevices.getUserMedia(constraints);
      video.srcObject = this.cameraStream;
    } catch (error) {
      console.error("Camera access error:", error);
      this.showError("Unable to access camera. Please check permissions.");
    }
  }

  stopCamera() {
    if (this.cameraStream) {
      this.cameraStream.getTracks().forEach((track) => track.stop());
      this.cameraStream = null;
    }
  }

  switchCamera() {
    this.facingMode =
      this.facingMode === "environment" ? "user" : "environment";
    this.stopCamera();
    this.startCamera();
  }

  capturePhoto() {
    const video = document.getElementById("camera-video");
    const canvas = document.getElementById("camera-canvas");
    const ctx = canvas.getContext("2d");

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    ctx.drawImage(video, 0, 0);

    canvas.toBlob(
      (blob) => {
        this.closeCamera();
        this.processImageFile(blob);
      },
      "image/jpeg",
      0.8,
    );
  }

  loadExample(type) {
    // Simulate loading an example image
    this.showAnalysisSection();
    this.simulateAnalysis();

    // Set example data
    const exampleData = {
      sofa: {
        category: "furniture",
        colors: ["brown", "beige"],
        keywords: ["sofa", "furniture"],
      },
      phone: {
        category: "electronics",
        colors: ["black", "blue"],
        keywords: ["phone", "mobile"],
      },
      dress: {
        category: "fashion",
        colors: ["blue", "white"],
        keywords: ["dress", "clothing"],
      },
      shoes: {
        category: "footwear",
        colors: ["black", "red"],
        keywords: ["shoes", "sports"],
      },
    };

    setTimeout(() => {
      this.analysisResults = exampleData[type] || exampleData.sofa;
      this.showResults();
    }, 3000);

    this.trackEvent("example_loaded", { type });
  }

  removeImage() {
    this.resetToUploadSection();
    this.currentImage = null;
  }

  searchNew() {
    this.resetToUploadSection();
  }

  viewAllResults() {
    this.closeModal();
    window.location.href = "products.html";
  }

  retry() {
    this.resetToUploadSection();
  }

  // Private methods
  validateFile(file) {
    const maxSize = 10 * 1024 * 1024; // 10MB
    const validTypes = ["image/jpeg", "image/png", "image/webp"];

    if (!validTypes.includes(file.type)) {
      this.showError("Please upload a valid image file (JPG, PNG, or WebP).");
      return false;
    }

    if (file.size > maxSize) {
      this.showError("File size must be less than 10MB.");
      return false;
    }

    return true;
  }

  processImageFile(file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      this.currentImage = e.target.result;
      this.showAnalysisSection();
      this.simulateAnalysis();
    };
    reader.readAsDataURL(file);
  }

  showAnalysisSection() {
    this.hideAllSections();
    const analysisSection = document.getElementById("analysis-section");
    const previewImage = document.getElementById("preview-image");

    if (analysisSection) {
      analysisSection.style.display = "block";
    }

    if (previewImage && this.currentImage) {
      previewImage.src = this.currentImage;
    }
  }

  simulateAnalysis() {
    const steps = ["step-1", "step-2", "step-3"];
    const progressFill = document.getElementById("progress-fill");
    let currentStep = 0;

    const interval = setInterval(() => {
      // Update progress bar
      const progress = ((currentStep + 1) / steps.length) * 100;
      if (progressFill) {
        progressFill.style.width = `${progress}%`;
      }

      // Update step status
      if (currentStep > 0) {
        const prevStep = document.getElementById(steps[currentStep - 1]);
        if (prevStep) {
          prevStep.classList.remove("active");
          prevStep.classList.add("completed");
        }
      }

      if (currentStep < steps.length) {
        const step = document.getElementById(steps[currentStep]);
        if (step) {
          step.classList.add("active");
        }
      }

      currentStep++;

      if (currentStep > steps.length) {
        clearInterval(interval);
        this.completeAnalysis();
      }
    }, 1000);
  }

  completeAnalysis() {
    // Simulate AI analysis results
    this.analysisResults = this.generateAnalysisResults();
    setTimeout(() => {
      this.showResults();
    }, 500);
  }

  generateAnalysisResults() {
    // Mock AI analysis - in real implementation, this would call an AI service
    const categories = ["furniture", "electronics", "fashion", "footwear"];
    const colors = ["black", "white", "brown", "blue", "red", "green"];

    return {
      category: categories[Math.floor(Math.random() * categories.length)],
      colors: [
        colors[Math.floor(Math.random() * colors.length)],
        colors[Math.floor(Math.random() * colors.length)],
      ],
      keywords: ["product", "item", "quality"],
      confidence: 0.7 + Math.random() * 0.3, // 70-100% confidence
    };
  }

  showResults() {
    this.hideAllSections();
    const resultsSection = document.getElementById("results-section");
    if (resultsSection) {
      resultsSection.style.display = "block";
    }

    const matchingProducts = this.findMatchingProducts();
    this.displayResults(matchingProducts);
  }

  findMatchingProducts() {
    if (!this.analysisResults) return [];

    const { category, colors, keywords, confidence } = this.analysisResults;
    const matches = [];

    this.products.forEach((product) => {
      let score = 0;
      let reasons = [];

      // Category match (highest weight)
      if (product.category === category) {
        score += 50;
        reasons.push("category");
      }

      // Color match
      if (product.colors && colors) {
        const colorMatches = product.colors.filter((color) =>
          colors.some(
            (searchColor) =>
              searchColor.includes(color) || color.includes(searchColor),
          ),
        );
        if (colorMatches.length > 0) {
          score += 20 * colorMatches.length;
          reasons.push("color");
        }
      }

      // Keyword match
      if (product.keywords && keywords) {
        const keywordMatches = product.keywords.filter((keyword) =>
          keywords.some(
            (searchKeyword) =>
              keyword.toLowerCase().includes(searchKeyword.toLowerCase()) ||
              searchKeyword.toLowerCase().includes(keyword.toLowerCase()),
          ),
        );
        if (keywordMatches.length > 0) {
          score += 15 * keywordMatches.length;
          reasons.push("keywords");
        }
      }

      // Name similarity
      if (keywords) {
        keywords.forEach((keyword) => {
          if (product.name.toLowerCase().includes(keyword.toLowerCase())) {
            score += 10;
            reasons.push("name");
          }
        });
      }

      // Add some randomness for variety
      score += Math.random() * 10;

      if (score > 20) {
        // Minimum threshold
        matches.push({
          ...product,
          matchScore: Math.min(Math.round(score), 100),
          matchReasons: reasons,
          aiConfidence: confidence,
        });
      }
    });

    // Sort by match score and return top matches
    return matches.sort((a, b) => b.matchScore - a.matchScore).slice(0, 8); // Limit to 8 results
  }

  displayResults(products) {
    const resultsGrid = document.getElementById("results-grid");
    const resultsCount = document.getElementById("results-count");

    if (resultsCount) {
      resultsCount.textContent = `Found ${products.length} matching products`;
    }

    if (resultsGrid) {
      resultsGrid.innerHTML = products
        .map((product) => this.createResultCard(product))
        .join("");
    }

    this.trackEvent("results_displayed", { count: products.length });
  }

  createResultCard(product) {
    const matchLevel =
      product.matchScore >= 80
        ? "high"
        : product.matchScore >= 60
          ? "medium"
          : "low";

    return `
      <div class="result-item" onclick="imageSearch.openProduct(${product.id})" data-match="${matchLevel}">
        <div class="result-image">
          ${product.emoji || "📦"}
          <div class="match-score ${matchLevel}">${product.matchScore}%</div>
        </div>
        <div class="result-info">
          <h4 class="result-name">${product.name}</h4>
          <p class="result-price">₹${product.price.toLocaleString()}</p>
          <p class="result-category">${product.category}</p>
        </div>
      </div>
    `;
  }

  handleFilterClick(button) {
    // Remove active class from all filter buttons
    document.querySelectorAll(".filter-btn").forEach((btn) => {
      btn.classList.remove("active");
    });

    // Add active class to clicked button
    button.classList.add("active");

    // Filter results
    const filter = button.dataset.filter;
    const resultItems = document.querySelectorAll(".result-item");

    resultItems.forEach((item) => {
      const matchLevel = item.dataset.match;
      let show = false;

      switch (filter) {
        case "all":
          show = true;
          break;
        case "high":
          show = matchLevel === "high";
          break;
        case "medium":
          show = matchLevel === "medium" || matchLevel === "high";
          break;
        default:
          show = true;
      }

      item.style.display = show ? "block" : "none";
    });

    this.trackEvent("results_filtered", { filter });
  }

  openProduct(productId) {
    this.trackEvent("product_opened_from_image_search", { productId });
    this.closeModal();
    window.location.href = `product-detail.html?id=${productId}`;
  }

  showError(message) {
    this.hideAllSections();
    const errorSection = document.getElementById("error-section");
    const errorMessage = document.getElementById("error-message");

    if (errorSection) {
      errorSection.style.display = "block";
    }

    if (errorMessage) {
      errorMessage.textContent = message;
    }

    this.trackEvent("error_shown", { message });
  }

  hideAllSections() {
    const sections = [
      "upload-section",
      "analysis-section",
      "results-section",
      "error-section",
    ];

    sections.forEach((sectionId) => {
      const section = document.getElementById(sectionId);
      if (section) {
        section.style.display = "none";
      }
    });
  }

  resetToUploadSection() {
    this.hideAllSections();
    const uploadSection = document.getElementById("upload-section");
    if (uploadSection) {
      uploadSection.style.display = "block";
    }

    // Reset file input
    const input = document.getElementById("image-input");
    if (input) {
      input.value = "";
    }

    // Reset progress
    const progressFill = document.getElementById("progress-fill");
    if (progressFill) {
      progressFill.style.width = "0%";
    }

    // Reset steps
    document.querySelectorAll(".step").forEach((step) => {
      step.classList.remove("active", "completed");
    });
  }

  resetState() {
    this.currentImage = null;
    this.analysisResults = null;
    this.stopCamera();
    this.resetToUploadSection();
  }

  trackEvent(eventName, data = {}) {
    // Analytics tracking
    console.log(`Image Search Event: ${eventName}`, data);

    // Can be integrated with Google Analytics, etc.
    if (typeof gtag !== "undefined") {
      gtag("event", eventName, {
        event_category: "Image Search",
        ...data,
      });
    }
  }
}

// Initialize image search when DOM is loaded
document.addEventListener("DOMContentLoaded", function () {
  window.imageSearch = new ImageSearchSystem();

  // Load the image search component
  fetch("components/image-search.html")
    .then((response) => response.text())
    .then((html) => {
      // Create container if it doesn't exist
      let container = document.getElementById("image-search-component");
      if (!container) {
        container = document.createElement("div");
        container.id = "image-search-component";
        document.body.appendChild(container);
      }
      container.innerHTML = html;
    })
    .catch((error) => {
      console.error("Failed to load image search component:", error);
    });
});

// Global reference for backwards compatibility
if (typeof window !== "undefined") {
  window.imageSearch = window.imageSearch || {};
}
