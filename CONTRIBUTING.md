# 🤝 Guide de Contribution - Musée des Civilisations Noires 2.0

## 📋 Comment contribuer

### 🚀 Démarrage rapide
1. **Fork** le repository
2. **Clone** votre fork : `git clone https://github.com/VOTRE-USERNAME/mus-e2.0.git`
3. **Branche** : `git checkout -b feature/nom-de-votre-fonctionnalite`
4. **Développement** : Code, tests, documentation
5. **Commit** : `git commit -m "feat: description de votre ajout"`
6. **Push** : `git push origin feature/nom-de-votre-fonctionnalite`
7. **Pull Request** : Créer une PR avec description détaillée

### 📝 Standards de code

#### TypeScript
- **Typage strict** - Tous les types doivent être définis
- **Interfaces** - Utiliser des interfaces pour les objets
- **Enums** - Pour les valeurs constantes
- **JSDoc** - Documentation des fonctions

#### React
- **Composants fonctionnels** - Pas de classes
- **Hooks** - Utiliser les hooks React
- **Props** - Typage strict des props
- **State** - Gestion d'état avec useState/useContext

#### CSS/Styling
- **Tailwind CSS** - Utiliser les classes Tailwind
- **Responsive** - Mobile-first design
- **Thèmes** - Respecter le système de thèmes
- **Animations** - Framer Motion pour les animations

### 🎨 Conventions de nommage

#### Fichiers
- **Composants** : `PascalCase.tsx` (ex: `ChatbotInterface.tsx`)
- **Services** : `camelCase.ts` (ex: `chatbotAPI.ts`)
- **Types** : `camelCase.ts` (ex: `types.ts`)
- **Constantes** : `UPPER_SNAKE_CASE`

#### Variables et fonctions
- **Variables** : `camelCase` (ex: `isChatbotOpen`)
- **Fonctions** : `camelCase` (ex: `handleSendMessage`)
- **Constantes** : `UPPER_SNAKE_CASE` (ex: `API_CONFIG`)
- **Types** : `PascalCase` (ex: `ChatMessage`)

#### Composants React
- **Nom** : `PascalCase` (ex: `ChatbotInterface`)
- **Props** : `camelCase` (ex: `isOpen`, `onClose`)
- **State** : `camelCase` (ex: `isTyping`, `messages`)

### 📁 Structure des fichiers

#### Nouveau composant
```
src/composants/
├── MonComposant.tsx          # Composant principal
├── MonComposant.types.ts     # Types spécifiques
├── MonComposant.styles.ts    # Styles (si nécessaire)
└── MonComposant.test.tsx     # Tests (si nécessaire)
```

#### Nouveau service
```
src/services/
├── monService.ts             # Service principal
├── monService.types.ts       # Types du service
└── monService.test.ts        # Tests du service
```

### 🧪 Tests

#### Tests unitaires
- **Fichiers** : `*.test.ts` ou `*.test.tsx`
- **Couverture** : Minimum 80% pour les services
- **Frameworks** : Jest + React Testing Library

#### Tests d'intégration
- **Composants** - Rendu et interactions
- **Services** - Appels API et logique
- **Routes** - Navigation et paramètres

### 📚 Documentation

#### JSDoc
```typescript
/**
 * Interface pour les messages du chatbot
 * @interface ChatMessage
 * @property {number} id - Identifiant unique du message
 * @property {string} text - Contenu du message
 * @property {'user' | 'ai'} sender - Expéditeur du message
 * @property {Date} timestamp - Date d'envoi
 */
interface ChatMessage {
  id: number;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}
```

#### README
- **Description** - Fonctionnalité et usage
- **Exemples** - Code d'utilisation
- **Props** - Documentation des props
- **API** - Documentation des méthodes

### 🔄 Workflow Git

#### Branches
- **main** - Branche principale (production)
- **develop** - Branche de développement
- **feature/nom** - Nouvelles fonctionnalités
- **bugfix/nom** - Corrections de bugs
- **hotfix/nom** - Corrections urgentes

#### Commits
- **Format** : `type: description`
- **Types** : `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`
- **Exemples** :
  - `feat: ajout du chatbot IA`
  - `fix: correction du responsive mobile`
  - `docs: mise à jour du README`

#### Pull Request
- **Titre** - Description claire
- **Description** - Détails des changements
- **Tests** - Résultats des tests
- **Screenshots** - Images si UI

### 🎯 Types de contributions

#### 🐛 Corrections de bugs
- **Identification** - Issue GitHub
- **Reproduction** - Étapes pour reproduire
- **Solution** - Code de correction
- **Tests** - Tests pour éviter la régression

#### ✨ Nouvelles fonctionnalités
- **Discussion** - Issue GitHub pour discussion
- **Design** - Maquettes et spécifications
- **Implémentation** - Code et tests
- **Documentation** - README et JSDoc

#### 📚 Documentation
- **README** - Guides d'utilisation
- **API** - Documentation des services
- **Exemples** - Code d'exemple
- **Tutoriels** - Guides pas à pas

#### 🎨 Améliorations UI/UX
- **Design** - Respect du design system
- **Responsive** - Mobile et desktop
- **Accessibilité** - Standards WCAG
- **Performance** - Optimisations

### 🔍 Review process

#### Auto-review
- [ ] Code compile sans erreurs
- [ ] Tests passent
- [ ] Linting passe
- [ ] Documentation mise à jour
- [ ] Responsive testé
- [ ] Accessibilité vérifiée

#### Review par l'équipe
- [ ] Code review
- [ ] Tests fonctionnels
- [ ] Performance
- [ ] Sécurité
- [ ] Documentation

### 🚨 Problèmes courants

#### Erreurs de compilation
- **TypeScript** - Vérifier les types
- **Imports** - Vérifier les chemins
- **Dépendances** - Vérifier les packages

#### Erreurs de linting
- **ESLint** - `npm run lint:fix`
- **Format** - Respecter les règles
- **Conventions** - Suivre les standards

#### Erreurs de tests
- **Tests** - Vérifier la logique
- **Mocks** - Vérifier les mocks
- **Coverage** - Vérifier la couverture

### 📞 Support

#### Questions
- **Issues** - GitHub Issues
- **Discussions** - GitHub Discussions
- **Code** - Commentaires inline

#### Aide
- **Documentation** - README files
- **Exemples** - Code d'exemple
- **Communauté** - Discord/Slack

---

**Merci de contribuer au Musée des Civilisations Noires 2.0 !** 🏛️
