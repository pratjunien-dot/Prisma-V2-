import { useState } from "react";
import { Glass } from "../../../shared/ui/atoms/Glass";
import { useChat } from "../../../features/chat-with-persona/use-chat";

export const ChatWindow = () => {
  const { messages, sendMessage, isLoading, activePersona } = useChat();
  const [input, setInput] = useState("");

  const handleSend = async () => {
    if (!input.trim() || !activePersona) return;
    const content = input;
    setInput("");
    await sendMessage(content);
  };

  return (
    <Glass level={3} className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
            <div className={`max-w-[80%] p-3 rounded-2xl ${msg.role === "user" ? "bg-accent/20 text-white" : "bg-surface-2 text-text-muted"}`}>
              {msg.content}
            </div>
          </div>
        ))}
        {isLoading && <div className="text-accent animate-pulse">Génération en cours...</div>}
      </div>
      <div className="p-4 border-t border-surface-2 flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          placeholder="Écrivez un message..."
          className="flex-1 bg-surface-1 border border-surface-2 rounded-full px-4 py-2 text-white focus:outline-none focus:border-accent"
        />
        <button
          onClick={handleSend}
          disabled={isLoading || !input.trim()}
          className="bg-accent text-black px-6 py-2 rounded-full font-medium disabled:opacity-50"
        >
          Envoyer
        </button>
      </div>
    </Glass>
  );
};
