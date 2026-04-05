import { motion, AnimatePresence } from "motion/react";
import { Home, MessageSquare, Users, Settings, Eye, EyeOff } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { Glass } from "../../../shared/ui/atoms/Glass";
import { cn } from "../../../shared/lib/utils";
import { useThemeStore } from "../../../features/ui-theme/model/theme.store";
import { useUIStore } from "../../../stores/uiStore";

const TABS = [
  { id: "home", icon: Home, label: "Accueil", path: "/" },
  { id: "chat", icon: MessageSquare, label: "Chat", path: "/chat" },
  { id: "personas", icon: Users, label: "Personas", path: "/personas" },
  { id: "settings", icon: Settings, label: "Réglages", path: "/settings" },
];

export const Dock = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isUiVisible, toggleUi } = useThemeStore();
  const { isSidebarOpen } = useUIStore();

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[100] flex flex-col items-center pb-[env(safe-area-inset-bottom,1.5rem)] pointer-events-none">
      
      {/* Main Dock */}
      <AnimatePresence>
        {isUiVisible && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="w-full max-w-7xl px-4 pointer-events-none mb-4"
          >
            <div className={cn(
              "w-full flex justify-center transition-all duration-500",
              isSidebarOpen ? "md:pl-[280px]" : "md:pl-[80px]"
            )}>
              <Glass level={2} className="pointer-events-auto flex items-center gap-1 sm:gap-2 px-3 py-2 rounded-[32px] border-white/10 shadow-2xl backdrop-blur-3xl">
                {TABS.map((tab) => {
                  const Icon = tab.icon;
                  const isActive = location.pathname === tab.path;

                  return (
                    <button
                      key={tab.id}
                      onClick={() => navigate(tab.path)}
                      className={cn(
                        "relative p-3 sm:p-4 rounded-full transition-all duration-300 group",
                        isActive ? "text-accent bg-accent/10" : "text-text-muted hover:text-white hover:bg-white/5"
                      )}
                    >
                      <Icon className={cn("w-5 h-5 sm:w-6 sm:h-6 transition-transform duration-300", isActive && "scale-110")} />
                      {isActive && (
                        <motion.div
                          layoutId="dock-active"
                          className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-accent rounded-full shadow-[0_0_8px_rgba(var(--accent-rgb),0.8)]"
                        />
                      )}
                      
                      <span className="absolute -top-10 left-1/2 -translate-x-1/2 px-2 py-1 bg-black/80 text-white text-[10px] rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none hidden sm:block">
                        {tab.label}
                      </span>
                    </button>
                  );
                })}
              </Glass>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle UI Button */}
      <motion.button
        onClick={toggleUi}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="pointer-events-auto p-3 bg-surface-1/40 backdrop-blur-xl border border-white/10 rounded-full shadow-xl text-accent/80 hover:text-accent transition-colors mb-2"
      >
        {isUiVisible ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
      </motion.button>
    </div>
  );
};
