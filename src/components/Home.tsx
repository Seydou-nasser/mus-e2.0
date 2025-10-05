import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router";
import { artworks } from "../data/artworks";
import ArtworkCard from "./ArtworkCard";

const Home: React.FC = () => {
  const { t } = useTranslation();

  // Get featured artworks (first 3)
  const featuredArtworks = artworks.slice(0, 3);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-amber-900 via-amber-800 to-amber-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black bg-opacity-20"></div>
        <div className="relative container mx-auto px-4 py-20 lg:py-32">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              {t('museumTitle')}
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-amber-100 leading-relaxed">
              Scannez les QR codes des œuvres pour accéder à des descriptions complètes en français, anglais et wolof
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/collections"
                className="inline-block bg-white text-amber-900 px-8 py-4 rounded-lg hover:bg-amber-50 transition-all duration-300 font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                {t('exploreCollection')}
              </Link>
              <Link
                to="/about"
                className="inline-block bg-amber-700 text-white px-8 py-4 rounded-lg hover:bg-amber-600 transition-all duration-300 font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                {t('learnMore')}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* QR Code Feature Highlight */}
      <section className="bg-gradient-to-r from-amber-600 to-amber-700 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="w-24 h-24 bg-white rounded-lg flex items-center justify-center mx-auto mb-6">
              <svg className="w-12 h-12 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M12 12l4-4m-4 4l4 4M4 12h4.01M4 12l4-4m-4 4l4 4" />
              </svg>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Scan QR Code</h2>
            <p className="text-xl text-amber-100 mb-8">
              Scannez les QR codes présents sur les œuvres du musée pour accéder instantanément
              aux descriptions complètes, audios et vidéos explicatives.
            </p>
            <div className="bg-white bg-opacity-10 rounded-lg p-6 backdrop-blur-sm">
              <p className="text-lg text-amber-600">
                📱 Disponible sur mobile et PC • 🌍 3 langues • 🎧 Audio intégré • 📹 Vidéo explicative
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-amber-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl font-bold text-white">{artworks.length}</span>
              </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">{t('uniqueArtworks')}</h3>
              <p className="text-gray-600">{t('inDigitalCollection')}</p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-amber-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-white">🌍</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{t('multilingual')}</h3>
              <p className="text-gray-600">{t('languages')}</p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-amber-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-white">🎧</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{t('accessibility')}</h3>
              <p className="text-gray-600">{t('integratedAudioVideo')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Artworks */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">{t('featuredArtworks')}</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              {t('featuredArtworksDesc')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {featuredArtworks.map((artwork) => (
              <ArtworkCard key={artwork.id} artwork={artwork} />
            ))}
          </div>

          <div className="text-center">
            <Link
              to="/collections"
              className="inline-block bg-amber-600 text-white px-8 py-4 rounded-lg hover:bg-amber-700 transition-colors font-semibold text-lg shadow-lg hover:shadow-xl"
            >
              {t('seeFullCollection')}
            </Link>
          </div>
        </div>
      </section>

      {/* About Preview */}
      <section className="py-20 bg-gradient-to-r from-gray-900 to-gray-800 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-6">{t('ourMission')}</h2>
            <p className="text-xl mb-8 text-gray-300 leading-relaxed">
              Le Musée des Civilisations Noires s'engage à célébrer et préserver le patrimoine
              artistique et culturel des civilisations africaines et de la diaspora, rendant
              accessible à tous l'histoire fascinante des peuples noirs.
            </p>
            <Link
              to="/about"
              className="inline-block bg-amber-600 text-white px-8 py-4 rounded-lg hover:bg-amber-700 transition-colors font-semibold text-lg shadow-lg hover:shadow-xl"
            >
              {t('learnMore')}
            </Link>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-amber-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            {t('readyToExplore')}
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            {t('exploreDesc')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/collections"
              className="inline-block bg-amber-600 text-white px-8 py-4 rounded-lg hover:bg-amber-700 transition-colors font-semibold text-lg shadow-lg hover:shadow-xl"
            >
              {t('exploreCollections')}
            </Link>
            <Link
              to="/about"
              className="inline-block bg-gray-800 text-white px-8 py-4 rounded-lg hover:bg-gray-700 transition-colors font-semibold text-lg shadow-lg hover:shadow-xl"
            >
              {t('aboutMuseum')}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
