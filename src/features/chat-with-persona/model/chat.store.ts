import { create } from "zustand";
import { ChatMessage } from "../../../entities/message/model/types";
import { Persona } from "../../../entities/persona/model/types";

type ChatState = {
  activePersona: Persona | null;
  setActivePersona: (persona: Persona | null) => void;
  messages: ChatMessage[];
  setMessages: (messages: ChatMessage[]) => void;
};

export const useChatStore = create<ChatState>((set) => ({
  activePersona: null,
  setActivePersona: (persona) => set({ activePersona: persona }),
  messages: [],
  setMessages: (messages) => set({ messages }),
}));
