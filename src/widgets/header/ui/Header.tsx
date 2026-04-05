import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, Bell, LogIn } from "lucide-react";
import { Glass } from "../../../shared/ui/atoms/Glass";
import { RadioPlugin } from "../../radio-plugin/ui/RadioPlugin";
import { useAuth } from "../../../features/auth/use-auth";
import { Link } from "react-router-dom";
import { cn } from "../../../shared/lib/utils";
import { useThemeStore } from "../../../features/ui-theme/model/theme.store";
import { Sidebar } from "../../sidebar/ui/Sidebar";

export const Header = () => {
  const { user, login, isLoading } = useAuth();
  const { isUiVisible } = useThemeStore();
  const [isScrollVisible, setIsScrollVisible] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Retraction logic
      if (currentScrollY > lastScrollY && currentScrollY > 80) {
        setIsScrollVisible(false);
      } else {
        setIsScrollVisible(true);
      }

      // Compact mode logic
      setIsScrolled(currentScrollY > 20);
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const showHeader = isUiVisible && isScrollVisible;

  return (
    <>
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      
      <AnimatePresence>
        {showHeader && (
          <motion.header
            initial={{ y: -100, opacity: 0 }}
            animate={{ 
              y: 0, 
              opacity: 1,
              scale: isScrolled ? 0.96 : 1,
            }}
            exit={{ y: -100, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed top-0 left-0 right-0 z-[100] flex justify-center px-4 pt-[env(safe-area-inset-top,1rem)] pointer-events-none"
          >
            <div className="w-full max-w-5xl pointer-events-auto box-border">
              <Glass 
                level={isScrolled ? 2 : 1} 
                className={cn(
                  "flex items-center justify-between transition-all duration-500 rounded-[24px] border-white/10 shadow-2xl backdrop-blur-3xl",
                  isScrolled ? "px-3 py-1.5 sm:py-2 border-accent/20" : "px-4 sm:px-6 py-2 sm:py-3"
                )}
              >
                <div className="flex items-center gap-2 sm:gap-4 shrink-0">
                  <button 
                    onClick={() => setIsSidebarOpen(true)}
                    className="p-2 hover:bg-white/10 rounded-full transition-colors text-white group"
                  >
                    <Menu className="w-5 h-5 sm:w-6 sm:h-6 group-hover:text-accent transition-colors" />
                  </button>
                  <Link to="/" className="flex items-center gap-2 group">
                    <div className="flex flex-col hidden sm:flex">
                      <span className="text-white font-black tracking-tighter text-sm sm:text-lg leading-none">Prisma</span>
                      <span className="text-accent text-[7px] sm:text-[8px] font-black uppercase tracking-[0.2em] leading-none opacity-60">OS</span>
                    </div>
                  </Link>
                </div>

                <div className="flex-1 flex justify-center px-2 max-w-[180px] sm:max-w-md">
                  <RadioPlugin />
                </div>

                <div className="flex items-center gap-1 sm:gap-4 shrink-0">
                  <button className="p-2 hover:bg-white/10 rounded-full transition-colors text-text-muted hover:text-white hidden xs:block relative">
                    <Bell className="w-4 h-4 sm:w-5 sm:h-5" />
                    <div className="absolute top-2 right-2 w-1.5 h-1.5 bg-accent rounded-full border border-black animate-pulse" />
                  </button>
                  
                  {user ? (
                    <div className="flex items-center gap-2">
                      <div className="text-right hidden md:block">
                        <p className="text-white text-[10px] sm:text-xs font-black uppercase tracking-tight truncate max-w-[80px]">{user.displayName}</p>
                        <div className="flex items-center justify-end gap-1">
                          <div className="w-1 h-1 bg-accent rounded-full animate-pulse" />
                          <p className="text-accent text-[8px] font-black uppercase opacity-60">Online</p>
                        </div>
                      </div>
                      <div className="relative shrink-0">
                        <img src={user.photoURL || ""} alt="Profile" className="w-8 h-8 sm:w-9 sm:h-9 rounded-full border border-accent/30 p-0.5 object-cover" referrerPolicy="no-referrer" />
                        <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-accent rounded-full border-2 border-black" />
                      </div>
                    </div>
                  ) : (
                    <button 
                      onClick={login}
                      disabled={isLoading}
                      className="flex items-center gap-2 bg-accent text-black px-3 sm:px-5 py-1.5 sm:py-2 rounded-full font-black text-[10px] uppercase tracking-widest transition-all hover:scale-105 active:scale-95 disabled:opacity-50 shadow-[0_0_15px_rgba(var(--accent-rgb),0.3)]"
                    >
                      <LogIn className="w-3 h-3 sm:w-4 sm:h-4" />
                      <span className="hidden xs:inline">Login</span>
                    </button>
                  )}
                </div>
              </Glass>
            </div>
          </motion.header>
        )}
      </AnimatePresence>
    </>
  );
};
