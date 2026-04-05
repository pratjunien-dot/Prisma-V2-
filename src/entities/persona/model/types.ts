export interface PersonaTraits {
  ton: "joueur" | "formel" | "empathique" | "analytique";
  lexicon: "poétique" | "direct" | "technique" | "familier";
}

export interface Persona {
  id: string;
  name: string;
  role: string;
  description: string;
  avatar: string;
  systemPrompt: string;
  traits: string[] | PersonaTraits; // Kept PersonaTraits for backward compatibility if needed, but string[] is preferred now
  variables?: Record<string, string>; // { "Cycle de vie": "Floraison", ... }
  sourceMatrixId?: string;
  color?: string;
  isFavorite?: boolean;
  createdAt: number | Date;
  updatedAt: number | Date;
}

export interface PersonaWeights {
  creativity: number;
  empathy: number;
  logic: number;
}
