import { describe, it, expect } from "vitest";
import { generatePersona } from "./persona-engine";

describe("PersonaEngine", () => {
  it("génère un persona avec des traits basés sur les poids", () => {
    const weights = { creativity: 80, empathy: 30, logic: 50 };
    const persona = generatePersona(weights);
    expect(persona.traits.ton).toBe("joueur");
    expect(persona.traits.lexicon).toBe("direct");
  });
});
