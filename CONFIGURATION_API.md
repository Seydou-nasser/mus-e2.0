# 🔧 CONFIGURATION DES API POUR LE CHATBOT

## 📋 **ÉTAPES DE CONFIGURATION**

### **1. Créer le fichier .env**

Créez un fichier `.env` à la racine du projet (même niveau que `package.json`) :

```bash
# Dans le terminal, à la racine du projet
touch .env
```

### **2. Ajouter vos clés API**

Éditez le fichier `.env` et ajoutez vos clés API :

```env
# Configuration des API pour le chatbot IA
# IMPORTANT: Ne jamais commiter ce fichier avec de vraies clés API !

# OpenAI GPT-4 (Recommandé pour le hackathon)
REACT_APP_OPENAI_API_KEY=sk-your-openai-key-here

# Claude API (Alternative)
REACT_APP_CLAUDE_API_KEY=sk-ant-your-claude-key-here

# Configuration de l'application
REACT_APP_API_BASE_URL=http://localhost:3001
REACT_APP_ENVIRONMENT=development

# Configuration du musée
REACT_APP_MUSEE_NAME=Musée des Civilisations Noires
REACT_APP_MUSEE_VERSION=2.0
REACT_APP_MUSEE_LANGUAGES=fr,en,wo
```

### **3. Obtenir les clés API**

#### **🥇 OpenAI GPT-4 (Recommandé)**
1. Aller sur [https://platform.openai.com/api-keys](https://platform.openai.com/api-keys)
2. Créer un compte OpenAI
3. Générer une nouvelle clé API
4. Copier la clé et remplacer `sk-your-openai-key-here`

#### **🥈 Claude API (Alternative)**
1. Aller sur [https://console.anthropic.com/](https://console.anthropic.com/)
2. Créer un compte Anthropic
3. Générer une nouvelle clé API
4. Copier la clé et remplacer `sk-ant-your-claude-key-here`

### **4. Redémarrer l'application**

```bash
# Arrêter l'application (Ctrl+C)
# Redémarrer
npm run dev
```

### **5. Vérifier la configuration**

Ouvrez la console du navigateur (F12) et vérifiez les messages :
- ✅ `OpenAI GPT-4: Configuré` - API fonctionnelle
- ✅ `Claude API: Configuré` - API fonctionnelle
- ❌ `Non configuré` - Utilise le mode fallback

## 🔍 **VÉRIFICATION DE LA CONFIGURATION**

### **Dans la console du navigateur :**
```javascript
// Vérifier les variables d'environnement
console.log('OpenAI Key:', process.env.REACT_APP_OPENAI_API_KEY);
console.log('Claude Key:', process.env.REACT_APP_CLAUDE_API_KEY);
```

### **Dans le code :**
```typescript
import { checkAPIConfiguration } from './src/config/environment';

const config = checkAPIConfiguration();
console.log('Configuration:', config);
```

## 🚨 **SÉCURITÉ**

### **⚠️ IMPORTANT :**
- ❌ **NE JAMAIS** commiter le fichier `.env` avec de vraies clés
- ✅ **TOUJOURS** utiliser des variables d'environnement
- ✅ **TOUJOURS** vérifier que `.env` est dans `.gitignore`

### **Vérifier .gitignore :**
```bash
# Vérifier que .env est ignoré
cat .gitignore | grep .env
```

## 🧪 **TEST DE LA CONFIGURATION**

### **1. Test du chatbot :**
1. Ouvrir l'application
2. Cliquer sur le bouton violet du chatbot
3. Poser une question : "Parle-moi de l'art africain"
4. Vérifier que la réponse vient de l'IA (pas du fallback)

### **2. Test de la reconnaissance vocale :**
1. Cliquer sur le microphone
2. Parler une question
3. Vérifier que les ondes audio apparaissent
4. Vérifier que la question est transcrite

### **3. Test de la synthèse vocale :**
1. Poser une question
2. Vérifier que l'IA répond
3. Vérifier que la réponse est lue à voix haute

## 🔧 **DÉPANNAGE**

### **Problème : "Non configuré"**
```bash
# Vérifier que le fichier .env existe
ls -la .env

# Vérifier le contenu
cat .env
```

### **Problème : "API error"**
```bash
# Vérifier la clé API
echo $REACT_APP_OPENAI_API_KEY

# Vérifier la console pour les erreurs
# Redémarrer l'application
```

### **Problème : Pas de réponse**
```bash
# Vérifier la connexion internet
# Vérifier les permissions du navigateur
# Vérifier la console pour les erreurs
```

## 📞 **SUPPORT**

Si vous avez des problèmes :
1. Vérifier la console du navigateur
2. Vérifier que les clés API sont valides
3. Vérifier la connexion internet
4. Redémarrer l'application

---

**🎉 Une fois configuré, le chatbot sera vraiment fonctionnel avec l'IA ! 🎉**
