import * as mongoose from 'mongoose';

export const ExamSchema = new mongoose.Schema(
  {
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
  },
  {
    timestamps: true,
  },
);
