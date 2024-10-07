import Stripe from "stripe";
import { PaymentUserModel } from "@/models/PaymentUser";
import dbConnect from "@/DB/connectdb";
import User from "@/models/User";

export const initiate = async ({ amount, paymentform, name }: { amount: string, paymentform: any, name:any }) => {
    try {
      // Ensure DB connection is established
      await dbConnect();
  
      // Initialize Stripe with the secret key
      const stripe = new Stripe(process.env.SECRET_STRIPE_KEY as string);
  
      // Validate the amount
      const parsedAmount = Number.parseInt(amount)
      if (isNaN(parsedAmount) || parsedAmount <= 0) {
        throw new Error('Invalid amount specified');
      }
  
      // Prepare the payment intent options
      const options = {
        amount: parsedAmount * 100, // Convert to cents
        currency: 'usd',
        automatic_payment_methods: { enabled: true },
      };
  
      // Create the payment intent using Stripe
      const order = await stripe.paymentIntents.create(options);
  
      // Create the payment entry in your database
      const payment = new PaymentUserModel({
        name: paymentform.name,
        to_username: paymentform.to_username,
        order_id: order.id,
        message: paymentform.message,
        amount: parsedAmount,
        timeStamp: new Date(),
        done: false,
      });
  
      // Save the payment in your database
      await payment.save();
  
      // Return the client secret for the payment
      return { clientSecret: order.client_secret };
    } catch (error) {
      console.error('Error initiating payment:', error);
      throw new Error('Payment initiation failed');
    }
  };