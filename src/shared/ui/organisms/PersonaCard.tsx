import { motion } from "motion/react";
import { Persona } from "../../../entities/persona/model/types";
import { Glass } from "../atoms/Glass";
import { AccentChip } from "../atoms/AccentChip";
import { TensionBadge } from "../molecules/TensionBadge";
import { Star } from "lucide-react";
import { useState } from "react";

interface PersonaCardProps {
  persona: Persona;
  onClick?: () => void;
  onFavoriteToggle?: (id: string, isFavorite: boolean) => void;
  isFavorite?: boolean;
}

export const PersonaCard = ({ persona, onClick, onFavoriteToggle, isFavorite: initialFavorite }: PersonaCardProps) => {
  const { name, tagline, axes, color, tension } = persona;
  const [isFavorite, setIsFavorite] = useState(initialFavorite);

  const handleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    const newState = !isFavorite;
    setIsFavorite(newState);
    onFavoriteToggle?.(persona.id, newState);
  };

  return (
    <motion.div
      whileHover={{ y: -5 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className="cursor-pointer group"
    >
      <Glass level={2} className="p-8 flex flex-col gap-6 border-white/5 hover:border-accent/30 transition-all relative overflow-hidden">
        {/* Favorite Button */}
        <button
          onClick={handleFavorite}
          className={`absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center transition-all ${
            isFavorite ? "bg-accent text-black" : "bg-white/5 text-white/40 hover:bg-white/10"
          }`}
        >
          <Star className={`w-5 h-5 ${isFavorite ? "fill-current" : ""}`} />
        </button>

        <div className="flex items-center gap-6">
          <div 
            className="w-20 h-20 rounded-3xl flex items-center justify-center text-3xl font-black text-black shadow-2xl"
            style={{ backgroundColor: color }}
          >
            {name.charAt(0)}
          </div>
          <div className="flex flex-col">
            <h3 className="text-white text-3xl font-black tracking-tighter leading-none">{name}</h3>
            <p className="text-accent italic text-xs mt-2 opacity-80">"{tagline}"</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {axes.map((axis) => (
            <AccentChip 
              key={axis.label} 
              label={axis.label} 
              value={axis.value} 
            />
          ))}
        </div>

        {tension && (
          <TensionBadge tension={tension} className="self-start" />
        )}

        <div className="mt-4 w-full bg-accent text-black font-black py-4 rounded-xl flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-all transform translate-y-2 group-hover:translate-y-0">
          DISCUTER AVEC {name.toUpperCase()}
        </div>
      </Glass>
    </motion.div>
  );
};
