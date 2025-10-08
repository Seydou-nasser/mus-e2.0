#!/usr/bin/env node

/**
 * SCRIPT DE CONFIGURATION D'ENVIRONNEMENT
 * Aide à configurer les variables d'environnement pour le chatbot
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Contenu du fichier .env
const envContent = `# Configuration des API pour le chatbot IA
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
REACT_APP_MUSEE_LANGUAGES=fr,en,wo`;

// Fonction pour créer le fichier .env
function createEnvFile() {
  const envPath = path.join(__dirname, '..', '.env');
  
  if (fs.existsSync(envPath)) {
    console.log('⚠️ Le fichier .env existe déjà.');
    console.log('📝 Vérifiez son contenu et ajoutez vos clés API.');
    return;
  }
  
  try {
    fs.writeFileSync(envPath, envContent);
    console.log('✅ Fichier .env créé avec succès !');
    console.log('📝 Éditez le fichier .env et ajoutez vos clés API.');
    console.log('🔑 Obtenez vos clés sur :');
    console.log('   - OpenAI: https://platform.openai.com/api-keys');
    console.log('   - Claude: https://console.anthropic.com/');
  } catch (error) {
    console.error('❌ Erreur lors de la création du fichier .env:', error.message);
  }
}

// Fonction pour vérifier la configuration
function checkConfiguration() {
  const envPath = path.join(__dirname, '..', '.env');
  
  if (!fs.existsSync(envPath)) {
    console.log('❌ Fichier .env non trouvé.');
    console.log('📝 Exécutez: node scripts/setup-env.js create');
    return;
  }
  
  const envContent = fs.readFileSync(envPath, 'utf8');
  const hasOpenAI = envContent.includes('REACT_APP_OPENAI_API_KEY') && 
                    !envContent.includes('sk-your-openai-key-here');
  const hasClaude = envContent.includes('REACT_APP_CLAUDE_API_KEY') && 
                    !envContent.includes('sk-ant-your-claude-key-here');
  
  console.log('🔧 État de la configuration:');
  console.log(`  OpenAI GPT-4: ${hasOpenAI ? '✅ Configuré' : '❌ Non configuré'}`);
  console.log(`  Claude API: ${hasClaude ? '✅ Configuré' : '❌ Non configuré'}`);
  
  if (!hasOpenAI && !hasClaude) {
    console.log('⚠️ Aucune API configurée. Le chatbot utilisera le mode fallback.');
    console.log('📝 Éditez le fichier .env et ajoutez vos clés API.');
  }
}

// Fonction pour afficher l'aide
function showHelp() {
  console.log('🤖 Script de configuration du chatbot IA');
  console.log('');
  console.log('Usage: node scripts/setup-env.js [command]');
  console.log('');
  console.log('Commands:');
  console.log('  create     Créer le fichier .env');
  console.log('  check      Vérifier la configuration');
  console.log('  help       Afficher cette aide');
  console.log('');
  console.log('Exemples:');
  console.log('  node scripts/setup-env.js create');
  console.log('  node scripts/setup-env.js check');
}

// Fonction principale
function main() {
  const command = process.argv[2];
  
  switch (command) {
    case 'create':
      createEnvFile();
      break;
    case 'check':
      checkConfiguration();
      break;
    case 'help':
    case '--help':
    case '-h':
      showHelp();
      break;
    default:
      console.log('❌ Commande non reconnue.');
      showHelp();
      break;
  }
}

// Exécuter le script
main();
