import React from 'react';
import { motion } from 'framer-motion';

interface AudioWavesProps {
  className?: string;
  intensity?: number;
}

export const SimpleAudioWaves: React.FC<AudioWavesProps> = ({ 
  className = '', 
  intensity = 0.5 
}) => {
  const waveCount = 5;
  const waves = Array.from({ length: waveCount }, (_, i) => i);

  return (
    <div className={`flex items-center space-x-1 ${className}`}>
      {waves.map((_, index) => (
        <motion.div
          key={index}
          className="w-1 bg-purple-500 rounded-full"
          animate={{
            height: [4, 20 * intensity, 4],
            opacity: [0.3, 1, 0.3]
          }}
          transition={{
            duration: 0.6,
            repeat: Infinity,
            delay: index * 0.1,
            ease: "easeInOut"
          }}
        />
      ))}
    </div>
  );
};

export const CircularAudioWaves: React.FC<AudioWavesProps> = ({ 
  className = '', 
  intensity = 0.5 
}) => {
  return (
    <div className={`relative ${className}`}>
      {[1, 2, 3].map((ring) => (
        <motion.div
          key={ring}
          className="absolute inset-0 border-2 border-purple-400 rounded-full"
          animate={{
            scale: [1, 1.5 + ring * 0.3],
            opacity: [0.8, 0]
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            delay: ring * 0.2,
            ease: "easeOut"
          }}
        />
      ))}
    </div>
  );
};