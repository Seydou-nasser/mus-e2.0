# 🏛️ Musée des Civilisations Noires 2.0 - Guide Contributeurs

## 📋 Vue d'ensemble du projet

**Musée des Civilisations Noires 2.0** est une application web révolutionnaire qui utilise les technologies les plus avancées pour créer une expérience muséale immersive et interactive.

### 🎯 Fonctionnalités principales
- **🤖 Chatbot IA Intelligent** - Assistant virtuel spécialisé en culture africaine
- **📱 Réalité Augmentée** - Scanner QR et modèles 3D interactifs
- **🎮 Parcours Gamifiés** - Quêtes interactives et défis culturels
- **🌍 Traduction Multilingue** - Français, Anglais, Wolof
- **🎨 Carrousel 3D** - Navigation immersive dans les collections
- **🎵 Audio Guide** - Guide audio professionnel avec ElevenLabs

## 🚀 Installation et Configuration

### Prérequis
- **Node.js** (version 18 ou supérieure)
- **npm** ou **yarn**
- **Git**

### Installation rapide
```bash
# Cloner le repository
git clone https://github.com/Paskod121/mus-e2.0.git
cd mus-e2.0

# Installer les dépendances
npm install

# Lancer le serveur de développement
npm run dev
```

### Configuration des API (Optionnel)
```bash
# Créer le fichier .env
cp .env.example .env

# Éditer les clés API dans .env
VITE_OPENAI_API_KEY=your-openai-key-here
VITE_HUGGINGFACE_API_KEY=your-huggingface-key-here
VITE_ELEVENLABS_API_KEY=your-elevenlabs-key-here
```

## 📁 Structure du projet

```
mus-e2.0/
├── src/
│   ├── composants/           # Composants React principaux
│   │   ├── LayoutPrincipal.tsx      # Layout principal avec header/footer
│   │   ├── PageAccueil.tsx          # Page d'accueil avec Hero 3D
│   │   ├── ChatbotInterface.tsx      # Interface chatbot IA
│   │   ├── BoutonIAGlobal.tsx        # Bouton IA flottant
│   │   ├── Hero3D.tsx               # Carrousel 3D des œuvres
│   │   ├── ThemeProvider.tsx        # Gestion des thèmes
│   │   └── ...
│   ├── services/             # Services et API
│   │   ├── chatbotAPI.ts            # API ChatGPT/HuggingFace
│   │   ├── intelligentChatbotService.ts  # Service local intelligent
│   │   ├── elevenLabsService.ts     # Service audio ElevenLabs
│   │   └── translateAPI.ts          # Service de traduction
│   ├── config/              # Configuration
│   │   ├── environment.ts           # Variables d'environnement
│   │   └── apiConfig.ts             # Configuration API
│   ├── translation/         # Internationalisation
│   │   ├── i18n.ts                  # Configuration i18next
│   │   └── language/               # Fichiers de traduction
│   │       ├── fr.json             # Français
│   │       ├── en.json             # Anglais
│   │       └── wo.json             # Wolof
│   └── App.tsx              # Composant principal avec routage
├── public/
│   └── images/              # Images et assets
│       ├── carrousel/       # Images pour le carrousel 3D
│       └── collections/     # Images des collections
├── package.json            # Dépendances et scripts
└── vite.config.ts         # Configuration Vite
```

## 🛠️ Technologies utilisées

### Frontend
- **React 19** - Framework principal
- **TypeScript** - Typage statique
- **Vite** - Build tool moderne
- **Tailwind CSS** - Framework CSS
- **Framer Motion** - Animations
- **React Router** - Routage
- **Three.js** - Rendu 3D
- **i18next** - Internationalisation

### IA et API
- **OpenAI GPT-3.5/4** - Chatbot intelligent
- **Hugging Face** - Modèles open-source
- **ElevenLabs** - Text-to-Speech
- **Google Translate** - Traduction temps réel

### Développement
- **ESLint** - Linting
- **TypeScript** - Compilation
- **Git** - Version control

## 🎨 Composants principaux

### 1. LayoutPrincipal
- **Fichier**: `src/composants/LayoutPrincipal.tsx`
- **Rôle**: Layout principal avec header, navigation et footer
- **Fonctionnalités**: 
  - Navigation responsive
  - Gestion des thèmes (Sombre/Douce/Clair)
  - Traduction multilingue
  - Bouton IA dans le header

### 2. PageAccueil
- **Fichier**: `src/composants/PageAccueil.tsx`
- **Rôle**: Page d'accueil avec Hero 3D et statistiques
- **Fonctionnalités**:
  - Carrousel 3D des œuvres
  - Statistiques en temps réel
  - Fonctionnalités révolutionnaires
  - Design glassmorphism

### 3. ChatbotInterface
- **Fichier**: `src/composants/ChatbotInterface.tsx`
- **Rôle**: Interface chatbot IA révolutionnaire
- **Fonctionnalités**:
  - Chat intelligent avec API réelle
  - Interface mobile-first
  - Animations et effets visuels
  - Fallback local intelligent

### 4. Hero3D
- **Fichier**: `src/composants/Hero3D.tsx`
- **Rôle**: Carrousel 3D des œuvres
- **Fonctionnalités**:
  - Navigation 3D immersive
  - Images haute qualité
  - Animations fluides
  - Responsive design

## 🔧 Scripts disponibles

```bash
# Développement
npm run dev              # Serveur de développement
npm run start            # Alias pour npm run dev

# Build
npm run build            # Build de production
npm run build:prod       # Build avec linting
npm run preview          # Prévisualisation du build

# Qualité du code
npm run lint             # Linting ESLint
npm run lint:fix         # Correction automatique
npm run type-check       # Vérification TypeScript

# Maintenance
npm run clean            # Nettoyage du dossier dist
```

## 🌍 Internationalisation

Le projet supporte 3 langues :
- **Français** (fr) - Langue par défaut
- **Anglais** (en) - Traduction complète
- **Wolof** (wo) - Langue africaine

### Ajouter une traduction
1. Éditer le fichier dans `src/translation/language/[lang].json`
2. Ajouter la clé dans tous les fichiers de langue
3. Utiliser `useTranslation()` dans les composants

## 🎨 Système de thèmes

3 modes de thème disponibles :
- **Sombre** - Mode par défaut
- **Douce** - Mode intermédiaire
- **Clair** - Mode clair

### Utilisation
```tsx
import { useTheme } from './composants/ThemeProvider';

const { theme, setTheme, themeClasses } = useTheme();
```

## 🤖 Configuration IA

### Chatbot intelligent
- **API principale**: OpenAI GPT-3.5/4
- **Fallback**: Hugging Face Router
- **Service local**: IntelligentChatbotService
- **Fonctionnalités**: Réponses contextuelles, liens vers pages

### Audio Guide
- **Service**: ElevenLabs TTS
- **Fallback**: Web Speech API
- **Fonctionnalités**: Audio naturel, multilingue

## 📱 Responsive Design

- **Mobile First** - Design optimisé mobile
- **Breakpoints** - xs (475px), sm, md, lg, xl
- **iPhone 5/SE** - Support spécifique
- **Desktop** - Interface complète

## 🚀 Déploiement

### Build de production
```bash
npm run build:prod
```

### Variables d'environnement
```env
VITE_OPENAI_API_KEY=your-key
VITE_HUGGINGFACE_API_KEY=your-key
VITE_ELEVENLABS_API_KEY=your-key
```

## 🐛 Débogage

### Logs de développement
- **Console** - Logs détaillés des API
- **Network** - Requêtes API
- **React DevTools** - Composants React

### Problèmes courants
1. **Clés API** - Vérifier les variables d'environnement
2. **Dépendances** - `npm install` si erreurs
3. **Cache** - Nettoyer le cache navigateur
4. **Port** - Vérifier que le port 5173 est libre

## 🤝 Contribution

### Workflow Git
1. **Fork** du repository
2. **Branche feature** - `git checkout -b feature/nom`
3. **Développement** - Code et tests
4. **Commit** - Messages clairs
5. **Push** - `git push origin feature/nom`
6. **Pull Request** - Description détaillée

### Standards de code
- **TypeScript** - Typage strict
- **ESLint** - Règles de linting
- **Conventions** - Nommage français
- **Documentation** - Commentaires JSDoc

## 📞 Support

- **Issues** - GitHub Issues
- **Documentation** - README files
- **Code** - Commentaires inline

---

**Développé avec ❤️ pour l'Afrique** 🇸🇳
