import { motion, AnimatePresence } from "motion/react";
import { useUIStore, ViewType } from "../stores/uiStore";
import { LucideIcon, Home, LayoutDashboard, MessageSquare, Swords, Settings, ChevronLeft, ChevronRight } from "lucide-react";
import { Glass } from "../ui/Glass";
import { cn } from "../shared/lib/utils";

const MENU_ITEMS: { id: ViewType; icon: LucideIcon; label: string }[] = [
  { id: "home", icon: Home, label: "Accueil" },
  { id: "dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { id: "chat", icon: MessageSquare, label: "Chat" },
  { id: "debate", icon: Swords, label: "Débat" },
  { id: "settings", icon: Settings, label: "Paramètres" },
];

export const Sidebar = () => {
  const { currentView, setView, isSidebarOpen, toggleSidebar } = useUIStore();

  return (
    <motion.aside
      initial={false}
      animate={{ width: isSidebarOpen ? 280 : 80 }}
      className="fixed left-0 top-0 bottom-0 z-40 hidden md:block"
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      <Glass level={3} className="h-full flex flex-col border-r border-white/10 rounded-none overflow-hidden p-0">
        {/* Logo Area */}
        <div className="p-6 flex items-center gap-4 border-b border-white/5 h-20">
          <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center shrink-0 shadow-[0_0_15px_rgba(var(--accent-rgb),0.3)]">
            <span className="text-black font-black text-xs">P</span>
          </div>
          <AnimatePresence mode="wait">
            {isSidebarOpen && (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="flex flex-col"
              >
                <span className="text-white font-black tracking-tighter text-xl leading-none">Prisma</span>
                <span className="text-accent text-[8px] font-black uppercase tracking-[0.3em] leading-none opacity-60 mt-1">OS Edition</span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Navigation */}
        <nav className="flex-1 py-8 px-3 space-y-2">
          {MENU_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = currentView === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => setView(item.id)}
                className={cn(
                  "w-full flex items-center gap-4 p-3 rounded-2xl transition-all group relative",
                  isActive 
                    ? "bg-accent text-black shadow-[0_0_20px_rgba(var(--accent-rgb),0.2)]" 
                    : "text-white/40 hover:text-white hover:bg-white/5"
                )}
              >
                <Icon size={20} className={cn("shrink-0 transition-colors", isActive ? "text-black" : "group-hover:text-accent")} />
                
                <AnimatePresence mode="wait">
                  {isSidebarOpen && (
                    <motion.span
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      className="text-sm font-bold whitespace-nowrap"
                    >
                      {item.label}
                    </motion.span>
                  )}
                </AnimatePresence>

                {!isSidebarOpen && (
                  <div className="absolute left-full ml-4 px-2 py-1 rounded bg-black text-[10px] font-black uppercase tracking-widest text-white opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap border border-white/10 z-50">
                    {item.label}
                  </div>
                )}
              </button>
            );
          })}
        </nav>

        {/* Toggle Button */}
        <div className="p-4 border-t border-white/5">
          <button
            onClick={toggleSidebar}
            className="w-full flex items-center justify-center p-3 rounded-2xl text-white/40 hover:text-white hover:bg-white/5 transition-all"
          >
            {isSidebarOpen ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
          </button>
        </div>
      </Glass>
    </motion.aside>
  );
};
