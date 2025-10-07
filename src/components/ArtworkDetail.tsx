import { useParams, useNavigate, Link } from "react-router";
import { useTranslation } from "react-i18next";
import { getArtworkById } from "../data/artworkService";
import type { Language } from "../types/artwork";
import AudioPlayer from "./AudioPlayer";

const ArtworkDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { i18n, t } = useTranslation();
  const navigate = useNavigate();

  const currentLang = i18n.language as Language;
  const artwork = id ? getArtworkById(id) : undefined;

  if (!artwork) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            {t("artwork.notFound")}
          </h2>
          <button
            onClick={() => navigate("/")}
            className="px-6 py-2 bg-[#D17842] text-white rounded-lg hover:bg-[#B85F30] transition"
          >
            {t("artwork.backToHome")}
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
        className="mb-6 flex items-center text-[#D17842] dark:text-[#E89563] hover:text-[#B85F30] dark:hover:text-[#D17842] no-underline transition"
      >
        ← {t("artwork.backToHome")}
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
          <span className="px-3 py-1 bg-[#D17842]/10 dark:bg-[#E89563]/10 text-[#D17842] dark:text-[#E89563] rounded-full text-sm font-semibold">
            {artwork.category}
          </span>
        </div>

        <div className="border-t border-gray-200 dark:border-gray-700 pt-4 mt-4">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
            {t("artwork.description")}
          </h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
            {translation.description}
          </p>
        </div>

        <div className="border-t border-gray-200 dark:border-gray-700 pt-4 mt-4">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
            {t("artwork.culturalContext")}
          </h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            {translation.culturalContext}
          </p>
        </div>

        {/* Informations historiques */}
        <div className="border-t border-gray-200 dark:border-gray-700 pt-4 mt-4">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <span>📜</span> {t("artwork.history")}
          </h2>
          <div className="space-y-4">
            {/* Période de création */}
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 mt-2 rounded-full bg-[#D17842] flex-shrink-0"></div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white">
                  {t("artwork.creationPeriod")}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  {translation.period} ({artwork.createdAt})
                </p>
              </div>
            </div>

            {/* Origine géographique */}
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 mt-2 rounded-full bg-[#D17842] flex-shrink-0"></div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white">
                  {t("artwork.origin")}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  {translation.origin}
                </p>
              </div>
            </div>

            {/* Catégorie */}
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 mt-2 rounded-full bg-[#D17842] flex-shrink-0"></div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white">
                  {t("artwork.category")}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  {artwork.category}
                </p>
              </div>
            </div>

            {/* QR Code */}
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 mt-2 rounded-full bg-[#D17842] flex-shrink-0"></div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white">
                  {t("artwork.identificationCode")}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm font-mono">
                  {artwork.qrCode}
                </p>
              </div>
            </div>
          </div>
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
              <span>🎥</span> {t("artwork.videoExplanation")}
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
            {t("artwork.gallery")}
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
