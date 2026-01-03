import { GoogleGenAI } from "@google/genai";
import { Groq } from "groq-sdk";

interface GroqGenerateKeywordParams {
  groq: Groq;
  type: string;
  image: string;
}

export async function generateKeywordsGroq({
  groq,
  type,
  image,
}: GroqGenerateKeywordParams) {
  const chatCompletion = await groq.chat.completions.create({
    messages: [
      {
        role: "user",
        content: [
          {
            type: "text",
            text: `Analyze this ${type} and return ONLY a list of exactly 10 keywords separated by commas.
Rules:
- Use single-word tags only (no phrases).
- Describe what you see: visual elements, humor, style, emotions, characters, or visible text.
- If a famous person appears (footballer, politician, singer, actor, or internet celebrity), include their exact name as one of the keywords.
- Do NOT add explanations, sentences, numbering, or extra text.
- Output must be a single comma-separated line.
`,
          },
          {
            type: "image_url",
            image_url: {
              url: `data:${type};base64,${image}`,
            },
          },
        ],
      },
    ],
    model: "meta-llama/llama-4-maverick-17b-128e-instruct",
    temperature: 0.8,
    max_completion_tokens: 1024,
    top_p: 1,
    stream: false,
    stop: null,
  });

  console.log(chatCompletion.choices[0].message.content);

  console.log(chatCompletion.choices[0].message.content);

  const textResponse = chatCompletion.choices[0].message.content;
  const keywordsArray = textResponse
    ?.split(",")
    .map((tag) => tag.trim())
    .filter((word: string) => word.length > 0);

  return keywordsArray;
}

interface GeminiGenerateKeywordParams {
  gemini: GoogleGenAI;
  type: string;
  image: string;
}

export async function generateKeywordsGemini({
  gemini,
  type,
  image,
}: GeminiGenerateKeywordParams) {
  const response = await gemini.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: [
      {
        inlineData: {
          mimeType: type === "video" ? "image/jpeg" : "image/webp", // Para videos enviamos un frame
          data: image,
        },
      },
      {
        text: `Analiza este ${type} y devuelve únicamente una lista de 10 palabras clave separadas por comas que describan lo que ves, el humor, personajes o texto si lo hay. No escribas frases, solo etiquetas.`,
      },
    ],
  });

  const textResponse = response.text;
  const keywordsArray = textResponse
    ?.split(",")
    .map((tag) => tag.trim())
    .filter((word: string) => word.length > 0);

  return keywordsArray;
}
