import dbConnect from "@/DB/connectdb";
import User from "@/models/User";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest, response: NextResponse) => {
  await dbConnect();
  try {
    const dataUser = await request.json();
    const { name, email, publicPicture, coverPicture, stripeId } = dataUser
    if (!name || !email || !publicPicture || !coverPicture || !stripeId) {
      return NextResponse.json({
        message: "Missing required fields and all filed must be required",
        title:"Error Missing Filed",
        status: 400,
      })
    }
    const findUser = await User.findOne({
      username: dataUser.oldUserName,
      email: dataUser.email,
    });
    const checkAlreadyUserExist = await User.find({
      username: dataUser.newUsername,
    });
    if (!checkAlreadyUserExist) {
      return NextResponse.json({
        success: false,
        message: "User already exist",
      });
    }
    if (findUser) {
      const updateUser = await User.updateOne(
        { username: dataUser.oldUserName, email: dataUser.email },
        {
          username: dataUser.newUsername,
          name: dataUser.name,
          publicPicture: dataUser.publicPicture,
          coverPicture: dataUser.coverPicture,
          stripeId: dataUser.stripeId,
          stripeSecret: dataUser.stripeSecret,
        }
      );
      return NextResponse.json({
        success: true,
        data: updateUser,
        message: "User updated successfully",
        title: "Success",
      });
    }
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: "Something went wrong",
    });
  }
};

