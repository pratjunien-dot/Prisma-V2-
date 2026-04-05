import { useState, useEffect, useRef } from "react";
import { motion } from "motion/react";
import { Send, Users, Swords, Brain, Pause, RotateCcw } from "lucide-react";
import { Glass } from "../../../shared/ui/atoms/Glass";
import { useChatPipelineStore } from "../model/chat-pipeline.store";
import { cn } from "../../../shared/lib/utils";

const Loader2 = ({ className }: { className?: string }) => (
  <svg className={cn("animate-spin", className)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
  </svg>
);

export const ChatWindow = () => {
  const { context, addMessage, reset } = useChatPipelineStore();
  const [input, setInput] = useState("");
  const [isDebating, setIsDebating] = useState(false);
  const [isJudging, setIsJudging] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [context.messages]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    addMessage({
      id: Date.now().toString(),
      chatId: "current",
      userId: "user",
      role: "user",
      content: input,
      createdAt: new Date()
    });

    setInput("");

    // Simulate AI response
    setTimeout(() => {
      const responder = context.selectedPersonas[0];
      addMessage({
        id: (Date.now() + 1).toString(),
        chatId: "current",
        userId: "model",
        role: "model",
        content: `Ceci est une réponse simulée de ${responder?.name}. L'intégration avec Gemini sera faite dans la prochaine étape.`,
        createdAt: new Date(),
        personaId: responder?.id
      });
    }, 1000);
  };

  const startDebate = () => {
    setIsDebating(true);
    // Initial argument
    const p1 = context.selectedPersonas[0];
    addMessage({
      id: Date.now().toString(),
      chatId: "current",
      userId: "model",
      role: "model",
      content: `[Argument Initial] En tant que ${p1.name}, je soutiens que l'intelligence artificielle doit être régulée par des principes éthiques stricts pour éviter tout dérapage.`,
      createdAt: new Date(),
      personaId: p1.id
    });

    // Counter argument
    setTimeout(() => {
      const p2 = context.selectedPersonas[1];
      addMessage({
        id: (Date.now() + 1).toString(),
        chatId: "current",
        userId: "model",
        role: "model",
        content: `[Contre-Argument] Je comprends ton point, ${p1.name}, mais une régulation trop stricte pourrait étouffer l'innovation et nous faire perdre des opportunités majeures.`,
        createdAt: new Date(),
        personaId: p2.id
      });
    }, 2000);
  };

  const handleJudge = () => {
    setIsJudging(true);
    setTimeout(() => {
      addMessage({
        id: Date.now().toString(),
        chatId: "current",
        userId: "judge",
        role: "model",
        content: "⚖️ VERDICT DU JUGE IA : Après analyse des arguments, il apparaît que la position de la régulation éthique (Persona A) est plus solide sur le plan de la sécurité à long terme, tandis que l'argument de l'innovation (Persona B) souligne des risques économiques réels. Score final : 60/40 en faveur de la régulation.",
        createdAt: new Date()
      });
      setIsJudging(false);
    }, 2000);
  };

  const getHeaderTitle = () => {
    if (context.collaborationMode === "SINGLE") return context.selectedPersonas[0]?.name;
    if (context.collaborationMode === "DUO") return "Mode Duo";
    if (context.collaborationMode === "TRIO") return "Mode Trio";
    if (context.collaborationMode === "DEBATE") return "Arène de Débat";
    return "Chat";
  };

  const isDebate = context.collaborationMode === "DEBATE";

  return (
    <div className="flex flex-col h-[calc(100vh-12rem)] max-w-5xl mx-auto">
      {/* Header */}
      <Glass level={2} className="p-4 flex items-center justify-between rounded-t-[32px] border-b-0 rounded-b-none z-10">
        <div className="flex items-center gap-4">
          {isDebate ? (
            <div className="flex -space-x-4">
              {context.selectedPersonas.map((p, i) => (
                <div key={i} className="w-10 h-10 rounded-full border-2 border-surface-2 flex items-center justify-center text-xl bg-white/5 shadow-xl">
                  {p.avatar}
                </div>
              ))}
            </div>
          ) : context.collaborationMode === "SINGLE" ? (
            <div className="w-10 h-10 rounded-full border border-accent/30 flex items-center justify-center text-xl bg-white/5">
              {context.selectedPersonas[0]?.avatar}
            </div>
          ) : (
            <div className="w-10 h-10 rounded-full border border-accent/30 flex items-center justify-center bg-white/5">
              <Users size={20} className="text-accent" />
            </div>
          )}
          <div>
            <h3 className="text-white font-black uppercase tracking-widest text-sm">{getHeaderTitle()}</h3>
            <p className="text-accent text-[10px] font-bold uppercase tracking-widest">
              {isDebate ? "Confrontation d'entités" : context.collaborationMode === "SINGLE" ? context.selectedPersonas[0]?.role : `${context.selectedPersonas.length} Personas`}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {isDebate && context.messages.length > 0 && (
            <button 
              onClick={handleJudge}
              disabled={isJudging}
              className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent/10 border border-accent/30 text-accent text-[10px] font-black uppercase tracking-widest hover:bg-accent hover:text-black transition-all disabled:opacity-50"
            >
              {isJudging ? <Loader2 className="w-3 h-3 animate-spin" /> : <Brain size={14} />}
              Juge IA
            </button>
          )}
          <button 
            onClick={reset}
            className="p-2 hover:bg-white/10 rounded-full transition-colors text-white/40 hover:text-white"
            title="Réinitialiser"
          >
            <RotateCcw size={18} />
          </button>
        </div>
      </Glass>

      {/* Messages */}
      <Glass level={1} className="flex-1 p-6 overflow-y-auto custom-scrollbar rounded-none border-y-0 space-y-6" ref={scrollRef}>
        {context.messages.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-white/40 space-y-6">
            <div className="flex gap-4">
              {context.selectedPersonas.map((p, i) => (
                <motion.div 
                  key={i}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: i * 0.2 }}
                  className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center text-3xl border border-white/10 shadow-2xl"
                >
                  {p.avatar}
                </motion.div>
              ))}
            </div>
            <div className="text-center space-y-2">
              <p className="text-sm font-bold uppercase tracking-widest text-white/60">
                {isDebate ? "Prêt pour la confrontation ?" : "Commencez la conversation"}
              </p>
              {isDebate && (
                <button 
                  onClick={startDebate}
                  className="px-8 py-3 rounded-full bg-accent text-black font-black uppercase tracking-widest text-xs hover:scale-105 transition-transform flex items-center gap-2 mx-auto mt-4"
                >
                  <Swords size={16} />
                  Lancer le Débat
                </button>
              )}
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {context.messages.map((msg) => {
              const persona = context.selectedPersonas.find(p => p.id === msg.personaId);
              const isJudge = msg.userId === "judge";
              
              return (
                <motion.div 
                  key={msg.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={cn(
                    "flex flex-col",
                    msg.role === "user" ? "items-end" : "items-start",
                    isJudge && "items-center"
                  )}
                >
                  {!isJudge && msg.role === "model" && persona && (
                    <span className="text-[10px] font-black uppercase tracking-widest text-accent mb-1 ml-2">
                      {persona.name}
                    </span>
                  )}
                  <div className={cn(
                    "max-w-[85%] p-4 rounded-2xl",
                    msg.role === "user" 
                      ? "bg-accent text-black rounded-tr-sm" 
                      : isJudge
                        ? "bg-white/20 text-white border-2 border-accent/50 shadow-[0_0_20px_rgba(var(--accent-rgb),0.2)] rounded-xl text-center"
                        : "bg-white/10 text-white rounded-tl-sm border border-white/5"
                  )}>
                    <p className={cn("text-sm leading-relaxed", isJudge && "font-bold italic")}>{msg.content}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </Glass>

      {/* Input */}
      {!isDebating && (
        <Glass level={2} className="p-4 rounded-b-[32px] border-t-0 rounded-t-none z-10">
          <form onSubmit={handleSend} className="relative flex items-center">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={isDebate ? "Posez une question au débat..." : "Écrivez votre message..."}
              className="w-full bg-white/5 border border-white/10 rounded-full text-white placeholder:text-white/20 px-6 py-4 focus:outline-none focus:border-accent/50 transition-colors pr-16"
            />
            <button
              type="submit"
              disabled={!input.trim()}
              className="absolute right-2 p-3 bg-accent text-black rounded-full hover:scale-105 active:scale-95 transition-all disabled:opacity-50 disabled:hover:scale-100"
            >
              <Send size={18} />
            </button>
          </form>
        </Glass>
      )}

      {isDebating && (
        <Glass level={2} className="p-4 rounded-b-[32px] border-t-0 rounded-t-none z-10 flex justify-center gap-4">
          <button 
            onClick={() => setIsDebating(false)}
            className="px-6 py-3 rounded-full bg-white/5 border border-white/10 text-white text-xs font-black uppercase tracking-widest hover:bg-white/10 transition-colors flex items-center gap-2"
          >
            <Pause size={16} />
            Pause
          </button>
          <button 
            onClick={handleJudge}
            className="px-6 py-3 rounded-full bg-accent text-black text-xs font-black uppercase tracking-widest hover:scale-105 transition-transform flex items-center gap-2"
          >
            <Brain size={16} />
            Juge IA
          </button>
        </Glass>
      )}
    </div>
  );
};
