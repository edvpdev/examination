import * as mongoose from 'mongoose';

export const CategorySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  id: {
    type: String,
    required: true,
  },
});
