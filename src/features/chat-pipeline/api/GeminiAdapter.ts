import { GoogleGenAI, Type } from "@google/genai";
import { Matrix } from "../model/chat-pipeline.store";
import { Persona } from "../../../entities/persona/model/types";

// Initialize Gemini API
// Note: In a real app, this key should be securely provided, not hardcoded.
// For AI Studio, it's injected via process.env.GEMINI_API_KEY
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export class GeminiAdapter {
  /**
   * Generates 3 matrices based on the user's intention and the selected mode.
   */
  async generateMatrices(intention: string, mode: "SIMPLE" | "DETAILED"): Promise<Matrix[]> {
    if (mode === "SIMPLE") {
      // For SIMPLE mode, we just return 3 global styles. We don't necessarily need Gemini for this,
      // but we can use it to generate contextually relevant styles based on the intention.
      const response = await ai.models.generateContent({
        model: "gemini-3.1-pro-preview",
        contents: `Generate 3 distinct, creative conversational styles (personas) to explore the topic: "${intention}".
        Return EXACTLY 3 items.`,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                id: { type: Type.STRING },
                name: { type: Type.STRING, description: "A creative name for the style (e.g., 'Botaniste Onirique')" },
                description: { type: Type.STRING, description: "A short description of how this style approaches the topic." },
                mode: { type: Type.STRING, description: "Must be exactly 'SIMPLE'" }
              },
              required: ["id", "name", "description", "mode"]
            }
          }
        }
      });

      try {
        const result = JSON.parse(response.text || "[]");
        return result.map((item: { id: string; name: string; description: string; mode: string }) => ({ ...item, mode: "SIMPLE" }));
      } catch (e) {
        console.error("Failed to parse Gemini response for SIMPLE matrices", e);
        throw new Error("Invalid response format from Gemini", { cause: e });
      }
    } else {
      // DETAILED mode: Generate 3 matrices, each with 6 unique labels
      const response = await ai.models.generateContent({
        model: "gemini-3.1-pro-preview",
        contents: `Generate 3 distinct analytical grids (matrices) to explore the topic: "${intention}".
        Each grid must contain EXACTLY 6 unique labels (dimensions of parameterization).
        The labels should be creative, varied, and relevant to the topic.
        Return EXACTLY 3 items.`,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                id: { type: Type.STRING },
                name: { type: Type.STRING, description: "A creative name for the grid (e.g., 'Grille Sensorielle')" },
                mode: { type: Type.STRING, description: "Must be exactly 'DETAILED'" },
                labels: {
                  type: Type.ARRAY,
                  items: { type: Type.STRING },
                  description: "Exactly 6 strings representing the dimensions of parameterization."
                }
              },
              required: ["id", "name", "mode", "labels"]
            }
          }
        }
      });

      try {
        const result = JSON.parse(response.text || "[]");
        // Ensure exactly 6 labels
        return result.map((item: { id: string; name: string; mode: string; labels: string[] }) => ({
          ...item,
          mode: "DETAILED",
          labels: item.labels.slice(0, 6)
        }));
      } catch (e) {
        console.error("Failed to parse Gemini response for DETAILED matrices", e);
        throw new Error("Invalid response format from Gemini", { cause: e });
      }
    }
  }

  /**
   * Generates 3 personas based on the intention and the selected labels.
   */
  async generatePersonas(intention: string, labels: string[], matrixId: string): Promise<Persona[]> {
    const response = await ai.models.generateContent({
      model: "gemini-3.1-pro-preview",
      contents: `Generate exactly 3 distinct personas to answer the user's intention: "${intention}".
      Each persona MUST embody DIFFERENT VALUES for the following 6 axes (labels):
      ${labels.join(", ")}
      
      Return a JSON array with exactly 3 objects. Each object must contain:
      - name: The persona's name and title (e.g., "Zara, l'éveilleuse de sèves").
      - avatar: A single emoji representing the persona.
      - description: 2-4 immersive, poetic sentences describing the persona.
      - variables: An object where keys are the 6 axes provided above, and values are the specific stance/value this persona takes for that axis.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              name: { type: Type.STRING },
              avatar: { type: Type.STRING, description: "A single emoji" },
              description: { type: Type.STRING },
              variables: {
                type: Type.OBJECT,
                description: "Key-value pairs mapping the provided labels to specific values for this persona."
              }
            },
            required: ["name", "avatar", "description", "variables"]
          }
        }
      }
    });

    try {
      const result = JSON.parse(response.text || "[]");
      return result.map((item: { name: string; avatar: string; description: string; variables: Record<string, string> }, index: number) => ({
        id: `p_${Date.now()}_${index}`,
        name: item.name,
        role: "Expert", // Default role
        avatar: item.avatar,
        description: item.description,
        systemPrompt: `Tu es ${item.name}. ${item.description} Incarne ces valeurs : ${JSON.stringify(item.variables)}`,
        traits: [], // We can leave this empty or map variables to traits if needed
        variables: item.variables,
        sourceMatrixId: matrixId,
        isFavorite: false,
        createdAt: Date.now(),
        updatedAt: Date.now()
      }));
    } catch (e) {
      console.error("Failed to parse Gemini response for personas", e);
      throw new Error("Invalid response format from Gemini", { cause: e });
    }
  }
}

export const geminiAdapter = new GeminiAdapter();
