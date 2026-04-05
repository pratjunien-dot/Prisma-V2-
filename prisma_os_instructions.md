# **Système d’Instructions Unifié — Prisma OS**

**Version 2.1 — Mise à jour 05 avril 2026**
*Aligné sur le dépôt GitHub · Architecture FSD · Option B (PersonaEngine + MemoryService + Débat)*

-----

## **📌 INSTRUCTIONS GLOBALES**

### **Contexte**

Prisma OS est une interface conversationnelle futuriste basée sur le **SDK `@google/genai`** (Gemini API), avec un design **“Liquid Glass”** et des fonctionnalités avancées :

- **Personas dynamiques** : générés et gérés via `PersonaEngine` (traits pondérés 0–100 %)
- **Mémoire long terme** persistante (`MemoryService` + Firestore)
- **Modules interactifs** : Chat (pipeline 4 phases), Débat (fusionné), Dashboard

> ⚠️ **NOTE IMPORTANTE** : L’app est générée depuis le template **Google AI Studio** (`google-gemini/aistudio-repository-template`) et déployée sur AI Studio. Ce contexte influence la gestion de l’authentification et la clé API Gemini (`GEMINI_API_KEY` dans `.env.local`).

-----

### **Stack Technique Vérifiée (package.json réel)**

|Dépendance               |Version réelle|Note critique                                           |
|-------------------------|--------------|--------------------------------------------------------|
|`react`                  |`^19.0.0`     |React 19 — Server Components non utilisés               |
|`react-dom`              |`^19.0.0`     |—                                                       |
|`react-router-dom`       |`^7.14.0`     |**v7** — API `createBrowserRouter` obligatoire          |
|`@google/genai`          |`^1.29.0`     |SDK Gemini officiel — **PAS** `@google/generative-ai`   |
|`firebase`               |`^12.11.0`    |**v12** — SDK modulaire uniquement                      |
|`zustand`                |`^5.0.12`     |**v5** — `useStore(selector)` et middleware redesignés  |
|`tailwindcss`            |`^4.1.14`     |**v4** via plugin Vite — **PAS** de `tailwind.config.js`|
|`@tailwindcss/vite`      |`^4.1.14`     |Plugin Vite pour Tailwind v4                            |
|`motion`                 |`^12.23.24`   |**PAS** `framer-motion` — package renommé `motion`      |
|`zod`                    |`^4.3.6`      |**v4** — API `z.object()` légèrement modifiée           |
|`vite`                   |`^6.2.0`      |Bundler                                                 |
|`typescript`             |`~5.8.2`      |—                                                       |
|`@radix-ui/react-slider` |`^1.3.6`      |Pour `TraitSlider`                                      |
|`@radix-ui/react-dialog` |`^1.1.15`     |Pour modales Glass                                      |
|`@radix-ui/react-select` |`^2.2.6`      |Pour sélecteurs persona                                 |
|`@radix-ui/react-tabs`   |`^1.1.13`     |Navigation onglets                                      |
|`@radix-ui/react-tooltip`|`^1.2.8`      |Tooltips                                                |
|`@radix-ui/react-switch` |`^1.2.6`      |Toggles settings                                        |
|`@tanstack/react-virtual`|`^3.13.23`    |Listes virtualisées (messages, personas)                |
|`sonner`                 |`^2.0.7`      |Notifications toast                                     |
|`react-markdown`         |`^10.1.0`     |Rendu markdown dans bulles                              |
|`date-fns`               |`^4.1.0`      |Formatage dates                                         |
|`lucide-react`           |`^0.546.0`    |Icônes                                                  |
|`clsx` + `tailwind-merge`|latest        |Utilitaires classes CSS                                 |


> ❌ **Packages absents du repo** (ne PAS les mentionner dans les prompts agents) : `framer-motion`, `postcss.config.js`, `tailwind.config.js`

-----

### **État actuel du projet (05/04/2026)**

|Feature                                                                  |Statut        |
|-------------------------------------------------------------------------|--------------|
|Base React 19 + TypeScript + Tailwind v4 + Firebase + Gemini API         |✅ **OK**      |
|Design Liquid Glass (Dock, Header, composants verre, mesh gradient animé)|✅ **OK**      |
|Météo en direct (Open-Meteo)                                             |✅ **OK**      |
|Flux RSS actualités (Google News)                                        |✅ **OK**      |
|Navigation swipe horizontal + Dock rétractable                           |✅ **OK**      |
|Views présentes : Chat, Dashboard, Debate, Settings, Home                |✅ **OK**      |
|Stores Zustand v5 + structure FSD en place                               |✅ **OK**      |
|Radio France Plugin (Header rétractable)                                 |✅ **OK**      |
|**PersonaEngine** (traits pondérés + éditeur + Firestore)                |🔴 **MANQUANT**|
|**MemoryService** (extraction Gemini + Firestore)                        |🔴 **MANQUANT**|
|**Pipeline Chat 4 phases** (Matrices → Persona → Réponse)                |🔴 **MANQUANT**|
|**Fusion Chat + Débat** (DebateView intégré dans ChatPipeline)           |🔴 **MANQUANT**|
|Persistance thème (Zustand `persist`)                                    |🟡 **PARTIEL** |
|Z-index Header (bug superposition)                                       |🟡 **BUG**     |

**Priorité absolue (Option B)** : `PersonaEngine` → `MemoryService` → `ChatPipeline 4 phases` → `Fusion Débat`

-----

## **📝 PROMPT MAÎTRE (Liaison Centrale)**

### **Règles Absolues pour l’Agent**

1. **Développer uniquement les features manquantes** listées dans le Backlog.
1. **Design Liquid Glass obligatoire** : `backdrop-blur` variable, bordures néon teal/purple, animations `motion` (package `motion`, pas `framer-motion`).
1. **Utiliser les stores existants** (`uiStore`, `personaStore`, `chatStore`, etc.) — ne jamais recréer un store existant.
1. **Tout composant/service doit être modulaire et testable** (Zustand store séparé du composant UI).
1. **Pas de données mockées** pour les features persistantes — Firestore uniquement.
1. **Imports corrects** : `import { motion } from 'motion/react'` (pas `framer-motion`).
1. **Règle UI stricte** : Jamais “S1”, “S2” dans l’UI visible. Utiliser des termes descriptifs ou des icônes.

### **Roadmap Prioritaire (2 semaines)**

**Semaine 1**

- [ ] `PersonaEngine` complet (logique + `PersonaEditor` modal + Firestore)
- [ ] `MemoryService` (extraction Gemini + stockage Firestore)

**Semaine 2**

- [ ] `ChatPipeline` 4 phases (Matrices → Persona → Streaming)
- [ ] Fusion `DebateView` dans `ChatPipeline`
- [ ] Polissage UX (Z-index Header, persistance thème Zustand, `sonner` notifications)

-----

## **💬 PROMPT ESCLAVE 1 : CHAT PIPELINE (4 Phases)**

### **Objectif**

Implémenter le pipeline conversationnel séquentiel complet, fondement de toute l’expérience Prisma OS.

### **Pipeline (flux exact)**

```
[1] Saisie utilisateur
        ↓
[2] Gemini génère 3 Matrices (6 variables chacune)
    Variables : Ton, Lexique, Abstraction, Biais, Signature, Créativité
        ↓
[3] Utilisateur sélectionne 1 Matrice
        ↓
[4] Gemini génère 3 Personas (basés sur input + matrice sélectionnée)
        ↓
[5] Utilisateur sélectionne 1 Persona (⭐ peut le mettre en favori)
        ↓
[6] Réponse Gemini en streaming (avec persona comme system prompt)
```

### **Fichiers à créer / mettre à jour**

- `src/features/chat-pipeline/model/chat.store.ts` — FSM à 6 états : `IDLE | GENERATING_MATRICES | SELECTING_MATRIX | GENERATING_PERSONAS | SELECTING_PERSONA | STREAMING`
- `src/features/chat-pipeline/ui/ChatWindow.tsx` — orchestrateur principal
- `src/features/chat-pipeline/ui/MatrixSelector.tsx` — sélecteur 3 matrices (cards glass)
- `src/features/chat-pipeline/ui/PersonaSelectorStep.tsx` — sélecteur 3 personas (avec bouton favori)
- `src/features/chat-pipeline/ui/MessageBubble.tsx` — bulles Liquid Glass (rendu via `react-markdown`)
- `src/features/chat-pipeline/ui/gemini.adapter.ts` — adapter `@google/genai` (streaming)

### **Spécifications Techniques**

- **Streaming** : utiliser `generateContentStream()` du SDK `@google/genai`
- **Matrice** : objet `{ ton: string, lexique: string, abstraction: string, biais: string, signature: string, creativite: number }`
- **FSM** : les états avancent linéairement, retour possible uniquement vers `IDLE`
- **Favoris** : les personas sélectionnés peuvent être sauvegardés dans Firestore (`/users/{userId}/favoritePersonas/{personaId}`)

### **Bulles Liquid Glass (CSS)**

```css
/* MessageBubble — user */
.bubble-user {
  background: rgba(var(--accent-rgb), 0.15);
  border: 1px solid rgba(var(--accent-rgb), 0.3);
  backdrop-filter: blur(12px);
  border-radius: 1.25rem 1.25rem 0.25rem 1.25rem;
}
/* MessageBubble — model */
.bubble-model {
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.12);
  backdrop-filter: blur(12px);
  border-radius: 1.25rem 1.25rem 1.25rem 0.25rem;
}
```

### **Intégration Mode Débat**

Le `ChatWindow` doit exposer une prop `mode: 'chat' | 'debate'`. En mode `debate` :

- Affichage VS screen (Persona A vs Persona B)
- Tour par tour géré par un FSM secondaire dans `debate.store.ts`
- Bouton **“Juge IA”** déclenche une analyse Gemini et affiche un verdict (score + argumentation)

-----

## **🧬 PROMPT ESCLAVE 2 : PERSONAENGINE (Priorité #1)**

### **Objectif**

Créer un moteur complet de génération, édition et persistance de personas dynamiques avec traits pondérés.

### **Schéma Firestore Réel (firebase-blueprint.json)**

```typescript
// Entité Persona (à étendre avec traits)
interface Persona {
  id: string;
  name: string;
  icon: string;                          // emoji ou initiales
  attributes: Record<string, string | string[]>; // champs libres existants
  traits?: PersonaTraits;               // NOUVEAU — à ajouter
  createdAt: Timestamp;
}

interface PersonaTraits {
  creativite: number;    // 0–100
  empathie: number;      // 0–100
  rigueur: number;       // 0–100
  humour: number;        // 0–100
  directivite: number;   // 0–100
  curiosite: number;     // 0–100
  assertivite: number;   // 0–100
  poetique: number;      // 0–100
  // minimum 8 traits
}

// Chemin Firestore
// /users/{userId}/favoritePersonas/{personaId}
```

### **Fichiers à créer / mettre à jour**

- `src/features/create-persona/model/persona-engine.ts` — service principal
- `src/features/create-persona/ui/PersonaEditor.tsx` — modal Liquid Glass full-screen
- `src/shared/ui/organisms/PersonaCard.tsx` — card avec `QuickActionOverlay`
- `src/shared/ui/molecules/TraitSlider.tsx` — slider `@radix-ui/react-slider` + gradient couleur
- `src/stores/personaStore.ts` — mise à jour Zustand v5

### **Spécifications Techniques**

**`persona-engine.ts`**

```typescript
import { GoogleGenAI } from '@google/genai';

class PersonaEngine {
  // Génère un persona aléatoire via Gemini
  async generateRandom(context?: string): Promise<Partial<Persona>>;
  // Génère la phrase d'exemple (aperçu live)
  async generatePreviewText(traits: PersonaTraits): Promise<string>;
  // Sauvegarde dans Firestore
  async save(userId: string, persona: Persona): Promise<void>;
  // Supprime de Firestore
  async delete(userId: string, personaId: string): Promise<void>;
  // Liste les personas sauvegardés
  async list(userId: string): Promise<Persona[]>;
}
```

**`PersonaEditor.tsx`** (Radix `Dialog`)

- Fond très flou (`backdrop-blur-3xl`) + bordure néon teal
- Grille : Sliders à gauche | Preview à droite
- `TraitSlider` : `@radix-ui/react-slider` + gradient `from-blue-500 to-purple-500`
- Preview avatar : couleur dominante (calculée depuis traits) + initiales + phrase d’exemple (Gemini, debounced 800ms)
- Boutons : **Générer Aléatoire** / **Sauvegarder** / **Utiliser** / **Supprimer**
- Notifications via `sonner` (toast)

**`PersonaCard.tsx`**

- Affiche nom, icon, 3 traits dominants (barres visuelles)
- `QuickActionOverlay` (hover/tap) : Utiliser | Éditer | Débat | Supprimer

-----

## **🧠 PROMPT ESCLAVE 3 : MEMORYSERVICE (Priorité #2)**

### **Objectif**

Stocker et restituer la mémoire long terme des conversations associée à chaque persona.

### **Schéma Firestore Réel**

```typescript
// Chemin : /users/{userId}/favoritePersonas/{personaId}/memory/data
interface MemoryBank {
  topics: string[];            // sujets abordés
  preferences: string[];       // préférences détectées de l'utilisateur
  sessions_summary: string;    // résumé cumulatif des sessions (généré par Gemini)
}
```

### **Fichiers à créer**

- `src/features/memory-service/model/memory-service.ts`
- `src/features/memory-service/ui/MemorySidebar.tsx` — panneau latéral tiroir

### **Fonctionnalités**

**Extraction automatique** (appelée en fin de conversation)

```typescript
async extractAndStore(userId: string, personaId: string, messages: Message[]): Promise<void>
// → Appelle Gemini avec les messages pour extraire topics + préférences
// → Fusionne avec MemoryBank existant (append, pas replace)
// → Met à jour sessions_summary
// → Sauvegarde dans Firestore
```

**Récupération contextuelle** (appelée avant chaque message)

```typescript
async getContext(userId: string, personaId: string): Promise<string>
// → Charge MemoryBank depuis Firestore
// → Retourne une chaîne formatée à injecter dans le system prompt Gemini
// → Format : "Ce que tu sais de l'utilisateur : [topics] [préférences]"
```

**MemorySidebar**

- Tiroir latéral droit (slide-in avec `motion`)
- Liste les `topics` et `preferences` comme chips/badges
- Bouton “Effacer la mémoire” (avec confirmation `@radix-ui/react-dialog`)
- Résumé de session en bas

-----

## **⚔️ PROMPT ESCLAVE 4 : FUSION CHAT + DÉBAT**

### **Objectif**

Intégrer `DebateView` (`src/components/DebateView.tsx`) directement dans `ChatWindow` en tant que mode secondaire, sans navigation séparée.

### **Fichiers à créer**

- `src/features/debate-arena/model/debate.store.ts` — Zustand v5
- `src/features/debate-arena/api/judge.adapter.ts` — appel Gemini pour verdict

### **Spécifications du Store**

```typescript
// debate.store.ts — FSM débat
type DebateState = 'IDLE' | 'SETUP' | 'ROUND_A' | 'ROUND_B' | 'JUDGING' | 'VERDICT';

interface DebateStore {
  state: DebateState;
  subject: string;
  personaA: Persona | null;
  personaB: Persona | null;
  rounds: DebateRound[];    // { personaId, argument, score? }[]
  verdict: JudgeVerdict | null;
  // Actions
  setSubject: (s: string) => void;
  setPersonas: (a: Persona, b: Persona) => void;
  nextRound: () => void;
  requestJudge: () => Promise<void>;
  reset: () => void;
}
```

### **Juge IA**

```typescript
// judge.adapter.ts
async function judgeDebate(subject: string, rounds: DebateRound[]): Promise<JudgeVerdict>
// → Prompt Gemini structuré : analyse les arguments, évalue neutralité/pertinence
// → Retourne { winner: string, scores: Record<personaId, number>, analysis: string }
```

-----

## **🗄️ SCHÉMA FIRESTORE COMPLET (firebase-blueprint.json)**

```
/users/{userId}
├── uid, email, displayName, createdAt

/users/{userId}/favoritePersonas/{personaId}
├── id, name, icon, attributes, traits?, createdAt

/users/{userId}/favoritePersonas/{personaId}/memory/data
├── topics: string[]
├── preferences: string[]
└── sessions_summary: string

/chats/{chatId}
├── userId, title, selectedPersona (Persona ref), updatedAt

/chats/{chatId}/messages/{messageId}
├── id, chatId, userId, role (user|model), content, responses[], createdAt
```

> ⚠️ **Lors de l’ajout de nouvelles collections**, toujours mettre à jour `firebase-blueprint.json` ET `firestore.rules`.

-----

## **📋 BACKLOG MIS À JOUR**

### **✅ Terminé**

- [x] Dock propre, centré, respectant la largeur du Header
- [x] Radio Plugin (tiroir large, grille 2-3 colonnes, 9+ stations)
- [x] Suppression des indicateurs “S1/S2” dans l’UI
- [x] Météo (Open-Meteo) et News (RSS) en direct
- [x] Navigation swipe horizontal (`App.tsx`)
- [x] Schéma Firestore de base (users, personas, chats, messages, memory)

### **🔴 À faire — Semaine 1**

1. **`PersonaEngine`** : `persona-engine.ts` + `PersonaEditor.tsx` + `PersonaCard.tsx` + `TraitSlider.tsx`
1. **`MemoryService`** : `memory-service.ts` + `MemorySidebar.tsx`
1. **Mise à jour `personaStore.ts`** : intégrer les actions `PersonaEngine`

### **🔴 À faire — Semaine 2**

1. **`ChatPipeline` 4 phases** : FSM + `MatrixSelector` + `PersonaSelectorStep` + streaming
1. **Fusion Débat** : `debate.store.ts` + `judge.adapter.ts` + intégration dans `ChatWindow`
1. **Persistance thème** : `zustand/middleware` `persist` pour `uiStore` (thème + accent)
1. **Fix Z-index Header** : `z-50` sur `Header.tsx`, vérifier conflits avec modales Radix

### **🟡 Polissage UX (post-semaine 2)**

1. Notifications `sonner` (sauvegarde persona, erreurs Firestore, copie message)
1. Listes virtualisées `@tanstack/react-virtual` (longues conversations)
1. Validation `zod v4` sur les formulaires `PersonaEditor`
1. Tests Vitest sur `persona-engine.ts` et `memory-service.ts`

-----

## **📂 ARBORESCENCE PRISMA V2 — ÉTAT RÉEL**

### **🟢 Fichiers Actifs (Confirmés)**

|# |Chemin                                            |Rôle                                        |
|--|--------------------------------------------------|--------------------------------------------|
|1 |`src/App.tsx`                                     |Root Layout & Routing (react-router-dom v7) |
|2 |`src/main.tsx`                                    |Entry point                                 |
|3 |`src/app/layouts/AppShell.tsx`                    |Container principal                         |
|4 |`src/widgets/dock/ui/Dock.tsx`                    |Navigation principale                       |
|5 |`src/widgets/header/ui/Header.tsx`                |Barre système + Radio rétractable           |
|6 |`src/widgets/sidebar/ui/Sidebar.tsx`              |Drawer navigation                           |
|7 |`src/widgets/radio-plugin/ui/RadioPlugin.tsx`     |Hub audio                                   |
|8 |`src/widgets/weather/ui/WeatherWidget.tsx`        |Données météo live                          |
|9 |`src/widgets/news/ui/NewsWidget.tsx`              |Flux RSS                                    |
|10|`src/features/chat-pipeline/ui/ChatWindow.tsx`    |Moteur Chat                                 |
|11|`src/features/chat-pipeline/ui/MessageBubble.tsx` |Bulle UI                                    |
|12|`src/features/ui-theme/model/theme.store.ts`      |Logique thème                               |
|13|`src/stores/uiStore.ts`                           |State UI global                             |
|14|`src/shared/ui/atoms/Glass.tsx`                   |Composant UI core                           |
|15|`src/shared/ui/atoms/ParticleBackground.tsx`      |FX visuels                                  |
|16|`src/shared/api/firebase.ts`                      |Config Firebase v12                         |
|17|`src/shared/lib/audio/RadioContext.tsx`           |Logique audio                               |
|18|`src/shared/lib/utils.ts`                         |Helpers                                     |
|19|`src/styles/globals.css`                          |Tailwind v4 + variables CSS                 |
|20|`src/features/auth/model/auth.store.ts`           |State utilisateur                           |
|21|`src/features/chat-pipeline/api/gemini.adapter.ts`|Bridge AI (`@google/genai`)                 |
|22|`src/entities/persona/model/types.ts`             |Schéma Persona                              |
|23|`src/entities/message/model/types.ts`             |Schéma Message                              |
|24|`src/entities/memory/model/types.ts`              |Schéma MemoryBank                           |
|25|`src/components/Bootloader.tsx`                   |Splash Screen                               |
|26|`src/components/ErrorBoundary.tsx`                |Sécurité                                    |
|27|`src/components/ChatInterface.tsx`                |Vue Chat principale                         |
|28|`src/components/DashboardView.tsx`                |Vue Hub                                     |
|29|`src/components/DebateView.tsx`                   |Vue Arène — **À fusionner**                 |
|30|`src/components/SettingsView.tsx`                 |Vue Config                                  |
|31|`src/components/HomeView.tsx`                     |Vue Landing                                 |
|32|`src/components/ProfileMenu.tsx`                  |Actions utilisateur                         |
|33|`src/components/FavoritesDrawer.tsx`              |Accès rapide                                |
|34|`src/components/HistoryDrawer.tsx`                |Logs                                        |
|35|`src/components/BottomToggleBar.tsx`              |Contrôle UI                                 |
|36|`src/widgets/weather/api/weather.service.ts`      |Service API météo                           |
|37|`src/widgets/news/api/news.service.ts`            |Service RSS                                 |
|38|`src/lib/useSwipeGesture.ts`                      |Helper UX swipe                             |
|39|`firebase-blueprint.json`                         |Schéma DB (source de vérité)                |
|40|`firestore.rules`                                 |Sécurité Firestore                          |
|41|`package.json`                                    |Dépendances                                 |
|42|`metadata.json`                                   |Métadonnées app (AI Studio)                 |
|43|`.env.example`                                    |Variables d’env (`GEMINI_API_KEY`, Firebase)|
|44|`index.html`                                      |HTML root                                   |
|45|`src/types.ts`                                    |Types globaux                               |
|46|`firebase-applet-config.json`                     |Config déploiement AI Studio                |
|47|`vite.config.ts`                                  |Config Vite 6 + plugin Tailwind v4          |
|48|`tsconfig.json`                                   |Config TypeScript 5.8                       |
|49|`eslint.config.js`                                |Config ESLint 10                            |

### **🟡 Fichiers en Cours de Développement**

|# |Chemin                                               |Rôle                   |
|--|-----------------------------------------------------|-----------------------|
|50|`src/features/create-persona/model/persona-engine.ts`|**PRIORITÉ #1**        |
|51|`src/features/create-persona/ui/PersonaEditor.tsx`   |Modal édition persona  |
|52|`src/features/memory-service/model/memory-service.ts`|**PRIORITÉ #2**        |
|53|`src/features/memory-service/ui/MemorySidebar.tsx`   |Panneau mémoire        |
|54|`src/features/debate-arena/model/debate.store.ts`    |Store débat FSM        |
|55|`src/features/debate-arena/api/judge.adapter.ts`     |Verdict Gemini         |
|56|`src/shared/ui/organisms/PersonaCard.tsx`            |Card persona           |
|57|`src/shared/ui/molecules/TraitSlider.tsx`            |Radix Slider + gradient|
|58|`src/shared/ui/atoms/NeonBorder.tsx`                 |Bordure néon animée    |
|59|`src/shared/lib/hooks/useVoice.ts`                   |TTS/STT hook           |
|60|`src/shared/lib/hooks/useTTS.ts`                     |Text-to-speech         |
|61|`src/services/storage/firestore.service.ts`          |Abstraction Firestore  |
|62|`src/entities/debate/model/types.ts`                 |Types débat            |
|63|`src/features/chat-pipeline/model/chat.store.ts`     |Store FSM chat pipeline|

### **🔴 Fichiers Legacy (À Supprimer après migration)**

|# |Chemin                                    |Raison                                  |
|--|------------------------------------------|----------------------------------------|
|64|`src/components/Dock.tsx`                 |Doublon de `widgets/dock`               |
|65|`src/components/Header.tsx`               |Doublon de `widgets/header`             |
|66|`src/components/Sidebar.tsx`              |Doublon de `widgets/sidebar`            |
|67|`src/ui/Glass.tsx`                        |Doublon de `shared/ui/atoms/Glass.tsx`  |
|68|`src/ui/Button.tsx`                       |Ancien style (utiliser composants Radix)|
|69|`src/components/GlassSkeleton.tsx`        |Obsolète                                |
|70|`src/features/auth/api/firebase.config.ts`|Fusionné dans `shared/api/firebase.ts`  |
|71|`src/features/auth/api/auth.gateway.ts`   |Fusionné dans `shared/api/firebase.ts`  |
|72|`src/entities/schemas.ts`                 |Divisé en types par entité              |
|73|`src/features/chat-with-persona/`         |Ancienne structure (remplacée par FSD)  |

### **🔵 Fichiers Config (Maintenance)**

|# |Chemin                                   |Note                     |
|--|-----------------------------------------|-------------------------|
|74|`README.md`                              |À mettre à jour          |
|75|`src/vite-env.d.ts`                      |Typage env Vite          |
|76|`public/favicon.ico`                     |—                        |
|77|`public/manifest.json`                   |PWA manifest             |
|78|`src/assets/logo.svg`                    |—                        |
|79|`src/assets/noise.png`                   |Texture Glass            |
|80|`src/assets/mesh-gradient.svg`           |Background animé         |
|81|`src/shared/lib/constants/personas.ts`   |Personas prédéfinis      |
|82|`src/shared/lib/constants/themes.ts`     |Tokens 7 thèmes          |
|83|`src/shared/lib/hooks/useLocalStorage.ts`|Hook stockage            |
|84|`src/shared/lib/hooks/useMediaQuery.ts`  |Hook responsive          |
|85|`src/shared/ui/atoms/Icon.tsx`           |Icônes (Lucide)          |
|86|`src/shared/ui/atoms/Input.tsx`          |Input Glass              |
|87|`src/shared/ui/atoms/Badge.tsx`          |Badge/chip               |
|88|`src/shared/ui/molecules/Modal.tsx`      |Modal base (Radix Dialog)|
|89|`src/shared/ui/molecules/Tooltip.tsx`    |Tooltip (Radix)          |
|90|`src/shared/ui/organisms/Navigation.tsx` |Navigation organism      |
|91|`src/shared/ui/templates/MainLayout.tsx` |Layout principal         |
|92|`src/shared/ui/templates/GlassLayout.tsx`|Layout verre             |


> ❌ **Fichiers inexistants dans le repo** (ne PAS les créer ni les référencer) : `tailwind.config.js`, `postcss.config.js`

-----

## **🔧 PROMPT ESCLAVE 5 : Directives Agent AI Studio**

### **Règles d’Exécution (Agent Logic)**

1. **Read-Modify-Write strict** : Toujours `view_file` avant tout `edit_file` ou `multi_edit_file`. Ne jamais présumer du contenu exact d’un fichier.
1. **Vérification dépendances** : Contrôler `package.json` avant d’installer. Ne pas installer `framer-motion` (déjà couvert par `motion`).
1. **Imports `motion`** : Toujours `import { motion, AnimatePresence } from 'motion/react'` — jamais `framer-motion`.
1. **Firebase v12 (modulaire)** : `import { doc, getDoc, setDoc } from 'firebase/firestore'` — jamais l’ancienne syntaxe namespaced.
1. **Zustand v5** : `create<State>()((set, get) => ({ ... }))` — `subscribeWithSelector` middleware si besoin.
1. **Tailwind v4** : Variables CSS `var(--color-*)` et `@theme` dans `globals.css` — pas de fichier config externe.
1. **Gestion erreurs Firestore** : Toujours bloc `try/catch` avec `sonner` toast pour notifier l’utilisateur.
1. **Après chaque modification logique** : `lint_applet` puis `compile_applet`.
1. **Mise à jour schema** : Toute nouvelle collection Firestore → mettre à jour `firebase-blueprint.json` + `firestore.rules`.
1. **Nettoyage Legacy** : Supprimer les fichiers #64–73 uniquement après avoir vérifié qu’aucun import ne les référence.

### **Variables CSS Design System (globals.css)**

```css
/* À utiliser systématiquement pour la cohérence des thèmes */
var(--surface-1)       /* fond principal */
var(--surface-2)       /* fond secondaire */
var(--surface-glass)   /* fond verre (avec opacity) */
var(--accent)          /* couleur néon principale */
var(--accent-rgb)      /* valeur RGB pour rgba() */
var(--border-glass)    /* bordure verre */
var(--text-primary)    /* texte principal */
var(--text-secondary)  /* texte secondaire */
```

### **Pattern de Composant Liquid Glass (référence)**

```tsx
// Composant Glass standard
import { motion } from 'motion/react'; // ← TOUJOURS motion, pas framer-motion

export const GlassCard = ({ children }: { children: React.ReactNode }) => (
  <motion.div
    initial={{ opacity: 0, y: 8 }}
    animate={{ opacity: 1, y: 0 }}
    className="
      rounded-2xl
      bg-[var(--surface-glass)]
      border border-[var(--border-glass)]
      backdrop-blur-xl
      shadow-[0_0_24px_rgba(var(--accent-rgb),0.15)]
    "
  >
    {children}
  </motion.div>
);
```

-----

## **📊 RÉSUMÉ EXÉCUTIF**

|Dimension                    |Valeur                                                                            |
|-----------------------------|----------------------------------------------------------------------------------|
|Fichiers actifs confirmés    |**49**                                                                            |
|Fichiers en développement    |**14**                                                                            |
|Fichiers legacy à supprimer  |**10**                                                                            |
|Features critiques manquantes|**4** (PersonaEngine, MemoryService, ChatPipeline 4ph, Débat fusionné)            |
|Tech debt principal          |`motion` vs `framer-motion`, Zustand v5 patterns, Radix UI à utiliser uniformément|
|Déploiement                  |**Google AI Studio** + Firestore                                                  |

-----

*Document maintenu à la main — source de vérité : `firebase-blueprint.json` (schéma DB) + `package.json` (stack réelle)*
*Dernière synchronisation avec le dépôt : 05 avril 2026*
