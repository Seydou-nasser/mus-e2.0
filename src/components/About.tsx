import React from "react";
import { useTranslation } from "react-i18next";

const About: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="w-full">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              {t('about')}
            </h1>
            <p className="text-xl text-gray-600">
              Découvrez l'histoire et la mission du Musée des Civilisations Noires
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            {/* Mission */}
            <div className="bg-white rounded-lg shadow-md p-8">
              <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Notre Mission</h2>
              <p className="text-gray-700 leading-relaxed">
                Le Musée des Civilisations Noires, l'un des plus grands espaces culturels du Sénégal et d'Afrique,
                abrite une richesse patrimoniale inestimable. Dans le cadre du Dakar Slush'D (09-10 octobre 2025),
                Senstartup organise ce hackathon exclusif pour repenser l'expérience de visite grâce au digital
                et démocratiser l'accès aux contenus culturels du musée.
              </p>
            </div>

            {/* Histoire */}
            <div className="bg-white rounded-lg shadow-md p-8">
              <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Notre Histoire</h2>
              <p className="text-gray-700 leading-relaxed">
                Fondé en 2024, notre musée numérique représente l'évolution des institutions culturelles
                traditionnelles vers l'ère digitale. Nous combinons la richesse des collections physiques
                avec les possibilités infinies du numérique pour rendre l'art accessible à tous.
              </p>
            </div>
          </div>

          {/* Collections */}
          <div className="bg-white rounded-lg shadow-md p-8 mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Nos Collections</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-amber-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-lg">A</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Art Africain</h3>
                <p className="text-gray-600 text-sm">
                  Masques, sculptures et objets rituels des différentes régions d'Afrique
                </p>
              </div>

              <div className="text-center">
                <div className="w-12 h-12 bg-amber-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-lg">T</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Textiles</h3>
                <p className="text-gray-600 text-sm">
                  Tissus traditionnels, kente, bogolan et autres merveilles textiles
                </p>
              </div>

              <div className="text-center">
                <div className="w-12 h-12 bg-amber-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-lg">M</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Musique</h3>
                <p className="text-gray-600 text-sm">
                  Instruments traditionnels et histoire de la musique africaine
                </p>
              </div>
            </div>
          </div>

          {/* Contact */}
          <div className="bg-gradient-to-r from-amber-800 to-amber-900 rounded-lg shadow-md p-8 text-white text-center">
            <h2 className="text-3xl font-bold mb-4">Visitez-nous</h2>
            <p className="text-amber-100 mb-6 text-lg">
              Découvrez nos collections en ligne et plongez dans l'univers fascinant des civilisations noires
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/"
                className="inline-block bg-white text-amber-900 px-6 py-3 rounded-md hover:bg-amber-50 transition-colors font-medium"
              >
                {t('exploreCollection')}
              </a>
              <a
                href="/collections"
                className="inline-block bg-amber-700 text-white px-6 py-3 rounded-md hover:bg-amber-600 transition-colors font-medium"
              >
                {t('seeAllArtworks')}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
