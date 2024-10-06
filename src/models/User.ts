import mongoose, { Schema, model, Model } from "mongoose";

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
    
  },
  username: {
    type: String,
    required: true, // Consider making this required if unique
    unique: true,   // Ensure usernames are unique
  },
  email: {
    type: String,
    required: true, // Email should likely be required
    unique: true,   // Ensure emails are unique
  },
  publicPicture: {
    type: String,
   
  },
  coverPicture: {
    type: String,
  
  },
  stripeId: {
    type: String,
   
  },
  stripeSecret: {
    type: String,
  
  },
});

// Compile the User model
const User =
  (mongoose.models.User as mongoose.Model<UsersData>) ||
  mongoose.model<UsersData>("User", UserSchema);

export default User;
