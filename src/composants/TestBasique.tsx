import React from 'react';
import { motion } from 'framer-motion';
import { Play, Eye, Target, Layers, Award } from 'lucide-react';

const TestBasique: React.FC = () => {

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100">
      {/* Hero Section */}
      <section className="relative py-20 px-6">
        <div className="container mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-6xl font-bold text-amber-800 mb-6"
          >
            Musée des Civilisations Noires
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-amber-700 mb-8 max-w-2xl mx-auto"
          >
            Découvrez le patrimoine culturel africain à travers une expérience immersive et interactive
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <button className="bg-amber-600 hover:bg-amber-700 text-white px-8 py-4 rounded-xl font-semibold transition-colors flex items-center justify-center space-x-2">
              <Play className="w-5 h-5" />
              <span>Commencer la visite</span>
            </button>
            <button className="bg-white/80 hover:bg-white text-amber-800 px-8 py-4 rounded-xl font-semibold transition-colors flex items-center justify-center space-x-2">
              <Eye className="w-5 h-5" />
              <span>Découvrir les collections</span>
            </button>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-6">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center text-amber-800 mb-12">
            Fonctionnalités Révolutionnaires
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Target className="w-8 h-8" />,
                title: "Réalité Augmentée",
                description: "Explorez les œuvres en 3D avec des informations enrichies"
              },
              {
                icon: <Layers className="w-8 h-8" />,
                title: "IA Conversationnelle",
                description: "Discutez avec notre assistant IA spécialisé en culture africaine"
              },
              {
                icon: <Award className="w-8 h-8" />,
                title: "Parcours Gamifiés",
                description: "Gagnez des badges en découvrant les collections"
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 text-center hover:shadow-xl transition-all duration-300"
              >
                <div className="text-amber-600 mb-4 flex justify-center">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-amber-800 mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-6 bg-white/50">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            {[
              { number: "500+", label: "Œuvres d'art" },
              { number: "50+", label: "Artistes" },
              { number: "10+", label: "Collections" },
              { number: "1000+", label: "Visiteurs" }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white/80 backdrop-blur-sm rounded-xl p-6"
              >
                <div className="text-3xl font-bold text-amber-600 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default TestBasique;
