/**
 * Service Chatbot IA Intelligent
 * Connaissance complète du site et réponses contextuelles
 */

// Base de connaissances du site
export const SITE_KNOWLEDGE = {
  pages: {
    accueil: {
      path: "/",
      title: "Page d'Accueil",
      description: "Découvrez l'expérience muséale révolutionnaire avec l'IA, la réalité augmentée et l'innovation",
      features: ["Carrousel 3D", "Statistiques", "Fonctionnalités révolutionnaires", "Hero section"]
    },
    collections: {
      path: "/collections",
      title: "Collections Révolutionnaires",
      description: "Explorez nos collections numériques enrichies avec des modèles 3D et des histoires interactives",
      features: ["Navigation par catégories", "Recherche avancée", "Fiches d'œuvres détaillées"],
      status: "En développement"
    },
    parcours: {
      path: "/parcours",
      title: "Parcours Interactifs & Gamifiés",
      description: "Découvrez le musée à travers des quêtes, des défis et des récompenses uniques",
      features: ["Création de parcours personnalisés", "Suivi de progression", "Quiz culturels"],
      status: "En développement"
    },
    realiteAugmentee: {
      path: "/realite-augmentee",
      title: "Expérience en Réalité Augmentée",
      description: "Plongez au cœur des œuvres avec des superpositions numériques interactives",
      features: ["Scanner QR intégré", "Modèles 3D en AR", "Animations et effets visuels"],
      status: "En développement"
    },
    aPropos: {
      path: "/a-propos",
      title: "À Propos du Musée",
      description: "Découvrez l'histoire, la mission et l'équipe derrière le Musée des Civilisations Noires",
      features: ["Présentation du musée", "Informations de contact", "Partenaires"],
      status: "En développement"
    }
  },
  oeuvres: {
    masqueBaoule: {
      title: "Masque Baoulé",
      description: "Masque cérémoniel du peuple Baoulé, Côte d'Ivoire",
      periode: "XIXe siècle",
      region: "Côte d'Ivoire",
      culture: "Peuple Baoulé"
    },
    statueAshanti: {
      title: "Statue Ashanti",
      description: "Figure royale Ashanti en bronze, Ghana",
      periode: "XVIIIe siècle",
      region: "Ghana",
      culture: "Peuple Ashanti"
    },
    reliquaireFang: {
      title: "Reliquaire Fang",
      description: "Reliquaire ancestral Fang, Gabon",
      periode: "XIXe siècle",
      region: "Gabon",
      culture: "Peuple Fang"
    }
  },
  fonctionnalites: {
    ia: {
      title: "Assistant IA",
      description: "Assistant virtuel spécialisé en culture africaine",
      capabilities: ["Réponses contextuelles", "Navigation assistée", "Informations culturelles"]
    },
    ar: {
      title: "Réalité Augmentée",
      description: "Expérience immersive avec superposition numérique",
      capabilities: ["Scanner QR", "Modèles 3D", "Interactions gestuelles"]
    },
    carrousel: {
      title: "Carrousel 3D",
      description: "Navigation interactive dans les œuvres",
      capabilities: ["Rotation automatique", "Contrôles utilisateur", "Informations détaillées"]
    }
  }
};

// Mots-clés pour la reconnaissance
export const KEYWORDS = {
  navigation: ["page", "section", "aller", "naviguer", "visiter", "voir"],
  oeuvres: ["œuvre", "masque", "statue", "reliquaire", "art", "culture"],
  fonctionnalites: ["ia", "ar", "réalité augmentée", "carrousel", "3d"],
  informations: ["quoi", "comment", "où", "quand", "pourquoi", "expliquer"]
};

/**
 * Analyse intelligente de la question utilisateur
 */
export const analyzeUserQuestion = (question: string): {
  intent: string;
  entities: string[];
  confidence: number;
} => {
  const questionLower = question.toLowerCase();
  let intent = "general";
  const entities: string[] = [];
  let confidence = 0.5;

  // Détection d'intention de navigation
  if (KEYWORDS.navigation.some(keyword => questionLower.includes(keyword))) {
    intent = "navigation";
    confidence = 0.8;
  }

  // Détection d'intention sur les œuvres
  if (KEYWORDS.oeuvres.some(keyword => questionLower.includes(keyword))) {
    intent = "oeuvres";
    confidence = 0.9;
  }

  // Détection d'intention sur les fonctionnalités
  if (KEYWORDS.fonctionnalites.some(keyword => questionLower.includes(keyword))) {
    intent = "fonctionnalites";
    confidence = 0.9;
  }

  // Détection d'entités
  Object.keys(SITE_KNOWLEDGE.pages).forEach(pageKey => {
    const page = SITE_KNOWLEDGE.pages[pageKey as keyof typeof SITE_KNOWLEDGE.pages];
    if (questionLower.includes(page.title.toLowerCase()) || 
        questionLower.includes(pageKey)) {
      entities.push(pageKey);
    }
  });

  Object.keys(SITE_KNOWLEDGE.oeuvres).forEach(oeuvreKey => {
    const oeuvre = SITE_KNOWLEDGE.oeuvres[oeuvreKey as keyof typeof SITE_KNOWLEDGE.oeuvres];
    if (questionLower.includes(oeuvre.title.toLowerCase()) || 
        questionLower.includes(oeuvreKey)) {
      entities.push(oeuvreKey);
    }
  });

  return { intent, entities, confidence };
};

/**
 * Génération de réponse intelligente
 */
export const generateIntelligentResponse = (question: string): {
  text: string;
  links?: { text: string; url: string }[];
  tags: string[];
  confidence: number;
} => {
  const analysis = analyzeUserQuestion(question);
  const questionLower = question.toLowerCase();

  // Réponses de navigation
  if (analysis.intent === "navigation") {
    const pageEntity = analysis.entities.find(entity => 
      Object.keys(SITE_KNOWLEDGE.pages).includes(entity)
    );
    
    if (pageEntity) {
      const page = SITE_KNOWLEDGE.pages[pageEntity as keyof typeof SITE_KNOWLEDGE.pages];
      return {
        text: `Je vous guide vers la ${page.title}. ${page.description}`,
        links: [{
          text: `Visiter ${page.title}`,
          url: page.path
        }],
        tags: ["Navigation", "Guide"],
        confidence: 0.9
      };
    }

    // Navigation générale
    return {
      text: "Voici les sections principales de notre musée :",
      links: [
        { text: "🏠 Page d'Accueil", url: "/" },
        { text: "🎨 Collections", url: "/collections" },
        { text: "🗺️ Parcours", url: "/parcours" },
        { text: "🥽 Réalité Augmentée", url: "/realite-augmentee" },
        { text: "ℹ️ À Propos", url: "/a-propos" }
      ],
      tags: ["Navigation", "Guide"],
      confidence: 0.8
    };
  }

  // Réponses sur les œuvres
  if (analysis.intent === "oeuvres") {
    const oeuvreEntity = analysis.entities.find(entity => 
      Object.keys(SITE_KNOWLEDGE.oeuvres).includes(entity)
    );
    
    if (oeuvreEntity) {
      const oeuvre = SITE_KNOWLEDGE.oeuvres[oeuvreEntity as keyof typeof SITE_KNOWLEDGE.oeuvres];
      return {
        text: `${oeuvre.title} : ${oeuvre.description}. Période : ${oeuvre.periode}, Région : ${oeuvre.region}, Culture : ${oeuvre.culture}.`,
        tags: ["Œuvre", "Culture", oeuvre.culture],
        confidence: 0.95
      };
    }

    return {
      text: "Nos collections incluent des masques Baoulé, des statues Ashanti et des reliquaires Fang. Chaque œuvre raconte une histoire unique de notre patrimoine africain.",
      tags: ["Collections", "Patrimoine"],
      confidence: 0.8
    };
  }

  // Réponses sur les fonctionnalités
  if (analysis.intent === "fonctionnalites") {
    if (questionLower.includes("ia") || questionLower.includes("assistant")) {
      return {
        text: "Je suis votre assistant IA spécialisé en culture africaine. Je peux vous guider, répondre à vos questions et vous aider à naviguer dans le musée.",
        tags: ["IA", "Assistant"],
        confidence: 0.9
      };
    }

    if (questionLower.includes("ar") || questionLower.includes("réalité augmentée")) {
      return {
        text: "La réalité augmentée vous permet d'explorer les œuvres en 3D, de scanner des QR codes pour des informations détaillées et d'interagir avec le patrimoine de manière immersive.",
        links: [{
          text: "Essayer la Réalité Augmentée",
          url: "/realite-augmentee"
        }],
        tags: ["AR", "Innovation"],
        confidence: 0.9
      };
    }
  }

  // Réponses contextuelles générales
  if (questionLower.includes("bonjour") || questionLower.includes("salut")) {
    return {
      text: "Bonjour ! Je suis votre guide virtuel du Musée des Civilisations Noires. Comment puis-je vous aider à découvrir notre patrimoine africain ?",
      tags: ["Accueil", "Guide"],
      confidence: 0.9
    };
  }

  if (questionLower.includes("aide") || questionLower.includes("help")) {
    return {
      text: "Je peux vous aider à :\n• Naviguer dans le musée\n• Découvrir nos œuvres\n• Utiliser nos fonctionnalités\n• Répondre à vos questions culturelles\n\nQue souhaitez-vous explorer ?",
      tags: ["Aide", "Guide"],
      confidence: 0.9
    };
  }

  // Réponse par défaut intelligente
  return {
    text: "Je comprends votre question. Pouvez-vous me donner plus de détails ? Je peux vous aider avec la navigation, les œuvres, ou nos fonctionnalités innovantes.",
    tags: ["Clarification"],
    confidence: 0.6
  };
};

/**
 * Service principal du chatbot
 */
export class ChatbotService {
  private static instance: ChatbotService;
  private conversationHistory: Array<{role: string, content: string}> = [];

  static getInstance(): ChatbotService {
    if (!ChatbotService.instance) {
      ChatbotService.instance = new ChatbotService();
    }
    return ChatbotService.instance;
  }

  async processMessage(userMessage: string): Promise<{
    response: string;
    links?: { text: string; url: string }[];
    tags: string[];
    confidence: number;
  }> {
    // Ajouter le message utilisateur à l'historique
    this.conversationHistory.push({ role: "user", content: userMessage });

    // Générer une réponse intelligente
    const response = generateIntelligentResponse(userMessage);

    // Ajouter la réponse à l'historique
    this.conversationHistory.push({ role: "assistant", content: response.text });

    // Limiter l'historique à 10 messages
    if (this.conversationHistory.length > 10) {
      this.conversationHistory = this.conversationHistory.slice(-10);
    }

    return {
      response: response.text,
      links: response.links,
      tags: response.tags,
      confidence: response.confidence
    };
  }

  getConversationHistory() {
    return this.conversationHistory;
  }

  clearHistory() {
    this.conversationHistory = [];
  }
}
