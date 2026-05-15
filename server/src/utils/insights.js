// Simple rule-based "AI" insights. No external API calls — pure logic over the habit data.

const MS_PER_DAY = 24 * 60 * 60 * 1000;
const WEEKDAY_NAMES = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

// Normalize any date to midnight UTC for stable day-comparisons.
function startOfDay(date) {
    const d = new Date(date);
    d.setHours(0, 0, 0, 0);
    return d;
}

// Count consecutive days, going back from today, that have a completion.
function calculateStreak(completions) {
    if (!completions || completions.length === 0) return 0;

    const set = new Set(completions.map((c) => startOfDay(c).getTime()));
    let streak = 0;
    let cursor = startOfDay(new Date());

    // Allow today to be missing — start counting from yesterday if today not done.
    if (!set.has(cursor.getTime())) {
        cursor = new Date(cursor.getTime() - MS_PER_DAY);
    }

    while (set.has(cursor.getTime())) {
        streak += 1;
        cursor = new Date(cursor.getTime() - MS_PER_DAY);
    }
    return streak;
}

// completion rate over the last `days` window for a daily habit.
function calculateCompletionRate(habit, days = 30) {
    const created = startOfDay(habit.createdAt || new Date()).getTime();
    const today = startOfDay(new Date()).getTime();

    // Window starts at max(createdAt, today - days).
    const windowStart = Math.max(created, today - (days - 1) * MS_PER_DAY);
    const expected = Math.floor((today - windowStart) / MS_PER_DAY) + 1;
    if (expected <= 0) return 0;

    const hits = habit.completions.filter((c) => {
        const t = startOfDay(c).getTime();
        return t >= windowStart && t <= today;
    }).length;

    return Math.min(100, Math.round((hits / expected) * 100));
}

// Count how many days in the last 7 the habit was missed (only daily habits).
function missesLastWeek(habit) {
    const today = startOfDay(new Date()).getTime();
    const weekAgo = today - 6 * MS_PER_DAY;
    const set = new Set(habit.completions.map((c) => startOfDay(c).getTime()));
    let misses = 0;
    for (let t = weekAgo; t <= today; t += MS_PER_DAY) {
        if (!set.has(t)) misses += 1;
    }
    return misses;
}

// Aggregate completions by weekday across all habits to find the weakest day(s).
function findWeakDays(habits) {
    const buckets = [0, 0, 0, 0, 0, 0, 0];
    for (const h of habits) {
        for (const c of h.completions) {
            buckets[new Date(c).getDay()] += 1;
        }
    }
    // If nothing logged, no weak day exists.
    if (buckets.every((v) => v === 0)) return [];
    const min = Math.min(...buckets);
    return buckets
        .map((v, i) => ({ day: WEEKDAY_NAMES[i], count: v }))
        .filter((b) => b.count === min);
}

// Build the list of insight messages displayed on the dashboard.
function generateInsights(habits) {
    const insights = [];

    for (const habit of habits) {
        const streak = calculateStreak(habit.completions);

        if (habit.frequency === 'daily') {
            const misses = missesLastWeek(habit);
            if (misses > 2) {
                insights.push({
                    type: 'warning',
                    habitId: habit._id,
                    message: `You missed "${habit.title}" ${misses} times this week. Consider reducing the difficulty or making it smaller.`,
                });
            }
        }

        if (streak > 5) {
            insights.push({
                type: 'success',
                habitId: habit._id,
                message: `Great streak on "${habit.title}" — ${streak} days! Time to raise the bar or add a related habit.`,
            });
        }
    }

    const weakDays = findWeakDays(habits);
    if (weakDays.length > 0 && weakDays.length < 7) {
        const names = weakDays.map((d) => d.day).join(', ');
        insights.push({
            type: 'info',
            message: `Your weakest day(s): ${names}. Plan ahead to stay on track.`,
        });
    }

    return insights;
}

module.exports = {
    startOfDay,
    calculateStreak,
    calculateCompletionRate,
    findWeakDays,
    generateInsights,
};
