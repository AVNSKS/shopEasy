// Products Data - Converted from TypeScript

// Categories configuration
const categories = [
  "All",
  "Electronics",
  "Fashion",
  "Home & Kitchen",
  "Toys & Games",
  "Beauty & Personal Care",
  "Sports & Fitness",
  "Books & Stationery",
  "Groceries & Food",
];

const categoryInfo = {
  Electronics: {
    title: "Electronics",
    description: "Mobiles, Laptops, Cameras & More",
    image:
      "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=400&h=300&fit=crop",
    bgColor: "from-blue-500 to-purple-600",
  },
  Fashion: {
    title: "Fashion",
    description: "Clothing, Shoes & Accessories",
    image:
      "https://images.unsplash.com/photo-1445205170230-053b83016050?w=400&h=300&fit=crop",
    bgColor: "from-pink-500 to-rose-600",
  },
  "Home & Kitchen": {
    title: "Home & Kitchen",
    description: "Furniture, Appliances & Decor",
    image:
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop",
    bgColor: "from-green-500 to-teal-600",
  },
  "Toys & Games": {
    title: "Toys & Games",
    description: "Kids Toys, Board Games & More",
    image:
      "https://images.unsplash.com/photo-1558060370-d644479cb6f7?w=400&h=300&fit=crop",
    bgColor: "from-yellow-500 to-orange-600",
  },
  "Beauty & Personal Care": {
    title: "Beauty & Personal Care",
    description: "Skincare, Makeup & Wellness",
    image:
      "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=300&fit=crop",
    bgColor: "from-purple-500 to-pink-600",
  },
  "Sports & Fitness": {
    title: "Sports & Fitness",
    description: "Exercise Equipment & Sportswear",
    image:
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop",
    bgColor: "from-red-500 to-orange-600",
  },
  "Books & Stationery": {
    title: "Books & Stationery",
    description: "Books, Notebooks & Office Supplies",
    image:
      "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=300&fit=crop",
    bgColor: "from-indigo-500 to-blue-600",
  },
  "Groceries & Food": {
    title: "Groceries & Food",
    description: "Fresh Food, Snacks & Beverages",
    image:
      "https://images.unsplash.com/photo-1542838132-92c53300491e?w=400&h=300&fit=crop",
    bgColor: "from-green-500 to-emerald-600",
  },
};

// All products array
const allProducts = [
  // Electronics
  {
    id: "1",
    name: "Samsung Galaxy M34 5G",
    price: 18999,
    originalPrice: 24999,
    image:
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=400&fit=crop",
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
      "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&h=400&fit=crop",
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
      "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=400&h=400&fit=crop",
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
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=400&fit=crop",
    category: "Electronics",
    rating: 4.4,
    reviews: 892,
    discount: 13,
    inStock: true,
    description: "Intel i5 processor, 8GB RAM, 512GB SSD",
    brand: "Dell",
    features: ["Intel i5", "8GB RAM", "512GB SSD", "15.6'' Display"],
  },

  // Fashion
  {
    id: "5",
    name: "Levi's Men's Jeans",
    price: 1999,
    originalPrice: 2999,
    image:
      "https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&h=400&fit=crop",
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
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop",
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
      "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=400&h=400&fit=crop",
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
      "https://images.unsplash.com/photo-1558060370-d644479cb6f7?w=400&h=400&fit=crop",
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
      "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400&h=400&fit=crop",
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
      "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=400&fit=crop",
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
      "https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=400&h=400&fit=crop",
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
];

// Derived product arrays
const trendingProducts = allProducts.slice(0, 4);
const topOffers = allProducts.filter((p) => (p.discount || 0) > 20).slice(0, 4);
const recentlyViewed = allProducts.slice(-2);

// Product utility functions
class ProductManager {
  static getAllProducts() {
    return allProducts;
  }

  static getProductById(id) {
    return allProducts.find((product) => product.id === id);
  }

  static getProductsByCategory(category) {
    if (category === "All") {
      return allProducts;
    }
    return allProducts.filter((product) => product.category === category);
  }

  static searchProducts(query) {
    const searchTerm = query.toLowerCase();
    return allProducts.filter(
      (product) =>
        product.name.toLowerCase().includes(searchTerm) ||
        product.description.toLowerCase().includes(searchTerm) ||
        product.brand?.toLowerCase().includes(searchTerm) ||
        product.category.toLowerCase().includes(searchTerm) ||
        product.features?.some((feature) =>
          feature.toLowerCase().includes(searchTerm),
        ),
    );
  }

  static getCategories() {
    return categories;
  }

  static getCategoryInfo(category) {
    return categoryInfo[category];
  }

  static getTrendingProducts() {
    return trendingProducts;
  }

  static getTopOffers() {
    return topOffers;
  }

  static getRecentlyViewed() {
    return recentlyViewed;
  }

  static getProductsByPriceRange(minPrice, maxPrice) {
    return allProducts.filter(
      (product) => product.price >= minPrice && product.price <= maxPrice,
    );
  }

  static getProductsByRating(minRating) {
    return allProducts.filter((product) => product.rating >= minRating);
  }

  static getProductsByBrand(brand) {
    return allProducts.filter(
      (product) => product.brand?.toLowerCase() === brand.toLowerCase(),
    );
  }

  static getInStockProducts() {
    return allProducts.filter((product) => product.inStock);
  }

  static getDiscountedProducts() {
    return allProducts.filter(
      (product) => product.discount && product.discount > 0,
    );
  }

  static sortProducts(products, sortBy) {
    const sorted = [...products];

    switch (sortBy) {
      case "price-low":
        return sorted.sort((a, b) => a.price - b.price);
      case "price-high":
        return sorted.sort((a, b) => b.price - a.price);
      case "rating":
        return sorted.sort((a, b) => b.rating - a.rating);
      case "discount":
        return sorted.sort((a, b) => (b.discount || 0) - (a.discount || 0));
      case "popularity":
        return sorted.sort((a, b) => b.reviews - a.reviews);
      case "name":
        return sorted.sort((a, b) => a.name.localeCompare(b.name));
      default:
        return sorted;
    }
  }

  static getRelatedProducts(productId, category, limit = 4) {
    const currentProduct = this.getProductById(productId);
    if (!currentProduct) return [];

    return allProducts
      .filter(
        (product) =>
          product.id !== productId &&
          product.category === category &&
          product.inStock,
      )
      .sort((a, b) => b.rating - a.rating)
      .slice(0, limit);
  }
}

// Make ProductManager available globally
if (typeof window !== "undefined") {
  window.ProductManager = ProductManager;
  window.categories = categories;
  window.categoryInfo = categoryInfo;
  window.allProducts = allProducts;
}

// Export for module usage if needed
if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    ProductManager,
    categories,
    categoryInfo,
    allProducts,
    trendingProducts,
    topOffers,
    recentlyViewed,
  };
}
