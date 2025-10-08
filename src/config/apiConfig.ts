/**
 * CONFIGURATION DES API
 * Configuration centralisée pour toutes les API du musée
 */

// Configuration des variables d'environnement
const getEnvVar = (key: string, defaultValue: string = ''): string => {
  const value = import.meta.env[key];
  if (!value || value.includes('your-') || value.includes('sk-your-') || value.includes('sk-ant-your-')) {
    console.warn(`⚠️ Variable d'environnement ${key} non configurée ou invalide. Utilisation du fallback.`);
    return defaultValue;
  }
  return value;
};

export const API_CONFIG = {
  // OpenAI GPT-4 (Recommandé pour le hackathon)
  openai: {
    endpoint: 'https://api.openai.com/v1/chat/completions',
    model: 'gpt-4',
    apiKey: getEnvVar('REACT_APP_OPENAI_API_KEY', ''),
    maxTokens: 500,
    temperature: 0.7,
    topP: 0.9
  },
  
  // Claude (Alternative)
  claude: {
    endpoint: 'https://api.anthropic.com/v1/messages',
    model: 'claude-3-sonnet-20240229',
    apiKey: getEnvVar('REACT_APP_CLAUDE_API_KEY', ''),
    maxTokens: 500,
    temperature: 0.7
  },
  
  // API personnalisée (Fallback)
  custom: {
    endpoint: '/api/chat',
    model: 'custom-african-culture-model',
    maxTokens: 500,
    temperature: 0.7
  },
  
  // Configuration du musée
  musee: {
    name: 'Musée des Civilisations Noires',
    version: '2.0',
    languages: ['fr', 'en', 'wo'],
    defaultLanguage: 'fr'
  },
  
  // Configuration de l'environnement
  environment: {
    isDevelopment: import.meta.env.DEV,
    isProduction: import.meta.env.PROD,
    apiBaseUrl: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001'
  }
};

// Fonction pour vérifier la disponibilité des API
export const checkAPIAvailability = async () => {
  const results = {
    openai: false,
    claude: false,
    custom: false
  };

  // Vérifier OpenAI
  if (API_CONFIG.openai.apiKey !== 'sk-your-openai-key-here') {
    try {
      const response = await fetch(API_CONFIG.openai.endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${API_CONFIG.openai.apiKey}`
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: [{ role: 'user', content: 'test' }],
          max_tokens: 1
        })
      });
      results.openai = response.ok;
    } catch (error) {
      console.error('OpenAI API non disponible:', error);
    }
  }

  // Vérifier Claude
  if (API_CONFIG.claude.apiKey !== 'sk-ant-your-claude-key-here') {
    try {
      const response = await fetch(API_CONFIG.claude.endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': API_CONFIG.claude.apiKey,
          'anthropic-version': '2023-06-01'
        },
        body: JSON.stringify({
          model: 'claude-3-haiku-20240307',
          max_tokens: 1,
          messages: [{ role: 'user', content: 'test' }]
        })
      });
      results.claude = response.ok;
    } catch (error) {
      console.error('Claude API non disponible:', error);
    }
  }

  // Vérifier API personnalisée
  try {
    const response = await fetch(API_CONFIG.custom.endpoint, {
      method: 'GET'
    });
    results.custom = response.ok;
  } catch (error) {
    console.error('API personnalisée non disponible:', error);
  }

  return results;
};

// Fonction pour obtenir la meilleure API disponible
export const getBestAvailableAPI = async () => {
  const availability = await checkAPIAvailability();
  
  if (availability.openai) return 'openai';
  if (availability.claude) return 'claude';
  if (availability.custom) return 'custom';
  
  return 'fallback';
};

export default API_CONFIG;
