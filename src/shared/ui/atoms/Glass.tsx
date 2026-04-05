import { ReactNode } from "react";
import { cn } from "../../lib/utils";

interface GlassProps {
  level?: 1 | 2 | 3 | 4;
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}

export const Glass = ({ level = 1, children, className, onClick }: GlassProps) => {
  const blurLevel = {
    1: "backdrop-blur-xs",
    2: "backdrop-blur-sm",
    3: "backdrop-blur-md",
    4: "backdrop-blur-lg",
  }[level];

  return (
    <div 
      onClick={onClick}
      className={cn(`liquid-glass ${blurLevel} rounded-lg p-4 border border-white/10`, className)}
    >
      {children}
    </div>
  );
};
