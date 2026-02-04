// Workout Plan Generator

import { workoutDatabase } from '../data/workoutDatabase';

/**
 * Generate personalized workout plan based on user profile
 * @param {object} userProfile - User profile with health goals and activity level
 * @returns {object} Workout plan with weekly schedule
 */
export function generateWorkoutPlan(userProfile) {
    const { healthGoals, activityLevel } = userProfile;
    const primaryGoal = healthGoals[0] || 'maintenance';

    // Determine workout frequency based on activity level
    const frequency = getWorkoutFrequency(activityLevel);

    // Generate workout days based on goal
    const workoutDays = generateWorkoutDays(primaryGoal, frequency);

    return {
        goal: primaryGoal,
        frequency,
        weeklySchedule: workoutDays,
        totalCaloriesBurned: calculateTotalCalories(workoutDays)
    };
}

function getWorkoutFrequency(activityLevel) {
    const frequencies = {
        'sedentary': 3,
        'lightly-active': 3,
        'moderately-active': 4,
        'very-active': 5,
        'extremely-active': 6
    };
    return frequencies[activityLevel] || 3;
}

function generateWorkoutDays(goal, frequency) {
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    const workoutDays = [];

    // Define workout split based on goal
    let workoutTypes;
    if (goal === 'weight-loss') {
        workoutTypes = ['cardio', 'hiit', 'strength', 'cardio', 'hiit', 'strength', 'flexibility'];
    } else if (goal === 'muscle-gain') {
        workoutTypes = ['strength', 'strength', 'cardio', 'strength', 'strength', 'hiit', 'flexibility'];
    } else {
        workoutTypes = ['strength', 'cardio', 'hiit', 'strength', 'cardio', 'flexibility', 'rest'];
    }

    for (let i = 0; i < frequency; i++) {
        const dayName = days[i];
        const workoutType = workoutTypes[i];

        if (workoutType === 'rest') {
            workoutDays.push({
                day: dayName,
                type: 'rest',
                exercises: [],
                totalCalories: 0
            });
        } else {
            const exercises = selectExercisesForDay(workoutType, goal);
            workoutDays.push({
                day: dayName,
                type: workoutType,
                exercises,
                totalCalories: calculateDayCalories(exercises)
            });
        }
    }

    // Add rest days for remaining days
    for (let i = frequency; i < 7; i++) {
        workoutDays.push({
            day: days[i],
            type: 'rest',
            exercises: [],
            totalCalories: 0
        });
    }

    return workoutDays;
}

function selectExercisesForDay(workoutType, goal) {
    const categoryExercises = workoutDatabase[workoutType] || [];

    let count;
    if (workoutType === 'cardio') {
        count = 2; // 2 cardio exercises
    } else if (workoutType === 'hiit') {
        count = 4; // 4 HIIT exercises
    } else if (workoutType === 'strength') {
        count = 5; // 5 strength exercises
    } else {
        count = 3; // 3 flexibility exercises
    }

    // Shuffle and select exercises
    const shuffled = [...categoryExercises].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, Math.min(count, shuffled.length));
}

function calculateDayCalories(exercises) {
    return exercises.reduce((total, exercise) => {
        return total + (exercise.caloriesBurnedPerSet * exercise.sets);
    }, 0);
}

function calculateTotalCalories(workoutDays) {
    return workoutDays.reduce((total, day) => total + day.totalCalories, 0);
}

/**
 * Get alternative exercises for a specific exercise
 * @param {object} exercise - Current exercise
 * @param {number} count - Number of alternatives
 * @returns {array} Alternative exercises
 */
export function getAlternativeExercises(exercise, count = 3) {
    const categoryExercises = workoutDatabase[exercise.category] || [];
    const alternatives = categoryExercises.filter(ex =>
        ex.id !== exercise.id &&
        ex.muscleGroups.some(mg => exercise.muscleGroups.includes(mg))
    );

    return alternatives.slice(0, count);
}
