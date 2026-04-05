import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Settings, LogOut, Shield, User } from "lucide-react";
import { Glass } from "../ui/Glass";
import { useUIStore } from "../stores/uiStore";

export const ProfileMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { setView } = useUIStore();
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={menuRef}>
      <div 
        className="flex items-center gap-3 pl-4 border-l border-white/10 cursor-pointer group"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="text-right hidden xs:block">
          <p className="text-white text-[10px] font-black uppercase tracking-tight group-hover:text-accent transition-colors">Admin User</p>
          <p className="text-accent text-[8px] font-black uppercase opacity-60">Niveau 5</p>
        </div>
        <div className="relative">
          <div className="w-9 h-9 rounded-full border border-accent/30 p-0.5 bg-gradient-to-br from-accent/20 to-transparent group-hover:border-accent transition-colors">
            <div className="w-full h-full rounded-full bg-white/5 flex items-center justify-center">
              <span className="text-accent font-black text-xs">AU</span>
            </div>
          </div>
          <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-accent rounded-full border-2 border-black" />
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
            className="absolute top-full right-0 mt-4 w-56 z-50 origin-top-right"
          >
            <Glass level={3} className="flex flex-col p-2 rounded-[24px] border-white/10 shadow-2xl backdrop-blur-3xl">
              <div className="px-4 py-3 border-b border-white/10 mb-2 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                  <User size={18} className="text-white/70" />
                </div>
                <div>
                  <p className="text-white text-xs font-bold">Admin User</p>
                  <p className="text-white/40 text-[10px]">admin@prisma.os</p>
                </div>
              </div>
              
              <div className="flex flex-col gap-1">
                <button 
                  onClick={() => { setView("settings"); setIsOpen(false); }} 
                  className="flex items-center gap-3 px-3 py-2.5 text-xs text-white/70 hover:text-white hover:bg-white/5 rounded-xl transition-colors"
                >
                  <Settings size={16} /> Paramètres Système
                </button>
                <button className="flex items-center gap-3 px-3 py-2.5 text-xs text-white/70 hover:text-white hover:bg-white/5 rounded-xl transition-colors">
                  <Shield size={16} /> Sécurité & Accès
                </button>
                <div className="h-px bg-white/10 my-1 mx-2" />
                <button className="flex items-center gap-3 px-3 py-2.5 text-xs text-red-400 hover:text-red-300 hover:bg-white/5 rounded-xl transition-colors">
                  <LogOut size={16} /> Déconnexion
                </button>
              </div>
            </Glass>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
