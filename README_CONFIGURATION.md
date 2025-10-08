# 🔧 CONFIGURATION DES VARIABLES D'ENVIRONNEMENT

## 🎯 **OBJECTIF**

Configurer les clés API de manière sécurisée pour le chatbot IA révolutionnaire.

## 📋 **ÉTAPES DE CONFIGURATION**

### **1. Créer le fichier .env**

```bash
# Option 1: Utiliser le script automatique
node scripts/setup-env.js create

# Option 2: Créer manuellement
touch .env
```

### **2. Configurer les clés API**

Éditez le fichier `.env` et ajoutez vos vraies clés API :

```env
# OpenAI GPT-4 (Recommandé)
REACT_APP_OPENAI_API_KEY=sk-votre-vraie-cle-openai-ici

# Claude API (Alternative)
REACT_APP_CLAUDE_API_KEY=sk-ant-votre-vraie-cle-claude-ici
```

### **3. Vérifier la configuration**

```bash
# Vérifier l'état de la configuration
node scripts/setup-env.js check
```

### **4. Redémarrer l'application**

```bash
npm run dev
```

## 🔑 **OBTENIR LES CLÉS API**

### **🥇 OpenAI GPT-4 (Recommandé)**
1. Aller sur [https://platform.openai.com/api-keys](https://platform.openai.com/api-keys)
2. Créer un compte OpenAI
3. Générer une nouvelle clé API
4. Copier la clé (commence par `sk-`)

### **🥈 Claude API (Alternative)**
1. Aller sur [https://console.anthropic.com/](https://console.anthropic.com/)
2. Créer un compte Anthropic
3. Générer une nouvelle clé API
4. Copier la clé (commence par `sk-ant-`)

## 🧪 **TEST DE LA CONFIGURATION**

### **1. Vérifier dans la console :**
```javascript
// Ouvrir la console du navigateur (F12)
// Vérifier les messages de configuration
```

### **2. Tester le chatbot :**
1. Cliquer sur le bouton violet du chatbot
2. Poser une question : "Parle-moi de l'art africain"
3. Vérifier que la réponse vient de l'IA (pas du fallback)

### **3. Tester la reconnaissance vocale :**
1. Cliquer sur le microphone
2. Parler une question
3. Vérifier que les ondes audio apparaissent

## 🔍 **VÉRIFICATION DE LA CONFIGURATION**

### **Messages dans la console :**
- ✅ `OpenAI GPT-4: Configuré` - API fonctionnelle
- ✅ `Claude API: Configuré` - API fonctionnelle
- ❌ `Non configuré` - Utilise le mode fallback

### **Test du chatbot :**
- ✅ Réponses intelligentes et contextuelles
- ✅ Reconnaissance vocale avec ondes audio
- ✅ Synthèse vocale naturelle
- ✅ Support multilingue (FR/EN/Wolof)

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

## 🔧 **DÉPANNAGE**

### **Problème : "Non configuré"**
```bash
# Vérifier que le fichier .env existe
ls -la .env

# Vérifier le contenu
cat .env

# Recréer le fichier
node scripts/setup-env.js create
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
