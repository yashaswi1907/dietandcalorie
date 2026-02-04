import { useState } from 'react';
import styles from './MealCustomizer.module.css';
import MealCard from './MealCard';
import { calculateDailyTotals } from '../utils/nutritionCalculator';

function MealCustomizer({ selectedPlan, userProfile, onComplete }) {
    const [customizedMeals, setCustomizedMeals] = useState([...selectedPlan.meals]);

    const handleMealChange = (index, updatedMeal) => {
        const newMeals = [...customizedMeals];
        newMeals[index] = updatedMeal;
        setCustomizedMeals(newMeals);
    };

    const dailyTotals = calculateDailyTotals(customizedMeals);

    const handleSavePlan = () => {
        onComplete({
            ...selectedPlan,
            meals: customizedMeals,
            actualTotals: dailyTotals
        });
    };

    const handleReset = () => {
        setCustomizedMeals([...selectedPlan.meals]);
    };

    return (
        <div className={styles['meal-customizer']}>
            <div className={styles['customizer-header']}>
                <h2>Customize Your Meals</h2>
                <p>Adjust portions or swap meals to match your preferences</p>
            </div>

            <div className={styles['plan-info']}>
                <h3>{selectedPlan.icon} {selectedPlan.name}</h3>

                <div className={styles['daily-totals']}>
                    <div className={styles['total-item']}>
                        <span className={styles['total-value']}>{Math.round(dailyTotals.calories)}</span>
                        <span className={styles['total-label']}>Calories</span>
                        <div className={styles['target-indicator']}>
                            Target: {userProfile.targetCalories}
                        </div>
                    </div>
                    <div className={styles['total-item']}>
                        <span className={styles['total-value']}>{Math.round(dailyTotals.protein)}g</span>
                        <span className={styles['total-label']}>Protein</span>
                        <div className={styles['target-indicator']}>
                            Target: {selectedPlan.macros.protein}g
                        </div>
                    </div>
                    <div className={styles['total-item']}>
                        <span className={styles['total-value']}>{Math.round(dailyTotals.carbs)}g</span>
                        <span className={styles['total-label']}>Carbs</span>
                        <div className={styles['target-indicator']}>
                            Target: {selectedPlan.macros.carbs}g
                        </div>
                    </div>
                    <div className={styles['total-item']}>
                        <span className={styles['total-value']}>{Math.round(dailyTotals.fats)}g</span>
                        <span className={styles['total-label']}>Fats</span>
                        <div className={styles['target-indicator']}>
                            Target: {selectedPlan.macros.fats}g
                        </div>
                    </div>
                </div>
            </div>

            <div className={styles['meals-timeline']}>
                <div className={styles['meals-grid']}>
                    {customizedMeals.map((meal, index) => (
                        <MealCard
                            key={index}
                            meal={meal}
                            userProfile={userProfile}
                            onMealChange={(updatedMeal) => handleMealChange(index, updatedMeal)}
                        />
                    ))}
                </div>
            </div>

            <div className={styles['action-buttons']}>
                <button className={styles['btn-secondary']} onClick={handleReset}>
                    🔄 Reset to Original
                </button>
                <button className={styles['btn-primary']} onClick={handleSavePlan}>
                    ✓ Save My Diet Plan
                </button>
            </div>
        </div>
    );
}

export default MealCustomizer;
