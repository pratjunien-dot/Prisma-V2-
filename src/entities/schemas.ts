import { z } from "zod";

// ─── Axes ──────────────────────────────────────────
export const AxisLabelSchema = z.enum([
  "Ton", "Lexique", "Abstraction", "Biais", "Signature", "Créativité"
]);

export const AxisValueSchema = z.object({
  label: z.string(),
  value: z.number().min(0).max(100),
});

export const AdvancedAxisSchema = z.object({
  label: z.string(),
  value: z.number().min(0).max(100),
  weight: z.number().min(0).max(1),
  polarity: z.enum(["left", "right", "balanced"]),
  influence: z.string(),
});

// ─── Tension ───────────────────────────────────────
export const MatrixTensionSchema = z.object({
  description: z.string(),
  axesInConflict: z.array(z.string()).length(2),
  intensity: z.enum(["high", "medium", "low"]),
});

// ─── Matrix avancée (Phase 2) ──────────────────────
export const AdvancedMatrixSchema = z.object({
  id: z.string(),
  axes: z.array(AdvancedAxisSchema).min(6).max(8),
  weights: z.record(z.string(), z.number().min(0).max(1)),
  archetypes: z.array(z.string()),
  tension: MatrixTensionSchema.optional(),
});

export const AdvancedMatricesResponseSchema = z.array(AdvancedMatrixSchema).length(3);

// ─── Persona (Phase 3) ────────────────────────────
export const PersonaSchema = z.object({
  id: z.string(),
  name: z.string().min(2).max(20),
  tagline: z.string().min(10).max(120),
  axes: z.array(AdvancedAxisSchema).min(6).max(8),
  color: z.string(),
  tension: MatrixTensionSchema.optional(),
});

export const PersonasResponseSchema = z.array(PersonaSchema).length(3);

// ─── Messages ─────────────────────────────────────
export const ChatMessageSchema = z.object({
  id: z.string(),
  role: z.enum(["user", "model"]),
  content: z.string(),
  timestamp: z.number(),
});

// ─── Memory ───────────────────────────────────────
export const MemorySchema = z.object({
  id: z.string(),
  fact: z.string().max(500),
  category: z.string(),
  confidence: z.number().min(0).max(1),
  sourceChat: z.string(),
  extractedAt: z.number(),
});

// ─── Chat document ────────────────────────────────
export const ChatSchema = z.object({
  id: z.string(),
  title: z.string(),
  personaId: z.string(),
  personaSnapshot: PersonaSchema,
  matrixSnapshot: AdvancedMatrixSchema,
  userInput: z.string(),
  createdAt: z.number(),
  updatedAt: z.number(),
});

// ─── Inferred Types ───────────────────────────────
export type AxisValue = z.infer<typeof AxisValueSchema>;
export type AdvancedAxis = z.infer<typeof AdvancedAxisSchema>;
export type MatrixTension = z.infer<typeof MatrixTensionSchema>;
export type AdvancedMatrix = z.infer<typeof AdvancedMatrixSchema>;
export type Persona = z.infer<typeof PersonaSchema>;
export type ChatMessage = z.infer<typeof ChatMessageSchema>;
export type Memory = z.infer<typeof MemorySchema>;
export type Chat = z.infer<typeof ChatSchema>;
