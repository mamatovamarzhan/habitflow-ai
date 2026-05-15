// Auth context — keeps the user/token in React state and persists token in localStorage.
import { createContext, useContext, useEffect, useState } from 'react';
import { api } from '../api/client';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [token, setToken] = useState(() => localStorage.getItem('habitflow_token'));
    const [user, setUser] = useState(() => {
        const raw = localStorage.getItem('habitflow_user');
        return raw ? JSON.parse(raw) : null;
    });

    useEffect(() => {
        if (token) localStorage.setItem('habitflow_token', token);
        else localStorage.removeItem('habitflow_token');
    }, [token]);

    useEffect(() => {
        if (user) localStorage.setItem('habitflow_user', JSON.stringify(user));
        else localStorage.removeItem('habitflow_user');
    }, [user]);

    async function login(email, password) {
        const data = await api.login(email, password);
        setToken(data.token);
        setUser(data.user);
    }

    async function register(email, password) {
        const data = await api.register(email, password);
        setToken(data.token);
        setUser(data.user);
    }

    function logout() {
        setToken(null);
        setUser(null);
    }

    return (
        <AuthContext.Provider value={{ user, token, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
    return ctx;
}
