import mongoose, { Document, Schema } from "mongoose";

export interface ITodo extends Document {
  name: string;
  slug: string;
  description?: string;
  completed: boolean;
  priority: "low" | "medium" | "high";
  dateCreate: Date;
  timeRelease: number;
  dueDate?: Date;
}

const todoSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Le nom est requis"],
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    completed: {
      type: Boolean,
      default: false,
    },
    priority: {
      type: String,
      enum: ["low", "medium", "high"],
      default: "medium",
    },
    dateCreate: {
      type: Date,
      default: Date.now,
    },
    timeRelease: {
      type: Number,
      required: true,
    },
    dueDate: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

todoSchema.index({ name: "text", description: "text" });

export default mongoose.model<ITodo>("Todo", todoSchema);
