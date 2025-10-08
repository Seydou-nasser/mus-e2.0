/**
 * CONFIGURATION DES VARIABLES D'ENVIRONNEMENT
 * Gestion sécurisée des clés API pour le chatbot
 */

// Clé API OpenAI - Chargement depuis les variables d'environnement
const OPENAI_API_KEY = 'your-openai-api-key-here';

// Clé API Hugging Face - Token temporaire pour test
const HUGGINGFACE_API_KEY = 'hf_demo_token_for_testing';

// Variables d'environnement avec validation
export const ENV_VARS = {
  // Clés API
  OPENAI_API_KEY: import.meta.env.VITE_OPENAI_API_KEY || OPENAI_API_KEY,
  CLAUDE_API_KEY: import.meta.env.VITE_CLAUDE_API_KEY || '',
  HUGGINGFACE_API_KEY: import.meta.env.VITE_HUGGINGFACE_API_KEY || HUGGINGFACE_API_KEY,
  
  // Configuration de l'application
  API_BASE_URL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001',
  ENVIRONMENT: import.meta.env.VITE_ENVIRONMENT || 'development',
  
  // Configuration du musée
  MUSEE_NAME: import.meta.env.VITE_MUSEE_NAME || 'Musée des Civilisations Noires',
  MUSEE_VERSION: import.meta.env.VITE_MUSEE_VERSION || '2.0',
  MUSEE_LANGUAGES: import.meta.env.VITE_MUSEE_LANGUAGES || 'fr,en,wo'
};

// Fonction pour vérifier si une clé API est valide
export const isValidAPIKey = (key: string): boolean => {
  return key !== '' && 
         !key.includes('your-') && 
         !key.includes('sk-your-') && 
         !key.includes('sk-ant-your-') &&
         key.length > 10;
};

// Fonction pour vérifier la configuration des API
export const checkAPIConfiguration = () => {
  console.log('🔍 DEBUG ENV_VARS.OPENAI_API_KEY:', ENV_VARS.OPENAI_API_KEY ? 'PRÉSENTE' : 'ABSENTE');
  console.log('🔍 DEBUG Longueur clé ENV_VARS:', ENV_VARS.OPENAI_API_KEY?.length || 0);
  console.log('🔍 DEBUG import.meta.env.VITE_OPENAI_API_KEY:', import.meta.env.VITE_OPENAI_API_KEY ? 'PRÉSENTE' : 'ABSENTE');
  
  const openaiValid = isValidAPIKey(ENV_VARS.OPENAI_API_KEY);
  const claudeValid = isValidAPIKey(ENV_VARS.CLAUDE_API_KEY);
  
  return {
    openai: openaiValid,
    claude: claudeValid,
    hasAnyAPI: openaiValid || claudeValid,
    openaiKey: openaiValid ? '✅ Configuré' : '❌ Non configuré',
    claudeKey: claudeValid ? '✅ Configuré' : '❌ Non configuré'
  };
};

// Fonction pour afficher l'état de la configuration
export const displayConfigStatus = () => {
  const config = checkAPIConfiguration();
  
  console.log('🔧 Configuration des API:');
  console.log(`  OpenAI GPT-4: ${config.openaiKey}`);
  console.log(`  Claude API: ${config.claudeKey}`);
  
  if (!config.hasAnyAPI) {
    console.warn('⚠️ Aucune API configurée. Le chatbot utilisera le mode fallback.');
    console.log('📝 Pour configurer les API, créez un fichier .env avec:');
    console.log('   REACT_APP_OPENAI_API_KEY=sk-your-openai-key-here');
    console.log('   REACT_APP_CLAUDE_API_KEY=sk-ant-your-claude-key-here');
  }
};

export default ENV_VARS;
