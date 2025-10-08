# Script de configuration ElevenLabs pour le Musée des Civilisations Noires 2.0
# Exécuter avec: .\setup-elevenlabs.ps1

Write-Host "🎙️ Configuration ElevenLabs pour le Guide Audio" -ForegroundColor Cyan
Write-Host "================================================" -ForegroundColor Cyan

# Vérifier si le fichier .env existe
if (Test-Path ".env") {
    Write-Host "✅ Fichier .env trouvé" -ForegroundColor Green
} else {
    Write-Host "📝 Création du fichier .env..." -ForegroundColor Yellow
    Copy-Item "env.example" ".env"
    Write-Host "✅ Fichier .env créé à partir de env.example" -ForegroundColor Green
}

# Demander la clé API ElevenLabs
Write-Host ""
Write-Host "🔑 Configuration de la clé API ElevenLabs" -ForegroundColor Yellow
Write-Host "1. Allez sur https://elevenlabs.io/" -ForegroundColor White
Write-Host "2. Créez un compte ou connectez-vous" -ForegroundColor White
Write-Host "3. Allez dans votre dashboard" -ForegroundColor White
Write-Host "4. Copiez votre clé API" -ForegroundColor White
Write-Host ""

$apiKey = Read-Host "Entrez votre clé API ElevenLabs"

if ($apiKey -and $apiKey -ne "") {
    # Mettre à jour le fichier .env
    $envContent = Get-Content ".env" -Raw
    $envContent = $envContent -replace "VITE_ELEVENLABS_API_KEY=.*", "VITE_ELEVENLABS_API_KEY=$apiKey"
    Set-Content ".env" $envContent
    
    Write-Host "✅ Clé API ElevenLabs configurée avec succès!" -ForegroundColor Green
    Write-Host ""
    Write-Host "🚀 Prochaines étapes:" -ForegroundColor Cyan
    Write-Host "1. Redémarrez le serveur: npm run dev" -ForegroundColor White
    Write-Host "2. Ouvrez l'application dans le navigateur" -ForegroundColor White
    Write-Host "3. Testez le guide audio avec le bouton ⚡" -ForegroundColor White
    Write-Host "4. Vérifiez que le mode passe à 'ElevenLabs (Professionnel)'" -ForegroundColor White
} else {
    Write-Host "❌ Aucune clé API fournie" -ForegroundColor Red
    Write-Host "Le service fonctionnera en mode démonstration avec Web Speech API" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "📚 Documentation complète: AUDIO_TROUBLESHOOTING.md" -ForegroundColor Blue
Write-Host "🎯 Test du service: Utilisez le bouton ⚡ dans l'interface audio" -ForegroundColor Blue
