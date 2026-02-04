import { useState } from 'react';
import styles from './MealCard.module.css';
import { adjustPortion } from '../utils/nutritionCalculator';
import { getAlternativeMeals } from '../utils/dietPlanGenerator';

function MealCard({ meal, userProfile, onMealChange }) {
    const [showAlternatives, setShowAlternatives] = useState(false);
    const [portionMultiplier, setPortionMultiplier] = useState(1);
    const [currentMeal, setCurrentMeal] = useState(meal);

    const handlePortionChange = (change) => {
        const newMultiplier = Math.max(0.5, Math.min(2, portionMultiplier + change));
        setPortionMultiplier(newMultiplier);

        const adjustedMeal = adjustPortion(currentMeal, newMultiplier);
        onMealChange(adjustedMeal);
    };

    const handleSwapMeal = () => {
        setShowAlternatives(true);
    };

    const handleSelectAlternative = (alternativeMeal) => {
        const adjustedMeal = adjustPortion(alternativeMeal, portionMultiplier);
        setCurrentMeal(alternativeMeal);
        onMealChange({
            ...adjustedMeal,
            mealType: meal.mealType,
            time: meal.time
        });
        setShowAlternatives(false);
    };

    const displayMeal = adjustPortion(currentMeal, portionMultiplier);

    return (
        <>
            <div className={styles['meal-card']}>
                <div className={styles['meal-header']}>
                    <div>
                        <div className={styles['meal-time']}>{meal.time} • {meal.mealType}</div>
                        <h4 className={styles['meal-name']}>{currentMeal.name}</h4>
                        <span className={styles['meal-cuisine']}>{currentMeal.cuisine}</span>
                    </div>
                </div>

                <div className={styles['meal-nutrition']}>
                    <div className={styles['nutrition-item']}>
                        <span className={styles['nutrition-value']}>{Math.round(displayMeal.calories)}</span>
                        <span className={styles['nutrition-label']}>Calories</span>
                    </div>
                    <div className={styles['nutrition-item']}>
                        <span className={styles['nutrition-value']}>{Math.round(displayMeal.protein)}g</span>
                        <span className={styles['nutrition-label']}>Protein</span>
                    </div>
                    <div className={styles['nutrition-item']}>
                        <span className={styles['nutrition-value']}>{Math.round(displayMeal.carbs)}g</span>
                        <span className={styles['nutrition-label']}>Carbs</span>
                    </div>
                    <div className={styles['nutrition-item']}>
                        <span className={styles['nutrition-value']}>{Math.round(displayMeal.fats)}g</span>
                        <span className={styles['nutrition-label']}>Fats</span>
                    </div>
                </div>

                <div className={styles['meal-details']}>
                    <div className={styles['meal-ingredients']}>
                        <strong>Ingredients:</strong> {currentMeal.ingredients.join(', ')}
                    </div>
                    <div className={styles['meal-prep-time']}>
                        ⏱️ <strong>Prep time:</strong> {currentMeal.prepTime}
                    </div>
                </div>

                <div className={styles['meal-actions']}>
                    <button className={styles['swap-button']} onClick={handleSwapMeal}>
                        🔄 Swap Meal
                    </button>

                    <div className={styles['portion-control']}>
                        <button
                            className={styles['portion-button']}
                            onClick={() => handlePortionChange(-0.25)}
                            disabled={portionMultiplier <= 0.5}
                        >
                            −
                        </button>
                        <span className={styles['portion-display']}>
                            {Math.round(portionMultiplier * 100)}%
                        </span>
                        <button
                            className={styles['portion-button']}
                            onClick={() => handlePortionChange(0.25)}
                            disabled={portionMultiplier >= 2}
                        >
                            +
                        </button>
                    </div>
                </div>
            </div>

            {showAlternatives && (
                <AlternativesModal
                    mealType={meal.mealType}
                    currentMealId={currentMeal.id}
                    targetCalories={meal.calories}
                    userProfile={userProfile}
                    onSelect={handleSelectAlternative}
                    onClose={() => setShowAlternatives(false)}
                />
            )}
        </>
    );
}

function AlternativesModal({ mealType, currentMealId, targetCalories, userProfile, onSelect, onClose }) {
    const filters = {
        dietary: userProfile.dietaryPreference !== 'all' ? userProfile.dietaryPreference : null,
        excludeAllergens: userProfile.allergies || []
    };

    const alternatives = getAlternativeMeals(mealType, targetCalories, filters, currentMealId, 5);

    return (
        <div className={styles['alternatives-modal']} onClick={onClose}>
            <div className={styles['alternatives-content']} onClick={(e) => e.stopPropagation()}>
                <div className={styles['alternatives-header']}>
                    <h3>Choose Alternative Meal</h3>
                    <button className={styles['close-button']} onClick={onClose}>×</button>
                </div>

                <div className={styles['alternatives-list']}>
                    {alternatives.map(alt => (
                        <div
                            key={alt.id}
                            className={styles['alternative-item']}
                            onClick={() => onSelect(alt)}
                        >
                            <h4 className={styles['meal-name']}>{alt.name}</h4>
                            <span className={styles['meal-cuisine']}>{alt.cuisine}</span>

                            <div className={styles['meal-nutrition']} style={{ marginTop: '1rem' }}>
                                <div className={styles['nutrition-item']}>
                                    <span className={styles['nutrition-value']}>{alt.calories}</span>
                                    <span className={styles['nutrition-label']}>Calories</span>
                                </div>
                                <div className={styles['nutrition-item']}>
                                    <span className={styles['nutrition-value']}>{alt.protein}g</span>
                                    <span className={styles['nutrition-label']}>Protein</span>
                                </div>
                                <div className={styles['nutrition-item']}>
                                    <span className={styles['nutrition-value']}>{alt.carbs}g</span>
                                    <span className={styles['nutrition-label']}>Carbs</span>
                                </div>
                                <div className={styles['nutrition-item']}>
                                    <span className={styles['nutrition-value']}>{alt.fats}g</span>
                                    <span className={styles['nutrition-label']}>Fats</span>
                                </div>
                            </div>

                            <div className={styles['meal-ingredients']} style={{ marginTop: '0.75rem' }}>
                                {alt.ingredients.join(', ')}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default MealCard;
