import { z } from "zod";
import { GeminiAdapter } from "./GeminiAdapter";

// ─── Schemas ───────────────────────────────────────
export const AdvancedAxisSchema = z.object({
  label: z.string(),
  value: z.number().min(0).max(100),
  weight: z.number().min(0).max(1),
  polarity: z.enum(["left", "right", "balanced"]),
  influence: z.string(),
});

export const MatrixTensionSchema = z.object({
  description: z.string(),
  axesInConflict: z.array(z.string()).length(2),
  intensity: z.enum(["high", "medium", "low"]),
});

export const AdvancedMatrixSchema = z.object({
  id: z.string(),
  axes: z.array(AdvancedAxisSchema).min(6).max(8),
  weights: z.record(z.string(), z.number().min(0).max(1)),
  archetypes: z.array(z.string()),
  tension: MatrixTensionSchema.optional(),
});

export const PersonaSchema = z.object({
  id: z.string(),
  name: z.string().min(2).max(20),
  tagline: z.string().min(10).max(120),
  axes: z.array(AdvancedAxisSchema).min(6).max(8),
  color: z.string(),
  tension: MatrixTensionSchema.optional(),
});

export type AdvancedMatrix = z.infer<typeof AdvancedMatrixSchema>;
export type Persona = z.infer<typeof PersonaSchema>;

// ─── Engine ────────────────────────────────────────
export class PersonaEngine {
  static async generateMatrices(userInput: string): Promise<AdvancedMatrix[]> {
    const prompt = `
      Analyse la question utilisateur : "${userInput}".
      Génère exactement 3 matrices de personnalité très contrastées.
      Pour chaque matrice, retourne un objet JSON avec id, axes, weights, archetypes, et tension.
      Retourne UNIQUEMENT un tableau JSON de 3 objets.
    `;

    return await GeminiAdapter.generateStructuredResponse(
      prompt,
      z.array(AdvancedMatrixSchema).length(3),
      "Tu es un architecte de personnalités IA expert en psychométrie."
    );
  }

  static async generatePersonas(userInput: string, matrix: AdvancedMatrix): Promise<Persona[]> {
    const prompt = `
      Basé sur l'input utilisateur : "${userInput}"
      Et la matrice psychométrique choisie : ${JSON.stringify(matrix)}
      
      Génère 3 Personas IA distincts qui incarnent cette matrice.
      Chaque persona doit avoir :
      - id: string (6 chars)
      - name: string (2-20 chars)
      - tagline: string (10-120 chars)
      - axes: tableau d'objets (6-8 axes). Chaque objet DOIT avoir :
          - label: string
          - value: number (0-100)
          - weight: number (0-1)
          - polarity: "left" | "right" | "balanced"
          - influence: string
      - color: string (format hsl)
      - tension: MatrixTension (optionnel)

      Retourne UNIQUEMENT un tableau JSON de 3 objets.
    `;

    return await GeminiAdapter.generateStructuredResponse(
      prompt,
      z.array(PersonaSchema).length(3),
      "Tu es un sculpteur d'âmes numériques expert en psychométrie."
    );
  }
}
