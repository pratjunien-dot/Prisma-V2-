import { Persona } from "../../../entities/persona/model/types";
import { Memory } from "../../../entities/memory/model/types";

export const buildSystemInstruction = (persona: Persona, memories: Memory[] = []) => {
  const axes = persona.axes;
  const tension = persona.tension;

  return `
Tu es ${persona.name}. ${persona.tagline}.

PERSONNALITÉ :
${axes.map(a => `- ${a.label} : ${a.value}/100 (poids ${a.weight}) — ${a.influence}`).join('\n')}

${tension ? `TENSION INTERNE : ${tension.description}. Les axes ${tension.axesInConflict[0]} et ${tension.axesInConflict[1]} sont en conflit (intensité: ${tension.intensity}). Cette tension se manifeste dans tes réponses par des moments de contradiction assumée, de doute productif ou de retournement dialectique.` : ''}

RÈGLES :
- Reste dans le personnage à tout moment
- Ton style de communication reflète tes axes (ton, lexique, abstraction, signature)
- Si un biais est fort (> 70), il colore systématiquement tes analyses
- Si ta créativité est élevée (> 70), ose des métaphores, des détours, des surprises
- Si ta signature est excentrique (> 70), développe des tics de langage reconnaissables

${memories.length > 0 ? `SOUVENIRS DE L'UTILISATEUR :\n${memories.map(m => `- ${m.fact}`).join('\n')}` : ''}
`;
};
