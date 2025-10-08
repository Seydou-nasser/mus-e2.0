/**
 * SERVICE IA INTELLIGENT RÉVOLUTIONNAIRE
 * Intelligence artificielle avancée pour le Musée des Civilisations Noires
 */

// Base de connaissances étendue
export const EXTENDED_KNOWLEDGE = {
  // Pages du site
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
      features: ["Scanner QR intégré", "Modèles 3D en AR", "Animations et effets visuels", "Tutoriel AR interactif", "Scanner d'œuvres d'art"],
      status: "Fonctionnel",
      details: "La page AR est entièrement fonctionnelle avec un scanner QR intégré, des modèles 3D interactifs et un tutoriel complet pour utiliser la réalité augmentée avec les œuvres du musée."
    },
    aPropos: {
      path: "/a-propos",
      title: "À Propos du Musée",
      description: "Découvrez l'histoire, la mission et l'équipe derrière le Musée des Civilisations Noires",
      features: ["Présentation du musée", "Informations de contact", "Partenaires"],
      status: "En développement"
    }
  },
  
  // Œuvres avec descriptions détaillées
  oeuvres: {
    masqueBaoule: {
      title: "Masque Baoulé",
      description: "Masque cérémoniel du peuple Baoulé, Côte d'Ivoire",
      periode: "XIXe siècle",
      region: "Côte d'Ivoire",
      culture: "Peuple Baoulé",
      details: "Le masque Baoulé est un objet rituel sacré utilisé lors des cérémonies d'initiation. Il représente les esprits ancestraux et sert de médiateur entre le monde visible et invisible. Les motifs géométriques symbolisent l'harmonie cosmique.",
      usage: "Cérémonies d'initiation, danses rituelles, protection spirituelle"
    },
    statueAshanti: {
      title: "Statue Ashanti",
      description: "Figure royale Ashanti en bronze, Ghana",
      periode: "XVIIIe siècle",
      region: "Ghana",
      culture: "Peuple Ashanti",
      details: "Les statues Ashanti en bronze symbolisent le pouvoir royal et la connexion avec les ancêtres. Elles sont créées selon la technique de la cire perdue, transmise de génération en génération.",
      usage: "Culte des ancêtres, symboles de pouvoir, art royal"
    },
    reliquaireFang: {
      title: "Reliquaire Fang",
      description: "Reliquaire ancestral Fang, Gabon",
      periode: "XIXe siècle",
      region: "Gabon",
      culture: "Peuple Fang",
      details: "Le reliquaire Fang contient les ossements des ancêtres et sert de lien spirituel entre les vivants et les morts. Il est gardé par le chef de famille et consulté lors des décisions importantes.",
      usage: "Culte des ancêtres, protection familiale, rituels de guérison"
    }
  },
  
  // Fonctionnalités du musée
  fonctionnalites: {
    ia: {
      title: "Assistant IA",
      description: "Assistant virtuel spécialisé en culture africaine",
      capabilities: ["Réponses contextuelles", "Navigation assistée", "Informations culturelles", "Traduction multilingue"],
      technologies: ["GPT-4", "Claude", "Machine Learning", "NLP"]
    },
    ar: {
      title: "Réalité Augmentée",
      description: "Expérience immersive avec superposition numérique",
      capabilities: ["Scanner QR", "Modèles 3D", "Interactions gestuelles", "Animations"],
      technologies: ["WebXR", "Three.js", "AR.js", "Computer Vision"]
    },
    carrousel: {
      title: "Carrousel 3D",
      description: "Navigation interactive dans les œuvres",
      capabilities: ["Rotation automatique", "Contrôles utilisateur", "Informations détaillées", "Zoom 3D"],
      technologies: ["Three.js", "React Three Fiber", "WebGL", "3D Modeling"]
    }
  },
  
  // Culture africaine étendue
  culture: {
    traditions: {
      initiation: "Les cérémonies d'initiation marquent le passage de l'enfance à l'âge adulte. Elles transmettent les valeurs communautaires et la sagesse ancestrale.",
      danse: "La danse africaine est un langage universel qui exprime les émotions, raconte des histoires et unit les communautés.",
      musique: "La musique africaine utilise des instruments traditionnels comme le djembé, la kora et le balafon pour créer des rythmes envoûtants.",
      art: "L'art africain exprime la spiritualité, la tradition et l'identité culturelle à travers des formes géométriques et des symboles sacrés."
    },
    symboles: {
      cercle: "Le cercle représente l'éternité, l'unité et le cycle de la vie dans la culture africaine.",
      triangle: "Le triangle symbolise la trinité : passé, présent, futur ou ciel, terre, eau.",
      spirale: "La spirale évoque la croissance, l'évolution et le mouvement perpétuel de la vie.",
      croix: "La croix représente l'intersection des mondes visible et invisible."
    },
    couleurs: {
      rouge: "Couleur du sang, de la vie et du sacrifice",
      blanc: "Couleur de la pureté, de la paix et de la spiritualité",
      noir: "Couleur de la terre, de la fertilité et de l'ancestralité",
      jaune: "Couleur du soleil, de la richesse et de la prospérité"
    }
  }
};

// Mots-clés étendus pour la reconnaissance
export const EXTENDED_KEYWORDS = {
  navigation: ["page", "section", "aller", "naviguer", "visiter", "voir", "montrer", "guide"],
  oeuvres: ["œuvre", "masque", "statue", "reliquaire", "art", "culture", "sculpture", "figure"],
  fonctionnalites: ["ia", "ar", "réalité augmentée", "carrousel", "3d", "scanner", "qr"],
  informations: ["quoi", "comment", "où", "quand", "pourquoi", "expliquer", "détails", "histoire"],
  culture: ["tradition", "rituel", "cérémonie", "danse", "musique", "art", "spiritualité"],
  emotions: ["beau", "magnifique", "intéressant", "fascinant", "incroyable", "extraordinaire"]
};

/**
 * Analyse intelligente avancée des questions
 */
export const analyzeQuestionIntelligently = (question: string): {
  intent: string;
  entities: string[];
  confidence: number;
  context: string;
  emotion: string;
} => {
  const questionLower = question.toLowerCase();
  let intent = "general";
  const entities: string[] = [];
  let confidence = 0.5;
  let context = "general";
  let emotion = "neutral";

  // Détection d'intention avancée
  if (EXTENDED_KEYWORDS.navigation.some(keyword => questionLower.includes(keyword))) {
    intent = "navigation";
    confidence = 0.9;
    context = "navigation";
  }

  if (EXTENDED_KEYWORDS.oeuvres.some(keyword => questionLower.includes(keyword))) {
    intent = "oeuvres";
    confidence = 0.95;
    context = "art";
  }

  if (EXTENDED_KEYWORDS.fonctionnalites.some(keyword => questionLower.includes(keyword))) {
    intent = "fonctionnalites";
    confidence = 0.9;
    context = "technology";
  }

  if (EXTENDED_KEYWORDS.culture.some(keyword => questionLower.includes(keyword))) {
    intent = "culture";
    confidence = 0.9;
    context = "culture";
  }

  // Détection d'émotions
  if (EXTENDED_KEYWORDS.emotions.some(keyword => questionLower.includes(keyword))) {
    emotion = "positive";
    confidence = Math.min(confidence + 0.1, 1.0);
  }

  // Détection d'entités
  Object.keys(EXTENDED_KNOWLEDGE.pages).forEach(pageKey => {
    const page = EXTENDED_KNOWLEDGE.pages[pageKey as keyof typeof EXTENDED_KNOWLEDGE.pages];
    if (questionLower.includes(page.title.toLowerCase()) || 
        questionLower.includes(pageKey)) {
      entities.push(pageKey);
    }
  });

  Object.keys(EXTENDED_KNOWLEDGE.oeuvres).forEach(oeuvreKey => {
    const oeuvre = EXTENDED_KNOWLEDGE.oeuvres[oeuvreKey as keyof typeof EXTENDED_KNOWLEDGE.oeuvres];
    if (questionLower.includes(oeuvre.title.toLowerCase()) || 
        questionLower.includes(oeuvreKey) ||
        questionLower.includes(oeuvre.culture.toLowerCase())) {
      entities.push(oeuvreKey);
    }
  });

  return { intent, entities, confidence, context, emotion };
};

/**
 * Génération de réponse intelligente avancée
 */
export const generateIntelligentResponseAdvanced = (question: string): {
  text: string;
  links?: { text: string; url: string }[];
  tags: string[];
  confidence: number;
  metadata?: {
    culture?: string;
    period?: string;
    artwork?: string;
    language?: string;
    emotion?: string;
  };
} => {
  const analysis = analyzeQuestionIntelligently(question);
  const questionLower = question.toLowerCase();

  // Logs de diagnostic
  console.log('🔍 DIAGNOSTIC INTELLIGENT CHATBOT:');
  console.log('📝 Question analysée:', analysis.originalQuestion);
  console.log('🎯 Intent détecté:', analysis.intent);
  console.log('🔤 Mots-clés:', analysis.keywords);
  console.log('💭 Emotion:', analysis.emotion);
  
  // Réponses de navigation intelligentes
  if (analysis.intent === "navigation") {
    const pageEntity = analysis.entities.find(entity => 
      Object.keys(EXTENDED_KNOWLEDGE.pages).includes(entity)
    );
    
    if (pageEntity) {
      const page = EXTENDED_KNOWLEDGE.pages[pageEntity as keyof typeof EXTENDED_KNOWLEDGE.pages];
      return {
        text: `Je vous guide vers la ${page.title}. ${page.description}. Cette section offre ${page.features.join(', ')}.`,
        links: [{
          text: `🏛️ Visiter ${page.title}`,
          url: page.path
        }],
        tags: ["Navigation", "Guide", page.title],
        confidence: 0.95,
        metadata: {
          culture: "Général",
          period: "Contemporain",
          language: "fr",
          emotion: analysis.emotion
        }
      };
    }

    return {
      text: "Voici les sections principales de notre musée que vous pouvez explorer :",
      links: [
        { text: "🏠 Page d'Accueil", url: "/" },
        { text: "🎨 Collections", url: "/collections" },
        { text: "🗺️ Parcours", url: "/parcours" },
        { text: "🥽 Réalité Augmentée", url: "/realite-augmentee" },
        { text: "ℹ️ À Propos", url: "/a-propos" }
      ],
      tags: ["Navigation", "Guide", "Musée"],
      confidence: 0.9,
      metadata: {
        culture: "Général",
        period: "Contemporain",
        language: "fr",
        emotion: analysis.emotion
      }
    };
  }

  // Réponses sur les œuvres intelligentes
  if (analysis.intent === "oeuvres") {
    const oeuvreEntity = analysis.entities.find(entity => 
      Object.keys(EXTENDED_KNOWLEDGE.oeuvres).includes(entity)
    );
    
    if (oeuvreEntity) {
      const oeuvre = EXTENDED_KNOWLEDGE.oeuvres[oeuvreEntity as keyof typeof EXTENDED_KNOWLEDGE.oeuvres];
      return {
        text: `${oeuvre.title} : ${oeuvre.description}. ${oeuvre.details} Cette œuvre ${oeuvre.usage} et témoigne de la richesse culturelle ${oeuvre.culture}.`,
        tags: ["Œuvre", "Culture", oeuvre.culture, oeuvre.periode],
        confidence: 0.98,
        metadata: {
          culture: oeuvre.culture,
          period: oeuvre.periode,
          artwork: oeuvre.title,
          language: "fr",
          emotion: analysis.emotion
        }
      };
    }

    return {
      text: "Nos collections incluent des masques Baoulé, des statues Ashanti et des reliquaires Fang. Chaque œuvre raconte une histoire unique de notre patrimoine africain et témoigne de la diversité culturelle du continent.",
      tags: ["Collections", "Patrimoine", "Diversité"],
      confidence: 0.9,
      metadata: {
        culture: "Général",
        period: "Traditionnel",
        language: "fr",
        emotion: analysis.emotion
      }
    };
  }

  // Réponses sur les fonctionnalités intelligentes
  if (analysis.intent === "fonctionnalites") {
    if (questionLower.includes("ia") || questionLower.includes("assistant")) {
      return {
        text: "Je suis votre assistant IA spécialisé en culture africaine. Je peux vous guider, répondre à vos questions sur le patrimoine, vous aider à naviguer dans le musée et vous expliquer les traditions et l'art africain. Je connais toutes les sections du site et peux vous orienter vers ce qui vous intéresse.",
        tags: ["IA", "Assistant", "Guide"],
        confidence: 0.95,
        metadata: {
          culture: "Technologie",
          period: "Contemporain",
          language: "fr",
          emotion: analysis.emotion
        }
      };
    }

    if (questionLower.includes("ar") || questionLower.includes("réalité augmentée")) {
      return {
        text: "🥽 **Page Réalité Augmentée disponible !**\n\n**Fonctionnalités :**\n• Scanner QR intégré\n• Modèles 3D interactifs\n• Tutoriel AR complet\n• Scanner d'œuvres d'art\n\n**Comment utiliser :**\n1. Allez sur la page AR\n2. Activez votre caméra\n3. Scannez les QR codes\n4. Explorez les modèles 3D\n\n**Lien direct :** /realite-augmentee",
        links: [{
          text: "🥽 Accéder à la Page AR",
          url: "/realite-augmentee"
        }],
        tags: ["AR", "Scanner QR", "3D"],
        confidence: 0.95,
        metadata: {
          culture: "Technologie",
          period: "Contemporain",
          language: "fr",
          emotion: analysis.emotion
        }
      };
    }

    // Reconnaissance de l'accueil avec fautes de frappe
    if (questionLower.includes("accueil") || questionLower.includes("page d'accueil") || 
        questionLower.includes("aceil") || questionLower.includes("acceuil") || 
        questionLower.includes("acueil") || questionLower.includes("accuiel")) {
      
      console.log('🔍 DIAGNOSTIC: Reconnaissance accueil détectée');
      console.log('📝 Question originale:', question);
      console.log('🔤 Question en minuscules:', questionLower);
      console.log('🎯 Mots-clés détectés:', ['accueil', 'aceil', 'acceuil', 'acueil', 'accuiel'].filter(word => questionLower.includes(word)));
      
      return {
        text: "🏠 **Page d'accueil du Musée des Civilisations Noires 2.0**\n\n**Fonctionnalités principales :**\n• Hero section avec carrousel 3D\n• Statistiques du musée\n• Fonctionnalités révolutionnaires\n• Navigation vers toutes les sections\n\n**Lien direct :** /",
        links: [{
          text: "🏠 Aller à l'accueil",
          url: "/"
        }],
        tags: ["Accueil", "Navigation", "Général"],
        confidence: 0.95,
        metadata: {
          culture: "Général",
          period: "Contemporain",
          language: "fr",
          emotion: analysis.emotion
        }
      };
    }
  }

  // Réponses culturelles intelligentes
  if (analysis.intent === "culture") {
    if (questionLower.includes("tradition") || questionLower.includes("rituel")) {
      return {
        text: "Les traditions africaines sont riches et variées. Les cérémonies d'initiation marquent le passage de l'enfance à l'âge adulte, transmettant les valeurs communautaires et la sagesse ancestrale. Chaque rituel a une signification profonde et unit les communautés.",
        tags: ["Tradition", "Rituel", "Culture"],
        confidence: 0.9,
        metadata: {
          culture: "Général",
          period: "Traditionnel",
          language: "fr",
          emotion: analysis.emotion
        }
      };
    }

    if (questionLower.includes("danse") || questionLower.includes("musique")) {
      return {
        text: "La danse et la musique africaines sont des langages universels qui expriment les émotions, racontent des histoires et unissent les communautés. La musique utilise des instruments traditionnels comme le djembé, la kora et le balafon pour créer des rythmes envoûtants.",
        tags: ["Danse", "Musique", "Culture"],
        confidence: 0.9,
        metadata: {
          culture: "Général",
          period: "Traditionnel",
          language: "fr",
          emotion: analysis.emotion
        }
      };
    }
  }

  // Réponses contextuelles générales
  if (questionLower.includes("bonjour") || questionLower.includes("salut")) {
    return {
      text: "Bonjour ! Je suis votre guide virtuel intelligent du Musée des Civilisations Noires. Je connais tout sur notre patrimoine africain, nos œuvres, nos traditions et nos technologies innovantes. Comment puis-je vous aider à découvrir notre culture ?",
      tags: ["Accueil", "Guide", "Culture"],
      confidence: 0.95,
      metadata: {
        culture: "Général",
        period: "Contemporain",
        language: "fr",
        emotion: "positive"
      }
    };
  }

  if (questionLower.includes("aide") || questionLower.includes("help")) {
    return {
      text: "Je peux vous aider à :\n• 🏛️ Naviguer dans le musée et ses sections\n• 🎨 Découvrir nos œuvres et collections\n• 🥽 Utiliser nos fonctionnalités innovantes (AR, IA)\n• 🌍 Explorer la culture et les traditions africaines\n• 📚 Répondre à vos questions sur le patrimoine\n\nQue souhaitez-vous explorer en premier ?",
      tags: ["Aide", "Guide", "Fonctionnalités"],
      confidence: 0.9,
      metadata: {
        culture: "Général",
        period: "Contemporain",
        language: "fr",
        emotion: "positive"
      }
    };
  }

  // Vérifier les salutations
  if (analysis.isGreeting) {
    return {
      text: "Bonjour ! Je suis votre assistant virtuel spécialisé en culture africaine. Je suis là pour vous accompagner dans votre découverte du patrimoine culturel africain. Que souhaitez-vous savoir sur nos collections, nos œuvres d'art, ou nos traditions ? Je peux vous parler des masques, des sculptures, de l'histoire des civilisations africaines, ou de toute autre facette de notre riche patrimoine culturel.",
      tags: ["Salutation", "Accueil", "Général"],
      confidence: 0.9,
      metadata: {
        culture: "Général",
        period: "Contemporain",
        language: "fr",
        emotion: analysis.emotion
      }
    };
  }

  // Réponse par défaut intelligente et contextuelle
  return {
    text: "Je suis votre assistant IA du Musée des Civilisations Noires 2.0. Je peux vous aider avec :\n\n• **Page d'accueil** - Découvrez notre application révolutionnaire\n• **Collections** - Explorez nos œuvres d'art en 3D\n• **Réalité Augmentée** - Expérience immersive avec scanner QR\n• **Parcours** - Visites guidées interactives\n• **Culture africaine** - Traditions et patrimoine\n\n**Navigation :**\n🏠 [Page d'accueil](/)\n🎨 [Collections](/collections)\n🥽 [Réalité Augmentée](/realite-augmentee)\n🗺️ [Parcours](/parcours)\n\nQue souhaitez-vous explorer ?",
    tags: ["Accueil", "Navigation", "Général"],
    confidence: 0.9,
    metadata: {
      culture: "Général",
      period: "Contemporain",
      language: "fr",
      emotion: analysis.emotion
    }
  };
};

/**
 * Service principal intelligent
 */
export class IntelligentChatbotService {
  private static instance: IntelligentChatbotService;
  private conversationHistory: Array<{role: string, content: string, timestamp: Date}> = [];

  static getInstance(): IntelligentChatbotService {
    if (!IntelligentChatbotService.instance) {
      IntelligentChatbotService.instance = new IntelligentChatbotService();
    }
    return IntelligentChatbotService.instance;
  }

  async processMessage(userMessage: string): Promise<{
    response: string;
    links?: { text: string; url: string }[];
    tags: string[];
    confidence: number;
    metadata?: {
      culture?: string;
      period?: string;
      artwork?: string;
      language?: string;
      emotion?: string;
    };
  }> {
    // Ajouter le message utilisateur à l'historique
    this.conversationHistory.push({ 
      role: "user", 
      content: userMessage, 
      timestamp: new Date() 
    });

    // Générer une réponse intelligente avancée
    const response = generateIntelligentResponseAdvanced(userMessage);

    // Ajouter la réponse à l'historique
    this.conversationHistory.push({ 
      role: "assistant", 
      content: response.text, 
      timestamp: new Date() 
    });

    // Limiter l'historique à 20 messages
    if (this.conversationHistory.length > 20) {
      this.conversationHistory = this.conversationHistory.slice(-20);
    }

    return response;
  }

  getConversationHistory() {
    return this.conversationHistory;
  }

  clearHistory() {
    this.conversationHistory = [];
  }

  getKnowledgeBase() {
    return EXTENDED_KNOWLEDGE;
  }
}
