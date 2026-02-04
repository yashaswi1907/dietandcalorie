import { useState } from 'react';
import styles from './ProfileForm.module.css';
import { calculateBMR, calculateTDEE, adjustCaloriesForGoal, calculateBMI } from '../utils/nutritionCalculator';

function ProfileForm({ onSubmit, currentUser, onLogout }) {
    const [formData, setFormData] = useState({
        age: '',
        gender: 'male',
        height: '',
        weight: '',
        activityLevel: 'moderately-active',
        dietaryPreference: 'all',
        healthGoals: [],
        allergies: []
    });

    const availableGoals = [
        { id: 'weight-loss', label: 'Weight Loss' },
        { id: 'muscle-gain', label: 'Muscle Gain' },
        { id: 'maintenance', label: 'Maintenance' },
        { id: 'athletic-performance', label: 'Athletic Performance' }
    ];

    const availableAllergies = [
        { id: 'dairy', label: 'Dairy' },
        { id: 'eggs', label: 'Eggs' },
        { id: 'nuts', label: 'Nuts' },
        { id: 'peanuts', label: 'Peanuts' },
        { id: 'soy', label: 'Soy' },
        { id: 'fish', label: 'Fish' },
        { id: 'gluten', label: 'Gluten' }
    ];

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const toggleGoal = (goalId) => {
        setFormData(prev => ({
            ...prev,
            healthGoals: prev.healthGoals.includes(goalId)
                ? prev.healthGoals.filter(g => g !== goalId)
                : [...prev.healthGoals, goalId]
        }));
    };

    const toggleAllergy = (allergyId) => {
        setFormData(prev => ({
            ...prev,
            allergies: prev.allergies.includes(allergyId)
                ? prev.allergies.filter(a => a !== allergyId)
                : [...prev.allergies, allergyId]
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Calculate nutritional requirements
        const bmr = calculateBMR(
            parseFloat(formData.weight),
            parseFloat(formData.height),
            parseInt(formData.age),
            formData.gender
        );

        const tdee = calculateTDEE(bmr, formData.activityLevel);

        // Use primary health goal for calorie adjustment
        const primaryGoal = formData.healthGoals[0] || 'maintenance';
        const targetCalories = adjustCaloriesForGoal(tdee, primaryGoal);

        const bmi = calculateBMI(parseFloat(formData.weight), parseFloat(formData.height));

        // Pass data to parent component
        onSubmit({
            ...formData,
            bmr,
            tdee,
            targetCalories,
            bmi
        });
    };

    const isFormValid = () => {
        return formData.age && formData.height && formData.weight && formData.healthGoals.length > 0;
    };

    return (
        <div className={styles['profile-form']}>
            <div className={styles['profile-form-header']}>
                <h1>✨ Stay Fit</h1>
                <p>Welcome, {currentUser?.name}! | <a href="#" onClick={(e) => { e.preventDefault(); onLogout(); }} style={{ color: 'white', textDecoration: 'underline' }}>Logout</a></p>
            </div>

            <form className={styles['profile-form-card']} onSubmit={handleSubmit}>
                <div className={styles['form-section']}>
                    <h3>Create Your Profile</h3>
                    <p style={{ fontSize: '0.9rem', color: '#6b7280', marginBottom: '1.5rem' }}>
                        Let's calculate your daily caloric needs. Age?
                    </p>

                    <div className={styles['form-row']}>
                        <div className={styles['form-group']}>
                            <label htmlFor="age">Age</label>
                            <input
                                type="number"
                                id="age"
                                name="age"
                                value={formData.age}
                                onChange={handleInputChange}
                                placeholder="42"
                                min="10"
                                max="100"
                                required
                            />
                        </div>

                        <div className={styles['form-group']}>
                            <label htmlFor="gender">Gender</label>
                            <select
                                id="gender"
                                name="gender"
                                value={formData.gender}
                                onChange={handleInputChange}
                                required
                            >
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                            </select>
                        </div>
                    </div>

                    <div className={styles['form-row']}>
                        <div className={styles['form-group']}>
                            <label htmlFor="height">Height (cm)</label>
                            <input
                                type="number"
                                id="height"
                                name="height"
                                value={formData.height}
                                onChange={handleInputChange}
                                placeholder="178"
                                min="100"
                                max="250"
                                required
                            />
                        </div>

                        <div className={styles['form-group']}>
                            <label htmlFor="weight">Weight (kg)</label>
                            <input
                                type="number"
                                id="weight"
                                name="weight"
                                value={formData.weight}
                                onChange={handleInputChange}
                                placeholder="770"
                                min="30"
                                max="300"
                                step="0.1"
                                required
                            />
                        </div>
                    </div>

                    <div className={styles['form-group']}>
                        <label htmlFor="activityLevel">Activity Level</label>
                        <select
                            id="activityLevel"
                            name="activityLevel"
                            value={formData.activityLevel}
                            onChange={handleInputChange}
                            required
                        >
                            <option value="sedentary">Sedentary (Little/No exercise)</option>
                            <option value="lightly-active">Lightly Active (1-3 days/week)</option>
                            <option value="moderately-active">Moderately Active (3-5 days/week)</option>
                            <option value="very-active">Very Active (6-7 days/week)</option>
                            <option value="extremely-active">Extremely Active (Athlete)</option>
                        </select>
                    </div>

                    <div className={styles['form-group']}>
                        <label htmlFor="dietaryPreference">Dietary Preference</label>
                        <select
                            id="dietaryPreference"
                            name="dietaryPreference"
                            value={formData.dietaryPreference}
                            onChange={handleInputChange}
                            required
                        >
                            <option value="all">All (No Preference)</option>
                            <option value="vegetarian">Vegetarian</option>
                            <option value="vegan">Vegan</option>
                            <option value="non-vegetarian">Non-Vegetarian</option>
                        </select>
                    </div>

                    <div className={styles['form-group']}>
                        <label>Health Goals</label>
                        <p style={{ fontSize: '0.85rem', color: '#9ca3af', marginBottom: '0.75rem' }}>
                            Select one or more goals
                        </p>
                        <div className={styles['health-goals-container']}>
                            {availableGoals.map(goal => (
                                <div
                                    key={goal.id}
                                    className={`${styles['goal-tag']} ${formData.healthGoals.includes(goal.id) ? styles.selected : ''}`}
                                    onClick={() => toggleGoal(goal.id)}
                                >
                                    {goal.label}
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className={styles['form-group']}>
                        <label>Allergies / Restrictions</label>
                        <p style={{ fontSize: '0.85rem', color: '#9ca3af', marginBottom: '0.75rem' }}>
                            Select any that apply (optional)
                        </p>
                        <div className={styles['allergies-container']}>
                            {availableAllergies.map(allergy => (
                                <div
                                    key={allergy.id}
                                    className={`${styles['allergy-tag']} ${formData.allergies.includes(allergy.id) ? styles.selected : ''}`}
                                    onClick={() => toggleAllergy(allergy.id)}
                                >
                                    {allergy.label}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <button
                    type="submit"
                    className={styles['submit-button']}
                    disabled={!isFormValid()}
                >
                    Calculate Plan
                </button>
            </form>
        </div>
    );
}

export default ProfileForm;
