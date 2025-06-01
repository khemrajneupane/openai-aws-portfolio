import { NextRequest, NextResponse } from "next/server";
import { createEdgeRouter } from "next-connect";
import { sendNodemailer } from "@/backend/controllers/nodemailerControllers";

// Correct type parameters
const router = createEdgeRouter<NextRequest, void>();

router.post(sendNodemailer);

export async function POST(request: NextRequest): Promise<NextResponse> {
  return router.run(request) as Promise<NextResponse>;
}
