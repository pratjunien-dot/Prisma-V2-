import { motion, AnimatePresence } from "motion/react";
import { useUIStore } from "../stores/uiStore";
import { LayoutDashboard, MessageSquare, Sword, Settings, History, Star } from "lucide-react";
import { Glass } from "../ui/Glass";

export const Dock = () => {
  const { currentView, setView, toggleHistory, toggleFavorites, isExpanded } = useUIStore();

  return (
    <AnimatePresence>
      {isExpanded && (
          <motion.div 
            initial={{ y: "150%", opacity: 0, x: "-50%" }}
            animate={{ y: 0, opacity: 1, x: "-50%" }}
            exit={{ y: "150%", opacity: 0, x: "-50%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed bottom-8 left-1/2 z-40 transition-all duration-500 w-full max-w-7xl px-4 flex justify-center"
          >
            <Glass level={3} className="p-2 rounded-full flex items-center justify-between gap-2 sm:gap-6 border-white/10 shadow-2xl w-full max-w-3xl px-4 sm:px-8">
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
            <div className="w-px h-6 bg-white/10 mx-1" />
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
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const DockItem = ({ active, onClick, icon, label }: { active: boolean, onClick: () => void, icon: React.ReactNode, label: string }) => (
  <button
    onClick={onClick}
    className={`relative group p-3 rounded-full transition-all duration-300 ${active ? "bg-accent text-black" : "text-white/40 hover:text-white hover:bg-white/5"}`}
  >
    {icon}
    <span className="absolute -top-10 left-1/2 -translate-x-1/2 px-2 py-1 rounded bg-black text-[10px] font-black uppercase tracking-widest text-white opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap border border-white/10">
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
