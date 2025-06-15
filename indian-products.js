// Indian Products Database - Made in India Section
class IndianProductsSection {
  constructor() {
    this.indianProducts = this.initializeIndianProducts();
    this.indianCategories = this.initializeIndianCategories();
    this.indianBrands = this.initializeIndianBrands();
    this.init();
  }

  init() {
    console.log("Indian Products Section initialized");
  }

  // Initialize authentic Indian products database
  initializeIndianProducts() {
    return [
      // INDIAN FASHION & TRADITIONAL CLOTHING
      {
        id: "ind_001",
        name: "Classic Banarasi Silk Saree",
        price: 3500,
        originalPrice: 4500,
        image:
          "https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=400&h=400&fit=crop&sat=50",
        category: "Indian Fashion",
        brand: "Heritage Weavers",
        description:
          "Beautiful traditional Banarasi silk saree with intricate golden border. Perfect for weddings and festivals. Handwoven by skilled artisans.",
        features: [
          "Pure Silk",
          "Golden Border",
          "Handwoven",
          "Traditional Design",
          "Festival Special",
        ],
        madeInIndia: true,
        region: "Varanasi, Uttar Pradesh",
        artisan: "Traditional Weavers",
        inStock: true,
        rating: 4.8,
        reviews: 156,
        discount: 22,
      },
      {
        id: "ind_002",
        name: "Cotton Anarkali Suit Set",
        price: 1800,
        originalPrice: 2400,
        image:
          "https://images.unsplash.com/photo-1594736797933-d0200ae1857e?w=400&h=400&fit=crop&sat=50",
        category: "Indian Fashion",
        brand: "Fabindia",
        description:
          "Elegant cotton Anarkali suit with dupatta and churidar. Comfortable and stylish for daily wear and occasions.",
        features: [
          "Pure Cotton",
          "3-Piece Set",
          "Comfortable Fit",
          "Machine Washable",
          "All Sizes Available",
        ],
        madeInIndia: true,
        region: "Jaipur, Rajasthan",
        artisan: "Cotton Textile Workers",
        inStock: true,
        rating: 4.5,
        reviews: 289,
        discount: 25,
      },
      {
        id: "ind_003",
        name: "Men's Silk Kurta with Pajama",
        price: 1200,
        originalPrice: 1600,
        image:
          "https://images.unsplash.com/photo-1566479179817-c0e7e45c2e8e?w=400&h=400&fit=crop&sat=50",
        category: "Indian Fashion",
        brand: "Manyavar",
        description:
          "Classic silk kurta with matching pajama for men. Perfect for festivals, weddings, and traditional occasions.",
        features: [
          "Pure Silk",
          "2-Piece Set",
          "Traditional Cut",
          "Festive Wear",
          "Premium Quality",
        ],
        madeInIndia: true,
        region: "Kolkata, West Bengal",
        artisan: "Traditional Tailors",
        inStock: true,
        rating: 4.6,
        reviews: 178,
        discount: 25,
      },
      {
        id: "ind_004",
        name: "Lehenga Choli Set",
        price: 4500,
        originalPrice: 6000,
        image:
          "https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=400&h=400&fit=crop&sat=50",
        category: "Indian Fashion",
        brand: "Kalki Fashion",
        description:
          "Beautiful embroidered lehenga choli with dupatta. Perfect for weddings and special occasions. Available in multiple colors.",
        features: [
          "Embroidered Design",
          "3-Piece Set",
          "Wedding Special",
          "Multiple Colors",
          "Custom Sizing",
        ],
        madeInIndia: true,
        region: "Delhi",
        artisan: "Fashion Designers",
        inStock: true,
        rating: 4.7,
        reviews: 134,
        discount: 25,
      },
      {
        id: "ind_005",
        name: "Cotton Dhoti Kurta Set",
        price: 800,
        originalPrice: 1000,
        image:
          "https://images.unsplash.com/photo-1566479179817-c0e7e45c2e8e?w=400&h=400&fit=crop&sat=50",
        category: "Indian Fashion",
        brand: "Khadi India",
        description:
          "Traditional cotton dhoti kurta set for men. Comfortable and breathable, perfect for daily wear and religious occasions.",
        features: [
          "Pure Cotton",
          "Traditional Design",
          "Breathable Fabric",
          "Religious Wear",
          "Easy to Wear",
        ],
        madeInIndia: true,
        region: "Gujarat",
        artisan: "Khadi Weavers",
        inStock: true,
        rating: 4.4,
        reviews: 98,
        discount: 20,
      },
      {
        id: "ind_006",
        name: "Handloom Cotton Saree",
        price: 1500,
        originalPrice: 2000,
        image:
          "https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=400&h=400&fit=crop&sat=50",
        category: "Indian Fashion",
        brand: "Handloom House",
        description:
          "Authentic handloom cotton saree with traditional patterns. Lightweight and comfortable for daily wear.",
        features: [
          "Handloom Cotton",
          "Traditional Patterns",
          "Lightweight",
          "Daily Wear",
          "Natural Dyes",
        ],
        madeInIndia: true,
        region: "Tamil Nadu",
        artisan: "Handloom Weavers",
        inStock: true,
        rating: 4.3,
        reviews: 245,
        discount: 25,
      },
      {
        id: "ind_007",
        name: "Chanderi Silk Dupatta",
        price: 900,
        originalPrice: 1200,
        image:
          "https://images.unsplash.com/photo-1594736797933-d0200ae1857e?w=400&h=400&fit=crop&sat=50",
        category: "Indian Fashion",
        brand: "Chanderi Weavers",
        description:
          "Elegant Chanderi silk dupatta with traditional motifs. Perfect accessory for Indian outfits.",
        features: [
          "Chanderi Silk",
          "Traditional Motifs",
          "Lightweight",
          "Versatile Accessory",
          "Handwoven",
        ],
        madeInIndia: true,
        region: "Chanderi, Madhya Pradesh",
        artisan: "Chanderi Weavers",
        inStock: true,
        rating: 4.4,
        reviews: 112,
        discount: 25,
      },
      {
        id: "ind_008",
        name: "Nehru Jacket for Men",
        price: 1100,
        originalPrice: 1500,
        image:
          "https://images.unsplash.com/photo-1566479179817-c0e7e45c2e8e?w=400&h=400&fit=crop&sat=50",
        category: "Indian Fashion",
        brand: "Raymond",
        description:
          "Classic Nehru jacket for men. Perfect for formal occasions and traditional events. Available in multiple colors.",
        features: [
          "Premium Fabric",
          "Classic Design",
          "Multiple Colors",
          "Formal Wear",
          "Traditional Style",
        ],
        madeInIndia: true,
        region: "Mumbai, Maharashtra",
        artisan: "Fashion Tailors",
        inStock: true,
        rating: 4.6,
        reviews: 87,
        discount: 27,
      },
      {
        id: "ind_009",
        name: "Punjabi Suit Set",
        price: 1400,
        originalPrice: 1800,
        image:
          "https://images.unsplash.com/photo-1594736797933-d0200ae1857e?w=400&h=400&fit=crop&sat=50",
        category: "Indian Fashion",
        brand: "Punjabi Heritage",
        description:
          "Traditional Punjabi suit with salwar and dupatta. Comfortable cotton fabric with beautiful embroidery work.",
        features: [
          "Cotton Fabric",
          "Embroidery Work",
          "3-Piece Set",
          "Traditional Design",
          "Comfortable Fit",
        ],
        madeInIndia: true,
        region: "Amritsar, Punjab",
        artisan: "Punjabi Designers",
        inStock: true,
        rating: 4.5,
        reviews: 203,
        discount: 22,
      },

      // INDIAN GROCERIES & SPICES
      {
        id: "ind_010",
        name: "Organic Garam Masala Blend",
        price: 180,
        originalPrice: 220,
        image:
          "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=400&h=400&fit=crop&sat=60",
        category: "Indian Groceries",
        brand: "Everest",
        description:
          "Premium organic garam masala blend with 15 traditional spices. No artificial colors or preservatives.",
        features: [
          "Organic Certified",
          "15 Spices",
          "No Preservatives",
          "Traditional Recipe",
          "Authentic Taste",
        ],
        madeInIndia: true,
        region: "Kerala",
        artisan: "Organic Spice Farmers",
        inStock: true,
        rating: 4.8,
        reviews: 445,
        discount: 18,
      },
      {
        id: "ind_011",
        name: "Darjeeling First Flush Tea",
        price: 450,
        originalPrice: 550,
        image:
          "https://images.unsplash.com/photo-1571934811356-5cc061b6821f?w=400&h=400&fit=crop&sat=50",
        category: "Indian Groceries",
        brand: "Twinings of India",
        description:
          "Premium Darjeeling tea with delicate muscatel flavor. First flush of the season from renowned tea gardens.",
        features: [
          "First Flush",
          "Muscatel Flavor",
          "Premium Grade",
          "Estate Fresh",
          "Limited Edition",
        ],
        madeInIndia: true,
        region: "Darjeeling, West Bengal",
        artisan: "Tea Garden Workers",
        inStock: true,
        rating: 4.6,
        reviews: 278,
        discount: 18,
      },
      {
        id: "ind_012",
        name: "Kashmir Saffron (Premium Grade)",
        price: 1200,
        originalPrice: 1500,
        image:
          "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=400&h=400&fit=crop&sat=60",
        category: "Indian Groceries",
        brand: "Kashmir Crown",
        description:
          "Authentic Kashmir saffron with rich aroma and color. Hand-picked from the saffron fields of Pampore.",
        features: [
          "Premium Grade",
          "Hand-Picked",
          "Rich Aroma",
          "Natural Color",
          "Pure Quality",
        ],
        madeInIndia: true,
        region: "Pampore, Kashmir",
        artisan: "Saffron Cultivators",
        inStock: true,
        rating: 4.9,
        reviews: 156,
        discount: 20,
      },
      {
        id: "ind_013",
        name: "Organic Turmeric Powder",
        price: 120,
        originalPrice: 150,
        image:
          "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=400&h=400&fit=crop&sat=60",
        category: "Indian Groceries",
        brand: "Organic India",
        description:
          "Pure organic turmeric powder with high curcumin content. Perfect for cooking and health benefits.",
        features: [
          "Organic Certified",
          "High Curcumin",
          "Pure Quality",
          "Health Benefits",
          "Fresh Ground",
        ],
        madeInIndia: true,
        region: "Tamil Nadu",
        artisan: "Organic Farmers",
        inStock: true,
        rating: 4.7,
        reviews: 389,
        discount: 20,
      },

      // INDIAN HANDICRAFTS & DECOR
      {
        id: "ind_014",
        name: "Brass Diya Set (Pack of 6)",
        price: 320,
        originalPrice: 400,
        image:
          "https://images.unsplash.com/photo-1605379399642-870262d3d051?w=400&h=400&fit=crop&sat=50",
        category: "Indian Handicrafts",
        brand: "Craftbell",
        description:
          "Traditional brass diyas perfect for festivals and daily worship. Handcrafted with intricate designs.",
        features: [
          "Pure Brass",
          "Handcrafted",
          "Festival Special",
          "Set of 6",
          "Traditional Design",
        ],
        madeInIndia: true,
        region: "Moradabad, Uttar Pradesh",
        artisan: "Brass Craftsmen",
        inStock: true,
        rating: 4.5,
        reviews: 167,
        discount: 20,
      },
      {
        id: "ind_015",
        name: "Madhubani Painting",
        price: 1800,
        originalPrice: 2400,
        image:
          "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop&sat=60",
        category: "Indian Handicrafts",
        brand: "Bihar Art House",
        description:
          "Authentic Madhubani painting on handmade paper. Traditional folk art from Bihar with natural colors.",
        features: [
          "Handmade Paper",
          "Natural Colors",
          "Traditional Art",
          "Authentic Design",
          "Folk Heritage",
        ],
        madeInIndia: true,
        region: "Mithila, Bihar",
        artisan: "Madhubani Artists",
        inStock: true,
        rating: 4.8,
        reviews: 89,
        discount: 25,
      },
      {
        id: "ind_016",
        name: "Wooden Elephant Carving",
        price: 950,
        originalPrice: 1200,
        image:
          "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop&sat=60",
        category: "Indian Handicrafts",
        brand: "Mysore Crafts",
        description:
          "Beautiful hand-carved wooden elephant with intricate details. Perfect decorative piece for home and office.",
        features: [
          "Hand-Carved",
          "Rosewood",
          "Intricate Details",
          "Home Decor",
          "Traditional Craft",
        ],
        madeInIndia: true,
        region: "Mysore, Karnataka",
        artisan: "Wood Carvers",
        inStock: true,
        rating: 4.6,
        reviews: 134,
        discount: 21,
      },

      // INDIAN BEAUTY & WELLNESS
      {
        id: "ind_017",
        name: "Ayurvedic Neem Face Pack",
        price: 240,
        originalPrice: 300,
        image:
          "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=400&fit=crop&sat=50",
        category: "Indian Beauty",
        brand: "Himalaya",
        description:
          "Natural neem and turmeric face pack for acne-prone skin. No chemicals or parabens, purely Ayurvedic.",
        features: [
          "100% Natural",
          "Neem & Turmeric",
          "Chemical Free",
          "Ayurvedic Formula",
          "Skin Friendly",
        ],
        madeInIndia: true,
        region: "Bangalore, Karnataka",
        artisan: "Ayurvedic Formulators",
        inStock: true,
        rating: 4.3,
        reviews: 324,
        discount: 20,
      },
      {
        id: "ind_018",
        name: "Coconut Oil Hair Serum",
        price: 180,
        originalPrice: 250,
        image:
          "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=400&h=400&fit=crop&sat=50",
        category: "Indian Beauty",
        brand: "Parachute Advanced",
        description:
          "Pure coconut oil enriched with vitamin E for strong and shiny hair. Traditional hair care solution.",
        features: [
          "Pure Coconut Oil",
          "Vitamin E",
          "Chemical Free",
          "Traditional Recipe",
          "Hair Nourishment",
        ],
        madeInIndia: true,
        region: "Kerala",
        artisan: "Coconut Oil Producers",
        inStock: true,
        rating: 4.6,
        reviews: 456,
        discount: 28,
      },
      {
        id: "ind_019",
        name: "Rose Water Toner",
        price: 150,
        originalPrice: 200,
        image:
          "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=400&h=400&fit=crop&sat=50",
        category: "Indian Beauty",
        brand: "Kama Ayurveda",
        description:
          "Pure rose water toner made from fresh rose petals. Natural skin refresher and toner for all skin types.",
        features: [
          "Pure Rose Water",
          "Natural Toner",
          "All Skin Types",
          "Chemical Free",
          "Fresh Fragrance",
        ],
        madeInIndia: true,
        region: "Kannauj, Uttar Pradesh",
        artisan: "Rose Water Distillers",
        inStock: true,
        rating: 4.4,
        reviews: 289,
        discount: 25,
      },

      // INDIAN JEWELRY
      {
        id: "ind_020",
        name: "Silver Oxidized Bangles Set",
        price: 450,
        originalPrice: 600,
        image:
          "https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=400&h=400&fit=crop&sat=50",
        category: "Indian Jewelry",
        brand: "Voylla",
        description:
          "Oxidized silver bangles with traditional tribal patterns. Set of 4 bangles with adjustable sizing.",
        features: [
          "Oxidized Silver",
          "Tribal Patterns",
          "Set of 4",
          "Adjustable Size",
          "Traditional Design",
        ],
        madeInIndia: true,
        region: "Kolkata, West Bengal",
        artisan: "Silver Craftsmen",
        inStock: true,
        rating: 4.3,
        reviews: 234,
        discount: 25,
      },
      {
        id: "ind_021",
        name: "Traditional Jhumka Earrings",
        price: 680,
        originalPrice: 850,
        image:
          "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&h=400&fit=crop&sat=60",
        category: "Indian Jewelry",
        brand: "Tanishq",
        description:
          "Classic gold-plated jhumka earrings with traditional design. Perfect for festivals and special occasions.",
        features: [
          "Gold Plated",
          "Traditional Design",
          "Lightweight",
          "Festival Special",
          "Elegant Finish",
        ],
        madeInIndia: true,
        region: "Jaipur, Rajasthan",
        artisan: "Jewelry Artisans",
        inStock: true,
        rating: 4.7,
        reviews: 178,
        discount: 20,
      },

      // INDIAN INSTRUMENTS & GAMES
      {
        id: "ind_022",
        name: "Handcrafted Tabla Set",
        price: 3500,
        originalPrice: 4500,
        image:
          "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop&sat=50",
        category: "Indian Instruments",
        brand: "Haridas Vhatkar",
        description:
          "Professional tabla set handcrafted by master artisans. Perfect for learning and concerts with proper tuning.",
        features: [
          "Handcrafted",
          "Professional Quality",
          "Properly Tuned",
          "Includes Accessories",
          "Master Made",
        ],
        madeInIndia: true,
        region: "Mumbai, Maharashtra",
        artisan: "Master Tabla Makers",
        inStock: true,
        rating: 4.8,
        reviews: 67,
        discount: 22,
      },
      {
        id: "ind_023",
        name: "Carrom Board with Coins",
        price: 1200,
        originalPrice: 1500,
        image:
          "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=400&h=400&fit=crop&sat=50",
        category: "Indian Games",
        brand: "Surco",
        description:
          "Traditional carrom board made from quality wood with smooth finish and complete set of coins and striker.",
        features: [
          "Quality Wood",
          "Smooth Finish",
          "Complete Set",
          "Traditional Size",
          "Family Game",
        ],
        madeInIndia: true,
        region: "Puducherry",
        artisan: "Wood Craftsmen",
        inStock: true,
        rating: 4.4,
        reviews: 189,
        discount: 20,
      },

      // INDIAN BOOKS & LITERATURE
      {
        id: "ind_024",
        name: "Bhagavad Gita (Hindi/English)",
        price: 180,
        originalPrice: 250,
        image:
          "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=400&fit=crop&sat=50",
        category: "Indian Books",
        brand: "Gita Press",
        description:
          "Sacred Bhagavad Gita with Hindi and English translation. Premium quality paper and traditional binding.",
        features: [
          "Hindi/English",
          "Premium Quality",
          "Traditional Binding",
          "Commentary Included",
          "Spiritual Guide",
        ],
        madeInIndia: true,
        region: "Gorakhpur, Uttar Pradesh",
        artisan: "Religious Publishers",
        inStock: true,
        rating: 4.9,
        reviews: 567,
        discount: 28,
      },
    ];
  }

  // Initialize Indian product categories
  initializeIndianCategories() {
    return [
      {
        id: "indian_fashion",
        name: "Indian Fashion",
        description: "Traditional & modern Indian clothing",
        image:
          "https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=300&h=200&fit=crop&sat=50",
        productCount: 9,
        featured: true,
      },
      {
        id: "indian_groceries",
        name: "Indian Groceries",
        description: "Authentic spices, tea, and traditional foods",
        image:
          "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=300&h=200&fit=crop&sat=60",
        productCount: 4,
        featured: true,
      },
      {
        id: "indian_handicrafts",
        name: "Indian Handicrafts",
        description: "Traditional art, crafts, and home decor",
        image:
          "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=200&fit=crop&sat=60",
        productCount: 3,
        featured: true,
      },
      {
        id: "indian_beauty",
        name: "Indian Beauty",
        description: "Ayurvedic and natural beauty products",
        image:
          "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=300&h=200&fit=crop&sat=50",
        productCount: 3,
        featured: true,
      },
      {
        id: "indian_jewelry",
        name: "Indian Jewelry",
        description: "Traditional and contemporary Indian jewelry",
        image:
          "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=300&h=200&fit=crop&sat=60",
        productCount: 2,
        featured: false,
      },
      {
        id: "indian_instruments",
        name: "Indian Instruments",
        description: "Traditional musical instruments and games",
        image:
          "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=200&fit=crop&sat=50",
        productCount: 2,
        featured: false,
      },
    ];
  }

  // Initialize prominent Indian brands
  initializeIndianBrands() {
    return [
      {
        name: "Tata",
        logo: "🏢",
        description: "Trusted Indian conglomerate",
        products: 45,
        established: 1868,
      },
      {
        name: "Reliance",
        logo: "🛢️",
        description: "India's largest private sector company",
        products: 34,
        established: 1966,
      },
      {
        name: "Fabindia",
        logo: "🧵",
        description: "Traditional Indian textiles and crafts",
        products: 89,
        established: 1960,
      },
      {
        name: "Himalaya",
        logo: "🌿",
        description: "Ayurvedic wellness and healthcare",
        products: 67,
        established: 1930,
      },
      {
        name: "Tanishq",
        logo: "💍",
        description: "India's trusted jewelry brand",
        products: 23,
        established: 1994,
      },
      {
        name: "Raymond",
        logo: "👔",
        description: "Complete man's clothing brand",
        products: 56,
        established: 1925,
      },
    ];
  }

  // Get featured Indian products
  getFeaturedIndianProducts(limit = 8) {
    return this.indianProducts
      .filter((product) => product.rating >= 4.3)
      .sort((a, b) => b.rating - a.rating)
      .slice(0, limit);
  }

  // Get products by Indian category
  getProductsByIndianCategory(categoryName, limit = 12) {
    return this.indianProducts
      .filter((product) => product.category === categoryName)
      .slice(0, limit);
  }

  // Get products by Indian brand
  getProductsByIndianBrand(brandName, limit = 12) {
    return this.indianProducts
      .filter((product) => product.brand === brandName)
      .slice(0, limit);
  }

  // Create Indian Products section for homepage
  createIndianProductsSection() {
    return `
      <!-- Made in India Section -->
      <section class="indian-products-section" style="
        background: linear-gradient(135deg, #ff9933, #ffffff, #138808);
        padding: 3rem 0;
        margin: 2rem 0;
        position: relative;
        overflow: hidden;
      ">
        <div class="container" style="max-width: 1200px; margin: 0 auto; padding: 0 1rem; position: relative; z-index: 2;">

          <!-- Section Header -->
          <div style="text-align: center; margin-bottom: 3rem;">
            <div style="
              display: inline-flex;
              align-items: center;
              background: rgba(255, 255, 255, 0.9);
              padding: 1rem 2rem;
              border-radius: 3rem;
              box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
              backdrop-filter: blur(10px);
              margin-bottom: 1.5rem;
            ">
              <span style="font-size: 2rem; margin-right: 1rem;">🇮🇳</span>
              <h2 style="
                font-size: 2rem;
                font-weight: 700;
                background: linear-gradient(135deg, #ff9933, #138808);
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
                background-clip: text;
                margin: 0;
              ">
                Made in India
              </h2>
            </div>
            <p style="
              font-size: 1.1rem;
              color: #2d3748;
              max-width: 600px;
              margin: 0 auto;
              line-height: 1.6;
              background: rgba(255, 255, 255, 0.8);
              padding: 1rem 2rem;
              border-radius: 1rem;
              backdrop-filter: blur(5px);
            ">
              Discover authentic Indian products crafted with love and tradition.
              Support local artisans and celebrate the heritage of India.
            </p>
          </div>

          <!-- Indian Categories -->
          <div style="margin-bottom: 3rem;">
            <h3 style="
              font-size: 1.5rem;
              font-weight: 600;
              color: #2d3748;
              margin-bottom: 1.5rem;
              text-align: center;
              background: rgba(255, 255, 255, 0.9);
              padding: 0.75rem 1.5rem;
              border-radius: 2rem;
              display: inline-block;
              width: 100%;
              box-sizing: border-box;
            ">
              🛍️ Shop by Indian Categories
            </h3>
            <div id="indianCategoriesGrid" style="
              display: grid;
              grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
              gap: 1.5rem;
            ">
              ${this.createIndianCategoriesGrid()}
            </div>
          </div>

          <!-- Featured Indian Products -->
          <div style="margin-bottom: 3rem;">
            <h3 style="
              font-size: 1.5rem;
              font-weight: 600;
              color: #2d3748;
              margin-bottom: 1.5rem;
              text-align: center;
              background: rgba(255, 255, 255, 0.9);
              padding: 0.75rem 1.5rem;
              border-radius: 2rem;
              display: inline-block;
              width: 100%;
              box-sizing: border-box;
            ">
              ⭐ Featured Indian Products
            </h3>
            <div id="featuredIndianProducts" style="
              display: grid;
              grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
              gap: 1.5rem;
            ">
              ${this.createFeaturedIndianProductsGrid()}
            </div>
          </div>

          <!-- Indian Brands Showcase -->
          <div style="margin-bottom: 2rem;">
            <h3 style="
              font-size: 1.5rem;
              font-weight: 600;
              color: #2d3748;
              margin-bottom: 1.5rem;
              text-align: center;
              background: rgba(255, 255, 255, 0.9);
              padding: 0.75rem 1.5rem;
              border-radius: 2rem;
              display: inline-block;
              width: 100%;
              box-sizing: border-box;
            ">
              🏆 Trusted Indian Brands
            </h3>
            <div id="indianBrandsGrid" style="
              display: grid;
              grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
              gap: 1rem;
            ">
              ${this.createIndianBrandsGrid()}
            </div>
          </div>

          <!-- Call to Action -->
          <div style="text-align: center;">
            <a href="indian-products.html" style="
              display: inline-flex;
              align-items: center;
              gap: 0.75rem;
              background: linear-gradient(135deg, #ff9933, #ff6b35);
              color: white;
              padding: 1rem 2rem;
              border-radius: 3rem;
              text-decoration: none;
              font-weight: 600;
              font-size: 1.1rem;
              box-shadow: 0 8px 25px rgba(255, 153, 51, 0.4);
              transition: all 0.3s ease;
              backdrop-filter: blur(10px);
            " onmouseover="this.style.transform='translateY(-3px)'; this.style.boxShadow='0 12px 35px rgba(255, 153, 51, 0.5)'"
               onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 8px 25px rgba(255, 153, 51, 0.4)'">
              <span style="font-size: 1.25rem;">🛒</span>
              Explore All Indian Products
              <span style="font-size: 1.25rem;">→</span>
            </a>
          </div>
        </div>

        <!-- Decorative Elements -->
        <div style="
          position: absolute;
          top: -50px;
          right: -50px;
          width: 200px;
          height: 200px;
          background: radial-gradient(circle, rgba(255, 153, 51, 0.2), transparent);
          border-radius: 50%;
          animation: float 6s ease-in-out infinite;
        "></div>
        <div style="
          position: absolute;
          bottom: -30px;
          left: -30px;
          width: 150px;
          height: 150px;
          background: radial-gradient(circle, rgba(19, 136, 8, 0.2), transparent);
          border-radius: 50%;
          animation: float 4s ease-in-out infinite reverse;
        "></div>
      </section>
    `;
  }

  createIndianCategoriesGrid() {
    return this.indianCategories
      .filter((category) => category.featured)
      .map(
        (category) => `
        <div style="
          background: rgba(255, 255, 255, 0.95);
          border-radius: 1rem;
          padding: 1.5rem;
          text-align: center;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
          transition: all 0.3s ease;
          cursor: pointer;
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.2);
        " onmouseover="this.style.transform='translateY(-5px)'; this.style.boxShadow='0 8px 25px rgba(0, 0, 0, 0.15)'"
           onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 4px 15px rgba(0, 0, 0, 0.1)'"
           onclick="filterProductsByCategory('${category.name}')">
          <div style="
            width: 80px;
            height: 80px;
            background: url('${category.image}') center/cover;
            border-radius: 50%;
            margin: 0 auto 1rem;
            border: 3px solid rgba(255, 153, 51, 0.3);
          "></div>
          <h4 style="
            font-size: 1.1rem;
            font-weight: 600;
            color: #2d3748;
            margin-bottom: 0.5rem;
          ">${category.name}</h4>
          <p style="
            color: #6b7280;
            font-size: 0.9rem;
            margin-bottom: 0.75rem;
            line-height: 1.4;
          ">${category.description}</p>
          <div style="
            background: linear-gradient(135deg, #ff9933, #ff6b35);
            color: white;
            padding: 0.25rem 0.75rem;
            border-radius: 1rem;
            font-size: 0.8rem;
            font-weight: 600;
            display: inline-block;
          ">
            ${category.productCount} Products
          </div>
        </div>
      `,
      )
      .join("");
  }

  createFeaturedIndianProductsGrid() {
    const featuredProducts = this.getFeaturedIndianProducts(8);
    return featuredProducts
      .map(
        (product) => `
      <div style="
        background: rgba(255, 255, 255, 0.95);
        border-radius: 1rem;
        padding: 1rem;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
        transition: all 0.3s ease;
        cursor: pointer;
        backdrop-filter: blur(10px);
        border: 1px solid rgba(255, 255, 255, 0.2);
        position: relative;
        overflow: hidden;
      " onmouseover="this.style.transform='translateY(-5px)'; this.style.boxShadow='0 8px 25px rgba(0, 0, 0, 0.15)'"
         onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 4px 15px rgba(0, 0, 0, 0.1)'"
         onclick="viewProduct('${product.id}')">

        <!-- Made in India Badge -->
        <div style="
          position: absolute;
          top: 0.75rem;
          left: 0.75rem;
          background: linear-gradient(135deg, #ff9933, #138808);
          color: white;
          padding: 0.25rem 0.75rem;
          border-radius: 1rem;
          font-size: 0.75rem;
          font-weight: 600;
          z-index: 2;
        ">
          🇮🇳 Made in India
        </div>

        <!-- Discount Badge -->
        ${
          product.discount
            ? `
          <div style="
            position: absolute;
            top: 0.75rem;
            right: 0.75rem;
            background: #ef4444;
            color: white;
            padding: 0.25rem 0.75rem;
            border-radius: 1rem;
            font-size: 0.75rem;
            font-weight: 600;
            z-index: 2;
          ">
            ${product.discount}% OFF
          </div>
        `
            : ""
        }

        <div style="
          width: 100%;
          height: 200px;
          background: url('${product.image}') center/cover;
          border-radius: 0.75rem;
          margin-bottom: 1rem;
        "></div>

        <h4 style="
          font-size: 1rem;
          font-weight: 600;
          color: #2d3748;
          margin-bottom: 0.5rem;
          line-height: 1.3;
          height: 2.6em;
          overflow: hidden;
        ">${product.name}</h4>

        <div style="margin-bottom: 0.75rem;">
          <div style="
            display: flex;
            align-items: center;
            gap: 0.5rem;
            margin-bottom: 0.25rem;
          ">
            <span style="
              font-size: 1.1rem;
              font-weight: 700;
              color: #059669;
            ">₹${product.price}</span>
            ${
              product.originalPrice
                ? `
              <span style="
                font-size: 0.9rem;
                color: #9ca3af;
                text-decoration: line-through;
              ">₹${product.originalPrice}</span>
            `
                : ""
            }
          </div>
          <div style="
            display: flex;
            align-items: center;
            gap: 0.25rem;
            font-size: 0.875rem;
          ">
            <span style="color: #f59e0b;">⭐</span>
            <span style="font-weight: 600;">${product.rating}</span>
            <span style="color: #6b7280;">(${product.reviews})</span>
          </div>
        </div>

        <div style="
          background: #f0f9ff;
          padding: 0.5rem;
          border-radius: 0.5rem;
          margin-bottom: 0.75rem;
        ">
          <div style="
            font-size: 0.8rem;
            color: #1e40af;
            font-weight: 600;
            margin-bottom: 0.25rem;
          ">📍 ${product.region}</div>
          <div style="
            font-size: 0.75rem;
            color: #6b7280;
          ">By ${product.artisan}</div>
        </div>

        <div style="display: flex; gap: 0.5rem;">
          <button style="
            flex: 1;
            background: linear-gradient(135deg, #059669, #047857);
            color: white;
            border: none;
            padding: 0.75rem;
            border-radius: 0.5rem;
            font-weight: 600;
            font-size: 0.9rem;
            cursor: pointer;
            transition: all 0.2s;
          " onmouseover="this.style.transform='scale(1.02)'"
             onmouseout="this.style.transform='scale(1)'"
             onclick="event.stopPropagation(); addToCart('${product.id}')">
            Add to Cart
          </button>
          <button style="
            background: rgba(255, 153, 51, 0.1);
            color: #ff9933;
            border: 1px solid #ff9933;
            padding: 0.75rem;
            border-radius: 0.5rem;
            cursor: pointer;
            transition: all 0.2s;
            min-width: 44px;
          " onmouseover="this.style.background='#ff9933'; this.style.color='white'"
             onmouseout="this.style.background='rgba(255, 153, 51, 0.1)'; this.style.color='#ff9933'"
             onclick="event.stopPropagation(); storeBargaining.openBargainingInterface(${JSON.stringify(product).replace(/"/g, "&quot;")})">
            🤝
          </button>
        </div>
      </div>
    `,
      )
      .join("");
  }

  createIndianBrandsGrid() {
    return this.indianBrands
      .map(
        (brand) => `
      <div style="
        background: rgba(255, 255, 255, 0.95);
        border-radius: 1rem;
        padding: 1.5rem;
        text-align: center;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
        transition: all 0.3s ease;
        cursor: pointer;
        backdrop-filter: blur(10px);
        border: 1px solid rgba(255, 255, 255, 0.2);
      " onmouseover="this.style.transform='translateY(-3px)'; this.style.boxShadow='0 6px 20px rgba(0, 0, 0, 0.12)'"
         onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 4px 15px rgba(0, 0, 0, 0.1)'"
         onclick="filterProductsByBrand('${brand.name}')">
        <div style="
          font-size: 2.5rem;
          margin-bottom: 0.75rem;
        ">${brand.logo}</div>
        <h4 style="
          font-size: 1.1rem;
          font-weight: 700;
          color: #2d3748;
          margin-bottom: 0.5rem;
        ">${brand.name}</h4>
        <p style="
          color: #6b7280;
          font-size: 0.85rem;
          margin-bottom: 0.75rem;
          line-height: 1.4;
        ">${brand.description}</p>
        <div style="
          display: flex;
          justify-content: space-between;
          font-size: 0.8rem;
          color: #9ca3af;
        ">
          <span>${brand.products} Products</span>
          <span>Est. ${brand.established}</span>
        </div>
      </div>
    `,
      )
      .join("");
  }

  // Get all Indian products
  getAllIndianProducts() {
    return this.indianProducts;
  }

  // Search Indian products
  searchIndianProducts(query) {
    const searchTerm = query.toLowerCase();
    return this.indianProducts.filter(
      (product) =>
        product.name.toLowerCase().includes(searchTerm) ||
        product.description.toLowerCase().includes(searchTerm) ||
        product.category.toLowerCase().includes(searchTerm) ||
        product.brand.toLowerCase().includes(searchTerm) ||
        product.region.toLowerCase().includes(searchTerm),
    );
  }
}

// Initialize Indian Products Section
let indianProducts;
document.addEventListener("DOMContentLoaded", function () {
  indianProducts = new IndianProductsSection();
});

// Export for global use
window.indianProducts = indianProducts;

// Helper functions for integration
function filterProductsByCategory(categoryName) {
  console.log(`Filtering products by category: ${categoryName}`);
  // This will be integrated with the main product filtering system
}

function filterProductsByBrand(brandName) {
  console.log(`Filtering products by brand: ${brandName}`);
  // This will be integrated with the main product filtering system
}

function viewProduct(productId) {
  console.log(`Viewing product: ${productId}`);
  // Navigate to product detail page
  window.location.href = `product-detail.html?id=${productId}`;
}
