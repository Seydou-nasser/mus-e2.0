import React, { createContext, useContext, useState, useEffect } from 'react';

/**
 * Contexte de thème pour le mode visite nocturne
 * Gestion centralisée des thèmes avec persistance
 */
interface ThemeContextType {
  theme: 'sombre' | 'douce' | 'clair';
  toggleTheme: () => void;
  isDarkMode: boolean;
  getThemeClasses: () => {
    background: string;
    text: string;
    textSecondary: string;
    accent: string;
  };
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme doit être utilisé dans un ThemeProvider');
  }
  return context;
};

interface ThemeProviderProps {
  children: React.ReactNode;
}

/**
 * Provider de thème avec mode visite nocturne premium
 * Effets de lumière et transitions fluides
 */
export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [theme, setTheme] = useState<'sombre' | 'douce' | 'clair'>('sombre');
  const [isDarkMode, setIsDarkMode] = useState(true);

  // Charger le thème sauvegardé
  useEffect(() => {
    const savedTheme = localStorage.getItem('musee-theme') as 'sombre' | 'douce' | 'clair' | null;
    if (savedTheme) {
      setTheme(savedTheme);
      setIsDarkMode(savedTheme === 'sombre');
    }
  }, []);

  // Appliquer le thème au document
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    document.documentElement.classList.toggle('dark-mode', isDarkMode);
    
    // Sauvegarder la préférence
    localStorage.setItem('musee-theme', theme);
  }, [theme, isDarkMode]);

  const toggleTheme = () => {
    const newTheme = theme === 'sombre' ? 'douce' : theme === 'douce' ? 'clair' : 'sombre';
    setTheme(newTheme);
    setIsDarkMode(newTheme === 'sombre');
  };

  // Fonction pour obtenir les classes CSS selon le thème
  const getThemeClasses = () => {
    switch (theme) {
      case 'sombre':
        return {
          background: 'bg-gradient-to-br from-gray-900 via-black to-gray-800 floating-particles',
          text: 'text-white',
          textSecondary: 'text-gray-300',
          accent: 'text-yellow-400'
        };
      case 'douce':
        return {
          background: 'bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900',
          text: 'text-white',
          textSecondary: 'text-gray-300',
          accent: 'text-blue-400'
        };
      case 'clair':
        return {
          background: 'bg-gradient-to-br from-blue-50 via-white to-gray-100',
          text: 'text-gray-900',
          textSecondary: 'text-gray-600',
          accent: 'text-blue-600'
        };
      default:
        return {
          background: 'bg-gradient-to-br from-gray-900 via-black to-gray-800 floating-particles',
          text: 'text-white',
          textSecondary: 'text-gray-300',
          accent: 'text-yellow-400'
        };
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, isDarkMode, getThemeClasses }}>
      {children}
    </ThemeContext.Provider>
  );
};
