// Comprehensive Workout Database

export const workoutDatabase = {
    strength: [
        {
            id: 'w1',
            name: 'Push-ups',
            category: 'strength',
            muscleGroups: ['chest', 'triceps', 'shoulders'],
            difficulty: 'beginner',
            equipment: 'none',
            sets: 3,
            reps: '10-15',
            restSeconds: 60,
            caloriesBurnedPerSet: 15,
            instructions: 'Start in plank position, lower body until chest nearly touches floor, push back up'
        },
        {
            id: 'w2',
            name: 'Squats',
            category: 'strength',
            muscleGroups: ['quads', 'glutes', 'hamstrings'],
            difficulty: 'beginner',
            equipment: 'none',
            sets: 3,
            reps: '12-15',
            restSeconds: 60,
            caloriesBurnedPerSet: 20,
            instructions: 'Stand with feet shoulder-width apart, lower hips back and down, keep chest up, return to standing'
        },
        {
            id: 'w3',
            name: 'Dumbbell Bench Press',
            category: 'strength',
            muscleGroups: ['chest', 'triceps', 'shoulders'],
            difficulty: 'intermediate',
            equipment: 'dumbbells',
            sets: 4,
            reps: '8-12',
            restSeconds: 90,
            caloriesBurnedPerSet: 25,
            instructions: 'Lie on bench, press dumbbells up from chest level, lower with control'
        },
        {
            id: 'w4',
            name: 'Deadlifts',
            category: 'strength',
            muscleGroups: ['back', 'glutes', 'hamstrings'],
            difficulty: 'intermediate',
            equipment: 'barbell',
            sets: 4,
            reps: '6-10',
            restSeconds: 120,
            caloriesBurnedPerSet: 30,
            instructions: 'Stand with barbell over feet, bend at hips and knees, grip bar, lift by extending hips and knees'
        },
        {
            id: 'w5',
            name: 'Pull-ups',
            category: 'strength',
            muscleGroups: ['back', 'biceps'],
            difficulty: 'intermediate',
            equipment: 'pull-up bar',
            sets: 3,
            reps: '6-10',
            restSeconds: 90,
            caloriesBurnedPerSet: 20,
            instructions: 'Hang from bar with overhand grip, pull body up until chin over bar, lower with control'
        },
        {
            id: 'w6',
            name: 'Lunges',
            category: 'strength',
            muscleGroups: ['quads', 'glutes', 'hamstrings'],
            difficulty: 'beginner',
            equipment: 'none',
            sets: 3,
            reps: '10-12 each leg',
            restSeconds: 60,
            caloriesBurnedPerSet: 18,
            instructions: 'Step forward, lower hips until both knees bent at 90 degrees, push back to start'
        },
        {
            id: 'w7',
            name: 'Shoulder Press',
            category: 'strength',
            muscleGroups: ['shoulders', 'triceps'],
            difficulty: 'intermediate',
            equipment: 'dumbbells',
            sets: 3,
            reps: '10-12',
            restSeconds: 75,
            caloriesBurnedPerSet: 22,
            instructions: 'Hold dumbbells at shoulder height, press overhead until arms extended, lower with control'
        },
        {
            id: 'w8',
            name: 'Plank',
            category: 'strength',
            muscleGroups: ['core', 'abs'],
            difficulty: 'beginner',
            equipment: 'none',
            sets: 3,
            reps: '30-60 seconds',
            restSeconds: 45,
            caloriesBurnedPerSet: 12,
            instructions: 'Hold body in straight line on forearms and toes, engage core, maintain position'
        },
        {
            id: 'w9',
            name: 'Bicep Curls',
            category: 'strength',
            muscleGroups: ['biceps'],
            difficulty: 'beginner',
            equipment: 'dumbbells',
            sets: 3,
            reps: '12-15',
            restSeconds: 60,
            caloriesBurnedPerSet: 15,
            instructions: 'Hold dumbbells at sides, curl up to shoulders, lower with control'
        },
        {
            id: 'w10',
            name: 'Tricep Dips',
            category: 'strength',
            muscleGroups: ['triceps', 'chest'],
            difficulty: 'intermediate',
            equipment: 'bench',
            sets: 3,
            reps: '10-15',
            restSeconds: 60,
            caloriesBurnedPerSet: 18,
            instructions: 'Hands on bench behind you, lower body by bending elbows, push back up'
        }
    ],

    cardio: [
        {
            id: 'c1',
            name: 'Running',
            category: 'cardio',
            muscleGroups: ['legs', 'cardiovascular'],
            difficulty: 'beginner',
            equipment: 'none',
            sets: 1,
            reps: '20-30 minutes',
            restSeconds: 0,
            caloriesBurnedPerSet: 200,
            instructions: 'Maintain steady pace, focus on breathing, land mid-foot'
        },
        {
            id: 'c2',
            name: 'Jump Rope',
            category: 'cardio',
            muscleGroups: ['legs', 'cardiovascular'],
            difficulty: 'intermediate',
            equipment: 'jump rope',
            sets: 3,
            reps: '3-5 minutes',
            restSeconds: 60,
            caloriesBurnedPerSet: 80,
            instructions: 'Jump with both feet, maintain rhythm, keep elbows close to body'
        },
        {
            id: 'c3',
            name: 'Burpees',
            category: 'cardio',
            muscleGroups: ['full body', 'cardiovascular'],
            difficulty: 'intermediate',
            equipment: 'none',
            sets: 3,
            reps: '10-15',
            restSeconds: 60,
            caloriesBurnedPerSet: 35,
            instructions: 'Squat, jump feet back to plank, do push-up, jump feet forward, jump up'
        },
        {
            id: 'c4',
            name: 'Cycling',
            category: 'cardio',
            muscleGroups: ['legs', 'cardiovascular'],
            difficulty: 'beginner',
            equipment: 'bike',
            sets: 1,
            reps: '30-45 minutes',
            restSeconds: 0,
            caloriesBurnedPerSet: 250,
            instructions: 'Maintain steady cadence, adjust resistance as needed'
        },
        {
            id: 'c5',
            name: 'Mountain Climbers',
            category: 'cardio',
            muscleGroups: ['core', 'cardiovascular'],
            difficulty: 'intermediate',
            equipment: 'none',
            sets: 3,
            reps: '30-45 seconds',
            restSeconds: 45,
            caloriesBurnedPerSet: 25,
            instructions: 'Start in plank, alternate bringing knees to chest rapidly'
        },
        {
            id: 'c6',
            name: 'High Knees',
            category: 'cardio',
            muscleGroups: ['legs', 'cardiovascular'],
            difficulty: 'beginner',
            equipment: 'none',
            sets: 3,
            reps: '30-60 seconds',
            restSeconds: 45,
            caloriesBurnedPerSet: 20,
            instructions: 'Run in place, bring knees up to hip level, pump arms'
        },
        {
            id: 'c7',
            name: 'Swimming',
            category: 'cardio',
            muscleGroups: ['full body', 'cardiovascular'],
            difficulty: 'intermediate',
            equipment: 'pool',
            sets: 1,
            reps: '30-45 minutes',
            restSeconds: 0,
            caloriesBurnedPerSet: 300,
            instructions: 'Maintain steady stroke, focus on breathing rhythm'
        }
    ],

    hiit: [
        {
            id: 'h1',
            name: 'Jumping Jacks',
            category: 'hiit',
            muscleGroups: ['full body', 'cardiovascular'],
            difficulty: 'beginner',
            equipment: 'none',
            sets: 3,
            reps: '45 seconds',
            restSeconds: 15,
            caloriesBurnedPerSet: 20,
            instructions: 'Jump feet apart while raising arms overhead, return to start'
        },
        {
            id: 'h2',
            name: 'Sprint Intervals',
            category: 'hiit',
            muscleGroups: ['legs', 'cardiovascular'],
            difficulty: 'advanced',
            equipment: 'none',
            sets: 8,
            reps: '30 seconds sprint',
            restSeconds: 30,
            caloriesBurnedPerSet: 40,
            instructions: 'Sprint at maximum effort, recover with slow jog or walk'
        },
        {
            id: 'h3',
            name: 'Kettlebell Swings',
            category: 'hiit',
            muscleGroups: ['glutes', 'hamstrings', 'core'],
            difficulty: 'intermediate',
            equipment: 'kettlebell',
            sets: 4,
            reps: '15-20',
            restSeconds: 45,
            caloriesBurnedPerSet: 30,
            instructions: 'Hinge at hips, swing kettlebell between legs, thrust hips forward to swing up'
        },
        {
            id: 'h4',
            name: 'Box Jumps',
            category: 'hiit',
            muscleGroups: ['legs', 'cardiovascular'],
            difficulty: 'intermediate',
            equipment: 'box',
            sets: 3,
            reps: '10-12',
            restSeconds: 60,
            caloriesBurnedPerSet: 25,
            instructions: 'Jump onto box with both feet, step down, repeat'
        },
        {
            id: 'h5',
            name: 'Battle Ropes',
            category: 'hiit',
            muscleGroups: ['arms', 'shoulders', 'core'],
            difficulty: 'intermediate',
            equipment: 'battle ropes',
            sets: 4,
            reps: '30 seconds',
            restSeconds: 30,
            caloriesBurnedPerSet: 28,
            instructions: 'Create waves with ropes using alternating or simultaneous arm movements'
        }
    ],

    flexibility: [
        {
            id: 'f1',
            name: 'Yoga Flow',
            category: 'flexibility',
            muscleGroups: ['full body'],
            difficulty: 'beginner',
            equipment: 'yoga mat',
            sets: 1,
            reps: '20-30 minutes',
            restSeconds: 0,
            caloriesBurnedPerSet: 100,
            instructions: 'Flow through poses focusing on breath and flexibility'
        },
        {
            id: 'f2',
            name: 'Hamstring Stretch',
            category: 'flexibility',
            muscleGroups: ['hamstrings'],
            difficulty: 'beginner',
            equipment: 'none',
            sets: 2,
            reps: '30 seconds each leg',
            restSeconds: 15,
            caloriesBurnedPerSet: 5,
            instructions: 'Sit with one leg extended, reach toward toes, hold stretch'
        },
        {
            id: 'f3',
            name: 'Hip Flexor Stretch',
            category: 'flexibility',
            muscleGroups: ['hip flexors'],
            difficulty: 'beginner',
            equipment: 'none',
            sets: 2,
            reps: '30 seconds each side',
            restSeconds: 15,
            caloriesBurnedPerSet: 5,
            instructions: 'Lunge position, push hips forward, feel stretch in front of hip'
        },
        {
            id: 'f4',
            name: 'Shoulder Stretch',
            category: 'flexibility',
            muscleGroups: ['shoulders'],
            difficulty: 'beginner',
            equipment: 'none',
            sets: 2,
            reps: '20 seconds each arm',
            restSeconds: 10,
            caloriesBurnedPerSet: 3,
            instructions: 'Pull arm across chest, hold with other arm'
        },
        {
            id: 'f5',
            name: 'Cat-Cow Stretch',
            category: 'flexibility',
            muscleGroups: ['spine', 'core'],
            difficulty: 'beginner',
            equipment: 'yoga mat',
            sets: 2,
            reps: '10-12 reps',
            restSeconds: 20,
            caloriesBurnedPerSet: 8,
            instructions: 'On hands and knees, alternate arching and rounding spine'
        }
    ]
};

// Helper functions
export function getExercisesByCategory(category) {
    return workoutDatabase[category] || [];
}

export function getExercisesByDifficulty(difficulty) {
    const allExercises = Object.values(workoutDatabase).flat();
    return allExercises.filter(ex => ex.difficulty === difficulty);
}

export function getExercisesByEquipment(equipment) {
    const allExercises = Object.values(workoutDatabase).flat();
    if (equipment === 'none') {
        return allExercises.filter(ex => ex.equipment === 'none');
    }
    return allExercises;
}
