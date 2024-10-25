import mongoose, { Document, Schema } from "mongoose";

export interface ITodo extends Document {
  title: string;
  description: string;
  userId: string;
}

const todoSchema = new Schema<ITodo>({
  title: { type: String, required: true },
  description: { type: String },
  userId: { type: String, required: true },
});

export default mongoose.model<ITodo>("Todo", todoSchema);
