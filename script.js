// Product Data
const products = [
  // Electronics
  {
    id: "1",
    name: "Samsung Galaxy M34 5G",
    price: 18999,
    originalPrice: 24999,
    image:
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=400&fit=crop&auto=format&q=80&sat=40",
    category: "Electronics",
    rating: 4.3,
    reviews: 2847,
    discount: 24,
    inStock: true,
    description: "Latest 5G smartphone with 50MP camera and 6000mAh battery",
    brand: "Samsung",
    features: ["5G Ready", "50MP Camera", "6000mAh Battery", "120Hz Display"],
  },
  {
    id: "2",
    name: "Apple iPhone 15",
    price: 79999,
    originalPrice: 84999,
    image:
      "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&h=400&fit=crop&auto=format&q=80&sat=50",
    category: "Electronics",
    rating: 4.8,
    reviews: 1534,
    discount: 6,
    inStock: true,
    description: "Latest iPhone with advanced camera system and A17 chip",
    brand: "Apple",
    features: ["A17 Pro Chip", "48MP Camera", "USB-C", "Titanium Design"],
  },
  {
    id: "3",
    name: "Boat Airdopes 131",
    price: 1299,
    originalPrice: 2990,
    image:
      "https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?w=400&h=400&fit=crop&auto=format&q=80&sat=60",
    category: "Electronics",
    rating: 4.1,
    reviews: 5632,
    discount: 57,
    inStock: true,
    description: "True wireless earbuds with 60H playback",
    brand: "Boat",
    features: [
      "60H Playback",
      "IPX4 Water Resistant",
      "Bluetooth 5.0",
      "Voice Assistant",
    ],
  },
  {
    id: "4",
    name: "Dell Inspiron Laptop",
    price: 45999,
    originalPrice: 52999,
    image:
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=400&fit=crop&auto=format&q=80&sat=40",
    category: "Electronics",
    rating: 4.4,
    reviews: 892,
    discount: 13,
    inStock: true,
    description: "Intel i5 processor, 8GB RAM, 512GB SSD",
    brand: "Dell",
    features: ["Intel i5", "8GB RAM", "512GB SSD", "15.6 Display"],
  },
  // Fashion
  {
    id: "5",
    name: "Levi's Men's Jeans",
    price: 1999,
    originalPrice: 2999,
    image:
      "https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&h=400&fit=crop&auto=format&q=80&sat=50",
    category: "Fashion",
    rating: 4.2,
    reviews: 756,
    discount: 33,
    inStock: true,
    description: "Classic fit denim jeans, various sizes available",
    brand: "Levi's",
    features: [
      "100% Cotton",
      "Classic Fit",
      "Machine Washable",
      "Multiple Sizes",
    ],
  },
  {
    id: "6",
    name: "Nike Running Shoes",
    price: 4999,
    originalPrice: 7999,
    image:
      "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=400&fit=crop&auto=format&q=80&sat=60",
    category: "Fashion",
    rating: 4.3,
    reviews: 892,
    discount: 38,
    inStock: true,
    description: "Comfortable running shoes for daily workouts",
    brand: "Nike",
    features: [
      "Air Cushioning",
      "Breathable Mesh",
      "Durable Sole",
      "Lightweight",
    ],
  },
  {
    id: "7",
    name: "Zara Women's Dress",
    price: 2499,
    originalPrice: 3499,
    image:
      "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=400&h=400&fit=crop&auto=format&q=80&sat=50",
    category: "Fashion",
    rating: 4.5,
    reviews: 1234,
    discount: 29,
    inStock: true,
    description: "Elegant floral dress perfect for any occasion",
    brand: "Zara",
    features: [
      "Premium Fabric",
      "Floral Print",
      "Machine Washable",
      "Comfortable Fit",
    ],
  },
  // Home & Kitchen
  {
    id: "8",
    name: "Prestige Pressure Cooker",
    price: 2299,
    originalPrice: 2799,
    image:
      "https://images.unsplash.com/photo-1584990347498-531bb89cf3bb?w=400&h=400&fit=crop",
    category: "Home & Kitchen",
    rating: 4.6,
    reviews: 934,
    discount: 18,
    inStock: true,
    description: "Stainless steel pressure cooker, 5L capacity",
    brand: "Prestige",
    features: [
      "5L Capacity",
      "Stainless Steel",
      "Safety Valve",
      "ISI Certified",
    ],
  },
  {
    id: "9",
    name: "Milton Thermosteel Bottle",
    price: 799,
    originalPrice: 1200,
    image:
      "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=400&h=400&fit=crop",
    category: "Home & Kitchen",
    rating: 4.5,
    reviews: 1876,
    discount: 33,
    inStock: true,
    description: "Stainless steel water bottle, 1000ml capacity",
    brand: "Milton",
    features: ["1000ml Capacity", "24hr Hot/Cold", "Leak Proof", "BPA Free"],
  },
  // Toys & Games
  {
    id: "10",
    name: "LEGO Creator Set",
    price: 3999,
    originalPrice: 4999,
    image:
      "https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?w=400&h=400&fit=crop&auto=format&q=80&sat=60",
    category: "Toys & Games",
    rating: 4.7,
    reviews: 567,
    discount: 20,
    inStock: true,
    description: "3-in-1 Creator building set for kids 7+",
    brand: "LEGO",
    features: ["3-in-1 Build", "Ages 7+", "562 Pieces", "Educational"],
  },
  {
    id: "11",
    name: "Hot Wheels Track Set",
    price: 1499,
    originalPrice: 1999,
    image:
      "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400&h=400&fit=crop&auto=format&q=80&sat=70",
    category: "Toys & Games",
    rating: 4.4,
    reviews: 892,
    discount: 25,
    inStock: true,
    description: "Ultimate racing track with 2 cars included",
    brand: "Hot Wheels",
    features: [
      "Ultimate Track",
      "2 Cars Included",
      "Ages 5+",
      "Action Features",
    ],
  },

  // Beauty & Personal Care
  {
    id: "12",
    name: "Himalaya Face Wash",
    price: 185,
    originalPrice: 200,
    image:
      "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=400&h=400&fit=crop&auto=format&q=80&sat=50",
    category: "Beauty & Personal Care",
    rating: 4.2,
    reviews: 3421,
    discount: 8,
    inStock: true,
    description: "Neem and turmeric face wash, 150ml",
    brand: "Himalaya",
    features: [
      "Neem & Turmeric",
      "150ml",
      "For All Skin Types",
      "Dermatologically Tested",
    ],
  },
  {
    id: "13",
    name: "Lakme Lipstick",
    price: 299,
    originalPrice: 399,
    image:
      "https://images.unsplash.com/photo-1631214540825-c23e6c6d1db0?w=400&h=400&fit=crop&auto=format&q=80&sat=60",
    category: "Beauty & Personal Care",
    rating: 4.3,
    reviews: 1567,
    discount: 25,
    inStock: true,
    description: "Long-lasting matte lipstick in vibrant shades",
    brand: "Lakme",
    features: [
      "Matte Finish",
      "Long Lasting",
      "Vibrant Colors",
      "Moisturizing",
    ],
  },
  // Sports & Fitness
  {
    id: "14",
    name: "Yoga Mat Premium",
    price: 899,
    originalPrice: 1299,
    image:
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop",
    category: "Sports & Fitness",
    rating: 4.5,
    reviews: 734,
    discount: 31,
    inStock: true,
    description: "Non-slip yoga mat with carrying strap",
    brand: "Boldfit",
    features: [
      "Non-Slip Surface",
      "6mm Thick",
      "Carrying Strap",
      "Eco-Friendly",
    ],
  },
  {
    id: "15",
    name: "Dumbbells Set 10kg",
    price: 2499,
    originalPrice: 3299,
    image:
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop",
    category: "Sports & Fitness",
    rating: 4.4,
    reviews: 456,
    discount: 24,
    inStock: true,
    description: "Adjustable dumbbells set for home workouts",
    brand: "Kore",
    features: [
      "Adjustable Weight",
      "10kg Total",
      "Comfortable Grip",
      "Durable Build",
    ],
  },
  // Books & Stationery
  {
    id: "16",
    name: "Atomic Habits Book",
    price: 399,
    originalPrice: 599,
    image:
      "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=400&fit=crop",
    category: "Books & Stationery",
    rating: 4.7,
    reviews: 12453,
    discount: 33,
    inStock: true,
    description: "Bestselling book on building good habits",
    brand: "James Clear",
    features: ["Bestseller", "Self-Help", "Paperback", "320 Pages"],
  },
  {
    id: "17",
    name: "Parker Pen Set",
    price: 1299,
    originalPrice: 1799,
    image:
      "https://images.unsplash.com/photo-1583485088034-697b5bc54ccc?w=400&h=400&fit=crop",
    category: "Books & Stationery",
    rating: 4.6,
    reviews: 678,
    discount: 28,
    inStock: true,
    description: "Premium ballpoint pen set with gift box",
    brand: "Parker",
    features: ["Premium Quality", "Gift Box", "Smooth Writing", "Refillable"],
  },
  // Groceries & Food
  {
    id: "18",
    name: "Tata Tea Premium",
    price: 435,
    originalPrice: 450,
    image:
      "https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=400&h=400&fit=crop",
    category: "Groceries & Food",
    rating: 4.5,
    reviews: 1523,
    discount: 3,
    inStock: true,
    description: "Premium quality tea blend, 1kg pack",
    brand: "Tata Tea",
    features: ["1kg Pack", "Premium Quality", "Strong Aroma", "Fresh Leaves"],
  },
  {
    id: "19",
    name: "Surf Excel Detergent",
    price: 299,
    originalPrice: 350,
    image:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop",
    category: "Groceries & Food",
    rating: 4.4,
    reviews: 2156,
    discount: 15,
    inStock: true,
    description: "Liquid detergent for tough stains, 1L bottle",
    brand: "Surf Excel",
    features: ["1L Bottle", "Removes Stains", "Fresh Fragrance", "Easy Pour"],
  },
  {
    id: "20",
    name: "Maggi Noodles Pack",
    price: 144,
    originalPrice: 160,
    image:
      "https://images.unsplash.com/photo-1585032226651-759b368d7246?w=400&h=400&fit=crop",
    category: "Groceries & Food",
    rating: 4.3,
    reviews: 3456,
    discount: 10,
    inStock: true,
    description: "Pack of 12 Maggi instant noodles",
    brand: "Maggi",
    features: ["Pack of 12", "2 Min Cook", "Masala Flavor", "No Trans Fat"],
  },
  // Made in India Products
  {
    id: "ind_001",
    name: "Banarasi Silk Saree",
    price: 4500,
    originalPrice: 6000,
    image:
      "https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=400&h=400&fit=crop&sat=50",
    category: "Made in India",
    rating: 4.7,
    reviews: 234,
    discount: 25,
    inStock: true,
    description:
      "Authentic handwoven Banarasi silk saree with traditional motifs",
    brand: "Soch",
    features: [
      "Handwoven",
      "Pure Silk",
      "Traditional Design",
      "Wedding Special",
    ],
    madeInIndia: true,
    region: "Varanasi, Uttar Pradesh",
    artisan: "Traditional Weavers Cooperative",
  },
  {
    id: "ind_002",
    name: "Khadi Cotton Kurta Set",
    price: 1200,
    originalPrice: 1500,
    image:
      "https://images.unsplash.com/photo-1617127365659-c47fa864d8bc?w=400&h=400&fit=crop&sat=50",
    category: "Made in India",
    rating: 4.5,
    reviews: 156,
    discount: 20,
    inStock: true,
    description: "Comfortable khadi cotton kurta with traditional collar",
    brand: "Fabindia",
    features: [
      "100% Khadi Cotton",
      "Handspun",
      "Breathable",
      "Traditional Cut",
    ],
    madeInIndia: true,
    region: "Gujarat",
    artisan: "Khadi Village Industries",
  },
  {
    id: "ind_003",
    name: "Organic Garam Masala Blend",
    price: 180,
    originalPrice: 220,
    image:
      "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=400&h=400&fit=crop&sat=60",
    category: "Made in India",
    rating: 4.8,
    reviews: 445,
    discount: 18,
    inStock: true,
    description:
      "Premium organic garam masala blend with 15 traditional spices",
    brand: "Everest",
    features: [
      "Organic Certified",
      "15 Spices",
      "No Preservatives",
      "Traditional Recipe",
    ],
    madeInIndia: true,
    region: "Kerala",
    artisan: "Organic Spice Farmers",
  },
  {
    id: "ind_004",
    name: "Madhubani Painting Canvas",
    price: 850,
    originalPrice: 1200,
    image:
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop&sat=60",
    category: "Made in India",
    rating: 4.4,
    reviews: 89,
    discount: 29,
    inStock: true,
    description:
      "Authentic Madhubani painting with traditional motifs and natural colors",
    brand: "Heritage Arts",
    features: [
      "Hand Painted",
      "Natural Colors",
      "Traditional Motifs",
      "Canvas Base",
    ],
    madeInIndia: true,
    region: "Bihar",
    artisan: "Madhubani Artists Collective",
  },
  {
    id: "20",
    name: "Maggi Noodles Pack",
    price: 144,
    originalPrice: 160,
    image:
      "https://images.unsplash.com/photo-1585032226651-759b368d7246?w=400&h=400&fit=crop",
    category: "Groceries & Food",
    rating: 4.3,
    reviews: 3456,
    discount: 10,
    inStock: true,
    description: "Pack of 12 Maggi instant noodles",
    brand: "Maggi",
    features: ["Pack of 12", "2 Min Cook", "Masala Flavor", "No Trans Fat"],
  },
];

// Category Information
const categoryInfo = {
  Electronics: {
    title: "Electronics",
    description: "Mobiles, Laptops, Cameras & More",
    image:
      "https://images.unsplash.com/photo-1550009158-9ebf69173e03?w=400&h=300&fit=crop&auto=format&q=80",
    bgColor:
      "linear-gradient(135deg, rgba(59, 130, 246, 0.85), rgba(147, 51, 234, 0.85))",
  },
  Fashion: {
    title: "Fashion",
    description: "Clothing, Shoes & Accessories",
    image:
      "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=300&fit=crop&auto=format&q=80",
    bgColor:
      "linear-gradient(135deg, rgba(236, 72, 153, 0.85), rgba(239, 68, 68, 0.85))",
  },
  "Home & Kitchen": {
    title: "Home & Kitchen",
    description: "Furniture, Appliances & Decor",
    image:
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop&auto=format&q=80&sat=30",
    bgColor:
      "linear-gradient(135deg, rgba(34, 197, 94, 0.85), rgba(20, 184, 166, 0.85))",
  },
  "Toys & Games": {
    title: "Toys & Games",
    description: "Kids Toys, Board Games & More",
    image:
      "https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?w=400&h=300&fit=crop&auto=format&q=80&sat=50",
    bgColor:
      "linear-gradient(135deg, rgba(251, 191, 36, 0.85), rgba(249, 115, 22, 0.85))",
  },
  "Beauty & Personal Care": {
    title: "Beauty & Personal Care",
    description: "Skincare, Makeup & Wellness",
    image:
      "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=400&h=300&fit=crop&auto=format&q=80&sat=40",
    bgColor:
      "linear-gradient(135deg, rgba(168, 85, 247, 0.85), rgba(236, 72, 153, 0.85))",
  },
  "Sports & Fitness": {
    title: "Sports & Fitness",
    description: "Exercise Equipment & Sportswear",
    image:
      "https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?w=400&h=300&fit=crop&auto=format&q=80&sat=40",
    bgColor:
      "linear-gradient(135deg, rgba(239, 68, 68, 0.85), rgba(249, 115, 22, 0.85))",
  },
  "Books & Stationery": {
    title: "Books & Stationery",
    description: "Books, Notebooks & Office Supplies",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop&auto=format&q=80&sat=30",
    bgColor:
      "linear-gradient(135deg, rgba(99, 102, 241, 0.85), rgba(59, 130, 246, 0.85))",
  },
  "Groceries & Food": {
    title: "Groceries & Food",
    description: "Fresh Food, Snacks & Recipe Ingredients",
    image:
      "https://images.unsplash.com/photo-1542838132-92c53300491e?w=400&h=300&fit=crop&auto=format&q=80&sat=40",
    bgColor:
      "linear-gradient(135deg, rgba(34, 197, 94, 0.85), rgba(16, 185, 129, 0.85))",
  },
  "Indian Products": {
    title: "Indian Products",
    description: "🇮🇳 Authentic Crafts, Spices & Traditional Items",
    image:
      "https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=400&h=300&fit=crop&auto=format&q=80&sat=60",
    bgColor:
      "linear-gradient(135deg, rgba(255, 153, 51, 0.85), rgba(19, 136, 8, 0.85))",
  },
};

// Global Variables
let currentSlide = 0;
let cart = JSON.parse(localStorage.getItem("shopeasy-cart")) || [];

// Utility Functions
function formatPrice(price) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(price);
}

function formatNumber(num) {
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + "k";
  }
  return num.toString();
}

function createStarRating(rating) {
  let stars = "";
  for (let i = 1; i <= 5; i++) {
    if (i <= Math.floor(rating)) {
      stars +=
        '<svg class="star" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>';
    } else {
      stars +=
        '<svg class="star" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>';
    }
  }
  return stars;
}

function getProductById(id) {
  return products.find((product) => product.id === id);
}

function getProductsByCategory(category) {
  if (category === "All") return products;
  return products.filter((product) => product.category === category);
}

function isInCart(productId) {
  return cart.some((item) => item.id === productId);
}

function updateCartCount() {
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  const cartCountElement = document.getElementById("cartCount");
  if (cartCountElement) {
    cartCountElement.textContent = cartCount;
    cartCountElement.style.display = cartCount > 0 ? "flex" : "none";
  }
}

// Cart Functions
function addToCart(productId) {
  const product = getProductById(productId);
  if (!product || !product.inStock) return;

  const existingItem = cart.find((item) => item.id === productId);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  localStorage.setItem("shopeasy-cart", JSON.stringify(cart));
  updateCartCount();

  // Update button text
  const button = document.querySelector(
    `[onclick="addToCart('${productId}')"]`,
  );
  if (button) {
    button.innerHTML =
      '<svg class="cart-icon-btn" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m9 22 3-3-3-3M3 3h.621a1 1 0 0 1 .958.713l1.42 4.982A1 1 0 0 0 6.957 9H19a1 1 0 0 1 .97 1.243l-2 8A1 1 0 0 1 17 19H6a1 1 0 0 1-.97-.757L2 2H1"/><circle cx="9" cy="22" r="1"/><circle cx="20" cy="22" r="1"/></svg>Added to Cart';
    button.disabled = true;
  }

  // Show success message
  showNotification("Product added to cart!", "success");
}

function showNotification(message, type = "success") {
  const notification = document.createElement("div");
  notification.className = `notification ${type}`;
  notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === "success" ? "#10b981" : "#ef4444"};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 0.5rem;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        z-index: 10000;
        font-weight: 500;
    `;
  notification.textContent = message;

  document.body.appendChild(notification);

  setTimeout(() => {
    notification.remove();
  }, 3000);
}

// Product Card Creation
function createProductCard(product, linkToDetail = true) {
  const inCart = isInCart(product.id);
  const productUrl = linkToDetail
    ? `product-detail.html?id=${product.id}`
    : "#";
  const onClickHandler = linkToDetail
    ? ""
    : `onclick="addToCart('${product.id}')"`;

  return `
        <div class="product-card">
            <a href="${productUrl}" class="product-image">
                <img src="${product.image}" alt="${product.name}">
                ${product.discount ? `<div class="discount-badge">${product.discount}% OFF</div>` : ""}
                ${product.brand ? `<div class="brand-badge">${product.brand}</div>` : ""}
                ${!product.inStock ? '<div class="out-of-stock"><div class="out-of-stock-badge">Out of Stock</div></div>' : ""}
            </a>
            <div class="product-content">
                <div class="product-info">
                    <h3 class="product-name">${product.name}</h3>

                    <div class="product-rating">
                        <div class="rating-stars">
                            ${createStarRating(product.rating)}
                        </div>
                        <span class="rating-text">${product.rating}</span>
                        <span class="reviews-count">(${formatNumber(product.reviews)})</span>
                    </div>

                    <div class="product-price">
                        <span class="current-price">${formatPrice(product.price)}</span>
                        ${product.originalPrice ? `<span class="original-price">${formatPrice(product.originalPrice)}</span>` : ""}
                    </div>

                    ${product.features ? `<div class="product-features">${product.features.slice(0, 2).join(" • ")}</div>` : ""}
                </div>

                <div class="product-card-actions">
                    <button
                        class="add-to-cart-btn"
                        onclick="addToCart('${product.id}')"
                        ${!product.inStock || inCart ? "disabled" : ""}
                        ${onClickHandler}
                    >
                        <svg class="cart-icon-btn" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="m9 22 3-3-3-3M3 3h.621a1 1 0 0 1 .958.713l1.42 4.982A1 1 0 0 0 6.957 9H19a1 1 0 0 1 .97 1.243l-2 8A1 1 0 0 1 17 19H6a1 1 0 0 1-.97-.757L2 2H1"/>
                            <circle cx="9" cy="22" r="1"/>
                            <circle cx="20" cy="22" r="1"/>
                        </svg>
                        ${inCart ? "Added" : "Add to Cart"}
                    </button>
                    <button
                        onclick="arViewer && arViewer.open3DViewer(${JSON.stringify(product).replace(/"/g, "&quot;")})"
                        class="ar-view-btn"
                        title="View in AR/3D"
                    >
                        <svg style="width: 1rem; height: 1rem;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/>
                            <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    `;
}

// Category Card Creation
function createCategoryCard(category) {
  const info = categoryInfo[category];
  if (!info) return "";

  // Special handling for Indian Products category
  if (category === "Indian Products") {
    return `
        <a href="indian-products.html" class="category-card">
            <div class="category-image">
                <img src="${info.image}" alt="${info.title}">
                <div class="category-overlay" style="background: ${info.bgColor}"></div>
            </div>
            <div class="category-content">
                <h3>${info.title}</h3>
                <p>${info.description}</p>
                <div class="category-cta">Explore Products →</div>
            </div>
        </a>
    `;
  }

  // Special handling for Groceries & Food category
  if (category === "Groceries & Food") {
    return `
        <div class="category-card-container">
            <a href="products.html?category=${encodeURIComponent(category)}" class="category-card">
                <div class="category-image">
                    <img src="${info.image}" alt="${info.title}">
                    <div class="category-overlay" style="background: ${info.bgColor}"></div>
                </div>
                <div class="category-content">
                    <h3>${info.title}</h3>
                    <p>${info.description}</p>
                    <div class="category-cta">Shop Now →</div>
                </div>
            </a>
            <a href="recipe-search.html" class="recipe-search-link" style="
                display: block;
                background: linear-gradient(135deg, #10b981, #059669);
                color: white;
                padding: 0.75rem 1rem;
                border-radius: 0.5rem;
                text-decoration: none;
                font-weight: 600;
                text-align: center;
                margin-top: 0.5rem;
                transition: all 0.2s;
                box-shadow: 0 2px 4px rgba(16, 185, 129, 0.3);
            " onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 4px 8px rgba(16, 185, 129, 0.4)'" onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 2px 4px rgba(16, 185, 129, 0.3)'">
                🍽️ Recipe Search
            </a>
        </div>
    `;
  }

  return `
        <a href="products.html?category=${encodeURIComponent(category)}" class="category-card">
            <div class="category-image">
                <img src="${info.image}" alt="${info.title}">
                <div class="category-overlay" style="background: ${info.bgColor}"></div>
            </div>
            <div class="category-content">
                <h3>${info.title}</h3>
                <p>${info.description}</p>
                <div class="category-cta">Shop Now →</div>
            </div>
        </a>
    `;
}

// Hero Slider Functions
function setSlide(index) {
  currentSlide = index;
  const slides = document.querySelectorAll(".hero-slide");
  const indicators = document.querySelectorAll(".indicator");

  slides.forEach((slide, i) => {
    slide.classList.toggle("active", i === index);
  });

  indicators.forEach((indicator, i) => {
    indicator.classList.toggle("active", i === index);
  });
}

function nextSlide() {
  const slides = document.querySelectorAll(".hero-slide");
  currentSlide = (currentSlide + 1) % slides.length;
  setSlide(currentSlide);
}

// Search Function
function handleSearch(event) {
  event.preventDefault();
  const searchTerm = document.getElementById("searchInput").value.trim();
  if (searchTerm) {
    window.location.href = `products.html?search=${encodeURIComponent(searchTerm)}`;
  }
}

// Newsletter Function
function handleNewsletter(event) {
  event.preventDefault();
  const email = event.target.querySelector('input[type="email"]').value;
  showNotification("Thank you for subscribing!", "success");
  event.target.reset();
}

// Initialize Homepage
function initHomepage() {
  // Load categories
  const categoriesGrid = document.getElementById("categoriesGrid");
  if (categoriesGrid) {
    const mainCategories = [
      "Electronics",
      "Fashion",
      "Home & Kitchen",
      "Toys & Games",
      "Beauty & Personal Care",
      "Sports & Fitness",
      "Books & Stationery",
      "Groceries & Food",
      "Indian Products",
    ];

    categoriesGrid.innerHTML = mainCategories
      .map((category) => createCategoryCard(category))
      .join("");
  }

  // Load trending products
  const trendingContainer = document.getElementById("trendingProducts");
  if (trendingContainer) {
    const trendingProducts = products.slice(0, 4);
    trendingContainer.innerHTML = trendingProducts
      .map((product) => createProductCard(product))
      .join("");
  }

  // Load top offers
  const offersContainer = document.getElementById("topOffers");
  if (offersContainer) {
    const topOffers = products
      .filter((p) => (p.discount || 0) > 20)
      .slice(0, 4);
    offersContainer.innerHTML = topOffers
      .map((product) => createProductCard(product))
      .join("");
  }

  // Load recently viewed
  const recentlyViewedContainer = document.getElementById("recentlyViewed");
  if (recentlyViewedContainer) {
    const recentlyViewed = products.slice(-2);
    recentlyViewedContainer.innerHTML = recentlyViewed
      .map((product) => createProductCard(product))
      .join("");
  }

  // Initialize hero slider
  setInterval(nextSlide, 5000);
}

// Initialize on page load
document.addEventListener("DOMContentLoaded", function () {
  updateCartCount();

  // Check if we're on the homepage
  if (document.getElementById("categoriesGrid")) {
    initHomepage();
  }

  // Add smooth scrolling
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
        });
      }
    });
  });
});

// Export functions for use in other pages
window.products = products;
window.categoryInfo = categoryInfo;
window.formatPrice = formatPrice;
window.formatNumber = formatNumber;
window.createStarRating = createStarRating;
window.createProductCard = createProductCard;
window.addToCart = addToCart;
window.updateCartCount = updateCartCount;
window.getProductById = getProductById;
window.getProductsByCategory = getProductsByCategory;
window.handleSearch = handleSearch;
window.handleNewsletter = handleNewsletter;
window.setSlide = setSlide;
window.cart = cart;
