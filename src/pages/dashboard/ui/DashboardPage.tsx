import { motion } from "motion/react";
import { Glass } from "../../../shared/ui/atoms/Glass";
import { useNavigate } from "react-router-dom";
import { MessageSquarePlus, Star, ChevronRight, Zap } from "lucide-react";
import { WeatherWidget } from "../../../widgets/weather-widget/ui/WeatherWidget";
import { NewsWidget } from "../../../widgets/news-widget/ui/NewsWidget";

const FAVORITE_PERSONAS = [
  { id: "1", name: "Lumina", role: "Guide Spirituel", icon: "✨" },
  { id: "2", name: "Kael", role: "Analyste Stratégique", icon: "🧠" },
  { id: "3", name: "Sora", role: "Artiste Créatif", icon: "🎨" },
  { id: "4", name: "Nova", role: "Expert Tech", icon: "💻" },
];

export const DashboardPage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-8 pb-12">
      {/* Welcome & Weather Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="md:col-span-2"
        >
          <Glass level={2} className="h-full p-8 flex flex-col justify-center relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <Zap className="w-32 h-32 text-accent" />
            </div>
            <h1 className="text-white text-4xl font-black tracking-tighter mb-2">
              Bonjour, <span className="text-accent">Explorateur</span>
            </h1>
            <p className="text-text-muted text-lg max-w-md">
              Prêt à donner vie à une nouvelle conscience artificielle aujourd'hui ?
            </p>
          </Glass>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <WeatherWidget />
        </motion.div>
      </div>

      {/* News & CTA Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="md:col-span-1"
        >
          <NewsWidget />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="md:col-span-2"
        >
          <Glass level={1} className="h-full p-8 bg-accent/5 border-accent/30 flex flex-col sm:flex-row items-center gap-8">
            <div className="flex-1">
              <h2 className="text-white text-2xl font-black mb-2">Nouveau Chat</h2>
              <p className="text-text-muted text-sm mb-6">Explorez des personnalités générées procéduralement à partir de vos questions.</p>
              
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => navigate("/chat")}
                className="w-full bg-accent text-black font-black py-4 rounded-xl flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(0,255,255,0.4)]"
              >
                <MessageSquarePlus className="w-5 h-5" />
                DÉMARRER L'EXPLORATION
              </motion.button>
            </div>
          </Glass>
        </motion.div>
      </div>

      {/* Favorites Carousel */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <div className="flex items-center justify-between mb-4 px-2">
          <div className="flex items-center gap-2">
            <Star className="w-5 h-5 text-accent fill-accent" />
            <h2 className="text-white font-black uppercase tracking-tighter text-xl">Personas Favoris</h2>
          </div>
          <button className="text-accent text-xs font-bold flex items-center gap-1 hover:underline">
            VOIR TOUT <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar">
          {FAVORITE_PERSONAS.map((persona) => (
            <motion.div key={persona.id} whileHover={{ y: -5 }} className="min-w-[200px]">
              <Glass level={2} className="p-6 flex flex-col items-center text-center group cursor-pointer border-white/5 hover:border-accent/30 transition-all">
                <div className="text-4xl mb-4 grayscale group-hover:grayscale-0 transition-all transform group-hover:scale-110">
                  {persona.icon}
                </div>
                <h3 className="text-white font-bold text-lg">{persona.name}</h3>
                <p className="text-text-muted text-xs uppercase tracking-widest mt-1">{persona.role}</p>
              </Glass>
            </motion.div>
          ))}
        </div>
      </motion.section>
    </div>
  );
};
