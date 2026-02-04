import { useState, useEffect } from 'react';
import styles from './WorkoutPlanner.module.css';
import { generateWorkoutPlan, replaceExercise } from '../utils/workoutPlanGenerator';

function WorkoutPlanner({ userProfile }) {
    const [plan, setPlan] = useState([]);
    const [selectedDayIndex, setSelectedDayIndex] = useState(0); // 0 = Monday

    useEffect(() => {
        if (userProfile) {
            const generatedPlan = generateWorkoutPlan(userProfile);
            setPlan(generatedPlan);
        }
    }, [userProfile]); // Regenerate if profile changes (e.g. goal update)

    const handleReplaceExercise = (dayIndex, exerciseId) => {
        const newPlan = [...plan];
        const day = newPlan[dayIndex];
        const exerciseIndex = day.exercises.findIndex(e => e.id === exerciseId);

        if (exerciseIndex !== -1) {
            const oldExercise = day.exercises[exerciseIndex];
            const newExercise = replaceExercise(oldExercise);
            day.exercises[exerciseIndex] = newExercise;
            setPlan(newPlan);
        }
    };

    const handleRegenerate = () => {
        if (window.confirm("This will overwrite your current customizations. Are you sure?")) {
            setPlan(generateWorkoutPlan(userProfile));
        }
    };

    if (!plan.length) return <div className={styles.loading}>Generating Plan...</div>;

    const currentDay = plan[selectedDayIndex];

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h2>💪 Your Weekly Workout Plan</h2>
                <p>Tailored for: <strong>{userProfile.primaryGoal || 'General Fitness'}</strong></p>
                <button className={styles.regenerateBtn} onClick={handleRegenerate}>
                    🔄 Regenerate Full Plan
                </button>
            </div>

            <div className={styles.weekTabs}>
                {plan.map((day, index) => (
                    <button
                        key={index}
                        className={`${styles.dayTab} ${index === selectedDayIndex ? styles.activeTab : ''}`}
                        onClick={() => setSelectedDayIndex(index)}
                    >
                        <span className={styles.dayName}>{day.day.substr(0, 3)}</span>
                    </button>
                ))}
            </div>

            <div className={styles.dayView}>
                <div className={styles.dayHeader}>
                    <h3>{currentDay.day}</h3>
                    <span className={styles.focusBadge}>{currentDay.focus}</span>
                </div>

                <div className={styles.exerciseList}>
                    {currentDay.exercises.map((exercise) => (
                        <div key={exercise.id} className={styles.exerciseCard}>
                            <div className={styles.exerciseInfo}>
                                <h4>{exercise.name}</h4>
                                <div className={styles.exerciseMeta}>
                                    {exercise.sets && <span>sets: <strong>{exercise.sets}</strong></span>}
                                    {exercise.reps && <span>reps: <strong>{exercise.reps}</strong></span>}
                                    {exercise.duration && <span>duration: <strong>{exercise.duration}</strong></span>}
                                    {exercise.intensity && <span>intensity: <strong>{exercise.intensity}</strong></span>}
                                </div>
                            </div>
                            <div className={styles.actions}>
                                <button
                                    className={styles.replaceBtn}
                                    onClick={() => handleReplaceExercise(selectedDayIndex, exercise.id)}
                                    title="Replace with alternative"
                                >
                                    🔀 Replace
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default WorkoutPlanner;
