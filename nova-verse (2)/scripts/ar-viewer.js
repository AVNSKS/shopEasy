// AR Viewer JavaScript - Complete AR/VR functionality

class ARViewer {
  constructor() {
    this.isInitialized = false;
    this.currentProduct = null;
    this.isARActive = false;
    this.scene = null;
    this.productModel = null;
    this.currentRotation = 0;
    this.currentScale = 1;
    this.currentHeight = 0.5;
    this.isMarkerless = false;

    // Bind methods
    this.init = this.init.bind(this);
    this.open = this.open.bind(this);
    this.close = this.close.bind(this);
  }

  init() {
    if (this.isInitialized) return;

    try {
      // Check for AR support
      this.checkARSupport();

      // Initialize AR scene components
      this.initializeARScene();

      // Setup event listeners
      this.setupEventListeners();

      this.isInitialized = true;
      console.log("AR Viewer initialized successfully");
    } catch (error) {
      console.error("Error initializing AR Viewer:", error);
      this.showError("AR functionality is not supported on this device");
    }
  }

  checkARSupport() {
    // Check for camera support
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      throw new Error("Camera access not supported");
    }

    // Check for WebGL support
    const canvas = document.createElement("canvas");
    const gl =
      canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
    if (!gl) {
      throw new Error("WebGL not supported");
    }

    // Check for device orientation (mobile)
    if (
      !window.DeviceOrientationEvent &&
      !window.DeviceMotionEvent &&
      /Mobi|Android/i.test(navigator.userAgent)
    ) {
      console.warn("Device orientation not supported");
    }
  }

  initializeARScene() {
    // Wait for A-Frame to load
    if (typeof AFRAME === "undefined") {
      setTimeout(() => this.initializeARScene(), 100);
      return;
    }

    // Get scene element
    this.scene = document.getElementById("ar-scene");
    if (!this.scene) {
      console.error("AR scene element not found");
      return;
    }

    // Setup scene loaded event
    this.scene.addEventListener("loaded", () => {
      console.log("AR Scene loaded");
      this.onSceneLoaded();
    });

    // Setup AR events
    this.setupAREvents();
  }

  setupAREvents() {
    // Camera events
    this.scene.addEventListener("camera-init", () => {
      console.log("AR Camera initialized");
      this.hideLoading();
    });

    this.scene.addEventListener("camera-error", (error) => {
      console.error("AR Camera error:", error);
      this.showCameraError();
    });

    // Marker events
    const marker = document.getElementById("animated-marker");
    if (marker) {
      marker.addEventListener("markerFound", () => {
        console.log("AR Marker found");
        this.onMarkerFound();
      });

      marker.addEventListener("markerLost", () => {
        console.log("AR Marker lost");
        this.onMarkerLost();
      });
    }
  }

  setupEventListeners() {
    // Window resize
    window.addEventListener("resize", () => {
      if (this.isARActive) {
        this.handleResize();
      }
    });

    // Device orientation
    window.addEventListener("deviceorientation", (event) => {
      if (this.isARActive) {
        this.handleDeviceOrientation(event);
      }
    });

    // Keyboard shortcuts
    document.addEventListener("keydown", (event) => {
      if (this.isARActive) {
        this.handleKeyboard(event);
      }
    });
  }

  // Public Methods
  static open(product) {
    if (!window.arViewer) {
      window.arViewer = new ARViewer();
      window.arViewer.init();
    }
    window.arViewer.openViewer(product);
  }

  static close() {
    if (window.arViewer) {
      window.arViewer.closeViewer();
    }
  }

  static openQuick() {
    // Open with current product from page
    const productId = window.location.pathname.split("/").pop();
    const product = window.ProductManager
      ? window.ProductManager.getProductById(productId)
      : null;

    if (product) {
      ARViewer.open(product);
    } else {
      console.error("No product found for AR view");
    }
  }

  openViewer(product) {
    if (!product) {
      console.error("No product provided for AR view");
      return;
    }

    this.currentProduct = product;
    this.isARActive = true;

    // Show modal
    const modal = document.getElementById("ar-viewer-modal");
    if (modal) {
      modal.classList.remove("hidden");
      setTimeout(() => modal.classList.add("show"), 10);
    }

    // Update product info
    this.updateProductInfo();

    // Start AR
    this.startAR();

    // Lock screen orientation on mobile
    this.lockOrientation();
  }

  closeViewer() {
    this.isARActive = false;

    // Hide modal
    const modal = document.getElementById("ar-viewer-modal");
    if (modal) {
      modal.classList.remove("show");
      setTimeout(() => modal.classList.add("hidden"), 300);
    }

    // Stop AR
    this.stopAR();

    // Unlock screen orientation
    this.unlockOrientation();

    // Reset state
    this.resetState();
  }

  updateProductInfo() {
    const productNameEl = document.getElementById("ar-product-name");
    if (productNameEl && this.currentProduct) {
      productNameEl.textContent = this.currentProduct.name;
    }
  }

  startAR() {
    this.showLoading();

    // Request camera permission
    this.requestCamera()
      .then(() => {
        console.log("Camera access granted");
        this.initializeProductModel();
        this.hideLoading();
      })
      .catch((error) => {
        console.error("Camera access denied:", error);
        this.showCameraError();
      });
  }

  stopAR() {
    // Stop camera
    this.stopCamera();

    // Reset scene
    this.resetScene();
  }

  async requestCamera() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: "environment", // Use back camera
          width: { ideal: 1280 },
          height: { ideal: 720 },
        },
      });

      // Store stream reference
      this.cameraStream = stream;
      return stream;
    } catch (error) {
      throw new Error(`Camera access failed: ${error.message}`);
    }
  }

  stopCamera() {
    if (this.cameraStream) {
      this.cameraStream.getTracks().forEach((track) => track.stop());
      this.cameraStream = null;
    }
  }

  initializeProductModel() {
    if (!this.currentProduct || !this.scene) return;

    // Get or create product model entity
    this.productModel = document.getElementById("product-model");
    if (!this.productModel) return;

    // Clear existing model
    this.productModel.innerHTML = "";

    // Create 3D model based on product category
    const model = this.createProductModel(this.currentProduct);
    this.productModel.appendChild(model);

    // Apply initial transformations
    this.updateTransformations();
  }

  createProductModel(product) {
    const category = product.category?.toLowerCase() || "";
    let modelElement;

    if (category.includes("furniture") || category.includes("home")) {
      modelElement = this.createFurnitureModel(product);
    } else if (category.includes("fashion") || category.includes("clothing")) {
      modelElement = this.createFashionModel(product);
    } else if (category.includes("electronics")) {
      modelElement = this.createElectronicsModel(product);
    } else {
      modelElement = this.createGenericModel(product);
    }

    // Add common attributes
    modelElement.setAttribute("class", "clickable");
    modelElement.setAttribute("shadow", "");

    // Add click interaction
    modelElement.addEventListener("click", () => {
      this.onModelClick();
    });

    return modelElement;
  }

  createFurnitureModel(product) {
    const name = product.name.toLowerCase();
    let element;

    if (name.includes("sofa") || name.includes("couch")) {
      // Create sofa model
      element = document.createElement("a-entity");
      element.innerHTML = `
        <!-- Sofa base -->
        <a-box 
          position="0 0.3 0" 
          width="2" 
          height="0.6" 
          depth="0.8"
          material="color: #8B4513; roughness: 0.8"
        ></a-box>
        <!-- Sofa back -->
        <a-box 
          position="0 0.7 -0.3" 
          width="2" 
          height="0.8" 
          depth="0.2"
          material="color: #A0522D; roughness: 0.8"
        ></a-box>
        <!-- Sofa arms -->
        <a-box 
          position="-0.9 0.5 0" 
          width="0.2" 
          height="0.8" 
          depth="0.8"
          material="color: #A0522D; roughness: 0.8"
        ></a-box>
        <a-box 
          position="0.9 0.5 0" 
          width="0.2" 
          height="0.8" 
          depth="0.8"
          material="color: #A0522D; roughness: 0.8"
        ></a-box>
      `;
    } else if (name.includes("chair")) {
      // Create chair model
      element = document.createElement("a-entity");
      element.innerHTML = `
        <!-- Chair seat -->
        <a-box 
          position="0 0.5 0" 
          width="0.5" 
          height="0.1" 
          depth="0.5"
          material="color: #8B4513; roughness: 0.8"
        ></a-box>
        <!-- Chair back -->
        <a-box 
          position="0 0.8 -0.2" 
          width="0.5" 
          height="0.6" 
          depth="0.1"
          material="color: #A0522D; roughness: 0.8"
        ></a-box>
        <!-- Chair legs -->
        <a-cylinder 
          position="-0.2 0.25 -0.2" 
          radius="0.02" 
          height="0.5"
          material="color: #654321"
        ></a-cylinder>
        <a-cylinder 
          position="0.2 0.25 -0.2" 
          radius="0.02" 
          height="0.5"
          material="color: #654321"
        ></a-cylinder>
        <a-cylinder 
          position="-0.2 0.25 0.2" 
          radius="0.02" 
          height="0.5"
          material="color: #654321"
        ></a-cylinder>
        <a-cylinder 
          position="0.2 0.25 0.2" 
          radius="0.02" 
          height="0.5"
          material="color: #654321"
        ></a-cylinder>
      `;
    } else if (name.includes("table")) {
      // Create table model
      element = document.createElement("a-entity");
      element.innerHTML = `
        <!-- Table top -->
        <a-box 
          position="0 0.75 0" 
          width="1.5" 
          height="0.1" 
          depth="0.8"
          material="color: #8B4513; roughness: 0.8"
        ></a-box>
        <!-- Table legs -->
        <a-cylinder 
          position="-0.7 0.375 -0.35" 
          radius="0.03" 
          height="0.75"
          material="color: #654321"
        ></a-cylinder>
        <a-cylinder 
          position="0.7 0.375 -0.35" 
          radius="0.03" 
          height="0.75"
          material="color: #654321"
        ></a-cylinder>
        <a-cylinder 
          position="-0.7 0.375 0.35" 
          radius="0.03" 
          height="0.75"
          material="color: #654321"
        ></a-cylinder>
        <a-cylinder 
          position="0.7 0.375 0.35" 
          radius="0.03" 
          height="0.75"
          material="color: #654321"
        ></a-cylinder>
      `;
    } else {
      // Generic furniture
      element = document.createElement("a-box");
      element.setAttribute("width", "1");
      element.setAttribute("height", "1");
      element.setAttribute("depth", "1");
      element.setAttribute("material", "color: #8B4513; roughness: 0.8");
    }

    return element;
  }

  createElectronicsModel(product) {
    const name = product.name.toLowerCase();
    let element;

    if (name.includes("phone") || name.includes("mobile")) {
      // Create phone model
      element = document.createElement("a-entity");
      element.innerHTML = `
        <!-- Phone body -->
        <a-box 
          position="0 0.5 0" 
          width="0.07" 
          height="0.15" 
          depth="0.01"
          material="color: #2C3E50; metalness: 0.8; roughness: 0.2"
        ></a-box>
        <!-- Phone screen -->
        <a-box 
          position="0 0.5 0.005" 
          width="0.06" 
          height="0.13" 
          depth="0.001"
          material="color: #000000; metalness: 1; roughness: 0.1"
        ></a-box>
      `;
    } else if (name.includes("laptop") || name.includes("computer")) {
      // Create laptop model
      element = document.createElement("a-entity");
      element.innerHTML = `
        <!-- Laptop base -->
        <a-box 
          position="0 0.5 0" 
          width="0.3" 
          height="0.02" 
          depth="0.2"
          material="color: #2C3E50; metalness: 0.8; roughness: 0.2"
        ></a-box>
        <!-- Laptop screen -->
        <a-box 
          position="0 0.51 -0.09" 
          width="0.28" 
          height="0.18" 
          depth="0.01"
          material="color: #000000; metalness: 1; roughness: 0.1"
          rotation="-75 0 0"
        ></a-box>
      `;
    } else if (name.includes("tv") || name.includes("television")) {
      // Create TV model
      element = document.createElement("a-entity");
      element.innerHTML = `
        <!-- TV screen -->
        <a-box 
          position="0 0.8 0" 
          width="1.2" 
          height="0.7" 
          depth="0.05"
          material="color: #000000; metalness: 1; roughness: 0.1"
        ></a-box>
        <!-- TV frame -->
        <a-box 
          position="0 0.8 -0.025" 
          width="1.25" 
          height="0.75" 
          depth="0.02"
          material="color: #2C3E50; metalness: 0.8; roughness: 0.2"
        ></a-box>
      `;
    } else {
      // Generic electronics
      element = document.createElement("a-box");
      element.setAttribute("width", "0.5");
      element.setAttribute("height", "0.3");
      element.setAttribute("depth", "0.2");
      element.setAttribute(
        "material",
        "color: #2C3E50; metalness: 0.8; roughness: 0.2",
      );
    }

    return element;
  }

  createFashionModel(product) {
    const name = product.name.toLowerCase();
    let element;

    if (name.includes("shirt") || name.includes("top")) {
      // Create shirt model (simplified)
      element = document.createElement("a-entity");
      element.innerHTML = `
        <!-- Shirt body -->
        <a-box 
          position="0 0.5 0" 
          width="0.5" 
          height="0.6" 
          depth="0.2"
          material="color: #4A90E2; roughness: 0.9"
        ></a-box>
        <!-- Shirt sleeves -->
        <a-box 
          position="-0.3 0.5 0" 
          width="0.2" 
          height="0.4" 
          depth="0.15"
          material="color: #4A90E2; roughness: 0.9"
        ></a-box>
        <a-box 
          position="0.3 0.5 0" 
          width="0.2" 
          height="0.4" 
          depth="0.15"
          material="color: #4A90E2; roughness: 0.9"
        ></a-box>
      `;
    } else if (name.includes("shoe") || name.includes("footwear")) {
      // Create shoe model
      element = document.createElement("a-entity");
      element.innerHTML = `
        <!-- Shoe sole -->
        <a-box 
          position="0 0.1 0" 
          width="0.1" 
          height="0.03" 
          depth="0.25"
          material="color: #8B4513; roughness: 0.8"
        ></a-box>
        <!-- Shoe upper -->
        <a-box 
          position="0 0.15 -0.05" 
          width="0.09" 
          height="0.1" 
          depth="0.15"
          material="color: #654321; roughness: 0.7"
        ></a-box>
      `;
    } else {
      // Generic fashion item
      element = document.createElement("a-cylinder");
      element.setAttribute("radius", "0.3");
      element.setAttribute("height", "0.6");
      element.setAttribute("material", "color: #E74C3C; roughness: 0.9");
    }

    return element;
  }

  createGenericModel(product) {
    // Create a generic box model
    const element = document.createElement("a-box");
    element.setAttribute("width", "0.5");
    element.setAttribute("height", "0.5");
    element.setAttribute("depth", "0.5");
    element.setAttribute("material", "color: #3498DB; roughness: 0.7");

    // Add some visual interest
    element.setAttribute(
      "animation",
      "property: rotation; to: 0 360 0; loop: true; dur: 10000",
    );

    return element;
  }

  // AR Control Methods
  static updateScale(scale) {
    if (window.arViewer) {
      window.arViewer.setScale(parseFloat(scale));
    }
  }

  static rotateProduct(degrees) {
    if (window.arViewer) {
      window.arViewer.rotate(degrees);
    }
  }

  static updateHeight(height) {
    if (window.arViewer) {
      window.arViewer.setHeight(parseFloat(height));
    }
  }

  static resetPosition() {
    if (window.arViewer) {
      window.arViewer.reset();
    }
  }

  static takeScreenshot() {
    if (window.arViewer) {
      window.arViewer.captureScreenshot();
    }
  }

  static addToCart() {
    if (window.arViewer && window.arViewer.currentProduct) {
      const product = window.arViewer.currentProduct;
      if (window.handleAddToCart) {
        window.handleAddToCart(product.id);
      }
      window.arViewer.closeViewer();
    }
  }

  static switchToMarkerless() {
    if (window.arViewer) {
      window.arViewer.enableMarkerless();
    }
  }

  static requestCamera() {
    if (window.arViewer) {
      window.arViewer.requestCamera();
    }
  }

  setScale(scale) {
    this.currentScale = scale;
    this.updateTransformations();

    // Update UI
    const sizeValue = document.getElementById("size-value");
    if (sizeValue) {
      sizeValue.textContent = `${scale.toFixed(1)}x`;
    }
  }

  rotate(degrees) {
    this.currentRotation += degrees;
    this.updateTransformations();
  }

  setHeight(height) {
    this.currentHeight = height;
    this.updateTransformations();

    // Update UI
    const heightValue = document.getElementById("height-value");
    if (heightValue) {
      heightValue.textContent = `${height.toFixed(1)}m`;
    }
  }

  reset() {
    this.currentScale = 1;
    this.currentRotation = 0;
    this.currentHeight = 0.5;

    // Update UI
    const sizeSlider = document.getElementById("size-slider");
    const heightSlider = document.getElementById("height-slider");
    if (sizeSlider) sizeSlider.value = "1";
    if (heightSlider) heightSlider.value = "0.5";

    this.updateTransformations();
  }

  updateTransformations() {
    if (!this.productModel) return;

    const position = `0 ${this.currentHeight} 0`;
    const rotation = `0 ${this.currentRotation} 0`;
    const scale = `${this.currentScale} ${this.currentScale} ${this.currentScale}`;

    this.productModel.setAttribute("position", position);
    this.productModel.setAttribute("rotation", rotation);
    this.productModel.setAttribute("scale", scale);
  }

  captureScreenshot() {
    if (!this.scene) return;

    try {
      // Get the canvas from A-Frame scene
      const canvas = this.scene.canvas;
      if (!canvas) return;

      // Convert canvas to blob
      canvas.toBlob((blob) => {
        const url = URL.createObjectURL(blob);
        this.showScreenshot(url);
      }, "image/png");
    } catch (error) {
      console.error("Screenshot failed:", error);
      this.showToast("Screenshot failed", "error");
    }
  }

  showScreenshot(imageUrl) {
    const modal = document.getElementById("screenshot-modal");
    const image = document.getElementById("screenshot-image");

    if (modal && image) {
      image.src = imageUrl;
      modal.classList.remove("hidden");
      setTimeout(() => modal.classList.add("show"), 10);
    }
  }

  static closeScreenshot() {
    const modal = document.getElementById("screenshot-modal");
    if (modal) {
      modal.classList.remove("show");
      setTimeout(() => modal.classList.add("hidden"), 300);
    }
  }

  static downloadScreenshot() {
    const image = document.getElementById("screenshot-image");
    if (image && image.src) {
      const link = document.createElement("a");
      link.download = `ar-product-${Date.now()}.png`;
      link.href = image.src;
      link.click();
    }
  }

  static shareScreenshot() {
    const image = document.getElementById("screenshot-image");
    if (image && image.src && navigator.share) {
      fetch(image.src)
        .then((res) => res.blob())
        .then((blob) => {
          const file = new File([blob], "ar-product.png", {
            type: "image/png",
          });
          navigator.share({
            title: "Check out this AR view!",
            text: "See how this product looks in AR",
            files: [file],
          });
        })
        .catch(console.error);
    } else {
      // Fallback: copy to clipboard
      ARViewer.copyImageToClipboard();
    }
  }

  static saveToGallery() {
    // This would require additional permissions and APIs
    // For now, just download the image
    ARViewer.downloadScreenshot();
  }

  static copyImageToClipboard() {
    const image = document.getElementById("screenshot-image");
    if (image && image.src) {
      // Modern browsers support clipboard API
      if (navigator.clipboard && navigator.clipboard.write) {
        fetch(image.src)
          .then((res) => res.blob())
          .then((blob) => {
            navigator.clipboard.write([
              new ClipboardItem({ "image/png": blob }),
            ]);
            this.showToast("Image copied to clipboard!", "success");
          })
          .catch(console.error);
      }
    }
  }

  // Event Handlers
  onSceneLoaded() {
    console.log("AR Scene is ready");
  }

  onMarkerFound() {
    const noMarkerMsg = document.getElementById("no-marker-message");
    if (noMarkerMsg) {
      noMarkerMsg.classList.add("hidden");
    }
  }

  onMarkerLost() {
    const noMarkerMsg = document.getElementById("no-marker-message");
    if (noMarkerMsg) {
      noMarkerMsg.classList.remove("hidden");
    }
  }

  onModelClick() {
    // Handle model interaction
    console.log("Product model clicked");
    this.showToast("Product selected!", "info");
  }

  handleResize() {
    // Handle window resize for AR scene
    if (this.scene && this.scene.resize) {
      this.scene.resize();
    }
  }

  handleDeviceOrientation(event) {
    // Handle device orientation changes
    // Could be used for additional AR interactions
  }

  handleKeyboard(event) {
    switch (event.key) {
      case "Escape":
        this.closeViewer();
        break;
      case "r":
      case "R":
        this.reset();
        break;
      case " ":
        event.preventDefault();
        this.captureScreenshot();
        break;
    }
  }

  // Utility Methods
  showLoading() {
    const loading = document.getElementById("ar-loading");
    if (loading) {
      loading.classList.remove("hidden");
    }
  }

  hideLoading() {
    const loading = document.getElementById("ar-loading");
    if (loading) {
      loading.classList.add("hidden");
    }
  }

  showCameraError() {
    const error = document.getElementById("camera-error");
    if (error) {
      error.classList.remove("hidden");
    }
    this.hideLoading();
  }

  showError(message) {
    console.error("AR Error:", message);
    // You could integrate with the main app's toast system here
    if (window.app && window.app.showToast) {
      window.app.showToast(message, "error");
    }
  }

  showToast(message, type = "info") {
    if (window.app && window.app.showToast) {
      window.app.showToast(message, type);
    }
  }

  enableMarkerless() {
    this.isMarkerless = true;
    // Implementation for markerless AR would go here
    // This is more complex and would require additional libraries
    console.log("Markerless AR not yet implemented");
  }

  lockOrientation() {
    // Lock orientation to landscape on mobile for better AR experience
    if (screen.orientation && screen.orientation.lock) {
      screen.orientation.lock("landscape").catch(console.error);
    }
  }

  unlockOrientation() {
    // Unlock orientation
    if (screen.orientation && screen.orientation.unlock) {
      screen.orientation.unlock();
    }
  }

  resetState() {
    this.currentProduct = null;
    this.currentRotation = 0;
    this.currentScale = 1;
    this.currentHeight = 0.5;
    this.isMarkerless = false;
  }

  resetScene() {
    if (this.productModel) {
      this.productModel.innerHTML = "";
    }
  }
}

// Show AR button on product pages
function showARButton() {
  const arBtn = document.getElementById("ar-quick-btn");
  const currentPath = window.location.pathname;

  if (currentPath.includes("/product/") && arBtn) {
    arBtn.classList.remove("hidden");
  }
}

// Initialize AR Viewer when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  // Initialize AR Viewer
  window.arViewer = new ARViewer();

  // Show AR button on product pages
  showARButton();

  // Listen for route changes to show/hide AR button
  window.addEventListener("popstate", showARButton);
});

// Make ARViewer globally available
window.ARViewer = ARViewer;

// Export for module usage if needed
if (typeof module !== "undefined" && module.exports) {
  module.exports = ARViewer;
}
