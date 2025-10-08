## Cahier des Charges Technique – Prototype Hackathon

**Projet : Expérience digitale – Musée des Civilisations Noires**
**Technologie choisie : React + TypeScript + i18n**

---

### 1. Contexte & Objectif

Développer une **application web responsive** permettant de consulter les œuvres du musée via un front-end réactif, multilingue et accessible, avec QR codes pour accéder aux fiches.

---

### 2. Périmètre du projet

#### Fonctionnalités principales

- **Accueil** : liste des œuvres (image + titre multilingue).
- **Fiche œuvre** : description complète (texte, audio, vidéo).
- **QR Code** : accès direct à une œuvre via une URL unique.
- **Multilingue** : français, anglais, wolof (via i18n).
- **Accessibilité** : option audio pour les descriptions.
- **Responsive design** : utilisable sur PC et mobile.

---

### 3. Technologies & Outils

- **Front-end** : React + TypeScript
- **Gestion langues** : react-i18next
- **UI Framework** : TailwindCSS (ou Bootstrap si l’équipe préfère)
- **QR Code** : `qrcode.react`
- **Gestion des données** : fichiers JSON/TS en local (pas de backend)
- **Versionning** : GitHub/GitLab
- **Déploiement** : Netlify / Vercel (rapide pour la démo)

---

### 4. Organisation des données

Format JSON/TS :

```ts
{
  id: "001",
  title: { fr: "Titre FR", en: "Title EN", wo: "Tur WO" },
  description: { fr: "...", en: "...", wo: "..." },
  media: { image: "/assets/img.jpg", audio: "/assets/audio.mp3" },
  history: ["Origine : …", "Période : …"]
}
```

---

### 5. Design & Style

- **Style visuel** : simple, épuré, moderne.
- **Palette couleurs** : inspirée du musée (tons ocre, noir, blanc, doré).
- **Police** : Google Fonts (Roboto, Inter ou Poppins).
- **Composants UI** :

  - Header avec sélection de langue
  - Grid de cartes pour les œuvres
  - Page détail avec onglets (texte / audio / vidéo)
  - Bouton “Scanner QR Code”

---

### 6. Découpage des tâches

#### Sprint 1 – Setup projet

- Initialiser projet React + TS (vite ou CRA)
- Installer TailwindCSS / Bootstrap
- Installer i18n + config langues
- Créer structure JSON pour les œuvres

#### Sprint 2 – Base de l’app

- Créer composant **Header** (choix langue)
- Créer **Liste des œuvres** (cards)
- Créer **Fiche œuvre** (affichage texte multilingue)

#### Sprint 3 – Interactions

- Intégrer **QR Code**
- Ajouter **audio player** pour descriptions
- Rendre l’app responsive (mobile-first)

#### Sprint 4 – Finitions

- Styling final (couleurs, polices)
- Tests basiques (navigation, multilingue)
- Déploiement (Netlify/Vercel)
- Préparation **pitch deck + démo live**

---

### 7. Livrables

- Code source sur GitHub
- Déploiement en ligne (Netlify/Vercel)
- Pitch deck (PDF/PPT) avec maquettes + capture de l’app
- Démonstration fonctionnelle
