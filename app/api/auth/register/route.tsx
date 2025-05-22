import dbConnect from "@/backend/config/dbConnect";
import { registerUser } from "@/backend/controllers/authControllers";
import { createEdgeRouter } from "next-connect";
import { NextRequest, NextResponse } from "next/server";

const router = createEdgeRouter<NextRequest, void>();
dbConnect();

router.post(registerUser); // register user route

export async function POST(request: NextRequest): Promise<NextResponse> {
  return router.run(request) as Promise<NextResponse>;
}
