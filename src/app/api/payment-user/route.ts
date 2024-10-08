// Set your secret key. Remember to switch to your live secret key in production.
// See your keys here: https://dashboard.stripe.com/apikeys
import dbConnect from "@/DB/connectdb";
import { PaymentUserModel } from "@/models/PaymentUser";
import User from "@/models/User";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

interface DataJason {
  email: string;
  amount: number;
  message: string;
}
const stripe = new Stripe(process.env.SECRET_STRIPE_KEY as string);
// const stripe = new Stripe(
//   "sk_test_51Q6XbNJ7MdATZ6wnnlid1Fx4MOoqrgJcJuyz2CUaxc37Q34sNwSeilKzbsKt60EqCmJDzGYcRfahNzvo8NnvC46B00C80mSzTc"
// );

export default async function POST( request:NextRequest) {
  try {
    // Ensure DB connection is established
    await dbConnect();
    const data:DataJason = await request.json()
    // Initialize Stripe with the secret key

    const currentUser = await User.findOne({
      email: data.email,
    })
    if (!currentUser) {
      throw new Error('User not found');
    }

    const customer = await stripe.customers.create({
      email: currentUser.email,
      name: currentUser.username,   
    });
    const checkOutSession = await stripe.checkout.sessions.create({
      payment_method_types:["card"],
      customer: customer.id,
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: "Donation",
            },
            unit_amount: data.amount * 100, // Amount in cents
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: "https://localhost:3000",
      cancel_url: "https://localhost:3000/cancel/cencel",
    });

    const payment = new PaymentUserModel({
      name: currentUser.username,
      to_username: data.email,
      message: data.message,
      amount: data.amount,
      payment_id: checkOutSession.id,
    });
    await payment.save();
    console.log({checkOutSession})
    return NextResponse.json({ url: checkOutSession.url, payment: checkOutSession});
  } catch (error) {
    console.error('Error initiating payment:', error);
    throw new Error('Payment initiation failed');
  }
}
