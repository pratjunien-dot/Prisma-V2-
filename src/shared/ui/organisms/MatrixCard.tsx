import { motion } from "motion/react";
import { AdvancedMatrix } from "../../../entities/schemas";
import { Glass } from "../atoms/Glass";
import { AxisBar } from "../molecules/AxisBar";
import { TensionBadge } from "../molecules/TensionBadge";

interface MatrixCardProps {
  matrix: AdvancedMatrix;
  onClick?: () => void;
  isSelected?: boolean;
}

export const MatrixCard = ({ matrix, onClick, isSelected }: MatrixCardProps) => {
  const { archetypes, axes, tension } = matrix;
  const fixedAxes = axes.filter(a => ["Ton", "Lexique", "Abstraction", "Biais", "Signature", "Créativité"].includes(a.label));
  const bonusAxes = axes.filter(a => !["Ton", "Lexique", "Abstraction", "Biais", "Signature", "Créativité"].includes(a.label));

  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -4 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className="cursor-pointer group"
    >
      <Glass 
        level={isSelected ? 3 : 2} 
        className={`p-6 flex flex-col gap-6 transition-all border-white/5 ${
          isSelected ? "border-accent/40 bg-accent/5" : "hover:border-white/20"
        }`}
      >
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-[10px] text-accent uppercase font-black tracking-widest">Archétype</span>
            <h3 className="text-white text-xl font-black tracking-tighter uppercase">
              {archetypes.join(" ")}
            </h3>
          </div>
          <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-white/20 group-hover:text-accent transition-colors">
            {isSelected ? "✓" : "◬"}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
          {fixedAxes.map((axis) => (
            <AxisBar key={axis.label} axis={axis} />
          ))}
        </div>

        {bonusAxes.length > 0 && (
          <>
            <div className="h-px w-full bg-white/5 border-t border-dashed border-white/10" />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
              {bonusAxes.map((axis) => (
                <div key={axis.label} className="relative">
                  <AxisBar axis={axis} />
                  <span className="absolute -top-3 right-1 text-[8px] text-accent/40 uppercase font-bold tracking-widest">
                    (contextuel)
                  </span>
                </div>
              ))}
            </div>
          </>
        )}

        {tension && (
          <TensionBadge tension={tension} className="mt-2 self-start" />
        )}
      </Glass>
    </motion.div>
  );
};
