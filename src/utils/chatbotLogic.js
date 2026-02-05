/**
 * Simple chatbot logic - Refactored with Decision Tree and Map (Hash Map)
 */

// DATA STRUCTURE: Hash Map
const WORKOUT_DATABASE = new Map([
    ['cardio', [
        "🏃‍♂️ **20-min HIIT Circuit**:\n- 30s Jumping Jacks\n- 30s Burpees\n- 30s High Knees\n- 30s Rest\n(Repeat 5x)",
        "🚴‍♀️ **Cycling Intervals**:\n- 5 min Warmup\n- 30s Sprint / 30s Rest (repeat 10x)\n- 5 min Cooldown",
        "🏃‍♀️ **Steady State**:\n- 45 min Jog at moderate pace (Zone 2 heart rate)"
    ]],
    ['strength_upper', [
        "💪 **Upper Body Power**:\n- Pushups: 3x12\n- Dumbbell Rows: 3x12\n- Shoulder Press: 3x10\n- Bicep Curls: 3x15\n- Tricep Dips: 3x15",
        "🏋️‍♂️ **Chest & Back**:\n- Bench Press: 4x8\n- Pull-ups: 3xMax\n- Face Pulls: 3x15"
    ]],
    ['strength_lower', [
        "🦵 **Leg Day Destroyer**:\n- Squats: 4x10\n- Lunges: 3x12 each leg\n- Romanian Deadlifts: 3x10\n- Calf Raises: 4x20",
        "🍑 **Glute Focus**:\n- Hip Thrusts: 4x12\n- Bulgarian Split Squats: 3x10\n- Glute Bridges: 3x20"
    ]],
    ['core', [
        "🍫 **Abs Blaster**:\n- Plank: 3x60s\n- Russian Twists: 3x20\n- Leg Raises: 3x15\n- Bicycle Crunches: 3x20"
    ]],
    ['yoga', [
        "🧘‍♀️ **Morning Flow**:\n- Sun Salutations A (5 rounds)\n- Warrior I & II\n- Triangle Pose\n- Tree Pose",
        "🛌 **Bedtime Stretch**:\n- Child's Pose (2 min)\n- Cat-Cow\n- Supine Twist\n- Legs Up The Wall"
    ]]
]);

// DATA STRUCTURE: Hash Map
const RECIPE_DATABASE = new Map([
    ['breakfast', [
        "🥞 **Protein Pancakes**:\n- 1 banana\n- 2 eggs\n- 1 scoop protein powder\n- 1/4 tsp baking powder\n\nBlend all ingredients and cook on a non-stick pan until golden brown! (approx 350 cal)",
        "🥣 **Overnight Oats**:\n- 1/2 cup rolled oats\n- 1/2 cup almond milk\n- 1 tbsp chia seeds\n- 1/2 apple, diced\n\nMix in a jar and refrigerate overnight. Top with cinnamon in morning! (approx 300 cal)",
        "🥑 **Avocado Toast**:\n- 2 slices whole grain bread\n- 1/2 avocado, mashed\n- 1 poached egg\n- Red pepper flakes\n\nToast bread, spread avocado, top with egg and spice! (approx 400 cal)"
    ]],
    ['lunch', [
        "🥗 **Grilled Chicken Salad**:\n- 150g grilled chicken breast\n- Mixed greens\n- Cucumber, cherry tomatoes\n- 1 tbsp olive oil & lemon dressing\n\nToss fresh veggies, top with warm chicken. (approx 450 cal)",
        "🌯 **Turkey Wrap**:\n- 1 whole wheat tortilla\n- 100g sliced turkey breast\n- Lettuce, tomato, mustard\n- 1 slice swiss cheese\n\nWrap it up tight! (approx 380 cal)",
        "🍲 **Quinoa Power Bowl**:\n- 1/2 cup cooked quinoa\n- 1/2 cup black beans\n- 1/2 cup roasted sweet potato\n- 1/4 avocado\n\nAssemble in bowl and drizzle with tahini. (approx 500 cal)"
    ]],
    ['dinner', [
        "🐠 **Baked Salmon & Asparagus**:\n- 150g salmon fillet\n- 10 spears asparagus\n- Lemon slices, garlic, dill\n\nBake at 400°F (200°C) for 15-20 mins in foil packet. (approx 450 cal)",
        "🍝 **Zucchini Noodles with Pesto**:\n- 2 large zucchinis, spiralized\n- 2 tbsp basil pesto\n- 1 tbsp pine nuts\n- Cherry tomatoes\n\nSauté zoodles for 2 mins, toss with pesto. (approx 250 cal)",
        "🌮 **Lean Beef Tacos**:\n- 150g lean ground beef (seasoned)\n- 2 corn tortillas\n- Salsa, lettuce, onion\n\nCook beef, load up the shells! (approx 500 cal)",
        "🍛 **Healthy Butter Chicken**:\n- 150g chicken breast, cubed\n- 1/4 cup greek yogurt\n- 1/2 cup tomato puree\n- Garam masala, turmeric, cumin\n\nMarinate chicken in yogurt/spices. Cook in tomato sauce. Serve with cauliflower rice! (approx 400 cal)"
    ]],
    ['snack', [
        "🍏 **Apple & Peanut Butter**:\n- 1 medium apple\n- 1 tbsp natural peanut butter\n(approx 200 cal)",
        "🥜 **Greek Yogurt & Berries**:\n- 1 cup greek yogurt\n- 1/2 cup mixed berries\n(approx 150 cal)",
        "🥕 **Hummus & Veggies**:\n- 1/4 cup hummus\n- Carrots & cucumber sticks\n(approx 180 cal)"
    ]]
]);

// DATA STRUCTURE: Tree Node
class DecisionNode {
    constructor(condition, yesNode, noNode) {
        this.condition = condition; // Function returning true/false
        this.yesNode = yesNode;     // Next node if true (or a string response)
        this.noNode = noNode;       // Next node if false (or a string response)
    }

    evaluate(context) {
        if (this.condition(context)) {
            if (this.yesNode instanceof DecisionNode) {
                return this.yesNode.evaluate(context);
            }
            return typeof this.yesNode === 'function' ? this.yesNode(context) : this.yesNode;
        } else {
            if (this.noNode instanceof DecisionNode) {
                return this.noNode.evaluate(context);
            }
            return typeof this.noNode === 'function' ? this.noNode(context) : this.noNode;
        }
    }
}

// Helper to get random item from hash map approach
function getRandomItem(map, key) {
    if (!map.has(key)) return null;
    const array = map.get(key);
    return array[Math.floor(Math.random() * array.length)];
}

// Build the logic tree
// 1. Greeting
const greetingNode = new DecisionNode(
    (ctx) => ctx.msg.match(/\b(hi|hello|hey|yo)\b/),
    (ctx) => `Hello ${ctx.profile?.name || 'there'}! 👋 I'm FitBot. Ready to help you get fit! Ask me for a "workout" or a "healthy recipe"!`,
    null // Will be linked to next check
);

// 2. Recipe Search (Specific)
const recipeSearchNode = new DecisionNode(
    (ctx) => {
        const allRecipes = Array.from(RECIPE_DATABASE.values()).flat();
        ctx.foundRecipe = allRecipes.find(r => {
            const rLow = r.toLowerCase();
            const keywords = ['butter chicken', 'pancake', 'oats', 'salmon', 'taco', 'salad'];
            return keywords.some(k => ctx.msg.includes(k) && rLow.includes(k));
        });
        return !!ctx.foundRecipe;
    },
    (ctx) => "Found it! 👨‍🍳 Here's a healthy version for you:\n\n" + ctx.foundRecipe,
    null
);

// 3. General Recipe Queries
const generalRecipeNode = new DecisionNode(
    (ctx) => ctx.msg.includes('recipe') || ctx.msg.includes('cook') || ctx.msg.includes('eat') || ctx.msg.includes('food') || ctx.msg.includes('meal'),
    (ctx) => {
        if (ctx.msg.includes('breakfast')) return "Rise and shine! ☀️ Here's a healthy breakfast idea:\n\n" + getRandomItem(RECIPE_DATABASE, 'breakfast');
        if (ctx.msg.includes('lunch')) return "Time to refuel! 🔋 Try this for lunch:\n\n" + getRandomItem(RECIPE_DATABASE, 'lunch');
        if (ctx.msg.includes('dinner')) return "Let's end the day right! 🌙 How about this for dinner:\n\n" + getRandomItem(RECIPE_DATABASE, 'dinner');
        if (ctx.msg.includes('snack')) return "Snack time? 😋 Here's a smart choice:\n\n" + getRandomItem(RECIPE_DATABASE, 'snack');

        const cats = Array.from(RECIPE_DATABASE.keys());
        const randomCat = cats[Math.floor(Math.random() * cats.length)];
        return `I love healthy food! 🥗 What meal are you looking for? (Breakfast, Lunch, Dinner, Snack)\n\nHere's a random choice (${randomCat}):\n\n` + getRandomItem(RECIPE_DATABASE, randomCat);
    },
    null
);

// 4. Workout - Weight Loss
const weightLossNode = new DecisionNode(
    (ctx) => ctx.msg.includes('lose weight') || ctx.msg.includes('fat loss') || ctx.msg.includes('burn fat'),
    (ctx) => "For weight loss, I recommend high-intensity cardio to burn calories! 🔥\n\n" + getRandomItem(WORKOUT_DATABASE, 'cardio'),
    null
);

// 5. Workout - Muscle/Upper Body
const muscleNode = new DecisionNode(
    (ctx) => ctx.msg.includes('muscle') || ctx.msg.includes('strength') || ctx.msg.includes('bulk') ||
        ctx.msg.includes('arm') || ctx.msg.includes('chest') || ctx.msg.includes('back') || ctx.msg.includes('upper body'),
    (ctx) => "To build muscle, we need to lift heavy! 🏋️‍♂️\n\nTry this upper body routine:\n" + getRandomItem(WORKOUT_DATABASE, 'strength_upper'),
    null
);

// 6. Workout - Lower Body
const legNode = new DecisionNode(
    (ctx) => ctx.msg.includes('leg') || ctx.msg.includes('glute') || ctx.msg.includes('lower body'),
    (ctx) => "Don't skip leg day! 🐔 Here's a solid routine:\n\n" + getRandomItem(WORKOUT_DATABASE, 'strength_lower'),
    null
);

// 7. Workout - Core
const coreNode = new DecisionNode(
    (ctx) => ctx.msg.includes('abs') || ctx.msg.includes('core') || ctx.msg.includes('belly'),
    (ctx) => "Let's work on that six-pack! 🍫\n\n" + getRandomItem(WORKOUT_DATABASE, 'core'),
    null
);

// 8. Workout - Yoga
const yogaNode = new DecisionNode(
    (ctx) => ctx.msg.includes('yoga') || ctx.msg.includes('stretch') || ctx.msg.includes('flexibility'),
    (ctx) => "Namaste! 🧘‍♀️ Here's a flow for you:\n\n" + getRandomItem(WORKOUT_DATABASE, 'yoga'),
    null
);

// 9. Workout - Cardio
const cardioNode = new DecisionNode(
    (ctx) => ctx.msg.includes('cardio') || ctx.msg.includes('run'),
    (ctx) => "Let's get that heart rate up! ❤️\n\n" + getRandomItem(WORKOUT_DATABASE, 'cardio'),
    null
);

// 10. Beginner Advice
const beginnerNode = new DecisionNode(
    (ctx) => ctx.msg.includes('beginner') || ctx.msg.includes('start'),
    "Welcome to your fitness journey! 🌟 Start slow. I recommend trying a 'Morning Yoga' flow or a simple '20-min Walk' to build the habit. Consistency > Intensity.",
    "I'm not sure about that specific request. 🤔\n\nTry asking for:\n- 'Leg workout'\n- 'Healthy breakfast recipe'\n- 'Yoga for beginners'\n- 'Dinner ideas'"
);

// Link the chain (Tree structure for traversal steps)
// Root -> Greeting -> RecipeSearch -> GeneralRecipe -> WeightLoss -> Muscle -> Leg -> Core -> Yoga -> Cardio -> Beginner -> Fallback
greetingNode.noNode = recipeSearchNode;
recipeSearchNode.noNode = generalRecipeNode;
generalRecipeNode.noNode = weightLossNode;
weightLossNode.noNode = muscleNode;
muscleNode.noNode = legNode;
legNode.noNode = coreNode;
coreNode.noNode = yogaNode;
yogaNode.noNode = cardioNode;
cardioNode.noNode = beginnerNode;

// Export main function
export function processMessage(message, userProfile) {
    const context = {
        msg: message.toLowerCase(),
        profile: userProfile,
        foundRecipe: null
    };

    // Traverse the Decision Tree
    return greetingNode.evaluate(context);
}
