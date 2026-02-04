// Daily Tracking Storage Utilities

const TRACKING_KEY = 'stayfit_daily_tracking';
const MAX_HISTORY_DAYS = 90; // Keep 90 days of history

/**
 * Save daily tracking data
 * @param {string} date - Date in YYYY-MM-DD format
 * @param {object} data - Tracking data {calories, steps}
 */
export function saveDailyTracking(date, data) {
    const allData = getAllTrackingData();
    const existingData = allData[date] || {};
    
    allData[date] = {
        ...existingData,
        ...data,
        timestamp: new Date().toISOString()
    };

    // Clean old data
    cleanOldData(allData);

    localStorage.setItem(TRACKING_KEY, JSON.stringify(allData));
}

/**
 * Get tracking data for a specific date
 * @param {string} date - Date in YYYY-MM-DD format
 * @returns {object} Tracking data or null
 */
export function getTrackingForDate(date) {
    const allData = getAllTrackingData();
    return allData[date] || null;
}

/**
 * Get all tracking data
 * @returns {object} All tracking data
 */
export function getAllTrackingData() {
    const data = localStorage.getItem(TRACKING_KEY);
    return data ? JSON.parse(data) : {};
}

/**
 * Get tracking data for last N days
 * @param {number} days - Number of days
 * @returns {array} Array of tracking data with dates
 */
export function getLastNDays(days = 7) {
    const allData = getAllTrackingData();
    const result = [];
    const today = new Date();

    for (let i = days - 1; i >= 0; i--) {
        const date = new Date(today);
        date.setDate(date.getDate() - i);
        const dateStr = formatDate(date);

        result.push({
            date: dateStr,
            data: allData[dateStr] || { calories: 0, steps: 0 }
        });
    }

    return result;
}

/**
 * Calculate statistics for a period
 * @param {number} days - Number of days
 * @returns {object} Statistics
 */
export function calculateStats(days = 7) {
    const data = getLastNDays(days);

    const totalCalories = data.reduce((sum, day) => sum + (day.data.calories || 0), 0);
    const totalSteps = data.reduce((sum, day) => sum + (day.data.steps || 0), 0);
    const daysWithData = data.filter(day => day.data.calories > 0 || day.data.steps > 0).length;

    return {
        avgCalories: daysWithData > 0 ? Math.round(totalCalories / daysWithData) : 0,
        avgSteps: daysWithData > 0 ? Math.round(totalSteps / daysWithData) : 0,
        totalCalories,
        totalSteps,
        daysTracked: daysWithData
    };
}

/**
 * Format date to YYYY-MM-DD
 * @param {Date} date - Date object
 * @returns {string} Formatted date
 */
export function formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

/**
 * Get today's date string
 * @returns {string} Today's date in YYYY-MM-DD format
 */
export function getTodayDate() {
    return formatDate(new Date());
}

/**
 * Clean old tracking data
 * @param {object} allData - All tracking data
 */
function cleanOldData(allData) {
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - MAX_HISTORY_DAYS);
    const cutoffStr = formatDate(cutoffDate);

    Object.keys(allData).forEach(date => {
        if (date < cutoffStr) {
            delete allData[date];
        }
    });
}
