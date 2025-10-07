import { useNavigate } from "react-router";
import { useTranslation } from "react-i18next";
import { getFeaturedArtworks } from "../data/artworkService";
import type { Language } from "../types/artwork";

const Home = () => {
  const { i18n, t } = useTranslation();
  const navigate = useNavigate();
  const currentLang = i18n.language as Language;
  const featuredArtworks = getFeaturedArtworks();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            {t("home.hero.title")}
          </h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90">
            {t("home.hero.subtitle")}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate("/scan")}
              className="px-8 py-4 bg-white text-[#D17842] rounded-lg font-semibold text-lg hover:bg-orange-50 transition hover:scale-105"
            >
              📱 {t("home.hero.scanButton")}
            </button>
            <button
              onClick={() => navigate("/collections")}
              className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-lg font-semibold text-lg hover:bg-white hover:text-[#D17842] transition"
            >
              🎨 {t("home.hero.exploreButton")}
            </button>
          </div>
        </div>
      </div>

      {/* Featured Artworks Section */}
      <div className="max-w-7xl mx-auto py-16 px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {t("home.featured.title")}
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            {t("home.featured.subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredArtworks.map((artwork) => {
            const translation =
              artwork.translations[currentLang] || artwork.translations.fr;

            return (
              <div
                key={artwork.id}
                onClick={() => navigate(`/artwork/${artwork.id}`)}
                className="group bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden cursor-pointer transform transition hover:scale-105 hover:shadow-2xl"
              >
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={artwork.imageUrl}
                    alt={translation.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition duration-300"
                  />
                  <div className="absolute top-2 right-2 px-3 py-1 bg-[#D17842] text-white text-xs font-semibold rounded-full shadow-md">
                    ⭐ {t("home.featured.badge")}
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    {translation.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">
                    {translation.origin} • {translation.period}
                  </p>
                  <p className="text-gray-700 dark:text-gray-300 text-sm line-clamp-2 mb-4">
                    {translation.description}
                  </p>
                  <div className="flex items-center text-[#D17842] dark:text-[#E89563] font-semibold">
                    {t("home.featured.discover")} →
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="text-center mt-12">
          <button
            onClick={() => navigate("/collections")}
            className="px-8 py-3 bg-[#D17842] text-white rounded-lg font-semibold hover:bg-[#B85F30] transition hover:scale-105"
          >
            {t("home.featured.viewAll")}
          </button>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-white dark:bg-gray-800 py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-gray-900 dark:text-white mb-12">
            {t("home.features.title")}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="text-5xl mb-4">📱</div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                {t("home.features.scan.title")}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                {t("home.features.scan.description")}
              </p>
            </div>

            <div className="text-center p-6">
              <div className="text-5xl mb-4">🌍</div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                {t("home.features.multilingual.title")}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                {t("home.features.multilingual.description")}
              </p>
            </div>

            <div className="text-center p-6">
              <div className="text-5xl mb-4">🎧</div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                {t("home.features.audio.title")}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                {t("home.features.audio.description")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
