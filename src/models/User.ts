import mongoose, { Schema, model,Model } from "mongoose";

interface UsersData {
  name: string;
  username: string;
  email: string;
  publicPicture: string;
  coverPicture: string;
  stripeId: string;
  stripeSecret: string;
}

const UserSchema = new Schema<UsersData>({
    name: {
      type: String,
      required: false, // Optional now
      default: "Anonymous", // Default value if missing
    },
    username: {
      type: String,
      required: true,  // Consider making this required
    },
    email: {
      type: String,
      required: true,  // Email should be required
      unique: true,
    },
    publicPicture: {
      type: String,
      required: false,
    },
    coverPicture: {
      type: String,
      required: false,
    },
    stripeId: {
      type: String,
      required: false, // Optional, default to empty string if not available
      default: "",
    },
   
  });
  
const User =
  (mongoose.models.User as mongoose.Model<UsersData>) ||
  mongoose.model<UsersData>("User", UserSchema);

export default User;