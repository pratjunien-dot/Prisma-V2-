import { Zap } from "lucide-react";
import { MatrixTension } from "../../../entities/matrix/model/types";
import { cn } from "../../lib/utils";

interface TensionBadgeProps {
  tension: MatrixTension;
  className?: string;
}

export const TensionBadge = ({ tension, className }: TensionBadgeProps) => {
  const { description, intensity } = tension;

  const intensityColor = {
    high: "text-red-400 border-red-400/20 bg-red-400/10",
    medium: "text-orange-400 border-orange-400/20 bg-orange-400/10",
    low: "text-text-muted border-white/10 bg-white/5",
  }[intensity];

  return (
    <div className={cn(
      "flex items-center gap-2 px-3 py-1.5 rounded-full border text-[10px] font-black uppercase tracking-widest",
      intensityColor,
      className
    )}>
      <Zap className="w-3 h-3 fill-current" />
      <span>⚡ Tension: {description}</span>
    </div>
  );
};
