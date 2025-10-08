import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Bell, 
  X, 
  CheckCircle, 
  Info, 
  AlertTriangle, 
  Heart,
  Sparkles,
  Crown
} from 'lucide-react';
import { useTheme } from './ThemeProvider';

interface Notification {
  id: string;
  type: 'welcome' | 'info' | 'success' | 'warning' | 'error';
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
  icon?: React.ReactNode;
  action?: {
    label: string;
    onClick: () => void;
  };
}

/**
 * Composant de notifications sophistiqué avec design doré
 * Compatible avec les 3 modes de thème et responsive
 */
const NotificationsMusee: React.FC = () => {
  const { theme, isDarkMode } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);

  // Notification de bienvenue par défaut
  useEffect(() => {
    const welcomeNotification: Notification = {
      id: 'welcome-001',
      type: 'welcome',
      title: 'Bienvenue au Musée des Civilisations Noires !',
      message: 'Découvrez l\'histoire fascinante de l\'Afrique à travers une expérience immersive unique. Explorez nos collections, utilisez la réalité augmentée et interagissez avec notre assistant IA.',
      timestamp: new Date(),
      read: false,
      icon: <Crown className="w-5 h-5" />,
      action: {
        label: 'Commencer l\'exploration',
        onClick: () => {
          console.log('🎯 [NOTIFICATIONS] Début de l\'exploration');
          setIsOpen(false);
        }
      }
    };

    setNotifications([welcomeNotification]);
    setUnreadCount(1);
  }, []);

  // Classes de thème pour les notifications
  const getThemeClasses = () => {
    const baseClasses = {
      background: '',
      text: '',
      border: '',
      shadow: ''
    };

    switch (theme) {
      case 'sombre':
        return {
          ...baseClasses,
          background: 'bg-gray-900/95 backdrop-blur-xl',
          text: 'text-white',
          border: 'border-white/20',
          shadow: 'shadow-2xl shadow-black/50'
        };
      case 'douce':
        return {
          ...baseClasses,
          background: 'bg-gradient-to-br from-amber-50 to-yellow-100/95 backdrop-blur-xl',
          text: 'text-amber-900',
          border: 'border-amber-200/50',
          shadow: 'shadow-2xl shadow-amber-200/30'
        };
      case 'clair':
        return {
          ...baseClasses,
          background: 'bg-white/95 backdrop-blur-xl',
          text: 'text-gray-900',
          border: 'border-gray-200',
          shadow: 'shadow-2xl shadow-gray-200/50'
        };
      default:
        return baseClasses;
    }
  };

  const themeClasses = getThemeClasses();

  // Classes pour les types de notifications
  const getNotificationClasses = (type: Notification['type']) => {
    const baseClasses = 'p-4 rounded-xl border-l-4 transition-all duration-300 hover:scale-[1.02]';
    
    switch (type) {
      case 'welcome':
        return `${baseClasses} bg-gradient-to-r from-yellow-400/20 to-amber-500/20 border-yellow-400 ${
          isDarkMode 
            ? 'text-yellow-200' 
            : 'text-amber-900'
        }`;
      case 'success':
        return `${baseClasses} bg-gradient-to-r from-green-400/20 to-emerald-500/20 border-green-400 ${
          isDarkMode 
            ? 'text-green-200' 
            : 'text-green-900'
        }`;
      case 'info':
        return `${baseClasses} bg-gradient-to-r from-blue-400/20 to-cyan-500/20 border-blue-400 ${
          isDarkMode 
            ? 'text-blue-200' 
            : 'text-blue-900'
        }`;
      case 'warning':
        return `${baseClasses} bg-gradient-to-r from-orange-400/20 to-red-500/20 border-orange-400 ${
          isDarkMode 
            ? 'text-orange-200' 
            : 'text-orange-900'
        }`;
      case 'error':
        return `${baseClasses} bg-gradient-to-r from-red-400/20 to-pink-500/20 border-red-400 ${
          isDarkMode 
            ? 'text-red-200' 
            : 'text-red-900'
        }`;
      default:
        return baseClasses;
    }
  };

  // Icônes pour les types de notifications
  const getNotificationIcon = (type: Notification['type']) => {
    switch (type) {
      case 'welcome':
        return <Crown className={`w-5 h-5 ${isDarkMode ? 'text-yellow-500' : 'text-amber-700'}`} />;
      case 'success':
        return <CheckCircle className={`w-5 h-5 ${isDarkMode ? 'text-green-500' : 'text-green-700'}`} />;
      case 'info':
        return <Info className={`w-5 h-5 ${isDarkMode ? 'text-blue-500' : 'text-blue-700'}`} />;
      case 'warning':
        return <AlertTriangle className={`w-5 h-5 ${isDarkMode ? 'text-orange-500' : 'text-orange-700'}`} />;
      case 'error':
        return <AlertTriangle className={`w-5 h-5 ${isDarkMode ? 'text-red-500' : 'text-red-700'}`} />;
      default:
        return <Bell className={`w-5 h-5 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`} />;
    }
  };

  // Marquer comme lu
  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
    setUnreadCount(prev => Math.max(0, prev - 1));
  };

  // Supprimer une notification
  const removeNotification = (id: string) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id));
    setUnreadCount(prev => Math.max(0, prev - 1));
  };

  // Marquer toutes comme lues
  const markAllAsRead = () => {
    setNotifications(prev => prev.map(notif => ({ ...notif, read: true })));
    setUnreadCount(0);
  };

  // Supprimer toutes les notifications
  const clearAll = () => {
    setNotifications([]);
    setUnreadCount(0);
  };

  return (
    <div className="relative">
      {/* Bouton de notification */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`relative p-2 sm:p-3 rounded-full transition-all duration-300 hover:scale-110 ${
          isDarkMode 
            ? 'bg-gray-800/80 hover:bg-gray-700/90 text-white' 
            : 'bg-white/80 hover:bg-white/90 text-gray-700'
        } shadow-lg hover:shadow-xl`}
      >
        <Bell className="w-5 h-5 sm:w-6 sm:h-6" />
        
        {/* Badge de notification non lue */}
        {unreadCount > 0 && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -top-1 -right-1 bg-gradient-to-r from-yellow-400 to-amber-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center shadow-lg"
          >
            {unreadCount > 9 ? '9+' : unreadCount}
          </motion.div>
        )}
      </button>

      {/* Panel des notifications */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: -20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className={`absolute right-0 top-full mt-2 w-80 sm:w-96 max-h-96 overflow-y-auto ${themeClasses.background} ${themeClasses.border} ${themeClasses.shadow} rounded-2xl border z-50`}
          >
            {/* Header */}
            <div className={`p-4 border-b ${themeClasses.border}`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Bell className={`w-5 h-5 ${themeClasses.text}`} />
                  <h3 className={`font-semibold ${themeClasses.text}`}>
                    Notifications
                  </h3>
                  {unreadCount > 0 && (
                    <span className="bg-gradient-to-r from-yellow-400 to-amber-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                      {unreadCount}
                    </span>
                  )}
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className={`p-1 rounded-full hover:bg-gray-200/50 dark:hover:bg-gray-700/50 transition-colors ${themeClasses.text}`}
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              
              {/* Actions rapides */}
              {notifications.length > 0 && (
                <div className="flex space-x-2 mt-3">
                  <button
                    onClick={markAllAsRead}
                    className="text-xs bg-blue-500/20 text-blue-600 dark:text-blue-400 px-2 py-1 rounded-full hover:bg-blue-500/30 transition-colors"
                  >
                    Tout marquer comme lu
                  </button>
                  <button
                    onClick={clearAll}
                    className="text-xs bg-red-500/20 text-red-600 dark:text-red-400 px-2 py-1 rounded-full hover:bg-red-500/30 transition-colors"
                  >
                    Tout effacer
                  </button>
                </div>
              )}
            </div>

            {/* Liste des notifications */}
            <div className="max-h-64 overflow-y-auto">
              {notifications.length === 0 ? (
                <div className="p-6 text-center">
                  <Bell className={`w-8 h-8 mx-auto mb-2 ${themeClasses.text} opacity-50`} />
                  <p className={`text-sm ${themeClasses.text} opacity-70`}>
                    Aucune notification
                  </p>
                </div>
              ) : (
                <div className="p-2">
                  {notifications.map((notification) => (
                    <motion.div
                      key={notification.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className={`mb-3 ${getNotificationClasses(notification.type)} ${
                        !notification.read ? 'ring-2 ring-yellow-400/30' : ''
                      }`}
                    >
                      <div className="flex items-start space-x-3">
                        <div className="flex-shrink-0 mt-1">
                          {notification.icon || getNotificationIcon(notification.type)}
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <h4 className={`font-semibold text-sm truncate ${
                              isDarkMode ? 'text-white' : 'text-gray-900'
                            }`}>
                              {notification.title}
                            </h4>
                            <div className="flex items-center space-x-2">
                              {!notification.read && (
                                <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                              )}
                              <button
                                onClick={() => removeNotification(notification.id)}
                                className={`${isDarkMode ? 'text-gray-400 hover:text-red-500' : 'text-gray-600 hover:text-red-600'} transition-colors`}
                              >
                                <X className="w-3 h-3" />
                              </button>
                            </div>
                          </div>
                          
                          <p className={`text-xs mt-1 leading-relaxed ${
                            isDarkMode ? 'text-gray-300' : 'text-gray-700'
                          }`}>
                            {notification.message}
                          </p>
                          
                          <div className="flex items-center justify-between mt-2">
                            <span className={`text-xs ${
                              isDarkMode ? 'text-gray-400' : 'text-gray-600'
                            }`}>
                              {notification.timestamp.toLocaleTimeString('fr-FR', {
                                hour: '2-digit',
                                minute: '2-digit'
                              })}
                            </span>
                            
                            {notification.action && (
                              <button
                                onClick={() => {
                                  notification.action?.onClick();
                                  markAsRead(notification.id);
                                }}
                                className="text-xs bg-gradient-to-r from-yellow-400 to-amber-500 text-white px-3 py-1 rounded-full hover:from-yellow-500 hover:to-amber-600 transition-all duration-300 font-medium shadow-lg"
                              >
                                {notification.action.label}
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer avec design doré */}
            <div className={`p-3 border-t ${themeClasses.border} bg-gradient-to-r from-yellow-400/10 to-amber-500/10`}>
              <div className="flex items-center justify-center space-x-1">
                <Sparkles className={`w-4 h-4 ${isDarkMode ? 'text-yellow-500' : 'text-amber-600'}`} />
                <span className={`text-xs font-medium ${
                  isDarkMode ? 'text-yellow-400' : 'text-amber-800'
                }`}>
                  Musée des Civilisations Noires
                </span>
                <Heart className={`w-4 h-4 ${isDarkMode ? 'text-red-500' : 'text-red-600'}`} />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default NotificationsMusee;

