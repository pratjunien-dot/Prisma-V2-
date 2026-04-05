import { cn } from "../../lib/utils";

interface AccentChipProps {
  label: string;
  value: number;
  className?: string;
}

export const AccentChip = ({ label, value, className }: AccentChipProps) => {
  const intensity = value / 100;
  const opacity = 0.1 + intensity * 0.2;
  const borderOpacity = 0.2 + intensity * 0.3;

  return (
    <div 
      className={cn(
        "px-2 py-1 rounded-md border text-[8px] font-black uppercase tracking-widest transition-all",
        className
      )}
      style={{
        backgroundColor: `rgba(0, 224, 200, ${opacity})`,
        borderColor: `rgba(0, 224, 200, ${borderOpacity})`,
        color: `rgba(0, 224, 200, ${0.6 + intensity * 0.4})`,
      }}
    >
      {label}: {value < 35 ? "G" : value > 65 ? "D" : "B"}
    </div>
  );
};
