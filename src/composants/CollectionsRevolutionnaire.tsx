import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useTheme } from './ThemeProvider';
import { 
  Star, 
  Heart, 
  Share2, 
  Eye, 
  Clock, 
  ArrowRight, 
  HelpCircle, 
  Bot,
  Palette,
  Map,
  Info,
  Globe,
  Bell,
  Filter,
  Search,
  Grid,
  List,
  SortAsc,
  ChevronDown
} from 'lucide-react';

const CollectionsRevolutionnaire: React.FC = () => {
  const { t } = useTranslation();
  const { getThemeClasses } = useTheme();
  const themeClasses = getThemeClasses();
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('popularite');
  const [filters, setFilters] = useState({
    epoque: '',
    type: '',
    region: ''
  });

  const oeuvres = [
    {
      id: 1,
      titre: "Masque Dan Spirituel",
      artiste: "Artiste Traditionnel",
      siecle: "XIXe siècle",
      description: "Masque rituel utilisé lors des cérémonies spirituelles",
      tags: ["masque", "rituel", "dan", "spirituel"],
      note: 4.8,
      vues: 1247,
      tempsLecture: "2 min",
      image: "/api/placeholder/300/200",
      region: "Côte d'Ivoire",
      type: "Sculpture",
      epoque: "XIXe siècle"
    },
    {
      id: 2,
      titre: "Tissu Kente Royal",
      artiste: "Tisserand Ashanti",
      siecle: "XVIIIe siècle",
      description: "Tissu royal aux motifs géométriques complexes",
      tags: ["textile", "royal", "tradition", "ashanti"],
      note: 4.9,
      vues: 892,
      tempsLecture: "2 min",
      image: "/api/placeholder/300/200",
      region: "Ghana",
      type: "Textile",
      epoque: "XVIIIe siècle"
    },
    {
      id: 3,
      titre: "Sculpture Baoulé",
      artiste: "Sculpteur Baoulé",
      siecle: "XXe siècle",
      description: "Représentation artistique de la culture Baoulé",
      tags: ["sculpture", "baoule", "art", "culture"],
      note: 4.7,
      vues: 1563,
      tempsLecture: "2 min",
      image: "/api/placeholder/300/200",
      region: "Côte d'Ivoire",
      type: "Sculpture",
      epoque: "XXe siècle"
    },
    {
      id: 4,
      titre: "Masque Dogon",
      artiste: "Artiste Dogon",
      siecle: "XVIIIe siècle",
      description: "Masque cérémoniel de la culture Dogon",
      tags: ["masque", "dogon", "cérémonie", "mali"],
      note: 4.6,
      vues: 987,
      tempsLecture: "2 min",
      image: "/api/placeholder/300/200",
      region: "Mali",
      type: "Sculpture",
      epoque: "XVIIIe siècle"
    },
    {
      id: 5,
      titre: "Bijoux Yoruba",
      artiste: "Orfèvre Yoruba",
      siecle: "XIXe siècle",
      description: "Parure traditionnelle en or et perles",
      tags: ["bijoux", "or", "yoruba", "parure"],
      note: 4.5,
      vues: 743,
      tempsLecture: "1 min",
      image: "/api/placeholder/300/200",
      region: "Nigeria",
      type: "Bijoux",
      epoque: "XIXe siècle"
    },
    {
      id: 6,
      titre: "Poterie Nubienne",
      artiste: "Potier Nubien",
      siecle: "XVIIe siècle",
      description: "Vase décoratif aux motifs géométriques",
      tags: ["poterie", "nubie", "décoratif", "géométrique"],
      note: 4.4,
      vues: 612,
      tempsLecture: "1 min",
      image: "/api/placeholder/300/200",
      region: "Soudan",
      type: "Céramique",
      epoque: "XVIIe siècle"
    }
  ];

  return (
    <div className={`min-h-screen ${themeClasses.background}`}>
      {/* En-tête de la page */}
      <div className="bg-white/20 backdrop-blur-xl border-b border-white/30">
        <div className="container mx-auto px-4 sm:px-6 py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className={`text-4xl sm:text-5xl font-bold ${themeClasses.text} mb-4`}>
              Collections
            </h1>
            <p className={`text-lg ${themeClasses.textSecondary} max-w-2xl mx-auto`}>
              Découvrez notre collection d'œuvres d'art et d'artefacts du patrimoine africain
            </p>
          </motion.div>
        </div>
      </div>

      {/* Barre de filtres et recherche */}
      <div className="bg-white/30 backdrop-blur-sm border-b border-white/30 sticky top-20 z-40">
        <div className="container mx-auto px-4 sm:px-6 py-4">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            {/* Recherche */}
            <div className="relative flex-1 max-w-md">
              <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${themeClasses.accent} w-5 h-5`} />
              <input
                type="text"
                placeholder="Rechercher une œuvre..."
                className="w-full pl-10 pr-4 py-3 bg-white/50 backdrop-blur-sm border border-white/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              />
            </div>

            {/* Filtres */}
            <div className="flex flex-wrap gap-3">
              <select
                value={filters.epoque}
                onChange={(e) => setFilters({...filters, epoque: e.target.value})}
                className="px-4 py-2 bg-white/50 backdrop-blur-sm border border-white/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500"
              >
                <option value="">Toutes les époques</option>
                <option value="XVIIe">XVIIe siècle</option>
                <option value="XVIIIe">XVIIIe siècle</option>
                <option value="XIXe">XIXe siècle</option>
                <option value="XXe">XXe siècle</option>
              </select>

              <select
                value={filters.type}
                onChange={(e) => setFilters({...filters, type: e.target.value})}
                className="px-4 py-2 bg-white/50 backdrop-blur-sm border border-white/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500"
              >
                <option value="">Tous les types</option>
                <option value="Sculpture">Sculpture</option>
                <option value="Textile">Textile</option>
                <option value="Bijoux">Bijoux</option>
                <option value="Céramique">Céramique</option>
              </select>

              <select
                value={filters.region}
                onChange={(e) => setFilters({...filters, region: e.target.value})}
                className="px-4 py-2 bg-white/50 backdrop-blur-sm border border-white/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500"
              >
                <option value="">Toutes les régions</option>
                <option value="Côte d'Ivoire">Côte d'Ivoire</option>
                <option value="Ghana">Ghana</option>
                <option value="Mali">Mali</option>
                <option value="Nigeria">Nigeria</option>
                <option value="Soudan">Soudan</option>
              </select>
            </div>

            {/* Mode d'affichage */}
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-xl transition-colors ${
                  viewMode === 'grid' 
                    ? 'bg-amber-600 text-white' 
                    : `bg-white/50 ${themeClasses.text} hover:bg-white/70`
                }`}
              >
                <Grid className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-xl transition-colors ${
                  viewMode === 'list' 
                    ? 'bg-amber-600 text-white' 
                    : `bg-white/50 ${themeClasses.text} hover:bg-white/70`
                }`}
              >
                <List className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Grille des œuvres */}
      <div className="container mx-auto px-4 sm:px-6 py-8">
        <div className={`grid gap-6 ${
          viewMode === 'grid' 
            ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' 
            : 'grid-cols-1'
        }`}>
          {oeuvres.map((oeuvre, index) => (
            <motion.div
              key={oeuvre.id}
              className="relative group"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              onHoverStart={() => setHoveredCard(oeuvre.id)}
              onHoverEnd={() => setHoveredCard(null)}
            >
              {/* Carte principale */}
              <div className={`bg-white/40 backdrop-blur-lg rounded-2xl border border-white/30 hover:border-white/50 transition-all duration-300 hover:shadow-2xl hover:shadow-amber-500/20 ${
                viewMode === 'list' ? 'flex' : 'p-6'
              }`}>
                {/* Image placeholder */}
                <div className={`relative ${viewMode === 'list' ? 'w-48 h-32 flex-shrink-0' : 'w-full h-48'} mb-4`}>
                  <div className="w-full h-full bg-gradient-to-br from-orange-400 via-amber-500 to-orange-600 rounded-xl flex items-center justify-center">
                    <Palette className="w-16 h-16 text-white/80" />
                  </div>
                  
                  {/* Note */}
                  <div className="absolute bottom-2 left-2 bg-black/50 backdrop-blur-sm rounded-lg px-2 py-1 flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className={`text-sm font-semibold ${themeClasses.text}`}>{oeuvre.note}</span>
                  </div>

                  {/* Actions */}
                  <div className="absolute top-2 right-2 flex space-x-2">
                    <button className="p-2 bg-white/20 backdrop-blur-sm rounded-lg hover:bg-white/30 transition-colors">
                      <Heart className={`w-4 h-4 ${themeClasses.text}`} />
                    </button>
                    <button className="p-2 bg-white/20 backdrop-blur-sm rounded-lg hover:bg-white/30 transition-colors">
                      <Share2 className={`w-4 h-4 ${themeClasses.text}`} />
                    </button>
                  </div>
                </div>

                {/* Contenu */}
                <div className={`space-y-3 ${viewMode === 'list' ? 'flex-1 pl-6' : ''}`}>
                  <h3 className={`text-xl font-bold ${themeClasses.text}`}>{oeuvre.titre}</h3>
                  <p className={`${themeClasses.textSecondary} text-sm`}>{oeuvre.artiste}</p>
                  <p className={`${themeClasses.accent} text-sm`}>{oeuvre.siecle} • {oeuvre.region}</p>
                  <p className={`${themeClasses.textSecondary} text-sm`}>{oeuvre.description}</p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {oeuvre.tags.map((tag, tagIndex) => (
                      <span
                        key={tagIndex}
                        className={`px-2 py-1 bg-white/30 rounded-full text-xs ${themeClasses.text} font-medium`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Statistiques */}
                  <div className={`flex items-center justify-between text-sm ${themeClasses.accent}`}>
                    <div className="flex items-center space-x-1">
                      <Eye className="w-4 h-4" />
                      <span>{oeuvre.vues}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="w-4 h-4" />
                      <span>{oeuvre.tempsLecture}</span>
                    </div>
                  </div>

                  {/* Bouton Voir plus */}
                  <button className="w-full mt-4 p-3 bg-gradient-to-r from-amber-600 to-orange-600 rounded-xl text-white font-semibold hover:from-amber-700 hover:to-orange-700 transition-all duration-300 flex items-center justify-center space-x-2">
                    <span>Voir plus</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Effets de hover */}
              <AnimatePresence>
                {hoveredCard === oeuvre.id && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="absolute -inset-2 bg-gradient-to-r from-amber-500/20 to-orange-500/20 rounded-2xl blur-xl -z-10"
                  />
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Boutons flottants */}
      <div className="fixed bottom-6 left-6 z-50">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-4 rounded-full shadow-2xl hover:shadow-purple-500/50 transition-all duration-300"
        >
          <HelpCircle className="w-6 h-6" />
        </motion.button>
      </div>

      <div className="fixed bottom-6 right-6 z-50">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="bg-gradient-to-r from-orange-500 to-red-500 text-white p-4 rounded-full shadow-2xl hover:shadow-orange-500/50 transition-all duration-300"
        >
          <Bot className="w-6 h-6" />
        </motion.button>
      </div>
    </div>
  );
};

export default CollectionsRevolutionnaire;