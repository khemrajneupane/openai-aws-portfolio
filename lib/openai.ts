import { OpenAI } from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function getChatResponse(prompt: string) {
  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo", // You can use any model like GPT-3 or GPT-4
    messages: [{ role: "user", content: prompt }],
    max_tokens: 50,
    temperature: 0.3,
  });

  return response.choices[0].message.content;
}
