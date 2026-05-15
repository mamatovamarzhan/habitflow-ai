import { useCallback, useEffect, useState } from 'react';
import { api } from '../api/client';
import Navbar from '../components/Navbar';
import StatsCards from '../components/StatsCards';
import HabitForm from '../components/HabitForm';
import HabitCard from '../components/HabitCard';
import WeeklyChart from '../components/WeeklyChart';
import CalendarView from '../components/CalendarView';
import InsightsPanel from '../components/InsightsPanel';

export default function Dashboard() {
    const [habits, setHabits] = useState([]);
    const [insights, setInsights] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const load = useCallback(async () => {
        try {
            const data = await api.listHabits();
            setHabits(data.habits);
            setInsights(data.insights);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        load();
    }, [load]);

    async function handleCreate(payload) {
        await api.createHabit(payload);
        await load();
    }

    async function handleToggle(id) {
        await api.completeHabit(id);
        await load();
    }

    async function handleDelete(id) {
        if (!confirm('Delete this habit?')) return;
        await api.deleteHabit(id);
        await load();
    }

    return (
        <div className="min-h-screen">
            <Navbar />
            <main className="max-w-6xl mx-auto px-4 sm:px-6 py-6 space-y-6">
                {error && (
                    <div className="rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-2">
                        {error}
                    </div>
                )}

                <StatsCards habits={habits} />

                <HabitForm onSubmit={handleCreate} />

                <div className="grid lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2 space-y-3">
                        <h2 className="font-semibold text-slate-900">Your habits</h2>
                        {loading ? (
                            <p className="text-sm text-slate-500">Loading…</p>
                        ) : habits.length === 0 ? (
                            <div className="bg-white rounded-2xl border border-dashed border-slate-300 p-8 text-center text-slate-500">
                                You don't have any habits yet. Add your first one above.
                            </div>
                        ) : (
                            habits.map((h) => (
                                <HabitCard
                                    key={h._id}
                                    habit={h}
                                    onToggle={handleToggle}
                                    onDelete={handleDelete}
                                />
                            ))
                        )}
                    </div>

                    <div className="space-y-6">
                        <InsightsPanel insights={insights} />
                        <WeeklyChart habits={habits} />
                        <CalendarView habits={habits} />
                    </div>
                </div>
            </main>
        </div>
    );
}
