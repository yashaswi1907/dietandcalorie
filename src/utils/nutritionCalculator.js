// Nutrition Calculator Utilities

/**
 * Calculate Basal Metabolic Rate (BMR) using Mifflin-St Jeor Equation
 * @param {number} weight - Weight in kg
 * @param {number} height - Height in cm
 * @param {number} age - Age in years
 * @param {string} gender - 'male' or 'female'
 * @returns {number} BMR in calories
 */
export function calculateBMR(weight, height, age, gender) {
    const baseCalc = 10 * weight + 6.25 * height - 5 * age;
    return gender.toLowerCase() === 'male' ? baseCalc + 5 : baseCalc - 161;
}

/**
 * Calculate Total Daily Energy Expenditure (TDEE)
 * @param {number} bmr - Basal Metabolic Rate
 * @param {string} activityLevel - Activity level
 * @returns {number} TDEE in calories
 */
export function calculateTDEE(bmr, activityLevel) {
    const activityMultipliers = {
        'sedentary': 1.2,
        'lightly-active': 1.375,
        'moderately-active': 1.55,
        'very-active': 1.725,
        'extremely-active': 1.9
    };

    const multiplier = activityMultipliers[activityLevel.toLowerCase()] || 1.2;
    return Math.round(bmr * multiplier);
}

/**
 * Adjust calories based on health goal
 * @param {number} tdee - Total Daily Energy Expenditure
 * @param {string} goal - Health goal
 * @returns {number} Adjusted daily calories
 */
export function adjustCaloriesForGoal(tdee, goal) {
    const adjustments = {
        'weight-loss': -500,
        'muscle-gain': 300,
        'maintenance': 0,
        'athletic-performance': 200
    };

    const adjustment = adjustments[goal.toLowerCase()] || 0;
    return Math.round(tdee + adjustment);
}

/**
 * Calculate macronutrient distribution
 * @param {number} calories - Daily calorie target
 * @param {string} planType - Type of diet plan
 * @returns {object} Macro distribution in grams
 */
export function calculateMacros(calories, planType) {
    const distributions = {
        'balanced': { protein: 0.30, carbs: 0.40, fats: 0.30 },
        'high-protein': { protein: 0.40, carbs: 0.30, fats: 0.30 },
        'low-carb': { protein: 0.35, carbs: 0.20, fats: 0.45 },
        'mediterranean': { protein: 0.25, carbs: 0.45, fats: 0.30 },
        'vegetarian': { protein: 0.25, carbs: 0.50, fats: 0.25 }
    };

    const dist = distributions[planType.toLowerCase()] || distributions['balanced'];

    return {
        protein: Math.round((calories * dist.protein) / 4), // 4 cal per gram
        carbs: Math.round((calories * dist.carbs) / 4),
        fats: Math.round((calories * dist.fats) / 9), // 9 cal per gram
        calories: calories
    };
}

/**
 * Adjust portion size and recalculate nutrition
 * @param {object} meal - Meal object with nutrition info
 * @param {number} multiplier - Portion multiplier (e.g., 1.5 for 150%)
 * @returns {object} Adjusted meal nutrition
 */
export function adjustPortion(meal, multiplier) {
    return {
        ...meal,
        calories: Math.round(meal.calories * multiplier),
        protein: Math.round(meal.protein * multiplier),
        carbs: Math.round(meal.carbs * multiplier),
        fats: Math.round(meal.fats * multiplier),
        fiber: Math.round(meal.fiber * multiplier),
        portionMultiplier: multiplier
    };
}

/**
 * Calculate total nutrition for a day's meals
 * @param {array} meals - Array of meal objects
 * @returns {object} Total daily nutrition
 */
export function calculateDailyTotals(meals) {
    return meals.reduce((totals, meal) => ({
        calories: totals.calories + (meal.calories || 0),
        protein: totals.protein + (meal.protein || 0),
        carbs: totals.carbs + (meal.carbs || 0),
        fats: totals.fats + (meal.fats || 0),
        fiber: totals.fiber + (meal.fiber || 0)
    }), { calories: 0, protein: 0, carbs: 0, fats: 0, fiber: 0 });
}

/**
 * Calculate BMI (Body Mass Index)
 * @param {number} weight - Weight in kg
 * @param {number} height - Height in cm
 * @returns {object} BMI value and category
 */
export function calculateBMI(weight, height) {
    const heightInMeters = height / 100;
    const bmi = weight / (heightInMeters * heightInMeters);

    let category;
    if (bmi < 18.5) category = 'Underweight';
    else if (bmi < 25) category = 'Normal';
    else if (bmi < 30) category = 'Overweight';
    else category = 'Obese';

    return {
        value: Math.round(bmi * 10) / 10,
        category
    };
}
