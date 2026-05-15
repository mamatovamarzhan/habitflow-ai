// Auth routes — register and login. Returns a JWT on success.
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();

// Helper to sign a JWT for a given user id.
function signToken(userId) {
    return jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: '7d',
    });
}

// POST /api/auth/register — create a new account.
router.post('/register', async (req, res, next) => {
    try {
        const { email, password } = req.body;

        if (!email || !password || password.length < 6) {
            return res
                .status(400)
                .json({ message: 'Email and password (min 6 chars) are required' });
        }

        const existing = await User.findOne({ email });
        if (existing) {
            return res.status(409).json({ message: 'Email already in use' });
        }

        const passwordHash = await bcrypt.hash(password, 10);
        const user = await User.create({ email, passwordHash });
        const token = signToken(user._id);

        res.status(201).json({
            token,
            user: { id: user._id, email: user.email },
        });
    } catch (err) {
        next(err);
    }
});

// POST /api/auth/login — exchange credentials for a JWT.
router.post('/login', async (req, res, next) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required' });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const ok = await bcrypt.compare(password, user.passwordHash);
        if (!ok) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const token = signToken(user._id);
        res.json({ token, user: { id: user._id, email: user.email } });
    } catch (err) {
        next(err);
    }
});

module.exports = router;
