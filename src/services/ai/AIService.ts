import { GeminiAdapter } from "./GeminiAdapter";
import { Persona } from "./PersonaEngine";

export interface ChatMessage {
  id: string;
  role: "user" | "model";
  content: string;
  timestamp: number;
}

export class AIService {
  static async sendMessage(
    message: string,
    persona: Persona,
    history: ChatMessage[] = []
  ): Promise<string> {
    const systemInstruction = `
      Tu es ${persona.name}.
      Ta tagline : ${persona.tagline}.
      Tes traits psychométriques : ${JSON.stringify(persona.axes)}.
      
      Réponds à l'utilisateur en incarnant parfaitement cette personnalité.
      Sois cohérent avec tes axes (Ton, Lexique, Abstraction, etc.).
    `;

    const contents = history.map(m => ({
      role: m.role,
      parts: [{ text: m.content }]
    }));

    contents.push({
      role: "user",
      parts: [{ text: message }]
    });

    const response = await GeminiAdapter.generateResponse(
      message, // This is just the last message, but GeminiAdapter uses generateContent which can take history if adapted
      systemInstruction
    );

    return response || "Je n'ai pas pu générer de réponse.";
  }

  static async streamMessage(
    message: string,
    persona: Persona
  ) {
    const systemInstruction = `
      Tu es ${persona.name}.
      Ta tagline : ${persona.tagline}.
      Tes traits psychométriques : ${JSON.stringify(persona.axes)}.
      
      Réponds à l'utilisateur en incarnant parfaitement cette personnalité.
    `;

    return await GeminiAdapter.streamResponse(message, systemInstruction);
  }
}
