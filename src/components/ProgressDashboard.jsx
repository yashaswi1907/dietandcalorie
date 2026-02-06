import { useState, useEffect } from 'react';
import styles from './ProgressDashboard.module.css';
import {
    saveDailyTracking,
    getTrackingForDate,
    getTodayDate,
    getLastNDays,
    getAllTrackingData
} from '../utils/trackingStorage';

function ProgressDashboard({ userProfile }) {
    const [currentDate] = useState(getTodayDate());
    const [weight, setWeight] = useState('');
    const [saved, setSaved] = useState(false);
    const [weightHistory, setWeightHistory] = useState([]);
    const [stats, setStats] = useState({
        start: 0,
        current: 0,
        change: 0
    });

    useEffect(() => {
        loadData();
    }, [currentDate]);

    const loadData = () => {
        // Load today's weight
        const todayData = getTrackingForDate(currentDate);
        if (todayData && todayData.weight) {
            setWeight(todayData.weight);
        }

        // Load history and calculate stats
        const allData = getAllTrackingData();
        const history = Object.entries(allData)
            .map(([date, data]) => ({
                date,
                weight: parseFloat(data.weight) || 0
            }))
            .filter(item => item.weight > 0)
            .sort((a, b) => new Date(a.date) - new Date(b.date));

        setWeightHistory(history);

        if (history.length > 0) {
            const startWeight = history[0].weight;
            const currentWeight = history[history.length - 1].weight;

            setStats({
                start: startWeight,
                current: currentWeight,
                change: (currentWeight - startWeight).toFixed(1)
            });
        }
    };

    const handleSave = () => {
        if (!weight) return;

        saveDailyTracking(currentDate, {
            weight: parseFloat(weight)
        });

        setSaved(true);
        loadData();

        setTimeout(() => setSaved(false), 3000);
    };



    return (
        <div className={styles.dashboard}>
            <div className={styles.header}>
                <h2>📉 Weight & Progress</h2>
                <p>Track your journey to a healthier you</p>
            </div>

            <div className={styles.statsGrid}>
                <div className={styles.statCard}>
                    <span className={styles.statLabel}>Start Weight</span>
                    <span className={styles.statValue}>{stats.start || '-'} <small>kg</small></span>
                </div>
                <div className={styles.statCard}>
                    <span className={styles.statLabel}>Current</span>
                    <span className={styles.statValue}>{stats.current || '-'} <small>kg</small></span>
                </div>
                <div className={styles.statCard}>
                    <span className={styles.statLabel}>Change</span>
                    <span className={`${styles.statValue} ${stats.change < 0 ? styles.gain : styles.loss}`}>
                        {stats.change > 0 ? '+' : ''}{stats.change || '-'} <small>kg</small>
                    </span>
                </div>
            </div>

            <div className={styles.inputSection}>
                <h3>Log Today's Weight</h3>
                <div className={styles.inputGroup}>
                    <input
                        type="number"
                        step="0.1"
                        placeholder="0.0"
                        value={weight}
                        onChange={(e) => setWeight(e.target.value)}
                    />
                    <span className={styles.unit}>kg</span>
                    <button onClick={handleSave} className={styles.saveBtn}>
                        Save Log
                    </button>
                </div>
                {saved && <div className={styles.success}>Saved successfully! 🎉</div>}
            </div>



            <div className={styles.historyList}>
                <h3>Recent Logs</h3>
                {weightHistory.slice().reverse().map((entry, i) => (
                    <div key={i} className={styles.historyItem}>
                        <span>{new Date(entry.date).toLocaleDateString()}</span>
                        <strong>{entry.weight} kg</strong>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ProgressDashboard;
