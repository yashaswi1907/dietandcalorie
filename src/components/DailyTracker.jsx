import { useState, useEffect } from 'react';
import styles from './DailyTracker.module.css';
import {
    saveDailyTracking,
    getTrackingForDate,
    getTodayDate,
    getLastNDays,
    calculateStats
} from '../utils/trackingStorage';

function DailyTracker({ userProfile }) {
    const [currentDate] = useState(getTodayDate());
    const [calories, setCalories] = useState('');
    const [steps, setSteps] = useState('');
    const [saved, setSaved] = useState(false);
    const [stats, setStats] = useState(null);
    const [weekData, setWeekData] = useState([]);

    useEffect(() => {
        // Load today's data if exists
        const todayData = getTrackingForDate(currentDate);
        if (todayData) {
            setCalories(todayData.calories || '');
            setSteps(todayData.steps || '');
        }

        // Load statistics
        loadStats();
    }, [currentDate]);

    const loadStats = () => {
        const weeklyStats = calculateStats(7);
        setStats(weeklyStats);

        const lastWeek = getLastNDays(7);
        setWeekData(lastWeek);
    };

    const handleSave = () => {
        const data = {
            calories: parseInt(calories) || 0,
            steps: parseInt(steps) || 0
        };

        saveDailyTracking(currentDate, data);
        setSaved(true);
        loadStats();

        setTimeout(() => setSaved(false), 3000);
    };

    const maxCalories = Math.max(...weekData.map(d => d.data.calories || 0), 1);
    const maxSteps = Math.max(...weekData.map(d => d.data.steps || 0), 1);

    return (
        <div className={styles['daily-tracker']}>
            <div className={styles['tracker-header']}>
                <h2>📊 Daily Activity Tracker</h2>
                <p>Log your daily calorie intake and steps</p>
            </div>

            <div className={styles['tracker-card']}>
                <div className={styles['date-selector']}>
                    📅 {new Date(currentDate).toLocaleDateString('en-US', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                    })}
                </div>

                {saved && (
                    <div className={styles['success-message']}>
                        ✓ Successfully saved your tracking data!
                    </div>
                )}

                <div className={styles['tracking-inputs']}>
                    <div className={styles['input-group']}>
                        <label htmlFor="calories">Calories Consumed</label>
                        <input
                            type="number"
                            id="calories"
                            value={calories}
                            onChange={(e) => setCalories(e.target.value)}
                            placeholder="0"
                            min="0"
                            max="10000"
                        />
                        <div className={styles['input-hint']}>
                            Target: {userProfile?.targetCalories || '2000'} cal
                        </div>
                    </div>

                    <div className={styles['input-group']}>
                        <label htmlFor="steps">Steps Taken</label>
                        <input
                            type="number"
                            id="steps"
                            value={steps}
                            onChange={(e) => setSteps(e.target.value)}
                            placeholder="0"
                            min="0"
                            max="100000"
                        />
                        <div className={styles['input-hint']}>
                            Goal: 10,000 steps
                        </div>
                    </div>
                </div>

                <button className={styles['save-button']} onClick={handleSave}>
                    💾 Save Today's Data
                </button>

                {stats && (
                    <div className={styles['stats-section']}>
                        <h3>7-Day Summary</h3>

                        <div className={styles['stats-grid']}>
                            <div className={styles['stat-box']}>
                                <span className={styles['stat-value']}>{stats.avgCalories}</span>
                                <span className={styles['stat-label']}>Avg Calories</span>
                            </div>
                            <div className={styles['stat-box']}>
                                <span className={styles['stat-value']}>{stats.avgSteps.toLocaleString()}</span>
                                <span className={styles['stat-label']}>Avg Steps</span>
                            </div>
                            <div className={styles['stat-box']}>
                                <span className={styles['stat-value']}>{stats.daysTracked}</span>
                                <span className={styles['stat-label']}>Days Tracked</span>
                            </div>
                        </div>

                        <div className={styles['history-chart']}>
                            <h4 style={{ textAlign: 'center', marginBottom: 'var(--spacing-lg)', color: 'var(--text-primary)' }}>
                                Calories This Week
                            </h4>
                            <div className={styles['chart-bars']}>
                                {weekData.map((day, index) => (
                                    <div key={index} className={styles['chart-bar']}>
                                        <div
                                            className={styles['bar-fill']}
                                            style={{
                                                height: `${(day.data.calories / maxCalories) * 180}px`
                                            }}
                                            title={`${day.data.calories} cal`}
                                        />
                                        <div className={styles['bar-label']}>
                                            {new Date(day.date).toLocaleDateString('en-US', { weekday: 'short' })}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default DailyTracker;
