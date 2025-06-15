// Enhanced AR/VR Model Viewer with Improved 3D Experience
class ARViewer {
  constructor() {
    this.scene = null;
    this.camera = null;
    this.renderer = null;
    this.model = null;
    this.controls = null;
    this.isARSupported = false;
    this.isVRSupported = false;
    this.currentProduct = null;
    this.arSession = null;
    this.animationId = null;
    this.loadingManager = null;
    this.init();
  }

  async init() {
    console.log("Initializing Enhanced AR/VR Viewer...");

    // Check for WebXR support
    this.checkARVRSupport();

    // Load Three.js and dependencies
    await this.loadThreeJS();

    // Debug Three.js status
    this.debugThreeJSStatus();

    console.log("Enhanced AR/VR Viewer initialized");
  }

  debugThreeJSStatus() {
    console.log("=== Three.js Debug Info ===");
    console.log("window.THREE available:", !!window.THREE);
    if (window.THREE) {
      console.log("Three.js version:", window.THREE.REVISION);
      console.log("OrbitControls available:", !!window.THREE.OrbitControls);
      console.log("WebGLRenderer available:", !!window.THREE.WebGLRenderer);
      console.log(
        "PerspectiveCamera available:",
        !!window.THREE.PerspectiveCamera,
      );
      console.log("Scene available:", !!window.THREE.Scene);
    }
    console.log("WebGL support:", this.checkWebGLSupport());
    console.log("=== End Debug Info ===");
  }

  checkWebGLSupport() {
    try {
      const canvas = document.createElement("canvas");
      const gl =
        canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
      return !!gl;
    } catch (e) {
      return false;
    }
  }

  async loadThreeJS() {
    // Check if Three.js is already loaded
    if (window.THREE) {
      console.log("Three.js already loaded, version:", window.THREE.REVISION);
      await this.loadAdditionalModules();
      return;
    }

    // Multiple CDN sources for Three.js with fallbacks
    const threejsCDNs = [
      "https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js",
      "https://cdn.jsdelivr.net/npm/three@0.128.0/build/three.min.js",
      "https://unpkg.com/three@0.128.0/build/three.min.js",
      "https://cdnjs.cloudflare.com/ajax/libs/three.js/r140/three.min.js",
      "https://cdn.jsdelivr.net/npm/three@0.140.0/build/three.min.js",
    ];

    for (let i = 0; i < threejsCDNs.length; i++) {
      try {
        console.log(
          `Attempting to load Three.js from CDN ${i + 1}:`,
          threejsCDNs[i],
        );
        await this.loadScript(threejsCDNs[i]);

        // Wait a moment for Three.js to initialize
        await new Promise((resolve) => setTimeout(resolve, 100));

        if (window.THREE) {
          console.log(
            "Three.js loaded successfully, version:",
            window.THREE.REVISION,
            "from CDN:",
            threejsCDNs[i],
          );
          await this.loadAdditionalModules();
          return;
        }
      } catch (error) {
        console.warn(`Failed to load Three.js from CDN ${i + 1}:`, error);
        if (i === threejsCDNs.length - 1) {
          console.error("All Three.js CDN sources failed");
          this.showNotification(
            "3D viewer unavailable - please check your internet connection",
            "error",
          );
          return;
        }
      }
    }
  }

  async loadScript(src) {
    return new Promise((resolve, reject) => {
      // Check if script is already loaded
      const existingScript = document.querySelector(`script[src="${src}"]`);
      if (existingScript) {
        resolve();
        return;
      }

      const script = document.createElement("script");
      script.src = src;
      script.async = true;
      script.crossOrigin = "anonymous";

      let timeout;

      script.onload = () => {
        clearTimeout(timeout);
        console.log("Script loaded successfully:", src);
        resolve();
      };

      script.onerror = () => {
        clearTimeout(timeout);
        document.head.removeChild(script);
        reject(new Error(`Failed to load script: ${src}`));
      };

      // Set timeout for script loading
      timeout = setTimeout(() => {
        document.head.removeChild(script);
        reject(new Error(`Script loading timeout: ${src}`));
      }, 10000); // 10 second timeout

      document.head.appendChild(script);
    });
  }

  async loadAdditionalModules() {
    if (!window.THREE) {
      console.warn("Three.js not available, skipping additional modules");
      return;
    }

    // Try to load OrbitControls with multiple fallback sources
    const orbitControlsSources = [
      "https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/controls/OrbitControls.js",
      "https://cdn.jsdelivr.net/npm/three@0.128.0/examples/js/controls/OrbitControls.js",
      "https://unpkg.com/three@0.128.0/examples/js/controls/OrbitControls.js",
    ];

    for (const source of orbitControlsSources) {
      try {
        await this.loadScript(source);
        if (window.THREE.OrbitControls) {
          console.log("OrbitControls loaded successfully from:", source);
          break;
        }
      } catch (error) {
        console.warn("Failed to load OrbitControls from:", source);
      }
    }

    // Try to load GLTFLoader (optional)
    try {
      await this.loadScript(
        "https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/loaders/GLTFLoader.js",
      );
      console.log("GLTFLoader loaded successfully");
    } catch (error) {
      console.warn("GLTFLoader not available:", error);
    }

    console.log("Three.js modules loading completed");
  }

  async checkARVRSupport() {
    // Check for WebXR AR support
    if (navigator.xr) {
      try {
        this.isARSupported =
          await navigator.xr.isSessionSupported("immersive-ar");
        this.isVRSupported =
          await navigator.xr.isSessionSupported("immersive-vr");
      } catch (error) {
        console.log("WebXR not fully supported:", error);
      }
    }

    // Fallback: Check for device camera (mobile AR)
    if (
      !this.isARSupported &&
      navigator.mediaDevices &&
      navigator.mediaDevices.getUserMedia
    ) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: "environment" },
        });
        this.isARSupported = true;
        stream.getTracks().forEach((track) => track.stop());
      } catch (error) {
        console.log("Camera access not available:", error);
      }
    }
  }

  // Enhanced 3D model creation with better geometry and materials
  createProductModel(product) {
    if (!window.THREE) {
      console.error("Three.js not loaded - attempting to reload");
      this.loadThreeJS()
        .then(() => {
          console.log("Three.js reloaded, please try again");
        })
        .catch(() => {
          console.error("Failed to reload Three.js");
        });
      return null;
    }

    try {
      const geometry = this.getEnhancedGeometryForProduct(product);
      const material = this.getEnhancedMaterialForProduct(product);

      const mesh = new THREE.Mesh(geometry, material);

      // Add realistic scaling
      const scale = this.getScaleForProduct(product);
      mesh.scale.set(scale.x, scale.y, scale.z);

      // Add subtle animation data
      mesh.userData.originalRotation = { x: 0, y: 0, z: 0 };
      mesh.userData.animationType = this.getAnimationTypeForProduct(product);

      // Load product texture if available
      this.loadProductTexture(mesh, product);

      return mesh;
    } catch (error) {
      console.error("Error creating product model:", error);
      return this.createFallbackModel();
    }
  }

  getEnhancedGeometryForProduct(product) {
    const category = product.category.toLowerCase();
    const name = product.name.toLowerCase();

    try {
      if (category.includes("electronics")) {
        if (name.includes("phone") || name.includes("mobile")) {
          // Create realistic phone geometry with rounded edges
          const phoneGroup = new THREE.Group();
          const bodyGeometry = new THREE.BoxGeometry(0.8, 1.6, 0.08);
          const body = new THREE.Mesh(
            bodyGeometry,
            new THREE.MeshPhongMaterial({ color: 0x2d3748 }),
          );

          // Add screen
          const screenGeometry = new THREE.PlaneGeometry(0.7, 1.4);
          const screen = new THREE.Mesh(
            screenGeometry,
            new THREE.MeshBasicMaterial({ color: 0x000000 }),
          );
          screen.position.z = 0.041;

          phoneGroup.add(body);
          phoneGroup.add(screen);
          return phoneGroup;
        } else if (name.includes("laptop")) {
          // Create laptop geometry
          const laptopGroup = new THREE.Group();
          const baseGeometry = new THREE.BoxGeometry(2.2, 1.5, 0.15);
          const lidGeometry = new THREE.BoxGeometry(2.2, 1.5, 0.1);

          const base = new THREE.Mesh(
            baseGeometry,
            new THREE.MeshPhongMaterial({ color: 0x4a5568 }),
          );
          const lid = new THREE.Mesh(
            lidGeometry,
            new THREE.MeshPhongMaterial({ color: 0x2d3748 }),
          );

          lid.position.y = 0.75;
          lid.rotation.x = -Math.PI * 0.7;

          laptopGroup.add(base);
          laptopGroup.add(lid);
          return laptopGroup;
        } else if (name.includes("headphone") || name.includes("earbuds")) {
          // Create headphone geometry
          const headphoneGroup = new THREE.Group();
          const bandGeometry = new THREE.TorusGeometry(
            0.8,
            0.08,
            8,
            16,
            Math.PI,
          );
          const cupGeometry = new THREE.SphereGeometry(0.25, 16, 16);

          const band = new THREE.Mesh(
            bandGeometry,
            new THREE.MeshPhongMaterial({ color: 0x2d3748 }),
          );
          const leftCup = new THREE.Mesh(
            cupGeometry,
            new THREE.MeshPhongMaterial({ color: 0x1a202c }),
          );
          const rightCup = new THREE.Mesh(
            cupGeometry,
            new THREE.MeshPhongMaterial({ color: 0x1a202c }),
          );

          leftCup.position.set(-0.6, -0.3, 0);
          rightCup.position.set(0.6, -0.3, 0);

          headphoneGroup.add(band);
          headphoneGroup.add(leftCup);
          headphoneGroup.add(rightCup);
          return headphoneGroup;
        }
        return new THREE.BoxGeometry(1, 1, 0.5);
      } else if (category.includes("fashion")) {
        if (name.includes("shoes")) {
          // Create shoe geometry using multiple parts
          const shoeGroup = new THREE.Group();
          const soleGeometry = new THREE.BoxGeometry(1.2, 0.3, 0.7);
          const upperGeometry = new THREE.BoxGeometry(1.0, 0.4, 0.6);

          const sole = new THREE.Mesh(
            soleGeometry,
            new THREE.MeshPhongMaterial({ color: 0x8b4513 }),
          );
          const upper = new THREE.Mesh(
            upperGeometry,
            new THREE.MeshPhongMaterial({ color: 0x2d3748 }),
          );

          upper.position.y = 0.25;
          sole.position.y = -0.15;

          shoeGroup.add(sole);
          shoeGroup.add(upper);
          return shoeGroup;
        } else if (name.includes("shirt") || name.includes("dress")) {
          // Create clothing geometry
          return new THREE.PlaneGeometry(1.5, 2);
        } else if (name.includes("jeans") || name.includes("pants")) {
          // Create pants geometry
          const pantsGroup = new THREE.Group();
          const waistGeometry = new THREE.CylinderGeometry(0.5, 0.5, 0.3, 16);
          const leftLegGeometry = new THREE.CylinderGeometry(
            0.25,
            0.22,
            1.2,
            16,
          );
          const rightLegGeometry = new THREE.CylinderGeometry(
            0.25,
            0.22,
            1.2,
            16,
          );

          const waist = new THREE.Mesh(
            waistGeometry,
            new THREE.MeshPhongMaterial({ color: 0x4c51bf }),
          );
          const leftLeg = new THREE.Mesh(
            leftLegGeometry,
            new THREE.MeshPhongMaterial({ color: 0x4c51bf }),
          );
          const rightLeg = new THREE.Mesh(
            rightLegGeometry,
            new THREE.MeshPhongMaterial({ color: 0x4c51bf }),
          );

          leftLeg.position.set(-0.2, -0.6, 0);
          rightLeg.position.set(0.2, -0.6, 0);

          pantsGroup.add(waist);
          pantsGroup.add(leftLeg);
          pantsGroup.add(rightLeg);
          return pantsGroup;
        }
        return new THREE.BoxGeometry(1, 1.5, 0.3);
      } else if (category.includes("home") || category.includes("kitchen")) {
        if (name.includes("bottle") || name.includes("water")) {
          // Create realistic bottle
          const bottleGroup = new THREE.Group();
          const bodyGeometry = new THREE.CylinderGeometry(0.3, 0.35, 1.2, 16);
          const neckGeometry = new THREE.CylinderGeometry(0.15, 0.15, 0.3, 16);
          const capGeometry = new THREE.CylinderGeometry(0.18, 0.18, 0.1, 16);

          const body = new THREE.Mesh(
            bodyGeometry,
            new THREE.MeshPhongMaterial({
              color: 0x87ceeb,
              transparent: true,
              opacity: 0.7,
            }),
          );
          const neck = new THREE.Mesh(
            neckGeometry,
            new THREE.MeshPhongMaterial({ color: 0x87ceeb }),
          );
          const cap = new THREE.Mesh(
            capGeometry,
            new THREE.MeshPhongMaterial({ color: 0xff6b6b }),
          );

          neck.position.y = 0.75;
          cap.position.y = 1.0;

          bottleGroup.add(body);
          bottleGroup.add(neck);
          bottleGroup.add(cap);
          return bottleGroup;
        } else if (name.includes("cooker") || name.includes("pressure")) {
          // Create pressure cooker
          const cookerGroup = new THREE.Group();
          const bodyGeometry = new THREE.CylinderGeometry(0.8, 0.8, 0.6, 16);
          const lidGeometry = new THREE.CylinderGeometry(0.82, 0.82, 0.1, 16);
          const handleGeometry = new THREE.TorusGeometry(0.15, 0.03, 8, 16);

          const body = new THREE.Mesh(
            bodyGeometry,
            new THREE.MeshPhongMaterial({ color: 0xc0c0c0 }),
          );
          const lid = new THREE.Mesh(
            lidGeometry,
            new THREE.MeshPhongMaterial({ color: 0xa0a0a0 }),
          );
          const handle = new THREE.Mesh(
            handleGeometry,
            new THREE.MeshPhongMaterial({ color: 0x2d3748 }),
          );

          lid.position.y = 0.35;
          handle.position.y = 0.4;
          handle.rotation.x = Math.PI / 2;

          cookerGroup.add(body);
          cookerGroup.add(lid);
          cookerGroup.add(handle);
          return cookerGroup;
        }
        return new THREE.BoxGeometry(1, 1, 1);
      } else if (category.includes("toys")) {
        if (name.includes("car") || name.includes("vehicle")) {
          // Create toy car
          const carGroup = new THREE.Group();
          const bodyGeometry = new THREE.BoxGeometry(1.5, 0.4, 0.8);
          const wheelGeometry = new THREE.CylinderGeometry(0.15, 0.15, 0.1, 16);

          const body = new THREE.Mesh(
            bodyGeometry,
            new THREE.MeshPhongMaterial({ color: 0xff6b6b }),
          );
          const wheels = [];

          for (let i = 0; i < 4; i++) {
            const wheel = new THREE.Mesh(
              wheelGeometry,
              new THREE.MeshPhongMaterial({ color: 0x2d3748 }),
            );
            wheel.rotation.z = Math.PI / 2;
            wheel.position.x = i < 2 ? -0.5 : 0.5;
            wheel.position.z = i % 2 === 0 ? -0.5 : 0.5;
            wheel.position.y = -0.3;
            wheels.push(wheel);
            carGroup.add(wheel);
          }

          carGroup.add(body);
          return carGroup;
        } else if (name.includes("ball")) {
          return new THREE.SphereGeometry(0.6, 32, 16);
        }
        return new THREE.BoxGeometry(1, 0.6, 1.5);
      } else if (category.includes("beauty")) {
        // Create cosmetic container
        const containerGeometry = new THREE.CylinderGeometry(0.2, 0.25, 1, 16);
        return containerGeometry;
      } else if (category.includes("sports")) {
        if (name.includes("ball")) {
          return new THREE.SphereGeometry(0.6, 32, 16);
        } else if (name.includes("dumbbell") || name.includes("weight")) {
          // Create dumbbell
          const dumbbellGroup = new THREE.Group();
          const barGeometry = new THREE.CylinderGeometry(0.05, 0.05, 1.2, 16);
          const weightGeometry = new THREE.CylinderGeometry(0.2, 0.2, 0.3, 16);

          const bar = new THREE.Mesh(
            barGeometry,
            new THREE.MeshPhongMaterial({ color: 0x4a5568 }),
          );
          const leftWeight = new THREE.Mesh(
            weightGeometry,
            new THREE.MeshPhongMaterial({ color: 0x2d3748 }),
          );
          const rightWeight = new THREE.Mesh(
            weightGeometry,
            new THREE.MeshPhongMaterial({ color: 0x2d3748 }),
          );

          leftWeight.position.y = -0.5;
          rightWeight.position.y = 0.5;
          bar.rotation.z = Math.PI / 2;
          leftWeight.rotation.z = Math.PI / 2;
          rightWeight.rotation.z = Math.PI / 2;

          dumbbellGroup.add(bar);
          dumbbellGroup.add(leftWeight);
          dumbbellGroup.add(rightWeight);
          return dumbbellGroup;
        }
        return new THREE.SphereGeometry(0.6, 32, 16);
      } else if (category.includes("books")) {
        // Create book
        const bookGroup = new THREE.Group();
        const coverGeometry = new THREE.BoxGeometry(0.8, 1.2, 0.08);
        const pagesGeometry = new THREE.BoxGeometry(0.75, 1.15, 0.06);

        const cover = new THREE.Mesh(
          coverGeometry,
          new THREE.MeshPhongMaterial({ color: 0x8b5cf6 }),
        );
        const pages = new THREE.Mesh(
          pagesGeometry,
          new THREE.MeshPhongMaterial({ color: 0xf7fafc }),
        );

        pages.position.z = -0.01;

        bookGroup.add(cover);
        bookGroup.add(pages);
        return bookGroup;
      }

      return new THREE.BoxGeometry(1, 1, 1);
    } catch (error) {
      console.warn("Error creating enhanced geometry, using fallback:", error);
      return new THREE.BoxGeometry(1, 1, 1);
    }
  }

  getEnhancedMaterialForProduct(product) {
    const category = product.category.toLowerCase();
    const name = product.name.toLowerCase();

    // Enhanced materials with better visual properties
    const materialProps = {
      shininess: 100,
      transparent: false,
      opacity: 1.0,
    };

    if (category.includes("electronics")) {
      return new THREE.MeshPhongMaterial({
        color: 0x2d3748,
        shininess: 150,
        specular: 0x111111,
      });
    } else if (category.includes("fashion")) {
      if (name.includes("jeans")) {
        return new THREE.MeshLambertMaterial({ color: 0x4c51bf });
      } else if (name.includes("dress")) {
        return new THREE.MeshPhongMaterial({
          color: 0xff6b9d,
          shininess: 80,
        });
      }
      return new THREE.MeshPhongMaterial({
        color: 0xef4444,
        shininess: 60,
      });
    } else if (category.includes("home")) {
      return new THREE.MeshPhongMaterial({
        color: 0x10b981,
        shininess: 120,
      });
    } else if (category.includes("toys")) {
      return new THREE.MeshPhongMaterial({
        color: 0xf59e0b,
        shininess: 80,
      });
    } else if (category.includes("beauty")) {
      return new THREE.MeshPhongMaterial({
        color: 0x8b5cf6,
        shininess: 200,
        specular: 0x444444,
      });
    } else if (category.includes("sports")) {
      return new THREE.MeshPhongMaterial({
        color: 0xf97316,
        shininess: 90,
      });
    } else if (category.includes("books")) {
      return new THREE.MeshLambertMaterial({ color: 0x6b7280 });
    }

    return new THREE.MeshPhongMaterial({
      color: 0x3b82f6,
      shininess: 100,
    });
  }

  getScaleForProduct(product) {
    const category = product.category.toLowerCase();
    const name = product.name.toLowerCase();

    if (name.includes("phone")) return { x: 1, y: 1, z: 1 };
    if (name.includes("laptop")) return { x: 0.8, y: 0.8, z: 0.8 };
    if (name.includes("headphone")) return { x: 1.2, y: 1.2, z: 1.2 };
    if (name.includes("shoes")) return { x: 1, y: 1, z: 1 };
    if (name.includes("bottle")) return { x: 0.8, y: 0.8, z: 0.8 };
    if (category.includes("toys")) return { x: 0.9, y: 0.9, z: 0.9 };

    return { x: 1, y: 1, z: 1 };
  }

  getAnimationTypeForProduct(product) {
    const category = product.category.toLowerCase();
    const name = product.name.toLowerCase();

    if (name.includes("phone") || name.includes("laptop")) return "gentle";
    if (name.includes("ball") || category.includes("sports")) return "bounce";
    if (category.includes("toys")) return "playful";
    if (category.includes("beauty")) return "elegant";

    return "rotate";
  }

  loadProductTexture(mesh, product) {
    if (!product.image || !window.THREE) return;

    const textureLoader = new THREE.TextureLoader();
    textureLoader.load(
      product.image,
      (texture) => {
        // Apply texture to material
        if (mesh.material) {
          mesh.material.map = texture;
          mesh.material.needsUpdate = true;
        } else if (mesh.children && mesh.children.length > 0) {
          // Apply to first child if it's a group
          mesh.children[0].material.map = texture;
          mesh.children[0].material.needsUpdate = true;
        }
      },
      undefined,
      (error) => {
        console.log("Texture loading failed:", error);
      },
    );
  }

  createFallbackModel() {
    try {
      const geometry = new THREE.BoxGeometry(1, 1, 1);
      const material = new THREE.MeshPhongMaterial({
        color: 0x3b82f6,
        shininess: 100,
      });
      return new THREE.Mesh(geometry, material);
    } catch (error) {
      console.error("Even fallback model creation failed:", error);
      return null;
    }
  }

  async ensureThreeJSLoaded() {
    if (!window.THREE) {
      console.log("Three.js not loaded, attempting to load...");
      await this.loadThreeJS();
    }
    return !!window.THREE;
  }

  async openARViewer(product) {
    this.currentProduct = product;
    this.createARModal();
  }

  async openVRViewer(product) {
    this.currentProduct = product;
    this.createVRModal();
  }

  async open3DViewer(product) {
    this.currentProduct = product;

    // Ensure Three.js is loaded before opening 3D viewer
    const isThreeLoaded = await this.ensureThreeJSLoaded();
    if (!isThreeLoaded) {
      this.showNotification(
        "3D viewer unavailable - Three.js failed to load",
        "error",
      );
      return;
    }

    this.create3DModal();
  }

  createARModal() {
    const modal = this.createModal("AR Viewer", "ar-modal");

    const content = `
      <div style="text-align: center; padding: 1.5rem;">
        <h3 style="margin-bottom: 1rem; color: #111827; font-size: 1.25rem;">
          ${this.currentProduct.name} - AR Experience
        </h3>
        <div id="ar-container" style="
          width: 100%;
          height: 350px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border-radius: 1rem;
          position: relative;
          margin-bottom: 1.5rem;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-size: 1.125rem;
          overflow: hidden;
          box-shadow: 0 10px 30px rgba(0,0,0,0.3);
        ">
          <div style="text-align: center; z-index: 2;">
            <div style="font-size: 4rem; margin-bottom: 1rem; animation: float 3s ease-in-out infinite;">📱</div>
            <p style="font-weight: 600; margin-bottom: 0.5rem;">Point your camera to experience AR</p>
            <p style="font-size: 0.875rem; opacity: 0.9;">
              ${this.isARSupported ? "Camera access will be requested" : "AR not supported on this device"}
            </p>
          </div>
        </div>

        <div style="display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap; margin-bottom: 1.5rem;">
          <button onclick="arViewer.startARSession()"
                  style="
                    background: linear-gradient(135deg, #10b981, #059669);
                    color: white;
                    border: none;
                    padding: 1rem 2rem;
                    border-radius: 0.75rem;
                    font-weight: 600;
                    cursor: pointer;
                    box-shadow: 0 4px 15px rgba(16, 185, 129, 0.4);
                    transition: transform 0.2s;
                  "
                  ${!this.isARSupported ? "disabled" : ""}
                  onmouseover="this.style.transform='translateY(-2px)'"
                  onmouseout="this.style.transform='translateY(0)'">
            📷 Start AR Experience
          </button>
          <button onclick="arViewer.open3DViewer(arViewer.currentProduct)"
                  style="
                    background: linear-gradient(135deg, #3b82f6, #1d4ed8);
                    color: white;
                    border: none;
                    padding: 1rem 2rem;
                    border-radius: 0.75rem;
                    font-weight: 600;
                    cursor: pointer;
                    box-shadow: 0 4px 15px rgba(59, 130, 246, 0.4);
                    transition: transform 0.2s;
                  "
                  onmouseover="this.style.transform='translateY(-2px)'"
                  onmouseout="this.style.transform='translateY(0)'">
            🔄 View in 3D
          </button>
        </div>

        <div style="padding: 1.5rem; background: linear-gradient(135deg, #f8fafc, #e2e8f0); border-radius: 1rem; text-align: left;">
          <h4 style="margin-bottom: 1rem; color: #374151; font-size: 1rem; display: flex; align-items: center; gap: 0.5rem;">
            📋 AR Instructions
          </h4>
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem;">
            <div>
              <div style="font-weight: 600; color: #4f46e5; margin-bottom: 0.25rem;">Step 1</div>
              <div style="color: #6b7280; font-size: 0.875rem;">Allow camera access when prompted</div>
            </div>
            <div>
              <div style="font-weight: 600; color: #4f46e5; margin-bottom: 0.25rem;">Step 2</div>
              <div style="color: #6b7280; font-size: 0.875rem;">Point camera at a flat surface</div>
            </div>
            <div>
              <div style="font-weight: 600; color: #4f46e5; margin-bottom: 0.25rem;">Step 3</div>
              <div style="color: #6b7280; font-size: 0.875rem;">Tap green circle to place object</div>
            </div>
            <div>
              <div style="font-weight: 600; color: #4f46e5; margin-bottom: 0.25rem;">Step 4</div>
              <div style="color: #6b7280; font-size: 0.875rem;">Pinch to resize, drag to move</div>
            </div>
          </div>
        </div>
      </div>
    `;

    modal.innerHTML = content;
  }

  create3DModal() {
    const modal = this.createModal("3D Viewer", "3d-modal");

    const content = `
      <div style="text-align: center; padding: 1.5rem;">
        <h3 style="margin-bottom: 1rem; color: #111827; font-size: 1.25rem;">
          ${this.currentProduct.name} - Interactive 3D View
        </h3>
        <div id="3d-container" style="
          width: 100%;
          height: 450px;
          background: linear-gradient(135deg, #1a202c, #2d3748);
          border-radius: 1rem;
          position: relative;
          margin-bottom: 1.5rem;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: inset 0 2px 4px rgba(0,0,0,0.1);
          overflow: hidden;
        ">
          <div style="color: white; text-align: center; z-index: 2;">
            <div style="font-size: 3rem; margin-bottom: 1rem; animation: spin 2s linear infinite;">⚙️</div>
            <p style="font-size: 1.1rem; font-weight: 600;">Initializing 3D Engine...</p>
            <div style="width: 200px; height: 4px; background: rgba(255,255,255,0.2); border-radius: 2px; margin: 1rem auto; overflow: hidden;">
              <div style="width: 100%; height: 100%; background: linear-gradient(90deg, #3b82f6, #1d4ed8); border-radius: 2px; animation: loading 2s ease-in-out infinite;"></div>
            </div>
          </div>
        </div>

        <div style="display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap; margin-bottom: 1.5rem;">
          <button onclick="arViewer.reset3DView()"
                  style="
                    background: linear-gradient(135deg, #6b7280, #4b5563);
                    color: white;
                    border: none;
                    padding: 0.75rem 1.5rem;
                    border-radius: 0.75rem;
                    font-weight: 600;
                    cursor: pointer;
                    box-shadow: 0 4px 15px rgba(107, 114, 128, 0.4);
                    transition: transform 0.2s;
                  "
                  onmouseover="this.style.transform='translateY(-2px)'"
                  onmouseout="this.style.transform='translateY(0)'">
            🔄 Reset View
          </button>
          <button onclick="arViewer.toggleAnimation()"
                  style="
                    background: linear-gradient(135deg, #8b5cf6, #7c3aed);
                    color: white;
                    border: none;
                    padding: 0.75rem 1.5rem;
                    border-radius: 0.75rem;
                    font-weight: 600;
                    cursor: pointer;
                    box-shadow: 0 4px 15px rgba(139, 92, 246, 0.4);
                    transition: transform 0.2s;
                  "
                  onmouseover="this.style.transform='translateY(-2px)'"
                  onmouseout="this.style.transform='translateY(0)'">
            ⏸️ Toggle Animation
          </button>
          <button onclick="arViewer.openARViewer(arViewer.currentProduct)"
                  style="
                    background: linear-gradient(135deg, #10b981, #059669);
                    color: white;
                    border: none;
                    padding: 0.75rem 1.5rem;
                    border-radius: 0.75rem;
                    font-weight: 600;
                    cursor: pointer;
                    box-shadow: 0 4px 15px rgba(16, 185, 129, 0.4);
                    transition: transform 0.2s;
                  "
                  onmouseover="this.style.transform='translateY(-2px)'"
                  onmouseout="this.style.transform='translateY(0)'">
            📱 View in AR
          </button>
        </div>

        <div style="padding: 1.5rem; background: linear-gradient(135deg, #f8fafc, #e2e8f0); border-radius: 1rem; text-align: left;">
          <h4 style="margin-bottom: 1rem; color: #374151; font-size: 1rem; display: flex; align-items: center; gap: 0.5rem;">
            🎮 3D Controls
          </h4>
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 1rem;">
            <div>
              <div style="font-weight: 600; color: #4f46e5; margin-bottom: 0.25rem;">🖱️ Mouse Controls</div>
              <div style="color: #6b7280; font-size: 0.875rem;">Left click + drag to rotate<br>Scroll wheel to zoom</div>
            </div>
            <div>
              <div style="font-weight: 600; color: #4f46e5; margin-bottom: 0.25rem;">📱 Touch Controls</div>
              <div style="color: #6b7280; font-size: 0.875rem;">Swipe to rotate<br>Pinch to zoom in/out</div>
            </div>
            <div>
              <div style="font-weight: 600; color: #4f46e5; margin-bottom: 0.25rem;">⌨️ Keyboard</div>
              <div style="color: #6b7280; font-size: 0.875rem;">Arrow keys to rotate<br>+/- keys to zoom</div>
            </div>
          </div>
        </div>
      </div>
    `;

    modal.innerHTML = content;

    // Initialize enhanced 3D scene after modal is created
    setTimeout(async () => {
      try {
        await this.initEnhanced3DScene();
      } catch (error) {
        console.error("Failed to initialize enhanced 3D scene:", error);
        this.show3DFallback();
      }
    }, 300);
  }

  async initEnhanced3DScene() {
    const container = document.getElementById("3d-container");
    if (!container) {
      console.error("3D container not found");
      return;
    }

    // Double-check Three.js availability
    if (!window.THREE) {
      console.log("Three.js not available, attempting to load...");
      const isLoaded = await this.ensureThreeJSLoaded();
      if (!isLoaded) {
        console.error("Three.js could not be loaded");
        this.show3DFallback();
        return;
      }
    }

    try {
      // Enhanced scene setup
      this.scene = new THREE.Scene();
      this.scene.background = new THREE.Color(0x1a202c);

      // Add fog for depth perception
      this.scene.fog = new THREE.Fog(0x1a202c, 10, 50);

      // Enhanced camera setup
      this.camera = new THREE.PerspectiveCamera(
        60,
        container.offsetWidth / container.offsetHeight,
        0.1,
        1000,
      );
      this.camera.position.set(2, 2, 3);

      // Enhanced renderer setup
      this.renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
      });
      this.renderer.setSize(container.offsetWidth, container.offsetHeight);
      this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

      // Enhanced lighting and shadows
      this.renderer.shadowMap.enabled = true;
      this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
      this.renderer.outputEncoding = THREE.sRGBEncoding;
      this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
      this.renderer.toneMappingExposure = 1.2;

      container.innerHTML = "";
      container.appendChild(this.renderer.domElement);

      // Enhanced lighting setup
      this.setupEnhancedLighting();

      // Create enhanced product model
      this.model = this.createProductModel(this.currentProduct);
      if (this.model) {
        this.model.castShadow = true;
        this.model.receiveShadow = true;
        this.scene.add(this.model);
      }

      // Add environment
      this.addEnvironment();

      // Enhanced controls
      this.setupEnhancedControls(container);

      // Add keyboard controls
      this.setupKeyboardControls();

      // Start enhanced animation loop
      this.startEnhancedAnimation();

      console.log("Enhanced 3D scene initialized successfully");
    } catch (error) {
      console.error("Error initializing enhanced 3D scene:", error);
      this.show3DFallback();
    }
  }

  setupEnhancedLighting() {
    // Ambient light for general illumination
    const ambientLight = new THREE.AmbientLight(0x404040, 0.4);
    this.scene.add(ambientLight);

    // Main directional light
    const mainLight = new THREE.DirectionalLight(0xffffff, 1.0);
    mainLight.position.set(5, 5, 5);
    mainLight.castShadow = true;
    mainLight.shadow.mapSize.width = 2048;
    mainLight.shadow.mapSize.height = 2048;
    mainLight.shadow.camera.near = 0.5;
    mainLight.shadow.camera.far = 50;
    this.scene.add(mainLight);

    // Fill light
    const fillLight = new THREE.DirectionalLight(0x9bb7ff, 0.3);
    fillLight.position.set(-5, 2, -5);
    this.scene.add(fillLight);

    // Rim light
    const rimLight = new THREE.DirectionalLight(0xffffff, 0.5);
    rimLight.position.set(0, 5, -5);
    this.scene.add(rimLight);

    // Point light for highlights
    const pointLight = new THREE.PointLight(0xffffff, 0.6, 10);
    pointLight.position.set(2, 3, 2);
    pointLight.castShadow = true;
    this.scene.add(pointLight);
  }

  addEnvironment() {
    // Add a ground plane
    const groundGeometry = new THREE.PlaneGeometry(20, 20);
    const groundMaterial = new THREE.MeshLambertMaterial({
      color: 0x2d3748,
      transparent: true,
      opacity: 0.5,
    });
    const ground = new THREE.Mesh(groundGeometry, groundMaterial);
    ground.rotation.x = -Math.PI / 2;
    ground.position.y = -1;
    ground.receiveShadow = true;
    this.scene.add(ground);

    // Add some background elements
    for (let i = 0; i < 8; i++) {
      const geometry = new THREE.BoxGeometry(0.1, 0.1, 0.1);
      const material = new THREE.MeshPhongMaterial({
        color: new THREE.Color().setHSL(Math.random(), 0.5, 0.3),
        transparent: true,
        opacity: 0.3,
      });
      const cube = new THREE.Mesh(geometry, material);
      cube.position.set(
        (Math.random() - 0.5) * 10,
        Math.random() * 2,
        (Math.random() - 0.5) * 10,
      );
      cube.rotation.set(
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI,
      );
      this.scene.add(cube);
    }
  }

  setupEnhancedControls(container) {
    if (window.THREE.OrbitControls) {
      this.controls = new THREE.OrbitControls(
        this.camera,
        this.renderer.domElement,
      );
      this.controls.enableDamping = true;
      this.controls.dampingFactor = 0.05;
      this.controls.screenSpacePanning = false;
      this.controls.minDistance = 1;
      this.controls.maxDistance = 10;
      this.controls.maxPolarAngle = Math.PI / 1.8;
      this.controls.autoRotate = true;
      this.controls.autoRotateSpeed = 1.0;
    } else {
      console.warn("OrbitControls not available, using basic mouse controls");
      this.setupBasicControls(container);
    }
  }

  setupBasicControls(container) {
    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };

    container.addEventListener("mousedown", (e) => {
      isDragging = true;
      previousMousePosition = { x: e.clientX, y: e.clientY };
    });

    container.addEventListener("mousemove", (e) => {
      if (!isDragging || !this.model) return;

      const deltaMove = {
        x: e.clientX - previousMousePosition.x,
        y: e.clientY - previousMousePosition.y,
      };

      this.model.rotation.y += deltaMove.x * 0.01;
      this.model.rotation.x += deltaMove.y * 0.01;

      previousMousePosition = { x: e.clientX, y: e.clientY };
    });

    container.addEventListener("mouseup", () => {
      isDragging = false;
    });

    container.addEventListener("wheel", (e) => {
      e.preventDefault();
      if (this.camera) {
        this.camera.position.z += e.deltaY * 0.01;
        this.camera.position.z = Math.max(
          1,
          Math.min(10, this.camera.position.z),
        );
      }
    });
  }

  setupKeyboardControls() {
    document.addEventListener("keydown", (e) => {
      if (!this.model) return;

      switch (e.key) {
        case "ArrowLeft":
          this.model.rotation.y += 0.1;
          break;
        case "ArrowRight":
          this.model.rotation.y -= 0.1;
          break;
        case "ArrowUp":
          this.model.rotation.x += 0.1;
          break;
        case "ArrowDown":
          this.model.rotation.x -= 0.1;
          break;
        case "+":
        case "=":
          if (this.camera) {
            this.camera.position.z = Math.max(1, this.camera.position.z - 0.5);
          }
          break;
        case "-":
          if (this.camera) {
            this.camera.position.z = Math.min(10, this.camera.position.z + 0.5);
          }
          break;
      }
    });
  }

  startEnhancedAnimation() {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }

    const animate = () => {
      this.animationId = requestAnimationFrame(animate);

      if (!this.renderer || !this.scene || !this.camera) return;

      // Enhanced model animation based on product type
      if (this.model && this.model.userData.animationType) {
        this.animateModel();
      }

      // Update controls
      if (this.controls) {
        this.controls.update();
      }

      this.renderer.render(this.scene, this.camera);
    };

    animate();
  }

  animateModel() {
    if (!this.model) return;

    const time = Date.now() * 0.001;
    const animationType = this.model.userData.animationType;

    switch (animationType) {
      case "gentle":
        this.model.rotation.y = Math.sin(time * 0.5) * 0.1;
        this.model.position.y = Math.sin(time * 2) * 0.05;
        break;
      case "bounce":
        this.model.position.y = Math.abs(Math.sin(time * 3)) * 0.3;
        this.model.rotation.y += 0.02;
        break;
      case "playful":
        this.model.rotation.y += 0.03;
        this.model.rotation.z = Math.sin(time * 2) * 0.1;
        break;
      case "elegant":
        this.model.rotation.y += 0.008;
        this.model.position.y = Math.sin(time * 1.5) * 0.02;
        break;
      default:
        this.model.rotation.y += 0.01;
        break;
    }
  }

  toggleAnimation() {
    if (this.controls && this.controls.autoRotate !== undefined) {
      this.controls.autoRotate = !this.controls.autoRotate;
      const button = event.target;
      button.innerHTML = this.controls.autoRotate
        ? "⏸️ Toggle Animation"
        : "▶️ Toggle Animation";
    }
  }

  reset3DView() {
    if (this.camera) {
      this.camera.position.set(2, 2, 3);
      this.camera.lookAt(0, 0, 0);
    }
    if (this.controls) {
      this.controls.reset();
      this.controls.autoRotate = true;
    }
    if (this.model) {
      this.model.rotation.set(0, 0, 0);
      this.model.position.set(0, 0, 0);
    }
  }

  show3DFallback() {
    const container = document.getElementById("3d-container");
    if (container) {
      // Create a simple 2D product visualization as fallback
      const productEmoji = this.getProductEmoji();
      const productGradient = this.getProductGradient();

      container.innerHTML = `
        <div style="
          display: flex;
          align-items: center;
          justify-content: center;
          height: 100%;
          flex-direction: column;
          color: white;
          text-align: center;
          padding: 2rem;
          position: relative;
        ">
          <!-- 2D Product Representation -->
          <div style="
            width: 150px;
            height: 150px;
            background: ${productGradient};
            border-radius: 1rem;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 4rem;
            margin-bottom: 1.5rem;
            box-shadow: 0 10px 30px rgba(0,0,0,0.3);
            animation: float 3s ease-in-out infinite;
            border: 3px solid rgba(255,255,255,0.2);
          ">
            ${productEmoji}
          </div>

          <h3 style="margin-bottom: 0.5rem; font-size: 1.25rem;">${this.currentProduct.name}</h3>
          <p style="font-size: 0.875rem; opacity: 0.8; margin-bottom: 1.5rem;">
            2D Preview Mode - 3D viewer unavailable
          </p>

          <div style="display: flex; gap: 1rem; flex-wrap: wrap; justify-content: center;">
            <button onclick="arViewer.openARViewer(arViewer.currentProduct)"
                    style="
                      background: linear-gradient(135deg, #10b981, #059669);
                      color: white;
                      border: none;
                      padding: 0.75rem 1.5rem;
                      border-radius: 0.75rem;
                      font-weight: 600;
                      cursor: pointer;
                      transition: transform 0.2s;
                    "
                    onmouseover="this.style.transform='translateY(-2px)'"
                    onmouseout="this.style.transform='translateY(0)'">
              📱 Try AR Mode
            </button>

            <button onclick="arViewer.retryThreeJS()"
                    style="
                      background: linear-gradient(135deg, #3b82f6, #1d4ed8);
                      color: white;
                      border: none;
                      padding: 0.75rem 1.5rem;
                      border-radius: 0.75rem;
                      font-weight: 600;
                      cursor: pointer;
                      transition: transform 0.2s;
                    "
                    onmouseover="this.style.transform='translateY(-2px)'"
                    onmouseout="this.style.transform='translateY(0)'">
              🔄 Retry 3D
            </button>
          </div>

          <div style="
            position: absolute;
            bottom: 1rem;
            left: 1rem;
            right: 1rem;
            padding: 1rem;
            background: rgba(0,0,0,0.5);
            border-radius: 0.75rem;
            font-size: 0.75rem;
            opacity: 0.8;
          ">
            💡 Tip: For the best 3D experience, ensure you have a stable internet connection and an updated browser
          </div>
        </div>
      `;
    }
  }

  async retryThreeJS() {
    this.showNotification("Retrying Three.js initialization...", "success");

    // Clear any cached scripts and retry
    const scripts = document.querySelectorAll('script[src*="three"]');
    scripts.forEach((script) => script.remove());

    // Reset Three.js
    window.THREE = undefined;

    try {
      await this.loadThreeJS();
      if (window.THREE) {
        this.showNotification(
          "Three.js loaded successfully! Reopening 3D viewer...",
          "success",
        );
        setTimeout(() => {
          this.open3DViewer(this.currentProduct);
        }, 1000);
      } else {
        this.showNotification(
          "Three.js still unavailable. Try refreshing the page.",
          "error",
        );
      }
    } catch (error) {
      console.error("Retry failed:", error);
      this.showNotification("Retry failed. Please refresh the page.", "error");
    }
  }

  async startARSession() {
    if (!this.isARSupported) {
      this.showNotification("AR is not supported on your device", "error");
      return;
    }

    try {
      // Request camera access with enhanced settings
      const constraints = {
        video: {
          facingMode: "environment",
          width: { ideal: 1280, max: 1920 },
          height: { ideal: 720, max: 1080 },
        },
      };

      const stream = await navigator.mediaDevices.getUserMedia(constraints);

      const arContainer = document.getElementById("ar-container");
      if (arContainer) {
        // Create enhanced video element for camera feed
        const video = document.createElement("video");
        video.srcObject = stream;
        video.autoplay = true;
        video.playsInline = true;
        video.muted = true;
        video.style.cssText = `
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 1rem;
        `;

        // Create enhanced overlay for 3D object placement
        const overlay = document.createElement("div");
        overlay.style.cssText = `
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 120px;
          height: 120px;
          border: 3px solid #10b981;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(16, 185, 129, 0.3), transparent);
          animation: arPulse 2s infinite;
          cursor: pointer;
          transition: all 0.3s ease;
        `;

        const label = document.createElement("div");
        label.textContent = `Place ${this.currentProduct.name}`;
        label.style.cssText = `
          position: absolute;
          bottom: -40px;
          left: 50%;
          transform: translateX(-50%);
          background: linear-gradient(135deg, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.6));
          color: white;
          padding: 0.5rem 1rem;
          border-radius: 1rem;
          font-size: 0.875rem;
          font-weight: 600;
          white-space: nowrap;
          backdrop-filter: blur(10px);
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
        `;

        overlay.appendChild(label);

        // Add AR instructions overlay
        const instructions = document.createElement("div");
        instructions.style.cssText = `
          position: absolute;
          top: 1rem;
          left: 1rem;
          right: 1rem;
          background: linear-gradient(135deg, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.5));
          color: white;
          padding: 1rem;
          border-radius: 0.75rem;
          font-size: 0.875rem;
          backdrop-filter: blur(10px);
          animation: slideDown 0.5s ease-out;
        `;
        instructions.innerHTML = `
          <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.5rem;">
            <span style="font-size: 1.25rem;">📍</span>
            <span style="font-weight: 600;">AR Instructions</span>
          </div>
          <p style="margin: 0; line-height: 1.4;">
            Point your camera at a flat surface like a table or floor, then tap the green circle to place your ${this.currentProduct.name}
          </p>
        `;

        arContainer.innerHTML = "";
        arContainer.appendChild(video);
        arContainer.appendChild(overlay);
        arContainer.appendChild(instructions);

        // Enhanced tap to place functionality
        overlay.onclick = () => this.placeEnhancedARObject();

        // Auto-hide instructions after 5 seconds
        setTimeout(() => {
          if (instructions.parentNode) {
            instructions.style.animation = "slideUp 0.5s ease-out";
            setTimeout(() => instructions.remove(), 500);
          }
        }, 5000);

        this.showNotification(
          "AR session started! Point camera at a flat surface and tap to place",
          "success",
        );
      }
    } catch (error) {
      console.error("Failed to start AR session:", error);
      this.showNotification(
        "Failed to access camera. Please allow camera permissions and try again.",
        "error",
      );
    }
  }

  placeEnhancedARObject() {
    const overlay = document.querySelector("#ar-container div");
    if (overlay) {
      // Create enhanced placed object with better 3D appearance
      const placedObject = document.createElement("div");
      placedObject.style.cssText = `
        position: absolute;
        top: 60%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 100px;
        height: 100px;
        background: ${this.getProductGradient()};
        border-radius: 1rem;
        box-shadow:
          0 20px 40px rgba(0, 0, 0, 0.4),
          0 8px 16px rgba(0, 0, 0, 0.2),
          inset 0 2px 4px rgba(255, 255, 255, 0.2);
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        font-weight: bold;
        font-size: 2rem;
        cursor: move;
        user-select: none;
        animation: placeObjectEnhanced 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        border: 2px solid rgba(255, 255, 255, 0.3);
      `;

      // Add product emoji and name
      placedObject.innerHTML = `
        <div style="text-align: center;">
          <div style="font-size: 2rem; margin-bottom: 0.25rem;">${this.getProductEmoji()}</div>
          <div style="font-size: 0.5rem; opacity: 0.9; font-weight: 600;">${this.currentProduct.name.split(" ")[0]}</div>
        </div>
      `;

      // Add enhanced drag functionality with physics
      this.makeDraggableEnhanced(placedObject);

      // Add resize functionality
      this.makeResizable(placedObject);

      overlay.style.display = "none";
      document.getElementById("ar-container").appendChild(placedObject);

      // Add floating action buttons
      this.addARActionButtons(placedObject);

      this.showNotification(
        "Object placed! Drag to move, pinch to resize, or use action buttons",
        "success",
      );
    }
  }

  makeDraggableEnhanced(element) {
    let isDragging = false;
    let startPos = { x: 0, y: 0 };
    let elementPos = { x: 0, y: 0 };

    const startDrag = (e) => {
      isDragging = true;
      element.style.zIndex = "1000";

      const rect = element.getBoundingClientRect();
      const clientX = e.type.includes("mouse")
        ? e.clientX
        : e.touches[0].clientX;
      const clientY = e.type.includes("mouse")
        ? e.clientY
        : e.touches[0].clientY;

      startPos = { x: clientX, y: clientY };
      elementPos = {
        x: parseFloat(element.style.left) || rect.left,
        y: parseFloat(element.style.top) || rect.top,
      };

      element.style.transition = "none";
      element.style.transform = "translate(-50%, -50%) scale(1.05)";
    };

    const drag = (e) => {
      if (!isDragging) return;
      e.preventDefault();

      const clientX = e.type.includes("mouse")
        ? e.clientX
        : e.touches[0].clientX;
      const clientY = e.type.includes("mouse")
        ? e.clientY
        : e.touches[0].clientY;

      const deltaX = clientX - startPos.x;
      const deltaY = clientY - startPos.y;

      element.style.left = elementPos.x + deltaX + "px";
      element.style.top = elementPos.y + deltaY + "px";
    };

    const stopDrag = () => {
      if (isDragging) {
        isDragging = false;
        element.style.transition = "transform 0.2s ease";
        element.style.transform = "translate(-50%, -50%) scale(1)";
        element.style.zIndex = "auto";
      }
    };

    element.addEventListener("mousedown", startDrag);
    element.addEventListener("touchstart", startDrag);
    document.addEventListener("mousemove", drag);
    document.addEventListener("touchmove", drag);
    document.addEventListener("mouseup", stopDrag);
    document.addEventListener("touchend", stopDrag);
  }

  makeResizable(element) {
    let startScale = 1;
    let startDistance = 0;

    const handleTouch = (e) => {
      if (e.touches.length === 2) {
        e.preventDefault();

        const distance = Math.hypot(
          e.touches[0].pageX - e.touches[1].pageX,
          e.touches[0].pageY - e.touches[1].pageY,
        );

        if (startDistance === 0) {
          startDistance = distance;
          startScale = parseFloat(
            element.style.transform.match(/scale\(([^)]+)\)/)?.[1] || 1,
          );
        } else {
          const scale = Math.max(
            0.5,
            Math.min(2, startScale * (distance / startDistance)),
          );
          const translatePart =
            element.style.transform.match(/translate\([^)]+\)/)?.[0] ||
            "translate(-50%, -50%)";
          element.style.transform = `${translatePart} scale(${scale})`;
        }
      }
    };

    const resetScale = () => {
      startDistance = 0;
    };

    element.addEventListener("touchmove", handleTouch);
    element.addEventListener("touchend", resetScale);
  }

  addARActionButtons(placedObject) {
    const buttonContainer = document.createElement("div");
    buttonContainer.style.cssText = `
      position: absolute;
      bottom: 1rem;
      left: 50%;
      transform: translateX(-50%);
      display: flex;
      gap: 0.5rem;
      background: rgba(0, 0, 0, 0.7);
      backdrop-filter: blur(10px);
      padding: 0.75rem;
      border-radius: 2rem;
      animation: slideUp 0.5s ease-out;
    `;

    const buttons = [
      {
        icon: "🔄",
        text: "Rotate",
        action: () => this.rotateARObject(placedObject),
      },
      {
        icon: "📏",
        text: "Resize",
        action: () => this.resizeARObject(placedObject),
      },
      {
        icon: "🗑️",
        text: "Remove",
        action: () => this.removeARObject(placedObject, buttonContainer),
      },
    ];

    buttons.forEach(({ icon, text, action }) => {
      const button = document.createElement("button");
      button.style.cssText = `
        background: linear-gradient(135deg, #4f46e5, #7c3aed);
        color: white;
        border: none;
        padding: 0.5rem 1rem;
        border-radius: 1rem;
        font-size: 0.875rem;
        font-weight: 600;
        cursor: pointer;
        display: flex;
        align-items: center;
        gap: 0.25rem;
        transition: transform 0.2s;
      `;
      button.innerHTML = `${icon} ${text}`;
      button.onclick = action;
      button.onmouseover = () => (button.style.transform = "scale(1.05)");
      button.onmouseout = () => (button.style.transform = "scale(1)");

      buttonContainer.appendChild(button);
    });

    document.getElementById("ar-container").appendChild(buttonContainer);
  }

  rotateARObject(element) {
    const currentRotation = element.style.transform.match(/rotate\(([^)]+)\)/);
    const rotation = currentRotation ? parseFloat(currentRotation[1]) : 0;
    const newRotation = rotation + 45;

    const otherTransforms = element.style.transform
      .replace(/rotate\([^)]+\)/, "")
      .trim();
    element.style.transform = `${otherTransforms} rotate(${newRotation}deg)`;
  }

  resizeARObject(element) {
    const currentScale = element.style.transform.match(/scale\(([^)]+)\)/);
    const scale = currentScale ? parseFloat(currentScale[1]) : 1;
    const newScale = scale >= 2 ? 0.5 : scale + 0.25;

    const otherTransforms = element.style.transform
      .replace(/scale\([^)]+\)/, "")
      .trim();
    element.style.transform = `${otherTransforms} scale(${newScale})`;
  }

  removeARObject(element, buttonContainer) {
    element.style.animation = "fadeOut 0.3s ease-out";
    buttonContainer.style.animation = "slideDown 0.3s ease-out";

    setTimeout(() => {
      element.remove();
      buttonContainer.remove();

      // Show placement overlay again
      const overlay = document.querySelector("#ar-container div");
      if (overlay) {
        overlay.style.display = "block";
      }
    }, 300);
  }

  getProductGradient() {
    const category = this.currentProduct.category.toLowerCase();
    if (category.includes("electronics"))
      return "linear-gradient(135deg, #3b82f6, #1e40af, #1d4ed8)";
    if (category.includes("fashion"))
      return "linear-gradient(135deg, #ef4444, #dc2626, #b91c1c)";
    if (category.includes("home"))
      return "linear-gradient(135deg, #10b981, #059669, #047857)";
    if (category.includes("toys"))
      return "linear-gradient(135deg, #f59e0b, #d97706, #b45309)";
    if (category.includes("beauty"))
      return "linear-gradient(135deg, #8b5cf6, #7c3aed, #6d28d9)";
    if (category.includes("sports"))
      return "linear-gradient(135deg, #f97316, #ea580c, #c2410c)";
    return "linear-gradient(135deg, #6b7280, #4b5563, #374151)";
  }

  getProductEmoji() {
    const name = this.currentProduct.name.toLowerCase();
    const category = this.currentProduct.category.toLowerCase();

    if (name.includes("phone") || name.includes("mobile")) return "📱";
    if (name.includes("laptop") || name.includes("computer")) return "💻";
    if (name.includes("headphone") || name.includes("earbuds")) return "🎧";
    if (name.includes("shoes") || name.includes("sneakers")) return "👟";
    if (name.includes("dress") || name.includes("gown")) return "👗";
    if (name.includes("jeans") || name.includes("pants")) return "👖";
    if (name.includes("shirt") || name.includes("top")) return "👕";
    if (name.includes("bottle") || name.includes("water")) return "🍼";
    if (name.includes("cooker") || name.includes("pressure")) return "🍲";
    if (name.includes("car") || name.includes("vehicle")) return "🚗";
    if (name.includes("ball")) return "⚽";
    if (name.includes("dumbbell") || name.includes("weight")) return "🏋️";
    if (category.includes("toys")) return "🧸";
    if (category.includes("beauty")) return "💄";
    if (category.includes("books")) return "📚";
    if (category.includes("groceries")) return "🛒";

    return "📦";
  }

  createModal(title, id) {
    // Remove existing modal
    this.closeModal();

    // Create backdrop
    const backdrop = document.createElement("div");
    backdrop.id = "arModalBackdrop";
    backdrop.style.cssText = `
      position: fixed;
      inset: 0;
      background: rgba(0, 0, 0, 0.6);
      z-index: 9999;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 1rem;
      backdrop-filter: blur(5px);
    `;
    backdrop.onclick = (e) => {
      if (e.target === backdrop) this.closeModal();
    };

    // Create modal
    const modal = document.createElement("div");
    modal.id = id;
    modal.style.cssText = `
      background: linear-gradient(135deg, #ffffff, #f8fafc);
      border-radius: 1.5rem;
      box-shadow: 0 25px 50px rgba(0, 0, 0, 0.25);
      max-width: 700px;
      width: 100%;
      max-height: 90vh;
      overflow-y: auto;
      position: relative;
      animation: modalSlideIn 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    `;

    // Add close button
    const closeButton = document.createElement("button");
    closeButton.innerHTML = "×";
    closeButton.style.cssText = `
      position: absolute;
      top: 1rem;
      right: 1rem;
      background: linear-gradient(135deg, rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.05));
      border: none;
      border-radius: 50%;
      width: 2.5rem;
      height: 2.5rem;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.5rem;
      cursor: pointer;
      z-index: 10;
      transition: all 0.2s;
      backdrop-filter: blur(10px);
    `;
    closeButton.onmouseover = () => {
      closeButton.style.background =
        "linear-gradient(135deg, rgba(239, 68, 68, 0.2), rgba(220, 38, 38, 0.1))";
      closeButton.style.transform = "scale(1.1)";
    };
    closeButton.onmouseout = () => {
      closeButton.style.background =
        "linear-gradient(135deg, rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.05))";
      closeButton.style.transform = "scale(1)";
    };
    closeButton.onclick = () => this.closeModal();

    modal.appendChild(closeButton);
    backdrop.appendChild(modal);
    document.body.appendChild(backdrop);

    // Add enhanced animation styles
    this.addEnhancedStyles();

    return modal;
  }

  addEnhancedStyles() {
    if (document.getElementById("arViewerStyles")) return;

    const style = document.createElement("style");
    style.id = "arViewerStyles";
    style.textContent = `
      @keyframes modalSlideIn {
        from {
          opacity: 0;
          transform: scale(0.8) translateY(100px);
        }
        to {
          opacity: 1;
          transform: scale(1) translateY(0);
        }
      }

      @keyframes arPulse {
        0%, 100% {
          opacity: 1;
          transform: translate(-50%, -50%) scale(1);
          border-color: #10b981;
        }
        50% {
          opacity: 0.7;
          transform: translate(-50%, -50%) scale(1.1);
          border-color: #34d399;
        }
      }

      @keyframes placeObjectEnhanced {
        from {
          opacity: 0;
          transform: translate(-50%, -50%) scale(0) rotate(180deg);
        }
        70% {
          transform: translate(-50%, -50%) scale(1.1) rotate(0deg);
        }
        to {
          opacity: 1;
          transform: translate(-50%, -50%) scale(1) rotate(0deg);
        }
      }

      @keyframes float {
        0%, 100% { transform: translateY(0px); }
        50% { transform: translateY(-10px); }
      }

      @keyframes spin {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
      }

      @keyframes loading {
        0% { transform: translateX(-100%); }
        100% { transform: translateX(100%); }
      }

      @keyframes slideDown {
        from {
          opacity: 0;
          transform: translateY(-20px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }

      @keyframes slideUp {
        from {
          opacity: 0;
          transform: translateY(20px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }

      @keyframes fadeOut {
        from {
          opacity: 1;
          transform: translate(-50%, -50%) scale(1);
        }
        to {
          opacity: 0;
          transform: translate(-50%, -50%) scale(0.5);
        }
      }

      /* Scrollbar styling for modal */
      #ar-modal::-webkit-scrollbar,
      #3d-modal::-webkit-scrollbar {
        width: 8px;
      }

      #ar-modal::-webkit-scrollbar-track,
      #3d-modal::-webkit-scrollbar-track {
        background: #f1f5f9;
        border-radius: 4px;
      }

      #ar-modal::-webkit-scrollbar-thumb,
      #3d-modal::-webkit-scrollbar-thumb {
        background: linear-gradient(135deg, #3b82f6, #1d4ed8);
        border-radius: 4px;
      }
    `;
    document.head.appendChild(style);
  }

  closeModal() {
    const backdrop = document.getElementById("arModalBackdrop");
    if (backdrop) {
      backdrop.style.animation = "modalSlideIn 0.3s ease-out reverse";
      setTimeout(() => backdrop.remove(), 300);
    }

    // Clean up 3D scene and animation
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
      this.animationId = null;
    }

    if (this.renderer) {
      this.renderer.dispose();
      this.renderer = null;
    }

    if (this.scene) {
      // Dispose of all geometries and materials
      this.scene.traverse((object) => {
        if (object.geometry) {
          object.geometry.dispose();
        }
        if (object.material) {
          if (object.material.map) object.material.map.dispose();
          object.material.dispose();
        }
      });
      this.scene = null;
    }

    if (this.controls) {
      this.controls.dispose();
      this.controls = null;
    }

    // Stop any camera streams
    const videos = document.querySelectorAll("video");
    videos.forEach((video) => {
      if (video.srcObject) {
        video.srcObject.getTracks().forEach((track) => track.stop());
      }
    });
  }

  showNotification(message, type = "success") {
    const notification = document.createElement("div");
    notification.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: ${
        type === "success"
          ? "linear-gradient(135deg, #10b981, #059669)"
          : "linear-gradient(135deg, #ef4444, #dc2626)"
      };
      color: white;
      padding: 1rem 1.5rem;
      border-radius: 1rem;
      box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
      z-index: 10000;
      font-weight: 600;
      max-width: 350px;
      animation: slideIn 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
      backdrop-filter: blur(10px);
      border: 1px solid rgba(255, 255, 255, 0.2);
    `;

    notification.innerHTML = `
      <div style="display: flex; align-items: center; gap: 0.5rem;">
        <span style="font-size: 1.25rem;">${type === "success" ? "✅" : "❌"}</span>
        <span>${message}</span>
      </div>
    `;

    document.body.appendChild(notification);

    setTimeout(() => {
      if (notification.parentNode) {
        notification.style.animation = "slideIn 0.4s ease-out reverse";
        setTimeout(() => notification.remove(), 400);
      }
    }, 4000);
  }
}

// Initialize enhanced AR viewer when DOM is loaded
let arViewer;
document.addEventListener("DOMContentLoaded", function () {
  arViewer = new ARViewer();
});

// Export for global use
window.arViewer = arViewer;
