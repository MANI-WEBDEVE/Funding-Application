// Set your secret key. Remember to switch to your live secret key in production.
// See your keys here: https://dashboard.stripe.com/apikeys
import dbConnect from "@/DB/connectdb";
import PaymentUser from "@/models/PaymentUser";
import User from "@/models/User";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

interface DataJason {
  recipient_email: string;
  donor_email: string;
  donor_name: string;
  amount: number;
  message: string;
}
const stripe = new Stripe(process.env.SECRET_STRIPE_KEY as string);
// const stripe = new Stripe(
//   "sk_test_51Q6XbNJ7MdATZ6wnnlid1Fx4MOoqrgJcJuyz2CUaxc37Q34sNwSeilKzbsKt60EqCmJDzGYcRfahNzvo8NnvC46B00C80mSzTc"
// );
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const POST = async (request: NextRequest) => {
  try {
    // Ensure DB connection is established
    await dbConnect();
    const data: DataJason = await request.json();

    // Initialize Stripe with the secret key
    if (!data.recipient_email || !data.donor_email || !data.amount) {
      return NextResponse.json(
        { message: "Missing required fields." },
        { status: 400 }
      );
    }
    if (!emailRegex.test(data.donor_email) || !emailRegex.test(data.recipient_email)) {
      return NextResponse.json({ message: 'Invalid email format.' }, { status: 400 });
    }
    const currentUser = await User.findOne({
      email: data.recipient_email,
    });
    // Find the user by email in the database
    // const currentUser = await User.findOne({ email: data.recipient_email });
    if (currentUser) {
      const customer = await stripe.customers.create({
        email: data.donor_email,
        name: data.donor_name,
      });
     
      const checkOutSession = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
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
        success_url: `${process.env.NEXT_PUBLIC_URL}/success-payment/${customer.id}`,
        cancel_url: "http://localhost:3000",
        
     });
     console.log(checkOutSession.id)
  
      const payment = new PaymentUser({
        order_id: customer.id,
        name: currentUser.username,
        to_username: data.donor_name,
        to_user_email: data.donor_email,
        message: data.message,
        amount: data.amount,
        payment_id: checkOutSession.id,
      });
      await payment.save();
      return NextResponse.json({
        url: checkOutSession.url,
        payment: checkOutSession,
      });
    } else {
      console.log("usrer not found");
    }
  } catch (error: any) {
    console.error("Error initiating payment:", error);
    return NextResponse.json(
      {
        message: "Something went wrong. Please try again later.",
        error: error.message,
      },
      { status: 500 }
    );
  }
};
