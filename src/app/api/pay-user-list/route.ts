import dbConnect from "@/DB/connectdb";
import PaymentUser from "@/models/PaymentUser";
import { NextRequest, NextResponse } from "next/server";

interface DataUser {
  username: string;
}

export const POST = async (request: NextRequest) => {
  await dbConnect();
  try {
    const data: DataUser = await request.json();
    console.log(data.username);
    const userList = await PaymentUser.find({ name: data.username, done: true })
      .sort({ amount: -1 })
      .lean();

    if (userList) {
      return NextResponse.json({ success: true, data: userList });
    } else {
      return NextResponse.json({ success: false, message: "users not found" });
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json({ success: false, message: error });
  }
};
