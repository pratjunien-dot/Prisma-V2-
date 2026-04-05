import { motion } from "motion/react";
import { Play, Pause, Music, Volume2 } from "lucide-react";
import { Glass } from "../../../shared/ui/atoms/Glass";
import { useRadio } from "../../../shared/lib/audio/RadioContext";

export const RadioWidget = () => {
  const { isPlaying, isLoading, currentStation, togglePlay } = useRadio();

  return (
    <Glass 
      level={2} 
      className="p-6 flex flex-col justify-between h-full group hover:border-accent/50 transition-all relative overflow-hidden"
    >
      {/* Background Glow */}
      <div 
        className="absolute -top-12 -right-12 w-32 h-32 rounded-full blur-[60px] opacity-10 transition-colors duration-1000"
        style={{ backgroundColor: currentStation.color }}
      />

      <div className="flex items-center justify-between relative z-10">
        <div className="flex items-center gap-3">
          <div 
            className="w-10 h-10 rounded-xl flex items-center justify-center text-lg font-black shadow-lg border border-white/10"
            style={{ backgroundColor: currentStation.color, color: '#000' }}
          >
            {currentStation.name[0]}
          </div>
          <div>
            <h4 className="text-white text-sm font-black uppercase tracking-tight truncate max-w-[120px]">
              {currentStation.name}
            </h4>
            <p className="text-accent text-[8px] font-black uppercase tracking-widest opacity-60">
              {currentStation.freq} MHz
            </p>
          </div>
        </div>
        <Music size={16} className="text-white/20" />
      </div>

      <div className="mt-4 flex items-center justify-between relative z-10">
        <div className="flex gap-[2px] items-end h-8">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              animate={{ 
                height: isPlaying && !isLoading ? ["20%", "100%", "20%"] : "20%" 
              }}
              transition={{ 
                repeat: Infinity, 
                duration: 0.5 + Math.random() * 0.3,
                delay: i * 0.1
              }}
              className="w-1 bg-accent rounded-full"
            />
          ))}
        </div>

        <button 
          onClick={(e) => {
            e.stopPropagation();
            togglePlay();
          }}
          className="w-12 h-12 rounded-xl bg-white text-black flex items-center justify-center hover:scale-110 transition-transform shadow-xl active:scale-95"
        >
          {isPlaying ? <Pause size={20} fill="currentColor" /> : <Play size={20} fill="currentColor" className="ml-1" />}
        </button>
      </div>

      <div className="mt-4 pt-4 border-t border-white/5 flex items-center justify-between relative z-10">
        <span className="text-[8px] font-black text-white/30 uppercase tracking-widest">Prisma Station</span>
        <div className="flex items-center gap-1">
          <Volume2 size={10} className="text-white/20" />
          <div className="w-12 h-1 bg-white/10 rounded-full overflow-hidden">
            <div className="h-full bg-accent w-1/2" />
          </div>
        </div>
      </div>
    </Glass>
  );
};
