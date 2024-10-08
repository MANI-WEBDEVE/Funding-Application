import dbConnect from "@/DB/connectdb";
import PaymentUser from "@/models/PaymentUser";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest, response: NextResponse) => {
  try {
    await dbConnect();
    const token = await request.json();
    
    const paymentUserCheck = await PaymentUser.findOne({
      order_id: token.token,
    });
    

    const updatedUserPay = await PaymentUser.findOneAndUpdate(
      { order_id: token.token },
      { done: true }
    );
    console.log(updatedUserPay)
    if (updatedUserPay) {
        return NextResponse.json({
            success: true,
            message: "Payment successful",
            user: updatedUserPay,
          });
    } else if (!updatedUserPay) {
        return NextResponse.json({
            success: false,
            message: "Payment failed",
        });
    }
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message });
  }
};
