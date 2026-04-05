import { PersonaWeights, Persona } from "../../../entities/persona/model/types";

export const generatePersona = (weights: PersonaWeights): Persona => {
  return {
    id: `persona-${Date.now()}`,
    name: `Prisma-${Math.floor(Math.random() * 1000)}`,
    role: "Entité Générée",
    description: "Une entité générée dynamiquement basée sur vos choix psychométriques.",
    avatar: `https://picsum.photos/seed/${Date.now()}/200/200`,
    systemPrompt: "Tu es une entité générée...",
    traits: {
      ton: weights.creativity > 70 ? "joueur" : "formel",
      lexicon: weights.empathy > 50 ? "poétique" : "direct",
    },
    createdAt: new Date(),
    updatedAt: new Date()
  };
};
