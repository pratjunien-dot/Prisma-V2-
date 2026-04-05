import { motion } from "motion/react";
import { Glass } from "../ui/Glass";
import { useUIStore } from "../stores/uiStore";
import { Brain, MessageSquare, History, Star, Settings } from "lucide-react";
import { WeatherWidget } from "../widgets/weather-widget/ui/WeatherWidget";
import { NewsWidget } from "../widgets/news-widget/ui/NewsWidget";

export const DashboardView = () => {
  const { setView, toggleHistory, toggleFavorites } = useUIStore();

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-8">
      {/* Hero Section */}
      <section className="text-center space-y-4 py-8">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-6xl font-black tracking-tighter text-white uppercase"
        >
          S1 <span className="text-accent">Hub</span>
        </motion.h1>
        <p className="text-white/40 text-xs tracking-[0.2em] uppercase font-bold">
          Centre de Contrôle Prisma OS
        </p>
      </section>

      {/* Main Actions & Widgets Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
        {/* Left Column: Main Actions */}
        <div className="md:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Glass 
            level={2} 
            onClick={() => setView("chat")}
            className="group cursor-pointer hover:border-accent/50 transition-all p-8 flex flex-col items-center text-center space-y-4 h-full"
          >
            <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Brain className="text-accent" size={32} />
            </div>
            <div>
              <h3 className="text-white font-black uppercase tracking-widest">Nouvelle Session</h3>
              <p className="text-white/40 text-xs mt-2">Initialiser le pipeline de création psychométrique</p>
            </div>
          </Glass>

          <Glass 
            level={2} 
            onClick={() => setView("debate")}
            className="group cursor-pointer hover:border-accent/50 transition-all p-8 flex flex-col items-center text-center space-y-4 h-full"
          >
            <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center group-hover:scale-110 transition-transform">
              <MessageSquare className="text-accent" size={32} />
            </div>
            <div>
              <h3 className="text-white font-black uppercase tracking-widest">Arène de Débat</h3>
              <p className="text-white/40 text-xs mt-2">Faire s'affronter deux entités numériques</p>
            </div>
          </Glass>
        </div>

        {/* Right Column: Widgets */}
        <div className="md:col-span-4 grid gap-4 grid-rows-2">
          <WeatherWidget />
          <NewsWidget />
        </div>
      </div>

      {/* Quick Access Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <QuickAction icon={<History size={20} />} label="Historique" onClick={toggleHistory} />
        <QuickAction icon={<Star size={20} />} label="Favoris" onClick={toggleFavorites} />
        <QuickAction icon={<Settings size={20} />} label="Paramètres" onClick={() => setView("settings")} />
        <QuickAction icon={<Brain size={20} />} label="Stats" onClick={() => {}} />
      </div>
    </div>
  );
};

const QuickAction = ({ icon, label, onClick }: { icon: React.ReactNode, label: string, onClick: () => void }) => (
  <Glass 
    level={1} 
    onClick={onClick}
    className="flex flex-col items-center justify-center p-6 gap-2 cursor-pointer hover:bg-white/5 transition-colors border-white/5"
  >
    <div className="text-white/40">{icon}</div>
    <span className="text-white/40 text-[10px] font-black uppercase tracking-widest">{label}</span>
  </Glass>
);
