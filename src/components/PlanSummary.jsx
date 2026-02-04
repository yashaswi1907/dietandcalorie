import styles from './PlanSummary.module.css';
import { generateWorkoutPlan } from '../utils/workoutPlanGenerator';

function PlanSummary({ finalPlan, userProfile, onStartOver }) {
    // Generate workout plan
    const workoutPlan = generateWorkoutPlan(userProfile);

    const handleExport = () => {
        // Create combined summary
        let summary = `=== STAY FIT - COMPLETE PLAN ===\n\n`;
        summary += `=== DIET PLAN ===\n`;
        summary += `Plan: ${finalPlan.name}\n`;
        summary += `Target Calories: ${userProfile.targetCalories}\n`;
        summary += `Actual Calories: ${Math.round(finalPlan.actualTotals.calories)}\n\n`;
        summary += `Macros:\n`;
        summary += `- Protein: ${Math.round(finalPlan.actualTotals.protein)}g\n`;
        summary += `- Carbs: ${Math.round(finalPlan.actualTotals.carbs)}g\n`;
        summary += `- Fats: ${Math.round(finalPlan.actualTotals.fats)}g\n\n`;
        summary += `=== DAILY MEAL PLAN ===\n\n`;

        finalPlan.meals.forEach(meal => {
            summary += `${meal.time} - ${meal.mealType.toUpperCase()}\n`;
            summary += `${meal.name} (${meal.cuisine})\n`;
            summary += `Calories: ${Math.round(meal.calories)} | Protein: ${Math.round(meal.protein)}g | Carbs: ${Math.round(meal.carbs)}g | Fats: ${Math.round(meal.fats)}g\n`;
            summary += `Ingredients: ${meal.ingredients.join(', ')}\n`;
            summary += `Prep time: ${meal.prepTime}\n\n`;
        });

        summary += `\n=== WORKOUT PLAN ===\n`;
        summary += `Goal: ${workoutPlan.goal}\n`;
        summary += `Frequency: ${workoutPlan.frequency} days/week\n`;
        summary += `Weekly Calories Burned: ${workoutPlan.totalCaloriesBurned}\n\n`;

        workoutPlan.weeklySchedule.forEach(day => {
            summary += `${day.day.toUpperCase()}\n`;
            if (day.type === 'rest') {
                summary += `Rest Day\n\n`;
            } else {
                summary += `Type: ${day.type.toUpperCase()}\n`;
                summary += `Calories Burned: ${day.totalCalories}\n`;
                day.exercises.forEach(ex => {
                    summary += `- ${ex.name}: ${ex.sets} sets x ${ex.reps} reps (${ex.restSeconds}s rest)\n`;
                });
                summary += `\n`;
            }
        });

        // Create and download as text file
        const blob = new Blob([summary], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'stay-fit-complete-plan.txt';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    return (
        <div className={styles['plan-summary']}>
            <div className={styles['summary-header']}>
                <div className={styles['success-icon']}>🎉</div>
                <h2>Your Complete Plan is Ready!</h2>
            </div>

            <div className={styles['summary-card']}>
                <div className={styles['plan-title']}>
                    <h3>{finalPlan.icon} {finalPlan.name}</h3>
                    <p style={{ color: '#6b7280' }}>{finalPlan.description}</p>
                </div>

                <div className={styles['summary-stats']}>
                    <div className={styles['stat-box']}>
                        <span className={styles['stat-box-value']}>
                            {Math.round(finalPlan.actualTotals.calories)}
                        </span>
                        <span className={styles['stat-box-label']}>Daily Calories</span>
                    </div>
                    <div className={styles['stat-box']}>
                        <span className={styles['stat-box-value']}>
                            {Math.round(finalPlan.actualTotals.protein)}g
                        </span>
                        <span className={styles['stat-box-label']}>Protein</span>
                    </div>
                    <div className={styles['stat-box']}>
                        <span className={styles['stat-box-value']}>
                            {workoutPlan.frequency}
                        </span>
                        <span className={styles['stat-box-label']}>Workout Days/Week</span>
                    </div>
                    <div className={styles['stat-box']}>
                        <span className={styles['stat-box-value']}>
                            {workoutPlan.totalCaloriesBurned}
                        </span>
                        <span className={styles['stat-box-label']}>Weekly Workout Calories</span>
                    </div>
                </div>

                <div className={styles['meals-summary']}>
                    <h4>Your Daily Meal Schedule</h4>
                    {finalPlan.meals.map((meal, index) => (
                        <div key={index} className={styles['meal-summary-item']}>
                            <div className={styles['meal-summary-info']}>
                                <div className={styles['meal-summary-time']}>
                                    {meal.time} • {meal.mealType}
                                </div>
                                <div className={styles['meal-summary-name']}>{meal.name}</div>
                            </div>
                            <div className={styles['meal-summary-calories']}>
                                {Math.round(meal.calories)} cal
                            </div>
                        </div>
                    ))}
                </div>

                <div className={styles['meals-summary']} style={{ marginTop: 'var(--spacing-xl)' }}>
                    <h4>Your Weekly Workout Schedule</h4>
                    {workoutPlan.weeklySchedule.slice(0, workoutPlan.frequency).map((day, index) => (
                        <div key={index} className={styles['meal-summary-item']}>
                            <div className={styles['meal-summary-info']}>
                                <div className={styles['meal-summary-time']}>
                                    {day.day} • {day.type}
                                </div>
                                <div className={styles['meal-summary-name']}>
                                    {day.exercises.length} exercises
                                </div>
                            </div>
                            <div className={styles['meal-summary-calories']}>
                                {day.totalCalories} cal
                            </div>
                        </div>
                    ))}
                </div>

                <div className={styles['action-section']}>
                    <button className={styles['export-button']} onClick={handleExport}>
                        📥 Download Complete Plan (Diet + Workout)
                    </button>
                    <button className={styles['start-over-button']} onClick={onStartOver}>
                        ← Start Over
                    </button>
                </div>
            </div>
        </div>
    );
}

export default PlanSummary;
