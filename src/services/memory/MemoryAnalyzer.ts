import { GeminiAdapter } from "../ai/GeminiAdapter";
import { z } from "zod";

const MemorySchema = z.object({
  fact: z.string(),
  category: z.enum(["personnel", "préférence", "connaissance", "relation"]),
  confidence: z.number(),
});

export class MemoryAnalyzer {
  static async extractMemories(messages: { role: string, content: string }[]) {
    const prompt = `
      Analyse la conversation suivante :
      ${JSON.stringify(messages)}
      
      Extrais les faits importants sur l'utilisateur (préférences, nom, goûts, etc.).
      Retourne UNIQUEMENT un tableau JSON d'objets avec fact, category, et confidence.
    `;

    try {
      return await GeminiAdapter.generateStructuredResponse(
        prompt,
        z.array(MemorySchema),
        "Tu es un analyste de mémoire à long terme."
      );
    } catch (error) {
      console.error("Failed to extract memories:", error);
      return [];
    }
  }
}
