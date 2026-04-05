export type PipelinePhase = "input" | "matrices" | "personas" | "chat";

export interface PersonaTraits {
  ton: "joueur" | "formel" | "empathique" | "analytique";
  lexicon: "poétique" | "direct" | "technique" | "familier";
}

export interface Persona {
  id: string;
  name: string;
  traits: PersonaTraits;
  color?: string;
  description?: string;
  avatar?: string;
}

export interface AdvancedMatrix {
  id: string;
  title: string;
  description: string;
  weights: {
    creativity: number;
    empathy: number;
    logic: number;
  };
  color: string;
}

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: number;
}

export interface Chat {
  id: string;
  personaId: string;
  messages: ChatMessage[];
  lastMessageAt: number;
}
