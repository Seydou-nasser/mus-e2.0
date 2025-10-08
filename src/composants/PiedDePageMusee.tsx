import React from 'react';
import { Link } from 'react-router';
import { Heart, Globe, Mail, Phone } from 'lucide-react';

const PiedDePageMusee: React.FC = () => {
  return (
    <footer className="bg-amber-800 text-white py-12">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo et description */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">M</span>
              </div>
              <div>
                <h3 className="text-xl font-bold">Musée des Civilisations Noires</h3>
                <p className="text-amber-200 text-sm">Expérience 2.0</p>
              </div>
            </div>
            <p className="text-amber-200 mb-4">
              Découvrez le patrimoine culturel africain à travers une expérience immersive et interactive.
            </p>
            <div className="flex space-x-4">
              <Globe className="w-5 h-5 text-amber-200 hover:text-white cursor-pointer" />
              <Mail className="w-5 h-5 text-amber-200 hover:text-white cursor-pointer" />
              <Phone className="w-5 h-5 text-amber-200 hover:text-white cursor-pointer" />
            </div>
          </div>

          {/* Liens rapides */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Liens rapides</h4>
            <ul className="space-y-2">
              <li><Link to="/" className="text-amber-200 hover:text-white transition-colors">Accueil</Link></li>
              <li><Link to="/collections" className="text-amber-200 hover:text-white transition-colors">Collections</Link></li>
              <li><Link to="/parcours" className="text-amber-200 hover:text-white transition-colors">Parcours</Link></li>
              <li><Link to="/realite-augmentee" className="text-amber-200 hover:text-white transition-colors">Réalité Augmentée</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact</h4>
            <ul className="space-y-2 text-amber-200">
              <li>Dakar, Sénégal</li>
              <li>+221 33 XXX XX XX</li>
              <li>contact@museecivilisationsnoires.sn</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-amber-700 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-amber-200 text-sm">
            © 2024 Musée des Civilisations Noires. Tous droits réservés.
          </p>
          <p className="text-amber-200 text-sm flex items-center space-x-1 mt-2 md:mt-0">
            <span>Fait avec</span>
            <Heart className="w-4 h-4 text-red-400" />
            <span>pour l'Afrique</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default PiedDePageMusee;
