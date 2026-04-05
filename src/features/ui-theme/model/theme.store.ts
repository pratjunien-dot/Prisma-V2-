import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Theme, ThemeMode, THEMES } from '../../../shared/lib/constants/themes';

export type { Theme, ThemeMode };

interface ThemeState {
  theme: Theme;
  mode: ThemeMode;
  accentColor: string;
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
      accentColor: THEMES.find(t => t.id === 'cyan')?.color || '#00E0C8',
      reduceMotion: false,
      isUiVisible: true,
      setTheme: (theme) => set({ 
        theme, 
        accentColor: THEMES.find(t => t.id === theme)?.color || '#00E0C8' 
      }),
      setMode: (mode) => set({ mode }),
      setReduceMotion: (reduceMotion) => set({ reduceMotion }),
      toggleUi: () => set((state) => ({ isUiVisible: !state.isUiVisible })),
    }),
    { name: 'prisma-theme-v2' }
  )
);
