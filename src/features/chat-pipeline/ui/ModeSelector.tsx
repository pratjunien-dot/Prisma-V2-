import { Zap, Microscope } from "lucide-react";
import { Glass } from "../../../shared/ui/atoms/Glass";
import { useChatPipelineStore } from "../model/chat-pipeline.store";
import { geminiAdapter } from "../api/GeminiAdapter";

export const ModeSelector = () => {
  const { context, selectMode, setProposedMatrices } = useChatPipelineStore();

  const handleModeSelect = async (mode: "SIMPLE" | "DETAILED") => {
    selectMode(mode);
    try {
      const matrices = await geminiAdapter.generateMatrices(context.intention, mode);
      setProposedMatrices(matrices);
    } catch (error) {
      console.error("Failed to generate matrices:", error);
      // Handle error state here if needed
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-12">
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-display font-light text-white tracking-tight">
          Comment explorer
        </h2>
        <p className="text-xl text-accent font-medium">
          « {context.intention} »
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-6 w-full max-w-2xl">
        <Glass 
          level={2} 
          className="flex-1 p-8 rounded-[32px] cursor-pointer group hover:border-accent/50 transition-all duration-500"
          onClick={() => handleModeSelect("SIMPLE")}
        >
          <div className="flex flex-col items-center text-center gap-4">
            <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-accent/10 transition-colors">
              <Zap size={32} className="text-white/70 group-hover:text-accent transition-colors" />
            </div>
            <h3 className="text-xl font-bold text-white">Simple</h3>
            <p className="text-sm text-white/50">
              3 styles globaux
            </p>
          </div>
        </Glass>

        <Glass 
          level={2} 
          className="flex-1 p-8 rounded-[32px] cursor-pointer group hover:border-accent/50 transition-all duration-500"
          onClick={() => handleModeSelect("DETAILED")}
        >
          <div className="flex flex-col items-center text-center gap-4">
            <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-accent/10 transition-colors">
              <Microscope size={32} className="text-white/70 group-hover:text-accent transition-colors" />
            </div>
            <h3 className="text-xl font-bold text-white">Détaillé</h3>
            <p className="text-sm text-white/50">
              Choisis 6 axes de paramétrage
            </p>
          </div>
        </Glass>
      </div>
    </div>
  );
};
