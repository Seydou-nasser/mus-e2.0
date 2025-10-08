import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from './ThemeProvider';
import { useContexteIA } from './ContexteIA';
import IconeIA from './IconeIA';

/**
 * Bouton IA Global - Vraiment flottant et visible partout
 * Position fixe qui suit le scroll et reste toujours visible
 */
const BoutonIAGlobal: React.FC = () => {
  const { isDarkMode } = useTheme();
  const { isIAEnLigne, isChatbotOpen, setIsChatbotOpen, setLastClickSource } = useContexteIA();
  const [scrollY, setScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  // Détection du scroll pour position dynamique
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
      // Toujours visible, mais position adaptée au scroll
      setIsVisible(true);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Gestion du clic sur le bouton flottant
  const handleClick = () => {
    setLastClickSource('floating');
    setIsChatbotOpen(!isChatbotOpen);
  };

  // Position optimale pour l'interface chatbot - Responsive
  const getPositionStyle = () => {
    const isMobile = window.innerWidth < 768;
    const isSmallMobile = window.innerWidth < 480;
    
    return {
      position: 'fixed' as const,
      top: isSmallMobile ? '80%' : isMobile ? '75%' : '70%',
      right: isSmallMobile ? '12px' : isMobile ? '16px' : '24px',
      transform: 'translateY(-50%)',
      zIndex: 9999,
    };
  };

  return (
    <motion.button
      initial={{ scale: 0, opacity: 0 }}
      animate={{ 
        scale: isVisible ? 1 : 0.8, 
        opacity: isVisible ? 1 : 0.7,
        y: [0, -5, 0]
      }}
      transition={{ 
        delay: 1, 
        type: "spring", 
        stiffness: 200,
        y: {
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }
      }}
      whileHover={{ 
        scale: 1.2, 
        y: -10,
        boxShadow: "0 30px 60px rgba(139, 92, 246, 0.6)"
      }}
      whileTap={{ scale: 0.9 }}
      onClick={handleClick}
      style={getPositionStyle()}
      className={`p-3 xs:p-4 sm:p-5 rounded-full shadow-2xl transition-all duration-300 relative overflow-hidden group ${
        isDarkMode 
          ? 'bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700' 
          : 'bg-gradient-to-r from-purple-400 to-pink-500 hover:from-purple-500 hover:to-pink-600'
      }`}
      title={`🤖 Assistant IA - ${isIAEnLigne ? 'En ligne et disponible' : 'Hors ligne'}`}
      aria-label={`Assistant virtuel intelligent - ${isIAEnLigne ? 'Disponible' : 'Indisponible'}`}
    >
      {/* Effet de brillance */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
      
      {/* Effet de pulsation pour attirer l'attention */}
      <motion.div
        className="absolute inset-0 rounded-full border-2 border-white/30"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.5, 0.8, 0.5],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
        }}
      />
      
      {/* Particules flottantes - Plus visibles */}
      <div className="absolute inset-0 opacity-50">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className={`absolute w-1.5 h-1.5 rounded-full ${
              i % 3 === 0 ? 'bg-white' : 
              i % 3 === 1 ? 'bg-purple-300' : 'bg-pink-300'
            }`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -15, 0],
              opacity: [0, 1, 0],
              scale: [0.5, 1.2, 0.5],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 3,
            }}
          />
        ))}
      </div>
      
      {/* Icône IA personnalisée - Responsive */}
      <IconeIA 
        className="w-6 h-6 xs:w-7 xs:h-7 sm:w-8 sm:h-8 text-white" 
        isDarkMode={isDarkMode}
        isActive={true}
      />
      
      {/* Indicateur d'état - Bordure colorée */}
      <motion.div
        className={`absolute inset-0 rounded-full border-4 ${
          isIAEnLigne ? 'border-green-400' : 'border-red-400'
        }`}
        animate={{
          scale: [1, 1.05, 1],
          opacity: [0.6, 1, 0.6],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
        }}
      />
      
      {/* Badge de notification - État de l'IA - Responsive */}
      <motion.div
        className={`absolute -top-3 -right-3 xs:-top-4 xs:-right-4 w-5 h-5 xs:w-6 xs:h-6 rounded-full flex items-center justify-center shadow-xl border-2 border-white ${
          isIAEnLigne ? 'bg-green-500' : 'bg-red-500'
        }`}
        animate={{
          scale: [1, 1.5, 1],
          opacity: [0.9, 1, 0.9],
        }}
        transition={{
          duration: 1.2,
          repeat: Infinity,
        }}
      >
        <div className="w-2 h-2 xs:w-3 xs:h-3 bg-white rounded-full"></div>
      </motion.div>
      
      {/* Badge alternatif - Plus doux et subtil */}
      <motion.div
        className={`absolute top-1 right-1 w-3 h-3 rounded-full ${
          isIAEnLigne ? 'bg-green-300/80' : 'bg-red-300/80'
        }`}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.5, 0.8, 0.5],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
        }}
      />
      
      {/* Texte indicatif - Visible sur desktop */}
      <motion.div
        className="absolute -left-2 top-1/2 transform -translate-y-1/2 translate-x-full bg-white/90 dark:bg-gray-800/90 text-gray-800 dark:text-white px-3 py-2 rounded-lg shadow-lg whitespace-nowrap text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        initial={{ x: 20, opacity: 0 }}
        whileHover={{ x: 0, opacity: 1 }}
      >
        {isIAEnLigne ? 'IA Disponible' : 'IA Occupée'}
        <div className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-1 w-2 h-2 bg-white/90 dark:bg-gray-800/90 rotate-45"></div>
      </motion.div>
    </motion.button>
  );
};

export default BoutonIAGlobal;
