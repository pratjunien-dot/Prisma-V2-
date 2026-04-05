import { motion, AnimatePresence } from "motion/react";
import { X, Home, MessageSquare, Users, Swords, Settings, LogOut, User, Shield, CreditCard, PlusCircle } from "lucide-react";
import { Glass } from "../../../shared/ui/atoms/Glass";
import { useNavigate } from "react-router-dom";
import { useChatPipelineStore } from "../../../features/chat-pipeline/model/chat-pipeline.store";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const MENU_ITEMS = [
  { id: "home", icon: Home, label: "Accueil", path: "/" },
  { id: "chat", icon: MessageSquare, label: "Chat", path: "/chat" },
  { id: "personas", icon: Users, label: "Personas", path: "/personas" },
  { id: "debate", icon: Swords, label: "Débat", path: "/debate" },
  { id: "settings", icon: Settings, label: "Réglages", path: "/settings" },
];

const ACCOUNT_ITEMS = [
  { id: "profile", icon: User, label: "Mon Profil" },
  { id: "security", icon: Shield, label: "Sécurité" },
  { id: "billing", icon: CreditCard, label: "Facturation" },
];

export const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
  const navigate = useNavigate();
  const resetPipeline = useChatPipelineStore((state) => state.reset);

  const handleNewChat = () => {
    resetPipeline();
    navigate("/chat");
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[150] bg-black/40 backdrop-blur-sm"
          />

          {/* Sidebar Panel */}
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed top-0 left-0 bottom-0 w-[280px] sm:w-[320px] z-[200] flex flex-col"
          >
            <Glass level={3} className="h-full flex flex-col border-r border-white/10 rounded-r-[32px] overflow-hidden">
              {/* Header */}
              <div className="p-6 flex items-center justify-between border-b border-white/5">
                <div className="flex flex-col">
                  <span className="text-white font-black tracking-tighter text-xl leading-none">Prisma</span>
                  <span className="text-accent text-[8px] font-black uppercase tracking-[0.3em] leading-none opacity-60 mt-1">OS Edition</span>
                </div>
                <button 
                  onClick={onClose}
                  className="p-2 hover:bg-white/10 rounded-full transition-colors text-text-muted hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Content */}
              <div className="flex-1 overflow-y-auto py-6 px-4 space-y-8 custom-scrollbar">
                {/* New Chat Action */}
                <div className="px-2">
                  <button
                    onClick={handleNewChat}
                    className="w-full flex items-center gap-4 px-4 py-4 rounded-2xl bg-accent text-black font-black uppercase tracking-tighter text-sm shadow-[0_0_20px_rgba(var(--accent-rgb),0.2)] hover:scale-[1.02] active:scale-95 transition-all"
                  >
                    <PlusCircle className="w-5 h-5" />
                    <span>Nouveau Chat</span>
                  </button>
                </div>

                {/* Main Menu */}
                <div className="space-y-2">
                  <span className="px-4 text-[10px] font-black uppercase tracking-[0.2em] text-accent/60">Menu Principal</span>
                  <div className="grid gap-1">
                    {MENU_ITEMS.map((item) => {
                      const Icon = item.icon;
                      return (
                        <button
                          key={item.id}
                          onClick={() => {
                            navigate(item.path);
                            onClose();
                          }}
                          className="flex items-center gap-4 px-4 py-3 rounded-2xl text-text-muted hover:text-white hover:bg-white/5 transition-all group"
                        >
                          <Icon className="w-5 h-5 group-hover:text-accent transition-colors" />
                          <span className="text-sm font-bold">{item.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Account Section */}
                <div className="space-y-2">
                  <span className="px-4 text-[10px] font-black uppercase tracking-[0.2em] text-accent/60">Compte</span>
                  <div className="grid gap-1">
                    {ACCOUNT_ITEMS.map((item) => {
                      const Icon = item.icon;
                      return (
                        <button
                          key={item.id}
                          className="flex items-center gap-4 px-4 py-3 rounded-2xl text-text-muted hover:text-white hover:bg-white/5 transition-all group"
                        >
                          <Icon className="w-5 h-5 group-hover:text-accent transition-colors" />
                          <span className="text-sm font-bold">{item.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="p-6 border-t border-white/5">
                <button className="w-full flex items-center gap-4 px-4 py-3 rounded-2xl text-rose-500 hover:bg-rose-500/10 transition-all font-bold">
                  <LogOut className="w-5 h-5" />
                  <span>Déconnexion</span>
                </button>
              </div>
            </Glass>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
