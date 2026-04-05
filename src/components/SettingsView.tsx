import { Glass } from "../shared/ui/atoms/Glass";
import { useThemeStore } from "../features/ui-theme/model/theme.store";
import { THEMES } from "../shared/lib/constants/themes";
import { Moon, Sun, Zap, Trash2, Shield, Info } from "lucide-react";

export const SettingsView = () => {
  const { mode, setMode, theme: currentThemeId, setTheme } = useThemeStore();

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-8">
      <div className="space-y-1">
        <h2 className="text-white text-2xl font-black uppercase tracking-tighter">Paramètres</h2>
        <p className="text-white/40 text-[10px] font-bold uppercase tracking-widest">Configuration du système</p>
      </div>

      {/* Theme Selection */}
      <section className="space-y-4">
        <h3 className="text-white/40 text-[10px] font-black uppercase tracking-[0.3em]">Moteur de Thème</h3>
        <div className="grid grid-cols-3 gap-4">
          <ThemeButton 
            active={mode === "dark"} 
            onClick={() => setMode("dark")}
            icon={<Moon size={20} />}
            label="Sombre"
          />
          <ThemeButton 
            active={mode === "light"} 
            onClick={() => setMode("light")}
            icon={<Sun size={20} />}
            label="Clair"
          />
          <ThemeButton 
            active={mode === "oled"} 
            onClick={() => setMode("oled")}
            icon={<Zap size={20} />}
            label="OLED"
          />
        </div>
      </section>

      {/* Accent Color Selection */}
      <section className="space-y-4">
        <h3 className="text-white/40 text-[10px] font-black uppercase tracking-[0.3em]">Signature Chromatique</h3>
        <div className="grid grid-cols-3 sm:grid-cols-7 gap-3">
          {THEMES.map((color) => (
            <button
              key={color.id}
              onClick={() => setTheme(color.id)}
              className={`h-12 rounded-xl border-2 transition-all flex items-center justify-center ${currentThemeId === color.id ? "border-white scale-110 shadow-lg" : "border-white/5 hover:border-white/20"}`}
              style={{ backgroundColor: color.color }}
              title={color.name}
            >
              {currentThemeId === color.id && <div className="w-2 h-2 rounded-full bg-white shadow-sm" />}
            </button>
          ))}
        </div>
      </section>

      {/* System Actions */}
      <section className="space-y-4">
        <h3 className="text-white/40 text-[10px] font-black uppercase tracking-[0.3em]">Maintenance Système</h3>
        <Glass level={1} className="p-0 overflow-hidden divide-y divide-white/5">
          <SettingsItem 
            icon={<Trash2 size={18} className="text-red-500" />}
            label="Réinitialiser toutes les données"
            description="Efface l'historique et les personas sauvegardés"
            onClick={() => {}}
          />
          <SettingsItem 
            icon={<Shield size={18} className="text-accent" />}
            label="Gestion des Clés API"
            description="Configurer vos accès Gemini"
            onClick={() => {}}
          />
          <SettingsItem 
            icon={<Info size={18} className="text-white/40" />}
            label="Version du Système"
            description="Prisma OS v2.1.0"
            onClick={() => {}}
          />
        </Glass>
      </section>
    </div>
  );
};

const ThemeButton = ({ active, onClick, icon, label }: { active: boolean, onClick: () => void, icon: React.ReactNode, label: string }) => (
  <Glass 
    level={active ? 2 : 1}
    onClick={onClick}
    className={`flex flex-col items-center justify-center p-6 gap-3 cursor-pointer transition-all ${active ? "border-accent bg-accent/5" : "border-white/5 opacity-50 hover:opacity-100"}`}
  >
    <div className={active ? "text-accent" : "text-white"}>{icon}</div>
    <span className={`text-[10px] font-black uppercase tracking-widest ${active ? "text-accent" : "text-white/40"}`}>{label}</span>
  </Glass>
);

const SettingsItem = ({ icon, label, description, onClick }: { icon: React.ReactNode, label: string, description: string, onClick: () => void }) => (
  <div 
    onClick={onClick}
    className="p-4 flex items-center gap-4 hover:bg-white/5 cursor-pointer transition-colors"
  >
    <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center">
      {icon}
    </div>
    <div className="flex-1">
      <div className="text-white text-xs font-bold uppercase tracking-widest">{label}</div>
      <div className="text-white/20 text-[10px]">{description}</div>
    </div>
  </div>
);
