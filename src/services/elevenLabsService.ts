import axios from 'axios';

/**
 * Service ElevenLabs pour Text-to-Speech
 * Voix ultra-réalistes pour guide audio multilingue
 */
export class ElevenLabsService {
  private apiKey: string;
  private baseURL: string = 'https://api.elevenlabs.io/v1';

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  /**
   * Génère un audio à partir de texte avec voix naturelle
   * @param text - Texte à convertir en audio
   * @param voiceId - ID de la voix (par défaut: voix française)
   * @param language - Langue du texte
   * @returns Promise<Blob> - Fichier audio généré
   */
  async generateSpeech(
    text: string, 
    voiceId: string = 'pNInz6obpgDQGcFmaJgB', // Voix française par défaut
    language: 'fr' | 'en' | 'wo' = 'fr'
  ): Promise<Blob> {
    console.log('🎙️ [ELEVENLABS] Début génération audio');
    console.log('📝 [ELEVENLABS] Texte:', text.substring(0, 100) + '...');
    console.log('🎭 [ELEVENLABS] Voix ID:', voiceId);
    console.log('🌍 [ELEVENLABS] Langue:', language);
    console.log('🔑 [ELEVENLABS] Clé API présente:', !!this.apiKey);
    console.log('🔑 [ELEVENLABS] Longueur clé:', this.apiKey?.length || 0);
    
    try {
      console.log('📡 [ELEVENLABS] Envoi requête à ElevenLabs...');
      const response = await axios.post(
        `${this.baseURL}/text-to-speech/${voiceId}`,
        {
          text,
          model_id: 'eleven_multilingual_v2',
          voice_settings: {
            stability: 0.5,
            similarity_boost: 0.8,
            style: 0.0,
            use_speaker_boost: true
          }
        },
        {
          headers: {
            'Accept': 'audio/mpeg',
            'Content-Type': 'application/json',
            'xi-api-key': this.apiKey
          },
          responseType: 'blob'
        }
      );

      console.log('✅ [ELEVENLABS] Réponse reçue');
      console.log('📊 [ELEVENLABS] Status:', response.status);
      console.log('📊 [ELEVENLABS] Type:', response.headers['content-type']);
      console.log('📏 [ELEVENLABS] Taille audio:', response.data.size, 'bytes');
      
      return response.data;
    } catch (error: any) {
      console.error('❌ [ELEVENLABS] Erreur détaillée:', error);
      console.error('📊 [ELEVENLABS] Status:', error.response?.status);
      console.error('📊 [ELEVENLABS] Message:', error.response?.data);
      console.error('🔑 [ELEVENLABS] Clé API valide:', !!this.apiKey);
      
      throw new Error(`Impossible de générer l'audio: ${error.response?.data?.detail || error.message}`);
    }
  }

  /**
   * Obtient la liste des voix disponibles
   * @returns Promise<Array> - Liste des voix
   */
  async getVoices(): Promise<any[]> {
    try {
      const response = await axios.get(`${this.baseURL}/voices`, {
        headers: {
          'xi-api-key': this.apiKey
        }
      });
      return response.data.voices;
    } catch (error) {
      console.error('Erreur récupération voix:', error);
      return [];
    }
  }

  /**
   * Sélectionne la voix optimale selon la langue
   * @param language - Langue souhaitée
   * @returns string - ID de la voix optimale
   */
  getOptimalVoice(language: 'fr' | 'en' | 'wo'): string {
    const voiceMap = {
      'fr': 'pNInz6obpgDQGcFmaJgB', // Voix française féminine
      'en': 'EXAVITQu4vr4xnSDxMaL', // Voix anglaise masculine
      'wo': 'pNInz6obpgDQGcFmaJgB'  // Utilise la voix française pour le wolof
    };
    
    return voiceMap[language];
  }

  /**
   * Génère un guide audio pour une œuvre
   * @param oeuvre - Informations de l'œuvre
   * @param language - Langue du guide
   * @returns Promise<Blob> - Audio du guide
   */
  async generateOeuvreGuide(
    oeuvre: {
      titre: { fr: string; en: string; wo: string };
      description: { fr: string; en: string; wo: string };
      periode: { fr: string; en: string; wo: string };
      region: { fr: string; en: string; wo: string };
    },
    language: 'fr' | 'en' | 'wo' = 'fr'
  ): Promise<Blob> {
    console.log('🎯 [GUIDE AUDIO] Génération guide pour œuvre');
    console.log('📚 [GUIDE AUDIO] Œuvre:', oeuvre.titre[language]);
    console.log('🌍 [GUIDE AUDIO] Langue demandée:', language);
    
    const voiceId = this.getOptimalVoice(language);
    console.log('🎭 [GUIDE AUDIO] Voix sélectionnée:', voiceId);
    
    let guideText = '';
    
    if (language === 'fr') {
      guideText = `
        Bienvenue dans cette exploration de ${oeuvre.titre.fr}.
        ${oeuvre.description.fr}
        Cette œuvre date du ${oeuvre.periode.fr} et provient de ${oeuvre.region.fr}.
        Découvrez l'histoire fascinante de cette pièce unique du patrimoine africain.
      `;
    } else if (language === 'en') {
      guideText = `
        Welcome to this exploration of ${oeuvre.titre.en}.
        ${oeuvre.description.en}
        This work dates from ${oeuvre.periode.en} and comes from ${oeuvre.region.en}.
        Discover the fascinating history of this unique piece of African heritage.
      `;
    } else {
      guideText = `
        Jëfandikoo bu yees ci ${oeuvre.titre.wo}.
        ${oeuvre.description.wo}
        Jëfandikoo bi ci ${oeuvre.periode.wo} ak ci ${oeuvre.region.wo}.
        Seetal ci xam-xam bu yees ci jëfandikoo bi ci ngërëm Afrig.
      `;
    }

    console.log('📝 [GUIDE AUDIO] Texte généré:', guideText.substring(0, 150) + '...');
    console.log('📏 [GUIDE AUDIO] Longueur texte:', guideText.length, 'caractères');

    return this.generateSpeech(guideText, voiceId, language);
  }
}

// Instance par défaut (clé API à configurer)
export const elevenLabsService = new ElevenLabsService(
  import.meta.env.VITE_ELEVENLABS_API_KEY || 'your-api-key-here'
);
