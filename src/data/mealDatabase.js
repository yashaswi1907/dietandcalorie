// Comprehensive Meal Database with Nutritional Information

export const mealDatabase = {
    breakfast: [
        {
            id: 'b1',
            name: 'Oatmeal with Berries and Almonds',
            calories: 350,
            protein: 12,
            carbs: 52,
            fats: 10,
            fiber: 8,
            prepTime: '10 mins',
            cuisine: 'Continental',
            dietary: ['vegetarian', 'vegan-option'],
            allergens: ['nuts'],
            ingredients: ['Oats', 'Mixed berries', 'Almonds', 'Honey', 'Almond milk']
        },
        {
            id: 'b2',
            name: 'Greek Yogurt Parfait',
            calories: 320,
            protein: 20,
            carbs: 38,
            fats: 8,
            fiber: 4,
            prepTime: '5 mins',
            cuisine: 'Mediterranean',
            dietary: ['vegetarian'],
            allergens: ['dairy'],
            ingredients: ['Greek yogurt', 'Granola', 'Honey', 'Fresh fruits', 'Chia seeds']
        },
        {
            id: 'b3',
            name: 'Scrambled Eggs with Whole Wheat Toast',
            calories: 380,
            protein: 22,
            carbs: 32,
            fats: 16,
            fiber: 5,
            prepTime: '12 mins',
            cuisine: 'Continental',
            dietary: ['vegetarian'],
            allergens: ['eggs', 'gluten'],
            ingredients: ['Eggs', 'Whole wheat bread', 'Butter', 'Spinach', 'Tomatoes']
        },
        {
            id: 'b4',
            name: 'Poha (Flattened Rice)',
            calories: 310,
            protein: 8,
            carbs: 54,
            fats: 6,
            fiber: 3,
            prepTime: '15 mins',
            cuisine: 'Indian',
            dietary: ['vegetarian', 'vegan', 'gluten-free'],
            allergens: [],
            ingredients: ['Poha', 'Peanuts', 'Curry leaves', 'Turmeric', 'Lemon']
        },
        {
            id: 'b5',
            name: 'Protein Pancakes with Maple Syrup',
            calories: 420,
            protein: 28,
            carbs: 48,
            fats: 12,
            fiber: 4,
            prepTime: '15 mins',
            cuisine: 'Continental',
            dietary: ['vegetarian'],
            allergens: ['eggs', 'dairy', 'gluten'],
            ingredients: ['Protein powder', 'Eggs', 'Oat flour', 'Banana', 'Maple syrup']
        },
        {
            id: 'b6',
            name: 'Idli with Sambar',
            calories: 280,
            protein: 10,
            carbs: 50,
            fats: 4,
            fiber: 6,
            prepTime: '20 mins',
            cuisine: 'Indian',
            dietary: ['vegetarian', 'vegan', 'gluten-free'],
            allergens: [],
            ingredients: ['Rice', 'Urad dal', 'Lentils', 'Vegetables', 'Spices']
        },
        {
            id: 'b7',
            name: 'Avocado Toast with Poached Egg',
            calories: 390,
            protein: 16,
            carbs: 34,
            fats: 22,
            fiber: 8,
            prepTime: '12 mins',
            cuisine: 'Continental',
            dietary: ['vegetarian'],
            allergens: ['eggs', 'gluten'],
            ingredients: ['Whole grain bread', 'Avocado', 'Eggs', 'Cherry tomatoes', 'Feta cheese']
        },
        {
            id: 'b8',
            name: 'Smoothie Bowl',
            calories: 340,
            protein: 14,
            carbs: 56,
            fats: 8,
            fiber: 10,
            prepTime: '8 mins',
            cuisine: 'Continental',
            dietary: ['vegetarian', 'vegan'],
            allergens: [],
            ingredients: ['Banana', 'Berries', 'Spinach', 'Protein powder', 'Granola', 'Coconut']
        }
    ],

    lunch: [
        {
            id: 'l1',
            name: 'Grilled Chicken Salad',
            calories: 420,
            protein: 38,
            carbs: 24,
            fats: 18,
            fiber: 6,
            prepTime: '20 mins',
            cuisine: 'Continental',
            dietary: ['non-vegetarian', 'gluten-free'],
            allergens: [],
            ingredients: ['Chicken breast', 'Mixed greens', 'Cherry tomatoes', 'Olive oil', 'Balsamic vinegar']
        },
        {
            id: 'l2',
            name: 'Quinoa Buddha Bowl',
            calories: 480,
            protein: 18,
            carbs: 62,
            fats: 16,
            fiber: 12,
            prepTime: '25 mins',
            cuisine: 'Mediterranean',
            dietary: ['vegetarian', 'vegan', 'gluten-free'],
            allergens: [],
            ingredients: ['Quinoa', 'Chickpeas', 'Roasted vegetables', 'Tahini', 'Avocado']
        },
        {
            id: 'l3',
            name: 'Dal Tadka with Brown Rice',
            calories: 450,
            protein: 16,
            carbs: 68,
            fats: 10,
            fiber: 10,
            prepTime: '30 mins',
            cuisine: 'Indian',
            dietary: ['vegetarian', 'vegan', 'gluten-free'],
            allergens: [],
            ingredients: ['Toor dal', 'Brown rice', 'Tomatoes', 'Spices', 'Ghee']
        },
        {
            id: 'l4',
            name: 'Salmon with Roasted Vegetables',
            calories: 520,
            protein: 42,
            carbs: 28,
            fats: 26,
            fiber: 8,
            prepTime: '30 mins',
            cuisine: 'Mediterranean',
            dietary: ['non-vegetarian', 'gluten-free'],
            allergens: ['fish'],
            ingredients: ['Salmon fillet', 'Broccoli', 'Bell peppers', 'Olive oil', 'Lemon']
        },
        {
            id: 'l5',
            name: 'Paneer Tikka Wrap',
            calories: 490,
            protein: 24,
            carbs: 52,
            fats: 18,
            fiber: 6,
            prepTime: '25 mins',
            cuisine: 'Indian',
            dietary: ['vegetarian'],
            allergens: ['dairy', 'gluten'],
            ingredients: ['Paneer', 'Whole wheat wrap', 'Yogurt', 'Spices', 'Vegetables']
        },
        {
            id: 'l6',
            name: 'Teriyaki Chicken Bowl',
            calories: 510,
            protein: 36,
            carbs: 58,
            fats: 14,
            fiber: 4,
            prepTime: '25 mins',
            cuisine: 'Asian',
            dietary: ['non-vegetarian'],
            allergens: ['soy', 'gluten'],
            ingredients: ['Chicken', 'Rice', 'Teriyaki sauce', 'Broccoli', 'Sesame seeds']
        },
        {
            id: 'l7',
            name: 'Chickpea Curry with Roti',
            calories: 460,
            protein: 18,
            carbs: 64,
            fats: 14,
            fiber: 14,
            prepTime: '30 mins',
            cuisine: 'Indian',
            dietary: ['vegetarian', 'vegan'],
            allergens: ['gluten'],
            ingredients: ['Chickpeas', 'Whole wheat roti', 'Tomatoes', 'Onions', 'Spices']
        },
        {
            id: 'l8',
            name: 'Turkey and Avocado Sandwich',
            calories: 440,
            protein: 32,
            carbs: 38,
            fats: 18,
            fiber: 8,
            prepTime: '10 mins',
            cuisine: 'Continental',
            dietary: ['non-vegetarian'],
            allergens: ['gluten'],
            ingredients: ['Turkey breast', 'Whole grain bread', 'Avocado', 'Lettuce', 'Tomato']
        }
    ],

    dinner: [
        {
            id: 'd1',
            name: 'Grilled Fish with Quinoa',
            calories: 480,
            protein: 40,
            carbs: 42,
            fats: 14,
            fiber: 6,
            prepTime: '30 mins',
            cuisine: 'Mediterranean',
            dietary: ['non-vegetarian', 'gluten-free'],
            allergens: ['fish'],
            ingredients: ['White fish', 'Quinoa', 'Asparagus', 'Lemon', 'Olive oil']
        },
        {
            id: 'd2',
            name: 'Vegetable Stir-Fry with Tofu',
            calories: 420,
            protein: 22,
            carbs: 48,
            fats: 16,
            fiber: 10,
            prepTime: '20 mins',
            cuisine: 'Asian',
            dietary: ['vegetarian', 'vegan', 'gluten-free'],
            allergens: ['soy'],
            ingredients: ['Tofu', 'Mixed vegetables', 'Brown rice', 'Soy sauce', 'Ginger']
        },
        {
            id: 'd3',
            name: 'Chicken Biryani',
            calories: 550,
            protein: 32,
            carbs: 64,
            fats: 18,
            fiber: 4,
            prepTime: '45 mins',
            cuisine: 'Indian',
            dietary: ['non-vegetarian', 'gluten-free'],
            allergens: ['dairy'],
            ingredients: ['Chicken', 'Basmati rice', 'Yogurt', 'Spices', 'Saffron']
        },
        {
            id: 'd4',
            name: 'Lentil Soup with Whole Grain Bread',
            calories: 380,
            protein: 18,
            carbs: 58,
            fats: 8,
            fiber: 16,
            prepTime: '35 mins',
            cuisine: 'Mediterranean',
            dietary: ['vegetarian', 'vegan'],
            allergens: ['gluten'],
            ingredients: ['Red lentils', 'Vegetables', 'Whole grain bread', 'Olive oil', 'Herbs']
        },
        {
            id: 'd5',
            name: 'Beef Stir-Fry with Vegetables',
            calories: 520,
            protein: 38,
            carbs: 44,
            fats: 20,
            fiber: 6,
            prepTime: '25 mins',
            cuisine: 'Asian',
            dietary: ['non-vegetarian'],
            allergens: ['soy', 'gluten'],
            ingredients: ['Beef strips', 'Mixed vegetables', 'Rice noodles', 'Soy sauce', 'Garlic']
        },
        {
            id: 'd6',
            name: 'Palak Paneer with Roti',
            calories: 460,
            protein: 20,
            carbs: 48,
            fats: 20,
            fiber: 8,
            prepTime: '30 mins',
            cuisine: 'Indian',
            dietary: ['vegetarian'],
            allergens: ['dairy', 'gluten'],
            ingredients: ['Spinach', 'Paneer', 'Whole wheat roti', 'Cream', 'Spices']
        },
        {
            id: 'd7',
            name: 'Baked Cod with Sweet Potato',
            calories: 440,
            protein: 36,
            carbs: 52,
            fats: 10,
            fiber: 8,
            prepTime: '35 mins',
            cuisine: 'Continental',
            dietary: ['non-vegetarian', 'gluten-free'],
            allergens: ['fish'],
            ingredients: ['Cod fillet', 'Sweet potato', 'Green beans', 'Herbs', 'Lemon']
        },
        {
            id: 'd8',
            name: 'Mushroom Risotto',
            calories: 490,
            protein: 14,
            carbs: 68,
            fats: 18,
            fiber: 4,
            prepTime: '40 mins',
            cuisine: 'Italian',
            dietary: ['vegetarian'],
            allergens: ['dairy', 'gluten'],
            ingredients: ['Arborio rice', 'Mushrooms', 'Parmesan', 'White wine', 'Butter']
        }
    ],

    snacks: [
        {
            id: 's1',
            name: 'Apple with Almond Butter',
            calories: 180,
            protein: 4,
            carbs: 24,
            fats: 8,
            fiber: 5,
            prepTime: '2 mins',
            cuisine: 'Continental',
            dietary: ['vegetarian', 'vegan', 'gluten-free'],
            allergens: ['nuts'],
            ingredients: ['Apple', 'Almond butter']
        },
        {
            id: 's2',
            name: 'Protein Shake',
            calories: 220,
            protein: 25,
            carbs: 18,
            fats: 4,
            fiber: 2,
            prepTime: '3 mins',
            cuisine: 'Continental',
            dietary: ['vegetarian'],
            allergens: ['dairy'],
            ingredients: ['Protein powder', 'Banana', 'Milk', 'Ice']
        },
        {
            id: 's3',
            name: 'Hummus with Veggie Sticks',
            calories: 150,
            protein: 6,
            carbs: 18,
            fats: 6,
            fiber: 6,
            prepTime: '5 mins',
            cuisine: 'Mediterranean',
            dietary: ['vegetarian', 'vegan', 'gluten-free'],
            allergens: [],
            ingredients: ['Chickpeas', 'Tahini', 'Carrots', 'Cucumber', 'Bell peppers']
        },
        {
            id: 's4',
            name: 'Mixed Nuts and Dried Fruits',
            calories: 200,
            protein: 6,
            carbs: 20,
            fats: 12,
            fiber: 4,
            prepTime: '1 min',
            cuisine: 'Continental',
            dietary: ['vegetarian', 'vegan', 'gluten-free'],
            allergens: ['nuts'],
            ingredients: ['Almonds', 'Cashews', 'Raisins', 'Dried cranberries']
        },
        {
            id: 's5',
            name: 'Roasted Chickpeas',
            calories: 140,
            protein: 8,
            carbs: 22,
            fats: 3,
            fiber: 6,
            prepTime: '25 mins',
            cuisine: 'Mediterranean',
            dietary: ['vegetarian', 'vegan', 'gluten-free'],
            allergens: [],
            ingredients: ['Chickpeas', 'Olive oil', 'Spices']
        },
        {
            id: 's6',
            name: 'Cottage Cheese with Berries',
            calories: 160,
            protein: 14,
            carbs: 18,
            fats: 4,
            fiber: 3,
            prepTime: '3 mins',
            cuisine: 'Continental',
            dietary: ['vegetarian', 'gluten-free'],
            allergens: ['dairy'],
            ingredients: ['Cottage cheese', 'Mixed berries', 'Honey']
        },
        {
            id: 's7',
            name: 'Masala Chai with Biscuits',
            calories: 170,
            protein: 4,
            carbs: 28,
            fats: 5,
            fiber: 1,
            prepTime: '10 mins',
            cuisine: 'Indian',
            dietary: ['vegetarian'],
            allergens: ['dairy', 'gluten'],
            ingredients: ['Tea', 'Milk', 'Spices', 'Whole wheat biscuits']
        },
        {
            id: 's8',
            name: 'Rice Cakes with Peanut Butter',
            calories: 190,
            protein: 7,
            carbs: 24,
            fats: 8,
            fiber: 2,
            prepTime: '2 mins',
            cuisine: 'Continental',
            dietary: ['vegetarian', 'vegan', 'gluten-free'],
            allergens: ['peanuts'],
            ingredients: ['Rice cakes', 'Peanut butter', 'Banana slices']
        }
    ]
};

// Helper function to filter meals by dietary preference
export function filterByDietary(meals, preference) {
    if (!preference || preference === 'all') return meals;
    return meals.filter(meal => meal.dietary.includes(preference.toLowerCase()));
}

// Helper function to filter meals by cuisine
export function filterByCuisine(meals, cuisine) {
    if (!cuisine || cuisine === 'all') return meals;
    return meals.filter(meal => meal.cuisine.toLowerCase() === cuisine.toLowerCase());
}

// Helper function to exclude meals with allergens
export function excludeAllergens(meals, allergens) {
    if (!allergens || allergens.length === 0) return meals;
    return meals.filter(meal =>
        !meal.allergens.some(allergen => allergens.includes(allergen))
    );
}

// Get random meals from a category
export function getRandomMeals(category, count = 3, filters = {}) {
    let meals = [...mealDatabase[category]];

    // Apply filters
    if (filters.dietary) {
        meals = filterByDietary(meals, filters.dietary);
    }
    if (filters.cuisine) {
        meals = filterByCuisine(meals, filters.cuisine);
    }
    if (filters.excludeAllergens) {
        meals = excludeAllergens(meals, filters.excludeAllergens);
    }

    // Shuffle and return requested count
    const shuffled = meals.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, Math.min(count, shuffled.length));
}
