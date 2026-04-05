import { useState } from "react";
import { motion } from "motion/react";
import { Send, Settings2, Users } from "lucide-react";
import { Glass } from "../../../shared/ui/atoms/Glass";
import { useChatPipelineStore } from "../model/chat-pipeline.store";

export const ChatWindow = () => {
  const { context, addMessage } = useChatPipelineStore();
  const [input, setInput] = useState("");

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Add user message
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
        createdAt: new Date()
      });
    }, 1000);
  };

  const getHeaderTitle = () => {
    if (context.collaborationMode === "SINGLE") return context.selectedPersonas[0]?.name;
    if (context.collaborationMode === "DUO") return "Mode Duo";
    if (context.collaborationMode === "TRIO") return "Mode Trio";
    if (context.collaborationMode === "DEBATE") return "Arène de Débat";
    return "Chat";
  };

  return (
    <div className="flex flex-col h-[calc(100vh-12rem)] max-w-4xl mx-auto">
      {/* Header */}
      <Glass level={2} className="p-4 flex items-center justify-between rounded-t-[32px] border-b-0 rounded-b-none z-10">
        <div className="flex items-center gap-4">
          {context.collaborationMode === "SINGLE" ? (
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
              {context.collaborationMode === "SINGLE" ? context.selectedPersonas[0]?.role : `${context.selectedPersonas.length} Personas`}
            </p>
          </div>
        </div>
        <button 
          className="p-2 hover:bg-white/10 rounded-full transition-colors text-white/40 hover:text-white"
        >
          <Settings2 size={20} />
        </button>
      </Glass>

      {/* Messages */}
      <Glass level={1} className="flex-1 p-6 overflow-y-auto custom-scrollbar rounded-none border-y-0 space-y-6">
        {context.messages.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-white/40 space-y-4">
            <div className="flex gap-2 mb-4">
              {context.selectedPersonas.map((p, i) => (
                <div key={i} className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-2xl border border-white/10">
                  {p.avatar}
                </div>
              ))}
            </div>
            <p className="text-sm font-medium">Commencez la conversation</p>
          </div>
        ) : (
          context.messages.map((msg) => (
            <motion.div 
              key={msg.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div className={`max-w-[80%] p-4 rounded-2xl ${
                msg.role === "user" 
                  ? "bg-accent text-black rounded-tr-sm" 
                  : "bg-white/10 text-white rounded-tl-sm border border-white/5"
              }`}>
                <p className="text-sm leading-relaxed">{msg.content}</p>
              </div>
            </motion.div>
          ))
        )}
      </Glass>

      {/* Input */}
      <Glass level={2} className="p-4 rounded-b-[32px] border-t-0 rounded-t-none z-10">
        <form onSubmit={handleSend} className="relative flex items-center">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Écrivez votre message..."
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
    </div>
  );
};
