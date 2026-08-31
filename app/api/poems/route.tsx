import { NextResponse } from "next/server";
import { Client } from "@gradio/client";

const poemBackendUrl = process.env.POEM_BACKEND_URL;

export async function POST(request: Request) {
  try {
    const { message } = await request.json();

    if (!message?.trim()) {
      return NextResponse.json(
        { error: "Message is required" },
        { status: 400 },
      );
    }

    if (poemBackendUrl) {
      const backendResponse = await fetch(poemBackendUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message }),
      });

      const backendData = await backendResponse.json();

      if (!backendResponse.ok) {
        return NextResponse.json(
          { error: backendData?.error || "Failed to generate poem" },
          { status: backendResponse.status },
        );
      }

      return NextResponse.json({ reply: backendData.reply });
    }

    const client = await Client.connect("khemn/poetic-assistant-space");

    const result = await client.predict<string[]>("/generate_poem", {
      message,
    });

    const poem = Array.isArray(result.data) ? result.data[0] : undefined;

    if (typeof poem !== "string" || poem.trim() === "") {
      return NextResponse.json(
        { error: "Poem generation returned an invalid response" },
        { status: 500 },
      );
    }

    return NextResponse.json({
      reply: poem,
    });
  } catch (error) {
    console.error("Poem generation error:", error);

    return NextResponse.json(
      { error: "Failed to generate poem" },
      { status: 500 },
    );
  }
}
