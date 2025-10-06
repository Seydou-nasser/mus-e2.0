import artworksData from "./artworks.json";
import type { Artwork } from "../types/artwork";

// Cast the JSON data to the Artwork type
export const artworks: Artwork[] = artworksData as Artwork[];

// Helper function to get an artwork by ID
export const getArtworkById = (id: string): Artwork | undefined => {
  return artworks.find((artwork) => artwork.id === id);
};

// Helper function to get an artwork by QR code
export const getArtworkByQRCode = (qrCode: string): Artwork | undefined => {
  return artworks.find((artwork) => artwork.qrCode === qrCode);
};

// Helper function to get featured artworks
export const getFeaturedArtworks = (): Artwork[] => {
  return artworks.filter((artwork) => artwork.featured);
};

// Helper function to get artworks by category
export const getArtworksByCategory = (category: string): Artwork[] => {
  return artworks.filter((artwork) => artwork.category === category);
};

// Helper function to get all categories
export const getAllCategories = (): string[] => {
  return Array.from(new Set(artworks.map((artwork) => artwork.category)));
};
