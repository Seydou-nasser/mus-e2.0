import { useParams, useNavigate, Link } from "react-router";
import { useTranslation } from "react-i18next";
import { getArtworkById } from "../data/artworkService";
import type { Language } from "../types/artwork";
import AudioPlayer from "./AudioPlayer";

const ArtworkDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { i18n } = useTranslation();
  const navigate = useNavigate();

  const currentLang = i18n.language as Language;
  const artwork = id ? getArtworkById(id) : undefined;

  if (!artwork) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Œuvre non trouvée
          </h2>
          <button
            onClick={() => navigate("/")}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Retour à l'accueil
          </button>
        </div>
      </div>
    );
  }

  const translation =
    artwork.translations[currentLang] || artwork.translations.fr;

  return (
    <div className="bg-gray-50 dark:bg-gray-900 py-8 px-4">
      {/* Header avec bouton retour */}
      <Link
        to={"/"}
        className="mb-6 flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-400 no-underline"
      >
        ← Retour
      </Link>

      {/* Image principale */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden mb-6">
        <img
          src={artwork.imageUrl}
          alt={translation.title}
          className="w-full h-96 object-cover"
        />
      </div>

      {/* Informations */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              {translation.title}
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              {translation.origin} • {translation.period}
            </p>
          </div>
          <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-300 rounded-full text-sm">
            {artwork.category}
          </span>
        </div>

        <div className="border-t border-gray-200 dark:border-gray-700 pt-4 mt-4">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
            Description
          </h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
            {translation.description}
          </p>
        </div>

        <div className="border-t border-gray-200 dark:border-gray-700 pt-4 mt-4">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
            Contexte culturel
          </h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            {translation.culturalContext}
          </p>
        </div>

        {/* Audio player avec Web Speech API */}
        <AudioPlayer
          text={translation.description}
          lang={currentLang}
          audioUrl={translation.audioUrl}
        />

        {/* Video player */}
        {artwork.videoUrl && (
          <div className="border-t border-gray-200 dark:border-gray-700 pt-4 mt-4">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
              <span>🎥</span> Vidéo explicative
            </h2>
            <div className="aspect-video rounded-lg overflow-hidden bg-gray-900">
              <iframe
                src={artwork.videoUrl}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title={`Vidéo - ${translation.title}`}
              />
            </div>
          </div>
        )}
      </div>

      {/* Galerie d'images */}
      {artwork.imageGallery && artwork.imageGallery.length > 1 && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Galerie
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {artwork.imageGallery.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`${translation.title} - ${index + 1}`}
                className="w-full h-48 object-cover rounded-lg hover:opacity-75 transition cursor-pointer"
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ArtworkDetail;
