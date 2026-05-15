// Habit model — each habit belongs to a user and tracks completion dates.
const mongoose = require('mongoose');

const habitSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
            index: true,
        },
        title: {
            type: String,
            required: true,
            trim: true,
        },
        description: {
            type: String,
            default: '',
            trim: true,
        },
        frequency: {
            type: String,
            enum: ['daily', 'weekly'],
            default: 'daily',
        },
        // Each completion is stored as a Date normalized to the start of the day.
        completions: {
            type: [Date],
            default: [],
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model('Habit', habitSchema);
