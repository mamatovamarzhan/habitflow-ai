// Habit routes — protected by JWT. Provides CRUD plus a "complete for a day" endpoint
// and a /summary endpoint that includes computed stats and AI insights.

const express = require('express');
const Habit = require('../models/Habit');
const auth = require('../middleware/auth');
const {
    startOfDay,
    calculateStreak,
    calculateCompletionRate,
    generateInsights,
    findWeakDays,
} = require('../utils/insights');

const router = express.Router();

// All habit routes require a valid JWT.
router.use(auth);

// Attach computed fields (streak, completionRate) to a habit document.
function decorate(habit) {
    const obj = habit.toObject();
    obj.streak = calculateStreak(habit.completions);
    obj.completionRate = calculateCompletionRate(habit);
    return obj;
}

// GET /api/habits — list all habits for the current user (with stats + insights).
router.get('/', async (req, res, next) => {
    try {
        const habits = await Habit.find({ userId: req.userId }).sort({ createdAt: -1 });
        const decorated = habits.map(decorate);
        const insights = generateInsights(habits);
        const weakDays = findWeakDays(habits);
        res.json({ habits: decorated, insights, weakDays });
    } catch (err) {
        next(err);
    }
});

// POST /api/habits — create a new habit.
router.post('/', async (req, res, next) => {
    try {
        const { title, description, frequency } = req.body;
        if (!title || !title.trim()) {
            return res.status(400).json({ message: 'Title is required' });
        }

        const habit = await Habit.create({
            userId: req.userId,
            title: title.trim(),
            description: (description || '').trim(),
            frequency: frequency === 'weekly' ? 'weekly' : 'daily',
            completions: [],
        });
        res.status(201).json(decorate(habit));
    } catch (err) {
        next(err);
    }
});

// PUT /api/habits/:id/complete — toggle today's completion for the habit.
// Body may include { date: 'YYYY-MM-DD' } to mark a specific day.
router.put('/:id/complete', async (req, res, next) => {
    try {
        const habit = await Habit.findOne({ _id: req.params.id, userId: req.userId });
        if (!habit) {
            return res.status(404).json({ message: 'Habit not found' });
        }

        const target = startOfDay(req.body?.date ? new Date(req.body.date) : new Date());
        const targetTime = target.getTime();

        const existsIndex = habit.completions.findIndex(
            (c) => startOfDay(c).getTime() === targetTime
        );

        if (existsIndex >= 0) {
            // Toggle off — undo today's completion.
            habit.completions.splice(existsIndex, 1);
        } else {
            habit.completions.push(target);
        }

        await habit.save();
        res.json(decorate(habit));
    } catch (err) {
        next(err);
    }
});

// DELETE /api/habits/:id — remove a habit.
router.delete('/:id', async (req, res, next) => {
    try {
        const deleted = await Habit.findOneAndDelete({
            _id: req.params.id,
            userId: req.userId,
        });
        if (!deleted) {
            return res.status(404).json({ message: 'Habit not found' });
        }
        res.json({ ok: true });
    } catch (err) {
        next(err);
    }
});

module.exports = router;
