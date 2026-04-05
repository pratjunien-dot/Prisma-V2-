import { useState } from "react";
import { motion } from "motion/react";
import { Brain, Sparkles, ArrowRight } from "lucide-react";
import { Glass } from "../../../shared/ui/atoms/Glass";
import { useChatPipelineStore } from "../model/chat-pipeline.store";

export const InputPhase = () => {
  const [intention, setIntention] = useState("");
  const { submitIntention } = useChatPipelineStore();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!intention.trim()) return;
    submitIntention(intention);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] max-w-2xl mx-auto space-y-8">
      <div className="text-center space-y-4">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
          className="w-20 h-20 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-6"
        >
          <Brain className="text-accent w-10 h-10" />
        </motion.div>
        <h1 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tighter">
          Initialisation <span className="text-accent">S1</span>
        </h1>
        <p className="text-white/40 text-sm font-medium">
          Décrivez l'entité que vous souhaitez créer ou le problème que vous souhaitez résoudre.
        </p>
      </div>

      <Glass level={2} className="w-full p-2 rounded-[32px] border-white/10">
        <form onSubmit={handleSubmit} className="relative flex items-center">
          <div className="absolute left-6 text-white/40">
            <Sparkles size={20} />
          </div>
          <input
            type="text"
            value={intention}
            onChange={(e) => setIntention(e.target.value)}
            placeholder="Ex: Je veux un expert en physique quantique cynique..."
            className="w-full bg-transparent border-none text-white placeholder:text-white/20 px-14 py-6 focus:outline-none focus:ring-0 text-lg"
            autoFocus
          />
          <button
            type="submit"
            disabled={!intention.trim()}
            className="absolute right-2 p-4 bg-accent text-black rounded-full hover:scale-105 active:scale-95 transition-all disabled:opacity-50 disabled:hover:scale-100"
          >
            <ArrowRight size={20} />
          </button>
        </form>
      </Glass>
    </div>
  );
};
