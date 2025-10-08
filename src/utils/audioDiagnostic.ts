/**
 * Utilitaires de diagnostic pour le service audio
 * Tests et vérifications pour le guide audio
 */

export interface AudioDiagnosticResult {
  elevenLabs: {
    configured: boolean;
    apiKey: string;
    keyLength: number;
    endpoint: string;
  };
  webSpeech: {
    available: boolean;
    voices: number;
    languages: string[];
  };
  audio: {
    supported: boolean;
    formats: string[];
  };
  errors: string[];
  recommendations: string[];
}

// Variable globale pour éviter les diagnostics multiples
let isDiagnosticRunning = false;

/**
 * Diagnostic complet du service audio
 */
export const runAudioDiagnostic = async (): Promise<AudioDiagnosticResult> => {
  if (isDiagnosticRunning) {
    console.log('🔄 [DIAGNOSTIC AUDIO] Diagnostic déjà en cours, ignoré');
    return {
      elevenLabs: { configured: false, apiKey: '', keyLength: 0, endpoint: '' },
      webSpeech: { available: false, voices: 0, languages: [] },
      audio: { supported: false, formats: [] },
      errors: ['Diagnostic déjà en cours'],
      recommendations: []
    };
  }
  
  isDiagnosticRunning = true;
  console.log('🔍 [DIAGNOSTIC AUDIO] Début du diagnostic complet (UNIQUE)');
  
  const result: AudioDiagnosticResult = {
    elevenLabs: {
      configured: false,
      apiKey: '',
      keyLength: 0,
      endpoint: 'https://api.elevenlabs.io/v1'
    },
    webSpeech: {
      available: false,
      voices: 0,
      languages: []
    },
    audio: {
      supported: false,
      formats: []
    },
    errors: [],
    recommendations: []
  };

  // 1. Diagnostic ElevenLabs
  console.log('🔑 [DIAGNOSTIC] Vérification ElevenLabs...');
  try {
    const apiKey = import.meta.env.VITE_ELEVENLABS_API_KEY;
    result.elevenLabs.configured = !!apiKey && apiKey !== 'your-api-key-here';
    result.elevenLabs.apiKey = apiKey || '';
    result.elevenLabs.keyLength = apiKey?.length || 0;
    
    if (!result.elevenLabs.configured) {
      result.errors.push('Clé API ElevenLabs non configurée');
      result.recommendations.push('Configurer VITE_ELEVENLABS_API_KEY dans .env');
    } else {
      console.log('✅ [DIAGNOSTIC] ElevenLabs configuré');
    }
  } catch (error) {
    result.errors.push('Erreur lors de la vérification ElevenLabs');
  }

  // 2. Diagnostic Web Speech API
  console.log('🎤 [DIAGNOSTIC] Vérification Web Speech API...');
  try {
    result.webSpeech.available = 'speechSynthesis' in window;
    
    if (result.webSpeech.available) {
      const voices = speechSynthesis.getVoices();
      result.webSpeech.voices = voices.length;
      result.webSpeech.languages = [...new Set(voices.map(v => v.lang))];
      
      console.log('✅ [DIAGNOSTIC] Web Speech API disponible');
      console.log('🎭 [DIAGNOSTIC] Voix disponibles:', voices.length);
      console.log('🌍 [DIAGNOSTIC] Langues:', result.webSpeech.languages);
    } else {
      result.errors.push('Web Speech API non disponible');
      result.recommendations.push('Utiliser un navigateur moderne supportant Web Speech API');
    }
  } catch (error) {
    result.errors.push('Erreur lors de la vérification Web Speech API');
  }

  // 3. Diagnostic support audio
  console.log('🎵 [DIAGNOSTIC] Vérification support audio...');
  try {
    const audio = new Audio();
    result.audio.supported = !!audio.canPlayType;
    
    const formats = ['audio/mpeg', 'audio/wav', 'audio/ogg', 'audio/mp4'];
    result.audio.formats = formats.filter(format => audio.canPlayType(format) !== '');
    
    console.log('✅ [DIAGNOSTIC] Support audio:', result.audio.supported);
    console.log('📀 [DIAGNOSTIC] Formats supportés:', result.audio.formats);
  } catch (error) {
    result.errors.push('Erreur lors de la vérification support audio');
  }

  // 4. Recommandations
  if (!result.elevenLabs.configured && !result.webSpeech.available) {
    result.recommendations.push('Aucun service TTS disponible - configurer ElevenLabs ou utiliser un navigateur moderne');
  }
  
  if (result.elevenLabs.configured && result.webSpeech.available) {
    result.recommendations.push('Deux services TTS disponibles - ElevenLabs prioritaire, Web Speech API en fallback');
  }

  if (!result.elevenLabs.configured && result.webSpeech.available) {
    result.recommendations.push('Mode démonstration activé - Web Speech API uniquement (qualité limitée)');
    result.recommendations.push('Pour une qualité professionnelle, configurer ElevenLabs API');
  }

  console.log('📊 [DIAGNOSTIC] Résultats:', result);
  isDiagnosticRunning = false; // Réinitialiser le flag
  return result;
};

/**
 * Test de génération audio
 */
export const testAudioGeneration = async (): Promise<boolean> => {
  console.log('🧪 [TEST AUDIO] Test de génération audio');
  
  try {
    // Test Web Speech API
    if ('speechSynthesis' in window) {
      console.log('🎤 [TEST AUDIO] Web Speech API disponible');
      
      const utterance = new SpeechSynthesisUtterance('Test audio guide réussi');
      utterance.volume = 0.3; // Volume audible pour le test
      utterance.rate = 1.2; // Vitesse normale pour le test
      utterance.pitch = 1.0; // Pitch normal
      
      console.log('🎵 [TEST AUDIO] Configuration utterance:', {
        volume: utterance.volume,
        rate: utterance.rate,
        pitch: utterance.pitch
      });
      
      return new Promise((resolve) => {
        let isResolved = false;
        
        // Vérifier si la synthèse vocale est déjà en cours
        if (speechSynthesis.speaking) {
          console.log('🔄 [TEST AUDIO] Arrêt de la synthèse en cours...');
          speechSynthesis.cancel();
        }
        
        utterance.onstart = () => {
          console.log('🎉 [TEST AUDIO] Synthèse vocale démarrée');
        };
        
        utterance.onend = () => {
          if (!isResolved) {
            isResolved = true;
            console.log('✅ [TEST AUDIO] Web Speech API fonctionnel');
            resolve(true);
          }
        };
        
        utterance.onerror = (error) => {
          if (!isResolved) {
            isResolved = true;
            console.error('❌ [TEST AUDIO] Erreur Web Speech API:', error);
            resolve(false);
          }
        };
        
        // Attendre un peu avant de lancer
        setTimeout(() => {
          speechSynthesis.speak(utterance);
          console.log('🚀 [TEST AUDIO] Synthèse vocale lancée');
        }, 100);
        
        // Timeout après 3 secondes
        setTimeout(() => {
          if (!isResolved) {
            isResolved = true;
            console.log('⏰ [TEST AUDIO] Timeout Web Speech API');
            resolve(false);
          }
        }, 3000);
      });
    } else {
      console.log('❌ [TEST AUDIO] Web Speech API non disponible');
      return false;
    }
  } catch (error) {
    console.error('❌ [TEST AUDIO] Erreur:', error);
    return false;
  }
};

/**
 * Logs de diagnostic en temps réel
 */
export const logAudioStatus = () => {
  console.log('📊 [STATUS AUDIO] État actuel:');
  console.log('🔑 ElevenLabs:', !!import.meta.env.VITE_ELEVENLABS_API_KEY);
  console.log('🎤 Web Speech:', 'speechSynthesis' in window);
  console.log('🎵 Audio:', !!new Audio());
  console.log('🌍 Langue navigateur:', navigator.language);
  console.log('📱 User Agent:', navigator.userAgent.substring(0, 50) + '...');
};
