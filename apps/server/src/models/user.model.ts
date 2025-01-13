import mongoose, { Document, Schema } from 'mongoose';

export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  taskId: mongoose.Types.ObjectId[];
}

const userSchema: Schema = new Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  taskId: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Task', required: true }],
});

const User = mongoose.model<IUser>('User', userSchema);
export default User;