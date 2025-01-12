import mongoose, { Document, Schema } from 'mongoose';

export interface ITask extends Document {
  title: string;
  description: string;
  status: 'TODO' | 'IN_PROGRESS' | 'DONE';
  userId: mongoose.Types.ObjectId; 
  createdAt: Date;
  updatedAt: Date;
}

const taskSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    status: { type: String, enum: ['TODO', 'IN_PROGRESS', 'DONE'], default: 'TODO' },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  {
    timestamps: true, 
  }
);

const Task = mongoose.model<ITask>('Task', taskSchema);
export default Task;
