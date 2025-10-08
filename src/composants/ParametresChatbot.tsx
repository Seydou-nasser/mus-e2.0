import React, { useState } from 'react';
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
  const { isDarkMode, getThemeClasses } = useTheme();
  const { isIAEnLigne, setIsIAEnLigne } = useContexteIA();
  const themeClasses = getThemeClasses();
  
  const [selectedTheme, setSelectedTheme] = useState<'dark' | 'light' | 'auto'>('auto');
  const [selectedLanguage, setSelectedLanguage] = useState<'fr' | 'en' | 'wo'>('fr');
  const [volume, setVolume] = useState(80);
  const [notifications, setNotifications] = useState(true);
  const [autoScroll, setAutoScroll] = useState(true);
  const [showTimestamps, setShowTimestamps] = useState(true);
  const [enableScoring, setEnableScoring] = useState(true);
  const [enableHistory, setEnableHistory] = useState(true);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[10001] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className={`w-full max-w-2xl max-h-[90vh] ${isDarkMode ? 'bg-gray-900' : 'bg-white'} rounded-3xl shadow-2xl overflow-hidden`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className={`p-6 ${isDarkMode ? 'bg-gray-800' : 'bg-gray-100'} border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full flex items-center justify-center">
                  <Settings className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className={`text-2xl font-bold ${themeClasses.text}`}>Paramètres Chatbot</h2>
                  <p className={`text-sm ${themeClasses.textSecondary}`}>Personnalisez votre expérience</p>
                </div>
              </div>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={onClose}
                className="p-2 bg-red-500 rounded-lg text-white"
              >
                <X className="w-5 h-5" />
              </motion.button>
            </div>
          </div>

          {/* Contenu scrollable */}
          <div className="flex-1 overflow-y-auto p-6 space-y-8">
            
            {/* Section Position et Affichage */}
            <div className="space-y-4">
              <h3 className={`text-lg font-semibold ${themeClasses.text} flex items-center space-x-2`}>
                <Monitor className="w-5 h-5" />
                <span>Position et Affichage</span>
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => onPositionChange('bottom-right')}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    currentPosition === 'bottom-right'
                      ? 'border-blue-500 bg-blue-500/10'
                      : `${isDarkMode ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-gray-50'}`
                  }`}
                >
                  <div className="text-center">
                    <div className="w-8 h-8 mx-auto mb-2 bg-blue-500 rounded-lg flex items-center justify-center">
                      <MessageCircle className="w-4 h-4 text-white" />
                    </div>
                    <p className={`text-sm font-medium ${themeClasses.text}`}>Bottom-Right</p>
                  </div>
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => onPositionChange('center')}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    currentPosition === 'center'
                      ? 'border-green-500 bg-green-500/10'
                      : `${isDarkMode ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-gray-50'}`
                  }`}
                >
                  <div className="text-center">
                    <div className="w-8 h-8 mx-auto mb-2 bg-green-500 rounded-lg flex items-center justify-center">
                      <Monitor className="w-4 h-4 text-white" />
                    </div>
                    <p className={`text-sm font-medium ${themeClasses.text}`}>Center</p>
                  </div>
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => onPositionChange('top-right')}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    currentPosition === 'top-right'
                      ? 'border-orange-500 bg-orange-500/10'
                      : `${isDarkMode ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-gray-50'}`
                  }`}
                >
                  <div className="text-center">
                    <div className="w-8 h-8 mx-auto mb-2 bg-orange-500 rounded-lg flex items-center justify-center">
                      <Smartphone className="w-4 h-4 text-white" />
                    </div>
                    <p className={`text-sm font-medium ${themeClasses.text}`}>Top-Right</p>
                  </div>
                </motion.button>
              </div>

              {/* Mode d'affichage */}
              <div className="flex items-center justify-between p-4 rounded-xl bg-gray-100 dark:bg-gray-800">
                <div className="flex items-center space-x-3">
                  <Maximize2 className="w-5 h-5 text-purple-500" />
                  <div>
                    <p className={`font-medium ${themeClasses.text}`}>Mode Plein Écran</p>
                    <p className={`text-sm ${themeClasses.textSecondary}`}>Interface expansée</p>
                  </div>
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => onFullscreenChange(!isFullscreen)}
                  className={`w-12 h-6 rounded-full transition-colors ${
                    isFullscreen ? 'bg-purple-500' : 'bg-gray-400'
                  }`}
                >
                  <motion.div
                    className="w-5 h-5 bg-white rounded-full shadow-lg"
                    animate={{ x: isFullscreen ? 24 : 2 }}
                    transition={{ duration: 0.2 }}
                  />
                </motion.button>
              </div>
            </div>

            {/* Section Apparence */}
            <div className="space-y-4">
              <h3 className={`text-lg font-semibold ${themeClasses.text} flex items-center space-x-2`}>
                <Palette className="w-5 h-5" />
                <span>Apparence</span>
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
                    className={`p-4 rounded-xl border-2 transition-all ${
                      selectedTheme === theme.value
                        ? 'border-purple-500 bg-purple-500/10'
                        : `${isDarkMode ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-gray-50'}`
                    }`}
                  >
                    <div className="text-center">
                      <div className="text-2xl mb-2">{theme.icon}</div>
                      <p className={`text-sm font-medium ${themeClasses.text}`}>{theme.label}</p>
                    </div>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Section Audio et Notifications */}
            <div className="space-y-4">
              <h3 className={`text-lg font-semibold ${themeClasses.text} flex items-center space-x-2`}>
                <Volume2 className="w-5 h-5" />
                <span>Audio et Notifications</span>
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className={`font-medium ${themeClasses.text}`}>Volume Audio</p>
                    <p className={`text-sm ${themeClasses.textSecondary}`}>Contrôle du volume</p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className={`text-sm ${themeClasses.textSecondary}`}>{volume}%</span>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={volume}
                      onChange={(e) => setVolume(Number(e.target.value))}
                      className="w-24 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 rounded-xl bg-gray-100 dark:bg-gray-800">
                  <div className="flex items-center space-x-3">
                    <Bell className="w-5 h-5 text-yellow-500" />
                    <div>
                      <p className={`font-medium ${themeClasses.text}`}>Notifications</p>
                      <p className={`text-sm ${themeClasses.textSecondary}`}>Alertes et sons</p>
                    </div>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setNotifications(!notifications)}
                    className={`w-12 h-6 rounded-full transition-colors ${
                      notifications ? 'bg-yellow-500' : 'bg-gray-400'
                    }`}
                  >
                    <motion.div
                      className="w-5 h-5 bg-white rounded-full shadow-lg"
                      animate={{ x: notifications ? 24 : 2 }}
                      transition={{ duration: 0.2 }}
                    />
                  </motion.button>
                </div>
              </div>
            </div>

            {/* Section Fonctionnalités Avancées */}
            <div className="space-y-4">
              <h3 className={`text-lg font-semibold ${themeClasses.text} flex items-center space-x-2`}>
                <Bot className="w-5 h-5" />
                <span>Fonctionnalités Avancées</span>
              </h3>
              
              <div className="space-y-3">
                {[
                  { key: 'autoScroll', label: 'Défilement Automatique', description: 'Scroll automatique vers nouveaux messages' },
                  { key: 'showTimestamps', label: 'Horodatage', description: 'Afficher l\'heure des messages' },
                  { key: 'enableScoring', label: 'Système de Scoring', description: 'Évaluer les réponses IA' },
                  { key: 'enableHistory', label: 'Historique', description: 'Sauvegarder les conversations' }
                ].map((feature) => (
                  <div key={feature.key} className="flex items-center justify-between p-4 rounded-xl bg-gray-100 dark:bg-gray-800">
                    <div>
                      <p className={`font-medium ${themeClasses.text}`}>{feature.label}</p>
                      <p className={`text-sm ${themeClasses.textSecondary}`}>{feature.description}</p>
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
                      className={`w-12 h-6 rounded-full transition-colors ${
                        (feature.key === 'autoScroll' ? autoScroll :
                         feature.key === 'showTimestamps' ? showTimestamps :
                         feature.key === 'enableScoring' ? enableScoring :
                         enableHistory) ? 'bg-green-500' : 'bg-gray-400'
                      }`}
                    >
                      <motion.div
                        className="w-5 h-5 bg-white rounded-full shadow-lg"
                        animate={{ 
                          x: (feature.key === 'autoScroll' ? autoScroll :
                              feature.key === 'showTimestamps' ? showTimestamps :
                              feature.key === 'enableScoring' ? enableScoring :
                              enableHistory) ? 24 : 2 
                        }}
                        transition={{ duration: 0.2 }}
                      />
                    </motion.button>
                  </div>
                ))}
              </div>
            </div>

            {/* Section État de l'IA */}
            <div className="space-y-4">
              <h3 className={`text-lg font-semibold ${themeClasses.text} flex items-center space-x-2`}>
                <Brain className="w-5 h-5" />
                <span>État de l'Assistant IA</span>
              </h3>
              
              <div className="p-4 rounded-xl bg-gray-100 dark:bg-gray-800">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`w-3 h-3 rounded-full ${isIAEnLigne ? 'bg-green-500' : 'bg-red-500'}`}></div>
                    <span className={`font-medium ${themeClasses.text}`}>
                      {isIAEnLigne ? 'En ligne' : 'Hors ligne'}
                    </span>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setIsIAEnLigne(!isIAEnLigne)}
                    className={`px-4 py-2 rounded-lg text-white font-medium ${
                      isIAEnLigne ? 'bg-red-500' : 'bg-green-500'
                    }`}
                  >
                    {isIAEnLigne ? 'Déconnecter' : 'Connecter'}
                  </motion.button>
                </div>
              </div>
            </div>
          </div>

          {/* Footer avec actions */}
          <div className={`p-6 ${isDarkMode ? 'bg-gray-800' : 'bg-gray-100'} border-t ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
            <div className="flex items-center justify-between">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onClose}
                className="px-6 py-3 bg-gray-500 text-white rounded-xl font-medium"
              >
                Annuler
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onClose}
                className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-xl font-medium"
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
