import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface CompteurAnimeProps {
  cible: number;
  duree?: number;
  prefixe?: string;
  suffixe?: string;
}

/**
 * Compteur animé avec effet de progression fluide
 * Utilisé pour les statistiques impressionnantes
 */
const CompteurAnime: React.FC<CompteurAnimeProps> = ({ 
  cible, 
  duree = 2000, 
  prefixe = '', 
  suffixe = '' 
}) => {
  const [valeur, setValeur] = useState(0);

  useEffect(() => {
    let startTime: number;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duree, 1);
      
      // Fonction d'easing pour un effet plus naturel
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const nouvelleValeur = Math.floor(cible * easeOutQuart);
      
      setValeur(nouvelleValeur);

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [cible, duree]);

  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="inline-block"
    >
      {prefixe}{valeur.toLocaleString()}{suffixe}
    </motion.span>
  );
};

export default CompteurAnime;
