import { z } from "zod";

export interface AdvancedAxis {
  label: string;
  value: number;
  weight: number;
  polarity: "left" | "right" | "balanced";
  influence: string;
}

export interface MatrixTension {
  description: string;
  axesInConflict: string[];
  intensity: "high" | "medium" | "low";
}

export interface AdvancedMatrix {
  id: string;
  axes: AdvancedAxis[];
  weights: Record<string, number>;
  archetypes: string[];
  tension?: MatrixTension;
}

export const AdvancedMatricesResponseSchema = z.array(
  z.object({
    id: z.string(),
    axes: z.array(
      z.object({
        label: z.string(),
        value: z.number().int(),
        weight: z.number(),
        polarity: z.enum(["left", "right", "balanced"]),
        influence: z.string(),
      })
    ),
    weights: z.record(z.string(), z.number()),
    archetypes: z.array(z.string()),
    tension: z.object({
      description: z.string(),
      axesInConflict: z.array(z.string()),
      intensity: z.enum(["high", "medium", "low"]),
    }).optional(),
  })
);
