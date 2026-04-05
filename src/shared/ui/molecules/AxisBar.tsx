import { motion } from "motion/react";
import { AdvancedAxis } from "../../../entities/matrix/model/types";

interface AxisBarProps {
  axis: AdvancedAxis;
}

export const AxisBar = ({ axis }: AxisBarProps) => {
  const { label, value, polarity } = axis;

  const getPolarityLabel = () => {
    if (polarity === "balanced") return "Équilibré";
    if (label === "Ton") return value < 35 ? "Glacial" : "Volcanique";
    if (label === "Lexique") return value < 35 ? "Technique" : "Poétique";
    if (label === "Abstraction") return value < 35 ? "Terre-à-terre" : "Cosmique";
    if (label === "Biais") return value < 35 ? "Analytique" : "Intuitif";
    if (label === "Signature") return value < 35 ? "Neutre" : "Excentrique";
    if (label === "Créativité") return value < 35 ? "Prévisible" : "Chaotique";
    return polarity === "left" ? "Gauche" : "Droite";
  };

  return (
    <div className="flex flex-col gap-1 w-full">
      <div className="flex items-center justify-between px-1">
        <span className="text-[9px] text-white/40 uppercase font-bold tracking-widest w-[70px] truncate">
          {label}
        </span>
        <span className="text-[10px] text-accent font-black">
          {getPolarityLabel()}
        </span>
      </div>
      
      <div className="relative h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="absolute inset-y-0 left-0 bg-gradient-to-r from-accent/40 to-accent rounded-full"
        />
        <div className="absolute inset-y-0 left-1/2 w-px bg-white/10 -translate-x-1/2" />
      </div>
    </div>
  );
};
