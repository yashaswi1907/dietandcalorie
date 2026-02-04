/**
 * Workout Plan Generator
 * Generates valid weekly workout routines based on user goals.
 */

const EXERCISE_DB = {
    cardio: [
        { name: "Jumping Jacks", duration: "60s", intensity: "Medium" },
        { name: "Burpees", duration: "45s", intensity: "High" },
        { name: "High Knees", duration: "60s", intensity: "High" },
        { name: "Mountain Climbers", duration: "45s", intensity: "High" },
        { name: "Running", duration: "20 min", intensity: "Medium" },
        { name: "Cycling", duration: "30 min", intensity: "Medium" },
        { name: "Jump Rope", duration: "10 min", intensity: "High" }
    ],
    chest: [
        { name: "Pushups", sets: "3", reps: "12" },
        { name: "Bench Press", sets: "4", reps: "8-10" },
        { name: "Dumbbell Flys", sets: "3", reps: "12" },
        { name: "Incline Press", sets: "3", reps: "10" }
    ],
    back: [
        { name: "Pull-ups", sets: "3", reps: "Max" },
        { name: "Dumbbell Rows", sets: "3", reps: "12" },
        { name: "Lat Pulldowns", sets: "3", reps: "12" },
        { name: "Face Pulls", sets: "3", reps: "15" }
    ],
    legs: [
        { name: "Bodyweight Squats", sets: "4", reps: "20" },
        { name: "Lunges", sets: "3", reps: "12/leg" },
        { name: "Romanian Deadlifts", sets: "3", reps: "12" },
        { name: "Calf Raises", sets: "4", reps: "15" },
        { name: "Goblet Squats", sets: "3", reps: "12" }
    ],
    shoulders: [
        { name: "Overhead Press", sets: "3", reps: "10" },
        { name: "Lateral Raises", sets: "3", reps: "15" },
        { name: "Front Raises", sets: "3", reps: "15" }
    ],
    arms: [
        { name: "Bicep Curls", sets: "3", reps: "12" },
        { name: "Tricep Dips", sets: "3", reps: "12" },
        { name: "Hammer Curls", sets: "3", reps: "12" },
        { name: "Skull Crushers", sets: "3", reps: "12" }
    ],
    core: [
        { name: "Plank", duration: "60s" },
        { name: "Crunches", sets: "3", reps: "20" },
        { name: "Russian Twists", sets: "3", reps: "20" },
        { name: "Leg Raises", sets: "3", reps: "15" }
    ],
    yoga: [
        { name: "Sun Salutations", duration: "5 min" },
        { name: "Warrior Pose Flow", duration: "5 min" },
        { name: "Child's Pose", duration: "2 min" },
        { name: "Cat-Cow Stretch", duration: "2 min" }
    ]
};

export function generateWorkoutPlan(userProfile) {
    const goal = userProfile?.primaryGoal || 'general'; // 'loss', 'gain', 'maintain'

    let weeklySchedule = [];

    if (goal === 'gain' || goal === 'muscle') {
        // Push / Pull / Legs Split
        weeklySchedule = [
            { day: 'Monday', focus: 'Push (Chest/Triceps/Shoulders)', exercises: [...pick(EXERCISE_DB.chest, 2), ...pick(EXERCISE_DB.shoulders, 2), ...pick(EXERCISE_DB.arms, 1)] },
            { day: 'Tuesday', focus: 'Pull (Back/Biceps)', exercises: [...pick(EXERCISE_DB.back, 3), ...pick(EXERCISE_DB.arms, 2)] },
            { day: 'Wednesday', focus: 'Legs & Core', exercises: [...pick(EXERCISE_DB.legs, 3), ...pick(EXERCISE_DB.core, 2)] },
            { day: 'Thursday', focus: 'Rest Day', exercises: [{ name: "Light Stretching", duration: "15 min" }] },
            { day: 'Friday', focus: 'Upper Body', exercises: [...pick(EXERCISE_DB.chest, 1), ...pick(EXERCISE_DB.back, 1), ...pick(EXERCISE_DB.shoulders, 1), ...pick(EXERCISE_DB.arms, 1)] },
            { day: 'Saturday', focus: 'Lower Body', exercises: [...pick(EXERCISE_DB.legs, 3), ...pick(EXERCISE_DB.cardio, 1)] },
            { day: 'Sunday', focus: 'Active Recovery', exercises: [...pick(EXERCISE_DB.yoga, 3)] }
        ];
    } else if (goal === 'loss' || goal === 'weight') {
        // Cardio & HIIT Focus
        weeklySchedule = [
            { day: 'Monday', focus: 'HIIT Cardio', exercises: [...pick(EXERCISE_DB.cardio, 4)] },
            { day: 'Tuesday', focus: 'Full Body Tone', exercises: [...pick(EXERCISE_DB.legs, 1), ...pick(EXERCISE_DB.chest, 1), ...pick(EXERCISE_DB.back, 1), ...pick(EXERCISE_DB.core, 2)] },
            { day: 'Wednesday', focus: 'Steady Cardio', exercises: [{ name: "Running / Jogging", duration: "30-45 min" }] },
            { day: 'Thursday', focus: 'Active Recovery', exercises: [...pick(EXERCISE_DB.yoga, 3)] },
            { day: 'Friday', focus: 'HIIT Cardio', exercises: [...pick(EXERCISE_DB.cardio, 4)] },
            { day: 'Saturday', focus: 'Full Body Tone', exercises: [...pick(EXERCISE_DB.legs, 1), ...pick(EXERCISE_DB.chest, 1), ...pick(EXERCISE_DB.back, 1), ...pick(EXERCISE_DB.core, 2)] },
            { day: 'Sunday', focus: 'Rest Day', exercises: [{ name: "Walking", duration: "30 min" }] }
        ];
    } else {
        // General Fitness / Balanced
        weeklySchedule = [
            { day: 'Monday', focus: 'Full Body Strength', exercises: [...pick(EXERCISE_DB.legs, 1), ...pick(EXERCISE_DB.chest, 1), ...pick(EXERCISE_DB.back, 1), ...pick(EXERCISE_DB.core, 1)] },
            { day: 'Tuesday', focus: 'Cardio', exercises: [...pick(EXERCISE_DB.cardio, 3)] },
            { day: 'Wednesday', focus: 'Active Recovery', exercises: [...pick(EXERCISE_DB.yoga, 3)] },
            { day: 'Thursday', focus: 'Upper Body', exercises: [...pick(EXERCISE_DB.chest, 1), ...pick(EXERCISE_DB.back, 1), ...pick(EXERCISE_DB.shoulders, 1), ...pick(EXERCISE_DB.arms, 1)] },
            { day: 'Friday', focus: 'Lower Body', exercises: [...pick(EXERCISE_DB.legs, 3), ...pick(EXERCISE_DB.core, 1)] },
            { day: 'Saturday', focus: 'Fun Cardio', exercises: [{ name: "Hiking or Sports", duration: "60 min" }] },
            { day: 'Sunday', focus: 'Rest Day', exercises: [{ name: "Light Walk", duration: "20 min" }] }
        ];
    }

    // Assign IDs for UI handling
    return weeklySchedule.map(day => ({
        ...day,
        exercises: day.exercises.map(ex => ({ ...ex, id: Math.random().toString(36).substr(2, 9) }))
    }));
}

export function replaceExercise(currentExercise) {
    // Find category of current exercise
    let category = null;
    for (const [cat, exercises] of Object.entries(EXERCISE_DB)) {
        if (exercises.some(e => e.name === currentExercise.name)) {
            category = cat;
            break;
        }
    }

    // Fallback if not found or is a custom one like "Rest"
    if (!category) return currentExercise;

    const alternatives = EXERCISE_DB[category].filter(e => e.name !== currentExercise.name);
    if (alternatives.length === 0) return currentExercise;

    const newExercise = alternatives[Math.floor(Math.random() * alternatives.length)];
    return { ...newExercise, id: Math.random().toString(36).substr(2, 9) };
}

function pick(array, count) {
    const shuffled = [...array].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
}
