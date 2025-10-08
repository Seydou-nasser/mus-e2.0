# Script PowerShell pour mettre à jour le fichier .env avec la syntaxe Vite
$envContent = @"
# Configuration des API pour le chatbot IA
# IMPORTANT: Ne jamais commiter ce fichier avec de vraies clés API !

# OpenAI GPT-4 (Recommandé pour le hackathon)
VITE_OPENAI_API_KEY=your-openai-api-key-here
# Claude API (Alternative)
VITE_CLAUDE_API_KEY=your-claude-api-key-here

# Configuration de l'application
VITE_API_BASE_URL=http://localhost:3001
VITE_ENVIRONMENT=development

# Configuration du musée
VITE_MUSEE_NAME=Musée des Civilisations Noires
VITE_MUSEE_VERSION=2.0
VITE_MUSEE_LANGUAGES=fr,en,wo

# ElevenLabs TTS - Audio professionnel et naturel
VITE_ELEVENLABS_API_KEY=your-elevenlabs-api-key-here
"@

$envContent | Out-File -FilePath ".env" -Encoding UTF8
Write-Host "✅ Fichier .env mis à jour avec la syntaxe Vite"
