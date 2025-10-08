import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useTheme } from './ThemeProvider';
import AudioGuide from './AudioGuide';
import { 
  ChevronLeft, 
  ChevronRight, 
  Play, 
  Pause, 
  Volume2,
  Eye,
  Heart,
  Share2,
  Info
} from 'lucide-react';

/**
 * Hero Section 3D avec carrousel d'œuvres africaines
 * Animations parallax et effets visuels immersifs
 * Design authentiquement africain avec motifs traditionnels
 */
const Hero3D: React.FC = () => {
  const { t, i18n } = useTranslation();
  const { isDarkMode, getThemeClasses } = useTheme();
  const themeClasses = getThemeClasses();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [isAudioGuideOpen, setIsAudioGuideOpen] = useState(false);
  const [likedOeuvres, setLikedOeuvres] = useState<Set<number>>(new Set());
  const [isSharing, setIsSharing] = useState(false);

  // Œuvres africaines authentiques avec descriptions multilingues
  const oeuvres = [
    {
      id: 1,
      image: "/images/carrousel/masque-baoule.jpg",
      titre: {
        fr: "Masque Baoulé",
        en: "Baoulé Mask", 
        wo: "Këru Baoulé"
      },
      description: {
        fr: "Masque cérémoniel du peuple Baoulé, Côte d'Ivoire",
        en: "Ceremonial mask from the Baoulé people, Ivory Coast",
        wo: "Këru ci lëkk ci xeet Baoulé, Kosta Marfil"
      },
      periode: {
        fr: "XIXe siècle",
        en: "19th century",
        wo: "Xarnu fukk ak juroom"
      },
      region: {
        fr: "Côte d'Ivoire",
        en: "Ivory Coast", 
        wo: "Kosta Marfil"
      }
    },
    {
      id: 2,
      image: "/images/carrousel/statut-ashanti.jpg",
      titre: {
        fr: "Statue Ashanti",
        en: "Ashanti Statue",
        wo: "Xëjju Ashanti"
      },
      description: {
        fr: "Figure royale Ashanti en bronze, Ghana",
        en: "Royal Ashanti bronze figure, Ghana",
        wo: "Xëjju bu melni ci bronz Ashanti, Ghana"
      },
      periode: {
        fr: "XVIIIe siècle",
        en: "18th century",
        wo: "Xarnu fukk ak juroom-ñett"
      },
      region: {
        fr: "Ghana",
        en: "Ghana",
        wo: "Ghana"
      }
    },
    {
      id: 3,
      image: "/images/carrousel/reliquaire-fang.jpg",
      titre: {
        fr: "Reliquaire Fang",
        en: "Fang Reliquary",
        wo: "Reliquaire Fang"
      },
      description: {
        fr: "Reliquaire ancestral Fang, Gabon",
        en: "Ancestral Fang reliquary, Gabon",
        wo: "Reliquaire ci jamono Fang, Gabon"
      },
      periode: {
        fr: "XIXe siècle",
        en: "19th century",
        wo: "Xarnu fukk ak juroom"
      },
      region: {
        fr: "Gabon",
        en: "Gabon",
        wo: "Gabon"
      }
    }
  ];

  // Auto-play du carrousel avec pause au hover
  useEffect(() => {
    if (!isPlaying || isHovered) return;
    
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % oeuvres.length);
    }, 4000); // Réduit à 4s pour plus de dynamisme

    return () => clearInterval(interval);
  }, [isPlaying, isHovered, oeuvres.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % oeuvres.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + oeuvres.length) % oeuvres.length);
  };

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  // Fonction pour aimer/désaimer une œuvre
  const toggleLike = (oeuvreId: number) => {
    setLikedOeuvres(prev => {
      const newSet = new Set(prev);
      if (newSet.has(oeuvreId)) {
        newSet.delete(oeuvreId);
      } else {
        newSet.add(oeuvreId);
      }
      return newSet;
    });
  };

  // Fonction pour partager une œuvre avec URL spécifique
  const shareOeuvre = async (oeuvre: any) => {
    setIsSharing(true);
    
    // Construction de l'URL spécifique à l'œuvre
    const oeuvreUrl = `${window.location.origin}/oeuvre/${oeuvre.id}`;
    
    const shareData = {
      title: oeuvre.titre[i18n.language as keyof typeof oeuvre.titre],
      text: oeuvre.description[i18n.language as keyof typeof oeuvre.description],
      url: oeuvreUrl
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        // Fallback pour navigateurs sans support
        await navigator.clipboard.writeText(
          `${shareData.title}\n${shareData.text}\n${shareData.url}`
        );
        alert(i18n.language === 'fr' ? 'Lien copié dans le presse-papiers !' : 
              i18n.language === 'en' ? 'Link copied to clipboard!' : 
              'Lien ci ñu clipboard !');
      }
    } catch (error) {
      console.error('Erreur lors du partage:', error);
    } finally {
      setIsSharing(false);
    }
  };

  const currentOeuvre = oeuvres[currentSlide];
  const isLiked = likedOeuvres.has(currentOeuvre.id);

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Background avec effet parallax */}
      <div className={`absolute inset-0 ${themeClasses.background}`}>
        {/* Motifs africains en arrière-plan - Ultra Responsive */}
        <div className={`absolute inset-0 ${isDarkMode ? 'opacity-10' : 'opacity-20'}`}>
          <div className={`absolute top-2 left-2 w-8 h-8 sm:top-4 sm:left-4 sm:w-16 sm:h-16 md:top-10 md:left-10 md:w-32 md:h-32 border-2 ${isDarkMode ? 'border-yellow-400' : 'border-yellow-600'} rounded-full animate-spin`} style={{ animationDuration: '20s' }}></div>
          <div className={`absolute top-4 right-4 w-6 h-6 sm:top-8 sm:right-8 sm:w-12 sm:h-12 md:top-20 md:right-20 md:w-24 md:h-24 border-2 ${isDarkMode ? 'border-amber-400' : 'border-amber-600'} rounded-full animate-spin`} style={{ animationDuration: '15s', animationDirection: 'reverse' }}></div>
          <div className={`absolute bottom-4 left-1/4 w-4 h-4 sm:bottom-8 sm:w-8 sm:h-8 md:bottom-20 md:w-16 md:h-16 border-2 ${isDarkMode ? 'border-orange-400' : 'border-orange-600'} rounded-full animate-spin`} style={{ animationDuration: '25s' }}></div>
        </div>
      </div>

      {/* Carrousel principal avec effet parallax */}
      <motion.div 
        className="relative z-10 h-full flex items-center justify-center"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <div className="w-full max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
          <motion.div 
            className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 md:gap-8 lg:gap-12 items-center"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            
            {/* Contenu textuel à gauche */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className={`${themeClasses.text} space-y-8`}
            >
              <div className="space-y-2 sm:space-y-4">
                <motion.h1 
                  className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black leading-tight"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  {i18n.language === 'fr' ? (
                    <>
                      <span className="text-[#32CD32]">Découvrez</span> le{' '}
                      <span className="text-[#FF8C00]">Patrimoine</span>{' '}
                      <span className="text-[#8A2BE2]">Africain</span>
                    </>
                  ) : i18n.language === 'en' ? (
                    <>
                      <span className="text-[#32CD32]">Discover</span> African{' '}
                      <span className="text-[#FF8C00]">Heritage</span>
                    </>
                  ) : (
                    <>
                      <span className="text-[#32CD32]">Seetal</span> <span className="text-[#FF8C00]">Patrimoine</span>{' '}
                      <span className="text-[#8A2BE2]">Afrig</span>
                    </>
                  )}
                </motion.h1>
                
                <motion.p 
                  className={`text-lg sm:text-xl ${themeClasses.textSecondary} leading-relaxed`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  {i18n.language === 'fr' ? 
                    "Explorez les trésors culturels de l'Afrique à travers une expérience immersive et interactive" :
                    i18n.language === 'en' ?
                    "Explore Africa's cultural treasures through an immersive and interactive experience" :
                    "Seetal koom-koom yu melni ci Afrig ci jëfandikoo bu yees ak bu lëkk-lëkk"
                  }
                </motion.p>
              </div>

              {/* Boutons d'action - Ultra Responsive */}
              <motion.div 
                className="flex flex-col xs:flex-row gap-2 xs:gap-3 sm:gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                <button className="bg-gradient-to-r from-green-500 to-teal-600 text-white px-4 py-2 xs:px-6 xs:py-3 sm:px-8 sm:py-4 rounded-full font-semibold text-xs xs:text-sm sm:text-base hover:from-green-600 hover:to-teal-700 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center space-x-1 xs:space-x-2">
                  <Eye className="w-3 h-3 xs:w-4 xs:h-4 sm:w-5 sm:h-5" />
                  <span>
                    {i18n.language === 'fr' ? 'Explorer' : 
                     i18n.language === 'en' ? 'Explore' : 'Seetal'}
                  </span>
                </button>
                
                <button 
                  onClick={() => setIsAudioGuideOpen(true)}
                  className={`${isDarkMode 
                    ? 'bg-white/10 backdrop-blur-lg text-white hover:bg-white/20 border-white/20' 
                    : 'bg-gray-900/10 backdrop-blur-lg text-gray-900 hover:bg-gray-900/20 border-gray-900/20'
                  } px-4 py-2 xs:px-6 xs:py-3 sm:px-8 sm:py-4 rounded-full font-semibold text-xs xs:text-sm sm:text-base transition-all duration-300 border flex items-center justify-center space-x-1 xs:space-x-2`}
                >
                  <Volume2 className="w-3 h-3 xs:w-4 xs:h-4 sm:w-5 sm:h-5" />
                  <span>
                    {i18n.language === 'fr' ? 'Audio Guide' : 
                     i18n.language === 'en' ? 'Audio Guide' : 'Jëfandikoo Audio'}
                  </span>
                </button>
              </motion.div>
            </motion.div>

            {/* Carrousel d'images à droite */}
            <motion.div
              className="relative"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <div className="relative w-full h-48 xs:h-56 sm:h-64 md:h-80 lg:h-96 xl:h-[500px] rounded-xl xs:rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl group">
                {/* Effet de brillance au hover */}
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 via-transparent to-yellow-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -skew-x-12 -translate-x-full group-hover:translate-x-full"></div>
                
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentSlide}
                    initial={{ opacity: 0, scale: 1.1, rotateY: 15 }}
                    animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                    exit={{ opacity: 0, scale: 0.9, rotateY: -15 }}
                    transition={{ 
                      duration: 0.8, 
                      ease: "easeInOut",
                      type: "spring",
                      stiffness: 100
                    }}
                    className="absolute inset-0"
                  >
                    <img
                      src={currentOeuvre.image}
                      alt={currentOeuvre.titre[i18n.language as keyof typeof currentOeuvre.titre]}
                      className="w-full h-full object-cover"
                      style={{ 
                        imageRendering: 'auto',
                        maxWidth: '100%',
                        height: 'auto'
                      }}
                    />
                    
                    {/* Overlay avec informations */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent">
                      <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                        <h3 className="text-2xl font-bold mb-2">
                          {currentOeuvre.titre[i18n.language as keyof typeof currentOeuvre.titre]}
                        </h3>
                        <p className="text-gray-300 mb-2">
                          {currentOeuvre.description[i18n.language as keyof typeof currentOeuvre.description]}
                        </p>
                        <div className="flex justify-between text-sm text-gray-400">
                          <span>{currentOeuvre.periode[i18n.language as keyof typeof currentOeuvre.periode]}</span>
                          <span>{currentOeuvre.region[i18n.language as keyof typeof currentOeuvre.region]}</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>

                {/* Contrôles du carrousel avec animations */}
                <div className="absolute top-4 right-4 flex space-x-2">
                  <motion.button
                    onClick={togglePlay}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    whileTap={{ scale: 0.95 }}
                    className={`${isDarkMode 
                      ? 'bg-white/20 backdrop-blur-lg text-white hover:bg-white/30' 
                      : 'bg-gray-900/20 backdrop-blur-lg text-gray-900 hover:bg-gray-900/30'
                    } p-2 rounded-full transition-all duration-300`}
                  >
                    <motion.div
                      animate={{ rotate: isPlaying ? 0 : 360 }}
                      transition={{ duration: 0.5 }}
                    >
                      {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                    </motion.div>
                  </motion.button>
                  
                  <motion.button 
                    onClick={() => toggleLike(currentOeuvre.id)}
                    whileHover={{ scale: 1.1, rotate: -5 }}
                    whileTap={{ scale: 0.95 }}
                    className={`${isDarkMode 
                      ? isLiked 
                        ? 'bg-red-500/30 backdrop-blur-lg text-red-400 hover:bg-red-500/40' 
                        : 'bg-white/20 backdrop-blur-lg text-white hover:bg-white/30'
                      : isLiked
                        ? 'bg-red-500/30 backdrop-blur-lg text-red-600 hover:bg-red-500/40'
                        : 'bg-gray-900/20 backdrop-blur-lg text-gray-900 hover:bg-gray-900/30'
                    } p-2 rounded-full transition-all duration-300`}
                    title={isLiked ? 
                      (i18n.language === 'fr' ? 'Ne plus aimer' : 
                       i18n.language === 'en' ? 'Unlike' : 'Bëggul') :
                      (i18n.language === 'fr' ? 'Aimer cette œuvre' : 
                       i18n.language === 'en' ? 'Like this artwork' : 'Bëgg xëjju bi')
                    }
                  >
                    <motion.div
                      whileHover={{ scale: 1.2 }}
                      animate={{ 
                        scale: isLiked ? [1, 1.3, 1] : 1,
                        color: isLiked ? '#ef4444' : undefined
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
                    </motion.div>
                  </motion.button>
                  
                  <motion.button 
                    onClick={() => shareOeuvre(currentOeuvre)}
                    disabled={isSharing}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    whileTap={{ scale: 0.95 }}
                    className={`${isDarkMode 
                      ? isSharing
                        ? 'bg-blue-500/30 backdrop-blur-lg text-blue-400 cursor-not-allowed' 
                        : 'bg-white/20 backdrop-blur-lg text-white hover:bg-white/30'
                      : isSharing
                        ? 'bg-blue-500/30 backdrop-blur-lg text-blue-600 cursor-not-allowed'
                        : 'bg-gray-900/20 backdrop-blur-lg text-gray-900 hover:bg-gray-900/30'
                    } p-2 rounded-full transition-all duration-300`}
                    title={isSharing ? 
                      (i18n.language === 'fr' ? 'Partage en cours...' : 
                       i18n.language === 'en' ? 'Sharing...' : 'Ci ñu jëf...') :
                      (i18n.language === 'fr' ? 'Partager cette œuvre' : 
                       i18n.language === 'en' ? 'Share this artwork' : 'Jëfandikoo xëjju bi')
                    }
                  >
                    <motion.div
                      whileHover={{ scale: 1.2 }}
                      animate={{ 
                        scale: isSharing ? [1, 1.1, 1] : 1,
                        rotate: isSharing ? 360 : 0
                      }}
                      transition={{ 
                        duration: isSharing ? 1 : 0.3,
                        repeat: isSharing ? Infinity : 0
                      }}
                    >
                      <Share2 className="w-4 h-4" />
                    </motion.div>
                  </motion.button>
                </div>

                {/* Boutons navigation avec animations fluides - Ultra Responsive */}
                <motion.button
                  onClick={prevSlide}
                  whileHover={{ scale: 1.1, x: -5 }}
                  whileTap={{ scale: 0.95 }}
                  className={`absolute left-1 xs:left-2 sm:left-4 top-1/2 transform -translate-y-1/2 ${isDarkMode 
                    ? 'bg-white/20 backdrop-blur-lg text-white hover:bg-white/30' 
                    : 'bg-gray-900/20 backdrop-blur-lg text-gray-900 hover:bg-gray-900/30'
                  } p-1.5 xs:p-2 sm:p-3 rounded-full transition-all duration-300`}
                >
                  <motion.div
                    whileHover={{ scale: 1.2 }}
                    animate={{ scale: 1 }}
                  >
                    <ChevronLeft className="w-3 h-3 xs:w-4 xs:h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
                  </motion.div>
                </motion.button>
                
                <motion.button
                  onClick={nextSlide}
                  whileHover={{ scale: 1.1, x: 5 }}
                  whileTap={{ scale: 0.95 }}
                  className={`absolute right-1 xs:right-2 sm:right-4 top-1/2 transform -translate-y-1/2 ${isDarkMode 
                    ? 'bg-white/20 backdrop-blur-lg text-white hover:bg-white/30' 
                    : 'bg-gray-900/20 backdrop-blur-lg text-gray-900 hover:bg-gray-900/30'
                  } p-1.5 xs:p-2 sm:p-3 rounded-full transition-all duration-300`}
                >
                  <motion.div
                    whileHover={{ scale: 1.2 }}
                    animate={{ scale: 1 }}
                  >
                    <ChevronRight className="w-3 h-3 xs:w-4 xs:h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
                  </motion.div>
                </motion.button>
              </div>

              {/* Indicateurs de diapositives avec animations - Ultra Responsive */}
              <div className="flex justify-center space-x-1.5 xs:space-x-2 mt-3 xs:mt-4 sm:mt-6">
                {oeuvres.map((_, index) => (
                  <motion.button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    whileHover={{ scale: 1.3 }}
                    whileTap={{ scale: 0.9 }}
                    className={`w-1.5 h-1.5 xs:w-2 xs:h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${
                      index === currentSlide 
                        ? 'bg-yellow-400 scale-125' 
                        : isDarkMode 
                          ? 'bg-white/30 hover:bg-white/50'
                          : 'bg-gray-900/30 hover:bg-gray-900/50'
                    }`}
                  >
                    <motion.div
                      className="w-full h-full rounded-full"
                      animate={{
                        scale: index === currentSlide ? [1, 1.2, 1] : 1,
                        opacity: index === currentSlide ? [0.8, 1, 0.8] : 1
                      }}
                      transition={{
                        duration: 2,
                        repeat: index === currentSlide ? Infinity : 0,
                        ease: "easeInOut"
                      }}
                    />
                  </motion.button>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      {/* Effets visuels supplémentaires */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Particules flottantes */}
        {[...Array(20)].map((_, i) => (
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

      {/* AudioGuide Modal */}
      <AudioGuide
        oeuvre={currentOeuvre}
        isOpen={isAudioGuideOpen}
        onClose={() => setIsAudioGuideOpen(false)}
      />
    </div>
  );
};

export default Hero3D;
