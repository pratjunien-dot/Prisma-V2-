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
          "flex items-center gap-2 sm:gap-3 px-2.5 py-1.5 sm:py-2 rounded-full cursor-pointer transition-all duration-500 border-white/5",
          isOpen ? "bg-white/15 ring-1 ring-accent/40 shadow-[0_0_20px_rgba(var(--accent-rgb),0.2)]" : "hover:bg-white/10"
        )}
        onClick={() => setIsOpen(!isOpen)}
      >
        {/* Play Button Container */}
        <button 
          onClick={handleTogglePlay}
          className="relative w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-accent/10 flex items-center justify-center text-accent hover:bg-accent/20 transition-all active:scale-90 overflow-hidden"
        >
          <AnimatePresence mode="wait">
            {isLoading ? (
              <motion.div key="loader" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
              </motion.div>
            ) : isPlaying ? (
              <motion.div key="pause" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
                <Pause className="w-3 h-3 fill-current" />
              </motion.div>
            ) : (
              <motion.div key="play" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
                <Play className="w-3 h-3 fill-current ml-0.5" />
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
        <div className="flex flex-col min-w-[70px] sm:min-w-[100px]">
          <div className="flex items-center gap-1.5">
            <span className="text-white text-[10px] sm:text-xs font-black leading-none truncate max-w-[60px] sm:max-w-[90px]">
              {currentStation.name}
            </span>
            {isPlaying && !isLoading && (
              <div className="flex gap-[1px] items-end h-2">
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
          <span className="text-accent text-[8px] font-black uppercase tracking-widest opacity-50">
            {currentStation.freq} MHz
          </span>
        </div>

        <ChevronDown className={cn(
          "w-3 h-3 text-text-muted transition-transform duration-500",
          isOpen ? "rotate-180 text-accent" : "group-hover/radio:text-white"
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
              <div className="bg-[#0f0f0f]/90 backdrop-blur-xl border border-white/10 shadow-2xl rounded-[32px] p-6 w-full flex flex-col gap-6">
                {/* Header & Volume */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/5 pb-4">
                  <div className="flex items-center gap-2">
                    <Music className="w-5 h-5 text-accent" />
                    <span className="text-sm font-black uppercase tracking-[0.2em] text-white">Stations Prisma</span>
                  </div>
                  
                  <div className="flex items-center gap-4 bg-white/5 px-4 py-2 rounded-2xl min-w-[200px]">
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        setIsMuted(!isMuted);
                      }} 
                      className="text-accent/80 hover:text-accent transition-colors"
                    >
                      {isMuted || volume === 0 ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                    </button>
                    <input 
                      type="range" min="0" max="1" step="0.01" 
                      value={volume} 
                      onChange={(e) => { 
                        setVolume(parseFloat(e.target.value)); 
                        setIsMuted(false); 
                      }}
                      onClick={(e) => e.stopPropagation()}
                      className="flex-1 h-1.5 bg-white/10 rounded-full appearance-none cursor-pointer accent-accent"
                    />
                  </div>
                </div>

                {/* Stations Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {STATIONS.map((station) => (
                    <button
                      key={station.id}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSelectStation(station);
                      }}
                      className={cn(
                        "flex items-center justify-between px-5 py-4 rounded-2xl transition-all group/item border",
                        currentStation.id === station.id 
                          ? "bg-accent/10 border-accent/30 text-accent shadow-[0_0_15px_rgba(var(--accent-rgb),0.1)]" 
                          : "bg-white/5 border-transparent hover:bg-white/10 text-text-muted hover:text-white"
                      )}
                    >
                      <div className="flex items-center gap-4">
                        <div 
                          className="w-3 h-3 rounded-full shadow-[0_0_10px_rgba(var(--accent-rgb),0.4)]"
                          style={{ backgroundColor: station.color }}
                        />
                        <div className="flex flex-col items-start">
                          <span className="text-sm font-bold tracking-tight">{station.name}</span>
                          <span className="text-[10px] font-black opacity-40 uppercase tracking-widest">
                            {station.freq} MHz
                          </span>
                        </div>
                      </div>
                      {currentStation.id === station.id && isPlaying && (
                        <div className="flex gap-[2px] items-end h-3">
                          {[0.4, 0.8, 0.5].map((h, i) => (
                            <motion.div
                              key={i}
                              animate={{ height: ["20%", "100%", "20%"] }}
                              transition={{ repeat: Infinity, duration: 0.5 + i * 0.1 }}
                              className="w-[2px] bg-accent rounded-full"
                            />
                          ))}
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
