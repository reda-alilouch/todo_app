import mongoose, { Document, Schema } from "mongoose";

export interface ITodo extends Document {
  name: string;
  slug: string;
  description?: string;
  completed?: boolean;
  priority?: "low" | "medium" | "high";
  timeRelease: number;
  dueDate?: Date;
}

const todoSchema: Schema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, trim: true },
    description: { type: String, trim: true },
    completed: { type: Boolean, default: false },
    priority: {
      type: String,
      enum: ["low", "medium", "high"],
      default: "medium",
    },
    timeRelease: { type: Number, required: true },
    dueDate: { type: Date },
  },
  { timestamps: true }
);

export default mongoose.model<ITodo>("Todo", todoSchema);
