// Entry point for the HabitFlow AI backend.
// Loads env vars, sets up Express middleware, registers routes, connects to Mongo.

require('dotenv').config();
const express = require('express');
const cors = require('cors');

const connectDB = require('./config/db');
const authRoutes = require('./routes/auth');
const habitRoutes = require('./routes/habits');

const app = express();

// Allow the React client (Vite dev server) to call the API.
app.use(cors({ origin: process.env.CLIENT_ORIGIN || '*' }));

// Parse JSON request bodies.
app.use(express.json());

// Simple health check — useful for verifying the API is alive.
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok' });
});

// Feature routes.
app.use('/api/auth', authRoutes);
app.use('/api/habits', habitRoutes);

// Centralized error handler. Routes call next(err) and end up here.
app.use((err, req, res, next) => {
    console.error('[error]', err.message);
    res.status(err.status || 500).json({ message: err.message || 'Server error' });
});

const PORT = process.env.PORT || 5000;

// Connect to Mongo first, then start listening.
connectDB()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`HabitFlow API running on http://localhost:${PORT}`);
        });
    })
    .catch((err) => {
        console.error('Failed to start server:', err);
        process.exit(1);
    });
