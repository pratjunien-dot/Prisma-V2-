import { ReactNode } from "react";
import { useThemeStore } from "../../features/ui-theme/model/theme.store";
import { cn } from "../../shared/lib/utils";
import { Header } from "../../widgets/header/ui/Header";
import { Dock } from "../../widgets/dock/ui/Dock";
import { ParticleBackground } from "../../shared/ui/atoms/ParticleBackground";

interface AppShellProps {
  children: ReactNode;
}

export const AppShell = ({ children }: AppShellProps) => {
  const { theme, mode, isUiVisible } = useThemeStore();

  return (
    <div className={cn(
      "min-h-screen w-full flex flex-col items-center relative overflow-x-hidden transition-all duration-500",
      theme,
      mode
    )}>
      {/* Background Effects */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-1/4 -left-1/4 w-[80vw] h-[80vw] bg-accent/10 rounded-full blur-[120px] animate-halo" />
        <div className="absolute -bottom-1/4 -right-1/4 w-[80vw] h-[80vw] bg-purple-500/10 rounded-full blur-[120px] animate-halo" style={{ animationDelay: "-5s" }} />
      </div>

      {/* Particle Background */}
      <ParticleBackground />

      {/* Header */}
      <Header />
      
      {/* Main Content Area */}
      <main className={cn(
        "relative z-10 w-full max-w-5xl flex-1 flex flex-col px-4 sm:px-8 transition-all duration-500",
        isUiVisible 
          ? "pt-[calc(env(safe-area-inset-top,1rem)+80px)] pb-[calc(env(safe-area-inset-bottom,1rem)+140px)]"
          : "pt-[env(safe-area-inset-top,1rem)] pb-[calc(env(safe-area-inset-bottom,1rem)+60px)]"
      )}>
        {children}
      </main>

      {/* Dock */}
      <Dock />
    </div>
  );
};
