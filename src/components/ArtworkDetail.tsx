import { useParams, useNavigate, Link } from "react-router";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { getArtworkById } from "../data/artworkService";
import type { Language } from "../types/artwork";
import AudioPlayer from "./AudioPlayer";
import {
  Clock,
  X,
  MapPin,
  Calendar,
  Tag,
  QrCode,
  ArrowLeft,
  Play,
  Image as ImageIcon,
} from "lucide-react";

const ArtworkDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { i18n, t } = useTranslation();
  const navigate = useNavigate();

  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const currentLang = i18n.language as Language;
  const artwork = id ? getArtworkById(id) : undefined;

  const openImageModal = (imageUrl: string) => {
    setSelectedImage(imageUrl);
    setIsModalOpen(true);
  };

  const closeImageModal = () => {
    setIsModalOpen(false);
    setSelectedImage(null);
  };

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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      {/* Navigation Header */}
      <nav className="sticky top-0 z-40 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link
              to="/collections"
              className="flex items-center gap-2 text-[#D17842] dark:text-[#E89563] hover:text-[#B85F30] dark:hover:text-[#D17842] transition-colors group"
            >
              <ArrowLeft
                size={20}
                className="group-hover:-translate-x-1 transition-transform"
              />
              <span className="font-medium">{t("artwork.backToHome")}</span>
            </Link>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              {artwork.qrCode}
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="relative mb-12">
          <div className="aspect-[16/9] md:aspect-[21/9] rounded-2xl overflow-hidden shadow-2xl">
            <img
              src={artwork.imageUrl}
              alt={translation.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-4 md:p-8 text-white">
              <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
                <div className="max-w-full">
                  <h1 className="text-xl sm:text-2xl md:text-4xl lg:text-5xl font-bold mb-2 leading-tight break-words">
                    {translation.title}
                  </h1>
                  <p className="text-xs sm:text-sm md:text-xl text-gray-200 mb-2 md:mb-4">
                    {translation.origin} • {translation.period}
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 md:px-4 py-1.5 md:py-2 bg-[#D17842] text-white rounded-full text-xs md:text-sm font-semibold shadow-lg">
                    {artwork.category}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Description Card */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 hover:shadow-xl transition-shadow">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-[#D17842]/10 dark:bg-[#E89563]/10 rounded-xl">
                  <Tag
                    size={24}
                    className="text-[#D17842] dark:text-[#E89563]"
                  />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {t("artwork.description")}
                </h2>
              </div>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg">
                {translation.description}
              </p>
            </div>

            {/* Cultural Context Card */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 hover:shadow-xl transition-shadow">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-blue-500/10 rounded-xl">
                  <MapPin size={24} className="text-blue-500" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {t("artwork.culturalContext")}
                </h2>
              </div>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg">
                {translation.culturalContext}
              </p>
            </div>

            {/* Audio Player */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 hover:shadow-xl transition-shadow">
              <AudioPlayer
                text={translation.description}
                lang={currentLang}
                audioUrl={translation.audioUrl}
              />
            </div>

            {/* Video Section */}
            {artwork.videoUrl && (
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 hover:shadow-xl transition-shadow">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 bg-red-500/10 rounded-xl">
                    <Play size={24} className="text-red-500" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                    {t("artwork.videoExplanation")}
                  </h2>
                </div>

                <div className="aspect-video rounded-xl overflow-hidden bg-gray-900 shadow-inner">
                  {artwork.videoUrl.includes("youtube.com") ||
                  artwork.videoUrl.includes("youtu.be") ? (
                    <iframe
                      src={artwork.videoUrl}
                      className="w-full h-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      title={`Vidéo - ${translation.title}`}
                    />
                  ) : (
                    <video
                      className="w-full h-full"
                      controls
                      preload="metadata"
                      title={`Vidéo - ${translation.title}`}
                    >
                      <source src={artwork.videoUrl} type="video/mp4" />
                      Votre navigateur ne supporte pas la lecture de vidéos.
                    </video>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Historical Information Card */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-[#D17842]/10 dark:bg-[#E89563]/10 rounded-lg">
                  <Clock
                    size={20}
                    className="text-[#D17842] dark:text-[#E89563]"
                  />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  {t("artwork.history")}
                </h3>
              </div>
              <div className="space-y-4">
                <div className="flex items-start gap-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-700/50">
                  <Calendar
                    size={16}
                    className="text-[#D17842] mt-1 flex-shrink-0"
                  />
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white text-sm">
                      {t("artwork.creationPeriod")}
                    </p>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                      {translation.period} ({artwork.createdAt})
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-700/50">
                  <MapPin
                    size={16}
                    className="text-blue-500 mt-1 flex-shrink-0"
                  />
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white text-sm">
                      {t("artwork.origin")}
                    </p>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                      {translation.origin}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-700/50">
                  <Tag
                    size={16}
                    className="text-green-500 mt-1 flex-shrink-0"
                  />
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white text-sm">
                      {t("artwork.category")}
                    </p>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                      {artwork.category}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-700/50">
                  <QrCode
                    size={16}
                    className="text-purple-500 mt-1 flex-shrink-0"
                  />
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white text-sm">
                      {t("artwork.identificationCode")}
                    </p>
                    <p className="text-gray-600 dark:text-gray-400 text-sm font-mono">
                      {artwork.qrCode}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Gallery Section */}
        {artwork.imageGallery && artwork.imageGallery.length > 0 && (
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 hover:shadow-xl transition-shadow">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-3 bg-[#D17842]/10 dark:bg-[#E89563]/10 rounded-xl">
                <ImageIcon
                  size={24}
                  className="text-[#D17842] dark:text-[#E89563]"
                />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                {t("artwork.gallery")}
              </h2>
              <span className="text-sm text-gray-500 dark:text-gray-400 ml-auto">
                {artwork.imageGallery.length}{" "}
                {artwork.imageGallery.length === 1 ? "image" : "images"}
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {artwork.imageGallery.map((img, index) => (
                <div
                  key={index}
                  className="group relative aspect-square rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:scale-105"
                  onClick={() => openImageModal(img)}
                >
                  <img
                    src={img}
                    alt={`${translation.title} - ${index + 1}`}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                  <div className="absolute bottom-3 left-3 bg-black/60 text-white px-3 py-1 rounded-full text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {index + 1}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Enhanced Modal */}
      {isModalOpen && selectedImage && (
        <div
          className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={closeImageModal}
        >
          <div className="relative max-w-5xl max-h-full animate-in zoom-in-95 duration-300">
            <button
              onClick={closeImageModal}
              className="absolute -top-12 right-0 bg-white/10 hover:bg-white/20 text-white rounded-full p-3 backdrop-blur-sm transition-all hover:scale-110"
            >
              <X size={24} />
            </button>
            <img
              src={selectedImage}
              alt={translation.title}
              className="max-w-full max-h-full object-contain rounded-2xl shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ArtworkDetail;
