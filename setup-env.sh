#!/bin/bash
# Script de configuration d'environnement pour Linux/Mac

echo "🤖 Configuration du chatbot IA"
echo

# Vérifier si le fichier .env existe
if [ -f .env ]; then
    echo "⚠️ Le fichier .env existe déjà."
    echo "📝 Vérifiez son contenu et ajoutez vos clés API."
    exit 0
fi

# Créer le fichier .env
echo "✅ Création du fichier .env..."
cat > .env << 'EOF'
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
EOF

echo "✅ Fichier .env créé avec succès !"
echo
echo "📝 Instructions:"
echo "1. Éditez le fichier .env"
echo "2. Remplacez les clés par vos vraies clés API"
echo "3. Obtenez vos clés sur:"
echo "   - OpenAI: https://platform.openai.com/api-keys"
echo "   - Claude: https://console.anthropic.com/"
echo
echo "🔑 Exemples de clés:"
echo "   REACT_APP_OPENAI_API_KEY=sk-votre-vraie-cle-openai-ici"
echo "   REACT_APP_CLAUDE_API_KEY=sk-ant-votre-vraie-cle-claude-ici"
echo
echo "📋 Prochaines étapes:"
echo "1. Éditez le fichier .env avec vos vraies clés API"
echo "2. Redémarrez l'application: npm run dev"
echo "3. Testez le chatbot dans l'application"
echo
echo "🎉 Une fois configuré, le chatbot sera vraiment fonctionnel !"
