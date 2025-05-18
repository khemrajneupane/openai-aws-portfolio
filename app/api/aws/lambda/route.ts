import { NextResponse } from "next/server";
import { LambdaClient, InvokeCommand } from "@aws-sdk/client-lambda";

const lambdaClient = new LambdaClient({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

export async function GET() {
  try {
    // For demo purposes, we'll invoke a simple Lambda function
    // In a real scenario, you'd have this Lambda deployed in your AWS account
    const command = new InvokeCommand({
      FunctionName: "portfolio-demo-lambda",
      Payload: JSON.stringify({ action: "demo" }),
    });

    const response = await lambdaClient.send(command);
    const result = response.Payload
      ? Buffer.from(response.Payload).toString()
      : "No response payload";

    return NextResponse.json({
      service: "AWS Lambda",
      description: "Serverless function executed successfully",
      result: JSON.parse(result),
      freeTierInfo: "AWS Free Tier includes 1M free requests per month",
    });
  } catch (error) {
    console.error("Lambda error:", error);
    return NextResponse.json(
      {
        service: "AWS Lambda",
        error: "Error invoking Lambda function",
        demoNote: "In a real implementation, this would connect to your Lambda",
        freeTierInfo: "AWS Free Tier includes 1M free requests per month",
      },
      { status: 500 }
    );
  }
}
