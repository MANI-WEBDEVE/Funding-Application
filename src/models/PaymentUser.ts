import mongoose, { Document, Model, Schema } from "mongoose";

export interface PaymentUser extends Document {
  name: string;
  to_username: string;
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

export const PaymentUserModel: Model<PaymentUser> =
  mongoose.models.PaymentUser || mongoose.model<PaymentUser>("Payment", PaymentUserSchema);

