import * as mongoose from 'mongoose';

export const QuestionSchema = new mongoose.Schema(
  {
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
  },
  {
    timestamps: true,
  },
);
