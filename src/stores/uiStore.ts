import { create } from "zustand";
import { persist } from "zustand/middleware";

export type ViewType = "home" | "dashboard" | "chat" | "debate" | "settings";

interface UIState {
  currentView: ViewType;
  theme: "dark" | "light" | "oled";
  accentColor: string;
  isSidebarOpen: boolean;
  isExpanded: boolean;
  isFavoritesOpen: boolean;
  isHistoryOpen: boolean;
  
  // Actions
  setView: (view: ViewType) => void;
  setTheme: (theme: "dark" | "light" | "oled") => void;
  setAccentColor: (color: string) => void;
  toggleSidebar: () => void;
  toggleExpanded: () => void;
  toggleFavorites: () => void;
  toggleHistory: () => void;
}

export const useUIStore = create<UIState>()(
  persist(
    (set) => ({
      currentView: "dashboard",
      theme: "dark",
      accentColor: "#00E0C8",
      isSidebarOpen: true,
      isExpanded: true,
      isFavoritesOpen: false,
      isHistoryOpen: false,

      setView: (currentView) => set({ currentView }),
      setTheme: (theme) => set({ theme }),
      setAccentColor: (accentColor) => set({ accentColor }),
      toggleSidebar: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
      toggleExpanded: () => set((state) => ({ isExpanded: !state.isExpanded })),
      toggleFavorites: () => set((state) => ({ isFavoritesOpen: !state.isFavoritesOpen })),
      toggleHistory: () => set((state) => ({ isHistoryOpen: !state.isHistoryOpen })),
    }),
    {
      name: "ui-storage",
    }
  )
);
