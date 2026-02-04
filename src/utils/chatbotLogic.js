/**
 * Simple rule-based chatbot logic for workout recommendations
 */

const WORKOUT_DATABASE = {
    cardio: [
        "🏃‍♂️ **20-min HIIT Circuit**:\n- 30s Jumping Jacks\n- 30s Burpees\n- 30s High Knees\n- 30s Rest\n(Repeat 5x)",
        "🚴‍♀️ **Cycling Intervals**:\n- 5 min Warmup\n- 30s Sprint / 30s Rest (repeat 10x)\n- 5 min Cooldown",
        "🏃‍♀️ **Steady State**:\n- 45 min Jog at moderate pace (Zone 2 heart rate)"
    ],
    strength_upper: [
        "💪 **Upper Body Power**:\n- Pushups: 3x12\n- Dumbbell Rows: 3x12\n- Shoulder Press: 3x10\n- Bicep Curls: 3x15\n- Tricep Dips: 3x15",
        "🏋️‍♂️ **Chest & Back**:\n- Bench Press: 4x8\n- Pull-ups: 3xMax\n- Face Pulls: 3x15"
    ],
    strength_lower: [
        "🦵 **Leg Day Destroyer**:\n- Squats: 4x10\n- Lunges: 3x12 each leg\n- Romanian Deadlifts: 3x10\n- Calf Raises: 4x20",
        "🍑 **Glute Focus**:\n- Hip Thrusts: 4x12\n- Bulgarian Split Squats: 3x10\n- Glute Bridges: 3x20"
    ],
    core: [
        "🍫 **Abs Blaster**:\n- Plank: 3x60s\n- Russian Twists: 3x20\n- Leg Raises: 3x15\n- Bicycle Crunches: 3x20"
    ],
    yoga: [
        "🧘‍♀️ **Morning Flow**:\n- Sun Salutations A (5 rounds)\n- Warrior I & II\n- Triangle Pose\n- Tree Pose",
        "🛌 **Bedtime Stretch**:\n- Child's Pose (2 min)\n- Cat-Cow\n- Supine Twist\n- Legs Up The Wall"
    ]
};

const RECIPE_DATABASE = {
    breakfast: [
        "🥞 **Protein Pancakes**:\n- 1 banana\n- 2 eggs\n- 1 scoop protein powder\n- 1/4 tsp baking powder\n\nBlend all ingredients and cook on a non-stick pan until golden brown! (approx 350 cal)",
        "🥣 **Overnight Oats**:\n- 1/2 cup rolled oats\n- 1/2 cup almond milk\n- 1 tbsp chia seeds\n- 1/2 apple, diced\n\nMix in a jar and refrigerate overnight. Top with cinnamon in morning! (approx 300 cal)",
        "🥑 **Avocado Toast**:\n- 2 slices whole grain bread\n- 1/2 avocado, mashed\n- 1 poached egg\n- Red pepper flakes\n\nToast bread, spread avocado, top with egg and spice! (approx 400 cal)"
    ],
    lunch: [
        "🥗 **Grilled Chicken Salad**:\n- 150g grilled chicken breast\n- Mixed greens\n- Cucumber, cherry tomatoes\n- 1 tbsp olive oil & lemon dressing\n\nToss fresh veggies, top with warm chicken. (approx 450 cal)",
        "🌯 **Turkey Wrap**:\n- 1 whole wheat tortilla\n- 100g sliced turkey breast\n- Lettuce, tomato, mustard\n- 1 slice swiss cheese\n\nWrap it up tight! (approx 380 cal)",
        "🍲 **Quinoa Power Bowl**:\n- 1/2 cup cooked quinoa\n- 1/2 cup black beans\n- 1/2 cup roasted sweet potato\n- 1/4 avocado\n\nAssemble in bowl and drizzle with tahini. (approx 500 cal)"
    ],
    dinner: [
        "🐠 **Baked Salmon & Asparagus**:\n- 150g salmon fillet\n- 10 spears asparagus\n- Lemon slices, garlic, dill\n\nBake at 400°F (200°C) for 15-20 mins in foil packet. (approx 450 cal)",
        "🍝 **Zucchini Noodles with Pesto**:\n- 2 large zucchinis, spiralized\n- 2 tbsp basil pesto\n- 1 tbsp pine nuts\n- Cherry tomatoes\n\nSauté zoodles for 2 mins, toss with pesto. (approx 250 cal)",
        "🌮 **Lean Beef Tacos**:\n- 150g lean ground beef (seasoned)\n- 2 corn tortillas\n- Salsa, lettuce, onion\n\nCook beef, load up the shells! (approx 500 cal)",
        "🍛 **Healthy Butter Chicken**:\n- 150g chicken breast, cubed\n- 1/4 cup greek yogurt\n- 1/2 cup tomato puree\n- Garam masala, turmeric, cumin\n\nMarinate chicken in yogurt/spices. Cook in tomato sauce. Serve with cauliflower rice! (approx 400 cal)"
    ],
    snack: [
        "🍏 **Apple & Peanut Butter**:\n- 1 medium apple\n- 1 tbsp natural peanut butter\n(approx 200 cal)",
        "🥜 **Greek Yogurt & Berries**:\n- 1 cup greek yogurt\n- 1/2 cup mixed berries\n(approx 150 cal)",
        "🥕 **Hummus & Veggies**:\n- 1/4 cup hummus\n- Carrots & cucumber sticks\n(approx 180 cal)"
    ]
};

export function processMessage(message, userProfile) {
    const lowerMsg = message.toLowerCase();

    // Greeting
    if (lowerMsg.match(/\b(hi|hello|hey|yo)\b/)) {
        return `Hello ${userProfile?.name || 'there'}! 👋 I'm FitBot. Ready to help you get fit! Ask me for a "workout" or a "healthy recipe"!`;
    }

    // --- RECIPE SEARCH (Specific Dish) ---
    // Check if user is asking for a specific ingredient or dish name
    const allRecipes = [
        ...RECIPE_DATABASE.breakfast,
        ...RECIPE_DATABASE.lunch,
        ...RECIPE_DATABASE.dinner,
        ...RECIPE_DATABASE.snack
    ];

    // Simple keyword matching against recipe content
    const matchedRecipe = allRecipes.find(recipe => {
        // Extract title or key terms (simplistic)
        const contentLower = recipe.toLowerCase();
        // Check if message contains unique words from the recipe title
        // e.g. "butter chicken" in msg matches "Healthy Butter Chicken" in recipe
        if (lowerMsg.includes('butter chicken') && contentLower.includes('butter chicken')) return true;
        if (lowerMsg.includes('pancake') && contentLower.includes('pancake')) return true;
        if (lowerMsg.includes('oats') && contentLower.includes('oats')) return true;
        if (lowerMsg.includes('salmon') && contentLower.includes('salmon')) return true;
        if (lowerMsg.includes('taco') && contentLower.includes('taco')) return true;
        if (lowerMsg.includes('salad') && contentLower.includes('salad')) return true;
        return false;
    });

    if (matchedRecipe) {
        return "Found it! 👨‍🍳 Here's a healthy version for you:\n\n" + matchedRecipe;
    }

    // --- GENERAL RECIPES ---
    if (lowerMsg.includes('recipe') || lowerMsg.includes('cook') || lowerMsg.includes('eat') || lowerMsg.includes('food') || lowerMsg.includes('meal')) {
        if (lowerMsg.includes('breakfast')) {
            return "Rise and shine! ☀️ Here's a healthy breakfast idea:\n\n" + getRandomItem(RECIPE_DATABASE.breakfast);
        }
        if (lowerMsg.includes('lunch')) {
            return "Time to refuel! 🔋 Try this for lunch:\n\n" + getRandomItem(RECIPE_DATABASE.lunch);
        }
        if (lowerMsg.includes('dinner')) {
            return "Let's end the day right! 🌙 How about this for dinner:\n\n" + getRandomItem(RECIPE_DATABASE.dinner);
        }
        if (lowerMsg.includes('snack')) {
            return "Snack time? 😋 Here's a smart choice:\n\n" + getRandomItem(RECIPE_DATABASE.snack);
        }
        // Fallback for general "recipe" request
        const randomCat = Object.keys(RECIPE_DATABASE)[Math.floor(Math.random() * 4)];
        return `I love healthy food! 🥗 What meal are you looking for? (Breakfast, Lunch, Dinner, Snack)\n\nHere's a random choice (${randomCat}):\n\n` + getRandomItem(RECIPE_DATABASE[randomCat]);
    }

    // --- WORKOUTS ---
    // Goal-based recommendations
    if (lowerMsg.includes('lose weight') || lowerMsg.includes('fat loss') || lowerMsg.includes('burn fat')) {
        return "For weight loss, I recommend high-intensity cardio to burn calories! 🔥\n\n" + getRandomWorkout('cardio');
    }

    if (lowerMsg.includes('muscle') || lowerMsg.includes('strength') || lowerMsg.includes('bulk')) {
        return "To build muscle, we need to lift heavy! 🏋️‍♂️\n\nTry this upper body routine:\n" + getRandomWorkout('strength_upper');
    }

    // Specific body parts
    if (lowerMsg.includes('leg') || lowerMsg.includes('glute') || lowerMsg.includes('lower body')) {
        return "Don't skip leg day! 🐔 Here's a solid routine:\n\n" + getRandomWorkout('strength_lower');
    }

    if (lowerMsg.includes('arm') || lowerMsg.includes('chest') || lowerMsg.includes('back') || lowerMsg.includes('upper body')) {
        return "Let's pump up those muscles! 💪\n\n" + getRandomWorkout('strength_upper');
    }

    if (lowerMsg.includes('abs') || lowerMsg.includes('core') || lowerMsg.includes('belly')) {
        return "Let's work on that six-pack! 🍫\n\n" + getRandomWorkout('core');
    }

    // Types of exercise
    if (lowerMsg.includes('yoga') || lowerMsg.includes('stretch') || lowerMsg.includes('flexibility')) {
        return "Namaste! 🧘‍♀️ Here's a flow for you:\n\n" + getRandomWorkout('yoga');
    }

    if (lowerMsg.includes('cardio') || lowerMsg.includes('run')) {
        return "Let's get that heart rate up! ❤️\n\n" + getRandomWorkout('cardio');
    }

    // Advice based on difficulty
    if (lowerMsg.includes('beginner') || lowerMsg.includes('start')) {
        return "Welcome to your fitness journey! 🌟 Start slow. I recommend trying a 'Morning Yoga' flow or a simple '20-min Walk' to build the habit. Consistency > Intensity.";
    }

    // Default fallback
    return "I'm not sure about that specific request. 🤔\n\nTry asking for:\n- 'Leg workout'\n- 'Healthy breakfast recipe'\n- 'Yoga for beginners'\n- 'Dinner ideas'";
}

function getRandomWorkout(category) {
    return getRandomItem(WORKOUT_DATABASE[category]);
}

function getRandomItem(array) {
    return array[Math.floor(Math.random() * array.length)];
}
