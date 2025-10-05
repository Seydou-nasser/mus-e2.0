import React, { useState } from "react";
import { useParams, Link } from "react-router";
import { useTranslation } from "react-i18next";
import { artworks } from "../data/artworks";
import { QRCodeSVG } from "qrcode.react";

/**
 * Composant ArtworkDetail - Affiche les détails d'une œuvre d'art
 *
 * Logique d'affichage des onglets média :
 * - Le bouton "Vidéo" s'affiche seulement si artwork.media.video existe
 * - Le contenu vidéo s'affiche seulement si l'onglet est actif ET que la vidéo existe
 * - Même logique pour l'audio
 * - Seules les œuvres avec id "002" (Statuette Yoruba) et "004" (Tambour Djembe) ont des vidéos
 */
const ArtworkDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { t, i18n } = useTranslation();
  const [activeTab, setActiveTab] = useState<'description' | 'audio' | 'video'>('description');

  const artwork = artworks.find((art) => art.id === id);

  if (!artwork) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">{t('artworkNotFound')}</h1>
          <Link
            to="/"
            className="inline-block bg-amber-600 text-white px-6 py-3 rounded-md hover:bg-amber-700 transition-colors"
          >
            {t('backToHome')}
          </Link>
        </div>
      </div>
    );
  }

  const currentLang = i18n.language as keyof typeof artwork.title;

  const qrUrl = `${window.location.origin}/artwork/${artwork.id}`;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Back button */}
        <div className="mb-6">
          <Link
            to="/"
            className="inline-flex items-center text-amber-600 hover:text-amber-700 transition-colors"
          >
            ← {t('backToHome')}
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Image and media */}
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <img
                src={artwork.media.image}
                alt={artwork.title[currentLang]}
                className="w-full h-96 object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = "/assets/placeholder.svg";
                }}
              />
            </div>

            {/* Media tabs */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex space-x-1 mb-4">
                <button
                  onClick={() => setActiveTab('description')}
                  className={`px-4 py-2 rounded-md transition-colors ${
                    activeTab === 'description'
                      ? 'bg-amber-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {t('description')}
                </button>
                {/* Bouton audio - s'affiche seulement si l'œuvre a un audio défini dans les données */}
                {artwork.media.audio && (
                  <button
                    onClick={() => setActiveTab('audio')}
                    className={`px-4 py-2 rounded-md transition-colors ${
                      activeTab === 'audio'
                        ? 'bg-amber-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {t('audio')}
                  </button>
                )}
                {/* Bouton vidéo - s'affiche seulement si l'œuvre a une vidéo définie dans les données */}
                {artwork.media.video && (
                  <button
                    onClick={() => setActiveTab('video')}
                    className={`px-4 py-2 rounded-md transition-colors ${
                      activeTab === 'video'
                        ? 'bg-amber-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {t('video')}
                  </button>
                )}
              </div>

              <div className="min-h-[200px]">
                {activeTab === 'description' && (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">{t('description')}</h3>
                    <p className="text-gray-700 leading-relaxed">
                      {artwork.description[currentLang]}
                    </p>
                  </div>
                )}

                {activeTab === 'audio' && artwork.media.audio && (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">{t('audio')}</h3>
                    <audio controls className="w-full">
                      <source src={artwork.media.audio} type="audio/mpeg" />
                      Votre navigateur ne supporte pas l'élément audio.
                    </audio>
                  </div>
                )}

                {/* Contenu de l'onglet vidéo - s'affiche seulement si l'onglet vidéo est actif ET que l'œuvre a une vidéo */}
                {activeTab === 'video' && artwork.media.video && (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">{t('video')}</h3>
                    {/* Gestion d'erreur si le fichier vidéo n'existe pas */}
                    <video
                      controls
                      className="w-full rounded-md"
                      onError={(e) => {
                        const target = e.target as HTMLVideoElement;
                        target.style.display = 'none';
                        const errorMsg = document.createElement('p');
                        errorMsg.textContent = 'Vidéo non disponible';
                        errorMsg.className = 'text-red-500 text-center py-4';
                        target.parentNode?.appendChild(errorMsg);
                      }}
                    >
                      <source src={artwork.media.video} type="video/mp4" />
                      Votre navigateur ne supporte pas l'élément vidéo.
                    </video>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Details and QR */}
          <div className="space-y-6">
            {/* Title and description */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                {artwork.title[currentLang]}
              </h1>

              {/* History */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">{t('history')}</h3>
                <ul className="space-y-2">
                  {artwork.history.map((item, index) => (
                    <li key={index} className="text-gray-700 flex items-start">
                      <span className="text-amber-600 mr-2">•</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* QR Code */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">{t('scanQR')}</h3>
              <div className="flex justify-center">
                <QRCodeSVG
                  value={qrUrl}
                  size={200}
                  level="H"
                  includeMargin={true}
                  className="border border-gray-200 rounded-md p-2"
                />
              </div>
              <p className="text-sm text-gray-600 text-center mt-4">
                {t('scanQR')} pour accéder directement à cette œuvre
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArtworkDetail;
