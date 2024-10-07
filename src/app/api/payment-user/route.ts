// Set your secret key. Remember to switch to your live secret key in production.
// See your keys here: https://dashboard.stripe.com/apikeys
import dbConnect from "@/DB/connectdb";
import { PaymentUserModel } from "@/models/PaymentUser";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(
  "sk_test_51Q6XbNJ7MdATZ6wnnlid1Fx4MOoqrgJcJuyz2CUaxc37Q34sNwSeilKzbsKt60EqCmJDzGYcRfahNzvo8NnvC46B00C80mSzTc"
);

export default async function POST(
 {amount ,paymentform
}: any) {
  try {
    // Ensure DB connection is established
    await dbConnect();

    // Initialize Stripe with the secret key
    const stripe = new Stripe(process.env.SECRET_STRIPE_KEY as string);

    // Validate the amount
    const parsedAmount = Number.parseInt(amount);
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
}
