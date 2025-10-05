import { Link } from "react-router";
import { useTranslation } from "react-i18next";
import type { Artwork } from "../data/artworks";

interface ArtworkCardProps {
  artwork: Artwork;
}

export default function ArtworkCard({ artwork }: ArtworkCardProps) {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language as keyof typeof artwork.title;

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <div className="aspect-w-4 aspect-h-3 bg-gray-200">
        <img
          src={artwork.media.image}
          alt={artwork.title[currentLang]}
          className="w-full h-48 object-cover"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = "/assets/placeholder.svg";
          }}
        />
      </div>

      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
          {artwork.title[currentLang]}
        </h3>

        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
          {artwork.description[currentLang]}
        </p>

        <Link
          to={`/artwork/${artwork.id}`}
          className="inline-block bg-amber-600 text-white px-4 py-2 rounded-md hover:bg-amber-700 transition-colors text-sm font-medium"
        >
          {t('viewMore')}
        </Link>
      </div>
    </div>
  );
}
