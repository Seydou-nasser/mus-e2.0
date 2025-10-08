# 🔧 Guide de Résolution des Problèmes Audio

## 📊 **DIAGNOSTIC AUTOMATIQUE**

Le système de guide audio dispose d'un diagnostic automatique qui identifie les problèmes et propose des solutions.

### ✅ **CE QUI FONCTIONNE ACTUELLEMENT :**
- **Web Speech API** : ✅ Disponible (9 voix)
- **Support Audio** : ✅ Formats supportés (MP3, WAV, OGG, MP4)
- **Langues** : ✅ Français et Anglais disponibles
- **Interface** : ✅ Boutons et contrôles fonctionnels
- **Synthèse vocale** : ✅ Lancement réussi

### ❌ **PROBLÈMES IDENTIFIÉS :**

## 🔑 **1. PROBLÈME PRINCIPAL : ElevenLabs non configuré**

### **Symptômes :**
```
⚠️ Clé API ElevenLabs non configurée
💡 Configurer VITE_ELEVENLABS_API_KEY dans .env
```

### **Solution :**
1. **Créer un compte ElevenLabs** : https://elevenlabs.io/
2. **Obtenir une clé API** dans votre dashboard
3. **Créer le fichier `.env`** à la racine du projet :
```bash
VITE_ELEVENLABS_API_KEY=votre-clé-api-ici
```
4. **Redémarrer le serveur** : `npm run dev`

### **Avantages ElevenLabs :**
- Qualité audio professionnelle
- Voix naturelles et expressives
- Contrôle avancé (rate, pitch, style)
- Support multilingue optimisé

## 🔄 **2. PROBLÈME DE DOUBLE EXÉCUTION**

### **Symptômes :**
- Diagnostic lancé 2 fois
- Logs dupliqués dans la console
- Performance impactée

### **Solution :**
✅ **CORRIGÉ** - Dépendance vide ajoutée dans useEffect

## 🎵 **3. MODE FALLBACK ACTIVÉ**

### **Symptômes :**
- ElevenLabs échoue → Fallback vers Web Speech API
- Qualité audio réduite
- Contrôles limités

### **Solution :**
1. **Configurer ElevenLabs** (voir problème #1)
2. **Ou accepter le mode démonstration** avec Web Speech API

## 🧪 **4. TEST AUDIO INTÉGRÉ**

### **Fonctionnalités :**
- **Bouton de test** avec icône ⚡
- **Test automatique** au montage
- **Feedback visuel** immédiat
- **Synthèse vocale** de test

### **Utilisation :**
1. Cliquer sur le bouton ⚡ (Test Audio)
2. Attendre le résultat (✅ ou ❌)
3. Écouter le test audio automatique

## 📊 **INDICATEURS VISUELS**

### **Mode ElevenLabs (Professionnel) :**
- 🟢 Point vert clignotant
- "Mode ElevenLabs (Professionnel)"
- "Qualité optimale"

### **Mode Web Speech (Démonstration) :**
- 🟡 Point jaune clignotant
- "Mode Web Speech (Démonstration)"
- "Qualité limitée"

### **Mode Non Fonctionnel :**
- 🔴 Point rouge clignotant
- "Aucun service audio"
- "Non fonctionnel"

## 🛠️ **CONFIGURATION RECOMMANDÉE**

### **Pour la Production :**
```bash
# .env
VITE_ELEVENLABS_API_KEY=votre-clé-elevenlabs
VITE_GEMINI_API_KEY=votre-clé-gemini
```

### **Pour le Développement :**
- Web Speech API suffisant pour les tests
- ElevenLabs recommandé pour la démo

## 📝 **LOGS DE DIAGNOSTIC**

### **Console Logs Disponibles :**
- 🔍 Diagnostic complet au montage
- 🎙️ Logs ElevenLabs (API, requêtes, réponses)
- 🎤 Logs Web Speech (voix, langues, configuration)
- 🎵 Logs Audio (formats, support, contrôles)
- 🧪 Logs Test (succès/échec, feedback)

### **Codes de Statut :**
- ✅ Succès
- ❌ Erreur
- ⚠️ Avertissement
- 💡 Recommandation
- 🔄 Fallback

## 🚀 **PROCHAINES ÉTAPES**

1. **Configurer ElevenLabs** pour une qualité professionnelle
2. **Tester le service** avec le bouton de test intégré
3. **Vérifier les logs** dans la console pour le diagnostic
4. **Utiliser l'indicateur visuel** pour connaître le mode actuel

## 📞 **SUPPORT**

En cas de problème persistant :
1. Vérifier les logs de diagnostic
2. Tester avec le bouton de test intégré
3. Vérifier la configuration des variables d'environnement
4. Redémarrer le serveur après modification du .env
