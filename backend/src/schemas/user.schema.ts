import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
  },
  id: {
    type: String,
    required: true,
  },
  roles: [
    {
      type: String,
    },
  ],
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});
