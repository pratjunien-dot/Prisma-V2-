# **Système d'instructions Unifié pour Prisma OS**
**Version 2.0 — Mise à jour 05 avril 2026**
*Architecture Modulaire + Focus Option B (PersonaEngine + MemoryService + Débat)*

---

## **📌 INSTRUCTIONS GLOBALES**

### **Contexte**
Prisma OS est une interface conversationnelle futuriste basée sur **Gemini 3.1**, avec un design **"Liquid Glass"** et des fonctionnalités avancées :
- **Personas dynamiques** générés et gérés via `PersonaEngine`
- **Mémoire long terme** persistante (`MemoryService` + Firestore)
- **Modules interactifs** : Chat, Débat (fusionné), Dashboard

**État actuel du projet (05/04/2026)**
- Base React 19 + TypeScript + Tailwind v4 + Firebase + Gemini : **OK**
- Design Glass implémenté (Dock centré, Header épuré, Radio drawer large) : **OK**
- Météo et News en direct (Open-Meteo / Google News) : **OK**
- Navigation swipe et Dock rétractable : **OK**
- Stores Zustand et structure feature-sliced : **OK**

**Priorité absolue (Option B choisie)** : Compléter **PersonaEngine**, **MemoryService** et fusionner **DebateView** dans le Chat.

---

## **📝 PROMPT MAÎTRE (Liaison Centrale)**

### **Instructions Générales**
1. Développer **uniquement** les features manquantes listées ci-dessous.
2. Respecter à 100 % le design **Liquid Glass** (backdrop-blur variable, bordures néon teal/purple, animations Framer Motion fluides).
3. Utiliser les stores existants (`uiStore`, `personaStore`, `chatStore`, etc.).
4. Tout nouveau composant/service doit être modulaire et testable.

### **Roadmap prioritaire (2 prochaines semaines)**
1. **PersonaEngine** (semaine 1) → le plus visible
2. **MemoryService** (semaine 1-2)
3. **Fusion Chat + Débat** (semaine 2)
4. Polissage UX (Z-index header, persistance thème, navigation swipe, radio persistante)

---

## **💬 PROMPT ESCLAVE 1 : CHAT PAGE (ChatInterface & Fusion Débat)**

### **Objectif**
Transformer l'interface de chat en une expérience immersive "Liquid Glass" intégrant nativement le mode Débat.

### **Fonctionnalités Clés**
- **Bulles Liquid Glass** : Effet de verre avec bordure lumineuse (`border-white/20`).
- **Mode Débat Intégré** : Possibilité de lancer un débat entre deux personas directement depuis l'interface de chat.
- **Accent Persona** : La couleur de l'accent (néon) change dynamiquement selon le persona sélectionné.
- **Memory Sidebar** : Un panneau latéral (tiroir) affichant les "Souvenirs" (memories) extraits par le `MemoryService`.
- **Persona Switcher** : Dropdown rapide pour changer de persona sans quitter la conversation.
- **Juge IA** : Intégration du verdict Gemini directement dans le flux du chat de débat.

---

## **🧬 PROMPT ESCLAVE 2 : PERSONAENGINE (Priorité #1)**

### **Objectif**
Créer un moteur qui permet de générer, éditer et utiliser des personas dynamiques avec traits pondérés.

### **Composants à créer / mettre à jour**
- `src/features/create-persona/model/persona-engine.ts` (service principal)
- `src/features/create-persona/ui/PersonaEditor.tsx` (modal full glass)
- `src/shared/ui/organisms/PersonaCard.tsx` (avec QuickActionOverlay amélioré)
- Mise à jour de `personaStore.ts`

### **Spécifications techniques**
- Traits pondérés (0-100 %) : Créativité, Empathie, Rigueur, Humour, Directivité, Curiosité, etc. (minimum 8 traits)
- Génération IA : bouton “Générer persona aléatoire” via Gemini.
- Preview avatar : couleur dominante + initiales + effet glass + petit texte d’exemple généré en live.
- Sauvegarde Firestore (`personas` collection).

---

## **🧠 PROMPT ESCLAVE 3 : MEMORYSERVICE (Priorité #2)**

### **Objectif**
Stocker et restituer la mémoire long-terme des conversations et des personas.

### **Composants à créer**
- `src/features/memory-service/model/memory-service.ts`
- Mise à jour `chatStore.ts` et `personaStore.ts`

### **Fonctionnalités**
- Extraction automatique de “souvenirs” après chaque conversation (via Gemini résumé).
- Stockage Firestore (`memories` collection avec userId + personaId).
- Récupération contextuelle : à chaque nouveau message, charger les 3-5 souvenirs les plus pertinents.

---

## **📋 BACKLOG MIS À JOUR**

### **✅ Terminé**
- [x] Dock propre, centré et respectant la largeur du Header.
- [x] Tiroir Radio large (grille 2-3 colonnes, 9+ stations).
- [x] Suppression des indicateurs "S1/S2" (UI propre).
- [x] Météo et News en direct.
- [x] Navigation Swipe (App.tsx).

### **🚀 En cours / À faire**
1. **PersonaEngine** : Logique de génération + `PersonaEditor`.
2. **MemoryService** : Intégration Firestore + extraction Gemini.
3. **Fusion Chat + Débat** : Intégrer la logique de `DebateView` dans `ChatPipeline`.
4. **Persistance Thème** : Utiliser Zustand `persist` pour le thème et l'accent.
5. **Z-index Header** : Correction du bug de superposition.

---

## **📂 ARBORESCENCE PRISMA V2 (95 Fichiers)**

### **🟢 Fichiers Actifs (Liés à l'App)**
1. `src/App.tsx` (Root Layout & Routing)
2. `src/main.tsx` (Entry point)
3. `src/app/layouts/AppShell.tsx` (Main Container)
4. `src/widgets/dock/ui/Dock.tsx` (Main Navigation)
5. `src/widgets/header/ui/Header.tsx` (System Bar)
6. `src/widgets/sidebar/ui/Sidebar.tsx` (Navigation Drawer)
7. `src/widgets/radio-plugin/ui/RadioPlugin.tsx` (Audio Hub)
8. `src/widgets/weather/ui/WeatherWidget.tsx` (Live Data)
9. `src/widgets/news/ui/NewsWidget.tsx` (RSS Feed)
10. `src/features/chat-pipeline/ui/ChatWindow.tsx` (Chat Engine)
11. `src/features/chat-pipeline/ui/MessageBubble.tsx` (UI Bubble)
12. `src/features/ui-theme/model/theme.store.ts` (Theme Logic)
13. `src/stores/uiStore.ts` (Global UI State)
14. `src/shared/ui/atoms/Glass.tsx` (Core UI Component)
15. `src/shared/ui/atoms/ParticleBackground.tsx` (Visual FX)
16. `src/shared/api/firebase.ts` (Backend Config)
17. `src/shared/lib/audio/RadioContext.tsx` (Audio Logic)
18. `src/shared/lib/utils.ts` (Helpers)
19. `src/styles/globals.css` (Tailwind v4)
20. `src/features/auth/model/auth.store.ts` (User State)
21. `src/features/chat-pipeline/api/gemini.adapter.ts` (AI Bridge)
22. `src/entities/persona/model/types.ts` (Data Schema)
23. `src/entities/message/model/types.ts` (Data Schema)
24. `src/entities/memory/model/types.ts` (Data Schema)
25. `src/components/Bootloader.tsx` (Splash Screen)
26. `src/components/ErrorBoundary.tsx` (Safety)
27. `src/components/ChatInterface.tsx` (Main Chat View)
28. `src/components/DashboardView.tsx` (Hub View)
29. `src/components/DebateView.tsx` (Arena View - To be merged)
30. `src/components/SettingsView.tsx` (Config View)
31. `src/components/HomeView.tsx` (Landing View)
32. `src/components/ProfileMenu.tsx` (User Actions)
33. `src/components/FavoritesDrawer.tsx` (Quick Access)
34. `src/components/HistoryDrawer.tsx` (Logs)
35. `src/components/BottomToggleBar.tsx` (UI Control)
36. `src/widgets/weather/api/weather.service.ts` (API Service)
37. `src/widgets/news/api/news.service.ts` (RSS Service)
38. `src/lib/useSwipeGesture.ts` (UX Helper)
39. `firebase-blueprint.json` (DB Schema)
40. `firestore.rules` (Security)
41. `package.json` (Dependencies)
42. `metadata.json` (App Metadata)
43. `.env.example` (Environment)
44. `index.html` (HTML Root)
45. `src/types.ts` (Global Types)

### **🟡 Fichiers en cours de développement (Liaison future)**
46. `src/features/create-persona/model/persona-engine.ts`
47. `src/features/create-persona/ui/PersonaEditor.tsx`
48. `src/features/memory-service/model/memory-service.ts`
49. `src/features/memory-service/ui/MemorySidebar.tsx`
50. `src/features/debate-arena/model/debate.store.ts`
51. `src/features/debate-arena/api/judge.adapter.ts`
52. `src/shared/ui/organisms/PersonaCard.tsx`
53. `src/shared/ui/molecules/TraitSlider.tsx`
54. `src/shared/ui/atoms/NeonBorder.tsx`
55. `src/shared/lib/hooks/useVoice.ts`
56. `src/shared/lib/hooks/useTTS.ts`
57. `src/services/storage/firestore.service.ts`
58. `src/entities/debate/model/types.ts`
59. `src/widgets/system-status/ui/StatusWidget.tsx`
60. `src/features/chat-pipeline/model/chat.store.ts`

### **🔴 Fichiers Legacy / Redondants (À supprimer ou archiver)**
61. `src/components/Dock.tsx` (Doublon de widgets/dock)
62. `src/components/Header.tsx` (Doublon de widgets/header)
63. `src/components/Sidebar.tsx` (Doublon de widgets/sidebar)
64. `src/ui/Glass.tsx` (Doublon de shared/ui/atoms)
65. `src/ui/Button.tsx` (Ancien style)
66. `src/components/GlassSkeleton.tsx` (Obsolète)
67. `src/features/auth/api/firebase.config.ts` (Fusionné dans shared/api)
68. `src/features/auth/api/auth.gateway.ts` (Fusionné dans shared/api)
69. `src/entities/schemas.ts` (Divisé en types spécifiques)
70. `src/features/chat-with-persona/` (Ancienne structure)

### **🔵 Fichiers de Structure & Config (Maintenance)**
71. `eslint.config.js`
72. `vite.config.ts`
73. `tsconfig.json`
74. `tailwind.config.js`
75. `postcss.config.js`
76. `README.md`
77. `firebase-applet-config.json`
78. `src/vite-env.d.ts`
79. `public/favicon.ico`
80. `public/manifest.json`
81. `src/assets/logo.svg`
82. `src/assets/noise.png`
83. `src/assets/mesh-gradient.svg`
84. `src/shared/lib/constants/personas.ts`
85. `src/shared/lib/constants/themes.ts`
86. `src/shared/lib/hooks/useLocalStorage.ts`
87. `src/shared/lib/hooks/useMediaQuery.ts`
88. `src/shared/ui/atoms/Icon.tsx`
89. `src/shared/ui/atoms/Input.tsx`
90. `src/shared/ui/atoms/Badge.tsx`
91. `src/shared/ui/molecules/Modal.tsx`
92. `src/shared/ui/molecules/Tooltip.tsx`
93. `src/shared/ui/organisms/Navigation.tsx`
94. `src/shared/ui/templates/MainLayout.tsx`
95. `src/shared/ui/templates/GlassLayout.tsx`

---

## **🧠 PROMPT ESCLAVE 5 : Directives Spécifiques pour l'Agent AI Studio**
### **Règles d'Exécution (Agent Logic)**
1. **Exploration Avant Modification** : Toujours utiliser `view_file` avant `edit_file`.
2. **Gestion des Dépendances** : Vérifier `package.json` avant d'installer.
3. **Intégration Firebase** : Pas de données mockées pour les features persistantes.
4. **Design System** : Utiliser Tailwind CSS v4 et les variables CSS existantes.
5. **Nettoyage** : Supprimer les fichiers Legacy (61-70) une fois les migrations terminées.
