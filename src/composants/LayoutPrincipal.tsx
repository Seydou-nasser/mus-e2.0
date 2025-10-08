import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from './ThemeProvider';
import { useContexteIA } from './ContexteIA';
import { useTranslation } from 'react-i18next';
import TraductionTempsReel from './TraductionTempsReel';
import { 
  Home, 
  Palette, 
  Map, 
  Eye, 
  Info, 
  Globe, 
  Bell,
  Menu,
  X,
  ChevronDown,
  Sparkles,
  Sun,
  Moon,
  Linkedin,
  Youtube
} from 'lucide-react';
import IconeIA from './IconeIA';

/**
 * Layout principal mode sombre - Design exact selon spécifications
 * Navigation horizontale RESPONSIVE avec logo vert et fond sombre
 * DESIGN MULTI-LIGNES pour le nom de l'app (style musée)
 * Navigation parfaitement alignée sur desktop
 */
interface LayoutPrincipalProps {
  children: React.ReactNode;
}

const LayoutPrincipal: React.FC<LayoutPrincipalProps> = ({ children }) => {
  const { isDarkMode, toggleTheme, getThemeClasses } = useTheme();
  const themeClasses = getThemeClasses();
  const { i18n, t } = useTranslation();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLangueOpen, setIsLangueOpen] = useState(false);
  const [isTraductionOpen, setIsTraductionOpen] = useState(false);
  const { isIAEnLigne, isChatbotOpen, setIsChatbotOpen, setLastClickSource } = useContexteIA();

  // Gestion du clic sur le bouton header
  const handleIAClick = () => {
    setLastClickSource('header');
    setIsChatbotOpen(!isChatbotOpen);
  };

  const langues = [
    { code: 'fr', nom: 'Français', drapeau: '🇫🇷' },
    { code: 'en', nom: 'English', drapeau: '🇬🇧' },
    { code: 'wo', nom: 'Wolof', drapeau: '🇸🇳' }
  ];

  // Fonction pour changer la langue
  const changerLangue = (codeLangue: string) => {
    i18n.changeLanguage(codeLangue);
    setIsLangueOpen(false);
    
    // Sauvegarder la préférence
    localStorage.setItem('langue-preference', codeLangue);
    
    // Forcer le re-render
    // setForceUpdate(prev => prev + 1);
    
    // Feedback visuel
    if (navigator.vibrate) {
      navigator.vibrate(50); // Vibration courte
    }
  };

  // Écouter les changements de langue
  useEffect(() => {
    const handleLanguageChange = () => {
      // setForceUpdate(prev => prev + 1);
    };

    i18n.on('languageChanged', handleLanguageChange);
    
    return () => {
      i18n.off('languageChanged', handleLanguageChange);
    };
  }, [i18n]);

  const navItems = [
    { name: t('navigation.accueil'), path: '/', icon: Home },
    { name: t('navigation.collections'), path: '/collections', icon: Palette },
    { name: t('navigation.parcours'), path: '/parcours', icon: Map },
    { name: t('navigation.ar'), path: '/realite-augmentee', icon: Eye },
    { name: t('navigation.aPropos'), path: '/a-propos', icon: Info },
  ];

  return (
    <div className={`min-h-screen ${themeClasses.background}`}>
      {/* En-tête avec design adaptatif et glassmorphism ULTRA RESPONSIVE */}
      <header className="bg-white/20 backdrop-blur-xl border-b border-white/30 sticky top-0 z-50 shadow-lg">
        <div className="container mx-auto px-2 xs:px-3 sm:px-4 md:px-6 py-2 xs:py-3 sm:py-4">
          <div className="flex items-center justify-between">
            {/* Logo et Titre DESIGN MULTI-LIGNES (Gauche) - Ultra Responsive */}
            <motion.div 
              className="flex items-center space-x-1.5 xs:space-x-2 sm:space-x-3 md:space-x-4"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="w-8 h-8 xs:w-9 xs:h-9 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-green-600 rounded-lg xs:rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-sm xs:text-base sm:text-lg md:text-2xl">M</span>
              </div>
              <div className="flex flex-col">
                {/* Design multi-lignes comme dans l'image - Ultra Responsive */}
                <div className="flex flex-col leading-tight">
                  <span className={`text-xs xs:text-sm sm:text-base md:text-lg font-bold ${themeClasses.text}`}>
                    {t('header.musee')}
                  </span>
                  <span className={`text-xs xs:text-sm sm:text-base md:text-lg font-bold ${themeClasses.text}`}>
                    {t('header.civilisations')}
                  </span>
                  <span className={`text-xs xs:text-sm sm:text-base md:text-lg font-bold ${themeClasses.text}`}>
                    {t('header.noires')}
                  </span>
                </div>
                {/* Tagline avec icône sparkle - Ultra Responsive */}
                <div className="flex items-center space-x-0.5 xs:space-x-1 mt-0.5 xs:mt-1">
                  <Sparkles className={`w-2.5 h-2.5 xs:w-3 xs:h-3 sm:w-4 sm:h-4 ${themeClasses.text}`} />
                  <span className="text-xs xs:text-sm text-green-400 font-medium">
                    {t('header.experience')}
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Navigation Principale (Centre) - Desktop seulement - PARFAITEMENT ALIGNÉE */}
            <nav className="hidden lg:flex items-center space-x-3 xl:space-x-4">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`flex items-center space-x-2 px-3 xl:px-4 py-2 rounded-full transition-all duration-300 text-sm xl:text-base whitespace-nowrap ${
                    location.pathname === item.path 
                      ? 'bg-[#28A745] text-white shadow-lg' 
                      : `${themeClasses.text} hover:bg-[#28A745] hover:text-white`
                  }`}
                >
                  <item.icon className="w-4 h-4 flex-shrink-0" />
                  <span className="font-medium">{item.name}</span>
                </Link>
              ))}
            </nav>

            {/* Actions (Droite) - Responsive */}
            <div className="flex items-center space-x-2 sm:space-x-4">
              {/* Sélecteur de langue - Responsive */}
              <div className="relative">
                <button
                  onClick={() => setIsLangueOpen(!isLangueOpen)}
                  className={`flex items-center space-x-0.5 xs:space-x-1 sm:space-x-2 px-1.5 xs:px-2 sm:px-4 py-1.5 xs:py-2 rounded-full bg-white/10 ${themeClasses.text} hover:bg-white/20 transition-colors text-xs xs:text-sm`}
                >
                  <Globe className="w-2.5 h-2.5 xs:w-3 xs:h-3 sm:w-4 sm:h-4" />
                    <span className="hidden xs:inline">
                      {langues.find(l => l.code === i18n.language)?.nom || 'Français'}
                    </span>
                    <span className="xs:hidden">
                      {langues.find(l => l.code === i18n.language)?.code.toUpperCase() || 'FR'}
                    </span>
                  <ChevronDown className="w-2.5 h-2.5 xs:w-3 xs:h-3 sm:w-4 sm:h-4" />
                </button>
                
                <AnimatePresence>
                  {isLangueOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute top-full right-0 mt-2 bg-slate-800/95 backdrop-blur-xl rounded-xl shadow-xl border border-white/20 overflow-hidden z-50 min-w-[140px]"
                    >
                      {langues.map((langue) => (
                        <button
                          key={langue.code}
                          className={`w-full px-4 py-3 text-left transition-colors flex items-center space-x-3 ${
                            i18n.language === langue.code 
                              ? 'bg-green-600/20 text-green-300' 
                              : 'hover:bg-white/10 text-white'
                          }`}
                          onClick={() => changerLangue(langue.code)}
                        >
                          <span className="text-lg">{langue.drapeau}</span>
                          <span className="font-medium text-sm">{langue.nom}</span>
                          {i18n.language === langue.code && (
                            <span className="ml-auto text-green-400">✓</span>
                          )}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Bouton Thème - Mode Visite Nocturne */}
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={toggleTheme}
                className={`p-1 xs:p-1.5 sm:p-2 rounded-full bg-white/10 ${themeClasses.text} hover:bg-white/20 transition-colors relative overflow-hidden`}
                aria-label={`Basculer vers le mode ${isDarkMode ? 'clair' : 'sombre'}`}
              >
                <motion.div
                  key={isDarkMode ? 'dark' : 'light'}
                  initial={{ rotate: isDarkMode ? 0 : 180, opacity: 0 }}
                  animate={{ rotate: isDarkMode ? 180 : 0, opacity: 1 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="w-2.5 h-2.5 xs:w-3 xs:h-3 sm:w-4 sm:h-4 md:w-5 md:h-5"
                >
                  {isDarkMode ? <Sun className="w-full h-full" /> : <Moon className="w-full h-full" />}
                </motion.div>
                
                {/* Effet de brillance dorée */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 to-orange-500/20 rounded-full"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: isDarkMode ? 1.2 : 0, opacity: isDarkMode ? 0.3 : 0 }}
                  transition={{ duration: 0.5 }}
                />
              </motion.button>

              {/* Bouton Traduction - Ultra Responsive */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsTraductionOpen(true)}
                className={`p-1.5 xs:p-2 rounded-full bg-white/10 ${themeClasses.text} hover:bg-white/20 transition-colors relative`}
                aria-label={t('traduction.ouvrir')}
              >
                <Globe className="w-3 h-3 xs:w-4 xs:h-4 sm:w-5 sm:h-5" />
                <div className="absolute -top-0.5 -right-0.5 xs:-top-1 xs:-right-1 w-2 h-2 xs:w-3 xs:h-3 bg-green-500 rounded-full animate-pulse"></div>
              </motion.button>

              {/* Assistant IA - Accessible dans le header */}
              <motion.button 
                onClick={handleIAClick}
                className={`p-1 xs:p-1.5 sm:p-2 rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 ${themeClasses.text} hover:from-purple-500/30 hover:to-pink-500/30 transition-all duration-300 relative overflow-hidden group`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                title={`Assistant IA - ${isIAEnLigne ? 'En ligne et disponible' : 'Hors ligne'}`}
              >
                <IconeIA 
                  className="w-2.5 h-2.5 xs:w-3 xs:h-3 sm:w-4 sm:h-4 md:w-5 md:h-5" 
                  isDarkMode={isDarkMode}
                  isActive={true}
                />
                {/* Badge de notification - État de l'IA */}
                <motion.div
                  className={`absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full ${
                    isIAEnLigne ? 'bg-green-500' : 'bg-red-500'
                  }`}
                  animate={{
                    scale: [1, 1.3, 1],
                    opacity: [0.8, 1, 0.8],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                  }}
                />
              </motion.button>

              {/* Notifications - Ultra Responsive */}
              <button className={`p-1.5 xs:p-2 rounded-full bg-white/10 ${themeClasses.text} hover:bg-white/20 transition-colors`}>
                <Bell className="w-3 h-3 xs:w-4 xs:h-4 sm:w-5 sm:h-5" />
              </button>
              
              {/* Menu Mobile - Toujours visible sur mobile */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className={`lg:hidden p-2 rounded-full bg-white/10 ${themeClasses.text} hover:bg-white/20 transition-colors`}
              >
                {isMenuOpen ? <X className="w-5 h-5 sm:w-6 sm:h-6" /> : <Menu className="w-5 h-5 sm:w-6 sm:h-6" />}
              </button>
            </div>
          </div>

          {/* Menu Mobile RESPONSIVE avec toutes les options */}
          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="lg:hidden mt-4 pb-4 border-t border-white/20"
              >
                <nav className="flex flex-col space-y-2 pt-4">
                  {navItems.map((item) => (
                    <Link
                      key={item.name}
                      to={item.path}
                      className={`flex items-center space-x-3 py-3 px-4 rounded-xl transition-colors text-base ${
                        location.pathname === item.path
                          ? 'bg-[#28A745] text-white shadow-lg'
                          : `${themeClasses.text} hover:bg-white/10`
                      }`}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <item.icon className="w-5 h-5" />
                      <span className="font-medium">{item.name}</span>
                    </Link>
                  ))}
                  
                  {/* Séparateur */}
                  <div className="border-t border-white/20 my-2"></div>
                  
                  {/* Sélecteur de langue mobile */}
                  <div className="px-4 py-2">
                    <p className={`${themeClasses.textSecondary} text-sm mb-2`}>Langue</p>
                    <div className="flex space-x-2">
                      {langues.map((langue) => (
                        <button
                          key={langue.code}
                          onClick={() => {
                            changerLangue(langue.code);
                            setIsMenuOpen(false);
                          }}
                          className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors text-sm ${
                            i18n.language === langue.code 
                              ? 'bg-green-600/20 text-green-300 border border-green-500/30' 
                              : 'bg-white/10 text-white hover:bg-white/20'
                          }`}
                        >
                          <span className="text-lg">{langue.drapeau}</span>
                          <span>{langue.nom}</span>
                          {i18n.language === langue.code && (
                            <span className="text-green-400">✓</span>
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                </nav>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </header>

      {/* Contenu principal */}
      <main className="flex-1">
        {children}
      </main>

      {/* Pied de page adaptatif avec glassmorphism */}
      <footer className={`py-8 sm:py-12 ${themeClasses.background} border-t ${
        isDarkMode 
          ? 'border-gray-700' 
          : 'border-gray-300'
      }`}>
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 sm:gap-8">
            {/* Logo et description */}
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-600 rounded-xl flex items-center justify-center">
                  <span className="text-white font-bold text-lg sm:text-xl">M</span>
                </div>
                <div>
                  <h3 className={`text-lg sm:text-xl font-bold ${themeClasses.text}`}>{t('footer.titre')}</h3>
                  <p className="text-green-400 text-xs sm:text-sm">{t('footer.sousTitre')}</p>
                </div>
              </div>
              <p className={`mb-4 sm:mb-6 max-w-md text-sm sm:text-base ${themeClasses.textSecondary}`}>
{t('footer.description')}
              </p>
              <div className="flex space-x-4">
                {/* LinkedIn - Design adaptatif avec couleurs de marque */}
                <motion.button 
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className={`p-3 sm:p-4 rounded-xl transition-all duration-300 ${
                    isDarkMode 
                      ? 'bg-blue-600/20 hover:bg-blue-600/30 border border-blue-500/30' 
                      : 'bg-blue-50 hover:bg-blue-100 border border-blue-200'
                  }`}
                  title="Suivez-nous sur LinkedIn"
                >
                  <Linkedin className={`w-5 h-5 sm:w-6 sm:h-6 ${
                    isDarkMode ? 'text-blue-400' : 'text-blue-600'
                  }`} />
                </motion.button>
                
                {/* YouTube - Design adaptatif avec couleurs de marque */}
                <motion.button 
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className={`p-3 sm:p-4 rounded-xl transition-all duration-300 ${
                    isDarkMode 
                      ? 'bg-red-600/20 hover:bg-red-600/30 border border-red-500/30' 
                      : 'bg-red-50 hover:bg-red-100 border border-red-200'
                  }`}
                  title="Abonnez-vous à notre chaîne YouTube"
                >
                  <Youtube className={`w-5 h-5 sm:w-6 sm:h-6 ${
                    isDarkMode ? 'text-red-400' : 'text-red-600'
                  }`} />
                </motion.button>
              </div>
            </div>

            {/* Liens rapides */}
            <div>
              <h4 className={`text-base sm:text-lg font-semibold mb-3 sm:mb-4 ${themeClasses.text}`}>{t('footer.liensRapides')}</h4>
              <ul className="space-y-2 sm:space-y-3">
                <li><a href="/" className={`hover:text-white transition-colors text-sm sm:text-base ${themeClasses.textSecondary}`}>{t('navigation.accueil')}</a></li>
                <li><a href="/collections" className={`hover:text-white transition-colors text-sm sm:text-base ${themeClasses.textSecondary}`}>{t('navigation.collections')}</a></li>
                <li><a href="/parcours" className={`hover:text-white transition-colors text-sm sm:text-base ${themeClasses.textSecondary}`}>{t('navigation.parcours')}</a></li>
                <li><a href="/realite-augmentee" className={`hover:text-white transition-colors text-sm sm:text-base ${themeClasses.textSecondary}`}>{t('navigation.ar')}</a></li>
                <li><a href="/a-propos" className={`hover:text-white transition-colors text-sm sm:text-base ${themeClasses.textSecondary}`}>{t('navigation.aPropos')}</a></li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className={`text-base sm:text-lg font-semibold mb-3 sm:mb-4 ${themeClasses.text}`}>{t('footer.contact')}</h4>
              <ul className={`space-y-2 sm:space-y-3 text-sm sm:text-base ${themeClasses.textSecondary}`}>
                <li>{t('footer.lieu')}</li>
                <li>{t('footer.telephone')}</li>
                <li>{t('footer.email')}</li>
              </ul>
            </div>
          </div>

          <div className={`border-t mt-6 sm:mt-8 pt-6 sm:pt-8 flex flex-col md:flex-row justify-between items-center ${
            isDarkMode ? 'border-gray-700' : 'border-gray-300'
          }`}>
            <p className={`text-xs sm:text-sm ${themeClasses.textSecondary}`}>
              {t('footer.copyright')}
            </p>
            <p className={`text-xs sm:text-sm flex items-center flex-wrap space-x-1 mt-2 md:mt-0 ${themeClasses.textSecondary}`}>
              <span className="whitespace-nowrap">{t('footer.faitAvec')}</span>
              <span className="text-red-400">❤️</span>
              <span className="whitespace-nowrap">{t('footer.pourAfrique')}</span>
            </p>
          </div>
        </div>
      </footer>

      {/* Traduction Temps Réel - Comme les navigateurs */}
      <TraductionTempsReel
        isOpen={isTraductionOpen}
        onClose={() => setIsTraductionOpen(false)}
      />

    </div>
  );
};

export default LayoutPrincipal;