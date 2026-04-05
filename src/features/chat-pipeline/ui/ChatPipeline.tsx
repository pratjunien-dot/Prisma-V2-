import { AnimatePresence, motion } from "motion/react";
import { useChatPipelineStore } from "../model/chat-pipeline.store";
import { InputPhase } from "./InputPhase";
import { ModeSelector } from "./ModeSelector";
import { MatrixProposer } from "./MatrixProposer";
import { PersonaGenerator } from "./PersonaGenerator";
import { PersonaEditor } from "./PersonaEditor";
import { ChatWindow } from "./ChatWindow";

export const ChatPipeline = () => {
  const { status } = useChatPipelineStore();

  const renderPhase = () => {
    switch (status) {
      case "IDLE":
        return <InputPhase key="input" />;
      case "SELECTING_MODE":
        return <ModeSelector key="mode" />;
      case "GENERATING_MATRICES":
      case "SELECTING_MATRIX":
        return <MatrixProposer key="matrices" />;
      case "GENERATING_PERSONAS":
      case "SELECTING_PERSONA":
        return <PersonaGenerator key="personas" />;
      case "CHATTING_SINGLE":
      case "CHATTING_DUO":
      case "CHATTING_TRIO":
      case "CHATTING_DEBATE":
        return <ChatWindow key="chat" />;
      default:
        return <InputPhase key="input" />;
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-8">
      <AnimatePresence mode="wait">
        <motion.div
          key={status}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
        >
          {renderPhase()}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
