// Tiny fetch wrapper. Pulls the JWT from localStorage and prefixes requests with /api.

const BASE_URL = '/api';

function getToken() {
    return localStorage.getItem('habitflow_token');
}

async function request(path, { method = 'GET', body, auth = true } = {}) {
    const headers = { 'Content-Type': 'application/json' };
    if (auth) {
        const token = getToken();
        if (token) headers.Authorization = `Bearer ${token}`;
    }

    const res = await fetch(`${BASE_URL}${path}`, {
        method,
        headers,
        body: body ? JSON.stringify(body) : undefined,
    });

    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
        const err = new Error(data.message || `Request failed: ${res.status}`);
        err.status = res.status;
        throw err;
    }
    return data;
}

export const api = {
    register: (email, password) =>
        request('/auth/register', { method: 'POST', body: { email, password }, auth: false }),
    login: (email, password) =>
        request('/auth/login', { method: 'POST', body: { email, password }, auth: false }),
    listHabits: () => request('/habits'),
    createHabit: (data) => request('/habits', { method: 'POST', body: data }),
    completeHabit: (id, date) =>
        request(`/habits/${id}/complete`, { method: 'PUT', body: { date } }),
    deleteHabit: (id) => request(`/habits/${id}`, { method: 'DELETE' }),
};
