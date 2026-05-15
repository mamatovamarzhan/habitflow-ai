// Single habit row — shows title, frequency, streak, and complete/delete actions.

function isCompletedToday(completions) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return completions.some((c) => {
        const d = new Date(c);
        d.setHours(0, 0, 0, 0);
        return d.getTime() === today.getTime();
    });
}

export default function HabitCard({ habit, onToggle, onDelete }) {
    const done = isCompletedToday(habit.completions);

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 flex items-start gap-4">
            <button
                onClick={() => onToggle(habit._id)}
                className={`shrink-0 w-10 h-10 rounded-full border-2 grid place-items-center transition ${
                    done
                        ? 'bg-brand border-brand text-white'
                        : 'border-slate-300 text-transparent hover:border-brand'
                }`}
                aria-label={done ? 'Mark as not done' : 'Mark as done'}
            >
                {done ? '✓' : ''}
            </button>

            <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                    <h4 className="font-semibold text-slate-900 truncate">{habit.title}</h4>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                        {habit.frequency}
                    </span>
                </div>
                {habit.description && (
                    <p className="text-sm text-slate-500 mt-1">{habit.description}</p>
                )}
                <div className="mt-3 flex gap-4 text-sm text-slate-600">
                    <span>
                        🔥 <strong>{habit.streak}</strong> day streak
                    </span>
                    <span>
                        📊 <strong>{habit.completionRate}%</strong> last 30 days
                    </span>
                </div>
            </div>

            <button
                onClick={() => onDelete(habit._id)}
                className="text-slate-400 hover:text-red-500 transition text-sm"
                aria-label="Delete habit"
            >
                Delete
            </button>
        </div>
    );
}
