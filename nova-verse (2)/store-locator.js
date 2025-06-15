// Store Locator and Bargaining System for Product Negotiation
class StoreBargainingSystem {
  constructor() {
    this.userLocation = null;
    this.currentProduct = null;
    this.activeChats = new Map();
    this.stores = this.initializeStoreDatabase();
    this.chatMessages = new Map();
    this.init();
  }

  async init() {
    // Request user location permission
    await this.requestLocation();
    console.log("Store Bargaining System initialized");
  }

  // Initialize realistic Indian store database
  initializeStoreDatabase() {
    return [
      {
        id: "store_001",
        name: "Sharma Electronics",
        category: ["Electronics"],
        address: "Shop 15, Karol Bagh Market, New Delhi",
        phone: "+91 9876543210",
        whatsapp: "+91 9876543210",
        location: { lat: 28.6519, lng: 77.1909 },
        rating: 4.2,
        discount: "5-15%",
        manager: "Raj Sharma",
        timings: "10:00 AM - 9:00 PM",
        isOnline: true,
        responseTime: "Usually responds in 5-10 minutes",
      },
      {
        id: "store_002",
        name: "Fashion Hub Mumbai",
        category: ["Fashion"],
        address: "Unit 203, Linking Road, Bandra West, Mumbai",
        phone: "+91 9123456789",
        whatsapp: "+91 9123456789",
        location: { lat: 19.0596, lng: 72.8295 },
        rating: 4.5,
        discount: "10-25%",
        manager: "Priya Mehta",
        timings: "11:00 AM - 10:00 PM",
        isOnline: true,
        responseTime: "Usually responds in 2-5 minutes",
      },
      {
        id: "store_003",
        name: "Kitchen King",
        category: ["Home & Kitchen"],
        address: "12/A, Commercial Street, Bangalore",
        phone: "+91 9987654321",
        whatsapp: "+91 9987654321",
        location: { lat: 12.9716, lng: 77.5946 },
        rating: 4.0,
        discount: "8-20%",
        manager: "Suresh Kumar",
        timings: "9:30 AM - 8:30 PM",
        isOnline: false,
        responseTime: "Usually responds in 10-15 minutes",
      },
      {
        id: "store_004",
        name: "Sports Zone Pune",
        category: ["Sports & Fitness"],
        address: "FC Road, Near Deccan Gymkhana, Pune",
        phone: "+91 9456789123",
        whatsapp: "+91 9456789123",
        location: { lat: 18.5204, lng: 73.8567 },
        rating: 4.3,
        discount: "12-18%",
        manager: "Amit Patil",
        timings: "10:00 AM - 9:30 PM",
        isOnline: true,
        responseTime: "Usually responds in 3-8 minutes",
      },
      {
        id: "store_005",
        name: "Beauty Palace Kolkata",
        category: ["Beauty & Personal Care"],
        address: "Park Street, Near Indian Museum, Kolkata",
        phone: "+91 9321654987",
        whatsapp: "+91 9321654987",
        location: { lat: 22.5726, lng: 88.3639 },
        rating: 4.4,
        discount: "15-30%",
        manager: "Sneha Chatterjee",
        timings: "10:30 AM - 9:00 PM",
        isOnline: true,
        responseTime: "Usually responds in 1-3 minutes",
      },
      {
        id: "store_006",
        name: "Book Corner Chennai",
        category: ["Books & Stationery"],
        address: "T. Nagar, Near Pondy Bazaar, Chennai",
        phone: "+91 9654321789",
        whatsapp: "+91 9654321789",
        location: { lat: 13.0827, lng: 80.2707 },
        rating: 4.1,
        discount: "5-12%",
        manager: "Ravi Krishnan",
        timings: "9:00 AM - 8:00 PM",
        isOnline: true,
        responseTime: "Usually responds in 5-12 minutes",
      },
      {
        id: "store_007",
        name: "Toy World Hyderabad",
        category: ["Toys & Games"],
        address: "Abids Main Road, Near GPO, Hyderabad",
        phone: "+91 9789456123",
        whatsapp: "+91 9789456123",
        location: { lat: 17.385, lng: 78.4867 },
        rating: 4.2,
        discount: "10-22%",
        manager: "Sanjay Reddy",
        timings: "10:00 AM - 9:00 PM",
        isOnline: false,
        responseTime: "Usually responds in 8-15 minutes",
      },
      {
        id: "store_008",
        name: "Fresh Mart Jaipur",
        category: ["Groceries & Food"],
        address: "MI Road, Near Raj Mandir Cinema, Jaipur",
        phone: "+91 9123987456",
        whatsapp: "+91 9123987456",
        location: { lat: 26.9124, lng: 75.7873 },
        rating: 4.0,
        discount: "3-8%",
        manager: "Deepak Agarwal",
        timings: "8:00 AM - 10:00 PM",
        isOnline: true,
        responseTime: "Usually responds in 5-10 minutes",
      },
      // Additional stores for better coverage
      {
        id: "store_009",
        name: "Mobile Corner Delhi",
        category: ["Electronics"],
        address: "Nehru Place, South Delhi",
        phone: "+91 9876123456",
        whatsapp: "+91 9876123456",
        location: { lat: 28.5495, lng: 77.2482 },
        rating: 4.3,
        discount: "8-18%",
        manager: "Vikash Singh",
        timings: "10:30 AM - 8:30 PM",
        isOnline: true,
        responseTime: "Usually responds in 2-7 minutes",
      },
      {
        id: "store_010",
        name: "Style Station Mumbai",
        category: ["Fashion"],
        address: "Phoenix Mills, Lower Parel, Mumbai",
        phone: "+91 9456123789",
        whatsapp: "+91 9456123789",
        location: { lat: 19.0132, lng: 72.8342 },
        rating: 4.6,
        discount: "12-28%",
        manager: "Kavya Shah",
        timings: "11:00 AM - 11:00 PM",
        isOnline: true,
        responseTime: "Usually responds in 1-4 minutes",
      },
    ];
  }

  async requestLocation() {
    if (navigator.geolocation) {
      try {
        const position = await new Promise((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject, {
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 300000,
          });
        });

        this.userLocation = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };

        console.log("User location obtained:", this.userLocation);
      } catch (error) {
        console.warn("Location access denied:", error);
        // Use default location (Delhi) if user denies location
        this.userLocation = { lat: 28.6139, lng: 77.209 };
      }
    } else {
      console.warn("Geolocation not supported");
      this.userLocation = { lat: 28.6139, lng: 77.209 };
    }
  }

  // Calculate distance between two coordinates
  calculateDistance(lat1, lng1, lat2, lng2) {
    const R = 6371; // Earth's radius in kilometers
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLng = ((lng2 - lng1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLng / 2) *
        Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distance in kilometers
  }

  // Find nearby stores for a product
  findNearbyStores(product, maxDistance = 50) {
    if (!this.userLocation) {
      console.warn("User location not available");
      return this.stores.slice(0, 3); // Return first 3 stores as fallback
    }

    const productCategory = product.category;
    const nearbyStores = this.stores
      .filter((store) => store.category.includes(productCategory))
      .map((store) => ({
        ...store,
        distance: this.calculateDistance(
          this.userLocation.lat,
          this.userLocation.lng,
          store.location.lat,
          store.location.lng,
        ),
      }))
      .filter((store) => store.distance <= maxDistance)
      .sort((a, b) => a.distance - b.distance);

    return nearbyStores.length > 0
      ? nearbyStores
      : this.stores
          .filter((store) => store.category.includes(productCategory))
          .slice(0, 3);
  }

  // Open bargaining interface
  openBargainingInterface(product) {
    this.currentProduct = product;
    const nearbyStores = this.findNearbyStores(product);
    this.createBargainingModal(nearbyStores);
  }

  createBargainingModal(stores) {
    // Remove existing modal
    this.closeBargainingModal();

    // Create backdrop
    const backdrop = document.createElement("div");
    backdrop.id = "bargainingModalBackdrop";
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
      if (e.target === backdrop) this.closeBargainingModal();
    };

    // Create modal
    const modal = document.createElement("div");
    modal.id = "bargainingModal";
    modal.style.cssText = `
      background: linear-gradient(135deg, #ffffff, #f8fafc);
      border-radius: 1.5rem;
      box-shadow: 0 25px 50px rgba(0, 0, 0, 0.25);
      max-width: 900px;
      width: 100%;
      max-height: 90vh;
      overflow-y: auto;
      position: relative;
      animation: modalSlideIn 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    `;

    // Create content
    const content = this.createBargainingContent(stores);
    modal.innerHTML = content;

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
    `;
    closeButton.onclick = () => this.closeBargainingModal();

    modal.appendChild(closeButton);
    backdrop.appendChild(modal);
    document.body.appendChild(backdrop);

    // Add styles if not already added
    this.addBargainingStyles();
  }

  createBargainingContent(stores) {
    const hasStores = stores.length > 0;

    return `
      <div style="padding: 2rem;">
        <div style="text-align: center; margin-bottom: 2rem;">
          <h2 style="font-size: 1.5rem; font-weight: 700; color: #1f2937; margin-bottom: 0.5rem;">
            🛒 Bargain for ${this.currentProduct.name}
          </h2>
          <p style="color: #6b7280; font-size: 0.95rem;">
            Chat with nearby stores to negotiate the best price!
          </p>
        </div>

        <div style="background: linear-gradient(135deg, #f0f9ff, #e0f2fe); border-radius: 1rem; padding: 1.5rem; margin-bottom: 2rem;">
          <div style="display: flex; align-items: center; gap: 1rem; margin-bottom: 1rem;">
            <div style="
              width: 80px;
              height: 80px;
              border-radius: 0.75rem;
              background: white;
              display: flex;
              align-items: center;
              justify-content: center;
              box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            ">
              <img src="${this.currentProduct.image}" 
                   alt="${this.currentProduct.name}"
                   style="width: 60px; height: 60px; object-fit: cover; border-radius: 0.5rem;">
            </div>
            <div>
              <h3 style="font-weight: 600; color: #1f2937; margin-bottom: 0.25rem;">${this.currentProduct.name}</h3>
              <p style="color: #059669; font-weight: 600; font-size: 1.1rem; margin-bottom: 0.25rem;">₹${this.currentProduct.price}</p>
              <p style="color: #6b7280; font-size: 0.875rem;">Current online price</p>
            </div>
          </div>
          <div style="
            background: rgba(16, 185, 129, 0.1);
            border: 1px solid rgba(16, 185, 129, 0.3);
            border-radius: 0.75rem;
            padding: 1rem;
            text-align: center;
          ">
            <p style="color: #065f46; font-weight: 600; margin-bottom: 0.25rem;">💰 Potential Savings</p>
            <p style="color: #374151; font-size: 0.875rem;">
              Negotiate with local stores and save ₹${Math.round(this.currentProduct.price * 0.1)} - ₹${Math.round(this.currentProduct.price * 0.25)}
            </p>
          </div>
        </div>

        ${
          hasStores
            ? `
          <div style="margin-bottom: 1.5rem;">
            <h3 style="font-size: 1.25rem; font-weight: 600; color: #1f2937; margin-bottom: 1rem; display: flex; align-items: center; gap: 0.5rem;">
              📍 Nearby Stores (${stores.length} found)
            </h3>
            <div style="display: grid; gap: 1rem;">
              ${stores.map((store) => this.createStoreCard(store)).join("")}
            </div>
          </div>
        `
            : `
          <div style="text-align: center; padding: 2rem; background: #f9fafb; border-radius: 1rem; margin-bottom: 1.5rem;">
            <div style="font-size: 3rem; margin-bottom: 1rem;">🔍</div>
            <h3 style="color: #374151; margin-bottom: 0.5rem;">No nearby stores found</h3>
            <p style="color: #6b7280; font-size: 0.875rem; margin-bottom: 1.5rem;">
              We couldn't find stores in your area for this product category.
            </p>
            <button onclick="storeBargaining.findAlternativeStores()" style="
              background: linear-gradient(135deg, #3b82f6, #1d4ed8);
              color: white;
              border: none;
              padding: 0.75rem 1.5rem;
              border-radius: 0.75rem;
              font-weight: 600;
              cursor: pointer;
            ">
              🌍 Search in All Cities
            </button>
          </div>
        `
        }

        <div style="
          background: linear-gradient(135deg, #fef3c7, #fde68a);
          border-radius: 1rem;
          padding: 1.5rem;
          border: 1px solid rgba(245, 158, 11, 0.3);
        ">
          <h4 style="color: #92400e; font-weight: 600; margin-bottom: 1rem; display: flex; align-items: center; gap: 0.5rem;">
            💡 Bargaining Tips
          </h4>
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 1rem;">
            <div>
              <div style="font-weight: 600; color: #b45309; margin-bottom: 0.25rem;">🤝 Be Polite</div>
              <div style="color: #78350f; font-size: 0.875rem;">Start with a friendly greeting and show genuine interest</div>
            </div>
            <div>
              <div style="font-weight: 600; color: #b45309; margin-bottom: 0.25rem;">💬 Ask Questions</div>
              <div style="color: #78350f; font-size: 0.875rem;">Inquire about bulk discounts, warranty, and delivery options</div>
            </div>
            <div>
              <div style="font-weight: 600; color: #b45309; margin-bottom: 0.25rem;">📊 Compare Prices</div>
              <div style="color: #78350f; font-size: 0.875rem;">Mention online prices to negotiate better deals</div>
            </div>
            <div>
              <div style="font-weight: 600; color: #b45309; margin-bottom: 0.25rem;">⏰ Be Patient</div>
              <div style="color: #78350f; font-size: 0.875rem;">Good deals take time - don't rush the conversation</div>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  createStoreCard(store) {
    const distance = store.distance
      ? `${store.distance.toFixed(1)} km away`
      : "";
    const onlineStatus = store.isOnline
      ? '<span style="color: #059669; font-weight: 600;">🟢 Online</span>'
      : '<span style="color: #dc2626; font-weight: 600;">🔴 Offline</span>';

    return `
      <div style="
        background: white;
        border-radius: 1rem;
        padding: 1.5rem;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
        border: 1px solid #e5e7eb;
        transition: all 0.2s;
      " onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 8px 15px rgba(0, 0, 0, 0.1)'" 
         onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 4px 6px rgba(0, 0, 0, 0.05)'">
        
        <div style="display: flex; justify-content: between; align-items: start; margin-bottom: 1rem;">
          <div style="flex: 1;">
            <h4 style="font-weight: 600; color: #1f2937; margin-bottom: 0.25rem; font-size: 1.1rem;">
              ${store.name}
            </h4>
            <p style="color: #6b7280; font-size: 0.875rem; margin-bottom: 0.5rem;">
              📍 ${store.address}
            </p>
            ${distance ? `<p style="color: #059669; font-size: 0.875rem; font-weight: 500;">${distance}</p>` : ""}
          </div>
          <div style="text-align: right;">
            <div style="display: flex; align-items: center; gap: 0.25rem; margin-bottom: 0.25rem;">
              <span style="color: #f59e0b;">⭐</span>
              <span style="font-weight: 600; color: #1f2937;">${store.rating}</span>
            </div>
            ${onlineStatus}
          </div>
        </div>

        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(120px, 1fr)); gap: 0.75rem; margin-bottom: 1.5rem;">
          <div style="text-align: center; padding: 0.75rem; background: #f0f9ff; border-radius: 0.75rem;">
            <div style="font-weight: 600; color: #1e40af; font-size: 0.875rem;">Manager</div>
            <div style="color: #374151; font-size: 0.875rem;">${store.manager}</div>
          </div>
          <div style="text-align: center; padding: 0.75rem; background: #f0fdf4; border-radius: 0.75rem;">
            <div style="font-weight: 600; color: #166534; font-size: 0.875rem;">Discount</div>
            <div style="color: #374151; font-size: 0.875rem;">${store.discount}</div>
          </div>
          <div style="text-align: center; padding: 0.75rem; background: #fef3c7; border-radius: 0.75rem;">
            <div style="font-weight: 600; color: #92400e; font-size: 0.875rem;">Timings</div>
            <div style="color: #374151; font-size: 0.875rem;">${store.timings}</div>
          </div>
        </div>

        <div style="margin-bottom: 1rem;">
          <p style="color: #6b7280; font-size: 0.875rem; display: flex; align-items: center; gap: 0.5rem;">
            ⏱️ ${store.responseTime}
          </p>
        </div>

        <div style="display: flex; gap: 0.75rem; flex-wrap: wrap;">
          <button onclick="storeBargaining.startChat('${store.id}')" style="
            background: linear-gradient(135deg, #10b981, #059669);
            color: white;
            border: none;
            padding: 0.75rem 1.25rem;
            border-radius: 0.75rem;
            font-weight: 600;
            cursor: pointer;
            display: flex;
            align-items: center;
            gap: 0.5rem;
            transition: transform 0.2s;
            flex: 1;
            justify-content: center;
          " onmouseover="this.style.transform='scale(1.02)'" onmouseout="this.style.transform='scale(1)'">
            💬 Start Chat
          </button>
          
          <a href="tel:${store.phone}" style="
            background: linear-gradient(135deg, #3b82f6, #1d4ed8);
            color: white;
            border: none;
            padding: 0.75rem 1.25rem;
            border-radius: 0.75rem;
            font-weight: 600;
            cursor: pointer;
            display: flex;
            align-items: center;
            gap: 0.5rem;
            text-decoration: none;
            transition: transform 0.2s;
            justify-content: center;
          " onmouseover="this.style.transform='scale(1.02)'" onmouseout="this.style.transform='scale(1)'">
            📞 Call
          </a>

          <a href="https://wa.me/${store.whatsapp.replace(/[^0-9]/g, "")}?text=Hi, I'm interested in ${encodeURIComponent(this.currentProduct.name)} for ₹${this.currentProduct.price}. Can we negotiate?" 
             target="_blank" style="
            background: linear-gradient(135deg, #059669, #047857);
            color: white;
            border: none;
            padding: 0.75rem 1.25rem;
            border-radius: 0.75rem;
            font-weight: 600;
            cursor: pointer;
            display: flex;
            align-items: center;
            gap: 0.5rem;
            text-decoration: none;
            transition: transform 0.2s;
            justify-content: center;
          " onmouseover="this.style.transform='scale(1.02)'" onmouseout="this.style.transform='scale(1)'">
            📱 WhatsApp
          </a>
        </div>
      </div>
    `;
  }

  findAlternativeStores() {
    const allStores = this.stores.filter((store) =>
      store.category.includes(this.currentProduct.category),
    );

    this.closeBargainingModal();
    setTimeout(() => {
      this.createBargainingModal(allStores);
    }, 300);
  }

  startChat(storeId) {
    const store = this.stores.find((s) => s.id === storeId);
    if (!store) return;

    this.createChatInterface(store);
  }

  createChatInterface(store) {
    // Close bargaining modal
    this.closeBargainingModal();

    // Create chat modal
    const backdrop = document.createElement("div");
    backdrop.id = "chatModalBackdrop";
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

    const modal = document.createElement("div");
    modal.id = "chatModal";
    modal.style.cssText = `
      background: white;
      border-radius: 1.5rem;
      box-shadow: 0 25px 50px rgba(0, 0, 0, 0.25);
      width: 100%;
      max-width: 600px;
      height: 80vh;
      display: flex;
      flex-direction: column;
      animation: modalSlideIn 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    `;

    modal.innerHTML = this.createChatContent(store);

    // Add close button
    const closeButton = document.createElement("button");
    closeButton.innerHTML = "×";
    closeButton.style.cssText = `
      position: absolute;
      top: 1rem;
      right: 1rem;
      background: rgba(0, 0, 0, 0.1);
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
    `;
    closeButton.onclick = () => this.closeChatModal();

    modal.appendChild(closeButton);
    backdrop.appendChild(modal);
    document.body.appendChild(backdrop);

    // Initialize chat messages
    this.initializeChatMessages(store);
  }

  createChatContent(store) {
    return `
      <!-- Chat Header -->
      <div style="
        background: linear-gradient(135deg, #059669, #047857);
        color: white;
        padding: 1.5rem;
        border-radius: 1.5rem 1.5rem 0 0;
        display: flex;
        align-items: center;
        gap: 1rem;
      ">
        <div style="
          width: 50px;
          height: 50px;
          background: rgba(255, 255, 255, 0.2);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.5rem;
        ">
          🏪
        </div>
        <div style="flex: 1;">
          <h3 style="margin: 0; font-weight: 600; font-size: 1.1rem;">${store.name}</h3>
          <p style="margin: 0; opacity: 0.9; font-size: 0.875rem;">${store.manager} • ${store.isOnline ? "🟢 Online" : "🔴 Offline"}</p>
        </div>
        <div style="text-align: right;">
          <div style="background: rgba(255, 255, 255, 0.2); padding: 0.25rem 0.75rem; border-radius: 1rem; font-size: 0.875rem;">
            ⭐ ${store.rating}
          </div>
        </div>
      </div>

      <!-- Product Info Bar -->
      <div style="
        background: #f8fafc;
        padding: 1rem 1.5rem;
        border-bottom: 1px solid #e5e7eb;
        display: flex;
        align-items: center;
        gap: 1rem;
      ">
        <img src="${this.currentProduct.image}" 
             alt="${this.currentProduct.name}"
             style="width: 40px; height: 40px; object-fit: cover; border-radius: 0.5rem;">
        <div style="flex: 1;">
          <div style="font-weight: 600; color: #1f2937; font-size: 0.9rem;">${this.currentProduct.name}</div>
          <div style="color: #059669; font-weight: 600;">₹${this.currentProduct.price}</div>
        </div>
        <div style="text-align: right; font-size: 0.875rem; color: #6b7280;">
          Negotiating for best price
        </div>
      </div>

      <!-- Chat Messages -->
      <div id="chatMessages" style="
        flex: 1;
        overflow-y: auto;
        padding: 1rem 1.5rem;
        background: #fafafa;
      ">
        <!-- Messages will be added here -->
      </div>

      <!-- Quick Actions -->
      <div style="
        padding: 1rem 1.5rem;
        background: #f8fafc;
        border-top: 1px solid #e5e7eb;
      ">
        <div style="display: flex; gap: 0.5rem; margin-bottom: 1rem; flex-wrap: wrap;">
          <button onclick="storeBargaining.sendQuickMessage('${store.id}', 'Can you give a better price than ₹${this.currentProduct.price}?')" style="
            background: #e0f2fe;
            color: #0369a1;
            border: 1px solid #0ea5e9;
            padding: 0.5rem 1rem;
            border-radius: 1rem;
            font-size: 0.875rem;
            cursor: pointer;
          ">
            💰 Ask for discount
          </button>
          <button onclick="storeBargaining.sendQuickMessage('${store.id}', 'Do you have this item in stock?')" style="
            background: #f0fdf4;
            color: #166534;
            border: 1px solid #22c55e;
            padding: 0.5rem 1rem;
            border-radius: 1rem;
            font-size: 0.875rem;
            cursor: pointer;
          ">
            📦 Check stock
          </button>
          <button onclick="storeBargaining.sendQuickMessage('${store.id}', 'What is your best price with warranty?')" style="
            background: #fef3c7;
            color: #92400e;
            border: 1px solid #f59e0b;
            padding: 0.5rem 1rem;
            border-radius: 1rem;
            font-size: 0.875rem;
            cursor: pointer;
          ">
            🛡️ Ask about warranty
          </button>
        </div>

        <!-- Message Input -->
        <div style="display: flex; gap: 0.75rem; align-items: end;">
          <div style="flex: 1;">
            <textarea id="messageInput" placeholder="Type your message..." style="
              width: 100%;
              border: 1px solid #d1d5db;
              border-radius: 1rem;
              padding: 0.75rem 1rem;
              resize: none;
              min-height: 44px;
              max-height: 100px;
              font-family: inherit;
              font-size: 0.9rem;
            " onkeypress="if(event.key==='Enter' && !event.shiftKey) { event.preventDefault(); storeBargaining.sendMessage('${store.id}'); }"></textarea>
          </div>
          <button onclick="storeBargaining.sendMessage('${store.id}')" style="
            background: linear-gradient(135deg, #10b981, #059669);
            color: white;
            border: none;
            padding: 0.75rem 1rem;
            border-radius: 1rem;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            min-width: 44px;
          ">
            <svg viewBox="0 0 24 24" fill="currentColor" style="width: 20px; height: 20px;">
              <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
            </svg>
          </button>
        </div>
      </div>
    `;
  }

  initializeChatMessages(store) {
    const chatMessages = document.getElementById("chatMessages");
    if (!chatMessages) return;

    // Initialize with welcome message
    const welcomeMessage = this.createMessage(
      "store",
      `Hello! Welcome to ${store.name}. I'm ${store.manager}. I see you're interested in ${this.currentProduct.name}. How can I help you today?`,
      new Date(),
    );

    chatMessages.appendChild(welcomeMessage);

    // Auto-scroll to bottom
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  sendQuickMessage(storeId, message) {
    this.sendMessage(storeId, message);
  }

  sendMessage(storeId, customMessage = null) {
    const messageInput = document.getElementById("messageInput");
    const chatMessages = document.getElementById("chatMessages");

    if (!messageInput || !chatMessages) return;

    const message = customMessage || messageInput.value.trim();
    if (!message) return;

    // Add user message
    const userMessage = this.createMessage("user", message, new Date());
    chatMessages.appendChild(userMessage);

    // Clear input if not a custom message
    if (!customMessage) {
      messageInput.value = "";
    }

    // Auto-scroll to bottom
    chatMessages.scrollTop = chatMessages.scrollHeight;

    // Simulate store response
    setTimeout(
      () => {
        const response = this.generateStoreResponse(message, storeId);
        const storeMessage = this.createMessage("store", response, new Date());
        chatMessages.appendChild(storeMessage);
        chatMessages.scrollTop = chatMessages.scrollHeight;
      },
      1000 + Math.random() * 2000,
    ); // 1-3 second delay
  }

  createMessage(sender, text, timestamp) {
    const messageDiv = document.createElement("div");
    const isUser = sender === "user";

    messageDiv.style.cssText = `
      display: flex;
      ${isUser ? "justify-content: flex-end" : "justify-content: flex-start"};
      margin-bottom: 1rem;
      animation: messageSlideIn 0.3s ease-out;
    `;

    messageDiv.innerHTML = `
      <div style="
        max-width: 70%;
        background: ${isUser ? "linear-gradient(135deg, #3b82f6, #1d4ed8)" : "#ffffff"};
        color: ${isUser ? "white" : "#374151"};
        padding: 0.75rem 1rem;
        border-radius: ${isUser ? "1rem 1rem 0.25rem 1rem" : "1rem 1rem 1rem 0.25rem"};
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        border: ${isUser ? "none" : "1px solid #e5e7eb"};
      ">
        <div style="font-size: 0.9rem; line-height: 1.4;">${text}</div>
        <div style="
          font-size: 0.75rem;
          opacity: 0.7;
          margin-top: 0.25rem;
          text-align: ${isUser ? "right" : "left"};
        ">
          ${timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
        </div>
      </div>
    `;

    return messageDiv;
  }

  generateStoreResponse(userMessage, storeId) {
    const store = this.stores.find((s) => s.id === storeId);
    const productPrice = this.currentProduct.price;
    const discountRange = store.discount.split("-");
    const minDiscount = parseInt(discountRange[0]);
    const maxDiscount = parseInt(discountRange[1]);

    const message = userMessage.toLowerCase();

    if (
      message.includes("price") ||
      message.includes("discount") ||
      message.includes("better")
    ) {
      const discount =
        Math.floor(Math.random() * (maxDiscount - minDiscount + 1)) +
        minDiscount;
      const newPrice = Math.round(productPrice * (1 - discount / 100));
      return `I can offer you a ${discount}% discount on ${this.currentProduct.name}. My best price would be ₹${newPrice} instead of ₹${productPrice}. This includes warranty and free delivery within the city. What do you think?`;
    }

    if (message.includes("stock") || message.includes("available")) {
      return `Yes, we have ${this.currentProduct.name} in stock! We currently have 3 pieces available. Would you like me to reserve one for you?`;
    }

    if (message.includes("warranty") || message.includes("guarantee")) {
      return `We provide 1 year manufacturer warranty plus 6 months additional store warranty. We also offer free service for the first year. Our service center is just 2 km away from our store.`;
    }

    if (message.includes("delivery") || message.includes("shipping")) {
      return `We offer same-day delivery within the city for orders above ₹1000. For your location, delivery charge would be ₹50. We can also arrange free pickup if you prefer to collect from our store.`;
    }

    if (message.includes("bulk") || message.includes("quantity")) {
      return `For bulk orders, we can provide additional discounts. If you order 2 or more pieces, I can give you an extra 5% off. Are you planning to buy more than one?`;
    }

    // Default responses
    const responses = [
      `That's a great question! Let me check with my manager and get back to you with the best possible deal.`,
      `I understand your concern. We always try to provide the best value to our customers. Let me see what I can do for you.`,
      `Thank you for your interest in ${this.currentProduct.name}. We've been selling this product for 2 years and have very satisfied customers.`,
      `I appreciate you reaching out to us. We're known for our competitive prices and excellent after-sales service.`,
      `Let me discuss this with my team. We value customer relationships and always try to work out mutually beneficial deals.`,
    ];

    return responses[Math.floor(Math.random() * responses.length)];
  }

  closeBargainingModal() {
    const backdrop = document.getElementById("bargainingModalBackdrop");
    if (backdrop) {
      backdrop.remove();
    }
  }

  closeChatModal() {
    const backdrop = document.getElementById("chatModalBackdrop");
    if (backdrop) {
      backdrop.remove();
    }
  }

  addBargainingStyles() {
    if (document.getElementById("bargainingStyles")) return;

    const style = document.createElement("style");
    style.id = "bargainingStyles";
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
      
      @keyframes messageSlideIn {
        from { 
          opacity: 0; 
          transform: translateY(10px);
        }
        to { 
          opacity: 1; 
          transform: translateY(0);
        }
      }
      
      #bargainingModal::-webkit-scrollbar,
      #chatModal::-webkit-scrollbar,
      #chatMessages::-webkit-scrollbar {
        width: 6px;
      }
      
      #bargainingModal::-webkit-scrollbar-track,
      #chatModal::-webkit-scrollbar-track,
      #chatMessages::-webkit-scrollbar-track {
        background: #f1f5f9;
        border-radius: 3px;
      }
      
      #bargainingModal::-webkit-scrollbar-thumb,
      #chatModal::-webkit-scrollbar-thumb,
      #chatMessages::-webkit-scrollbar-thumb {
        background: linear-gradient(135deg, #3b82f6, #1d4ed8);
        border-radius: 3px;
      }
      
      #messageInput:focus {
        outline: none;
        border-color: #3b82f6;
        box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
      }
    `;
    document.head.appendChild(style);
  }
}

// Initialize store bargaining system when DOM is loaded
let storeBargaining;
document.addEventListener("DOMContentLoaded", function () {
  storeBargaining = new StoreBargainingSystem();
});

// Export for global use
window.storeBargaining = storeBargaining;
