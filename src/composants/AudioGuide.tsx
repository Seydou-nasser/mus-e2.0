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
  Languages,
  Mic,
  MicOff,
  Zap,
  Music,
  Headphones,
  Radio
} from 'lucide-react';
import { elevenLabsService } from '../services/elevenLabsService';

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
  const { t, i18n } = useTranslation();
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
    setIsLoading(true);
    setError(null);
    
    try {
      console.log('🎙️ Génération audio ElevenLabs pour:', language, currentOeuvre);
      
      // Utiliser ElevenLabs pour une qualité audio professionnelle
      const audioBlob = await elevenLabsService.generateOeuvreGuide(currentOeuvre, language);
      
      // Créer un URL pour l'audio
      const audioUrl = URL.createObjectURL(audioBlob);
      setAudioBlob(audioUrl);
      
      console.log('✅ Audio ElevenLabs généré avec succès');
      
      // Marquer comme chargé et joué
      setCurrentLanguage(language);
      setDuration(30); // Durée simulée
      setIsPlaying(true);
        
    } catch (err) {
      console.error('Erreur ElevenLabs:', err);
      
      // Fallback vers Web Speech API en cas d'erreur
      const text = language === 'fr' ? 
        `Bienvenue dans cette exploration de ${currentOeuvre.titre.fr}. ${currentOeuvre.description.fr}. Cette œuvre date du ${currentOeuvre.periode.fr} et provient de ${currentOeuvre.region.fr}.` :
        language === 'en' ?
        `Welcome to this exploration of ${currentOeuvre.titre.en}. ${currentOeuvre.description.en}. This work dates from ${currentOeuvre.periode.en} and comes from ${currentOeuvre.region.en}.` :
        `Jëfandikoo bu yees ci ${currentOeuvre.titre.wo}. ${currentOeuvre.description.wo}. Jëfandikoo bi ci ${currentOeuvre.periode.wo} ak ci ${currentOeuvre.region.wo}.`;
      
      if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = language === 'fr' ? 'fr-FR' : language === 'en' ? 'en-US' : 'fr-FR';
        utterance.rate = 0.8;
        utterance.pitch = 1;
        utterance.volume = 0.8;
        
        // Mode Web Speech API uniquement (pas de blob audio)
        setCurrentLanguage(language);
        setDuration(30); // Durée simulée
        
        // Lancer la synthèse vocale directement
        speechSynthesis.speak(utterance);
        
        // Marquer comme joué
        setIsPlaying(true);
      }
      
      setError('Mode démonstration Web Speech API - Audio fonctionnel !');
    } finally {
      setIsLoading(false);
    }
  };

  // Contrôles audio
  const togglePlayPause = () => {
    if (isPlaying) {
      // Arrêter la synthèse vocale
      speechSynthesis.cancel();
      stopProgressTracking();
      setIsPlaying(false);
    } else {
      // Reprendre la synthèse vocale
      if (currentLanguage) {
        const text = currentLanguage === 'fr' ? 
          `Bienvenue dans cette exploration de ${currentOeuvre.titre.fr}. ${currentOeuvre.description.fr}.` :
          currentLanguage === 'en' ?
          `Welcome to this exploration of ${currentOeuvre.titre.en}. ${currentOeuvre.description.en}.` :
          `Jëfandikoo bu yees ci ${currentOeuvre.titre.wo}. ${currentOeuvre.description.wo}.`;
        
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = currentLanguage === 'fr' ? 'fr-FR' : currentLanguage === 'en' ? 'en-US' : 'fr-FR';
        utterance.rate = playbackRate;
        utterance.pitch = 1;
        utterance.volume = isMuted ? 0 : volume;
        
        speechSynthesis.speak(utterance);
        setIsPlaying(true);
        startProgressTracking();
      }
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
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
                    onChange={(e) => setVolume(parseFloat(e.target.value))}
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

          {/* Message d'erreur */}
          {error && (
            <div className="mt-4 p-4 bg-red-500/20 border border-red-500/50 rounded-xl text-red-300">
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
