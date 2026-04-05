import { motion, AnimatePresence } from "motion/react";
import { useUIStore } from "../stores/uiStore";
import { LayoutDashboard, MessageSquare, Sword, Settings, History, Star } from "lucide-react";
import { Glass } from "../ui/Glass";
import { cn } from "../shared/lib/utils";

export const Dock = () => {
  const { currentView, setView, toggleHistory, toggleFavorites, isExpanded, isSidebarOpen } = useUIStore();

  return (
    <AnimatePresence>
      {isExpanded && (
          <motion.div 
            initial={{ y: "150%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "150%", opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed bottom-8 right-0 left-0 md:left-0 z-40 flex justify-center px-4 pointer-events-none"
          >
            <div className={cn(
              "w-full max-w-7xl flex justify-center pointer-events-auto transition-all duration-500",
              isSidebarOpen ? "md:pl-[280px]" : "md:pl-[80px]"
            )}>
              <Glass level={3} className="p-2 rounded-full flex items-center justify-center gap-2 sm:gap-4 border-white/10 shadow-2xl px-4 sm:px-6 w-auto">
                <DockItem 
                  active={currentView === "dashboard"} 
                  onClick={() => setView("dashboard")}
                  icon={<LayoutDashboard size={20} />}
                  label="Hub"
                />
                <DockItem 
                  active={currentView === "chat"} 
                  onClick={() => setView("chat")}
                  icon={<MessageSquare size={20} />}
                  label="Chat"
                />
                <DockItem 
                  active={currentView === "debate"} 
                  onClick={() => setView("debate")}
                  icon={<Sword size={20} />}
                  label="Arène"
                />
                <div className="w-px h-8 bg-white/10 mx-2" />
                <DockItem 
                  active={false} 
                  onClick={toggleHistory}
                  icon={<History size={20} />}
                  label="History"
                />
                <DockItem 
                  active={false} 
                  onClick={toggleFavorites}
                  icon={<Star size={20} />}
                  label="Favs"
                />
                <DockItem 
                  active={currentView === "settings"} 
                  onClick={() => setView("settings")}
                  icon={<Settings size={20} />}
                  label="Config"
                />
              </Glass>
            </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const DockItem = ({ active, onClick, icon, label }: { active: boolean, onClick: () => void, icon: React.ReactNode, label: string }) => (
  <button
    onClick={onClick}
    className={`relative group p-3 sm:p-4 rounded-full transition-all duration-300 ${active ? "bg-accent text-black shadow-[0_0_15px_rgba(var(--accent-rgb),0.5)]" : "text-white/60 hover:text-white hover:bg-white/10"}`}
  >
    {icon}
    <span className="absolute -top-12 left-1/2 -translate-x-1/2 px-3 py-1.5 rounded-lg bg-black/80 backdrop-blur-md text-[10px] font-black uppercase tracking-widest text-white opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap border border-white/10 shadow-xl">
      {label}
    </span>
    {active && (
      <motion.div 
        layoutId="dock-active"
        className="absolute inset-0 bg-accent rounded-full -z-10"
        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
      />
    )}
  </button>
);
