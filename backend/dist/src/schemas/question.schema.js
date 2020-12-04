"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuestionSchema = void 0;
const mongoose = require("mongoose");
exports.QuestionSchema = new mongoose.Schema({
    exams: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Exams',
        },
    ],
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Categories',
    },
    title: {
        type: String,
        required: true,
    },
    questionText: {
        type: String,
        required: true,
    },
    maxScore: {
        type: Number,
        required: true,
        min: 0,
    },
}, {
    timestamps: true,
});
//# sourceMappingURL=question.schema.js.map