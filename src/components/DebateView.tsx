import { useState } from "react";
import { Glass } from "../ui/Glass";
import { Brain, Play, Pause, RotateCcw } from "lucide-react";

export const DebateView = () => {
  const [isDebating, setIsDebating] = useState(false);
  const [messages] = useState<{ role: string, content: string, name: string }[]>([]);

  const startDebate = () => {
    setIsDebating(true);
    // Logic to start the debate loop
  };

  return (
    <div className="max-w-6xl mx-auto p-6 h-[calc(100vh-12rem)] flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h2 className="text-white text-2xl font-black uppercase tracking-tighter">Arène de Débat</h2>
          <p className="text-white/40 text-[10px] font-bold uppercase tracking-widest">Confrontation d'entités numériques</p>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={startDebate}
            className="px-6 py-2 rounded-full bg-accent text-black text-xs font-black uppercase tracking-widest hover:scale-105 transition-transform flex items-center gap-2"
          >
            {isDebating ? <Pause size={16} /> : <Play size={16} />}
            {isDebating ? "Pause" : "Lancer le Débat"}
          </button>
          <button className="p-2 rounded-full bg-white/5 border border-white/10 text-white/40 hover:text-white transition-colors">
            <RotateCcw size={20} />
          </button>
        </div>
      </div>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-6 overflow-hidden">
        {/* Persona 1 */}
        <div className="flex flex-col gap-4 overflow-hidden">
          <Glass level={2} className="p-4 flex items-center gap-4 border-accent/20">
            <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center">
              <Brain size={24} className="text-accent" />
            </div>
            <div>
              <div className="text-white font-black uppercase tracking-widest text-sm">Entity Alpha</div>
              <div className="text-accent text-[10px] font-bold uppercase">Analytique / Froid</div>
            </div>
          </Glass>
          <Glass level={1} className="flex-1 overflow-y-auto p-6 space-y-4">
            {messages.filter(m => m.name === "Alpha").map((m, i) => (
              <div key={i} className="text-white/80 text-sm leading-relaxed bg-white/5 p-4 rounded-xl">
                {m.content}
              </div>
            ))}
            {messages.length === 0 && (
              <div className="h-full flex items-center justify-center text-white/10 text-xs uppercase font-black tracking-widest">
                En attente du premier argument...
              </div>
            )}
          </Glass>
        </div>

        {/* Persona 2 */}
        <div className="flex flex-col gap-4 overflow-hidden">
          <Glass level={2} className="p-4 flex items-center gap-4 border-purple-500/20">
            <div className="w-12 h-12 rounded-full bg-purple-500/10 flex items-center justify-center">
              <Brain size={24} className="text-purple-500" />
            </div>
            <div>
              <div className="text-white font-black uppercase tracking-widest text-sm">Entity Beta</div>
              <div className="text-purple-500 text-[10px] font-bold uppercase">Poétique / Empathique</div>
            </div>
          </Glass>
          <Glass level={1} className="flex-1 overflow-y-auto p-6 space-y-4">
            {messages.filter(m => m.name === "Beta").map((m, i) => (
              <div key={i} className="text-white/80 text-sm leading-relaxed bg-white/5 p-4 rounded-xl">
                {m.content}
              </div>
            ))}
            {messages.length === 0 && (
              <div className="h-full flex items-center justify-center text-white/10 text-xs uppercase font-black tracking-widest">
                En attente de la contre-argumentation...
              </div>
            )}
          </Glass>
        </div>
      </div>
    </div>
  );
};
