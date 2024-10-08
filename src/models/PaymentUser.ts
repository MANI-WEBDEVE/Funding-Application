import mongoose, { Document, Model, Schema } from "mongoose";

export interface PaymentUser extends Document {
  name: string;
  to_username: string;
  to_user_email: string;
  order_id: string;
  message: string;
  amount: number;
  timeStamp: Date;
  done: boolean;
}

const PaymentUserSchema = new Schema<PaymentUser>({
  name: {
    type: String,
  },
  to_username: {
    type: String,
  },
  to_user_email: {
    type: String,
  },
  order_id: {
    type: String,
  },
  message: {
    type: String,
  },
  amount: {
    type: Number,
  },
  timeStamp: {
    type: Date,
  },
  done: {
    type: Boolean,
    default: false,
  },
});

const PaymentUser =
  mongoose.models.PaymentUser ||
  mongoose.model("PaymentUser", PaymentUserSchema);
export default PaymentUser;
