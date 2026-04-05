import { z } from "zod";
import { AdvancedAxis, MatrixTension } from "../../matrix/model/types";

export interface PersonaTraits {
  ton: "joueur" | "formel" | "empathique" | "analytique";
  lexicon: "poétique" | "direct" | "technique" | "familier";
}

export interface Persona {
  id: string;
  name: string;
  role: string;
  tagline?: string;
  description: string;
  avatar: string;
  systemPrompt: string;
  traits: string[] | PersonaTraits;
  axes?: AdvancedAxis[];
  tension?: MatrixTension;
  variables?: Record<string, string>;
  sourceMatrixId?: string;
  color?: string;
  isFavorite?: boolean;
  createdAt: string | number | Date;
  updatedAt: string | number | Date;
}

export interface PersonaWeights {
  creativity: number;
  empathy: number;
  logic: number;
}

export const PersonasResponseSchema = z.array(
  z.object({
    id: z.string(),
    name: z.string(),
    role: z.string(),
    tagline: z.string().optional(),
    description: z.string(),
    avatar: z.string(),
    systemPrompt: z.string(),
    traits: z.array(z.string()),
    variables: z.record(z.string(), z.string()).optional(),
    color: z.string().optional(),
    createdAt: z.union([z.number(), z.string().datetime()]),
    updatedAt: z.union([z.number(), z.string().datetime()]),
    axes: z.array(
      z.object({
        label: z.string(),
        value: z.number(),
        weight: z.number(),
        polarity: z.enum(["left", "right", "balanced"]),
        influence: z.string(),
      })
    ).optional(),
    tension: z.object({
      description: z.string(),
      axesInConflict: z.array(z.string()),
      intensity: z.enum(["high", "medium", "low"]),
    }).optional(),
  })
);
