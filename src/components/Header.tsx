import { motion, AnimatePresence } from "motion/react";
import { Search, Sparkles, Sun, Moon, Monitor } from "lucide-react";
import { Glass } from "../ui/Glass";
import { useUIStore } from "../stores/uiStore";
import { cn } from "../shared/lib/utils";
import { RadioPlugin } from "../widgets/radio-plugin/ui/RadioPlugin";
import { ProfileMenu } from "./ProfileMenu";

export const Header = () => {
  const { isSidebarOpen, isExpanded, theme, setTheme } = useUIStore();

  const cycleTheme = () => {
    if (theme === "dark") setTheme("oled");
    else if (theme === "oled") setTheme("light");
    else setTheme("dark");
  };

  const ThemeIcon = () => {
    if (theme === "light") return <Sun size={18} />;
    if (theme === "oled") return <Monitor size={18} />;
    return <Moon size={18} />;
  };

  return (
    <AnimatePresence>
      {isExpanded && (
        <motion.header 
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="fixed top-0 right-0 left-0 md:left-0 z-30 flex justify-center px-4 pt-4 pointer-events-none"
        >
          <div className={cn(
            "w-full max-w-7xl pointer-events-auto transition-all duration-500",
            isSidebarOpen ? "md:pl-[280px]" : "md:pl-[80px]"
          )}>
            <Glass level={2} className="flex items-center justify-between px-6 py-3 rounded-[32px] border-white/10 shadow-2xl backdrop-blur-3xl">
              {/* Left: Theme Switcher & Search */}
              <div className="flex items-center gap-4">
                <button 
                  onClick={cycleTheme}
                  className="p-2 hover:bg-white/10 rounded-full transition-colors text-white/70 hover:text-white flex items-center justify-center"
                  title="Changer de thème"
                >
                  <ThemeIcon />
                </button>
                <div className="hidden sm:flex items-center gap-3 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-white/40 group hover:border-accent/50 transition-all cursor-text">
                  <Search size={16} className="group-hover:text-accent transition-colors" />
                  <span className="text-[10px] font-black uppercase tracking-widest">Rechercher...</span>
                </div>
              </div>

              {/* Center: System Status & Radio */}
              <div className="absolute left-1/2 -translate-x-1/2 flex items-center gap-2 sm:gap-4 lg:gap-6">
                <div className="hidden lg:flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-accent rounded-full animate-pulse" />
                  <span className="text-accent text-[8px] font-black uppercase tracking-[0.2em]">Système Opérationnel</span>
                </div>
                <div className="hidden lg:block w-px h-4 bg-white/10" />
                <div className="hidden md:flex items-center gap-2">
                  <Sparkles size={12} className="text-white/40" />
                  <span className="text-white/40 text-[8px] font-black uppercase tracking-[0.2em]">Gemini 3.1 Pro</span>
                </div>
                <div className="hidden md:block w-px h-4 bg-white/10" />
                <div className="flex items-center">
                  <RadioPlugin />
                </div>
              </div>

              {/* Right: User Profile Menu */}
              <div className="flex items-center gap-4">
                <ProfileMenu />
              </div>
            </Glass>
          </div>
        </motion.header>
      )}
    </AnimatePresence>
  );
};
