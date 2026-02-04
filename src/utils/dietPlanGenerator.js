// Diet Plan Generator - Creates multiple diet plan variations

import { calculateMacros } from './nutritionCalculator';
import { mealDatabase, getRandomMeals, excludeAllergens } from '../data/mealDatabase';

/**
 * Generate multiple diet plan options based on user profile
 * @param {object} userProfile - User profile data with nutritional requirements
 * @returns {array} Array of diet plan objects
 */
export function generateDietPlans(userProfile) {
    const { targetCalories, dietaryPreference, allergies } = userProfile;

    const planTypes = [
        {
            id: 'balanced',
            name: 'Balanced Diet',
            description: 'Well-rounded nutrition with equal focus on all macronutrients',
            icon: '⚖️',
            benefits: ['Sustainable', 'Easy to follow', 'Nutrient-rich']
        },
        {
            id: 'high-protein',
            name: 'High Protein',
            description: 'Protein-focused plan ideal for muscle building and recovery',
            icon: '💪',
            benefits: ['Muscle growth', 'Satiety', 'Recovery']
        },
        {
            id: 'low-carb',
            name: 'Low Carb',
            description: 'Reduced carbohydrates for fat loss and stable energy',
            icon: '🔥',
            benefits: ['Fat loss', 'Stable energy', 'Reduced cravings']
        },
        {
            id: 'mediterranean',
            name: 'Mediterranean',
            description: 'Heart-healthy plan rich in healthy fats and whole foods',
            icon: '🫒',
            benefits: ['Heart health', 'Anti-inflammatory', 'Longevity']
        },
        {
            id: 'vegetarian',
            name: 'Plant-Based',
            description: 'Vegetarian-friendly with plant proteins and whole grains',
            icon: '🌱',
            benefits: ['Eco-friendly', 'Fiber-rich', 'Antioxidants']
        }
    ];

    // Filter plan types based on dietary preference
    let availablePlans = planTypes;
    if (dietaryPreference === 'vegetarian' || dietaryPreference === 'vegan') {
        // Prioritize vegetarian and mediterranean plans
        availablePlans = planTypes.filter(p =>
            ['balanced', 'mediterranean', 'vegetarian'].includes(p.id)
        );
    }

    // Generate 3-4 plans
    const selectedPlanTypes = availablePlans.slice(0, 4);

    return selectedPlanTypes.map(planType => {
        const macros = calculateMacros(targetCalories, planType.id);
        const meals = generateDailyMeals(targetCalories, planType.id, dietaryPreference, allergies);

        return {
            ...planType,
            macros,
            meals,
            totalCalories: meals.reduce((sum, meal) => sum + meal.calories, 0)
        };
    });
}

/**
 * Generate a day's worth of meals for a specific plan type
 * @param {number} targetCalories - Target daily calories
 * @param {string} planType - Type of diet plan
 * @param {string} dietaryPreference - User's dietary preference
 * @param {array} allergies - List of allergens to exclude
 * @returns {array} Array of meals for the day
 */
function generateDailyMeals(targetCalories, planType, dietaryPreference, allergies) {
    // Calorie distribution: Breakfast 25%, Snack 10%, Lunch 35%, Snack 10%, Dinner 30%
    const distribution = {
        breakfast: 0.25,
        morningSnack: 0.10,
        lunch: 0.35,
        afternoonSnack: 0.10,
        dinner: 0.30
    };

    const filters = {
        dietary: dietaryPreference !== 'all' ? dietaryPreference : null,
        excludeAllergens: allergies || []
    };

    // Get meals for each time slot
    let breakfast = selectMealClosestToCalories(
        mealDatabase.breakfast,
        targetCalories * distribution.breakfast,
        filters
    );

    let morningSnack = selectMealClosestToCalories(
        mealDatabase.snacks,
        targetCalories * distribution.morningSnack,
        filters
    );

    let lunch = selectMealClosestToCalories(
        mealDatabase.lunch,
        targetCalories * distribution.lunch,
        filters
    );

    let afternoonSnack = selectMealClosestToCalories(
        mealDatabase.snacks,
        targetCalories * distribution.afternoonSnack,
        filters,
        [morningSnack.id] // Exclude morning snack to get variety
    );

    let dinner = selectMealClosestToCalories(
        mealDatabase.dinner,
        targetCalories * distribution.dinner,
        filters
    );

    return [
        { ...breakfast, mealType: 'breakfast', time: '8:00 AM' },
        { ...morningSnack, mealType: 'snack', time: '10:30 AM' },
        { ...lunch, mealType: 'lunch', time: '1:00 PM' },
        { ...afternoonSnack, mealType: 'snack', time: '4:00 PM' },
        { ...dinner, mealType: 'dinner', time: '7:30 PM' }
    ];
}

/**
 * Select a meal closest to target calories from available meals
 * @param {array} meals - Available meals
 * @param {number} targetCalories - Target calories for this meal
 * @param {object} filters - Dietary filters
 * @param {array} excludeIds - Meal IDs to exclude
 * @returns {object} Selected meal
 */
function selectMealClosestToCalories(meals, targetCalories, filters, excludeIds = []) {
    let filteredMeals = [...meals];

    // Apply dietary filter
    if (filters.dietary) {
        filteredMeals = filteredMeals.filter(meal =>
            meal.dietary.includes(filters.dietary.toLowerCase())
        );
    }

    // Apply allergen filter
    if (filters.excludeAllergens && filters.excludeAllergens.length > 0) {
        filteredMeals = excludeAllergens(filteredMeals, filters.excludeAllergens);
    }

    // Exclude specific IDs
    if (excludeIds.length > 0) {
        filteredMeals = filteredMeals.filter(meal => !excludeIds.includes(meal.id));
    }

    // If no meals match filters, fall back to original meals
    if (filteredMeals.length === 0) {
        filteredMeals = meals;
    }

    // Find meal closest to target calories
    const sorted = filteredMeals.sort((a, b) =>
        Math.abs(a.calories - targetCalories) - Math.abs(b.calories - targetCalories)
    );

    return { ...sorted[0] };
}

/**
 * Get alternative meals for a specific meal slot
 * @param {string} mealType - Type of meal (breakfast, lunch, dinner, snack)
 * @param {number} targetCalories - Target calories
 * @param {object} filters - Dietary filters
 * @param {string} currentMealId - ID of current meal to exclude
 * @param {number} count - Number of alternatives to return
 * @returns {array} Array of alternative meals
 */
export function getAlternativeMeals(mealType, targetCalories, filters, currentMealId, count = 5) {
    const mealCategory = mealType === 'snack' ? 'snacks' : mealType;
    let meals = [...mealDatabase[mealCategory]];

    // Apply filters
    if (filters.dietary) {
        meals = meals.filter(meal => meal.dietary.includes(filters.dietary.toLowerCase()));
    }

    if (filters.excludeAllergens && filters.excludeAllergens.length > 0) {
        meals = excludeAllergens(meals, filters.excludeAllergens);
    }

    if (filters.cuisine && filters.cuisine !== 'all') {
        meals = meals.filter(meal => meal.cuisine.toLowerCase() === filters.cuisine.toLowerCase());
    }

    // Exclude current meal
    meals = meals.filter(meal => meal.id !== currentMealId);

    // Sort by calorie proximity and return top matches
    const sorted = meals.sort((a, b) =>
        Math.abs(a.calories - targetCalories) - Math.abs(b.calories - targetCalories)
    );

    return sorted.slice(0, count);
}

/**
 * Get all available cuisines from the meal database
 * @returns {array} Array of cuisine types
 */
export function getAvailableCuisines() {
    const cuisines = new Set();

    Object.values(mealDatabase).forEach(category => {
        category.forEach(meal => {
            cuisines.add(meal.cuisine);
        });
    });

    return ['All', ...Array.from(cuisines)];
}
