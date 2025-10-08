import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe, Loader2, CheckCircle, AlertCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import translateAPI from '../services/translateAPI';

interface TraductionTempsReelProps {
  isOpen: boolean;
  onClose: () => void;
}

/**
 * Traduction en temps réel - Comme les navigateurs
 * Utilise l'API Google Translate pour une traduction instantanée
 */
const TraductionTempsReel: React.FC<TraductionTempsReelProps> = ({ isOpen, onClose }) => {
  const { i18n, t } = useTranslation();
  const [langueActuelle, setLangueActuelle] = useState(i18n.language);
  const [langueCible, setLangueCible] = useState('en');
  const [isTraduction, setIsTraduction] = useState(false);
  const [textesTraduits, setTextesTraduits] = useState<{[key: string]: string}>({});
  const [erreur, setErreur] = useState<string | null>(null);

  const langues = [
    { code: 'fr', nom: 'Français', drapeau: '🇫🇷' },
    { code: 'en', nom: 'English', drapeau: '🇬🇧' },
    { code: 'wo', nom: 'Wolof', drapeau: '🇸🇳' },
    { code: 'es', nom: 'Español', drapeau: '🇪🇸' },
    { code: 'de', nom: 'Deutsch', drapeau: '🇩🇪' },
    { code: 'ar', nom: 'العربية', drapeau: '🇸🇦' }
  ];

  // Textes à traduire - Utilise les textes réels de la page via i18n
  const textesATraduire = {
    titre: t('accueil.description'),
    boutonCollections: t('accueil.boutonCollections'),
    boutonQR: t('accueil.boutonQR'),
    visiteurs: t('accueil.statistiques.visiteurs'),
    oeuvres: t('accueil.statistiques.oeuvres'),
    parcours: t('accueil.statistiques.parcours'),
    sousTitre: "Une expérience immersive qui redéfinit la découverte culturelle"
  };

  // Synchroniser la langue actuelle avec i18n
  useEffect(() => {
    setLangueActuelle(i18n.language);
  }, [i18n.language]);

  // Traduction automatique au changement de langue
  useEffect(() => {
    if (isOpen && langueCible !== langueActuelle) {
      traduireTousLesTextes();
    }
  }, [langueCible, isOpen]);

  const traduireTousLesTextes = async () => {
    setIsTraduction(true);
    setErreur(null);
    
    try {
      const textes = Object.values(textesATraduire);
      const resultats = await translateAPI.traduireTextes(textes, langueCible, langueActuelle);
      
      const traductions: {[key: string]: string} = {};
      Object.keys(textesATraduire).forEach((cle, index) => {
        traductions[cle] = resultats[index]?.texteTraduit || textesATraduire[cle as keyof typeof textesATraduire];
      });
      
      setTextesTraduits(traductions);
    } catch (error) {
      setErreur('Erreur de traduction. Vérifiez votre connexion internet.');
      console.error('Erreur traduction:', error);
    } finally {
      setIsTraduction(false);
    }
  };

  const changerLangue = (code: string) => {
    setLangueCible(code);
  };

  // Fonction pour appliquer la traduction à la page réelle
  const appliquerTraduction = () => {
    if (langueCible === langueActuelle) {
      onClose();
      return; // Pas de changement si la langue est la même
    }

    // Changer la langue via i18n - cela va automatiquement traduire tous les composants
    i18n.changeLanguage(langueCible);
    
    // Sauvegarder la préférence de langue
    localStorage.setItem('langue-preference', langueCible);
    
    // Mettre à jour l'état local
    setLangueActuelle(langueCible);

    // Feedback visuel
    if (navigator.vibrate) {
      navigator.vibrate(100);
    }

    // Fermer l'interface
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/90 backdrop-blur-lg z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          className="bg-gradient-to-br from-gray-900 to-black rounded-3xl p-4 sm:p-6 lg:p-8 max-w-6xl w-full mx-4 sm:mx-6 lg:mx-8 border border-white/20 shadow-2xl max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header - Responsive */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 sm:mb-8 space-y-4 sm:space-y-0">
            <div className="flex items-center space-x-3 sm:space-x-4">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-green-500 to-blue-600 rounded-2xl flex items-center justify-center flex-shrink-0">
                <Globe className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
              </div>
              <div className="min-w-0">
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white leading-tight">Traduction Temps Réel</h2>
                <p className="text-gray-400 text-xs sm:text-sm">Comme Chrome/Edge - Traduction instantanée</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 sm:p-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors self-end sm:self-auto"
            >
              ✕
            </button>
          </div>

          {/* Sélecteur de langue - Responsive */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 mb-6 sm:mb-8">
            {langues.map((langue) => (
              <button
                key={langue.code}
                onClick={() => changerLangue(langue.code)}
                className={`p-3 sm:p-4 rounded-xl sm:rounded-2xl border-2 transition-all duration-300 ${
                  langueCible === langue.code
                    ? 'border-green-500 bg-green-500/20 text-green-300'
                    : 'border-white/20 bg-white/5 text-white hover:border-white/40'
                }`}
              >
                <div className="text-2xl sm:text-3xl lg:text-4xl mb-1 sm:mb-2">{langue.drapeau}</div>
                <div className="font-semibold text-xs sm:text-sm leading-tight">{langue.nom}</div>
                {langueCible === langue.code && (
                  <div className="text-green-400 text-xs mt-1">✓</div>
                )}
              </button>
            ))}
          </div>

          {/* Aperçu des traductions - Responsive */}
          <div className="bg-white/5 rounded-2xl p-4 sm:p-6 border border-white/10 mb-4 sm:mb-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 space-y-2 sm:space-y-0">
              <h3 className="text-base sm:text-lg font-semibold text-white">Aperçu des traductions :</h3>
              {isTraduction && (
                <div className="flex items-center space-x-2 text-blue-400">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span className="text-xs sm:text-sm">Traduction en cours...</span>
                </div>
              )}
            </div>
            
            {erreur && (
              <div className="flex items-center space-x-2 text-red-400 mb-4">
                <AlertCircle className="w-4 h-4" />
                <span className="text-xs sm:text-sm">{erreur}</span>
              </div>
            )}

            <div className="space-y-4">
              <div>
                <label className="text-xs sm:text-sm text-gray-400 mb-2 block">Titre principal :</label>
                <div className="bg-gray-800/50 rounded-xl p-3 sm:p-4 border border-gray-700">
                  <p className="text-white font-medium text-sm sm:text-base lg:text-lg leading-relaxed">
                    {textesTraduits.titre || textesATraduire.titre}
                  </p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div>
                  <label className="text-xs sm:text-sm text-gray-400 mb-2 block">Bouton Collections :</label>
                  <div className="bg-gray-800/50 rounded-lg p-3 border border-gray-700">
                    <p className="text-white text-sm sm:text-base">{textesTraduits.boutonCollections || textesATraduire.boutonCollections}</p>
                  </div>
                </div>
                <div>
                  <label className="text-xs sm:text-sm text-gray-400 mb-2 block">Bouton QR :</label>
                  <div className="bg-gray-800/50 rounded-lg p-3 border border-gray-700">
                    <p className="text-white text-sm sm:text-base">{textesTraduits.boutonQR || textesATraduire.boutonQR}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Actions - Responsive */}
          <div className="flex flex-col sm:flex-row justify-end space-y-3 sm:space-y-0 sm:space-x-4">
            <button
              onClick={onClose}
              className="w-full sm:w-auto px-4 sm:px-6 py-3 bg-white/10 text-white rounded-xl hover:bg-white/20 transition-colors text-sm sm:text-base"
            >
              Annuler
            </button>
            <button
              onClick={appliquerTraduction}
              className="w-full sm:w-auto px-4 sm:px-6 py-3 bg-gradient-to-r from-green-500 to-blue-600 text-white rounded-xl hover:from-green-600 hover:to-blue-700 transition-all font-semibold flex items-center justify-center space-x-2 text-sm sm:text-base"
            >
              <CheckCircle className="w-4 h-4" />
              <span>Appliquer la traduction</span>
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default TraductionTempsReel;
