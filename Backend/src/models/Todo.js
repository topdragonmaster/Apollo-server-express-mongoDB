import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const TodoSchema = new Schema(
  {
    name: {
      type: String,   
    },

    completed: {
      type: Boolean,
      required: [true, 'password required']
    },

    owner: {
      type: String,
      required: [true, 'owner required']
    },
  }
);

export default mongoose.model('Todo', TodoSchema);