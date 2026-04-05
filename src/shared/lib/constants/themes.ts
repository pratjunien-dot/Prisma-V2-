export type Theme = 'cyan' | 'indigo' | 'violet' | 'emerald' | 'amber' | 'rose' | 'neutral';
export type ThemeMode = 'light' | 'dark' | 'oled';

export interface ThemeConfig {
  id: Theme;
  name: string;
  color: string;
}

export const THEMES: ThemeConfig[] = [
  { id: "cyan", name: "Cyber Teal", color: "#00E0C8" },
  { id: "indigo", name: "Deep Sea", color: "#6366F1" },
  { id: "violet", name: "Neon Purple", color: "#8B5CF6" },
  { id: "emerald", name: "Forest", color: "#10B981" },
  { id: "amber", name: "Gold", color: "#F59E0B" },
  { id: "rose", name: "Crimson", color: "#F43F5E" },
  { id: "neutral", name: "Monochrome", color: "#FFFFFF" },
];
