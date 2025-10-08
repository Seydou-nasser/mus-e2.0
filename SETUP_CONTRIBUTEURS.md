# 🚀 Guide de Configuration pour Contributeurs

## 📋 Checklist de Configuration

### ✅ Étape 1 : Prérequis
- [ ] Node.js 18+ installé
- [ ] Git configuré
- [ ] Compte GitHub
- [ ] Éditeur de code (VS Code recommandé)

### ✅ Étape 2 : Cloner le projet
```bash
git clone https://github.com/Paskod121/mus-e2.0.git
cd mus-e2.0
```

### ✅ Étape 3 : Installer les dépendances
```bash
npm install
```

### ✅ Étape 4 : Configuration des variables d'environnement
```bash
# Créer le fichier .env
cp .env.example .env

# Éditer le fichier .env avec vos clés API
```

### ✅ Étape 5 : Lancer le projet
```bash
npm run dev
```

## 🔧 Configuration détaillée

### Variables d'environnement requises
```env
# API IA (au moins une requise)
VITE_OPENAI_API_KEY=your-key-here
VITE_HUGGINGFACE_API_KEY=your-key-here

# Audio (optionnel)
VITE_ELEVENLABS_API_KEY=your-key-here

# Configuration
VITE_ENVIRONMENT=development
```

### Scripts utiles
```bash
# Développement
npm run dev              # Serveur de développement
npm run start            # Alias pour dev

# Build
npm run build            # Build de production
npm run build:prod       # Build avec linting

# Qualité
npm run lint             # Linting
npm run lint:fix         # Correction automatique
npm run type-check       # Vérification TypeScript
```

## 🎯 Fonctionnalités principales

### Chatbot IA
- **Fichier**: `src/composants/ChatbotInterface.tsx`
- **API**: OpenAI GPT-3.5/4 ou Hugging Face
- **Fallback**: Service local intelligent
- **Fonctionnalités**: Réponses contextuelles, liens vers pages

### Carrousel 3D
- **Fichier**: `src/composants/Hero3D.tsx`
- **Technologie**: Three.js + React Three Fiber
- **Fonctionnalités**: Navigation 3D, images HD, animations

### Traduction
- **Fichier**: `src/translation/`
- **Langues**: Français, Anglais, Wolof
- **API**: Google Translate (optionnel)

### Thèmes
- **Fichier**: `src/composants/ThemeProvider.tsx`
- **Modes**: Sombre, Douce, Clair
- **Fonctionnalités**: Persistance, responsive

## 🐛 Résolution de problèmes

### Erreurs courantes
1. **Module not found** → `npm install`
2. **Port already in use** → Changer le port
3. **API key not found** → Vérifier .env
4. **Build failed** → `npm run lint:fix`

### Logs de débogage
- **Console** - Logs détaillés des API
- **Network** - Requêtes HTTP
- **React DevTools** - Composants

## 📁 Structure des fichiers

```
src/
├── composants/          # Composants React
│   ├── LayoutPrincipal.tsx
│   ├── PageAccueil.tsx
│   ├── ChatbotInterface.tsx
│   └── ...
├── services/           # Services et API
│   ├── chatbotAPI.ts
│   ├── intelligentChatbotService.ts
│   └── ...
├── config/            # Configuration
│   └── environment.ts
├── translation/       # Internationalisation
│   └── language/
└── App.tsx           # Composant principal
```

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

**Prêt à contribuer ? Commencez par `npm run dev` !** 🚀
