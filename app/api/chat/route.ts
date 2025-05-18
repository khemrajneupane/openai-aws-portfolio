import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: Request) {
  try {
    const { messages } = await request.json();

    // Validate input
    if (!Array.isArray(messages)) {
      return NextResponse.json(
        { error: "Messages must be an array" },
        { status: 400 }
      );
    }

    // For AWS Free Tier considerations, limit conversation history
    const recentMessages = messages.slice(-6); // Keep last 3 exchanges

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content:
            "You are an AWS cloud expert assistant. Provide concise, accurate answers about AWS services like Lambda, Fargate, EC2, SQS, Redis, Terraform, and CDK. Keep responses brief and focused on AWS best practices.",
        },
        ...recentMessages.map((msg) => ({
          role: msg.role,
          content: msg.content,
        })),
      ],
      temperature: 0.3,
      max_tokens: 50, // Limit to stay within free tier
    });

    const message =
      response.choices[0]?.message?.content ||
      "I don't have a response for that.";

    return NextResponse.json({ message });
  } catch (error) {
    console.error("OpenAI API error:", error);
    return NextResponse.json(
      { error: "Error processing your request" },
      { status: 500 }
    );
  }
}
