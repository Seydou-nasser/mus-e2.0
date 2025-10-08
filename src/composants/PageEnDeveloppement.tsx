import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useTheme } from './ThemeProvider';
import { 
  Clock, 
  CheckCircle, 
  PlayCircle, 
  Calendar,
  Bell,
  ArrowRight,
  Sparkles,
  Zap,
  Target,
  Users,
  Star,
  Heart
} from 'lucide-react';

interface PageEnDeveloppementProps {
  titre: string;
  description: string;
  icone: React.ComponentType<any>;
  couleur: string;
  fonctionnalites: {
    terminees: string[];
    enCours: string[];
    aVenir: string[];
  };
  dateEstimee: string;
  priorite: 'haute' | 'moyenne' | 'basse';
}

const PageEnDeveloppement: React.FC<PageEnDeveloppementProps> = ({
  titre,
  description,
  icone: Icone,
  couleur,
  fonctionnalites,
  dateEstimee,
  priorite
}) => {
  const { t } = useTranslation();
  const { getThemeClasses } = useTheme();
  const themeClasses = getThemeClasses();
  const [email, setEmail] = useState('');
  const [isInscrit, setIsInscrit] = useState(false);

  const handleInscription = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsInscrit(true);
      // Ici on pourrait envoyer l'email à une API
      setTimeout(() => setIsInscrit(false), 3000);
    }
  };

  const getPrioriteColor = () => {
    switch (priorite) {
      case 'haute': return 'text-red-400 bg-red-500/20 border-red-400/30';
      case 'moyenne': return 'text-yellow-400 bg-yellow-500/20 border-yellow-400/30';
      case 'basse': return 'text-green-400 bg-green-500/20 border-green-400/30';
      default: return 'text-blue-400 bg-blue-500/20 border-blue-400/30';
    }
  };

  const getPrioriteText = () => {
    switch (priorite) {
      case 'haute': return 'Priorité Haute';
      case 'moyenne': return 'Priorité Moyenne';
      case 'basse': return 'Priorité Basse';
      default: return 'En Développement';
    }
  };

  return (
    <div className={`min-h-screen ${themeClasses.background} py-12 px-4 sm:px-6`}>
      <div className="container mx-auto max-w-4xl">
        {/* Header avec icône et titre */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <motion.div
            className={`w-24 h-24 mx-auto mb-6 rounded-3xl bg-gradient-to-br ${couleur} flex items-center justify-center shadow-2xl`}
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Icone className="w-12 h-12 text-white" />
          </motion.div>
          
          <h1 className={`text-4xl sm:text-5xl font-bold ${themeClasses.text} mb-4`}>
            {titre}
          </h1>
          
          <p className={`text-lg sm:text-xl ${themeClasses.textSecondary} max-w-2xl mx-auto mb-6`}>
            {description}
          </p>

          {/* Badge de priorité */}
          <motion.div
            className={`inline-flex items-center px-4 py-2 rounded-full border ${getPrioriteColor()} mb-8`}
            whileHover={{ scale: 1.05 }}
          >
            <Zap className="w-4 h-4 mr-2" />
            <span className="font-semibold">{getPrioriteText()}</span>
          </motion.div>
        </motion.div>

        {/* État d'avancement */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
        >
          {/* Fonctionnalités terminées */}
          <motion.div
            className="bg-gradient-to-br from-white/15 to-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/30 relative overflow-hidden group"
            whileHover={{ scale: 1.02, y: -5 }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
            
            <div className="flex items-center mb-4">
              <CheckCircle className="w-6 h-6 text-green-400 mr-3" />
              <h3 className={`text-xl font-bold ${themeClasses.text}`}>Terminé</h3>
            </div>
            
            <ul className="space-y-2">
              {fonctionnalites.terminees.map((item, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  className={`flex items-center ${themeClasses.textSecondary}`}
                >
                  <div className="w-2 h-2 bg-green-400 rounded-full mr-3"></div>
                  {item}
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Fonctionnalités en cours */}
          <motion.div
            className="bg-gradient-to-br from-white/15 to-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/30 relative overflow-hidden group"
            whileHover={{ scale: 1.02, y: -5 }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
            
            <div className="flex items-center mb-4">
              <PlayCircle className="w-6 h-6 text-blue-400 mr-3" />
              <h3 className={`text-xl font-bold ${themeClasses.text}`}>En Cours</h3>
            </div>
            
            <ul className="space-y-2">
              {fonctionnalites.enCours.map((item, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7 + index * 0.1 }}
                  className={`flex items-center ${themeClasses.textSecondary}`}
                >
                  <motion.div
                    className="w-2 h-2 bg-blue-400 rounded-full mr-3"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 1, repeat: Infinity }}
                  ></motion.div>
                  {item}
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Fonctionnalités à venir */}
          <motion.div
            className="bg-gradient-to-br from-white/15 to-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/30 relative overflow-hidden group"
            whileHover={{ scale: 1.02, y: -5 }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
            
            <div className="flex items-center mb-4">
              <Calendar className="w-6 h-6 text-purple-400 mr-3" />
              <h3 className={`text-xl font-bold ${themeClasses.text}`}>À Venir</h3>
            </div>
            
            <ul className="space-y-2">
              {fonctionnalites.aVenir.map((item, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.9 + index * 0.1 }}
                  className={`flex items-center ${themeClasses.textSecondary}`}
                >
                  <div className="w-2 h-2 bg-purple-400 rounded-full mr-3"></div>
                  {item}
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </motion.div>

        {/* Timeline de développement */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="bg-gradient-to-br from-white/15 to-white/5 backdrop-blur-xl rounded-2xl p-8 border border-white/30 mb-12 relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
          
          <div className="flex items-center justify-center mb-6">
            <Clock className="w-8 h-8 text-yellow-400 mr-3" />
            <h3 className={`text-2xl font-bold ${themeClasses.text}`}>Timeline de Développement</h3>
          </div>
          
          <div className="flex items-center justify-center">
            <div className="flex items-center space-x-4">
              <div className="text-center">
                <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mb-2">
                  <CheckCircle className="w-8 h-8 text-white" />
                </div>
                <p className={`text-sm ${themeClasses.textSecondary}`}>Phase 1</p>
                <p className={`text-xs ${themeClasses.textSecondary}`}>Terminé</p>
              </div>
              
              <div className="w-8 h-1 bg-green-400 rounded"></div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mb-2">
                  <PlayCircle className="w-8 h-8 text-white" />
                </div>
                <p className={`text-sm ${themeClasses.textSecondary}`}>Phase 2</p>
                <p className={`text-xs ${themeClasses.textSecondary}`}>En Cours</p>
              </div>
              
              <div className="w-8 h-1 bg-gray-400 rounded"></div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center mb-2">
                  <Calendar className="w-8 h-8 text-white" />
                </div>
                <p className={`text-sm ${themeClasses.textSecondary}`}>Phase 3</p>
                <p className={`text-xs ${themeClasses.textSecondary}`}>Prévu</p>
              </div>
            </div>
          </div>
          
          <div className="text-center mt-6">
            <p className={`text-lg ${themeClasses.text}`}>
              <strong>Date estimée de sortie :</strong> {dateEstimee}
            </p>
          </div>
        </motion.div>

        {/* CTA pour notifications */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.6 }}
          className="bg-gradient-to-br from-white/15 to-white/5 backdrop-blur-xl rounded-2xl p-8 border border-white/30 text-center relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
          
          <Bell className="w-16 h-16 text-yellow-400 mx-auto mb-6" />
          
          <h3 className={`text-2xl font-bold ${themeClasses.text} mb-4`}>
            Restez informé !
          </h3>
          
          <p className={`text-lg ${themeClasses.textSecondary} mb-6 max-w-2xl mx-auto`}>
            Recevez une notification dès que cette fonctionnalité sera disponible.
          </p>
          
          {!isInscrit ? (
            <form onSubmit={handleInscription} className="max-w-md mx-auto">
              <div className="flex flex-col sm:flex-row gap-4">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Votre adresse email"
                  className={`flex-1 px-4 py-3 rounded-xl border border-white/30 bg-white/10 ${themeClasses.text} placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400/50`}
                  required
                />
                <motion.button
                  type="submit"
                  className="px-6 py-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-bold rounded-xl hover:from-yellow-500 hover:to-orange-600 transition-all duration-300 flex items-center justify-center"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Bell className="w-5 h-5 mr-2" />
                  S'inscrire
                </motion.button>
              </div>
            </form>
          ) : (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="text-green-400 text-lg font-semibold"
            >
              <CheckCircle className="w-8 h-8 mx-auto mb-2" />
              Inscription réussie ! Vous recevrez une notification.
            </motion.div>
          )}
        </motion.div>

        {/* Statistiques d'engagement */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.6 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-12"
        >
          <div className="text-center">
            <Users className="w-8 h-8 text-blue-400 mx-auto mb-2" />
            <p className={`text-2xl font-bold ${themeClasses.text}`}>1,247</p>
            <p className={`text-sm ${themeClasses.textSecondary}`}>Personnes intéressées</p>
          </div>
          
          <div className="text-center">
            <Star className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
            <p className={`text-2xl font-bold ${themeClasses.text}`}>4.9/5</p>
            <p className={`text-sm ${themeClasses.textSecondary}`}>Note moyenne</p>
          </div>
          
          <div className="text-center">
            <Heart className="w-8 h-8 text-red-400 mx-auto mb-2" />
            <p className={`text-2xl font-bold ${themeClasses.text}`}>98%</p>
            <p className={`text-sm ${themeClasses.textSecondary}`}>Satisfaction</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default PageEnDeveloppement;
