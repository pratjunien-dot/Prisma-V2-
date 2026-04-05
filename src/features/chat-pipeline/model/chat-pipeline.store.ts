import { create } from "zustand";
import { Persona } from "../../../entities/persona/model/types";
import { ChatMessage } from "../../../entities/message/model/types";

export type MatrixMode = "SIMPLE" | "DETAILED";

export interface SimpleMatrix {
  id: string;
  name: string;
  description: string;
  mode: "SIMPLE";
}

export interface DetailedMatrix {
  id: string;
  name: string;
  mode: "DETAILED";
  labels: [string, string, string, string, string, string];
}

export type Matrix = SimpleMatrix | DetailedMatrix;

export type PipelineState = 
  | "IDLE" 
  | "SELECTING_MODE"
  | "GENERATING_MATRICES" 
  | "SELECTING_MATRIX" 
  | "GENERATING_PERSONAS" 
  | "SELECTING_PERSONA" 
  | "EDITING_PERSONA"
  | "CHATTING_SINGLE"
  | "CHATTING_DUO"
  | "CHATTING_TRIO"
  | "CHATTING_DEBATE";

export type CollaborationMode = "SINGLE" | "DUO" | "TRIO" | "DEBATE";

interface ChatPipelineStore {
  status: PipelineState;
  context: {
    intention: string;
    mode: MatrixMode | null;
    proposedMatrices: Matrix[];
    selectedMatrixId: string | null;
    selectedLabels: string[];
    proposedPersonas: Persona[];
    selectedPersonas: Persona[];
    collaborationMode: CollaborationMode | null;
    messages: ChatMessage[];
    finalPersona: Persona | null;
  };
  
  // Actions (Transitions)
  submitIntention: (text: string) => void;
  selectMode: (mode: MatrixMode) => void;
  setProposedMatrices: (matrices: Matrix[]) => void;
  selectMatrix: (matrixId: string, labels?: string[]) => void;
  setProposedPersonas: (personas: Persona[]) => void;
  editPersona: (persona: Persona) => void;
  confirmPersona: (persona: Persona) => void;
  backToSelection: () => void;
  startChat: (mode: CollaborationMode, personas: Persona[]) => void;
  addMessage: (message: ChatMessage) => void;
  reset: () => void;
}

const initialState = {
  status: "IDLE" as PipelineState,
  context: {
    intention: "",
    mode: null,
    proposedMatrices: [],
    selectedMatrixId: null,
    selectedLabels: [],
    proposedPersonas: [],
    selectedPersonas: [],
    collaborationMode: null,
    messages: [],
    finalPersona: null,
  },
};

export const useChatPipelineStore = create<ChatPipelineStore>((set) => ({
  ...initialState,

  submitIntention: (text) => set((state) => ({
    status: "SELECTING_MODE",
    context: { ...state.context, intention: text }
  })),

  selectMode: (mode) => set((state) => ({
    status: "GENERATING_MATRICES",
    context: { ...state.context, mode }
  })),

  setProposedMatrices: (matrices) => set((state) => {
    // If SIMPLE mode, we can skip SELECTING_MATRIX if we want, but let's keep it consistent
    // Actually, the spec says SIMPLE mode goes to GENERATING_PERSONAS directly if we want, 
    // but let's show the 3 simple styles in SELECTING_MATRIX first.
    return {
      status: "SELECTING_MATRIX",
      context: { ...state.context, proposedMatrices: matrices }
    };
  }),

  selectMatrix: (matrixId, labels = []) => set((state) => ({
    status: "GENERATING_PERSONAS",
    context: { ...state.context, selectedMatrixId: matrixId, selectedLabels: labels }
  })),

  setProposedPersonas: (personas) => set((state) => ({
    status: "SELECTING_PERSONA",
    context: { ...state.context, proposedPersonas: personas }
  })),

  editPersona: (persona) => set((state) => ({
    status: "EDITING_PERSONA",
    context: { ...state.context, finalPersona: persona }
  })),

  confirmPersona: (persona) => set((state) => ({
    status: "CHATTING_SINGLE",
    context: { ...state.context, selectedPersonas: [persona], finalPersona: persona }
  })),

  backToSelection: () => set(() => ({
    status: "SELECTING_PERSONA"
  })),

  startChat: (mode, personas) => set((state) => {
    let nextStatus: PipelineState = "CHATTING_SINGLE";
    if (mode === "DUO") nextStatus = "CHATTING_DUO";
    if (mode === "TRIO") nextStatus = "CHATTING_TRIO";
    if (mode === "DEBATE") nextStatus = "CHATTING_DEBATE";

    return {
      status: nextStatus,
      context: { ...state.context, collaborationMode: mode, selectedPersonas: personas }
    };
  }),

  addMessage: (message) => set((state) => ({
    context: { ...state.context, messages: [...state.context.messages, message] }
  })),

  reset: () => set(initialState),
}));
