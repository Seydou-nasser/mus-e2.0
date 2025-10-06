import { useState, useMemo } from "react";
import { useNavigate } from "react-router";
import { useTranslation } from "react-i18next";
import { artworks, getAllCategories } from "../data/artworkService";
import type { Language } from "../types/artwork";

const Collections = () => {
  const { i18n, t } = useTranslation();
  const navigate = useNavigate();
  const currentLang = i18n.language as Language;

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const categories = getAllCategories();

  // Filtrage des œuvres
  const filteredArtworks = useMemo(() => {
    return artworks.filter((artwork) => {
      const translation =
        artwork.translations[currentLang] || artwork.translations.fr;

      // Filtre par catégorie
      const categoryMatch =
        selectedCategory === "all" || artwork.category === selectedCategory;

      // Filtre par recherche
      const searchMatch =
        searchQuery === "" ||
        translation.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        translation.description
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        translation.origin.toLowerCase().includes(searchQuery.toLowerCase());

      return categoryMatch && searchMatch;
    });
  }, [searchQuery, selectedCategory, currentLang]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            {t("collections.title")}
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            {t("collections.subtitle")}
          </p>
        </div>

        {/* Barre de recherche */}
        <div className="mb-6">
          <input
            type="text"
            placeholder={t("collections.searchPlaceholder")}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Filtres par catégorie */}
        <div className="mb-8 flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedCategory("all")}
            className={`px-4 py-2 rounded-full transition ${
              selectedCategory === "all"
                ? "bg-blue-600 text-white"
                : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700"
            }`}
          >
            {t("collections.all")} ({artworks.length})
          </button>
          {categories.map((category) => {
            const count = artworks.filter(
              (a) => a.category === category
            ).length;
            return (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full transition ${
                  selectedCategory === category
                    ? "bg-blue-600 text-white"
                    : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700"
                }`}
              >
                {category} ({count})
              </button>
            );
          })}
        </div>

        {/* Résultats */}
        <div className="mb-4 text-gray-600 dark:text-gray-400">
          {filteredArtworks.length} {t("collections.results")}
        </div>

        {/* Grille d'œuvres */}
        {filteredArtworks.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredArtworks.map((artwork) => {
              const translation =
                artwork.translations[currentLang] || artwork.translations.fr;

              return (
                <div
                  key={artwork.id}
                  onClick={() => navigate(`/artwork/${artwork.id}`)}
                  className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden cursor-pointer transform transition hover:scale-105 hover:shadow-xl"
                >
                  {/* Image */}
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={artwork.imageUrl}
                      alt={translation.title}
                      className="w-full h-full object-cover"
                    />
                    {artwork.featured && (
                      <span className="absolute top-2 right-2 px-3 py-1 bg-yellow-400 text-yellow-900 text-xs font-semibold rounded-full">
                        ⭐ {t("collections.featured")}
                      </span>
                    )}
                  </div>

                  {/* Contenu */}
                  <div className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                        {translation.title}
                      </h3>
                      <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-300 text-xs rounded-full whitespace-nowrap ml-2">
                        {artwork.category}
                      </span>
                    </div>

                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">
                      {translation.origin}
                    </p>

                    <p className="text-gray-700 dark:text-gray-300 text-sm line-clamp-3">
                      {translation.description}
                    </p>

                    <div className="mt-4 flex items-center text-blue-600 dark:text-blue-400 text-sm font-semibold">
                      {t("collections.viewDetails")} →
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-xl text-gray-500 dark:text-gray-400">
              {t("collections.noResults")}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Collections;
