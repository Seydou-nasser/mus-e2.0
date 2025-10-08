import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useTheme } from './ThemeProvider';
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  RotateCcw,
  Download,
  Zap,
  Music
} from 'lucide-react';
import { elevenLabsService } from '../services/elevenLabsService';
import { runAudioDiagnostic, testAudioGeneration, logAudioStatus } from '../utils/audioDiagnostic';

/**
 * Composant AudioGuide avec ElevenLabs TTS
 * Interface audio avancée pour guide multilingue
 */
interface AudioGuideProps {
  oeuvre?: {
    titre: { fr: string; en: string; wo: string };
    description: { fr: string; en: string; wo: string };
    periode: { fr: string; en: string; wo: string };
    region: { fr: string; en: string; wo: string };
  };
  isOpen: boolean;
  onClose: () => void;
}

const AudioGuide: React.FC<AudioGuideProps> = ({ oeuvre, isOpen, onClose }) => {
  const { i18n } = useTranslation();
  const { getThemeClasses, isDarkMode } = useTheme();
  const themeClasses = getThemeClasses();
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [volume, setVolume] = useState(0.8);
  const [isMuted, setIsMuted] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState<'fr' | 'en' | 'wo'>('fr');
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [error, setError] = useState<string | null>(null);
  
  const audioRef = useRef<HTMLAudioElement>(null);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [playbackRate, setPlaybackRate] = useState(1.0);
  const [progressInterval, setProgressInterval] = useState<NodeJS.Timeout | null>(null);
  const [isTesting, setIsTesting] = useState(false);
  const [audioMode, setAudioMode] = useState<'elevenlabs' | 'webspeech' | 'unknown'>('unknown');

  // Œuvre par défaut si aucune fournie
  const defaultOeuvre = {
    titre: { 
      fr: "Masque Dan", 
      en: "Dan Mask", 
      wo: "Këru Dan" 
    },
    description: { 
      fr: "Masque cérémoniel du peuple Dan, Côte d'Ivoire", 
      en: "Ceremonial mask from the Dan people, Ivory Coast", 
      wo: "Këru ci lëkk ci xeet Dan, Kosta Marfil" 
    },
    periode: { 
      fr: "XIXe siècle", 
      en: "19th century", 
      wo: "Xarnu fukk ak juroom" 
    },
    region: { 
      fr: "Afrique de l'Ouest", 
      en: "West Africa", 
      wo: "Afrig Bëj-saalum" 
    }
  };

  const currentOeuvre = oeuvre || defaultOeuvre;

  // Gestion des événements audio
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleTimeUpdate = () => setCurrentTime(audio.currentTime);
    const handleDurationChange = () => setDuration(audio.duration);
    const handleEnded = () => setIsPlaying(false);
    const handleLoadStart = () => setIsLoading(true);
    const handleCanPlay = () => setIsLoading(false);

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('durationchange', handleDurationChange);
    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('loadstart', handleLoadStart);
    audio.addEventListener('canplay', handleCanPlay);

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('durationchange', handleDurationChange);
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('loadstart', handleLoadStart);
      audio.removeEventListener('canplay', handleCanPlay);
    };
  }, [audioBlob]);

  // Gestion du volume
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
    }
  }, [volume, isMuted]);

  // Nettoyage à la fermeture
  useEffect(() => {
    return () => {
      if (progressInterval) {
        clearInterval(progressInterval);
      }
    };
  }, [progressInterval]);

  // Diagnostic audio au montage du composant (une seule fois)
  useEffect(() => {
    let isDiagnosticRunning = false;
    
    const runDiagnostic = async () => {
      if (isDiagnosticRunning) {
        console.log('🔄 [AUDIO GUIDE] Diagnostic déjà en cours, ignoré');
        return;
      }
      
      isDiagnosticRunning = true;
      console.log('🔍 [AUDIO GUIDE] Diagnostic au montage (UNIQUE)');
      logAudioStatus();
      
      try {
        // Lancer le diagnostic complet
        const diagnostic = await runAudioDiagnostic();
        console.log('📊 [AUDIO GUIDE] Diagnostic complet:', diagnostic);
        
        // Déterminer le mode audio
        if (diagnostic.elevenLabs.configured) {
          setAudioMode('elevenlabs');
          console.log('🎙️ [AUDIO GUIDE] Mode: ElevenLabs (qualité professionnelle)');
        } else if (diagnostic.webSpeech.available) {
          setAudioMode('webspeech');
          console.log('🎤 [AUDIO GUIDE] Mode: Web Speech API (démonstration)');
        } else {
          setAudioMode('unknown');
          console.log('❌ [AUDIO GUIDE] Mode: Aucun service disponible');
        }
        
        if (diagnostic.errors.length > 0) {
          console.warn('⚠️ [AUDIO GUIDE] Problèmes détectés:', diagnostic.errors);
          // Afficher le premier problème dans l'interface
          setError(diagnostic.errors[0]);
        }
        
        if (diagnostic.recommendations.length > 0) {
          console.info('💡 [AUDIO GUIDE] Recommandations:', diagnostic.recommendations);
        }
      } catch (error) {
        console.error('❌ [AUDIO GUIDE] Erreur diagnostic:', error);
      } finally {
        isDiagnosticRunning = false;
      }
    };
    
    runDiagnostic();
  }, []); // Dépendance vide pour éviter les re-exécutions

  // Fonction pour démarrer le suivi de progression
  const startProgressTracking = () => {
    if (progressInterval) {
      clearInterval(progressInterval);
    }
    
    const interval = setInterval(() => {
      setCurrentTime(prev => {
        const newTime = prev + 0.1;
        if (newTime >= duration) {
          setIsPlaying(false);
          clearInterval(interval);
          return duration;
        }
        return newTime;
      });
    }, 100);
    
    setProgressInterval(interval);
  };

  // Fonction pour arrêter le suivi de progression
  const stopProgressTracking = () => {
    if (progressInterval) {
      clearInterval(progressInterval);
      setProgressInterval(null);
    }
  };

  // Génération de l'audio avec ElevenLabs TTS
  const generateAudio = async (language: 'fr' | 'en' | 'wo') => {
    console.log('🎙️ [AUDIO GUIDE] Début génération audio');
    console.log('🌍 [AUDIO GUIDE] Langue sélectionnée:', language);
    console.log('📚 [AUDIO GUIDE] Œuvre:', currentOeuvre.titre[language]);
    console.log('🔑 [AUDIO GUIDE] Clé ElevenLabs:', !!import.meta.env.VITE_ELEVENLABS_API_KEY);
    
    setIsLoading(true);
    setError(null);
    
    try {
      console.log('🎙️ [AUDIO GUIDE] Appel ElevenLabs service...');
      
      // Utiliser ElevenLabs pour une qualité audio professionnelle
      const audioBlob = await elevenLabsService.generateOeuvreGuide(currentOeuvre, language);
      
      console.log('✅ [AUDIO GUIDE] Audio blob reçu');
      console.log('📏 [AUDIO GUIDE] Taille blob:', audioBlob.size, 'bytes');
      console.log('📊 [AUDIO GUIDE] Type blob:', audioBlob.type);
      
      // Créer un URL pour l'audio
      const audioUrl = URL.createObjectURL(audioBlob);
      setAudioBlob(audioUrl as any);
      
      console.log('✅ [AUDIO GUIDE] URL audio créée:', audioUrl);
      console.log('🎵 [AUDIO GUIDE] Configuration audio...');
      
      // Marquer comme chargé et joué
      setCurrentLanguage(language);
      setDuration(30); // Durée simulée
      setIsPlaying(true);
      
      console.log('🎉 [AUDIO GUIDE] Audio prêt à être joué');
        
    } catch (err: unknown) {
      console.error('❌ [AUDIO GUIDE] Erreur détaillée:', err);
      console.error('📊 [AUDIO GUIDE] Type erreur:', typeof err);
      console.error('📊 [AUDIO GUIDE] Message:', (err as Error).message);
      console.error('📊 [AUDIO GUIDE] Stack:', (err as Error).stack);
      
      // Fallback vers Web Speech API en cas d'erreur
      const text = language === 'fr' ? 
        `Bienvenue dans cette exploration de ${currentOeuvre.titre.fr}. ${currentOeuvre.description.fr}. Cette œuvre date du ${currentOeuvre.periode.fr} et provient de ${currentOeuvre.region.fr}.` :
        language === 'en' ?
        `Welcome to this exploration of ${currentOeuvre.titre.en}. ${currentOeuvre.description.en}. This work dates from ${currentOeuvre.periode.en} and comes from ${currentOeuvre.region.en}.` :
        `Jëfandikoo bu yees ci ${currentOeuvre.titre.wo}. ${currentOeuvre.description.wo}. Jëfandikoo bi ci ${currentOeuvre.periode.wo} ak ci ${currentOeuvre.region.wo}.`;
      
      console.log('🔄 [AUDIO GUIDE] Fallback vers Web Speech API');
      console.log('📝 [AUDIO GUIDE] Texte fallback:', text.substring(0, 100) + '...');
      
      if ('speechSynthesis' in window) {
        console.log('🎤 [AUDIO GUIDE] Web Speech API disponible');
        
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = language === 'fr' ? 'fr-FR' : language === 'en' ? 'en-US' : 'fr-FR';
        utterance.rate = 0.8;
        utterance.pitch = 1;
        utterance.volume = 0.8;
        
        console.log('🎵 [AUDIO GUIDE] Configuration utterance:', {
          lang: utterance.lang,
          rate: utterance.rate,
          pitch: utterance.pitch,
          volume: utterance.volume
        });
        
        // Mode Web Speech API uniquement (pas de blob audio)
        setCurrentLanguage(language);
        setDuration(30); // Durée simulée
        
        // Lancer la synthèse vocale directement
        speechSynthesis.speak(utterance);
        console.log('🎉 [AUDIO GUIDE] Synthèse vocale lancée');
        
        // Marquer comme joué
        setIsPlaying(true);
        console.log('✅ [AUDIO GUIDE] Audio en cours de lecture');
      } else {
        console.error('❌ [AUDIO GUIDE] Web Speech API non disponible');
      }
      
      setError('Mode démonstration Web Speech API - Audio fonctionnel !');
    } finally {
      setIsLoading(false);
    }
  };

  // Contrôles audio
  const togglePlayPause = () => {
    console.log('🎵 [AUDIO GUIDE] Toggle play/pause');
    console.log('🎵 [AUDIO GUIDE] État actuel:', isPlaying ? 'En lecture' : 'En pause');
    console.log('🎵 [AUDIO GUIDE] Langue actuelle:', currentLanguage);
    console.log('🎵 [AUDIO GUIDE] Volume:', volume, 'Muted:', isMuted);
    
    if (isPlaying) {
      console.log('⏸️ [AUDIO GUIDE] Mise en pause');
      // Arrêter la synthèse vocale
      speechSynthesis.cancel();
      stopProgressTracking();
      setIsPlaying(false);
      console.log('✅ [AUDIO GUIDE] Audio mis en pause');
    } else {
      console.log('▶️ [AUDIO GUIDE] Reprise lecture');
      // Reprendre la synthèse vocale
      if (currentLanguage) {
        const text = currentLanguage === 'fr' ? 
          `Bienvenue dans cette exploration de ${currentOeuvre.titre.fr}. ${currentOeuvre.description.fr}.` :
          currentLanguage === 'en' ?
          `Welcome to this exploration of ${currentOeuvre.titre.en}. ${currentOeuvre.description.en}.` :
          `Jëfandikoo bu yees ci ${currentOeuvre.titre.wo}. ${currentOeuvre.description.wo}.`;
        
        console.log('📝 [AUDIO GUIDE] Texte synthèse:', text.substring(0, 100) + '...');
        
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = currentLanguage === 'fr' ? 'fr-FR' : currentLanguage === 'en' ? 'en-US' : 'fr-FR';
        utterance.rate = playbackRate;
        utterance.pitch = 1;
        utterance.volume = isMuted ? 0 : volume;
        
        console.log('🎵 [AUDIO GUIDE] Configuration utterance:', {
          lang: utterance.lang,
          rate: utterance.rate,
          pitch: utterance.pitch,
          volume: utterance.volume
        });
        
        speechSynthesis.speak(utterance);
        console.log('🎉 [AUDIO GUIDE] Synthèse vocale lancée');
        setIsPlaying(true);
        startProgressTracking();
        console.log('✅ [AUDIO GUIDE] Audio en cours de lecture');
      } else {
        console.log('❌ [AUDIO GUIDE] Langue non définie');
      }
    }
  };

  // Test de génération audio
  const testAudio = async () => {
    console.log('🧪 [AUDIO GUIDE] Test de génération audio');
    setIsTesting(true);
    setError(null); // Effacer les erreurs précédentes
    
    try {
      console.log('🔍 [AUDIO GUIDE] Vérification Web Speech API...');
      
      if (!('speechSynthesis' in window)) {
        console.log('❌ [AUDIO GUIDE] Web Speech API non disponible');
        setError('❌ Web Speech API non disponible dans ce navigateur');
        return;
      }
      
      console.log('🎤 [AUDIO GUIDE] Web Speech API disponible, lancement du test...');
      
      const success = await testAudioGeneration();
      if (success) {
        console.log('✅ [AUDIO GUIDE] Test audio réussi');
        setError('✅ Test audio réussi - Service fonctionnel !');
      } else {
        console.log('❌ [AUDIO GUIDE] Test audio échoué');
        setError('❌ Test audio échoué - Vérifier la configuration');
      }
    } catch (error) {
      console.error('❌ [AUDIO GUIDE] Erreur test audio:', error);
      setError('❌ Erreur lors du test audio');
    } finally {
      setIsTesting(false);
    }
  };

  const handleSeek = (_e: React.ChangeEvent<HTMLInputElement>) => {
    // Pour Web Speech API, on ne peut pas contrôler la position
    // Cette fonction est désactivée en mode démonstration
    console.log('Seek non disponible en mode Web Speech API');
  };

  const resetAudio = () => {
    // Pour Web Speech API, on redémarre la synthèse vocale
    speechSynthesis.cancel();
    stopProgressTracking();
    setCurrentTime(0);
    if (currentLanguage) {
      generateAudio(currentLanguage);
    }
  };

  const downloadAudio = async () => {
    try {
      if (!audioRef.current || !currentLanguage) {
        alert('Aucun audio à télécharger. Veuillez d\'abord générer un audio.');
        return;
      }

      // Créer un blob à partir de l'audio actuel
      const audioBlob = new Blob([audioRef.current.src], { type: 'audio/mpeg' });
      const url = URL.createObjectURL(audioBlob);
      
      // Créer un lien de téléchargement
      const a = document.createElement('a');
      a.href = url;
      a.download = `guide-audio-${currentLanguage}-${Date.now()}.mp3`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      
      console.log('Audio téléchargé avec succès');
    } catch (error) {
      console.error('Erreur lors du téléchargement:', error);
      alert('Erreur lors du téléchargement. Veuillez réessayer.');
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  // Icônes illustratives personnalisées
  const AudioIcon = () => (
    <div className="relative w-8 h-8">
      <div className="absolute inset-0 bg-gradient-to-br from-pink-500 to-purple-600 rounded-lg transform rotate-12"></div>
      <div className="absolute inset-0 bg-gradient-to-br from-pink-400 to-purple-500 rounded-lg transform -rotate-6"></div>
      <Music className="absolute inset-0 w-4 h-4 text-white m-auto" />
    </div>
  );

  const VolumeIcon = () => (
    <div className="relative w-6 h-6">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full"></div>
      <Volume2 className="absolute inset-0 w-3 h-3 text-white m-auto" />
    </div>
  );

  const SpeedIcon = () => (
    <div className="relative w-6 h-6">
      <div className="absolute inset-0 bg-gradient-to-br from-orange-500 to-yellow-500 rounded-full"></div>
      <Zap className="absolute inset-0 w-3 h-3 text-white m-auto" />
    </div>
  );

  const PlayIcon = () => (
    <div className="relative w-10 h-10">
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-500 via-green-500 to-teal-600 rounded-full shadow-lg"></div>
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-400 to-green-400 rounded-full opacity-80"></div>
      <Play className="absolute inset-0 w-5 h-5 text-white m-auto ml-0.5 drop-shadow-sm" />
      <div className="absolute inset-0 rounded-full bg-white/20 animate-pulse"></div>
    </div>
  );

  const PauseIcon = () => (
    <div className="relative w-10 h-10">
      <div className="absolute inset-0 bg-gradient-to-br from-red-500 via-rose-500 to-pink-600 rounded-full shadow-lg"></div>
      <div className="absolute inset-0 bg-gradient-to-br from-red-400 to-rose-400 rounded-full opacity-80"></div>
      <Pause className="absolute inset-0 w-5 h-5 text-white m-auto drop-shadow-sm" />
      <div className="absolute inset-0 rounded-full bg-white/20 animate-pulse"></div>
    </div>
  );

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        className={`${themeClasses.background} rounded-3xl p-8 max-w-2xl w-full border ${
          isDarkMode ? 'border-white/20' : 'border-gray-300'
        } shadow-2xl`}
        onClick={(e) => e.stopPropagation()}
      >
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <AudioIcon />
              <div>
                <h2 className={`text-2xl font-bold ${themeClasses.text}`}>
                  {i18n.language === 'fr' ? 'Guide Audio' : 
                  i18n.language === 'en' ? 'Audio Guide' : 
                  'Jëfandikoo Audio'}
                </h2>
                <p className={themeClasses.textSecondary}>
                  {currentOeuvre.titre[i18n.language as keyof typeof currentOeuvre.titre]}
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className={`${themeClasses.textSecondary} hover:${themeClasses.text} transition-colors`}
            >
              ✕
            </button>
          </div>

          {/* Message de statut ElevenLabs */}
          <div className="mb-4 p-4 bg-green-500/20 border border-green-500/50 rounded-xl">
            <p className="text-green-300 text-sm">
              🎙️ <strong>ElevenLabs TTS Activé :</strong> Qualité audio professionnelle avec voix naturelles. 
              Fallback vers Web Speech API en cas d'erreur.
            </p>
          </div>

          {/* Sélection de langue */}
          <div className="mb-6">
            <h3 className={`text-lg font-semibold ${themeClasses.text} mb-3`}>
              {i18n.language === 'fr' ? 'Choisir la langue' : 
               i18n.language === 'en' ? 'Choose language' : 
               'Tànn ci làkk'}
            </h3>
            <div className="flex space-x-3">
              {(['fr', 'en', 'wo'] as const).map((lang) => (
                <button
                  key={lang}
                  onClick={() => generateAudio(lang)}
                  disabled={isLoading}
                  className={`px-6 py-3 rounded-xl font-semibold transition-all ${
                    currentLanguage === lang
                      ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                      : isDarkMode 
                        ? 'bg-white/10 text-gray-300 hover:bg-white/20 border border-white/20'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-300'
                  } ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  {lang === 'fr' ? 'Français' : lang === 'en' ? 'English' : 'Wolof'}
                </button>
              ))}
            </div>
          </div>

          {/* Contrôles audio */}
          {currentLanguage && (
            <div className="space-y-4">
              {/* Barre de progression */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm text-gray-400">
                  <span>{formatTime(currentTime)}</span>
                  <span>{formatTime(duration)}</span>
                </div>
                <div className="relative">
                  <input
                    type="range"
                    min="0"
                    max={duration || 0}
                    value={currentTime}
                    onChange={handleSeek}
                    className="w-full h-3 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
                    style={{
                      background: isPlaying 
                        ? `linear-gradient(to right, #FF6B6B 0%, #FF6B6B ${duration > 0 ? (currentTime / duration) * 100 : 0}%, #374151 ${duration > 0 ? (currentTime / duration) * 100 : 0}%, #374151 100%)`
                        : `linear-gradient(to right, #10B981 0%, #10B981 ${duration > 0 ? (currentTime / duration) * 100 : 0}%, #374151 ${duration > 0 ? (currentTime / duration) * 100 : 0}%, #374151 100%)`
                    }}
                  />
                  {/* Indicateur de progression animé */}
                  {isPlaying && (
                    <div 
                      className="absolute top-0 left-0 h-3 bg-gradient-to-r from-pink-500 to-red-500 rounded-lg transition-all duration-100 ease-out"
                      style={{ width: `${duration > 0 ? (currentTime / duration) * 100 : 0}%` }}
                    />
                  )}
                </div>
              </div>

              {/* Boutons de contrôle */}
              <div className="flex items-center justify-center space-x-6">
                <button
                  onClick={resetAudio}
                  className={`p-4 rounded-full transition-all border ${
                    isDarkMode 
                      ? 'bg-gradient-to-br from-blue-500/20 to-cyan-500/20 hover:from-blue-500/30 hover:to-cyan-500/30 border-blue-500/30'
                      : 'bg-gradient-to-br from-blue-100 to-cyan-100 hover:from-blue-200 hover:to-cyan-200 border-blue-300'
                  }`}
                  title="Redémarrer"
                >
                  <RotateCcw className={`w-5 h-5 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`} />
                </button>
                
                <motion.button
                  onClick={togglePlayPause}
                  disabled={isLoading}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className={`p-6 rounded-full transition-all disabled:opacity-50 shadow-2xl hover:shadow-3xl transform ${
                    isPlaying 
                      ? 'bg-gradient-to-br from-red-500 via-rose-500 to-pink-600 hover:from-red-600 hover:via-rose-600 hover:to-pink-700' 
                      : 'bg-gradient-to-br from-emerald-500 via-green-500 to-teal-600 hover:from-emerald-600 hover:via-green-600 hover:to-teal-700'
                  }`}
                >
                  {isLoading ? (
                    <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : isPlaying ? (
                    <PauseIcon />
                  ) : (
                    <PlayIcon />
                  )}
                </motion.button>

                {/* Bouton de test audio */}
                <motion.button
                  onClick={testAudio}
                  disabled={isTesting}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className={`p-4 rounded-full transition-all disabled:opacity-50 shadow-xl hover:shadow-2xl transform ${
                    isDarkMode 
                      ? 'bg-gradient-to-br from-purple-500/20 to-indigo-500/20 hover:from-purple-500/30 hover:to-indigo-500/30 border-purple-500/30'
                      : 'bg-gradient-to-br from-purple-100 to-indigo-100 hover:from-purple-200 hover:to-indigo-200 border-purple-300'
                  }`}
                  title="Test Audio"
                >
                  {isTesting ? (
                    <Zap className={`w-5 h-5 animate-spin ${isDarkMode ? 'text-purple-400' : 'text-purple-600'}`} />
                  ) : (
                    <Zap className={`w-5 h-5 ${isDarkMode ? 'text-purple-400' : 'text-purple-600'}`} />
                  )}
                </motion.button>

                <button
                  onClick={() => setIsMuted(!isMuted)}
                  className={`p-4 rounded-full transition-all border ${
                    isDarkMode 
                      ? 'bg-gradient-to-br from-green-500/20 to-emerald-500/20 hover:from-green-500/30 hover:to-emerald-500/30 border-green-500/30'
                      : 'bg-gradient-to-br from-green-100 to-emerald-100 hover:from-green-200 hover:to-emerald-200 border-green-300'
                  }`}
                  title={isMuted ? "Activer le son" : "Couper le son"}
                >
                  {isMuted ? (
                    <VolumeX className={`w-5 h-5 ${isDarkMode ? 'text-red-400' : 'text-red-600'}`} />
                  ) : (
                    <Volume2 className={`w-5 h-5 ${isDarkMode ? 'text-green-400' : 'text-green-600'}`} />
                  )}
                </button>

                <button
                  onClick={downloadAudio}
                  className={`p-4 rounded-full transition-all border ${
                    isDarkMode 
                      ? 'bg-gradient-to-br from-orange-500/20 to-yellow-500/20 hover:from-orange-500/30 hover:to-yellow-500/30 border-orange-500/30'
                      : 'bg-gradient-to-br from-orange-100 to-yellow-100 hover:from-orange-200 hover:to-yellow-200 border-orange-300'
                  }`}
                  title="Télécharger"
                >
                  <Download className={`w-5 h-5 ${isDarkMode ? 'text-orange-400' : 'text-orange-600'}`} />
                </button>
              </div>

              {/* Contrôle du volume */}
              <div className="flex items-center space-x-3">
                <VolumeIcon />
                <div className="flex-1 relative">
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.1"
                    value={volume}
                    onChange={(e) => {
                      const newVolume = parseFloat(e.target.value);
                      console.log('🔊 [AUDIO GUIDE] Changement volume:', newVolume);
                      setVolume(newVolume);
                    }}
                    className={`w-full h-3 rounded-lg appearance-none cursor-pointer slider ${
                      isDarkMode ? 'bg-gray-700' : 'bg-gray-300'
                    }`}
                    style={{
                      background: isDarkMode 
                        ? `linear-gradient(to right, #3B82F6 0%, #3B82F6 ${volume * 100}%, #374151 ${volume * 100}%, #374151 100%)`
                        : `linear-gradient(to right, #3B82F6 0%, #3B82F6 ${volume * 100}%, #D1D5DB ${volume * 100}%, #D1D5DB 100%)`
                    }}
                  />
                </div>
                <span className={`text-sm font-semibold w-12 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`}>
                  {Math.round(volume * 100)}%
                </span>
              </div>

              {/* Contrôle de la vitesse */}
              <div className="flex items-center space-x-3">
                <SpeedIcon />
                <div className="flex-1 relative">
                  <input
                    type="range"
                    min="0.5"
                    max="2"
                    step="0.1"
                    value={playbackRate}
                    onChange={(e) => setPlaybackRate(parseFloat(e.target.value))}
                    className={`w-full h-3 rounded-lg appearance-none cursor-pointer slider ${
                      isDarkMode ? 'bg-gray-700' : 'bg-gray-300'
                    }`}
                    style={{
                      background: isDarkMode 
                        ? `linear-gradient(to right, #F59E0B 0%, #F59E0B ${((playbackRate - 0.5) / 1.5) * 100}%, #374151 ${((playbackRate - 0.5) / 1.5) * 100}%, #374151 100%)`
                        : `linear-gradient(to right, #F59E0B 0%, #F59E0B ${((playbackRate - 0.5) / 1.5) * 100}%, #D1D5DB ${((playbackRate - 0.5) / 1.5) * 100}%, #D1D5DB 100%)`
                    }}
                  />
                </div>
                <span className={`text-sm font-semibold w-12 ${isDarkMode ? 'text-orange-400' : 'text-orange-600'}`}>
                  {playbackRate.toFixed(1)}x
                </span>
              </div>
            </div>
          )}

          {/* Indicateur de mode audio */}
          <div className="mt-4 p-3 rounded-xl border">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                {audioMode === 'elevenlabs' && (
                  <>
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-sm font-medium text-green-400">Mode ElevenLabs (Professionnel)</span>
                  </>
                )}
                {audioMode === 'webspeech' && (
                  <>
                    <div className="w-3 h-3 bg-yellow-500 rounded-full animate-pulse"></div>
                    <span className="text-sm font-medium text-yellow-400">Mode Web Speech (Démonstration)</span>
                  </>
                )}
                {audioMode === 'unknown' && (
                  <>
                    <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                    <span className="text-sm font-medium text-red-400">Aucun service audio</span>
                  </>
                )}
              </div>
              <div className="text-xs text-gray-400">
                {audioMode === 'elevenlabs' && 'Qualité optimale'}
                {audioMode === 'webspeech' && 'Qualité limitée'}
                {audioMode === 'unknown' && 'Non fonctionnel'}
              </div>
            </div>
          </div>

          {/* Message d'erreur */}
          {error && (
            <div className={`mt-4 p-4 rounded-xl border ${
              error.includes('✅') 
                ? 'bg-green-500/20 border-green-500/50 text-green-300'
                : 'bg-red-500/20 border-red-500/50 text-red-300'
            }`}>
              {error}
            </div>
          )}

          {/* Audio element désactivé en mode Web Speech API */}
          {/* <audio ref={audioRef} preload="none" /> */}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default AudioGuide;
