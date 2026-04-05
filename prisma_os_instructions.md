# **Système d'instructions Unifié pour Prisma OS**
**Version 1.1 — Mise à jour 05 avril 2026**
*Architecture Modulaire + Option B (PersonaEngine + MemoryService + Débat)*

---

## **📌 INSTRUCTIONS GLOBALES**
### **Contexte**
Prisma OS est une interface de conversation futuriste basée sur **Gemini 3.1**, avec un design **"Liquid Glass"** et des fonctionnalités avancées :
- **Personas dynamiques** générés et gérés via `PersonaEngine`
- **Mémoire à long terme** persistante (`MemoryService` + Firestore)
- **Modules interactifs** : Chat, Débat, Hub/Dashboard

**État actuel du projet (05/04/2026)**
- Base React 19 + TypeScript + Tailwind v4 + Firebase + Gemini : **OK**
- Design Glass implémenté (dock animé, en-tête, composants en verre, mesh gradient animé en fond) : **OK**
- Météo en direct (Open-Meteo) et Flux RSS (Google Actualités) fonctionnels : **OK**
- Navigation par swipe horizontal et Dock rétractable du bas vers le haut : **OK**
- Interface de chat, vue de tableau de bord, vue de débat, vues de paramètres présentes : **OK**
- Store Zustand et structure feature-sliced en place : **OK**

**Priorité absolue (Option B choisie)** : Compléter **PersonaEngine**, **MemoryService** et finaliser **DebateView**.

**Règle UI stricte** : Ne pas écrire "S1", "S2", etc. directement dans l'UI. Utiliser des termes descriptifs ou des icônes.

---

## **📝 MAÎTRE PROMPT (Liaison Centrale)**
### **Instructions générales**
1. Développer **uniquement** les caractéristiques manquantes énumérées ci-dessous.
2. Respecter à 100 % le design **Liquid Glass** (variable de fond-flou, bordures néon sarcelle/violet, animations Framer Motion fluides).
3. Utiliser les stores existants (`uiStore`, `personaStore`, `chatStore`, etc.).
4. Tout nouveau composant/service doit être modulaire et testable.

### **Plan de route prioritaire (2 prochaines semaines)**
1. **PersonaEngine** (semaine 1) → le plus visible
2. **Service de mémoire** (semaine 1-2)
3. **Débat de finalisationView + Juge IA** (semaine 2)
4. Polissage UX additionnel si nécessaire.

---

## **🧬 PROMPT ESCLAVE 1 : PERSONAENGINE (Priorité #1)**
### **Objectif**
Créer un moteur qui permet de générer, éditer et utiliser des personas dynamiques avec des traits pondérés.

### **Composants à créer / mettre à jour**
- `src/features/create-persona/model/persona-engine.ts` (service principal)
- `src/features/chat-pipeline/ui/PersonaEditor.tsx` (verre intégral modal)
- `src/shared/ui/organisms/PersonaCard.tsx` (avec QuickActionOverlay amélioré)
- Mise à jour des stores liés aux personas.

### **Spécifications Techniques**
- Traits pondérés (0-100 %) : Créativité, Empathie, Rigueur, Humour, Directivité, Curiosité, etc. (minimum 8 traits)
- Génération IA : bouton « Générer persona aléatoire » via Gemini (système de prompt inclus dans le service)
- Aperçu de l'avatar : couleur dominante + initiales + effet de verre + petit texte d'exemple généré en live
- Sauvegarde Firestore (collection `users/{userId}/favoritePersonas`)
- Liaison avec Chat et Débat (le persona sélectionné influence le prompt système Gemini)

**Interface PersonaEditor (verre liquide)**
- Fond très flou + bordure néon
- Curseurs Radix horizontaux avec gradient de couleur
- Aperçu à droite (avatar + phrase d'exemple)
- Boutons : Générer, Sauvegarder, Utiliser immédiatement, Supprimer

---

## **🧠 PROMPT ESCLAVE 2 : MEMORYSERVICE (Priorité #2)**
### **Objectif**
Stocker et restituer la mémoire à long terme des conversations et des personas.

### **Composants à créer**
- `src/features/memory-service/model/memory-service.ts`
- Mise à jour des stores de chat et de persona.

### **Fonctionnalités**
- Extraction automatique de « souvenirs » après chaque conversation (via Gemini)
- Stockage Firestore (collection de souvenirs avec identifiant d'utilisateur + identifiant de persona, ex: `users/{userId}/favoritePersonas/{personaId}/memory/data`)
- Récupération contextuelle : à chaque nouveau message, charger les 3-5 souvenirs les plus pertinents
- Fusion de mémoire multi-personas quand on discute avec plusieurs à la fois

---

## **⚔️ PROMPT ESCLAVE 3 : VUE DU DÉBAT (Finalisation)**
- Champ sujet + sélection de 2 personas (dropdown avec aperçu)
- Zone de débat tour par tour (Persona A → Persona B)
- Bouton **« Juge IA »** → Gemini analyse et rend un verdict neutre + scores
- Historique des débats sauvegardés dans Firestore

---

## **📋 BACKLOG IMMÉDIAT (à faire dans l'ordre)**
1. Créer/Finaliser `PersonaEngine` + `PersonaEditor`
2. Mettre à jour `SettingsView` pour gérer les personas
3. Implémenter `MemoryService`
4. Finaliser `DebateView` + Juge IA

---

## **🧠 PROMPT ESCLAVE 4 : Directives Spécifiques pour l'Agent AI Studio (Gemini)**
### **Règles d'Exécution (Agent Logic)**
1. **Exploration Avant Modification (Read-Modify-Write)** :
   - Toujours utiliser `view_file` sur un fichier avant d'utiliser `edit_file` ou `multi_edit_file`. Ne jamais présumer du contenu exact d'un fichier.
2. **Gestion des Dépendances** :
   - Vérifier le `package.json` avant d'installer de nouveaux paquets.
   - Attendre la fin de l'installation avant de lancer `compile_applet` ou `lint_applet`.
3. **Intégration Firebase (Critique)** :
   - Ne jamais utiliser de données mockées pour les features persistantes.
   - Toujours implémenter la gestion des erreurs Firestore via un bloc `try/catch`.
   - Mettre à jour `firebase-blueprint.json` et `firestore.rules` lors de l'ajout de nouvelles collections.
4. **Développement Itératif** :
   - Après chaque bloc de modifications logiques, exécuter `lint_applet` et `compile_applet`.
5. **Design System "Liquid Glass"** :
   - Utiliser systématiquement Tailwind CSS v4.
   - Privilégier les variables CSS existantes (`var(--surface-1)`, `var(--accent)`, etc.) pour maintenir la cohérence du thème.
