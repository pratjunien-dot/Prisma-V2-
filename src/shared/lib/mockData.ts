export const ACCENT = "#00e0c8";
export const ACCENT2 = "#0090dd";
export const BG = "#060b10";
export const SURFACE = "rgba(255,255,255,0.035)";
export const GLASS = "rgba(255,255,255,0.05)";
export const GLASS_BORDER = "rgba(255,255,255,0.08)";
export const TEXT = "#e4f4f4";
export const TEXT_DIM = "#5a7a7a";
export const TEXT_MUTED = "#2e4a4a";

export const RADIO_STATIONS = [
  { name: "France Inter", freq: "87.8", stream: "https://icecast.radiofrance.fr/franceinter-midfi.mp3" },
  { name: "France Culture", freq: "93.5", stream: "https://icecast.radiofrance.fr/franceculture-midfi.mp3" },
  { name: "France Musique", freq: "91.7", stream: "https://icecast.radiofrance.fr/francemusique-midfi.mp3" },
  { name: "FIP", freq: "105.1", stream: "https://icecast.radiofrance.fr/fip-midfi.mp3" },
];

export const AXES_LABELS = ["Ton", "Lexique", "Abstraction", "Biais", "Signature", "Créativité"];
export const AXES_POLES = [
  ["Glacial", "Volcanique"],
  ["Technique", "Poétique"],
  ["Terre-à-terre", "Cosmique"],
  ["Analytique", "Intuitif"],
  ["Neutre", "Excentrique"],
  ["Prévisible", "Chaotique"],
];

const PERSONA_NAMES = ["Nyx", "Axiom", "Drift", "Prism", "Echo", "Vertex", "Lyra", "Onyx", "Cipher", "Nova", "Rune", "Flux", "Aria", "Zenith", "Kairos", "Vega", "Sable", "Helix"];
const PERSONA_TAGLINES = [
  "La vérité est une équation incomplète",
  "Le chaos est le premier pas vers l'ordre",
  "Chaque mot est une architecture invisible",
  "Je pense donc je doute",
  "L'univers est un poème mal traduit",
  "Les données ne mentent pas, mais elles omettent",
  "L'absurde est la seule certitude",
  "Entre les lignes, le vrai sens attend",
  "La simplicité est la sophistication ultime",
];

export const MOCK_WEATHER = { temp: 18, condition: "Partiellement nuageux", city: "Paris", high: 21, low: 13, icon: "⛅" };
export const MOCK_NEWS = [
  { title: "L'IA générative transforme la création musicale en Europe", source: "Le Monde", time: "2h" },
  { title: "Sommet climat : nouveaux engagements des pays du G20", source: "France Info", time: "4h" },
  { title: "SpaceX annonce la mission Artemis IV pour 2027", source: "Reuters", time: "5h" },
  { title: "Record de fréquentation pour les musées nationaux", source: "Le Figaro", time: "7h" },
];

const rand = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;
const pick = <T>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];

export const genAxesValues = () => AXES_LABELS.map((_, i) => {
  const v = rand(10, 95);
  return { label: AXES_LABELS[i], value: v, left: AXES_POLES[i][0], right: AXES_POLES[i][1] };
});

export const genMatrix = () => ({ id: Math.random().toString(36).slice(2, 8), axes: genAxesValues() });

export const genPersona = (matrix: { axes: { label: string; value: number; left: string; right: string; }[] }) => ({
  id: Math.random().toString(36).slice(2, 8),
  name: pick(PERSONA_NAMES),
  tagline: pick(PERSONA_TAGLINES),
  axes: matrix.axes.map((a) => ({ ...a, value: a.value + rand(-12, 12) })),
  color: `hsl(${rand(150, 220)}, ${rand(60, 90)}%, ${rand(55, 75)}%)`,
});
