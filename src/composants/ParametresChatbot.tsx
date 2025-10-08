import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from './ThemeProvider';
import { useContexteIA } from './ContexteIA';
import { 
  X, 
  Settings, 
  Palette, 
  Volume2, 
  Languages, 
  Monitor, 
  Smartphone, 
  Maximize2,
  Minimize2,
  MessageCircle,
  Star,
  Heart,
  Search,
  Bot,
  Zap,
  Brain,
  Bell
} from 'lucide-react';

interface ParametresChatbotProps {
  isOpen: boolean;
  onClose: () => void;
  onPositionChange: (position: 'bottom-right' | 'center' | 'top-right') => void;
  onFullscreenChange: (isFullscreen: boolean) => void;
  onMinimizeChange: (isMinimized: boolean) => void;
  currentPosition: 'bottom-right' | 'center' | 'top-right';
  isFullscreen: boolean;
  isMinimized: boolean;
}

/**
 * Page de Paramètres du Chatbot - Interface dédiée
 * Toutes les fonctionnalités avancées dans une interface séparée
 */
const ParametresChatbot: React.FC<ParametresChatbotProps> = ({
  isOpen,
  onClose,
  onPositionChange,
  onFullscreenChange,
  onMinimizeChange,
  currentPosition,
  isFullscreen,
  isMinimized
}) => {
  const { isDarkMode, getThemeClasses, theme } = useTheme();
  const { isIAEnLigne, setIsIAEnLigne } = useContexteIA();
  const themeClasses = getThemeClasses();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showScrollIndicator, setShowScrollIndicator] = useState(false);
  const [isCenterPosition, setIsCenterPosition] = useState(false);
  
  const [selectedTheme, setSelectedTheme] = useState<'dark' | 'light' | 'auto'>('auto');
  const [selectedLanguage, setSelectedLanguage] = useState<'fr' | 'en' | 'wo'>('fr');
  const [volume, setVolume] = useState(80);
  const [notifications, setNotifications] = useState(true);
  const [autoScroll, setAutoScroll] = useState(true);
  const [showTimestamps, setShowTimestamps] = useState(true);
  const [enableScoring, setEnableScoring] = useState(true);
  const [enableHistory, setEnableHistory] = useState(true);

  // Détection de la position center
  useEffect(() => {
    setIsCenterPosition(currentPosition === 'center');
  }, [currentPosition]);

  // Gestion du scroll et indicateur
  useEffect(() => {
    const scrollElement = scrollRef.current;
    if (!scrollElement) return;

    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = scrollElement;
      const isScrollable = scrollHeight > clientHeight;
      const isAtBottom = scrollTop + clientHeight >= scrollHeight - 10;
      
      setShowScrollIndicator(isScrollable && !isAtBottom);
    };

    // Vérification initiale
    handleScroll();
    
    scrollElement.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleScroll);

    return () => {
      scrollElement.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [isCenterPosition]);

  // Fonction pour scroller vers le bas
  const scrollToBottom = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  };

  // Fonction pour forcer le scrolling quand position center
  const forceScroll = () => {
    if (scrollRef.current && isCenterPosition) {
      // Force le scrolling en ajoutant un petit décalage
      const currentScroll = scrollRef.current.scrollTop;
      scrollRef.current.scrollTo({
        top: currentScroll + 1,
        behavior: 'smooth'
      });
    }
  };

  // Auto-scroll quand position center
  useEffect(() => {
    if (isCenterPosition && scrollRef.current) {
      const timer = setTimeout(() => {
        forceScroll();
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [isCenterPosition]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[10002] flex items-center justify-center p-2 sm:p-4 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className={`w-full max-w-2xl max-h-[90vh] ${
            theme === 'sombre' ? 'bg-gray-900' : 
            theme === 'douce' ? 'bg-gradient-to-br from-amber-50 to-yellow-100' : 
            'bg-white'
          } rounded-3xl shadow-2xl overflow-hidden`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className={`p-4 sm:p-6 ${
            theme === 'sombre' ? 'bg-gray-800' : 
            theme === 'douce' ? 'bg-gradient-to-r from-amber-100 to-yellow-200' : 
            'bg-gray-100'
          } border-b ${
            theme === 'sombre' ? 'border-gray-700' : 
            theme === 'douce' ? 'border-amber-300' : 
            'border-gray-200'
          }`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2 sm:space-x-3">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full flex items-center justify-center">
                  <Settings className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
                <div>
                  <h2 className={`text-lg sm:text-2xl font-bold ${
                    theme === 'sombre' ? 'text-white' : 
                    theme === 'douce' ? 'text-amber-900' : 
                    'text-gray-900'
                  }`}>Paramètres Chatbot</h2>
                  <p className={`text-xs sm:text-sm ${
                    theme === 'sombre' ? 'text-gray-300' : 
                    theme === 'douce' ? 'text-amber-700' : 
                    'text-gray-600'
                  }`}>Personnalisez votre expérience</p>
                </div>
              </div>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={onClose}
                className="p-1.5 sm:p-2 bg-red-500 rounded-lg text-white"
              >
                <X className="w-4 h-4 sm:w-5 sm:h-5" />
              </motion.button>
            </div>
          </div>

          {/* Contenu scrollable */}
          <div 
            ref={scrollRef}
            className={`flex-1 overflow-y-auto p-4 sm:p-6 space-y-6 sm:space-y-8 parametres-chatbot-scrollbar ${
              theme === 'sombre' ? 'dark' : 
              theme === 'douce' ? 'mode-douce' : 
              'mode-clair'
            } ${isCenterPosition ? 'center-position-scroll' : ''}`}
            style={{
              // Amélioration du scrolling pour position center
              ...(isCenterPosition && {
                scrollBehavior: 'smooth',
                scrollPaddingTop: '20px',
                scrollPaddingBottom: '20px'
              })
            }}
          >
            
            {/* Section Position et Affichage */}
            <motion.div 
              className="space-y-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h3 className={`text-base sm:text-lg font-semibold ${
                theme === 'sombre' ? 'text-white' : 
                theme === 'douce' ? 'text-amber-900' : 
                'text-gray-900'
              } flex items-center space-x-2`}>
                <Monitor className="w-4 h-4 sm:w-5 sm:h-5" />
                <span>Position et Affichage</span>
              </h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => onPositionChange('bottom-right')}
                  className={`p-3 sm:p-4 rounded-xl border-2 transition-all ${
                    currentPosition === 'bottom-right'
                      ? 'border-blue-500 bg-blue-500/10'
                      : `${theme === 'sombre' ? 'border-gray-700 bg-gray-800' : 
                          theme === 'douce' ? 'border-amber-300 bg-amber-50' : 
                          'border-gray-200 bg-gray-50'}`
                  }`}
                >
                  <div className="text-center">
                    <div className="w-8 h-8 mx-auto mb-2 bg-blue-500 rounded-lg flex items-center justify-center">
                      <MessageCircle className="w-4 h-4 text-white" />
                    </div>
                    <p className={`text-xs sm:text-sm font-medium ${
                      theme === 'sombre' ? 'text-white' : 
                      theme === 'douce' ? 'text-amber-900' : 
                      'text-gray-900'
                    }`}>Bottom-Right</p>
                  </div>
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => onPositionChange('center')}
                  className={`p-3 sm:p-4 rounded-xl border-2 transition-all ${
                    currentPosition === 'center'
                      ? 'border-green-500 bg-green-500/10'
                      : `${theme === 'sombre' ? 'border-gray-700 bg-gray-800' : 
                          theme === 'douce' ? 'border-amber-300 bg-amber-50' : 
                          'border-gray-200 bg-gray-50'}`
                  }`}
                >
                  <div className="text-center">
                    <div className="w-8 h-8 mx-auto mb-2 bg-green-500 rounded-lg flex items-center justify-center">
                      <Monitor className="w-4 h-4 text-white" />
                    </div>
                    <p className={`text-xs sm:text-sm font-medium ${
                      theme === 'sombre' ? 'text-white' : 
                      theme === 'douce' ? 'text-amber-900' : 
                      'text-gray-900'
                    }`}>Center</p>
                  </div>
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => onPositionChange('top-right')}
                  className={`p-3 sm:p-4 rounded-xl border-2 transition-all ${
                    currentPosition === 'top-right'
                      ? 'border-orange-500 bg-orange-500/10'
                      : `${theme === 'sombre' ? 'border-gray-700 bg-gray-800' : 
                          theme === 'douce' ? 'border-amber-300 bg-amber-50' : 
                          'border-gray-200 bg-gray-50'}`
                  }`}
                >
                  <div className="text-center">
                    <div className="w-8 h-8 mx-auto mb-2 bg-orange-500 rounded-lg flex items-center justify-center">
                      <Smartphone className="w-4 h-4 text-white" />
                    </div>
                    <p className={`text-xs sm:text-sm font-medium ${
                      theme === 'sombre' ? 'text-white' : 
                      theme === 'douce' ? 'text-amber-900' : 
                      'text-gray-900'
                    }`}>Top-Right</p>
                  </div>
                </motion.button>
              </div>

              {/* Mode d'affichage */}
              <div className={`flex items-center justify-between p-3 sm:p-4 rounded-xl ${
                theme === 'sombre' ? 'bg-gray-800' : 
                theme === 'douce' ? 'bg-amber-50' : 
                'bg-gray-100'
              }`}>
                <div className="flex items-center space-x-2 sm:space-x-3">
                  <Maximize2 className={`w-4 h-4 sm:w-5 sm:h-5 ${
                    theme === 'sombre' ? 'text-purple-400' : 
                    theme === 'douce' ? 'text-purple-600' : 
                    'text-purple-500'
                  }`} />
                  <div>
                    <p className={`text-sm sm:text-base font-medium ${
                      theme === 'sombre' ? 'text-white' : 
                      theme === 'douce' ? 'text-amber-900' : 
                      'text-gray-900'
                    }`}>Mode Plein Écran</p>
                    <p className={`text-xs sm:text-sm ${
                      theme === 'sombre' ? 'text-gray-300' : 
                      theme === 'douce' ? 'text-amber-700' : 
                      'text-gray-600'
                    }`}>Interface expansée</p>
                  </div>
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => onFullscreenChange(!isFullscreen)}
                  className={`w-10 h-5 sm:w-12 sm:h-6 rounded-full transition-colors ${
                    isFullscreen ? 'bg-purple-500' : `${theme === 'sombre' ? 'bg-gray-600' : 'bg-gray-400'}`
                  }`}
                >
                  <motion.div
                    className="w-4 h-4 sm:w-5 sm:h-5 bg-white rounded-full shadow-lg"
                    animate={{ x: isFullscreen ? 20 : 2 }}
                    transition={{ duration: 0.2 }}
                  />
                </motion.button>
              </div>
            </motion.div>

            {/* Section Apparence */}
            <motion.div 
              className="space-y-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <h3 className={`text-base sm:text-lg font-semibold ${
                theme === 'sombre' ? 'text-white' : 
                theme === 'douce' ? 'text-amber-900' : 
                'text-gray-900'
              } flex items-center space-x-2`}>
                <Palette className="w-4 h-4 sm:w-5 sm:h-5" />
                <span>Apparence</span>
              </h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                {[
                  { value: 'dark', label: 'Sombre', icon: '🌙' },
                  { value: 'light', label: 'Clair', icon: '☀️' },
                  { value: 'auto', label: 'Auto', icon: '🔄' }
                ].map((theme) => (
                  <motion.button
                    key={theme.value}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setSelectedTheme(theme.value as any)}
                    className={`p-3 sm:p-4 rounded-xl border-2 transition-all ${
                      selectedTheme === theme.value
                        ? 'border-purple-500 bg-purple-500/10'
                        : `${theme === 'sombre' ? 'border-gray-700 bg-gray-800' : 
                            theme === 'douce' ? 'border-amber-300 bg-amber-50' : 
                            'border-gray-200 bg-gray-50'}`
                    }`}
                  >
                    <div className="text-center">
                      <div className="text-2xl mb-2">{theme.icon}</div>
                      <p className={`text-xs sm:text-sm font-medium ${
                        theme === 'sombre' ? 'text-white' : 
                        theme === 'douce' ? 'text-amber-900' : 
                        'text-gray-900'
                      }`}>{theme.label}</p>
                    </div>
                  </motion.button>
                ))}
              </div>
            </motion.div>

            {/* Section Audio et Notifications */}
            <motion.div 
              className="space-y-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h3 className={`text-base sm:text-lg font-semibold ${
                theme === 'sombre' ? 'text-white' : 
                theme === 'douce' ? 'text-amber-900' : 
                'text-gray-900'
              } flex items-center space-x-2`}>
                <Volume2 className="w-4 h-4 sm:w-5 sm:h-5" />
                <span>Audio et Notifications</span>
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className={`text-sm sm:text-base font-medium ${
                      theme === 'sombre' ? 'text-white' : 
                      theme === 'douce' ? 'text-amber-900' : 
                      'text-gray-900'
                    }`}>Volume Audio</p>
                    <p className={`text-xs sm:text-sm ${
                      theme === 'sombre' ? 'text-gray-300' : 
                      theme === 'douce' ? 'text-amber-700' : 
                      'text-gray-600'
                    }`}>Contrôle du volume</p>
                  </div>
                  <div className="flex items-center space-x-2 sm:space-x-3">
                    <span className={`text-xs sm:text-sm ${
                      theme === 'sombre' ? 'text-gray-300' : 
                      theme === 'douce' ? 'text-amber-700' : 
                      'text-gray-600'
                    }`}>{volume}%</span>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={volume}
                      onChange={(e) => setVolume(Number(e.target.value))}
                      className={`w-20 sm:w-24 h-2 rounded-lg appearance-none cursor-pointer ${
                        theme === 'sombre' ? 'bg-gray-600' : 
                        theme === 'douce' ? 'bg-amber-300' : 
                        'bg-gray-200'
                      }`}
                    />
                  </div>
                </div>

                <div className={`flex items-center justify-between p-3 sm:p-4 rounded-xl ${
                  theme === 'sombre' ? 'bg-gray-800' : 
                  theme === 'douce' ? 'bg-amber-50' : 
                  'bg-gray-100'
                }`}>
                  <div className="flex items-center space-x-2 sm:space-x-3">
                    <Bell className={`w-4 h-4 sm:w-5 sm:h-5 ${
                      theme === 'sombre' ? 'text-yellow-400' : 
                      theme === 'douce' ? 'text-yellow-600' : 
                      'text-yellow-500'
                    }`} />
                    <div>
                      <p className={`text-sm sm:text-base font-medium ${
                        theme === 'sombre' ? 'text-white' : 
                        theme === 'douce' ? 'text-amber-900' : 
                        'text-gray-900'
                      }`}>Notifications</p>
                      <p className={`text-xs sm:text-sm ${
                        theme === 'sombre' ? 'text-gray-300' : 
                        theme === 'douce' ? 'text-amber-700' : 
                        'text-gray-600'
                      }`}>Alertes et sons</p>
                    </div>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setNotifications(!notifications)}
                    className={`w-10 h-5 sm:w-12 sm:h-6 rounded-full transition-colors ${
                      notifications ? 'bg-yellow-500' : `${theme === 'sombre' ? 'bg-gray-600' : 'bg-gray-400'}`
                    }`}
                  >
                    <motion.div
                      className="w-4 h-4 sm:w-5 sm:h-5 bg-white rounded-full shadow-lg"
                      animate={{ x: notifications ? 20 : 2 }}
                      transition={{ duration: 0.2 }}
                    />
                  </motion.button>
                </div>
              </div>
            </motion.div>

            {/* Section Fonctionnalités Avancées */}
            <motion.div 
              className="space-y-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <h3 className={`text-base sm:text-lg font-semibold ${
                theme === 'sombre' ? 'text-white' : 
                theme === 'douce' ? 'text-amber-900' : 
                'text-gray-900'
              } flex items-center space-x-2`}>
                <Bot className="w-4 h-4 sm:w-5 sm:h-5" />
                <span>Fonctionnalités Avancées</span>
              </h3>
              
              <div className="space-y-3">
                {[
                  { key: 'autoScroll', label: 'Défilement Automatique', description: 'Scroll automatique vers nouveaux messages' },
                  { key: 'showTimestamps', label: 'Horodatage', description: 'Afficher l\'heure des messages' },
                  { key: 'enableScoring', label: 'Système de Scoring', description: 'Évaluer les réponses IA' },
                  { key: 'enableHistory', label: 'Historique', description: 'Sauvegarder les conversations' }
                ].map((feature) => (
                  <div key={feature.key} className={`flex items-center justify-between p-3 sm:p-4 rounded-xl ${
                    theme === 'sombre' ? 'bg-gray-800' : 
                    theme === 'douce' ? 'bg-amber-50' : 
                    'bg-gray-100'
                  }`}>
                    <div>
                      <p className={`text-sm sm:text-base font-medium ${
                        theme === 'sombre' ? 'text-white' : 
                        theme === 'douce' ? 'text-amber-900' : 
                        'text-gray-900'
                      }`}>{feature.label}</p>
                      <p className={`text-xs sm:text-sm ${
                        theme === 'sombre' ? 'text-gray-300' : 
                        theme === 'douce' ? 'text-amber-700' : 
                        'text-gray-600'
                      }`}>{feature.description}</p>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        if (feature.key === 'autoScroll') setAutoScroll(!autoScroll);
                        if (feature.key === 'showTimestamps') setShowTimestamps(!showTimestamps);
                        if (feature.key === 'enableScoring') setEnableScoring(!enableScoring);
                        if (feature.key === 'enableHistory') setEnableHistory(!enableHistory);
                      }}
                      className={`w-10 h-5 sm:w-12 sm:h-6 rounded-full transition-colors ${
                        (feature.key === 'autoScroll' ? autoScroll :
                         feature.key === 'showTimestamps' ? showTimestamps :
                         feature.key === 'enableScoring' ? enableScoring :
                         enableHistory) ? 'bg-green-500' : `${theme === 'sombre' ? 'bg-gray-600' : 'bg-gray-400'}`
                      }`}
                    >
                      <motion.div
                        className="w-4 h-4 sm:w-5 sm:h-5 bg-white rounded-full shadow-lg"
                        animate={{ 
                          x: (feature.key === 'autoScroll' ? autoScroll :
                              feature.key === 'showTimestamps' ? showTimestamps :
                              feature.key === 'enableScoring' ? enableScoring :
                              enableHistory) ? 20 : 2 
                        }}
                        transition={{ duration: 0.2 }}
                      />
                    </motion.button>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Section État de l'IA */}
            <motion.div 
              className="space-y-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <h3 className={`text-base sm:text-lg font-semibold ${
                theme === 'sombre' ? 'text-white' : 
                theme === 'douce' ? 'text-amber-900' : 
                'text-gray-900'
              } flex items-center space-x-2`}>
                <Brain className="w-4 h-4 sm:w-5 sm:h-5" />
                <span>État de l'Assistant IA</span>
              </h3>
              
              <div className={`p-3 sm:p-4 rounded-xl ${
                theme === 'sombre' ? 'bg-gray-800' : 
                theme === 'douce' ? 'bg-amber-50' : 
                'bg-gray-100'
              }`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2 sm:space-x-3">
                    <div className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full ${isIAEnLigne ? 'bg-green-500' : 'bg-red-500'}`}></div>
                    <span className={`text-sm sm:text-base font-medium ${
                      theme === 'sombre' ? 'text-white' : 
                      theme === 'douce' ? 'text-amber-900' : 
                      'text-gray-900'
                    }`}>
                      {isIAEnLigne ? 'En ligne' : 'Hors ligne'}
                    </span>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setIsIAEnLigne(!isIAEnLigne)}
                    className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-white text-xs sm:text-sm font-medium ${
                      isIAEnLigne ? 'bg-red-500' : 'bg-green-500'
                    }`}
                  >
                    {isIAEnLigne ? 'Déconnecter' : 'Connecter'}
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Indicateur de scroll */}
          <AnimatePresence>
            {showScrollIndicator && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className={`absolute bottom-20 left-1/2 transform -translate-x-1/2 z-10 ${
                  theme === 'sombre' ? 'bg-gray-800' : 
                  theme === 'douce' ? 'bg-amber-100' : 
                  'bg-white'
                } rounded-full px-4 py-2 shadow-lg border ${
                  theme === 'sombre' ? 'border-gray-700' : 
                  theme === 'douce' ? 'border-amber-300' : 
                  'border-gray-200'
                }`}
              >
                <motion.div
                  animate={{ y: [0, -4, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className={`flex items-center space-x-2 text-xs ${
                    theme === 'sombre' ? 'text-gray-300' : 
                    theme === 'douce' ? 'text-amber-700' : 
                    'text-gray-600'
                  }`}
                >
                  <span>Défiler pour voir plus</span>
                  <motion.button
                    onClick={scrollToBottom}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="w-3 h-3 flex items-center justify-center"
                  >
                    <motion.div
                      animate={{ rotate: [0, 180, 360] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      ⬇️
                    </motion.div>
                  </motion.button>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Footer avec actions */}
          <div className={`p-4 sm:p-6 ${
            theme === 'sombre' ? 'bg-gray-800' : 
            theme === 'douce' ? 'bg-gradient-to-r from-amber-100 to-yellow-200' : 
            'bg-gray-100'
          } border-t ${
            theme === 'sombre' ? 'border-gray-700' : 
            theme === 'douce' ? 'border-amber-300' : 
            'border-gray-200'
          }`}>
            <div className="flex items-center justify-between">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onClose}
                className="px-4 sm:px-6 py-2 sm:py-3 bg-gray-500 text-white rounded-xl text-sm sm:text-base font-medium"
              >
                Annuler
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onClose}
                className="px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-xl text-sm sm:text-base font-medium"
              >
                Sauvegarder
              </motion.button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ParametresChatbot;
