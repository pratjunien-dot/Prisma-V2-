import { useThemeStore, Theme, ThemeMode } from "../../../features/ui-theme/model/theme.store";
import { Glass } from "../../../shared/ui/atoms/Glass";
import { Check, Moon, Sun, Zap, LucideIcon } from "lucide-react";
import { cn } from "../../../shared/lib/utils";

const THEMES: { id: Theme; name: string; color: string }[] = [
  { id: "cyan", name: "Cyber Teal", color: "#00E0C8" },
  { id: "indigo", name: "Deep Sea", color: "#6366F1" },
  { id: "violet", name: "Neon Purple", color: "#8B5CF6" },
  { id: "emerald", name: "Forest", color: "#10B981" },
  { id: "amber", name: "Gold", color: "#F59E0B" },
  { id: "rose", name: "Crimson", color: "#F43F5E" },
  { id: "neutral", name: "Monochrome", color: "#FFFFFF" },
];

const MODES: { id: ThemeMode; name: string; icon: LucideIcon }[] = [
  { id: "light", name: "Clair", icon: Sun },
  { id: "dark", name: "Sombre", icon: Moon },
  { id: "oled", name: "OLED", icon: Zap },
];

export const AppearanceTab = () => {
  const { theme, setTheme, mode, setMode } = useThemeStore();

  return (
    <div className="flex flex-col gap-8">
      {/* Theme Selection */}
      <section className="flex flex-col gap-4">
        <h3 className="text-white text-sm font-black uppercase tracking-widest opacity-60">Couleur d'accent</h3>
        <div className="grid grid-cols-4 sm:grid-cols-7 gap-4">
          {THEMES.map((t) => (
            <button
              key={t.id}
              onClick={() => setTheme(t.id)}
              className="flex flex-col items-center gap-2 group"
            >
              <div 
                className={cn(
                  "w-12 h-12 rounded-full border-2 transition-all flex items-center justify-center relative",
                  theme === t.id ? "border-white scale-110 shadow-[0_0_20px_rgba(255,255,255,0.3)]" : "border-transparent hover:scale-105"
                )}
                style={{ backgroundColor: t.color }}
              >
                {theme === t.id && <Check className="w-6 h-6 text-black" />}
                <div 
                  className="absolute inset-0 rounded-full blur-md opacity-0 group-hover:opacity-40 transition-opacity"
                  style={{ backgroundColor: t.color }}
                />
              </div>
              <span className="text-[10px] text-white font-bold uppercase tracking-tighter opacity-40 group-hover:opacity-100 transition-opacity">
                {t.name}
              </span>
            </button>
          ))}
        </div>
      </section>

      {/* Mode Selection */}
      <section className="flex flex-col gap-4">
        <h3 className="text-white text-sm font-black uppercase tracking-widest opacity-60">Mode d'affichage</h3>
        <div className="grid grid-cols-3 gap-4">
          {MODES.map((m) => {
            const Icon = m.icon;
            const isActive = mode === m.id;
            return (
              <button
                key={m.id}
                onClick={() => setMode(m.id)}
                className="relative group"
              >
                <Glass 
                  level={isActive ? 3 : 1} 
                  className={cn(
                    "p-4 flex flex-col items-center gap-2 transition-all border-white/5",
                    isActive ? "border-accent/40 bg-accent/5" : "hover:border-white/20"
                  )}
                >
                  <Icon className={cn("w-6 h-6 transition-colors", isActive ? "text-accent" : "text-white/40")} />
                  <span className={cn("text-xs font-black uppercase tracking-widest", isActive ? "text-white" : "text-white/20")}>
                    {m.name}
                  </span>
                </Glass>
              </button>
            );
          })}
        </div>
      </section>

      {/* Preview */}
      <section className="flex flex-col gap-4">
        <h3 className="text-white text-sm font-black uppercase tracking-widest opacity-60">Prévisualisation</h3>
        <Glass level={2} className="p-6 border-accent/20">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-accent flex items-center justify-center text-black font-black">P</div>
            <div>
              <h4 className="text-white font-black">Prisma OS</h4>
              <p className="text-text-muted text-xs">Interface adaptative activée.</p>
            </div>
          </div>
          <div className="mt-4 h-2 w-full bg-white/5 rounded-full overflow-hidden">
            <div className="h-full bg-accent w-2/3 rounded-full" />
          </div>
        </Glass>
      </section>
    </div>
  );
};
