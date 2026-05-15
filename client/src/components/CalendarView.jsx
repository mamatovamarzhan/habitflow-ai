// Minimal calendar showing the current month with a dot on days that had any completion.

function getMonthGrid(year, month) {
    const first = new Date(year, month, 1);
    const startWeekday = first.getDay(); // 0 = Sunday
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const cells = [];
    for (let i = 0; i < startWeekday; i++) cells.push(null);
    for (let d = 1; d <= daysInMonth; d++) cells.push(d);
    while (cells.length % 7 !== 0) cells.push(null);
    return cells;
}

export default function CalendarView({ habits }) {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth();
    const todayDate = now.getDate();

    const completedDays = new Set();
    for (const h of habits) {
        for (const c of h.completions) {
            const d = new Date(c);
            if (d.getFullYear() === year && d.getMonth() === month) {
                completedDays.add(d.getDate());
            }
        }
    }

    const cells = getMonthGrid(year, month);
    const weekdays = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
    const monthName = now.toLocaleDateString(undefined, { month: 'long', year: 'numeric' });

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5">
            <h3 className="font-semibold text-slate-900 mb-3">{monthName}</h3>
            <div className="grid grid-cols-7 gap-1 text-center text-xs text-slate-400 mb-1">
                {weekdays.map((w, i) => (
                    <div key={i}>{w}</div>
                ))}
            </div>
            <div className="grid grid-cols-7 gap-1 text-center text-sm">
                {cells.map((day, i) => {
                    if (day === null) return <div key={i} />;
                    const isToday = day === todayDate;
                    const isDone = completedDays.has(day);
                    return (
                        <div
                            key={i}
                            className={`aspect-square grid place-items-center rounded-lg border text-xs ${
                                isToday
                                    ? 'border-brand text-brand font-semibold'
                                    : 'border-transparent text-slate-600'
                            } ${isDone ? 'bg-brand-50' : ''}`}
                        >
                            <div className="flex flex-col items-center">
                                <span>{day}</span>
                                {isDone && (
                                    <span className="w-1.5 h-1.5 rounded-full bg-brand mt-0.5" />
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
