import React from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useTheme } from './ThemeProvider';
import { ArrowLeft, Heart, Share2, Volume2, Eye, Calendar, MapPin } from 'lucide-react';

/**
 * Page détaillée d'une œuvre spécifique
 * Affichage immersif avec informations complètes
 */
const PageOeuvre: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { t, i18n } = useTranslation();
  const { isDarkMode, getThemeClasses } = useTheme();
  const themeClasses = getThemeClasses();

  // Données des œuvres (même structure que Hero3D)
  const oeuvres = [
    {
      id: 1,
      image: "/images/masque-dan-fullhd.svg",
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
        wo: "Afrig ci Sowwu"
      },
      details: {
        fr: "Ce masque Dan représente l'esprit de la forêt et était utilisé lors des cérémonies d'initiation. Il symbolise la connexion entre le monde visible et invisible.",
        en: "This Dan mask represents the spirit of the forest and was used during initiation ceremonies. It symbolizes the connection between the visible and invisible worlds.",
        wo: "Këru Dan bii mooy melal ci xel ci kër gi te dañu koy jëfandikoo ci ñaari xeet yi. Mooy melal ci xaral ci àdduna bu gëm ak bu gëmul."
      }
    },
    {
      id: 2,
      image: "/images/masque-baoule-fullhd.svg",
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
      },
      details: {
        fr: "Cette statue royale Ashanti en bronze représente la puissance et la sagesse du roi. Elle était placée dans le palais royal comme symbole d'autorité.",
        en: "This royal Ashanti bronze statue represents the power and wisdom of the king. It was placed in the royal palace as a symbol of authority.",
        wo: "Xëjju bu melni ci bronz Ashanti bii mooy melal ci doole ak xam-xam ci buur bi. Dañu koy jëfandikoo ci kër buur bi melal ci doole."
      }
    },
    {
      id: 3,
      image: "/images/masque-dan-fullhd.svg",
      titre: {
        fr: "Tête Ife",
        en: "Ife Head",
        wo: "Bopp Ife"
      },
      description: {
        fr: "Sculpture en terre cuite Ife, Nigeria",
        en: "Ife terracotta sculpture, Nigeria",
        wo: "Xëjju ci terracotta Ife, Nigeria"
      },
      periode: {
        fr: "XIIe-XVe siècle",
        en: "12th-15th century",
        wo: "Xarnu fukk ak ñaar - fukk ak juroom"
      },
      region: {
        fr: "Nigeria",
        en: "Nigeria",
        wo: "Nigeria"
      },
      details: {
        fr: "Cette tête Ife en terre cuite est considérée comme l'une des plus belles sculptures africaines. Elle témoigne du raffinement artistique de la civilisation Ife.",
        en: "This Ife terracotta head is considered one of the most beautiful African sculptures. It testifies to the artistic refinement of Ife civilization.",
        wo: "Bopp Ife bii ci terracotta mooy ci ñu gëm ne mooy ci xëjju yi rafet ci Afrig. Mooy melal ci xel ci jëfandikoo ci xeet Ife."
      }
    },
    {
      id: 4,
      image: "/images/masque-baoule-fullhd.svg",
      titre: {
        fr: "Reliquaire Fang",
        en: "Fang Reliquary",
        wo: "Kërëg Fang"
      },
      description: {
        fr: "Figure de reliquaire Fang, Gabon",
        en: "Fang reliquary figure, Gabon",
        wo: "Xëjju ci kërëg Fang, Gabon"
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
      },
      details: {
        fr: "Ce reliquaire Fang contient les ossements des ancêtres et était utilisé lors des cérémonies religieuses. Il symbolise la continuité entre les vivants et les morts.",
        en: "This Fang reliquary contains the bones of ancestors and was used during religious ceremonies. It symbolizes continuity between the living and the dead.",
        wo: "Kërëg Fang bii mooy am ci yax yi ci maam yi te dañu koy jëfandikoo ci ñaari yoon yi. Mooy melal ci xaral ci àdduna bu dund ak bu dee."
      }
    }
  ];

  // Trouver l'œuvre par ID
  const oeuvre = oeuvres.find(o => o.id === parseInt(id || '0'));

  if (!oeuvre) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${themeClasses.background}`}>
        <div className="text-center">
          <h1 className={`text-4xl font-bold mb-4 ${themeClasses.text}`}>
            {i18n.language === 'fr' ? 'Œuvre non trouvée' : 
             i18n.language === 'en' ? 'Artwork not found' : 'Xëjju bi gisul'}
          </h1>
          <p className={`text-lg ${themeClasses.textSecondary}`}>
            {i18n.language === 'fr' ? 'Cette œuvre n\'existe pas.' : 
             i18n.language === 'en' ? 'This artwork does not exist.' : 'Xëjju bii amul.'}
          </p>
        </div>
      </div>
    );
  }

  const currentLanguage = i18n.language as keyof typeof oeuvre.titre;

  return (
    <div className={`min-h-screen ${themeClasses.background}`}>
      {/* Header avec navigation */}
      <div className="sticky top-0 z-50 bg-black/50 backdrop-blur-lg border-b border-white/10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <motion.button
              onClick={() => window.history.back()}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`flex items-center space-x-2 px-4 py-2 rounded-full ${themeClasses.text} hover:bg-white/10 transition-colors`}
            >
              <ArrowLeft className="w-5 h-5" />
              <span>
                {i18n.language === 'fr' ? 'Retour' : 
                 i18n.language === 'en' ? 'Back' : 'Dëgg'}
              </span>
            </motion.button>

            <div className="flex space-x-2">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className={`p-2 rounded-full ${isDarkMode ? 'bg-white/20' : 'bg-gray-900/20'} ${themeClasses.text} hover:bg-white/30 transition-colors`}
              >
                <Heart className="w-5 h-5" />
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className={`p-2 rounded-full ${isDarkMode ? 'bg-white/20' : 'bg-gray-900/20'} ${themeClasses.text} hover:bg-white/30 transition-colors`}
              >
                <Share2 className="w-5 h-5" />
              </motion.button>
            </div>
          </div>
        </div>
      </div>

      {/* Contenu principal */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          
          {/* Image de l'œuvre */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative w-full h-96 lg:h-[600px] rounded-2xl overflow-hidden shadow-2xl">
              <img
                src={oeuvre.image}
                alt={oeuvre.titre[currentLanguage]}
                className="w-full h-full object-cover"
              />
              
              {/* Overlay avec boutons d'action */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent">
                <div className="absolute bottom-4 right-4 flex space-x-2">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="p-3 bg-white/20 backdrop-blur-lg rounded-full text-white hover:bg-white/30 transition-colors"
                  >
                    <Volume2 className="w-5 h-5" />
                  </motion.button>
                  
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="p-3 bg-white/20 backdrop-blur-lg rounded-full text-white hover:bg-white/30 transition-colors"
                  >
                    <Eye className="w-5 h-5" />
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Informations de l'œuvre */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className={`${themeClasses.text} space-y-6`}
          >
            <div>
              <h1 className="text-4xl lg:text-5xl font-black mb-4">
                {oeuvre.titre[currentLanguage]}
              </h1>
              <p className={`text-xl ${themeClasses.textSecondary} mb-6`}>
                {oeuvre.description[currentLanguage]}
              </p>
            </div>

            {/* Métadonnées */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className={`p-4 rounded-xl ${isDarkMode ? 'bg-white/10' : 'bg-gray-100/50'} backdrop-blur-lg`}>
                <div className="flex items-center space-x-3 mb-2">
                  <Calendar className={`w-5 h-5 ${themeClasses.textSecondary}`} />
                  <span className={`font-semibold ${themeClasses.text}`}>
                    {i18n.language === 'fr' ? 'Période' : 
                     i18n.language === 'en' ? 'Period' : 'Xarnu'}
                  </span>
                </div>
                <p className={`${themeClasses.textSecondary}`}>
                  {oeuvre.periode[currentLanguage]}
                </p>
              </div>

              <div className={`p-4 rounded-xl ${isDarkMode ? 'bg-white/10' : 'bg-gray-100/50'} backdrop-blur-lg`}>
                <div className="flex items-center space-x-3 mb-2">
                  <MapPin className={`w-5 h-5 ${themeClasses.textSecondary}`} />
                  <span className={`font-semibold ${themeClasses.text}`}>
                    {i18n.language === 'fr' ? 'Région' : 
                     i18n.language === 'en' ? 'Region' : 'Diiwaan'}
                  </span>
                </div>
                <p className={`${themeClasses.textSecondary}`}>
                  {oeuvre.region[currentLanguage]}
                </p>
              </div>
            </div>

            {/* Description détaillée */}
            <div className={`p-6 rounded-xl ${isDarkMode ? 'bg-white/10' : 'bg-gray-100/50'} backdrop-blur-lg`}>
              <h3 className={`text-xl font-bold mb-3 ${themeClasses.text}`}>
                {i18n.language === 'fr' ? 'Description détaillée' : 
                 i18n.language === 'en' ? 'Detailed description' : 'Melal ci yëngu'}
              </h3>
              <p className={`${themeClasses.textSecondary} leading-relaxed`}>
                {oeuvre.details[currentLanguage]}
              </p>
            </div>

            {/* Boutons d'action */}
            <div className="flex flex-col sm:flex-row gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`flex-1 px-6 py-4 rounded-xl font-semibold transition-all duration-300 ${
                  isDarkMode 
                    ? 'bg-green-600 hover:bg-green-700 text-white' 
                    : 'bg-green-500 hover:bg-green-600 text-white'
                }`}
              >
                {i18n.language === 'fr' ? 'Audio Guide' : 
                 i18n.language === 'en' ? 'Audio Guide' : 'Jëfandikoo Audio'}
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`flex-1 px-6 py-4 rounded-xl font-semibold transition-all duration-300 ${
                  isDarkMode 
                    ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                    : 'bg-blue-500 hover:bg-blue-600 text-white'
                }`}
              >
                {i18n.language === 'fr' ? 'Réalité Augmentée' : 
                 i18n.language === 'en' ? 'Augmented Reality' : 'Dëgg-dëgg Augmentée'}
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default PageOeuvre;
