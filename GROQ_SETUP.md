# 🤖 Guide d'intégration Groq AI

## Configuration de l'Assistant IA

L'application utilise **Groq** pour l'assistant IA conversationnel.

### 📝 Étapes de configuration

#### 1. Obtenir une clé API Groq (Gratuit)

1. Allez sur https://console.groq.com
2. Créez un compte (gratuit)
3. Allez dans "API Keys"
4. Cliquez sur "Create API Key"
5. Copiez votre clé (commence par `gsk_...`)

#### 2. Configurer la clé API

Créez un fichier `.env` à la racine du projet :

```bash
# Copier le fichier exemple
cp .env.example .env
```

Puis éditez `.env` et ajoutez votre clé :

```env
VITE_GROQ_API_KEY=gsk_votre_cle_api_ici
```

⚠️ **Important** : Le fichier `.env` est dans `.gitignore` et ne sera jamais commité.

#### 3. Redémarrer le serveur de développement

```bash
npm run dev
```

### ✨ Fonctionnalités de l'Assistant IA

L'assistant IA peut :

- ✅ Répondre aux questions sur les œuvres du musée
- ✅ Fournir des informations culturelles et historiques
- ✅ Recommander des œuvres similaires
- ✅ Expliquer le contexte des civilisations africaines
- ✅ Communiquer en **3 langues** (Français, Anglais, Wolof)

### 🎯 Contexte fourni à l'IA

L'assistant a accès à :

- Toutes les œuvres de la collection avec descriptions complètes
- Informations sur les origines géographiques
- Périodes historiques
- Contextes culturels
- Catégories (Sculpture, Textile, Céramique, etc.)

### 🚀 Modèle utilisé

**Llama 3.3 70B Versatile** (via Groq)
- Ultra-rapide (~500 tokens/seconde)
- Très performant en multilingue
- Contexte jusqu'à 32K tokens
- Gratuit avec limites généreuses

### 📊 Limites gratuites Groq

- **30 requêtes/minute**
- **14,400 requêtes/jour**
- Largement suffisant pour un prototype/hackathon

### 🔧 Configuration avancée

Modifier le modèle ou les paramètres dans `src/services/groqService.ts` :

```typescript
const chatCompletion = await groq.chat.completions.create({
  messages: [systemMessage, ...messages],
  model: "llama-3.3-70b-versatile", // Changer le modèle
  temperature: 0.7, // Créativité (0-1)
  max_tokens: 500, // Longueur max de réponse
  top_p: 1,
  stream: false,
});
```

### 🎨 Personnalisation de l'interface

Le composant `AIAssistant.tsx` est entièrement personnalisable :

- Couleurs terracotta (#D17842)
- Dark mode supporté
- Responsive design
- Animations fluides

### 🐛 Résolution de problèmes

#### L'assistant ne répond pas

1. Vérifiez que la clé API est correcte dans `.env`
2. Vérifiez la console du navigateur pour les erreurs
3. Assurez-vous d'avoir redémarré le serveur après modification de `.env`

#### Erreur "rate limit"

Vous avez dépassé les limites gratuites. Attendez quelques minutes.

#### Erreur "401 Unauthorized"

Votre clé API est incorrecte ou expirée. Générez-en une nouvelle sur console.groq.com

### 🌐 Déploiement

Pour le déploiement en production :

1. **Vercel/Netlify** : Ajoutez `VITE_GROQ_API_KEY` dans les variables d'environnement
2. **Important** : Ne committez JAMAIS votre clé API

### 📚 Documentation

- [Documentation Groq](https://console.groq.com/docs)
- [Groq SDK GitHub](https://github.com/groq/groq-typescript)
- [Modèles disponibles](https://console.groq.com/docs/models)

### 💡 Exemples de questions

Testez l'assistant avec :

- "Parle-moi du Masque Gelede"
- "Quelle est l'origine du Tissu Kente ?"
- "Quelles œuvres viennent du Nigéria ?"
- "Explique-moi le contexte culturel des sculptures"
- "Recommande-moi une œuvre textile"

---

**Créé pour le Hackathon Dakar Slush'D 2025** 🇸🇳
