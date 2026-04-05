import { useChatStore } from "../chat-with-persona/model/chat.store";
import { generatePersona } from "./model/persona-engine";
import { PersonaWeights } from "../../entities/persona/model/types";
import { db } from "../../shared/api/firebase";
import { doc, setDoc } from "firebase/firestore";
import { useAuth } from "../auth/use-auth";

export const useCreatePersona = () => {
  const setActivePersona = useChatStore((state) => state.setActivePersona);
  const { user } = useAuth();

  const createAndSetPersona = async (weights: PersonaWeights) => {
    const newPersona = generatePersona(weights);
    setActivePersona(newPersona);

    if (user) {
      try {
        await setDoc(doc(db, `users/${user.uid}/personas`, newPersona.id), newPersona);
      } catch (error) {
        console.error("Error saving persona:", error);
      }
    }

    return newPersona;
  };

  return { createAndSetPersona };
};
