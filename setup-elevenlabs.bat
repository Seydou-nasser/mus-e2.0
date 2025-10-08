@echo off
echo 🎙️ Configuration ElevenLabs pour le Guide Audio
echo ================================================

REM Vérifier si le fichier .env existe
if exist ".env" (
    echo ✅ Fichier .env trouvé
) else (
    echo 📝 Création du fichier .env...
    copy "env.example" ".env"
    echo ✅ Fichier .env créé à partir de env.example
)

echo.
echo 🔑 Configuration de la clé API ElevenLabs
echo 1. Allez sur https://elevenlabs.io/
echo 2. Créez un compte ou connectez-vous
echo 3. Allez dans votre dashboard
echo 4. Copiez votre clé API
echo.

set /p apiKey="Entrez votre clé API ElevenLabs: "

if not "%apiKey%"=="" (
    REM Mettre à jour le fichier .env
    powershell -Command "(Get-Content '.env') -replace 'VITE_ELEVENLABS_API_KEY=.*', 'VITE_ELEVENLABS_API_KEY=%apiKey%' | Set-Content '.env'"
    
    echo ✅ Clé API ElevenLabs configurée avec succès!
    echo.
    echo 🚀 Prochaines étapes:
    echo 1. Redémarrez le serveur: npm run dev
    echo 2. Ouvrez l'application dans le navigateur
    echo 3. Testez le guide audio avec le bouton ⚡
    echo 4. Vérifiez que le mode passe à 'ElevenLabs (Professionnel)'
) else (
    echo ❌ Aucune clé API fournie
    echo Le service fonctionnera en mode démonstration avec Web Speech API
)

echo.
echo 📚 Documentation complète: AUDIO_TROUBLESHOOTING.md
echo 🎯 Test du service: Utilisez le bouton ⚡ dans l'interface audio
pause
