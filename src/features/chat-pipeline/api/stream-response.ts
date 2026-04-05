import { GeminiAdapter } from "../../../shared/api/gemini/GeminiAdapter";
import { Persona } from "../../../entities/persona/model/types";
import { Memory } from "../../../entities/memory/model/types";
import { buildSystemInstruction } from "../model/prompt-builder";

export const streamPersonaResponse = async (
  prompt: string,
  persona: Persona,
  memories: Memory[] = []
) => {
  const systemInstruction = buildSystemInstruction(persona, memories);
  
  // Heuristic for model selection
  const isComplex = prompt.length > 200 || prompt.includes("pourquoi") || prompt.includes("comment");
  const model = isComplex ? "gemini-3.1-pro-preview" : "gemini-3.1-flash-preview";

  return await GeminiAdapter.streamResponse(prompt, systemInstruction, model);
};
