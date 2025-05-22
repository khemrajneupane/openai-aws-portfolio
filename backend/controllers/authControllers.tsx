import { NextRequest, NextResponse } from "next/server";
import { catchAsyncErrors } from "../middlewares/catchAsyncErrors";
import dbConnect from "../config/dbConnect";
import User from "../models/User";

// Register user  =>  /api/auth/register
export const registerUser = catchAsyncErrors(async (req: NextRequest) => {
  const body = await req.json();

  const { name, email, password, image } = body;

  const user = await User.create({
    name,
    email,
    password,
    image,
  });

  return NextResponse.json({
    success: true,
  });
});

// Get all users
export const getAllUsers = async () => {
  await dbConnect();
  const users = await User.find({});
  return NextResponse.json({ users });
};
