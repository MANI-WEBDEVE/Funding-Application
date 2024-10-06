import mongoose, { Schema, model, models, Model } from "mongoose";

interface PaymentUser {
  name: string;
  to_username: string;
  order_id: string;
  message: string;
  amount: number;
  timeStamp: Date;
  done: boolean;
}

const PaymentUser = new Schema<PaymentUser>({
  name: {
    type: String,
    required: true,
  },
  to_username: {
    type: String,
    required: true,
  },
  order_id: {
    type: String,
    required: true,
  },
  message: {
    type:String
  },
  amount: {
    type: Number,
    required: true,
  },
  timeStamp: {
    type: Date,
    required: true,
  },
});

export default models.PaymentModel || model<PaymentUser>("Payment", PaymentUser) as Model<PaymentUser>;