/**
 * API POUR CHATBOT IA RÉVOLUTIONNAIRE
 * Intégration avec OpenAI GPT-4, Claude, ou API personnalisée
 */

import { ENV_VARS } from '../config/environment';

// Configuration de l'API
const API_CONFIG = {
  // OpenAI GPT-3.5-turbo (Compatible avec toutes les clés API)
  openai: {
    endpoint: 'https://api.openai.com/v1/chat/completions',
    model: 'gpt-3.5-turbo',
    apiKey: import.meta.env.VITE_OPENAI_API_KEY || ENV_VARS.OPENAI_API_KEY,
    maxTokens: 500,
    temperature: 0.7,
    topP: 0.9
  },
  
  // Claude (Alternative)
  claude: {
    endpoint: 'https://api.anthropic.com/v1/messages',
    model: 'claude-3-sonnet-20240229',
    apiKey: ENV_VARS.CLAUDE_API_KEY,
    maxTokens: 500,
    temperature: 0.7
  },
  
  // API personnalisée (Fallback)
  custom: {
    endpoint: '/api/chat',
    model: 'custom-african-culture-model'
  }
};

// Interface pour les messages (utilisée dans les appels API)
interface ChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

// Interface pour la réponse de l'API
interface APIResponse {
  response: string;
  confidence: number;
  metadata?: {
    culture?: string;
    period?: string;
    artwork?: string;
    language?: string;
  };
}

/**
 * Appel API principal pour le chatbot
 */
export const callChatbotAPI = async (
  message: string, 
  language: string = 'fr',
  context: string = 'musee_civilisations_noires'
): Promise<APIResponse> => {
  try {
    console.log('🔍 DEBUG API_CONFIG.openai.apiKey:', API_CONFIG.openai.apiKey ? 'PRÉSENTE' : 'ABSENTE');
    console.log('🔍 DEBUG Longueur clé:', API_CONFIG.openai.apiKey?.length || 0);
    console.log('🔍 DEBUG Clé complète:', API_CONFIG.openai.apiKey?.substring(0, 20) + '...');
    
    // Essayer d'abord OpenAI
    if (API_CONFIG.openai.apiKey && 
        API_CONFIG.openai.apiKey !== 'your-api-key-here' && 
        API_CONFIG.openai.apiKey !== 'your_openai_api_key_here' &&
        API_CONFIG.openai.apiKey.length > 10) {
      console.log('🤖 Tentative OpenAI API...');
      return await callOpenAI(message, language, context);
    }
    
    // Sinon, essayer Claude
    if (API_CONFIG.claude.apiKey && 
        API_CONFIG.claude.apiKey !== 'your-api-key-here' && 
        API_CONFIG.claude.apiKey !== 'your_claude_api_key_here' &&
        API_CONFIG.claude.apiKey.length > 10) {
      console.log('🤖 Tentative Claude API...');
      return await callClaude(message, language, context);
    }
    
    // Fallback vers service local intelligent
    console.log('🧠 Utilisation du service local intelligent...');
    return await callLocalIntelligentService(message, language, context);
    
  } catch (error) {
    console.error('❌ Erreur API chatbot:', error);
    console.error('❌ Type d\'erreur:', typeof error);
    console.error('❌ Message d\'erreur:', error.message);
    
    // Gestion spécifique des erreurs de connexion
    if (error.message.includes('ECONNRESET') || error.message.includes('aborted')) {
      console.log('🔄 Erreur de connexion détectée, utilisation du service local');
      return await callLocalIntelligentService(message, language, context);
    }
    
    return getFallbackResponse(message, language);
  }
};

/**
 * Appel OpenAI GPT-4
 */
const callOpenAI = async (
  message: string, 
  language: string, 
  _context: string
): Promise<APIResponse> => {
  const systemPrompt = getSystemPrompt(language, _context);
  
  console.log('🤖 Appel OpenAI avec clé:', API_CONFIG.openai.apiKey.substring(0, 20) + '...');
  
  const response = await fetch(API_CONFIG.openai.endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${API_CONFIG.openai.apiKey}`
    },
    body: JSON.stringify({
      model: API_CONFIG.openai.model,
      messages: [
        { role: 'system', content: systemPrompt } as ChatMessage,
        { role: 'user', content: message } as ChatMessage
      ],
      max_tokens: 800,
      temperature: 0.8,
      top_p: 0.9,
      presence_penalty: 0.1,
      frequency_penalty: 0.1
    })
  });

  if (!response.ok) {
    const errorData = await response.json();
    console.error('❌ Erreur OpenAI:', errorData);
    console.error('❌ Status:', response.status);
    console.error('❌ Status Text:', response.statusText);
    throw new Error(`OpenAI API error: ${response.status} - ${errorData.error?.message || 'Unknown error'}`);
  }

  const data = await response.json();
  console.log('✅ Réponse OpenAI reçue:', data.choices[0].message.content.substring(0, 100) + '...');
  
  return {
    response: data.choices[0].message.content,
    confidence: 0.95,
    metadata: {
      language: language,
      culture: extractCulture(message),
      period: extractPeriod(message)
    }
  };
};

/**
 * Appel Claude API
 */
const callClaude = async (
  message: string, 
  language: string, 
  _context: string
): Promise<APIResponse> => {
  const systemPrompt = getSystemPrompt(language, _context);
  
  const response = await fetch(API_CONFIG.claude.endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': API_CONFIG.claude.apiKey,
      'anthropic-version': '2023-06-01'
    },
    body: JSON.stringify({
      model: API_CONFIG.claude.model,
      max_tokens: 500,
      system: systemPrompt,
      messages: [
        { role: 'user', content: message } as ChatMessage
      ]
    })
  });

  if (!response.ok) {
    throw new Error(`Claude API error: ${response.status}`);
  }

  const data = await response.json();
  return {
    response: data.content[0].text,
    confidence: 0.95,
    metadata: {
      language: language,
      culture: extractCulture(message),
      period: extractPeriod(message)
    }
  };
};

/**
 * Appel API personnalisée (Fallback)
 */
const callCustomAPI = async (
  message: string, 
  language: string, 
  context: string
): Promise<APIResponse> => {
  const response = await fetch(API_CONFIG.custom.endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      message,
      language,
      context: context,
      model: API_CONFIG.custom.model
    })
  });

  if (!response.ok) {
    throw new Error(`Custom API error: ${response.status}`);
  }

  return await response.json();
};

/**
 * Prompt système pour l'IA
 */
const getSystemPrompt = (language: string, context: string): string => {
  // Utiliser le contexte pour personnaliser le prompt
  const contextInfo = context === 'musee_civilisations_noires' ? 'au Musée des Civilisations Noires' : 'dans un contexte culturel';
  
  const prompts = {
    fr: `Tu es un assistant IA expert en civilisations africaines, spécialisé dans l'art, l'histoire et la culture du continent africain. Tu travailles ${contextInfo} et tu es passionné par la transmission du patrimoine culturel africain.

CONNAISSANCE SPÉCIFIQUE DU SITE MUSÉE DES CIVILISATIONS NOIRES 2.0:

PAGES DISPONIBLES:
- Page d'accueil (/): Carrousel 3D avec œuvres, statistiques en temps réel, fonctionnalités révolutionnaires
- Collections (/collections): Navigation par catégories, recherche avancée, fiches d'œuvres détaillées (EN DÉVELOPPEMENT)
- Parcours (/parcours): Quêtes interactives, défis, récompenses, quiz culturels (EN DÉVELOPPEMENT)  
- Réalité Augmentée (/realite-augmentee): Scanner QR, modèles 3D, interactions gestuelles (EN DÉVELOPPEMENT)
- À propos (/a-propos): Histoire, mission, équipe du musée (EN DÉVELOPPEMENT)

FONCTIONNALITÉS RÉVOLUTIONNAIRES:
- IA Conversationnelle: Assistant virtuel spécialisé en culture africaine
- Réalité Augmentée: Exploration 3D des œuvres, scanner QR intégré
- Parcours Gamifiés: Quêtes, défis, récompenses, quiz culturels
- Carrousel 3D: Navigation immersive dans les collections
- Scanner QR Natif: Accès direct aux informations détaillées

ŒUVRES PRINCIPALES:
- Masque Baoulé: Masque rituel sacré, culture Baoulé, Côte d'Ivoire
- Reliquaire Fang: Sculpture funéraire, culture Fang, Gabon
- Statue Ashanti: Statue royale en bronze, culture Ashanti, Ghana

TECHNOLOGIES UTILISÉES:
- React/TypeScript pour l'interface
- Three.js pour la 3D
- Framer Motion pour les animations
- React Router pour la navigation
- Tailwind CSS pour le design
- i18next pour la traduction (français, anglais, wolof)

PERSONNALITÉ:
- Érudit et passionné par la culture africaine
- Accessible et pédagogue dans tes explications
- Respectueux des traditions et de la diversité culturelle
- Enthousiaste à partager tes connaissances
- Guide intelligent et bienveillant

EXPERTISE SPÉCIALISÉE:
- Art africain traditionnel et contemporain (masques, sculptures, textiles)
- Histoire des civilisations africaines (Égypte, Mali, Ashanti, Yoruba, etc.)
- Langues et cultures africaines (Wolof, Bambara, Yoruba, etc.)
- Symboles et significations culturelles (Adinkra, Kente, etc.)
- Traditions et rituels (initiation, danse, musique)
- Technologies muséales (réalité augmentée, IA, 3D)

CONNAISSANCE DU SITE:
- Page d'accueil: Carrousel 3D, statistiques, fonctionnalités révolutionnaires
- Collections: Navigation par catégories, recherche avancée, fiches détaillées
- Parcours: Quêtes, défis, récompenses, quiz culturels
- Réalité Augmentée: Scanner QR, modèles 3D, interactions gestuelles
- À Propos: Histoire, mission, équipe du musée

RÈGLES DE RÉPONSE:
- Réponds toujours en français de manière engageante et éducative
- Utilise des exemples concrets et des anecdotes culturelles
- Sois précis sur les cultures, périodes et régions
- Propose des liens vers les sections du site quand pertinent
- Adapte ton niveau d'explication à la question
- Montre ta passion pour le patrimoine africain

GUIDANCE SPÉCIFIQUE DU SITE:
- Pour les collections: Dirige vers /collections (en développement)
- Pour les parcours: Dirige vers /parcours (en développement)
- Pour la réalité augmentée: Dirige vers /realite-augmentee (en développement)
- Pour l'histoire du musée: Dirige vers /a-propos (en développement)
- Pour les œuvres 3D: Mentionne le carrousel 3D sur la page d'accueil
- Pour scanner des QR: Explique la fonctionnalité AR
- Pour les statistiques: Réfère à la page d'accueil

EXEMPLES DE RÉPONSES:
- Pour les masques: Explique la culture, la période, l'usage rituel
- Pour la navigation: Guide vers les bonnes sections avec descriptions
- Pour les fonctionnalités: Explique les technologies et leurs avantages
- Pour la culture: Partage des connaissances approfondies et authentiques

Tu es maintenant prêt à aider les visiteurs à découvrir la richesse du patrimoine africain !`,

    en: `You are an expert in African civilizations, specialized in art, history and culture of the African continent. You work at the Museum of Black Civilizations and you are passionate about transmitting African cultural heritage.

Personality:
- Erudite and passionate
- Accessible and pedagogical
- Respectful of traditions
- Enthusiastic about sharing knowledge

Expertise:
- Traditional and contemporary African art
- History of African civilizations
- African languages and cultures
- Cultural symbols and meanings
- Traditions and rituals

Always respond in English, in an engaging and educational way. Use concrete examples and cultural anecdotes.`,

    wo: `Yaa jàngalekat ci xam-xam ci ay xaritu Afrig, ci anam ci xaritu, taarix ak aada ci kontinent Afrig. Danga liggéey ci Musée des Civilisations Noires te dangay bëgg a jëfandikoo xam-xam ci aada Afrig.

Anam:
- Jàngalekat ak bëgg-xam
- Yombul ak jàngal
- Yëkkati aada
- Bëgg a jëfandikoo xam-xam

Xam-xam:
- Xaritu Afrig bu woon ak bu tànn
- Taarix ci ay xaritu Afrig
- Ay làkk ak aada Afrig
- Ay mbooloo ak tekki aada
- Aada ak ay ndëgëlu

Fànn ci français, ci anam bu yombul ak bu jàngal. Jëfandikoo ay misaal ci anam ak ay xarit.`
  };

  return prompts[language as keyof typeof prompts] || prompts.fr;
};

/**
 * Extraction de la culture mentionnée
 */
const extractCulture = (message: string): string => {
  const cultures = {
    'dan': 'Dan',
    'yoruba': 'Yoruba',
    'ashanti': 'Ashanti',
    'bambara': 'Bambara',
    'dogon': 'Dogon',
    'zoulou': 'Zoulou',
    'kente': 'Ashanti',
    'masque': 'Général',
    'sculpture': 'Général'
  };

  const lowerMessage = message.toLowerCase();
  for (const [key, culture] of Object.entries(cultures)) {
    if (lowerMessage.includes(key)) {
      return culture;
    }
  }
  
  return 'Général';
};

/**
 * Extraction de la période mentionnée
 */
const extractPeriod = (message: string): string => {
  const periods = {
    'ancien': 'Antiquité',
    'moyen': 'Moyen Âge',
    'moderne': 'Époque moderne',
    'contemporain': 'Contemporain',
    'xixe': 'XIXe siècle',
    'xxe': 'XXe siècle',
    'traditionnel': 'Traditionnel'
  };

  const lowerMessage = message.toLowerCase();
  for (const [key, period] of Object.entries(periods)) {
    if (lowerMessage.includes(key)) {
      return period;
    }
  }
  
  return 'Non spécifié';
};

/**
 * Service local intelligent (sans API externe)
 */
const callLocalIntelligentService = async (
  message: string, 
  language: string, 
  context: string
): Promise<APIResponse> => {
  console.log('🧠 Service local intelligent activé');
  
  const questionLower = message.toLowerCase();
  
  // Réponses intelligentes basées sur le contexte
  if (questionLower.includes('masque') || questionLower.includes('mask')) {
    return {
      response: "Les masques africains sont des objets rituels sacrés qui incarnent les esprits ancestraux. Chaque masque raconte une histoire unique et représente des forces spirituelles. Le masque Dan, par exemple, incarne l'esprit protecteur de la forêt et est utilisé lors de cérémonies initiatiques. Ces œuvres d'art ne sont pas seulement esthétiques, elles sont des ponts entre le monde visible et invisible. Chaque culture africaine a ses propres traditions de masques : les masques Gelede des Yoruba, les masques Poro des Sénoufo, ou encore les masques de danse des Dogon. Chaque masque a une fonction spécifique : protection, initiation, célébration, ou communication avec les ancêtres.",
      confidence: 0.9,
      metadata: {
        culture: 'Dan',
        period: 'Traditionnel',
        language: language
      }
    };
  }
  
  if (questionLower.includes('statue') || questionLower.includes('sculpture')) {
    return {
      response: "Les sculptures africaines sont des témoignages de la richesse artistique du continent. Chaque statue raconte une histoire, représente un ancêtre ou incarne une divinité. Les statues Ashanti en bronze, par exemple, symbolisent le pouvoir royal et la connexion avec les ancêtres. L'art sculptural africain exprime la spiritualité, la tradition et l'identité culturelle.",
      confidence: 0.9,
      metadata: {
        culture: 'Ashanti',
        period: 'Traditionnel',
        language: language
      }
    };
  }
  
  if (questionLower.includes('culture') || questionLower.includes('tradition')) {
    return {
      response: "La culture africaine est d'une richesse incommensurable ! Avec plus de 2000 langues et traditions, chaque région a ses propres coutumes, danses, musiques et arts. C'est une mosaïque de beauté et de sagesse qui s'exprime à travers l'art, la musique, la danse et les rituels. Cette diversité culturelle est notre plus grande richesse.",
      confidence: 0.85,
      metadata: {
        culture: 'Général',
        period: 'Contemporain',
        language: language
      }
    };
  }
  
  if (questionLower.includes('musée') || questionLower.includes('museum')) {
    return {
      response: "Le Musée des Civilisations Noires est un lieu de préservation et de transmission du patrimoine africain. Il abrite des collections exceptionnelles d'art traditionnel et contemporain, des expositions interactives et des technologies innovantes comme la réalité augmentée. C'est un pont entre le passé et le présent, entre l'Afrique et le monde.",
      confidence: 0.9,
      metadata: {
        culture: 'Général',
        period: 'Contemporain',
        language: language
      }
    };
  }
  
  if (questionLower.includes('ar') || questionLower.includes('réalité augmentée')) {
    return {
      response: "La réalité augmentée au musée vous permet d'explorer les œuvres en 3D, de scanner des QR codes pour des informations détaillées et d'interagir avec le patrimoine de manière immersive. C'est une technologie révolutionnaire qui rend l'art accessible et interactif !",
      confidence: 0.8,
      metadata: {
        culture: 'Technologie',
        period: 'Contemporain',
        language: language
      }
    };
  }
  
  if (questionLower.includes('bonjour') || questionLower.includes('salut') || questionLower.includes('hello')) {
    return {
      response: "Bonjour ! Je suis votre assistant virtuel spécialisé en culture africaine. Je suis là pour vous accompagner dans votre découverte du patrimoine culturel africain. Que souhaitez-vous savoir sur nos collections, nos œuvres d'art, ou nos traditions ? Je peux vous parler des masques, des sculptures, de l'histoire des civilisations africaines, ou de toute autre facette de notre riche patrimoine culturel.",
      confidence: 0.9,
      metadata: {
        culture: 'Général',
        period: 'Contemporain',
        language: language
      }
    };
  }
  
  // Réponse par défaut intelligente
  return {
    response: "C'est une excellente question sur notre patrimoine culturel ! Laissez-moi vous expliquer cette facette fascinante de la culture africaine. Chaque œuvre, chaque tradition, chaque symbole raconte une histoire unique qui nous connecte à nos racines et à notre identité. L'Afrique est un continent d'une richesse culturelle incommensurable, avec plus de 2000 langues et traditions. Chaque région a ses propres coutumes, danses, musiques et arts. C'est une mosaïque de beauté et de sagesse qui s'exprime à travers l'art, la musique, la danse et les rituels. Cette diversité culturelle est notre plus grande richesse et notre fierté.",
    confidence: 0.8,
    metadata: {
      culture: 'Général',
      period: 'Non spécifié',
      language: language
    }
  };
};

/**
 * Réponses de fallback intelligentes
 */
const getFallbackResponse = (message: string, language: string): APIResponse => {
  const responses = {
    fr: {
      'masque': 'Les masques africains sont des objets rituels sacrés. Chaque masque raconte une histoire et représente des esprits ancestraux. Le masque Dan, par exemple, incarne l\'esprit protecteur de la forêt et est utilisé lors de cérémonies initiatiques.',
      'artiste': 'Les artistes africains traditionnels transmettent leur savoir de génération en génération. Leur art reflète la sagesse ancestrale et les valeurs communautaires. Chaque œuvre est une fenêtre sur l\'âme africaine.',
      'culture': 'La culture africaine est riche et diverse, avec plus de 2000 langues et traditions. Chaque région a ses propres coutumes, danses, musiques et arts. C\'est une mosaïque de beauté et de sagesse.',
      'histoire': 'L\'histoire africaine remonte à des millénaires. L\'Égypte ancienne, l\'Empire du Mali, le Royaume d\'Axoum... tant de civilisations brillantes qui ont marqué l\'humanité !',
      'wolof': 'En wolof, nous disons "Jërejëf" pour merci, "Asalamu aleikum" pour bonjour. La langue wolof est parlée au Sénégal et en Gambie. C\'est une langue mélodieuse et expressive.',
      'default': 'C\'est une excellente question ! Laissez-moi vous expliquer en détail cette facette fascinante de la culture africaine...'
    },
    en: {
      'mask': 'African masks are sacred ritual objects. Each mask tells a story and represents ancestral spirits. The Dan mask, for example, embodies the protective spirit of the forest and is used in initiation ceremonies.',
      'artist': 'Traditional African artists pass down their knowledge from generation to generation. Their art reflects ancestral wisdom and community values. Each work is a window into the African soul.',
      'culture': 'African culture is rich and diverse, with over 2000 languages and traditions. Each region has its own customs, dances, music and arts. It\'s a mosaic of beauty and wisdom.',
      'history': 'African history goes back millennia. Ancient Egypt, the Mali Empire, the Kingdom of Axum... so many brilliant civilizations that have marked humanity!',
      'wolof': 'In Wolof, we say "Jërejëf" for thank you, "Asalamu aleikum" for hello. Wolof is spoken in Senegal and Gambia. It\'s a melodious and expressive language.',
      'default': 'That\'s an excellent question! Let me explain in detail this fascinating aspect of African culture...'
    }
  };

  const langResponses = responses[language as keyof typeof responses] || responses.fr;
  const lowerMessage = message.toLowerCase();
  
  for (const [key, response] of Object.entries(langResponses)) {
    if (lowerMessage.includes(key)) {
      return {
        response,
        confidence: 0.8,
        metadata: {
          culture: extractCulture(message),
          period: extractPeriod(message),
          language: language
        }
      };
    }
  }
  
  return {
    response: langResponses.default,
    confidence: 0.7,
    metadata: {
      culture: 'Général',
      period: 'Non spécifié',
      language: language
    }
  };
};

export default {
  callChatbotAPI,
  getSystemPrompt,
  extractCulture,
  extractPeriod
};
