import { generateKeywordsGroq } from "@/services/ai-keywords/keywords.service";
import { Groq } from "groq-sdk";
import { NextResponse } from "next/server";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export async function POST(req: Request) {
  try {
    const { imageUrl, type } = await req.json();

    const imageResp = await fetch(imageUrl).then((res) => res.arrayBuffer());
    const base64ImageData = Buffer.from(imageResp).toString("base64");

    const keywordsArray = await generateKeywordsGroq({
      groq,
      type,
      image: base64ImageData,
    });

    return NextResponse.json({ keywords: keywordsArray });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ keywords: "" }, { status: 500 });
  }
}
