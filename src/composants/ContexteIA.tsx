import React, { createContext, useContext, useState, useEffect } from 'react';

/**
 * Contexte global pour la synchronisation des boutons IA
 * Permet la communication fluide entre les boutons header et flottant
 */
interface ContexteIAInterface {
  isIAEnLigne: boolean;
  setIsIAEnLigne: (value: boolean) => void;
  isChatbotOpen: boolean;
  setIsChatbotOpen: (value: boolean) => void;
  lastClickSource: 'header' | 'floating' | null;
  setLastClickSource: (source: 'header' | 'floating' | null) => void;
}

const ContexteIA = createContext<ContexteIAInterface | undefined>(undefined);

export const ContexteIAProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isIAEnLigne, setIsIAEnLigne] = useState(true);
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);
  const [lastClickSource, setLastClickSource] = useState<'header' | 'floating' | null>(null);

  // Simulation de changement d'état de l'IA
  useEffect(() => {
    const interval = setInterval(() => {
      // Simuler un changement d'état aléatoire (pour démonstration)
      if (Math.random() > 0.8) {
        setIsIAEnLigne(prev => !prev);
      }
    }, 10000); // Vérification toutes les 10 secondes

    return () => clearInterval(interval);
  }, []);

  // Gestion de l'ouverture du chatbot
  const handleChatbotToggle = (source: 'header' | 'floating') => {
    setLastClickSource(source);
    setIsChatbotOpen(prev => !prev);
    
    // Logique de synchronisation
    console.log(`Chatbot ${isChatbotOpen ? 'fermé' : 'ouvert'} depuis le bouton ${source}`);
  };

  const value: ContexteIAInterface = {
    isIAEnLigne,
    setIsIAEnLigne,
    isChatbotOpen,
    setIsChatbotOpen,
    lastClickSource,
    setLastClickSource,
  };

  return (
    <ContexteIA.Provider value={value}>
      {children}
    </ContexteIA.Provider>
  );
};

export const useContexteIA = (): ContexteIAInterface => {
  const context = useContext(ContexteIA);
  if (context === undefined) {
    throw new Error('useContexteIA doit être utilisé dans un ContexteIAProvider');
  }
  return context;
};
