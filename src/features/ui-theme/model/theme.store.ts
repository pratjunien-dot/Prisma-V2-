import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type Theme = 'cyan' | 'indigo' | 'violet' | 'emerald' | 'amber' | 'rose' | 'neutral';
export type ThemeMode = 'light' | 'dark' | 'oled';

interface ThemeState {
  theme: Theme;
  mode: ThemeMode;
  reduceMotion: boolean;
  isUiVisible: boolean;
  setTheme: (theme: Theme) => void;
  setMode: (mode: ThemeMode) => void;
  setReduceMotion: (reduce: boolean) => void;
  toggleUi: () => void;
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      theme: 'cyan',
      mode: 'dark',
      reduceMotion: false,
      isUiVisible: true,
      setTheme: (theme) => set({ theme }),
      setMode: (mode) => set({ mode }),
      setReduceMotion: (reduceMotion) => set({ reduceMotion }),
      toggleUi: () => set((state) => ({ isUiVisible: !state.isUiVisible })),
    }),
    { name: 'prisma-theme-v2' }
  )
);
