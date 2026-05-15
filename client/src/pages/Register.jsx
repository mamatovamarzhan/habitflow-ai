import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Register() {
    const { register } = useAuth();
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [submitting, setSubmitting] = useState(false);

    async function handleSubmit(e) {
        e.preventDefault();
        setSubmitting(true);
        setError(null);
        try {
            await register(email, password);
            navigate('/');
        } catch (err) {
            setError(err.message);
        } finally {
            setSubmitting(false);
        }
    }

    return (
        <div className="min-h-screen grid place-items-center px-4">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
                <div className="text-center mb-6">
                    <div className="inline-flex w-12 h-12 rounded-2xl bg-brand text-white items-center justify-center font-bold text-xl mb-3">
                        H
                    </div>
                    <h1 className="text-2xl font-bold text-slate-900">Create your account</h1>
                    <p className="text-sm text-slate-500 mt-1">Start tracking habits today</p>
                </div>
                <form onSubmit={handleSubmit} className="space-y-3">
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        required
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand"
                    />
                    <input
                        type="password"
                        placeholder="Password (min 6 characters)"
                        value={password}
                        required
                        minLength={6}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand"
                    />
                    {error && <p className="text-sm text-red-600">{error}</p>}
                    <button
                        type="submit"
                        disabled={submitting}
                        className="w-full px-4 py-2 rounded-lg bg-brand text-white font-medium hover:bg-brand-600 disabled:opacity-50 transition"
                    >
                        {submitting ? 'Creating…' : 'Sign up'}
                    </button>
                </form>
                <p className="text-sm text-center text-slate-500 mt-4">
                    Already have an account?{' '}
                    <Link to="/login" className="text-brand hover:underline">
                        Log in
                    </Link>
                </p>
            </div>
        </div>
    );
}
