import { useState } from 'react';

// Form for creating a new habit.
export default function HabitForm({ onSubmit }) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [frequency, setFrequency] = useState('daily');
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState(null);

    async function handleSubmit(e) {
        e.preventDefault();
        if (!title.trim()) return;
        setSubmitting(true);
        setError(null);
        try {
            await onSubmit({ title, description, frequency });
            setTitle('');
            setDescription('');
            setFrequency('daily');
        } catch (err) {
            setError(err.message);
        } finally {
            setSubmitting(false);
        }
    }

    return (
        <form
            onSubmit={handleSubmit}
            className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 space-y-3"
        >
            <h3 className="font-semibold text-slate-900">Add a new habit</h3>
            <div className="grid sm:grid-cols-3 gap-3">
                <input
                    type="text"
                    placeholder="e.g. Read 10 pages"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="sm:col-span-2 rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand"
                />
                <select
                    value={frequency}
                    onChange={(e) => setFrequency(e.target.value)}
                    className="rounded-lg border border-slate-300 px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-brand"
                >
                    <option value="daily">Daily</option>
                    <option value="weekly">Weekly</option>
                </select>
            </div>
            <textarea
                placeholder="Optional description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={2}
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand"
            />
            {error && <p className="text-sm text-red-600">{error}</p>}
            <button
                type="submit"
                disabled={submitting}
                className="w-full sm:w-auto px-4 py-2 rounded-lg bg-brand text-white font-medium hover:bg-brand-600 disabled:opacity-50 transition"
            >
                {submitting ? 'Adding…' : 'Add habit'}
            </button>
        </form>
    );
}
