import { ReactNode, forwardRef, HTMLAttributes } from "react";
import { cn } from "../../lib/utils";

interface GlassProps extends HTMLAttributes<HTMLDivElement> {
  level?: 1 | 2 | 3 | 4;
  children: ReactNode;
  className?: string;
}

export const Glass = forwardRef<HTMLDivElement, GlassProps>(
  ({ level = 1, children, className, ...props }, ref) => {
    const blurLevel = {
      1: "backdrop-blur-xs",
      2: "backdrop-blur-sm",
      3: "backdrop-blur-md",
      4: "backdrop-blur-lg",
    }[level];

    return (
      <div 
        ref={ref}
        {...props}
        className={cn(`liquid-glass ${blurLevel} rounded-lg p-4 border border-white/10`, className)}
      >
        {children}
      </div>
    );
  }
);

Glass.displayName = "Glass";
