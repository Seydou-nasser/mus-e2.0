/**
 * CONFIGURATION DES VARIABLES D'ENVIRONNEMENT
 * Gestion sécurisée des clés API
 */

// Interface pour la configuration d'environnement
interface EnvConfig {
  openaiApiKey: string;
  claudeApiKey: string;
  apiBaseUrl: string;
  environment: string;
  museeName: string;
  museeVersion: string;
  museeLanguages: string[];
}

// Fonction pour récupérer une variable d'environnement avec validation
const getEnvVariable = (key: string, defaultValue: string = ''): string => {
  const value = import.meta.env[key];
  
  // Vérifier si la valeur est définie et valide
  if (!value || 
      value.includes('your-') || 
      value.includes('sk-your-') || 
      value.includes('sk-ant-your-') ||
      value === '') {
    console.warn(`⚠️ Variable d'environnement ${key} non configurée ou invalide.`);
    return defaultValue;
  }
  
  return value;
};

// Configuration des variables d'environnement
export const envConfig: EnvConfig = {
  // Clés API
  openaiApiKey: getEnvVariable('REACT_APP_OPENAI_API_KEY', ''),
  claudeApiKey: getEnvVariable('REACT_APP_CLAUDE_API_KEY', ''),
  
  // Configuration de l'application
  apiBaseUrl: getEnvVariable('REACT_APP_API_BASE_URL', 'http://localhost:3001'),
  environment: getEnvVariable('REACT_APP_ENVIRONMENT', 'development'),
  
  // Configuration du musée
  museeName: getEnvVariable('REACT_APP_MUSEE_NAME', 'Musée des Civilisations Noires'),
  museeVersion: getEnvVariable('REACT_APP_MUSEE_VERSION', '2.0'),
  museeLanguages: getEnvVariable('REACT_APP_MUSEE_LANGUAGES', 'fr,en,wo').split(',')
};

// Fonction pour vérifier si les API sont configurées
export const checkAPIConfiguration = (): {
  openai: boolean;
  claude: boolean;
  hasAnyAPI: boolean;
} => {
  const openai = envConfig.openaiApiKey !== '';
  const claude = envConfig.claudeApiKey !== '';
  
  return {
    openai,
    claude,
    hasAnyAPI: openai || claude
  };
};

// Fonction pour afficher l'état de la configuration
export const displayConfigStatus = (): void => {
  const config = checkAPIConfiguration();
  
  console.log('🔧 Configuration des API:');
  console.log(`  OpenAI GPT-4: ${config.openai ? '✅ Configuré' : '❌ Non configuré'}`);
  console.log(`  Claude API: ${config.claude ? '✅ Configuré' : '❌ Non configuré'}`);
  
  if (!config.hasAnyAPI) {
    console.warn('⚠️ Aucune API configurée. Le chatbot utilisera le mode fallback.');
    console.log('📝 Pour configurer les API, créez un fichier .env avec:');
    console.log('   REACT_APP_OPENAI_API_KEY=sk-your-openai-key-here');
    console.log('   REACT_APP_CLAUDE_API_KEY=sk-ant-your-claude-key-here');
  }
};

export default envConfig;
