import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    username: {
      type: String,
      required: [true, 'username required'],
    },
    password: {
      type: String,
      required: [true, 'password required']
    },
    email: {
      type: String,
      required: [true, 'email required']
    }
  }
);

export default mongoose.model('User', UserSchema);