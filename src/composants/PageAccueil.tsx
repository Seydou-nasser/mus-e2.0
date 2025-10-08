import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  QrCode, 
  Sparkles,
  Users,
  Palette,
  Map,
  ChevronRight,
  Mic,
  Camera,
  Star,
  Award,
  Zap,
  Bot,
  Eye,
  TrendingUp,
  Shield
} from 'lucide-react';
import IconeIA from './IconeIA';
import ScannerQRNatif from './ScannerQRNatif';
import Hero3D from './Hero3D';
import { useTheme } from './ThemeProvider';
import { useTranslation } from 'react-i18next';

/**
 * Page d'accueil révolutionnaire - Design ultra doré Full HD
 * Démonstration des fonctionnalités core du cahier des charges
 * Statistiques animées et impressionnantes
 * Design authentiquement africain avec motifs traditionnels
 */
const PageAccueil: React.FC = () => {
  const { isDarkMode, getThemeClasses } = useTheme();
  const themeClasses = getThemeClasses();
  const { t, i18n } = useTranslation();
  const [isScannerActif, setIsScannerActif] = useState(false);
  const [isScannerQROpen, setIsScannerQROpen] = useState(false);
  const [statistiques, setStatistiques] = useState({
    visiteurs: 0,
    oeuvres: 0,
    parcours: 0
  });

  // Animation des compteurs de statistiques
  useEffect(() => {
    const animateCounters = () => {
      const targetStats = { visiteurs: 12847, oeuvres: 156, parcours: 23 };
      const duration = 2000; // 2 secondes
      const steps = 60;
      const stepDuration = duration / steps;
      
      let currentStep = 0;
      const interval = setInterval(() => {
        currentStep++;
        const progress = currentStep / steps;
        
        setStatistiques({
          visiteurs: Math.floor(targetStats.visiteurs * progress),
          oeuvres: Math.floor(targetStats.oeuvres * progress),
          parcours: Math.floor(targetStats.parcours * progress)
        });
        
        if (currentStep >= steps) {
          clearInterval(interval);
          setStatistiques(targetStats);
        }
      }, stepDuration);
    };

    // Démarrer l'animation après 1 seconde
    const timer = setTimeout(animateCounters, 1000);
    return () => clearTimeout(timer);
  }, []);

  // Variantes d'animation pour les éléments avec parallax doux
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring" as const,
        stiffness: 80,
        damping: 20,
        duration: 0.8
      }
    }
  };

  // Variantes parallax douces pour les couches
  const parallaxVariants = {
    background: {
      y: [0, -8, 0],
      transition: {
        duration: 6,
        repeat: Infinity,
        repeatType: "reverse" as const,
        ease: "easeInOut"
      }
    },
    foreground: {
      y: [0, 4, 0],
      transition: {
        duration: 4,
        repeat: Infinity,
        repeatType: "reverse" as const,
        ease: "easeInOut"
      }
    },
    floating: {
      y: [0, -3, 0],
      transition: {
        duration: 3,
        repeat: Infinity,
        repeatType: "reverse" as const,
        ease: "easeInOut"
      }
    }
  };

  // Variantes pour les micro-interactions
  const hoverVariants = {
    rest: { 
      scale: 1, 
      y: 0,
      transition: { duration: 0.3, ease: "easeOut" }
    },
    hover: { 
      scale: 1.02, 
      y: -2,
      transition: { duration: 0.2, ease: "easeOut" }
    },
    tap: { 
      scale: 0.98,
      transition: { duration: 0.1 }
    }
  };

  return (
    <div className="relative">
      {/* Hero Section 3D avec carrousel */}
      <Hero3D />
      
      {/* Contenu existant */}
      <div className={`min-h-screen relative overflow-hidden ${themeClasses.background}`}>
      {/* Effets visuels révolutionnaires */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Particules dorées flottantes */}
        <div className="absolute inset-0 opacity-20">
          {[...Array(50)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-yellow-400 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -100, 0],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>
        
        {/* Ondes dorées */}
        <div className="absolute inset-0 opacity-10">
          <motion.div
            className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-radial from-yellow-500/30 to-transparent rounded-full"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
            }}
          />
          <motion.div
            className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-radial from-amber-500/30 to-transparent rounded-full"
            animate={{
              scale: [1.2, 1, 1.2],
              opacity: [0.6, 0.3, 0.6],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              delay: 1,
            }}
          />
        </div>
      </div>

      {/* Section Héro Révolutionnaire - Ultra Responsive */}
      <section className="relative py-8 xs:py-12 sm:py-20 md:py-24 lg:py-32 px-3 xs:px-4 sm:px-6 text-center">
        <div className="container mx-auto max-w-6xl">
          {/* Titre Révolutionnaire avec mots-clés colorés - Ultra Responsive */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              duration: 1.0, 
              delay: 0.2,
              ease: "easeOut"
            }}
            className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-amber-500 to-orange-500 mb-4 xs:mb-6 sm:mb-8 leading-tight"
          >
            <motion.span 
              className="block"
              animate={{
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <span className={`${themeClasses.text} drop-shadow-2xl`}>
                {i18n.language === 'fr' ? (
                  <>
                    <span className="text-[#32CD32] font-bold">REVOLUTION</span> | experience museale avec{' '}
                    <span className="text-[#32CD32] font-bold">IA</span>, la{' '}
                    <span className="text-[#32CD32] font-bold">REALITE AUGMENTEE</span> et{' '}
                    <span className="text-[#FF8C00] font-bold">INNOVATION</span>{' '}
                    technologique au service du{' '}
                    <span className="text-[#8A2BE2] font-bold">PATRIMOINE AFRICAIN</span>
                  </>
                ) : i18n.language === 'en' ? (
                  <>
                    <span className="text-[#32CD32] font-bold">REVOLUTIONIZE</span> the museum experience with{' '}
                    <span className="text-[#32CD32] font-bold">AI</span>,{' '}
                    <span className="text-[#32CD32] font-bold">AUGMENTED REALITY</span> and{' '}
                    <span className="text-[#FF8C00] font-bold">INNOVATION</span>{' '}
                    at the service of{' '}
                    <span className="text-[#8A2BE2] font-bold">AFRICAN HERITAGE</span>
                  </>
                ) : (
                  <>
                    <span className="text-[#32CD32] font-bold">RÉVOLUTION</span> jëfandikoo bi ci musée bi ak{' '}
                    <span className="text-[#32CD32] font-bold">IA</span>, <span className="text-[#32CD32] font-bold">DËGG-DËGG AUGMENTÉE</span> ak{' '}
                    <span className="text-[#FF8C00] font-bold">INNOVATION</span>{' '}
                    ci xeet ci ngërëm{' '}
                    <span className="text-[#8A2BE2] font-bold">PATRIMOINE AFRIK</span>
                  </>
                )}
              </span>
            </motion.span>
          </motion.h1>
          
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className={`text-xl sm:text-2xl ${themeClasses.textSecondary} mb-16 max-w-4xl mx-auto font-light`}
              >
                {t('accueil.sousTitre')}
              </motion.p>
              
              
          
          {/* Boutons d'Action Révolutionnaires */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center mb-12 sm:mb-16"
          >
            {/* Bouton Orange - Explorer Collections */}
            <motion.button
              whileHover={{ 
                scale: 1.05, 
                boxShadow: "0 25px 50px rgba(255, 140, 0, 0.6)",
                y: -2
              }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-[#C05621] to-[#FF8C00] hover:from-[#B84D1A] hover:to-[#E67E00] text-white px-6 py-4 sm:px-10 sm:py-5 rounded-2xl sm:rounded-3xl font-black text-lg sm:text-xl transition-all duration-500 flex items-center space-x-3 sm:space-x-4 shadow-2xl border-2 border-yellow-400/30 hover:border-yellow-400/60 w-full sm:w-auto justify-center"
            >
              <motion.div
                animate={{ rotate: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Palette className="w-7 h-7" />
              </motion.div>
                  <span className="drop-shadow-lg">{t('accueil.boutonCollections')}</span>
              <motion.div
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <ChevronRight className="w-7 h-7" />
              </motion.div>
            </motion.button>
            
            {/* Bouton Vert - Scanner QR */}
            <motion.button
              whileHover={{ 
                scale: 1.03, 
                boxShadow: "0 20px 40px rgba(40, 167, 69, 0.5)",
                y: -1
              }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setIsScannerQROpen(true)}
              className="bg-[#28A745] hover:bg-[#218838] text-white px-6 py-4 sm:px-10 sm:py-5 rounded-2xl sm:rounded-3xl font-black text-lg sm:text-xl transition-all duration-500 flex items-center space-x-3 sm:space-x-4 shadow-2xl border-2 border-green-400/30 hover:border-green-400/60 w-full sm:w-auto justify-center"
            >
              <motion.div
                animate={{ scale: [1, 1.08, 1] }}
                transition={{ 
                  duration: 2.5, 
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <QrCode className="w-7 h-7" />
              </motion.div>
                  <span className="drop-shadow-lg">{t('accueil.boutonQR')}</span>
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ 
                  duration: 4, 
                  repeat: Infinity, 
                  ease: "easeInOut" 
                }}
              >
                <Sparkles className="w-7 h-7" />
              </motion.div>
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Section Fonctionnalités Révolutionnaires - Ultra Améliorée */}
      <section className="py-12 xs:py-16 sm:py-18 md:py-20 px-3 xs:px-4 sm:px-6 relative">
        {/* Effet de fond glassmorphism amélioré */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent backdrop-blur-sm"></div>
        
        {/* Particules flottantes de fond */}
        <div className="absolute inset-0 opacity-20">
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -30, 0],
                opacity: [0, 1, 0],
                scale: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 3,
              }}
            />
          ))}
        </div>
        
        <div className="container mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="text-center mb-12 xs:mb-16"
          >
            <motion.h2 
              className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-amber-500 to-orange-500 mb-4 xs:mb-6"
              animate={{
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "linear",
              }}
            >
              {t('fonctionnalites.titre')}
            </motion.h2>
            <motion.p 
              className={`text-lg xs:text-xl ${themeClasses.textSecondary} max-w-3xl mx-auto`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              {t('fonctionnalites.sousTitre')}
            </motion.p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 gap-6 xs:gap-8 max-w-6xl mx-auto"
          >
            {/* QR Code Scanner - Ultra Amélioré */}
            <motion.div
              variants={itemVariants}
              whileHover={{ 
                scale: 1.03, 
                y: -6,
                boxShadow: "0 20px 40px rgba(34, 197, 94, 0.25)"
              }}
              className="bg-gradient-to-br from-white/15 to-white/5 backdrop-blur-xl rounded-2xl xs:rounded-3xl p-6 xs:p-8 text-center border border-white/30 hover:border-green-400/50 transition-all duration-500 shadow-2xl relative overflow-hidden group"
            >
              {/* Effet de brillance amélioré */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              
              {/* Particules flottantes */}
              <div className="absolute inset-0 opacity-20">
                {[...Array(6)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-1 h-1 bg-green-400 rounded-full"
                    style={{
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`,
                    }}
                    animate={{
                      y: [0, -15, 0],
                      opacity: [0, 0.8, 0],
                    }}
                    transition={{
                      duration: 3 + Math.random() * 2,
                      repeat: Infinity,
                      delay: Math.random() * 3,
                      ease: "easeInOut"
                    }}
                  />
                ))}
              </div>
              
              <motion.div 
                className="w-16 h-16 xs:w-20 xs:h-20 bg-gradient-to-br from-green-500 to-teal-600 rounded-2xl xs:rounded-3xl flex items-center justify-center mx-auto mb-4 xs:mb-6 shadow-2xl relative"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
              >
                <QrCode className="w-8 h-8 xs:w-10 xs:h-10 text-white" />
                {/* Effet de pulsation */}
                <motion.div
                  className="absolute inset-0 bg-green-400/30 rounded-2xl xs:rounded-3xl"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.5, 0, 0.5],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                  }}
                />
              </motion.div>
              <h3 className={`text-xl xs:text-2xl font-bold ${themeClasses.text} mb-3 xs:mb-4 group-hover:text-green-300 transition-colors`}>
                {t('fonctionnalites.qr.titre')}
              </h3>
              <p className={`text-sm xs:text-base ${themeClasses.textSecondary} mb-4 xs:mb-6 leading-relaxed`}>{t('fonctionnalites.qr.description')}</p>
              <div className="flex justify-center space-x-2 xs:space-x-3">
                <motion.span 
                  className="bg-green-500/30 text-green-300 px-3 py-1.5 xs:px-4 xs:py-2 rounded-full text-xs xs:text-sm font-semibold border border-green-400/30"
                  whileHover={{ scale: 1.1 }}
                >
                  FR
                </motion.span>
                <motion.span 
                  className="bg-blue-500/30 text-blue-300 px-3 py-1.5 xs:px-4 xs:py-2 rounded-full text-xs xs:text-sm font-semibold border border-blue-400/30"
                  whileHover={{ scale: 1.1 }}
                >
                  EN
                </motion.span>
                <motion.span 
                  className="bg-yellow-500/30 text-yellow-300 px-3 py-1.5 xs:px-4 xs:py-2 rounded-full text-xs xs:text-sm font-semibold border border-yellow-400/30"
                  whileHover={{ scale: 1.1 }}
                >
                  WO
                </motion.span>
              </div>
            </motion.div>

            {/* IA Conversationnelle */}
            <motion.div
              variants={itemVariants}
              whileHover={{ 
                scale: 1.05, 
                y: -10,
                boxShadow: "0 25px 50px rgba(168, 85, 247, 0.3)"
              }}
              className="bg-gradient-to-br from-white/15 to-white/5 backdrop-blur-xl rounded-3xl p-8 text-center border border-white/30 hover:border-purple-400/50 transition-all duration-500 shadow-2xl relative overflow-hidden group"
            >
              {/* Effet de brillance */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              
              <motion.div 
                className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-600 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-2xl"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
              >
                <Bot className="w-10 h-10 text-white" />
              </motion.div>
              <h3 className={`text-2xl font-bold ${themeClasses.text} mb-4 group-hover:text-purple-300 transition-colors`}>
                {t('fonctionnalites.ia.titre')}
              </h3>
              <p className={`${themeClasses.textSecondary} mb-6 leading-relaxed`}>{t('fonctionnalites.ia.description')}</p>
              <div className="flex justify-center space-x-3">
                <motion.div
                  whileHover={{ scale: 1.2, rotate: 10 }}
                  className="w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center border border-purple-400/30"
                >
                  <Mic className="w-6 h-6 text-purple-300" />
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.2, rotate: -10 }}
                  className="w-12 h-12 bg-pink-500/20 rounded-full flex items-center justify-center border border-pink-400/30"
                >
                  <Bot className="w-6 h-6 text-pink-300" />
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.2, rotate: 10 }}
                  className="w-12 h-12 bg-yellow-500/20 rounded-full flex items-center justify-center border border-yellow-400/30"
                >
                  <Zap className="w-6 h-6 text-yellow-300" />
                </motion.div>
              </div>
            </motion.div>

            {/* Réalité Augmentée */}
            <motion.div
              variants={itemVariants}
              whileHover={{ 
                scale: 1.03, 
                y: -6,
                boxShadow: "0 20px 40px rgba(59, 130, 246, 0.25)"
              }}
              className="bg-gradient-to-br from-white/15 to-white/5 backdrop-blur-xl rounded-3xl p-8 text-center border border-white/30 hover:border-blue-400/50 transition-all duration-500 shadow-2xl relative overflow-hidden group"
            >
              {/* Effet de brillance */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              
              <motion.div 
                className="w-20 h-20 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-2xl"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
              >
                <Eye className="w-10 h-10 text-white" />
              </motion.div>
              <h3 className={`text-2xl font-bold ${themeClasses.text} mb-4 group-hover:text-blue-300 transition-colors`}>
                {t('fonctionnalites.ar.titre')}
              </h3>
              <p className={`${themeClasses.textSecondary} mb-6 leading-relaxed`}>{t('fonctionnalites.ar.description')}</p>
              <div className="flex justify-center space-x-3">
                <motion.div
                  whileHover={{ scale: 1.2, rotate: 10 }}
                  className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center border border-blue-400/30"
                >
                  <Camera className="w-6 h-6 text-blue-300" />
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.2, rotate: -10 }}
                  className="w-12 h-12 bg-cyan-500/20 rounded-full flex items-center justify-center border border-cyan-400/30"
                >
                  <Zap className="w-6 h-6 text-cyan-300" />
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.2, rotate: 10 }}
                  className="w-12 h-12 bg-indigo-500/20 rounded-full flex items-center justify-center border border-indigo-400/30"
                >
                  <Shield className="w-6 h-6 text-indigo-300" />
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Section Statistiques Ultra Dorées - Ultra Responsive */}
      <section className="py-8 xs:py-10 sm:py-14 md:py-16 lg:py-20 px-3 xs:px-4 sm:px-6 relative">
        {/* Effet de fond glassmorphism */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent backdrop-blur-sm"></div>
        
        <div className="container mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="text-center mb-8 sm:mb-12 md:mb-16"
          >
            <motion.h2 
              className="text-4xl sm:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-amber-500 to-orange-500 mb-6"
              animate={{
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "linear",
              }}
            >
              {i18n.language === 'fr' ? 'Impact Révolutionnaire' : 
               i18n.language === 'en' ? 'Revolutionary Impact' : 
               'Impact Révolutionnaire'}
            </motion.h2>
            <motion.p 
              className={`text-xl ${themeClasses.textSecondary} max-w-3xl mx-auto`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.0 }}
            >
              {i18n.language === 'fr' ? 'Des chiffres qui témoignent de notre succès' : 
               i18n.language === 'en' ? 'Numbers that testify to our success' : 
               'Xeet yi di jëfandikoo ci jëfandikoo bi'}
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 gap-4 xs:gap-6 sm:gap-8 max-w-6xl mx-auto">
            {/* Carte Visiteurs - Ultra Améliorée */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
              whileHover={{ 
                scale: 1.03, 
                y: -6,
                boxShadow: "0 20px 40px rgba(59, 130, 246, 0.25)"
              }}
              className="bg-gradient-to-br from-white/15 to-white/5 backdrop-blur-xl rounded-2xl xs:rounded-3xl p-6 xs:p-8 text-center border border-white/30 hover:border-blue-400/50 transition-all duration-500 shadow-2xl relative overflow-hidden group"
            >
              {/* Effet de brillance amélioré */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              
              {/* Particules flottantes */}
              <div className="absolute inset-0 opacity-20">
                {[...Array(8)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-1 h-1 bg-blue-400 rounded-full"
                    style={{
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`,
                    }}
                    animate={{
                      y: [0, -15, 0],
                      opacity: [0, 0.8, 0],
                    }}
                    transition={{
                      duration: 3 + Math.random() * 2,
                      repeat: Infinity,
                      delay: Math.random() * 3,
                      ease: "easeInOut"
                    }}
                  />
                ))}
              </div>
              
              <div className="flex justify-center mb-4 xs:mb-6">
                <motion.div 
                  className="w-20 h-20 xs:w-24 xs:h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl xs:rounded-3xl flex items-center justify-center shadow-2xl relative"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <Users className="w-10 h-10 xs:w-12 xs:h-12 text-white" />
                  {/* Effet de pulsation */}
                  <motion.div
                    className="absolute inset-0 bg-blue-400/30 rounded-2xl xs:rounded-3xl"
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.5, 0, 0.5],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                    }}
                  />
                </motion.div>
              </div>
              <motion.div 
                className={`text-4xl xs:text-5xl sm:text-6xl font-bold ${themeClasses.text} mb-2`}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 1.1, type: "spring", stiffness: 200 }}
              >
                {statistiques.visiteurs.toLocaleString()}
              </motion.div>
              <div className={`text-lg xs:text-xl sm:text-2xl font-semibold ${themeClasses.text} mb-2 group-hover:text-blue-300 transition-colors`}>
                {t('accueil.statistiques.visiteurs')}
              </div>
              <div className="text-blue-300 text-xs xs:text-sm mb-4 font-medium">
                {i18n.language === 'fr' ? 'Explorateurs culturels' : 
                 i18n.language === 'en' ? 'Cultural explorers' : 
                 'Seetukaay yu koom-koom'}
              </div>
              <motion.div 
                className="flex items-center justify-center space-x-1 xs:space-x-2"
                whileHover={{ scale: 1.1 }}
              >
                <TrendingUp className="w-4 h-4 xs:w-5 xs:h-5 text-green-400" />
                <span className="text-green-400 text-xs xs:text-sm font-semibold">
                  {i18n.language === 'fr' ? '+23% ce mois' : 
                   i18n.language === 'en' ? '+23% this month' : 
                   '+23% ci weer wi'}
                </span>
              </motion.div>
            </motion.div>

            {/* Carte Œuvres - Ultra Améliorée */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0 }}
              whileHover={{ 
                scale: 1.05, 
                y: -10,
                boxShadow: "0 25px 50px rgba(251, 146, 60, 0.3)"
              }}
              className="bg-gradient-to-br from-white/15 to-white/5 backdrop-blur-xl rounded-2xl xs:rounded-3xl p-6 xs:p-8 text-center border border-white/30 hover:border-orange-400/50 transition-all duration-500 shadow-2xl relative overflow-hidden group"
            >
              {/* Effet de brillance amélioré */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              
              {/* Particules flottantes */}
              <div className="absolute inset-0 opacity-20">
                {[...Array(8)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-1 h-1 bg-orange-400 rounded-full"
                    style={{
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`,
                    }}
                    animate={{
                      y: [0, -15, 0],
                      opacity: [0, 0.8, 0],
                    }}
                    transition={{
                      duration: 3 + Math.random() * 2,
                      repeat: Infinity,
                      delay: Math.random() * 3,
                      ease: "easeInOut"
                    }}
                  />
                ))}
              </div>
              
              <div className="flex justify-center mb-4 xs:mb-6">
                <motion.div 
                  className="w-20 h-20 xs:w-24 xs:h-24 bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl xs:rounded-3xl flex items-center justify-center shadow-2xl relative"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <Palette className="w-10 h-10 xs:w-12 xs:h-12 text-white" />
                  {/* Effet de pulsation */}
                  <motion.div
                    className="absolute inset-0 bg-orange-400/30 rounded-2xl xs:rounded-3xl"
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.5, 0, 0.5],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                    }}
                  />
                </motion.div>
              </div>
              <motion.div 
                className={`text-4xl xs:text-5xl sm:text-6xl font-bold ${themeClasses.text} mb-2`}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 1.2, type: "spring", stiffness: 200 }}
              >
                {statistiques.oeuvres}
              </motion.div>
              <div className={`text-lg xs:text-xl sm:text-2xl font-semibold ${themeClasses.text} mb-2 group-hover:text-orange-300 transition-colors`}>
                {t('accueil.statistiques.oeuvres')}
              </div>
              <div className="text-orange-300 text-xs xs:text-sm mb-4 font-medium">
                {t('accueil.statistiques.oeuvresDescription')}
              </div>
              <motion.div 
                className="flex items-center justify-center space-x-1 xs:space-x-2"
                whileHover={{ scale: 1.1 }}
              >
                <Star className="w-4 h-4 xs:w-5 xs:h-5 text-yellow-400" />
                <span className="text-yellow-400 text-xs xs:text-sm font-semibold">
                  {i18n.language === 'fr' ? '4.9/5 étoiles' : 
                   i18n.language === 'en' ? '4.9/5 stars' : 
                   '4.9/5 xiddi'}
                </span>
              </motion.div>
            </motion.div>

            {/* Carte Parcours - Ultra Améliorée */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1 }}
              whileHover={{ 
                scale: 1.05, 
                y: -10,
                boxShadow: "0 25px 50px rgba(34, 197, 94, 0.3)"
              }}
              className="bg-gradient-to-br from-white/15 to-white/5 backdrop-blur-xl rounded-2xl xs:rounded-3xl p-6 xs:p-8 text-center border border-white/30 hover:border-green-400/50 transition-all duration-500 shadow-2xl relative overflow-hidden group"
            >
              {/* Effet de brillance amélioré */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              
              {/* Particules flottantes */}
              <div className="absolute inset-0 opacity-20">
                {[...Array(8)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-1 h-1 bg-green-400 rounded-full"
                    style={{
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`,
                    }}
                    animate={{
                      y: [0, -15, 0],
                      opacity: [0, 0.8, 0],
                    }}
                    transition={{
                      duration: 3 + Math.random() * 2,
                      repeat: Infinity,
                      delay: Math.random() * 3,
                      ease: "easeInOut"
                    }}
                  />
                ))}
              </div>
              
              <div className="flex justify-center mb-4 xs:mb-6">
                <motion.div 
                  className="w-20 h-20 xs:w-24 xs:h-24 bg-gradient-to-br from-green-500 to-teal-600 rounded-2xl xs:rounded-3xl flex items-center justify-center shadow-2xl relative"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <Map className="w-10 h-10 xs:w-12 xs:h-12 text-white" />
                  {/* Effet de pulsation */}
                  <motion.div
                    className="absolute inset-0 bg-green-400/30 rounded-2xl xs:rounded-3xl"
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.5, 0, 0.5],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                    }}
                  />
                </motion.div>
              </div>
              <motion.div 
                className={`text-4xl xs:text-5xl sm:text-6xl font-bold ${themeClasses.text} mb-2`}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 1.3, type: "spring", stiffness: 200 }}
              >
                {statistiques.parcours}
              </motion.div>
              <div className={`text-lg xs:text-xl sm:text-2xl font-semibold ${themeClasses.text} mb-2 group-hover:text-green-300 transition-colors`}>
                {t('accueil.statistiques.parcours')}
              </div>
              <div className="text-green-300 text-xs xs:text-sm mb-4 font-medium">
                {t('accueil.statistiques.parcoursDescription')}
              </div>
              <motion.div 
                className="flex items-center justify-center space-x-1 xs:space-x-2"
                whileHover={{ scale: 1.1 }}
              >
                <Award className="w-4 h-4 xs:w-5 xs:h-5 text-yellow-400" />
                <span className="text-yellow-400 text-xs xs:text-sm font-semibold">
                  {t('accueil.statistiques.gamifies')}
                </span>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>


      {/* Scanner QR Modal */}
      <AnimatePresence>
        {isScannerActif && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-6"
            onClick={() => setIsScannerActif(false)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-slate-800 rounded-3xl p-8 max-w-md w-full text-center shadow-2xl border border-white/10"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="w-20 h-20 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <QrCode className="w-10 h-10 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">{t('scanner.titre')}</h3>
              <p className={`${themeClasses.textSecondary} mb-6`}>{t('scanner.description')}</p>
              <div className="w-48 h-48 bg-slate-700 border-2 border-dashed border-green-400 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Camera className="w-12 h-12 text-green-400" />
              </div>
              <button
                onClick={() => setIsScannerActif(false)}
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl font-semibold transition-colors"
              >
{t('scanner.fermer')}
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>


      {/* Scanner QR Natif Révolutionnaire */}
      <ScannerQRNatif
        isOpen={isScannerQROpen}
        onClose={() => setIsScannerQROpen(false)}
        onScanSuccess={(data) => {
          console.log('QR Code scanné:', data);
          // Redirection vers la page de l'œuvre
          window.location.href = `/oeuvre/${data}`;
        }}
      />
      </div>
    </div>
  );
};

export default PageAccueil;