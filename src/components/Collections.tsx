import React, { useState, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { artworks } from "../data/artworks";
import ArtworkCard from "./ArtworkCard";

const Collections: React.FC = () => {
  const { t, i18n } = useTranslation();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  // Extract unique categories from artworks
  const categories = useMemo(() => {
    const cats = new Set<string>();
    artworks.forEach(artwork => {
      artwork.history.forEach(item => {
        // Extract country/region from history
        const match = item.match(/Origine\s*:\s*([^,]+)/i);
        if (match) {
          cats.add(match[1].trim());
        }
      });
    });
    return Array.from(cats);
  }, []);

  // Filter artworks based on search and category
  const filteredArtworks = useMemo(() => {
    return artworks.filter(artwork => {
      const currentLang = i18n.language as keyof typeof artwork.title;
      const matchesSearch =
        artwork.title[currentLang].toLowerCase().includes(searchTerm.toLowerCase()) ||
        artwork.description[currentLang].toLowerCase().includes(searchTerm.toLowerCase()) ||
        artwork.history.some(item => item.toLowerCase().includes(searchTerm.toLowerCase()));

      const matchesCategory = selectedCategory === "all" ||
        artwork.history.some(item =>
          item.toLowerCase().includes(selectedCategory.toLowerCase())
        );

      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory, i18n.language]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <section className="bg-gradient-to-r from-amber-800 to-amber-900 text-white py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h1 className="text-5xl md:text-6xl font-bold mb-4">
              {t('collections')}
            </h1>
            <p className="text-xl md:text-2xl text-amber-100 max-w-3xl mx-auto">
              {t('collectionDescription')}
            </p>
          </div>

          {/* Collection Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-12">
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">{artworks.length}</div>
              <div className="text-amber-200">Œuvres Totales</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">{categories.length}</div>
              <div className="text-amber-200">Régions</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">3</div>
              <div className="text-amber-200">Langues</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">100%</div>
              <div className="text-amber-200">Numérique</div>
            </div>
          </div>
        </div>
      </section>

      {/* Filters and Search */}
      <section className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <input
                type="text"
                placeholder={t('searchPlaceholder')}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              />
              <svg className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>

            {/* Category Filter */}
            <div className="flex items-center gap-4">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              >
                <option value="all">{t('allRegions')}</option>
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>

              {/* View Mode Toggle */}
              <div className="flex border border-gray-300 rounded-lg">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`px-4 py-3 rounded-l-lg ${viewMode === "grid" ? "bg-amber-600 text-white" : "bg-white text-gray-700 hover:bg-gray-50"}`}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                  </svg>
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`px-4 py-3 rounded-r-lg ${viewMode === "list" ? "bg-amber-600 text-white" : "bg-white text-gray-700 hover:bg-gray-50"}`}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* Results count */}
          <div className="mt-4 text-gray-600">
            {filteredArtworks.length} {filteredArtworks.length === 1 ? t('artworksCount') : t('artworksCountPlural')} {filteredArtworks.length === 1 ? t('found') : t('foundPlural')}
            {searchTerm && ` ${t('for')} "${searchTerm}"`}
            {selectedCategory !== "all" && ` ${t('in')} ${selectedCategory}`}
          </div>
        </div>
      </section>

      {/* Artworks Display */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          {filteredArtworks.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-2">{t('noResults')}</h3>
              <p className="text-gray-600 mb-6">{t('tryDifferentSearch')}</p>
              <button
                onClick={() => {
                  setSearchTerm("");
                  setSelectedCategory("all");
                }}
                className="inline-block bg-amber-600 text-white px-6 py-3 rounded-lg hover:bg-amber-700 transition-colors"
              >
                {t('resetFilters')}
              </button>
            </div>
          ) : viewMode === "grid" ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredArtworks.map((artwork) => (
                <ArtworkCard key={artwork.id} artwork={artwork} />
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {filteredArtworks.map((artwork) => {
                const currentLang = i18n.language as keyof typeof artwork.title;
                return (
                  <div key={artwork.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="flex">
                      <div className="w-48 h-32 bg-gray-200 flex-shrink-0">
                        <img
                          src={artwork.media.image}
                          alt={artwork.title[currentLang]}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = "/assets/placeholder.svg";
                          }}
                        />
                      </div>
                      <div className="flex-1 p-6">
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">
                          {artwork.title[currentLang]}
                        </h3>
                        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                          {artwork.description[currentLang]}
                        </p>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-500">
                            {artwork.history[0]}
                          </span>
                          <a
                            href={`/artwork/${artwork.id}`}
                            className="text-amber-600 hover:text-amber-700 font-medium text-sm"
                          >
                            Voir détails →
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* Categories Overview */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">{t('exploreByRegion')}</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              {t('regionDescription')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map(category => {
              const categoryArtworks = artworks.filter(artwork =>
                artwork.history.some(item => item.includes(category))
              );

              return (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`p-6 rounded-lg border-2 transition-all text-left hover:shadow-lg ${
                    selectedCategory === category
                      ? "border-amber-500 bg-amber-50"
                      : "border-gray-200 bg-gray-50 hover:border-amber-300"
                  }`}
                >
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{category}</h3>
                  <p className="text-gray-600 mb-3">
                    {categoryArtworks.length} {t(categoryArtworks.length !== 1 ? 'artworksCountPlural' : 'artworksCount')}
                  </p>
                  <div className="flex -space-x-2">
                    {categoryArtworks.slice(0, 3).map((artwork, index) => (
                      <div
                        key={artwork.id}
                        className="w-8 h-8 rounded-full bg-gray-300 border-2 border-white overflow-hidden"
                        style={{ zIndex: 3 - index }}
                      >
                        <img
                          src={artwork.media.image}
                          alt={artwork.title.fr}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = "/assets/placeholder.svg";
                          }}
                        />
                      </div>
                    ))}
                    {categoryArtworks.length > 3 && (
                      <div className="w-8 h-8 rounded-full bg-amber-600 border-2 border-white flex items-center justify-center text-xs font-bold text-white">
                        +{categoryArtworks.length - 3}
                      </div>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Collections;
