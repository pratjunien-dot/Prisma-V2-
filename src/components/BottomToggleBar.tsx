import { motion } from "motion/react";
import { ChevronUp, ChevronDown, GripHorizontal } from "lucide-react";
import { useUIStore } from "../stores/uiStore";

export const BottomToggleBar = () => {
  const { isExpanded, toggleExpanded } = useUIStore();

  return (
    <div className="fixed bottom-0 right-0 left-0 z-50 flex justify-center pb-2 pointer-events-none transition-all duration-500">
      <motion.button
        onClick={toggleExpanded}
        className="pointer-events-auto flex items-center justify-center w-24 h-8 bg-white/5 hover:bg-white/10 backdrop-blur-xl border border-white/10 rounded-full transition-all group shadow-lg"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <div className="flex items-center gap-2 text-white/40 group-hover:text-accent transition-colors">
          {isExpanded ? (
            <ChevronDown size={18} />
          ) : (
            <ChevronUp size={18} />
          )}
          <GripHorizontal size={14} className="opacity-50" />
        </div>
      </motion.button>
    </div>
  );
};
