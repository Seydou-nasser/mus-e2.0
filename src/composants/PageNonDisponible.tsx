import React from 'react';
import { motion } from 'framer-motion';
import { Wrench, Zap, Target, Layers, Award, TrendingUp, Globe, Maximize2, Play, Pause, RotateCcw, ChevronRight, Camera, QrCode, Palette, Map, Users, Star, Heart, Share2, Download, Eye, Info, ExternalLink, Settings, Phone, AlertCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { utiliserContexteMusee } from '../contexte/ContexteMusee';
import { useTheme } from './ThemeProvider';

const PageNonDisponible: React.FC = () => {
  const { etat, dispatch } = utiliserContexteMusee();
  const { t } = useTranslation();
  const { getThemeClasses } = useTheme();
  const themeClasses = getThemeClasses();

  return (
    <div className={`min-h-screen ${themeClasses.background} flex items-center justify-center`}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center p-8"
      >
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-2xl max-w-md mx-auto">
          <div className="text-6xl mb-4">🚧</div>
          <h1 className={`text-2xl font-bold ${themeClasses.text} mb-4`}>
            Page en cours de développement
          </h1>
          <p className={`${themeClasses.textSecondary} mb-6`}>
            Cette fonctionnalité sera bientôt disponible !
          </p>
          <button className="bg-amber-600 hover:bg-amber-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors">
            Retour à l'accueil
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default PageNonDisponible;
