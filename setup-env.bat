@echo off
REM Script de configuration d'environnement pour Windows

echo 🤖 Configuration du chatbot IA
echo.

REM Vérifier si le fichier .env existe
if exist .env (
    echo ⚠️ Le fichier .env existe déjà.
    echo 📝 Vérifiez son contenu et ajoutez vos clés API.
    goto :check
)

REM Créer le fichier .env
echo ✅ Création du fichier .env...
(
echo # Configuration des API pour le chatbot IA
echo # IMPORTANT: Ne jamais commiter ce fichier avec de vraies clés API !
echo.
echo # OpenAI GPT-4 ^(Recommandé pour le hackathon^)
echo REACT_APP_OPENAI_API_KEY=sk-your-openai-key-here
echo.
echo # Claude API ^(Alternative^)
echo REACT_APP_CLAUDE_API_KEY=sk-ant-your-claude-key-here
echo.
echo # Configuration de l'application
echo REACT_APP_API_BASE_URL=http://localhost:3001
echo REACT_APP_ENVIRONMENT=development
echo.
echo # Configuration du musée
echo REACT_APP_MUSEE_NAME=Musée des Civilisations Noires
echo REACT_APP_MUSEE_VERSION=2.0
echo REACT_APP_MUSEE_LANGUAGES=fr,en,wo
) > .env

echo ✅ Fichier .env créé avec succès !
echo.
echo 📝 Instructions:
echo 1. Éditez le fichier .env
echo 2. Remplacez les clés par vos vraies clés API
echo 3. Obtenez vos clés sur:
echo    - OpenAI: https://platform.openai.com/api-keys
echo    - Claude: https://console.anthropic.com/
echo.
echo 🔑 Exemples de clés:
echo    REACT_APP_OPENAI_API_KEY=sk-votre-vraie-cle-openai-ici
echo    REACT_APP_CLAUDE_API_KEY=sk-ant-votre-vraie-cle-claude-ici
echo.

:check
echo 🔧 Vérification de la configuration...
echo.
echo 📋 Prochaines étapes:
echo 1. Éditez le fichier .env avec vos vraies clés API
echo 2. Redémarrez l'application: npm run dev
echo 3. Testez le chatbot dans l'application
echo.
echo 🎉 Une fois configuré, le chatbot sera vraiment fonctionnel !
pause
