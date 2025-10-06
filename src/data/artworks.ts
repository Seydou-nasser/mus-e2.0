export interface Artwork {
  id: string;
  title: {
    fr: string;
    en: string;
    wo: string;
  };
  description: {
    fr: string;
    en: string;
    wo: string;
  };
  media: {
    image: string;
    audio?: string;
    video?: string;
  };
  history: string[];
}

export const artworks: Artwork[] = [
  {
    id: "001",
    title: {
      fr: "Masque Baoulé",
      en: "Baoulé Mask",
      wo: "Masque Baoulé"
    },
    description: {
      fr: "Ce masque traditionnel Baoulé représente un esprit protecteur. Il est utilisé lors de cérémonies rituelles pour honorer les ancêtres et assurer la fertilité des terres.",
      en: "This traditional Baoulé mask represents a protective spirit. It is used during ritual ceremonies to honor ancestors and ensure the fertility of the lands.",
      wo: "Masque bi Baoulé bi diokh na yaxantu. Ñu jëfandikoo ci yoon wi ci nguur gi ci di yàq bi ak di yàq bi."
    },
    media: {
      image: "/assets/masque-baoule.jpg",
      audio: "/assets/audio/masque-baoule.mp3"
    },
    history: [
      "Origine : Côte d'Ivoire, peuple Baoulé",
      "Période : XIXe siècle",
      "Matériau : Bois sculpté, pigments naturels"
    ]
  },
  {
    id: "002",
    title: {
      fr: "Statuette Yoruba",
      en: "Yoruba Statuette",
      wo: "Statuette Yoruba"
    },
    description: {
      fr: "Cette statuette Yoruba incarne Orisha, une divinité protectrice. Elle symbolise la force spirituelle et la connexion avec les ancêtres.",
      en: "This Yoruba statuette embodies Orisha, a protective deity. It symbolizes spiritual strength and connection with ancestors.",
      wo: "Statuette bi Yoruba bi diokh na Orisha, yaxantu rekk. Ñu diokh na doole ak jokkoo ak mag gi."
    },
    media: {
      image: "/assets/statuette-yoruba.jpg",
      audio: "/assets/audio/statuette-yoruba.mp3",
      video: "/assets/video/statuette-yoruba.mp4"
    },
    history: [
      "Origine : Nigeria, peuple Yoruba",
      "Période : XXe siècle",
      "Matériau : Bois, bronze, perles"
    ]
  },
  {
    id: "003",
    title: {
      fr: "Tissu Kente",
      en: "Kente Cloth",
      wo: "Tissu Kente"
    },
    description: {
      fr: "Le tissu Kente est un symbole de prestige et de royauté au Ghana. Ses motifs complexes racontent des histoires et des proverbes traditionnels.",
      en: "Kente cloth is a symbol of prestige and royalty in Ghana. Its complex patterns tell traditional stories and proverbs.",
      wo: "Tissu Kente bi di doole ak buur gi ci Ghana. Yoon yi di woy lëkk ak xarnu ci xam-xam."
    },
    media: {
      image: "/assets/tissu-kente.jpg",
      audio: "/assets/audio/tissu-kente.mp3"
    },
    history: [
      "Origine : Ghana, peuple Ashanti",
      "Période : Tradition millénaire",
      "Matériau : Coton teint, motifs tissés"
    ]
  },
  {
    id: "004",
    title: {
      fr: "Tambour Djembe",
      en: "Djembe Drum",
      wo: "Tambour Djembe"
    },
    description: {
      fr: "Le djembe est un tambour traditionnel d'Afrique de l'Ouest. Son son puissant accompagne les cérémonies et les célébrations communautaires.",
      en: "The djembe is a traditional drum from West Africa. Its powerful sound accompanies ceremonies and community celebrations.",
      wo: "Djembe bi tambour bu Afrig Occidental. Ñu di woy sonn gi ci yoon ak fiirekat yi."
    },
    media: {
      image: "/assets/tambour-djembe.jpg",
      audio: "/assets/audio/tambour-djembe.mp3",
      video: "/assets/video/tambour-djembe.mp4"
    },
    history: [
      "Origine : Guinée, Mali, Côte d'Ivoire",
      "Période : Tradition ancestrale",
      "Matériau : Bois, peau de chèvre"
    ]
  },
  {
    id: "005",
    title: {
      fr: "Collier Berbère",
      en: "Berber Necklace",
      wo: "Collier Berbère"
    },
    description: {
      fr: "Ce collier traditionnel berbère est orné d'argent et de pierres semi-précieuses. Il symbolise la protection et la beauté naturelle.",
      en: "This traditional Berber necklace is adorned with silver and semi-precious stones. It symbolizes protection and natural beauty.",
      wo: "Collier bi Berbère bi diokh na sàcc ak yuux yu neex. Ñu diokh na aar ak gëmmiñu gi."
    },
    media: {
      image: "/assets/collier-berbere.jpg",
      audio: "/assets/audio/collier-berbere.mp3"
    },
    history: [
      "Origine : Maroc, Algérie, Tunisie",
      "Période : XIXe-XXe siècle",
      "Matériau : Argent, pierres semi-précieuses"
    ]
  },
  {
    id: "006",
    title: {
      fr: "Potière Zouloue",
      en: "Zulu Pottery",
      wo: "Potière Zouloue"
    },
    description: {
      fr: "Cette poterie zouloue traditionnelle est utilisée pour conserver l'eau et les aliments. Ses motifs géométriques racontent l'histoire du peuple zoulou.",
      en: "This traditional Zulu pottery is used to store water and food. Its geometric patterns tell the story of the Zulu people.",
      wo: "Potière bi Zouloue bi di jëfandikoo ci def ndox ak lekk. Yoon yi di woy xam-xam bu Zulu yi."
    },
    media: {
      image: "/assets/poterie-zouloue.jpg",
      audio: "/assets/audio/poterie-zouloue.mp3"
    },
    history: [
      "Origine : Afrique du Sud, peuple Zulu",
      "Période : Tradition millénaire",
      "Matériau : Argile cuite, motifs peints"
    ]
  }
];
