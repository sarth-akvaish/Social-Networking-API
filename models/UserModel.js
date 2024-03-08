import { Schema, model } from 'mongoose';

const userSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  profile: {
    type: Schema.Types.ObjectId,
    ref: 'Profile',
  }
});

const userModel = model('User', userSchema);

export default userModel;
