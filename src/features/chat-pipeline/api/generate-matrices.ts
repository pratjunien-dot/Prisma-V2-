import { GeminiAdapter } from "../../../shared/api/gemini/GeminiAdapter";
import { AdvancedMatricesResponseSchema, AdvancedMatrix } from "../../../entities/schemas";

const PROMPT_TEMPLATE = (userInput: string) => `
Analyse la question utilisateur : "${userInput}".

Génère exactement 3 matrices de personnalité très contrastées.

Pour chaque matrice, retourne un objet JSON avec :
- "id" : identifiant unique (6 caractères alphanumériques)
- "axes" : tableau de 6 à 8 objets. Chaque objet DOIT avoir :
    - "label" : nom de l'axe (les 6 fixes : Ton, Lexique, Abstraction, Biais, Signature, Créativité + jusqu'à 2 axes contextuels bonus)
    - "value" : entier 0-100
    - "weight" : flottant 0-1
    - "polarity" : "left", "right" ou "balanced"
    - "influence" : courte description
- "weights" : objet clé-valeur résumant les poids par axe
- "archetypes" : tableau de 1-2 mots décrivant l'archétype (ex: ["Analytique", "Froid"])
- "tension" (optionnel) : objet avec :
  - "description" : phrase décrivant le conflit interne
  - "axesInConflict" : tableau de 2 noms d'axes en tension
  - "intensity" : "high", "medium", ou "low"

CONTRAINTES :
- Les 3 matrices doivent être radicalement différentes (distance euclidienne > 45 sur les 6 axes fixes)
- Chaque matrice représente un archétype distinct
- Les axes bonus doivent être pertinents pour le sujet "${userInput}"
- Au moins 1 matrice doit avoir une tension "high"

Retourne UNIQUEMENT un tableau JSON de 3 objets, sans texte autour.
`;

export const generateMatrices = async (userInput: string): Promise<AdvancedMatrix[]> => {
  return await GeminiAdapter.generateStructuredResponse(
    PROMPT_TEMPLATE(userInput),
    AdvancedMatricesResponseSchema,
    "Tu es un architecte de personnalités IA expert en psychométrie et en narration."
  );
};
