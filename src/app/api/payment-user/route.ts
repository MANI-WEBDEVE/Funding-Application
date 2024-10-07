// Set your secret key. Remember to switch to your live secret key in production.
// See your keys here: https://dashboard.stripe.com/apikeys
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(
  "sk_test_51Q6XbNJ7MdATZ6wnnlid1Fx4MOoqrgJcJuyz2CUaxc37Q34sNwSeilKzbsKt60EqCmJDzGYcRfahNzvo8NnvC46B00C80mSzTc"
);

const paymentMthod = async () => {
  const paymentIntent = await stripe.paymentIntents.create({
    amount: 1099,
    currency: "usd",
    automatic_payment_methods: {
      enabled: true,
    },
  });
};

export default function GET (request:NextRequest, response:NextResponse) {
    const intent = paymentMthod();
    return response.json({client_secret: })
}