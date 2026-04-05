import { GeminiAdapter } from "../../../shared/api/gemini/GeminiAdapter";
import { PersonasResponseSchema, Persona, AdvancedMatrix } from "../../../entities/schemas";

const PROMPT_TEMPLATE = (userInput: string, selectedMatrix: AdvancedMatrix) => `
Question utilisateur : "${userInput}"
Matrice sélectionnée : ${JSON.stringify(selectedMatrix)}

Génère exactement 3 personas basés sur cette matrice.

Pour chaque persona, retourne un objet JSON avec :
- "id" : identifiant unique (6 caractères)
- "name" : prénom ou pseudonyme (2-20 caractères, original et mémorable)
- "tagline" : phrase signature entre guillemets (10-120 caractères)
- "axes" : tableau d'objets (6-8 axes). Chaque objet DOIT avoir :
    - "label" : le nom de l'axe (ex: "Ton")
    - "value" : nombre entre 0 et 100 (variance de ±15 par rapport à la matrice)
    - "weight" : nombre entre 0 et 1 (hérité ou ajusté)
    - "polarity" : "left", "right" ou "balanced"
    - "influence" : description courte de l'impact sur le persona
- "color" : couleur HSL (format "hsl(H, S%, L%)" avec H entre 150-280, S entre 60-90, L entre 55-75)
- "tension" : héritée de la matrice (peut être reformulée pour ce persona)

CONTRAINTES :
- Les 3 personas doivent être distincts malgré la même matrice de base
- Chaque nom doit évoquer le caractère du persona
- Chaque tagline doit refléter la tension narrative si elle existe
- La variance sur les axes doit créer des personnalités nuancées, pas des clones

Retourne UNIQUEMENT un tableau JSON de 3 objets.
`;

export const generatePersonas = async (userInput: string, selectedMatrix: AdvancedMatrix): Promise<Persona[]> => {
  return await GeminiAdapter.generateStructuredResponse(
    PROMPT_TEMPLATE(userInput, selectedMatrix),
    PersonasResponseSchema,
    "Tu es un sculpteur de personnalités IA expert en psychologie et en design de personnages."
  );
};
