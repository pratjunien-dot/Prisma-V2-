import { useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useUIStore } from "./stores/uiStore";
import { cn } from "./shared/lib/utils";
import { DashboardView } from "./components/DashboardView";
import { HomeView } from "./components/HomeView";
import { ChatInterface } from "./components/ChatInterface";
import { SettingsView } from "./components/SettingsView";
import { FavoritesDrawer } from "./components/FavoritesDrawer";
import { HistoryDrawer } from "./components/HistoryDrawer";
import { Header } from "./components/Header";
import { Sidebar } from "./components/Sidebar";
import { Dock } from "./components/Dock";
import { BottomToggleBar } from "./components/BottomToggleBar";
import { ErrorBoundary } from "./components/ErrorBoundary";
import { RadioProvider } from "./shared/lib/audio/RadioContext";
import { useSwipeGesture } from "./lib/useSwipeGesture";

function App() {
  const { currentView, setView, theme, accentColor, isSidebarOpen } = useUIStore();

  const views = ["home", "dashboard", "chat", "settings"];

  useSwipeGesture({
    onSwipeLeft: () => {
      const currentIndex = views.indexOf(currentView as string);
      if (currentIndex < views.length - 1) {
        setView(views[currentIndex + 1] as "home" | "dashboard" | "chat" | "settings");
      }
    },
    onSwipeRight: () => {
      const currentIndex = views.indexOf(currentView as string);
      if (currentIndex > 0) {
        setView(views[currentIndex - 1] as "home" | "dashboard" | "chat" | "settings");
      }
    },
    threshold: 100
  });

  useEffect(() => {
    // Set global CSS variables on the root element so they cascade everywhere
    document.documentElement.style.setProperty('--accent', accentColor);
    
    // Calculate RGB for rgba() usage in Tailwind
    const hex = accentColor.replace('#', '');
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    document.documentElement.style.setProperty('--accent-rgb', `${r}, ${g}, ${b}`);
  }, [accentColor]);

  const renderView = () => {
    switch (currentView) {
      case "home":
        return <HomeView key="home" />;
      case "dashboard":
        return <DashboardView key="dashboard" />;
      case "chat":
        return <ChatInterface key="chat" />;
      case "settings":
        return <SettingsView key="settings" />;
      default:
        return <HomeView key="home" />;
    }
  };

  return (
    <ErrorBoundary>
      <RadioProvider>
        <div 
          className={`min-h-screen bg-[var(--bg-main)] text-[var(--text-main)] font-sans selection:bg-accent/30 selection:text-accent overflow-x-hidden transition-colors duration-500 ${theme}`}
        >
          {/* Ambient Background */}
          <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 bg-gradient-to-br from-transparent to-black/20">
            <motion.div 
              className="absolute top-[-20%] left-[-10%] w-[60vw] h-[60vw] blur-[150px] rounded-full" 
              style={{ backgroundColor: `${accentColor}15` }}
              animate={{ 
                x: [0, 50, 0], 
                y: [0, 30, 0],
                scale: [1, 1.1, 1]
              }}
              transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div 
              className="absolute bottom-[-20%] right-[-10%] w-[50vw] h-[50vw] blur-[120px] rounded-full"
              style={{ backgroundColor: `${accentColor}10` }}
              animate={{ 
                x: [0, -40, 0], 
                y: [0, -50, 0],
                scale: [1, 1.2, 1]
              }}
              transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            />
            <motion.div 
              className="absolute top-[30%] left-[40%] w-[40vw] h-[40vw] blur-[100px] rounded-full"
              style={{ backgroundColor: `${accentColor}08` }}
              animate={{ 
                x: [0, 30, -20, 0], 
                y: [0, -30, 20, 0],
              }}
              transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: 5 }}
            />
          </div>

          {/* Layout Structure */}
          <Sidebar />
          <Header />

          {/* Main Layout */}
          <main className={cn(
            "relative z-10 pt-28 pb-32 min-h-screen transition-all duration-500",
            isSidebarOpen ? "md:pl-[280px]" : "md:pl-[80px]"
          )}>
            <AnimatePresence mode="wait">
              <motion.div
                key={currentView}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                {renderView()}
              </motion.div>
            </AnimatePresence>
          </main>

          {/* Global UI Components */}
          <Dock />
          <BottomToggleBar />
          <FavoritesDrawer />
          <HistoryDrawer />
        </div>
      </RadioProvider>
    </ErrorBoundary>
  );
}

export default App;
