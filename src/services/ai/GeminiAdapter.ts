import { GoogleGenAI } from "@google/genai";
import { z } from "zod";

const ai = new GoogleGenAI({ 
  apiKey: process.env.GEMINI_API_KEY || import.meta.env.VITE_GEMINI_API_KEY 
});

export class GeminiAdapter {
  static async generateStructuredResponse<T>(
    prompt: string,
    schema: z.ZodType<T>,
    systemInstruction?: string,
    model: string = "gemini-3-flash-preview"
  ): Promise<T> {
    const response = await ai.models.generateContent({
      model,
      contents: prompt,
      config: {
        systemInstruction,
        responseMimeType: "application/json",
      }
    });

    const text = response.text;
    if (!text) throw new Error("Empty response from Gemini");

    try {
      // Clean potential markdown code blocks
      const cleanText = text.replace(/```json\n?|\n?```/g, "").trim();
      const json = JSON.parse(cleanText);
      return schema.parse(json);
    } catch (error) {
      console.error("Failed to parse or validate Gemini response:", error);
      console.error("Raw response:", text);
      if (error instanceof z.ZodError) {
        console.error("Zod validation errors:", error.issues);
      }
      throw error;
    }
  }

  static async generateResponse(
    prompt: string, 
    systemInstruction?: string, 
    model: string = "gemini-3-flash-preview"
  ) {
    const response = await ai.models.generateContent({
      model,
      contents: prompt,
      config: {
        systemInstruction,
      }
    });
    return response.text;
  }

  static async streamResponse(
    prompt: string, 
    systemInstruction?: string, 
    model: string = "gemini-3-flash-preview"
  ) {
    return await ai.models.generateContentStream({
      model,
      contents: prompt,
      config: {
        systemInstruction,
      }
    });
  }
}
