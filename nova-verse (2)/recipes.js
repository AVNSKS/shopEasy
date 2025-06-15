// Recipe Database with Indian Dishes and Ingredients
const recipeDatabase = {
  biryani: {
    name: "Chicken Biryani",
    description: "Aromatic rice dish with tender chicken and fragrant spices",
    cookingTime: "60 minutes",
    serves: "4-5 people",
    image:
      "https://images.unsplash.com/photo-1563379091265-bee88c1c3e80?w=400&h=300&fit=crop&auto=format&q=80",
    ingredients: [
      {
        id: "basmati-rice",
        name: "Basmati Rice",
        quantity: "2 cups",
        price: 180,
        category: "Groceries & Food",
      },
      {
        id: "chicken",
        name: "Chicken (Cut pieces)",
        quantity: "1 kg",
        price: 320,
        category: "Groceries & Food",
      },
      {
        id: "onions",
        name: "Onions",
        quantity: "4 large",
        price: 60,
        category: "Groceries & Food",
      },
      {
        id: "yogurt",
        name: "Plain Yogurt",
        quantity: "1 cup",
        price: 45,
        category: "Groceries & Food",
      },
      {
        id: "ginger-garlic",
        name: "Ginger Garlic Paste",
        quantity: "2 tbsp",
        price: 35,
        category: "Groceries & Food",
      },
      {
        id: "biryani-masala",
        name: "Biryani Masala Powder",
        quantity: "2 tbsp",
        price: 25,
        category: "Groceries & Food",
      },
      {
        id: "saffron",
        name: "Saffron",
        quantity: "1 pinch",
        price: 150,
        category: "Groceries & Food",
      },
      {
        id: "mint-leaves",
        name: "Fresh Mint Leaves",
        quantity: "1/2 cup",
        price: 20,
        category: "Groceries & Food",
      },
      {
        id: "coriander-leaves",
        name: "Fresh Coriander",
        quantity: "1/2 cup",
        price: 15,
        category: "Groceries & Food",
      },
      {
        id: "ghee",
        name: "Pure Ghee",
        quantity: "3 tbsp",
        price: 85,
        category: "Groceries & Food",
      },
    ],
  },

  "dal tadka": {
    name: "Dal Tadka",
    description: "Yellow lentils tempered with aromatic spices",
    cookingTime: "30 minutes",
    serves: "3-4 people",
    image:
      "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400&h=300&fit=crop&auto=format&q=80",
    ingredients: [
      {
        id: "toor-dal",
        name: "Toor Dal (Yellow Lentils)",
        quantity: "1 cup",
        price: 120,
        category: "Groceries & Food",
      },
      {
        id: "onions-dal",
        name: "Onions",
        quantity: "2 medium",
        price: 30,
        category: "Groceries & Food",
      },
      {
        id: "tomatoes",
        name: "Tomatoes",
        quantity: "2 medium",
        price: 40,
        category: "Groceries & Food",
      },
      {
        id: "ginger-garlic-dal",
        name: "Ginger Garlic Paste",
        quantity: "1 tbsp",
        price: 35,
        category: "Groceries & Food",
      },
      {
        id: "turmeric",
        name: "Turmeric Powder",
        quantity: "1/2 tsp",
        price: 25,
        category: "Groceries & Food",
      },
      {
        id: "cumin-seeds",
        name: "Cumin Seeds",
        quantity: "1 tsp",
        price: 30,
        category: "Groceries & Food",
      },
      {
        id: "mustard-seeds",
        name: "Mustard Seeds",
        quantity: "1/2 tsp",
        price: 25,
        category: "Groceries & Food",
      },
      {
        id: "cooking-oil",
        name: "Cooking Oil",
        quantity: "2 tbsp",
        price: 45,
        category: "Groceries & Food",
      },
      {
        id: "coriander-dal",
        name: "Fresh Coriander",
        quantity: "2 tbsp",
        price: 15,
        category: "Groceries & Food",
      },
    ],
  },

  "butter chicken": {
    name: "Butter Chicken",
    description: "Creamy tomato-based chicken curry",
    cookingTime: "45 minutes",
    serves: "4 people",
    image:
      "https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?w=400&h=300&fit=crop&auto=format&q=80",
    ingredients: [
      {
        id: "chicken-butter",
        name: "Chicken (Boneless)",
        quantity: "750g",
        price: 280,
        category: "Groceries & Food",
      },
      {
        id: "butter",
        name: "Butter",
        quantity: "4 tbsp",
        price: 65,
        category: "Groceries & Food",
      },
      {
        id: "heavy-cream",
        name: "Heavy Cream",
        quantity: "1/2 cup",
        price: 55,
        category: "Groceries & Food",
      },
      {
        id: "tomato-puree",
        name: "Tomato Puree",
        quantity: "1 cup",
        price: 40,
        category: "Groceries & Food",
      },
      {
        id: "onions-butter",
        name: "Onions",
        quantity: "2 large",
        price: 40,
        category: "Groceries & Food",
      },
      {
        id: "garam-masala",
        name: "Garam Masala",
        quantity: "1 tsp",
        price: 35,
        category: "Groceries & Food",
      },
      {
        id: "kashmiri-chili",
        name: "Kashmiri Red Chili Powder",
        quantity: "1 tsp",
        price: 45,
        category: "Groceries & Food",
      },
      {
        id: "cashews",
        name: "Cashew Nuts",
        quantity: "10-12 pieces",
        price: 120,
        category: "Groceries & Food",
      },
    ],
  },

  rajma: {
    name: "Rajma (Kidney Bean Curry)",
    description: "Rich and hearty kidney bean curry",
    cookingTime: "40 minutes",
    serves: "4 people",
    image:
      "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400&h=300&fit=crop&auto=format&q=80",
    ingredients: [
      {
        id: "rajma-beans",
        name: "Rajma (Kidney Beans)",
        quantity: "1 cup",
        price: 95,
        category: "Groceries & Food",
      },
      {
        id: "onions-rajma",
        name: "Onions",
        quantity: "2 large",
        price: 40,
        category: "Groceries & Food",
      },
      {
        id: "tomatoes-rajma",
        name: "Tomatoes",
        quantity: "3 medium",
        price: 50,
        category: "Groceries & Food",
      },
      {
        id: "ginger-garlic-rajma",
        name: "Ginger Garlic Paste",
        quantity: "1 tbsp",
        price: 35,
        category: "Groceries & Food",
      },
      {
        id: "rajma-masala",
        name: "Rajma Masala Powder",
        quantity: "2 tsp",
        price: 30,
        category: "Groceries & Food",
      },
      {
        id: "bay-leaves",
        name: "Bay Leaves",
        quantity: "2 pieces",
        price: 15,
        category: "Groceries & Food",
      },
      {
        id: "cooking-oil-rajma",
        name: "Cooking Oil",
        quantity: "2 tbsp",
        price: 45,
        category: "Groceries & Food",
      },
    ],
  },

  chole: {
    name: "Chole (Chickpea Curry)",
    description: "Spicy and tangy chickpea curry",
    cookingTime: "35 minutes",
    serves: "4 people",
    image:
      "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400&h=300&fit=crop&auto=format&q=80",
    ingredients: [
      {
        id: "chickpeas",
        name: "Chickpeas (Kabuli Chana)",
        quantity: "1 cup",
        price: 85,
        category: "Groceries & Food",
      },
      {
        id: "onions-chole",
        name: "Onions",
        quantity: "2 medium",
        price: 35,
        category: "Groceries & Food",
      },
      {
        id: "tomatoes-chole",
        name: "Tomatoes",
        quantity: "2 large",
        price: 45,
        category: "Groceries & Food",
      },
      {
        id: "chole-masala",
        name: "Chole Masala Powder",
        quantity: "2 tsp",
        price: 35,
        category: "Groceries & Food",
      },
      {
        id: "amchur",
        name: "Dry Mango Powder (Amchur)",
        quantity: "1 tsp",
        price: 25,
        category: "Groceries & Food",
      },
      {
        id: "tea-bags",
        name: "Tea Bags",
        quantity: "2 pieces",
        price: 10,
        category: "Groceries & Food",
      },
      {
        id: "ginger-chole",
        name: "Fresh Ginger",
        quantity: "1 inch piece",
        price: 20,
        category: "Groceries & Food",
      },
    ],
  },

  "paneer butter masala": {
    name: "Paneer Butter Masala",
    description: "Rich and creamy cottage cheese curry",
    cookingTime: "25 minutes",
    serves: "3-4 people",
    image:
      "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=400&h=300&fit=crop&auto=format&q=80",
    ingredients: [
      {
        id: "paneer",
        name: "Fresh Paneer",
        quantity: "400g",
        price: 160,
        category: "Groceries & Food",
      },
      {
        id: "butter-paneer",
        name: "Butter",
        quantity: "3 tbsp",
        price: 65,
        category: "Groceries & Food",
      },
      {
        id: "cream-paneer",
        name: "Fresh Cream",
        quantity: "1/2 cup",
        price: 55,
        category: "Groceries & Food",
      },
      {
        id: "tomato-puree-paneer",
        name: "Tomato Puree",
        quantity: "3/4 cup",
        price: 35,
        category: "Groceries & Food",
      },
      {
        id: "cashews-paneer",
        name: "Cashew Nuts",
        quantity: "8-10 pieces",
        price: 120,
        category: "Groceries & Food",
      },
      {
        id: "ginger-garlic-paneer",
        name: "Ginger Garlic Paste",
        quantity: "1 tsp",
        price: 35,
        category: "Groceries & Food",
      },
      {
        id: "garam-masala-paneer",
        name: "Garam Masala",
        quantity: "1/2 tsp",
        price: 35,
        category: "Groceries & Food",
      },
      {
        id: "kasuri-methi",
        name: "Kasuri Methi (Dried Fenugreek)",
        quantity: "1 tsp",
        price: 25,
        category: "Groceries & Food",
      },
    ],
  },

  "aloo gobi": {
    name: "Aloo Gobi",
    description: "Dry curry with potatoes and cauliflower",
    cookingTime: "30 minutes",
    serves: "4 people",
    image:
      "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop&auto=format&q=80",
    ingredients: [
      {
        id: "potatoes",
        name: "Potatoes",
        quantity: "3 medium",
        price: 45,
        category: "Groceries & Food",
      },
      {
        id: "cauliflower",
        name: "Cauliflower",
        quantity: "1 medium head",
        price: 60,
        category: "Groceries & Food",
      },
      {
        id: "onions-aloo",
        name: "Onions",
        quantity: "1 large",
        price: 25,
        category: "Groceries & Food",
      },
      {
        id: "turmeric-aloo",
        name: "Turmeric Powder",
        quantity: "1/2 tsp",
        price: 25,
        category: "Groceries & Food",
      },
      {
        id: "coriander-powder",
        name: "Coriander Powder",
        quantity: "1 tsp",
        price: 30,
        category: "Groceries & Food",
      },
      {
        id: "cumin-powder",
        name: "Cumin Powder",
        quantity: "1/2 tsp",
        price: 35,
        category: "Groceries & Food",
      },
      {
        id: "green-chilies",
        name: "Green Chilies",
        quantity: "2-3 pieces",
        price: 15,
        category: "Groceries & Food",
      },
      {
        id: "cooking-oil-aloo",
        name: "Cooking Oil",
        quantity: "2 tbsp",
        price: 45,
        category: "Groceries & Food",
      },
    ],
  },

  pulao: {
    name: "Vegetable Pulao",
    description: "Fragrant rice cooked with mixed vegetables",
    cookingTime: "35 minutes",
    serves: "4 people",
    image:
      "https://images.unsplash.com/photo-1596797038530-2c107229654b?w=400&h=300&fit=crop&auto=format&q=80",
    ingredients: [
      {
        id: "basmati-rice-pulao",
        name: "Basmati Rice",
        quantity: "1.5 cups",
        price: 135,
        category: "Groceries & Food",
      },
      {
        id: "mixed-vegetables",
        name: "Mixed Vegetables (Carrots, Peas, Beans)",
        quantity: "1 cup",
        price: 65,
        category: "Groceries & Food",
      },
      {
        id: "onions-pulao",
        name: "Onions",
        quantity: "1 large",
        price: 25,
        category: "Groceries & Food",
      },
      {
        id: "whole-spices",
        name: "Whole Spices (Bay leaf, Cardamom, Cinnamon)",
        quantity: "1 set",
        price: 45,
        category: "Groceries & Food",
      },
      {
        id: "ghee-pulao",
        name: "Ghee",
        quantity: "2 tbsp",
        price: 85,
        category: "Groceries & Food",
      },
      {
        id: "mint-pulao",
        name: "Fresh Mint Leaves",
        quantity: "2 tbsp",
        price: 20,
        category: "Groceries & Food",
      },
      {
        id: "salt",
        name: "Salt",
        quantity: "To taste",
        price: 10,
        category: "Groceries & Food",
      },
    ],
  },
};

// Function to search recipes
function searchRecipes(query) {
  const searchTerm = query.toLowerCase().trim();
  const results = [];

  for (const [key, recipe] of Object.entries(recipeDatabase)) {
    if (
      key.includes(searchTerm) ||
      recipe.name.toLowerCase().includes(searchTerm) ||
      recipe.description.toLowerCase().includes(searchTerm)
    ) {
      results.push({ id: key, ...recipe });
    }
  }

  return results;
}

// Function to get recipe by ID
function getRecipeById(id) {
  return recipeDatabase[id] ? { id, ...recipeDatabase[id] } : null;
}

// Export functions for use in other files
window.recipeDatabase = recipeDatabase;
window.searchRecipes = searchRecipes;
window.getRecipeById = getRecipeById;
