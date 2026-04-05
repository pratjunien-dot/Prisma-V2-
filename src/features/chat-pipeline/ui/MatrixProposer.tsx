import { motion } from "motion/react";
import { Brain, Check, Loader2, RefreshCw } from "lucide-react";
import { Glass } from "../../../shared/ui/atoms/Glass";
import { useChatPipelineStore, DetailedMatrix, SimpleMatrix } from "../model/chat-pipeline.store";
import { geminiAdapter } from "../api/GeminiAdapter";

export const MatrixProposer = () => {
  const { status, context, selectMatrix, setProposedMatrices } = useChatPipelineStore();

  const handleRegenerate = async () => {
    if (!context.mode) return;
    try {
      const matrices = await geminiAdapter.generateMatrices(context.intention, context.mode);
      setProposedMatrices(matrices);
    } catch (error) {
      console.error("Failed to regenerate matrices:", error);
    }
  };

  if (status === "GENERATING_MATRICES") {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-6">
        <Loader2 className="w-12 h-12 text-accent animate-spin" />
        <h2 className="text-xl font-black text-white uppercase tracking-widest">
          Génération des {context.mode === "DETAILED" ? "Grilles" : "Styles"}...
        </h2>
        <p className="text-white/40 text-sm">Analyse de l'intention et extraction des axes</p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto space-y-8 py-8">
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-black text-white uppercase tracking-tighter">
          {context.mode === "DETAILED" ? "Choisis tes 6 axes de paramétrage" : "Choisis un style global"}
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {context.proposedMatrices.map((matrix, idx) => (
          <motion.div
            key={matrix.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
          >
            <Glass 
              level={2} 
              className="p-6 h-full flex flex-col hover:border-accent/50 transition-colors cursor-pointer group"
              onClick={() => {
                if (matrix.mode === "DETAILED") {
                  selectMatrix(matrix.id, (matrix as DetailedMatrix).labels);
                } else {
                  selectMatrix(matrix.id, []);
                }
              }}
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center group-hover:bg-accent/10 transition-colors">
                  <Brain className="text-white/40 group-hover:text-accent transition-colors" />
                </div>
                <h3 className="text-lg font-black text-white uppercase">{matrix.name}</h3>
              </div>

              <div className="space-y-4 flex-1">
                {matrix.mode === "DETAILED" ? (
                  <ul className="space-y-2">
                    {(matrix as DetailedMatrix).labels.map((label, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-white/70">
                        <span className="w-1.5 h-1.5 rounded-full bg-accent/50" />
                        {label}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-white/70">
                    {(matrix as SimpleMatrix).description}
                  </p>
                )}
              </div>

              <button className="mt-8 w-full py-3 rounded-xl bg-white/5 text-white font-bold uppercase tracking-widest text-xs group-hover:bg-accent group-hover:text-black transition-colors flex items-center justify-center gap-2">
                <Check size={16} />
                Valider
              </button>
            </Glass>
          </motion.div>
        ))}
      </div>

      <div className="flex justify-center mt-8">
        <button 
          onClick={handleRegenerate}
          className="flex items-center gap-2 px-6 py-3 rounded-full bg-white/5 hover:bg-white/10 text-white/70 hover:text-white transition-colors text-sm font-medium"
        >
          <RefreshCw size={16} />
          Régénérer 3 {context.mode === "DETAILED" ? "grilles" : "styles"}
        </button>
      </div>
    </div>
  );
};
