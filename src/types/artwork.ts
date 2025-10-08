export interface ArtworkTranslation {
  title: string;
  description: string;
  period: string;
  origin: string;
  culturalContext: string;
  audioUrl?: string;
}

export interface Artwork {
  id: string;
  qrCode: string;
  imageUrl: string;
  imageGallery?: string[];
  videoUrl?: string;
  category: string;
  translations: {
    fr: ArtworkTranslation;
    en: ArtworkTranslation;
    wo: ArtworkTranslation;
  };
  createdAt: string;
  featured?: boolean;
}

export type Language = "fr" | "en" | "wo";
