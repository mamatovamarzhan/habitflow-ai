import { useAuth } from '../context/AuthContext';

// Top nav bar — shows brand and logout button.
export default function Navbar() {
    const { user, logout } = useAuth();
    return (
        <header className="bg-white border-b border-slate-200">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <div className="w-9 h-9 rounded-xl bg-brand text-white grid place-items-center font-bold">
                        H
                    </div>
                    <div>
                        <h1 className="font-bold text-slate-900 leading-tight">HabitFlow AI</h1>
                        <p className="text-xs text-slate-500">Build better habits, every day</p>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <span className="hidden sm:inline text-sm text-slate-600">{user?.email}</span>
                    <button
                        onClick={logout}
                        className="px-3 py-1.5 text-sm rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition"
                    >
                        Log out
                    </button>
                </div>
            </div>
        </header>
    );
}
