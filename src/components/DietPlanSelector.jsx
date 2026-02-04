import { useState } from 'react';
import styles from './DietPlanSelector.module.css';

function DietPlanSelector({ userProfile, dietPlans, onSelectPlan }) {
    const [selectedPlanId, setSelectedPlanId] = useState(null);

    const handleSelectPlan = (planId) => {
        setSelectedPlanId(planId);
    };

    const handleContinue = () => {
        const selectedPlan = dietPlans.find(plan => plan.id === selectedPlanId);
        if (selectedPlan) {
            onSelectPlan(selectedPlan);
        }
    };

    return (
        <div className={styles['diet-plan-selector']}>
            <div className={styles['selector-header']}>
                <h2>Choose Your Diet Plan</h2>
                <p>Select the plan that best fits your goals and lifestyle</p>
            </div>

            <div className={styles['user-stats']}>
                <div className={styles['stat-card']}>
                    <span className={styles['stat-value']}>{userProfile.targetCalories}</span>
                    <span className={styles['stat-label']}>Daily Calories</span>
                </div>
                <div className={styles['stat-card']}>
                    <span className={styles['stat-value']}>{userProfile.bmi.value}</span>
                    <span className={styles['stat-label']}>BMI ({userProfile.bmi.category})</span>
                </div>
                <div className={styles['stat-card']}>
                    <span className={styles['stat-value']}>{userProfile.tdee}</span>
                    <span className={styles['stat-label']}>TDEE</span>
                </div>
            </div>

            <div className={styles['plans-grid']}>
                {dietPlans.map(plan => (
                    <div
                        key={plan.id}
                        className={`${styles['plan-card']} ${selectedPlanId === plan.id ? styles.selected : ''}`}
                        onClick={() => handleSelectPlan(plan.id)}
                    >
                        <span className={styles['plan-icon']}>{plan.icon}</span>
                        <h3 className={styles['plan-name']}>{plan.name}</h3>
                        <p className={styles['plan-description']}>{plan.description}</p>

                        <div className={styles['plan-benefits']}>
                            {plan.benefits.map((benefit, index) => (
                                <span key={index} className={styles['benefit-tag']}>
                                    {benefit}
                                </span>
                            ))}
                        </div>

                        <div className={styles['plan-macros']}>
                            <div className={styles['macro-row']}>
                                <span className={styles['macro-label']}>Protein</span>
                                <span className={styles['macro-value']}>{plan.macros.protein}g</span>
                            </div>
                            <div className={styles['macro-bar']}>
                                <div
                                    className={styles['macro-fill']}
                                    style={{ width: `${(plan.macros.protein * 4 / plan.macros.calories) * 100}%` }}
                                />
                            </div>

                            <div className={styles['macro-row']}>
                                <span className={styles['macro-label']}>Carbs</span>
                                <span className={styles['macro-value']}>{plan.macros.carbs}g</span>
                            </div>
                            <div className={styles['macro-bar']}>
                                <div
                                    className={styles['macro-fill']}
                                    style={{ width: `${(plan.macros.carbs * 4 / plan.macros.calories) * 100}%` }}
                                />
                            </div>

                            <div className={styles['macro-row']}>
                                <span className={styles['macro-label']}>Fats</span>
                                <span className={styles['macro-value']}>{plan.macros.fats}g</span>
                            </div>
                            <div className={styles['macro-bar']}>
                                <div
                                    className={styles['macro-fill']}
                                    style={{ width: `${(plan.macros.fats * 9 / plan.macros.calories) * 100}%` }}
                                />
                            </div>
                        </div>

                        <div className={styles['sample-meals']}>
                            <h4>Sample Meals</h4>
                            <div className={styles['sample-meal-list']}>
                                {plan.meals.slice(0, 3).map((meal, index) => (
                                    <div key={index}>• {meal.name}</div>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <button
                className={styles['continue-button']}
                onClick={handleContinue}
                disabled={!selectedPlanId}
            >
                Continue to Customize Meals →
            </button>
        </div>
    );
}

export default DietPlanSelector;
