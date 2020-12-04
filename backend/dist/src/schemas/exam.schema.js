"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExamSchema = void 0;
const mongoose = require("mongoose");
exports.ExamSchema = new mongoose.Schema({
    questions: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Questions',
        },
    ],
    title: {
        type: String,
        required: true,
    },
}, {
    timestamps: true,
});
//# sourceMappingURL=exam.schema.js.map