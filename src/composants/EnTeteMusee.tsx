import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router';
import { 
  Home, 
  Palette, 
  Map, 
  Eye, 
  Info, 
  Globe, 
  Bell,
  Menu,
  X
} from 'lucide-react';

const EnTeteMusee: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white/90 backdrop-blur-lg border-b border-amber-200 sticky top-0 z-50">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-br from-amber-600 to-orange-600 rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-xl">M</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-amber-800">MUSÉE DES CIVILISATIONS NOIRES</h1>
              <p className="text-sm text-amber-600">EXPÉRIENCE 2.0</p>
            </div>
          </Link>

          {/* Navigation Desktop */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="flex items-center space-x-2 text-amber-700 hover:text-amber-900 transition-colors">
              <Home className="w-4 h-4" />
              <span>Accueil</span>
            </Link>
            <Link to="/collections" className="flex items-center space-x-2 text-amber-700 hover:text-amber-900 transition-colors">
              <Palette className="w-4 h-4" />
              <span>Collections</span>
            </Link>
            <Link to="/parcours" className="flex items-center space-x-2 text-amber-700 hover:text-amber-900 transition-colors">
              <Map className="w-4 h-4" />
              <span>Parcours</span>
            </Link>
            <Link to="/realite-augmentee" className="flex items-center space-x-2 text-amber-700 hover:text-amber-900 transition-colors">
              <Eye className="w-4 h-4" />
              <span>AR</span>
            </Link>
            <Link to="/a-propos" className="flex items-center space-x-2 text-amber-700 hover:text-amber-900 transition-colors">
              <Info className="w-4 h-4" />
              <span>À propos</span>
            </Link>
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            <div className="hidden md:flex items-center space-x-2 text-amber-700">
              <Globe className="w-4 h-4" />
              <span>Français</span>
              <span>▼</span>
            </div>
            <Bell className="w-5 h-5 text-amber-700 hover:text-amber-900 cursor-pointer" />
            
            {/* Menu Mobile */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-amber-700 hover:text-amber-900"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Menu Mobile */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden mt-4 pb-4 border-t border-amber-200"
          >
            <nav className="flex flex-col space-y-4 pt-4">
              <Link to="/" className="flex items-center space-x-2 text-amber-700 hover:text-amber-900 transition-colors">
                <Home className="w-4 h-4" />
                <span>Accueil</span>
              </Link>
              <Link to="/collections" className="flex items-center space-x-2 text-amber-700 hover:text-amber-900 transition-colors">
                <Palette className="w-4 h-4" />
                <span>Collections</span>
              </Link>
              <Link to="/parcours" className="flex items-center space-x-2 text-amber-700 hover:text-amber-900 transition-colors">
                <Map className="w-4 h-4" />
                <span>Parcours</span>
              </Link>
              <Link to="/realite-augmentee" className="flex items-center space-x-2 text-amber-700 hover:text-amber-900 transition-colors">
                <Eye className="w-4 h-4" />
                <span>AR</span>
              </Link>
              <Link to="/a-propos" className="flex items-center space-x-2 text-amber-700 hover:text-amber-900 transition-colors">
                <Info className="w-4 h-4" />
                <span>À propos</span>
              </Link>
            </nav>
          </motion.div>
        )}
      </div>
    </header>
  );
};

export default EnTeteMusee;
