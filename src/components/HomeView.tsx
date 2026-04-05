import { motion } from "motion/react";
import { useUIStore } from "../stores/uiStore";
import { Brain, Sparkles, Zap } from "lucide-react";
import { Glass } from "../ui/Glass";

export const HomeView = () => {
  const { setView } = useUIStore();

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-24 py-20">
      {/* Hero Section */}
      <section className="text-center space-y-8 relative">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/5 blur-[120px] rounded-full -z-10"
        />
        
        <div className="space-y-4">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-accent text-xs font-black uppercase tracking-[0.4em]"
          >
            Bienvenue dans le futur de l'IA
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-6xl md:text-8xl font-black tracking-tighter text-white uppercase leading-none"
          >
            Prisma <span className="text-accent">OS</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-white/40 text-lg max-w-2xl mx-auto font-medium"
          >
            L'interface neuronale ultime pour sculpter, entraîner et faire interagir des entités numériques dotées d'une conscience artificielle.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex flex-wrap justify-center gap-4 pt-8"
        >
          <button
            onClick={() => setView("chat")}
            className="px-8 py-4 bg-accent text-black font-black uppercase tracking-widest text-sm rounded-full hover:scale-105 active:scale-95 transition-all shadow-[0_0_30px_rgba(var(--accent-rgb),0.3)]"
          >
            Démarrer l'Expérience
          </button>
          <button
            onClick={() => setView("dashboard")}
            className="px-8 py-4 bg-white/5 border border-white/10 text-white font-black uppercase tracking-widest text-sm rounded-full hover:bg-white/10 transition-all"
          >
            Accéder au Hub
          </button>
        </motion.div>
      </section>

      {/* Features Grid */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <FeatureCard 
          icon={<Brain className="text-accent" />}
          title="Psychométrie"
          description="Créez des personas basés sur des matrices psychologiques complexes et des tensions narratives."
        />
        <FeatureCard 
          icon={<Sparkles className="text-accent" />}
          title="Inférence"
          description="Propulsé par Gemini 3.1 pour des interactions fluides, créatives et contextuelles."
        />
        <FeatureCard 
          icon={<Zap className="text-accent" />}
          title="Performance"
          description="Une interface ultra-rapide conçue pour la productivité et l'immersion totale."
        />
      </section>
    </div>
  );
};

const FeatureCard = ({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) => (
  <Glass level={1} className="p-8 space-y-4 border-white/5 hover:border-white/10 transition-colors group">
    <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center group-hover:bg-accent/10 transition-colors">
      {icon}
    </div>
    <h3 className="text-white font-black uppercase tracking-widest text-lg">{title}</h3>
    <p className="text-white/40 text-sm leading-relaxed">{description}</p>
  </Glass>
);
