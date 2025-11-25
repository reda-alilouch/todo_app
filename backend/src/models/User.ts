import mongoose, { Document, Schema } from "mongoose";

export interface IUser extends Document {
  Name: string;
  Email: string;
  Password: string;
}

const userSchema: Schema = new Schema({
  Name: { type: String, required: true },
  Email: { type: String, required: true, unique: true},
  Password: { type: String, required: true },
});
export default mongoose.model<IUser>("User", userSchema);
