import React from 'react';
import { motion } from 'framer-motion';
import { Sun, Moon, Sparkles } from 'lucide-react';
import { useTheme } from './ThemeProvider';

/**
 * Bouton de basculement de thème avec effets visuels premium
 * Mode visite nocturne avec animations sophistiquées
 */
const BoutonTheme: React.FC = () => {
  const { theme, toggleTheme, isDarkMode } = useTheme();

  // Obtenir l'icône et le texte selon le thème
  const getThemeIcon = () => {
    switch (theme) {
      case 'sombre': return <Moon className="w-6 h-6" />;
      case 'douce': return <Sparkles className="w-6 h-6" />;
      case 'clair': return <Sun className="w-6 h-6" />;
      default: return <Moon className="w-6 h-6" />;
    }
  };

  const getThemeText = () => {
    switch (theme) {
      case 'sombre': return 'Mode Sombre';
      case 'douce': return 'Mode Douce';
      case 'clair': return 'Mode Clair';
      default: return 'Mode Sombre';
    }
  };

  return (
    <motion.button
      whileHover={{ 
        scale: 1.05, 
        y: -2,
        boxShadow: isDarkMode 
          ? "0 20px 40px rgba(59, 130, 246, 0.4)" 
          : "0 20px 40px rgba(255, 193, 7, 0.4)"
      }}
      whileTap={{ scale: 0.95 }}
      onClick={toggleTheme}
      className={`
        relative overflow-hidden px-6 py-3 rounded-2xl font-bold text-lg transition-all duration-500 flex items-center space-x-3
        ${isDarkMode 
          ? 'bg-gradient-to-r from-blue-600 to-indigo-700 text-white border-2 border-blue-400/30 hover:border-blue-400/60' 
          : 'bg-gradient-to-r from-yellow-500 to-orange-600 text-white border-2 border-yellow-400/30 hover:border-yellow-400/60'
        }
        shadow-xl hover:shadow-2xl
      `}
    >
      {/* Effet de particules en arrière-plan */}
      <motion.div
        className="absolute inset-0 opacity-20"
        animate={{
          background: isDarkMode 
            ? "radial-gradient(circle at 20% 50%, rgba(59, 130, 246, 0.3) 0%, transparent 50%)"
            : "radial-gradient(circle at 20% 50%, rgba(255, 193, 7, 0.3) 0%, transparent 50%)"
        }}
        transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
      />
      
      {/* Icône animée */}
      <motion.div
        animate={{ 
          rotate: isDarkMode ? [0, 360] : [0, -360],
          scale: [1, 1.1, 1]
        }}
        transition={{ 
          duration: 2, 
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        {getThemeIcon()}
      </motion.div>
      
      {/* Texte avec effet de brillance */}
      <motion.span
        className="relative z-10"
        animate={{
          textShadow: isDarkMode 
            ? "0 0 10px rgba(59, 130, 246, 0.5)" 
            : "0 0 10px rgba(255, 193, 7, 0.5)"
        }}
        transition={{ duration: 1, repeat: Infinity, repeatType: "reverse" }}
      >
        {getThemeText()}
      </motion.span>
      
      {/* Effet de scintillement */}
      <motion.div
        animate={{ 
          opacity: [0, 1, 0],
          scale: [0.8, 1.2, 0.8]
        }}
        transition={{ 
          duration: 3, 
          repeat: Infinity,
          delay: 1
        }}
        className="absolute top-1 right-1"
      >
        <Sparkles className="w-4 h-4 text-white/70" />
      </motion.div>
    </motion.button>
  );
};

export default BoutonTheme;
