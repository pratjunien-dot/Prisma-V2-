import { useEffect } from "react";
import { motion } from "motion/react";
import { Check, Loader2, RefreshCw, Users } from "lucide-react";
import { Glass } from "../../../shared/ui/atoms/Glass";
import { useChatPipelineStore } from "../model/chat-pipeline.store";
import { geminiAdapter } from "../api/GeminiAdapter";

export const PersonaGenerator = () => {
  const { status, context, setProposedPersonas, startChat } = useChatPipelineStore();

  useEffect(() => {
    if (status === "GENERATING_PERSONAS") {
      const generate = async () => {
        try {
          const personas = await geminiAdapter.generatePersonas(
            context.intention,
            context.selectedLabels,
            context.selectedMatrixId || "simple"
          );
          setProposedPersonas(personas);
        } catch (error) {
          console.error("Failed to generate personas:", error);
        }
      };
      generate();
    }
  }, [status, context.intention, context.selectedLabels, context.selectedMatrixId, setProposedPersonas]);

  const handleRegenerate = async () => {
    try {
      const personas = await geminiAdapter.generatePersonas(
        context.intention,
        context.selectedLabels,
        context.selectedMatrixId || "simple"
      );
      setProposedPersonas(personas);
    } catch (error) {
      console.error("Failed to regenerate personas:", error);
    }
  };

  if (status === "GENERATING_PERSONAS") {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-6">
        <Loader2 className="w-12 h-12 text-accent animate-spin" />
        <h2 className="text-xl font-black text-white uppercase tracking-widest">
          Incarnation des Personas...
        </h2>
        <p className="text-white/40 text-sm">Application de la matrice aux modèles de personnalité</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8 py-8">
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-black text-white uppercase tracking-tighter">
          Tes 3 <span className="text-accent">Personas</span>
        </h2>
        <p className="text-white/40 text-sm">
          Sélectionne le mode de collaboration pour commencer.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {context.proposedPersonas.map((persona, idx) => (
          <motion.div
            key={persona.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="flex flex-col h-full"
          >
            <Glass 
              level={2} 
              className="p-6 h-full flex flex-col hover:border-accent/50 transition-colors group"
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-2xl shrink-0">
                  {persona.avatar}
                </div>
                <div>
                  <h3 className="text-lg font-black text-white leading-tight">{persona.name}</h3>
                </div>
              </div>
              
              <p className="text-white/70 text-sm mb-6 italic">
                "{persona.description}"
              </p>

              {persona.variables && Object.keys(persona.variables).length > 0 && (
                <div className="space-y-2 mt-auto">
                  {Object.entries(persona.variables).map(([key, value]) => (
                    <div key={key} className="flex flex-col text-xs">
                      <span className="text-white/40 font-bold uppercase tracking-wider">{key}</span>
                      <span className="text-accent">{value}</span>
                    </div>
                  ))}
                </div>
              )}

              <button 
                onClick={() => startChat("SINGLE", [persona])}
                className="mt-8 w-full py-3 rounded-xl bg-white/5 text-white font-bold uppercase tracking-widest text-xs hover:bg-accent hover:text-black transition-colors flex items-center justify-center gap-2"
              >
                <Check size={16} />
                Solo
              </button>
            </Glass>
          </motion.div>
        ))}
      </div>

      <div className="flex flex-wrap justify-center gap-4 mt-8">
        <button 
          onClick={() => startChat("DUO", [context.proposedPersonas[0], context.proposedPersonas[1]])}
          className="flex items-center gap-2 px-6 py-3 rounded-full bg-white/5 hover:bg-white/10 text-white transition-colors text-sm font-medium"
        >
          <Users size={16} />
          Mode Duo (70/30)
        </button>
        <button 
          onClick={() => startChat("TRIO", context.proposedPersonas)}
          className="flex items-center gap-2 px-6 py-3 rounded-full bg-white/5 hover:bg-white/10 text-white transition-colors text-sm font-medium"
        >
          <Users size={16} />
          Mode Trio (30/50/20)
        </button>
        <button 
          onClick={() => startChat("DEBATE", [context.proposedPersonas[0], context.proposedPersonas[2]])}
          className="flex items-center gap-2 px-6 py-3 rounded-full bg-accent/10 hover:bg-accent/20 text-accent transition-colors text-sm font-bold"
        >
          <Users size={16} />
          Arène de Débat
        </button>
      </div>

      <div className="flex justify-center mt-4">
        <button 
          onClick={handleRegenerate}
          className="flex items-center gap-2 px-4 py-2 rounded-full text-white/40 hover:text-white transition-colors text-xs font-medium"
        >
          <RefreshCw size={14} />
          Régénérer les personas
        </button>
      </div>
    </div>
  );
};
