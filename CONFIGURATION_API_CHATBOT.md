# 🤖 CONFIGURATION API CHATBOT - GUIDE COMPLET

## 🎯 **PROBLÈME IDENTIFIÉ**
Le chatbot utilise actuellement des réponses statiques au lieu d'une vraie API IA. Voici comment configurer une API réelle.

## 🔧 **ÉTAPES DE CONFIGURATION**

### **1️⃣ CRÉER LE FICHIER .ENV**
Créez un fichier `.env` à la racine du projet avec :

```env
# OpenAI API Configuration
VITE_OPENAI_API_KEY=sk-your-openai-api-key-here

# Claude API Configuration (Alternative)
VITE_CLAUDE_API_KEY=sk-ant-your-claude-api-key-here

# Application Configuration
VITE_APP_NAME=Musée des Civilisations Noires
VITE_APP_VERSION=2.0.0
```

### **2️⃣ OBTENIR UNE CLÉ API OPENAI**

#### **Option A : OpenAI (Recommandé)**
1. Allez sur [platform.openai.com](https://platform.openai.com)
2. Créez un compte ou connectez-vous
3. Allez dans "API Keys"
4. Cliquez "Create new secret key"
5. Copiez la clé (commence par `sk-`)
6. Ajoutez-la dans votre `.env` :

```env
VITE_OPENAI_API_KEY=sk-proj-abc123def456...
```

#### **Option B : Claude (Alternative)**
1. Allez sur [console.anthropic.com](https://console.anthropic.com)
2. Créez un compte
3. Allez dans "API Keys"
4. Créez une nouvelle clé
5. Copiez la clé (commence par `sk-ant-`)
6. Ajoutez-la dans votre `.env` :

```env
VITE_CLAUDE_API_KEY=sk-ant-abc123def456...
```

### **3️⃣ VÉRIFIER LA CONFIGURATION**

Le chatbot vérifie automatiquement la configuration. Dans la console du navigateur, vous verrez :

```
🔧 Configuration des API:
  OpenAI GPT-4: ✅ Configuré
  Claude API: ❌ Non configuré
🤖 Utilisation de l'API réelle
```

### **4️⃣ TESTER LE CHATBOT**

1. Ouvrez l'application : `npm run dev`
2. Cliquez sur le bouton IA (flottant ou header)
3. Posez une question comme :
   - "Parle-moi du masque Baoulé"
   - "Comment fonctionne la réalité augmentée ?"
   - "Qu'est-ce que la culture Ashanti ?"

## 🎯 **FONCTIONNALITÉS INTELLIGENTES**

### **✅ AVEC API CONFIGURÉE :**
- **Réponses dynamiques** : L'IA génère des réponses uniques
- **Contexte culturel** : Spécialisé en civilisations africaines
- **Multilingue** : Français, Anglais, Wolof
- **Navigation assistée** : Liens vers les pages du site
- **Mémoire conversationnelle** : Se souvient du contexte

### **✅ SANS API (MODE FALLBACK) :**
- **Service local intelligent** : Base de connaissances intégrée
- **Réponses contextuelles** : Reconnaissance des intentions
- **Navigation assistée** : Liens vers les pages
- **Fallback culturel** : Réponses sur l'art africain

## 🔍 **DIAGNOSTIC DES PROBLÈMES**

### **Problème : "Je comprends votre question. Pouvez-vous me donner plus de détails ?"**

**Cause :** Mode fallback activé (pas d'API configurée)

**Solution :**
1. Vérifiez que le fichier `.env` existe
2. Vérifiez que la clé API est correcte
3. Redémarrez l'application : `npm run dev`

### **Problème : Erreur CORS ou réseau**

**Cause :** Clé API invalide ou quota dépassé

**Solution :**
1. Vérifiez votre clé API sur le dashboard OpenAI/Claude
2. Vérifiez votre quota d'utilisation
3. Testez avec une nouvelle clé

### **Problème : Réponses génériques**

**Cause :** Prompt système non optimisé

**Solution :** Le prompt est déjà optimisé pour le musée africain

## 🚀 **OPTIMISATIONS AVANCÉES**

### **Personnalisation du Prompt**
Le chatbot utilise un prompt spécialisé :
- Expert en civilisations africaines
- Connaissance du Musée des Civilisations Noires
- Réponses en français, anglais, wolof
- Contexte culturel et historique

### **Gestion des Erreurs**
- Fallback automatique vers service local
- Messages d'erreur informatifs
- Logs détaillés pour le debug

### **Performance**
- Cache des réponses fréquentes
- Limitation du nombre de tokens
- Optimisation des appels API

## 📊 **MONITORING**

### **Console du Navigateur**
```
🔧 Configuration API: {openai: true, claude: false, hasAnyAPI: true}
🤖 Utilisation de l'API réelle
```

### **Indicateurs de Performance**
- Temps de réponse : < 3 secondes
- Confiance : > 80%
- Qualité des réponses : Contextuelles

## 🎯 **RÉSULTAT ATTENDU**

Avec une API configurée, le chatbot :
- ✅ Répond de manière unique à chaque question
- ✅ Connaît le contexte du musée
- ✅ Guide vers les bonnes pages
- ✅ Explique la culture africaine
- ✅ S'adapte au niveau de l'utilisateur

**Votre chatbot sera vraiment intelligent !** 🤖✨
