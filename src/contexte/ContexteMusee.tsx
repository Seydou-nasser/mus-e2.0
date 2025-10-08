import React, { createContext, useContext, useReducer } from 'react';
import type { ReactNode } from 'react';

// Types pour le contexte
interface EtatMusee {
  langue: string;
  theme: string;
  utilisateur: any;
  oeuvres: any[];
  parcoursActif: string | null;
}

interface ActionMusee {
  type: string;
  payload?: any;
}

// État initial
const etatInitial: EtatMusee = {
  langue: 'fr',
  theme: 'light',
  utilisateur: null,
  oeuvres: [],
  parcoursActif: null
};

// Reducer
function reducerMusee(etat: EtatMusee, action: ActionMusee): EtatMusee {
  switch (action.type) {
    case 'CHANGER_LANGUE':
      return { ...etat, langue: action.payload };
    case 'CHANGER_THEME':
      return { ...etat, theme: action.payload };
    case 'SET_UTILISATEUR':
      return { ...etat, utilisateur: action.payload };
    case 'SET_OEUVRES':
      return { ...etat, oeuvres: action.payload };
    case 'SET_PARCOURS':
      return { ...etat, parcoursActif: action.payload };
    default:
      return etat;
  }
}

// Contexte
const ContexteMusee = createContext<{
  etat: EtatMusee;
  dispatch: React.Dispatch<ActionMusee>;
} | null>(null);

// Provider
export const ContexteMuseeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [etat, dispatch] = useReducer(reducerMusee, etatInitial);

  return (
    <ContexteMusee.Provider value={{ etat, dispatch }}>
      {children}
    </ContexteMusee.Provider>
  );
};

// Hook personnalisé
export const utiliserContexteMusee = () => {
  const contexte = useContext(ContexteMusee);
  if (!contexte) {
    throw new Error('utiliserContexteMusee doit être utilisé dans un ContexteMuseeProvider');
  }
  return contexte;
};