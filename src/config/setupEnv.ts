/**
 * CONFIGURATION D'ENVIRONNEMENT POUR LE DÉVELOPPEMENT
 * Ce fichier aide à configurer les variables d'environnement
 */

import { displayConfigStatus, checkAPIConfiguration } from './environment';

// Fonction pour initialiser la configuration
export const initializeEnvironment = () => {
  console.log('🚀 Initialisation de l\'environnement...');
  
  // Afficher l'état de la configuration
  displayConfigStatus();
  
  // Vérifier la configuration
  const config = checkAPIConfiguration();
  
  if (!config.hasAnyAPI) {
    console.log('📋 Instructions pour configurer les API:');
    console.log('1. Créez un fichier .env à la racine du projet');
    console.log('2. Ajoutez vos clés API:');
    console.log('   REACT_APP_OPENAI_API_KEY=sk-your-openai-key-here');
    console.log('   REACT_APP_CLAUDE_API_KEY=sk-ant-your-claude-key-here');
    console.log('3. Redémarrez l\'application');
  }
  
  return config;
};

// Fonction pour créer un fichier .env exemple
export const createEnvExample = () => {
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

  console.log('📝 Contenu du fichier .env à créer:');
  console.log('='.repeat(50));
  console.log(envContent);
  console.log('='.repeat(50));
  
  return envContent;
};

// Fonction pour vérifier si le fichier .env existe
export const checkEnvFile = () => {
  // En mode développement, on peut vérifier si les variables sont définies
  const hasOpenAI = import.meta.env.VITE_OPENAI_API_KEY && 
                    !import.meta.env.VITE_OPENAI_API_KEY.includes('your-');
  const hasClaude = import.meta.env.VITE_CLAUDE_API_KEY && 
                    !import.meta.env.VITE_CLAUDE_API_KEY.includes('your-');
  
  return {
    hasEnvFile: hasOpenAI || hasClaude,
    hasOpenAI,
    hasClaude
  };
};

export default {
  initializeEnvironment,
  createEnvExample,
  checkEnvFile
};
