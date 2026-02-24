import { Client } from "@gradio/client";

export async function POST(req: Request) {
  const { message } = await req.json();

  const client = await Client.connect("khemn/poetic-assistant-space");

  const result = await client.predict("/generate_poem", {
    message: message,
  });

  return Response.json({
    reply: result.data,
  });
}
