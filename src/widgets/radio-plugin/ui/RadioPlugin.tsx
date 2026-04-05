import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Play, Pause, ChevronDown, Volume2, VolumeX, Loader2, Music } from "lucide-react";
import { Glass } from "../../../shared/ui/atoms/Glass";
import { cn } from "../../../shared/lib/utils";
import { useRadio, STATIONS } from "../../../shared/lib/audio/RadioContext";
import { useUIStore } from "../../../stores/uiStore";

export const RadioPlugin = () => {
  const { 
    isPlaying, 
    isLoading, 
    currentStation, 
    volume, 
    isMuted, 
    togglePlay, 
    setStation, 
    setVolume, 
    setIsMuted 
  } = useRadio();
  
  const { isSidebarOpen } = useUIStore();
  const [isOpen, setIsOpen] = useState(false);

  const handleTogglePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    togglePlay();
  };

  const handleSelectStation = (station: typeof STATIONS[0]) => {
    setStation(station);
    setIsOpen(false);
  };

  return (
    <div className="relative group/radio select-none">
      <Glass 
        level={2} 
        className={cn(
          "flex items-center gap-3 px-3 py-2 rounded-2xl cursor-pointer transition-all duration-500 border-white/5 min-w-[140px]",
          isOpen ? "bg-white/15 ring-1 ring-accent/40 shadow-[0_0_20px_rgba(var(--accent-rgb),0.2)]" : "hover:bg-white/10"
        )}
        onClick={() => setIsOpen(!isOpen)}
      >
        {/* Play Button Container */}
        <button 
          onClick={handleTogglePlay}
          className="relative w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center text-accent hover:bg-accent/20 transition-all active:scale-90 overflow-hidden shrink-0"
        >
          <AnimatePresence mode="wait">
            {isLoading ? (
              <motion.div key="loader" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <Loader2 className="w-4 h-4 animate-spin" />
              </motion.div>
            ) : isPlaying ? (
              <motion.div key="pause" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
                <Pause className="w-4 h-4 fill-current" />
              </motion.div>
            ) : (
              <motion.div key="play" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
                <Play className="w-4 h-4 fill-current ml-0.5" />
              </motion.div>
            )}
          </AnimatePresence>
          
          {isPlaying && !isLoading && (
            <motion.div 
              initial={{ scale: 0.8, opacity: 0.5 }}
              animate={{ scale: 1.6, opacity: 0 }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeOut" }}
              className="absolute inset-0 bg-accent rounded-full pointer-events-none"
            />
          )}
        </button>

        {/* Info Section */}
        <div className="flex flex-col flex-1 overflow-hidden">
          <div className="flex items-center gap-2">
            <span className="text-white text-xs font-black leading-none truncate">
              {currentStation.name}
            </span>
            {isPlaying && !isLoading && (
              <div className="flex gap-[1px] items-end h-2.5">
                {[0.4, 0.8, 0.5].map((h, i) => (
                  <motion.div
                    key={i}
                    animate={{ height: ["20%", "100%", "20%"] }}
                    transition={{ repeat: Infinity, duration: 0.5 + i * 0.1 }}
                    className="w-[1.5px] bg-accent rounded-full"
                  />
                ))}
              </div>
            )}
          </div>
          <span className="text-accent text-[9px] font-black uppercase tracking-widest opacity-60 mt-0.5">
            {currentStation.freq} MHz
          </span>
        </div>

        <ChevronDown className={cn(
          "w-4 h-4 text-white/20 transition-transform duration-500 shrink-0",
          isOpen ? "rotate-180 text-accent" : "group-hover/radio:text-white/40"
        )} />
      </Glass>

      {/* Station Drawer (Dropdown) */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
            className="fixed top-24 right-0 left-0 md:left-0 z-50 flex justify-center px-4 pointer-events-none"
          >
            <div className={cn(
              "w-full max-w-7xl pointer-events-auto transition-all duration-500",
              isSidebarOpen ? "md:pl-[280px]" : "md:pl-[80px]"
            )}>
              <div className="bg-[#0a0a0a]/95 backdrop-blur-3xl border border-white/10 shadow-[0_32px_64px_-12px_rgba(0,0,0,0.8)] rounded-[40px] p-8 w-full flex flex-col gap-8">
                {/* Header & Volume */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-accent/10 flex items-center justify-center">
                      <Music className="w-6 h-6 text-accent" />
                    </div>
                    <div>
                      <h2 className="text-xl font-black uppercase tracking-[0.2em] text-white">Prisma Radio</h2>
                      <p className="text-[10px] font-black text-white/30 uppercase tracking-widest mt-1">Sélection de flux haute fidélité</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-6 bg-white/5 px-6 py-4 rounded-[24px] border border-white/5 min-w-[280px]">
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        setIsMuted(!isMuted);
                      }} 
                      className="text-accent/80 hover:text-accent transition-colors shrink-0"
                    >
                      {isMuted || volume === 0 ? <VolumeX className="w-6 h-6" /> : <Volume2 className="w-6 h-6" />}
                    </button>
                    <div className="flex-1 relative flex items-center">
                      <input 
                        type="range" min="0" max="1" step="0.01" 
                        value={volume} 
                        onChange={(e) => { 
                          setVolume(parseFloat(e.target.value)); 
                          setIsMuted(false); 
                        }}
                        onClick={(e) => e.stopPropagation()}
                        className="w-full h-1.5 bg-white/10 rounded-full appearance-none cursor-pointer accent-accent"
                      />
                    </div>
                    <span className="text-[10px] font-black text-white/40 w-8 text-right">{Math.round(volume * 100)}%</span>
                  </div>
                </div>

                {/* Main Content: Now Playing + Grid */}
                <div className="flex flex-col lg:flex-row gap-8">
                  {/* Now Playing Block (Large Square) */}
                  <div className="lg:w-1/3">
                    <div 
                      className="aspect-square rounded-[32px] p-8 flex flex-col justify-between relative overflow-hidden group/nowplaying border border-white/10 shadow-2xl"
                      style={{ backgroundColor: `${currentStation.color}10` }}
                    >
                      {/* Background Glow */}
                      <div 
                        className="absolute -top-24 -right-24 w-64 h-64 rounded-full blur-[100px] opacity-20"
                        style={{ backgroundColor: currentStation.color }}
                      />
                      
                      <div className="relative z-10">
                        <div 
                          className="w-16 h-16 rounded-2xl mb-6 flex items-center justify-center text-3xl shadow-2xl border border-white/20"
                          style={{ backgroundColor: currentStation.color, color: '#000' }}
                        >
                          {currentStation.name[0]}
                        </div>
                        <h3 className="text-3xl font-black text-white leading-tight">{currentStation.name}</h3>
                        <p className="text-accent font-black tracking-[0.3em] uppercase text-xs mt-2">{currentStation.freq} MHz</p>
                      </div>

                      <div className="relative z-10 flex items-end justify-between">
                        <div className="flex gap-1 items-end h-12">
                          {[...Array(8)].map((_, i) => (
                            <motion.div
                              key={i}
                              animate={{ 
                                height: isPlaying && !isLoading ? ["20%", "100%", "20%"] : "20%" 
                              }}
                              transition={{ 
                                repeat: Infinity, 
                                duration: 0.4 + Math.random() * 0.4,
                                delay: i * 0.05
                              }}
                              className="w-1.5 bg-accent rounded-full"
                            />
                          ))}
                        </div>
                        
                        <button 
                          onClick={handleTogglePlay}
                          className="w-16 h-16 rounded-2xl bg-white text-black flex items-center justify-center hover:scale-110 transition-transform shadow-2xl active:scale-95"
                        >
                          {isPlaying ? <Pause className="w-6 h-6 fill-current" /> : <Play className="w-6 h-6 fill-current ml-1" />}
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Stations Grid (Square Blocks) */}
                  <div className="lg:w-2/3 grid grid-cols-2 sm:grid-cols-3 gap-4">
                    {STATIONS.map((station) => (
                      <button
                        key={station.id}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleSelectStation(station);
                        }}
                        className={cn(
                          "flex flex-col items-center justify-center aspect-square rounded-[32px] transition-all duration-500 group/item border p-6 relative overflow-hidden",
                          currentStation.id === station.id 
                            ? "bg-white/10 border-accent/50 shadow-[0_0_30px_rgba(var(--accent-rgb),0.15)]" 
                            : "bg-white/5 border-white/5 hover:bg-white/10 hover:border-white/20"
                        )}
                      >
                        {/* Active Indicator */}
                        {currentStation.id === station.id && (
                          <motion.div 
                            layoutId="active-bg"
                            className="absolute inset-0 bg-accent/5 pointer-events-none"
                          />
                        )}

                        <div 
                          className={cn(
                            "w-14 h-14 rounded-2xl mb-4 flex items-center justify-center text-xl transition-all duration-500 group-hover/item:scale-110 shadow-xl",
                            currentStation.id === station.id ? "scale-110" : ""
                          )}
                          style={{ 
                            backgroundColor: `${station.color}20`, 
                            color: station.color,
                            border: `1px solid ${station.color}40`
                          }}
                        >
                          {station.name[0]}
                        </div>
                        <span className={cn(
                          "text-sm font-black tracking-tight text-center transition-colors",
                          currentStation.id === station.id ? "text-white" : "text-white/60 group-hover/item:text-white"
                        )}>
                          {station.name}
                        </span>
                        <span className="text-[9px] font-black opacity-30 uppercase tracking-[0.2em] mt-1.5">
                          {station.freq} MHz
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
