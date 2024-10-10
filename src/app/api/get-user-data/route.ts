import dbConnect from "@/DB/connectdb";
import User from "@/models/User";
import { NextRequest, NextResponse } from "next/server";


export const POST = async (request: NextRequest, response: NextResponse) => {
    await dbConnect();
    try {
        const data = await request.json()
        const findUser = await User.findOne({ email: data.email, username:data.username });
        console.log(findUser)
        return NextResponse.json(findUser)
    } catch (error) {
     
    }
 };
 