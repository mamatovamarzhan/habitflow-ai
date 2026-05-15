// Three small summary cards at the top of the dashboard.
export default function StatsCards({ habits }) {
    const totalHabits = habits.length;

    const avgStreak = totalHabits
        ? Math.round(habits.reduce((sum, h) => sum + (h.streak || 0), 0) / totalHabits)
        : 0;

    const avgRate = totalHabits
        ? Math.round(
              habits.reduce((sum, h) => sum + (h.completionRate || 0), 0) / totalHabits
          )
        : 0;

    const cards = [
        { label: 'Active habits', value: totalHabits, hint: 'Tracked right now' },
        { label: 'Average streak', value: `${avgStreak}d`, hint: 'Across all habits' },
        { label: 'Completion rate', value: `${avgRate}%`, hint: 'Last 30 days' },
    ];

    return (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {cards.map((c) => (
                <div
                    key={c.label}
                    className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5"
                >
                    <p className="text-sm text-slate-500">{c.label}</p>
                    <p className="text-3xl font-bold text-slate-900 mt-1">{c.value}</p>
                    <p className="text-xs text-slate-400 mt-1">{c.hint}</p>
                </div>
            ))}
        </div>
    );
}
