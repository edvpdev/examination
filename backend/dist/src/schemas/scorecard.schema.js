"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScorecardSchema = void 0;
const mongoose = require("mongoose");
exports.ScorecardSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    exam: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Exams',
    },
    status: {
        type: String,
        required: true,
    },
    answers: [
        {
            title: {
                type: String,
                required: true,
            },
            questionText: {
                type: String,
                required: true,
            },
            questionAnswer: {
                type: String,
            },
            maxScore: {
                type: Number,
                required: true,
                min: 0,
            },
            givenScore: {
                type: Number,
                min: 0,
            },
            category: {
                type: String,
            },
        },
    ],
    user: {
        type: String,
        required: true,
    },
    bonusScore: {
        type: Number,
        min: 0,
    },
    totalScore: {
        required: true,
        type: Number,
        min: 0,
    },
    notes: {
        type: String,
    },
}, {
    timestamps: true,
});
//# sourceMappingURL=scorecard.schema.js.map