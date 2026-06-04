import { GoogleGenAI, GenerateContentResponse } from "@google/genai";

const apiKey = process.env.GEMINI_API_KEY;

export const getGeminiModel = (modelName: string = "gemini-3-flash-preview") => {
  if (!apiKey) {
    throw new Error("GEMINI_API_KEY is not defined");
  }
  const ai = new GoogleGenAI({ apiKey });
  return ai;
};

export interface ChatMessage {
  role: "user" | "model";
  text: string;
}

export const startChat = (systemInstruction: string, modelName: string = "gemini-3-flash-preview") => {
  const ai = getGeminiModel(modelName);
  return ai.chats.create({
    model: modelName,
    config: {
      systemInstruction,
    },
  });
};
