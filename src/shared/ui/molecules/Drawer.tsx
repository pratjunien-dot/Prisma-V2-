import { ReactNode } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X } from "lucide-react";
import { Glass } from "./Glass";

interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  side?: "left" | "right";
  children: ReactNode;
}

export const Drawer = ({ isOpen, onClose, title, side = "right", children }: DrawerProps) => {
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
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
          />
          
          {/* Drawer */}
          <motion.div
            initial={{ x: side === "right" ? "100%" : "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: side === "right" ? "100%" : "-100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className={`fixed top-0 bottom-0 ${side === "right" ? "right-0" : "left-0"} w-80 z-50`}
          >
            <Glass level={4} className="h-full rounded-none border-y-0 flex flex-col p-0">
              <div className="p-4 border-b border-white/10 flex items-center justify-between">
                <h2 className="text-white font-black uppercase tracking-widest text-sm">{title}</h2>
                <button onClick={onClose} className="text-white/40 hover:text-white transition-colors">
                  <X size={20} />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto p-4">
                {children}
              </div>
            </Glass>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
