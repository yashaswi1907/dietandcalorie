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

    // Chart helpers
    const renderChart = () => {
        if (weightHistory.length < 2) return null;

        const chartHeight = 200;
        const chartWidth = 600;
        const padding = 20;

        const weights = weightHistory.map(d => d.weight);
        const minWeight = Math.min(...weights) - 2;
        const maxWeight = Math.max(...weights) + 2;

        const dates = weightHistory.map(d => new Date(d.date));
        const minDate = dates[0].getTime();
        const maxDate = dates[dates.length - 1].getTime();
        const timeRange = maxDate - minDate || 1; // Avoid division by zero

        const points = weightHistory.map((d, i) => {
            const date = new Date(d.date).getTime();
            const x = padding + ((date - minDate) / timeRange) * (chartWidth - 2 * padding);
            const y = chartHeight - padding - ((d.weight - minWeight) / (maxWeight - minWeight)) * (chartHeight - 2 * padding);
            return `${x},${y}`;
        }).join(' ');

        return (
            <svg viewBox={`0 0 ${chartWidth} ${chartHeight}`} className={styles.chart}>
                {/* Background lines */}
                <line x1={padding} y1={padding} x2={padding} y2={chartHeight - padding} stroke="#eee" strokeWidth="1" />
                <line x1={padding} y1={chartHeight - padding} x2={chartWidth - padding} y2={chartHeight - padding} stroke="#eee" strokeWidth="1" />

                {/* Data line */}
                <polyline
                    fill="none"
                    stroke="var(--primary-color)"
                    strokeWidth="3"
                    points={points}
                />

                {/* Data points */}
                {weightHistory.map((d, i) => {
                    const date = new Date(d.date).getTime();
                    const x = padding + ((date - minDate) / timeRange) * (chartWidth - 2 * padding);
                    const y = chartHeight - padding - ((d.weight - minWeight) / (maxWeight - minWeight)) * (chartHeight - 2 * padding);
                    return (
                        <g key={i} className={styles.pointGroup}>
                            <circle cx={x} cy={y} r="4" fill="white" stroke="var(--primary-color)" strokeWidth="2" />
                            <title>{d.date}: {d.weight}kg</title>
                        </g>
                    );
                })}
            </svg>
        );
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

            <div className={styles.chartSection}>
                <h3>Your Progress Curve</h3>
                {weightHistory.length > 1 ? (
                    renderChart()
                ) : (
                    <div className={styles.emptyChart}>
                        <p>Log your weight on at least 2 different days to see the chart!</p>
                    </div>
                )}
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
