import React from 'react';
import { motion } from 'framer-motion';

interface IconeIAProps {
  className?: string;
  isDarkMode?: boolean;
  isActive?: boolean;
}

const IconeIA: React.FC<IconeIAProps> = ({ 
  className = "w-6 h-6", 
  isDarkMode = false, 
  isActive = false 
}) => {
  return (
    <motion.div
      className={`relative ${className}`}
      animate={isActive ? { rotate: 360 } : { rotate: 0 }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
    >
      {/* Cercle principal avec gradient */}
      <motion.div
        className="absolute inset-0 rounded-full"
        animate={{
          scale: isActive ? [1, 1.1, 1] : 1,
          opacity: isActive ? [0.8, 1, 0.8] : 1,
        }}
        transition={{
          duration: 2,
          repeat: isActive ? Infinity : 0,
        }}
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          className="w-full h-full"
        >
          {/* Cercle extérieur avec gradient - Plus visible */}
          <circle
            cx="12"
            cy="12"
            r="10"
            fill={isDarkMode ? "url(#gradientDark)" : "url(#gradientLight)"}
            stroke={isDarkMode ? "#8B5CF6" : "#7C3AED"}
            strokeWidth="1.5"
          />
          
          {/* Cercle intérieur - Plus contrasté */}
          <circle
            cx="12"
            cy="12"
            r="6"
            fill={isDarkMode ? "#0F172A" : "#FFFFFF"}
            stroke={isDarkMode ? "#A78BFA" : "#8B5CF6"}
            strokeWidth="1"
          />
          
          {/* Points de données - Plus visibles */}
          <motion.circle
            cx="8"
            cy="8"
            r="1.2"
            fill={isDarkMode ? "#A78BFA" : "#8B5CF6"}
            stroke={isDarkMode ? "#C4B5FD" : "#A78BFA"}
            strokeWidth="0.5"
            animate={{
              scale: isActive ? [1, 1.5, 1] : 1,
              opacity: isActive ? [0.7, 1, 0.7] : 1,
            }}
            transition={{
              duration: 1.5,
              repeat: isActive ? Infinity : 0,
              delay: 0,
            }}
          />
          
          <motion.circle
            cx="16"
            cy="8"
            r="1.2"
            fill={isDarkMode ? "#A78BFA" : "#8B5CF6"}
            stroke={isDarkMode ? "#C4B5FD" : "#A78BFA"}
            strokeWidth="0.5"
            animate={{
              scale: isActive ? [1, 1.5, 1] : 1,
              opacity: isActive ? [0.7, 1, 0.7] : 1,
            }}
            transition={{
              duration: 1.5,
              repeat: isActive ? Infinity : 0,
              delay: 0.3,
            }}
          />
          
          <motion.circle
            cx="8"
            cy="16"
            r="1.2"
            fill={isDarkMode ? "#A78BFA" : "#8B5CF6"}
            stroke={isDarkMode ? "#C4B5FD" : "#A78BFA"}
            strokeWidth="0.5"
            animate={{
              scale: isActive ? [1, 1.5, 1] : 1,
              opacity: isActive ? [0.7, 1, 0.7] : 1,
            }}
            transition={{
              duration: 1.5,
              repeat: isActive ? Infinity : 0,
              delay: 0.6,
            }}
          />
          
          <motion.circle
            cx="16"
            cy="16"
            r="1.2"
            fill={isDarkMode ? "#A78BFA" : "#8B5CF6"}
            stroke={isDarkMode ? "#C4B5FD" : "#A78BFA"}
            strokeWidth="0.5"
            animate={{
              scale: isActive ? [1, 1.5, 1] : 1,
              opacity: isActive ? [0.7, 1, 0.7] : 1,
            }}
            transition={{
              duration: 1.5,
              repeat: isActive ? Infinity : 0,
              delay: 0.9,
            }}
          />
          
          {/* Point central avec pulsation - Plus visible */}
          <motion.circle
            cx="12"
            cy="12"
            r="2.5"
            fill={isDarkMode ? "#C4B5FD" : "#A78BFA"}
            stroke={isDarkMode ? "#DDD6FE" : "#C4B5FD"}
            strokeWidth="0.5"
            animate={{
              scale: isActive ? [1, 1.3, 1] : 1,
              opacity: isActive ? [0.8, 1, 0.8] : 1,
            }}
            transition={{
              duration: 1,
              repeat: isActive ? Infinity : 0,
            }}
          />
          
          {/* Lignes de connexion animées */}
          <motion.path
            d="M8 8 L12 12 L16 8"
            stroke={isDarkMode ? "#8B5CF6" : "#7C3AED"}
            strokeWidth="0.5"
            fill="none"
            animate={{
              pathLength: isActive ? [0, 1, 0] : 0,
            }}
            transition={{
              duration: 2,
              repeat: isActive ? Infinity : 0,
            }}
          />
          
          <motion.path
            d="M8 16 L12 12 L16 16"
            stroke={isDarkMode ? "#8B5CF6" : "#7C3AED"}
            strokeWidth="0.5"
            fill="none"
            animate={{
              pathLength: isActive ? [0, 1, 0] : 0,
            }}
            transition={{
              duration: 2,
              repeat: isActive ? Infinity : 0,
              delay: 0.5,
            }}
          />
          
          {/* Gradients */}
          <defs>
            <linearGradient id="gradientDark" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#8B5CF6" />
              <stop offset="50%" stopColor="#A78BFA" />
              <stop offset="100%" stopColor="#C4B5FD" />
            </linearGradient>
            
            <linearGradient id="gradientLight" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#7C3AED" />
              <stop offset="50%" stopColor="#8B5CF6" />
              <stop offset="100%" stopColor="#A78BFA" />
            </linearGradient>
          </defs>
        </svg>
      </motion.div>
      
      {/* Effet de brillance */}
      {isActive && (
        <motion.div
          className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-white/20 to-transparent"
          animate={{
            x: ["-100%", "100%"],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      )}
    </motion.div>
  );
};

export default IconeIA;
