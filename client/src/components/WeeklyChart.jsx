// Bar chart of completions over the last 7 days, summed across all habits.
import {
    Bar,
    BarChart,
    CartesianGrid,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from 'recharts';

function buildData(habits) {
    const days = [];
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    for (let i = 6; i >= 0; i--) {
        const d = new Date(today);
        d.setDate(today.getDate() - i);
        days.push({
            key: d.getTime(),
            label: d.toLocaleDateString(undefined, { weekday: 'short' }),
            completions: 0,
        });
    }

    for (const habit of habits) {
        for (const c of habit.completions) {
            const dt = new Date(c);
            dt.setHours(0, 0, 0, 0);
            const bucket = days.find((d) => d.key === dt.getTime());
            if (bucket) bucket.completions += 1;
        }
    }

    return days;
}

export default function WeeklyChart({ habits }) {
    const data = buildData(habits);
    return (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5">
            <h3 className="font-semibold text-slate-900 mb-3">This week</h3>
            <div className="h-56">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                        <XAxis dataKey="label" stroke="#64748b" fontSize={12} />
                        <YAxis allowDecimals={false} stroke="#64748b" fontSize={12} />
                        <Tooltip
                            contentStyle={{
                                borderRadius: 12,
                                border: '1px solid #e2e8f0',
                                fontSize: 12,
                            }}
                        />
                        <Bar dataKey="completions" fill="#6366f1" radius={[8, 8, 0, 0]} />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
