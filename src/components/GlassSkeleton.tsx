import { Glass } from "../ui/Glass";

interface SkeletonProps {
  className?: string;
  count?: number;
}

export const GlassSkeleton = ({ className, count = 1 }: SkeletonProps) => {
  return (
    <div className="space-y-4 w-full">
      {Array.from({ length: count }).map((_, i) => (
        <Glass 
          key={i} 
          level={1} 
          className={`animate-pulse border-white/5 bg-white/5 ${className}`}
        >
          <div className="h-full w-full flex flex-col gap-3">
            <div className="h-4 w-1/3 bg-white/10 rounded-full" />
            <div className="h-2 w-full bg-white/5 rounded-full" />
            <div className="h-2 w-2/3 bg-white/5 rounded-full" />
          </div>
        </Glass>
      ))}
    </div>
  );
};
