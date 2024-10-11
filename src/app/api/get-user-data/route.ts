import dbConnect from "@/DB/connectdb";
import User from "@/models/User";
import { NextRequest, NextResponse } from "next/server";


export const POST = async (request: NextRequest, response: NextResponse) => {
    await dbConnect();
    try {
        const data = await request.json()
        // console.log(data, "mani")
        const findUser = await User.findOne({ username:data.username });
        // console.log(findUser, "publicMani")
        return NextResponse.json(findUser)
    } catch (error) {
     
    }
 };
 