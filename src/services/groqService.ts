import Groq from "groq-sdk";
import artworksData from "../data/artworks.json";
import type { Artwork } from "../types/artwork";

const artworks = artworksData as Artwork[];

// Configuration Groq
const GROQ_API_KEY = import.meta.env.VITE_GROQ_API_KEY || "";

// Initialiser le client Groq
const groq = new Groq({
  apiKey: GROQ_API_KEY,
  dangerouslyAllowBrowser: true, // Pour utiliser Groq côté client
});

// Contexte du musée pour l'IA
const getMuseumContext = (language: string = "fr") => {
  const artworksContext = artworks
    .map((artwork) => {
      const translation =
        artwork.translations[language as keyof typeof artwork.translations] ||
        artwork.translations.fr;
      return `
- ${translation.title} (${artwork.qrCode})
  Catégorie: ${artwork.category}
  Origine: ${translation.origin}
  Période: ${translation.period}
  Description: ${translation.description}
  Contexte culturel: ${translation.culturalContext}
`;
    })
    .join("\n");

  return `Tu es un guide virtuel expert du Musée des Civilisations Noires à Dakar, Sénégal.

COLLECTIONS DU MUSÉE:
${artworksContext}

INSTRUCTIONS:
- Réponds en ${
    language === "fr" ? "français" : language === "en" ? "anglais" : "wolof"
  }
- Sois précis et éducatif
- Si on te pose une question sur une œuvre spécifique, utilise les informations ci-dessus
- Si l'œuvre n'est pas dans la collection, dis-le poliment
- Partage des anecdotes culturelles intéressantes
- Encourage les visiteurs à explorer le musée
- Reste concis (2-3 phrases maximum par réponse)`;
};

export interface ChatMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

// Fonction pour envoyer un message à Groq
export const sendMessageToGroq = async (
  messages: ChatMessage[],
  language: string = "fr"
): Promise<string> => {
  try {
    // Vérifier si la clé API est configurée
    if (!GROQ_API_KEY) {
      return language === "fr"
        ? "⚠️ Configuration requise: Veuillez ajouter votre clé API Groq dans le fichier .env (VITE_GROQ_API_KEY)"
        : "⚠️ Configuration required: Please add your Groq API key in .env file (VITE_GROQ_API_KEY)";
    }

    // Ajouter le contexte du musée comme message système
    const systemMessage: ChatMessage = {
      role: "system",
      content: getMuseumContext(language),
    };

    // Créer le chat completion
    const chatCompletion = await groq.chat.completions.create({
      messages: [systemMessage, ...messages],
      model: "llama-3.3-70b-versatile", // Modèle rapide et performant
      temperature: 0.7,
      max_tokens: 500,
      top_p: 1,
      stream: false,
    });

    return (
      chatCompletion.choices[0]?.message?.content ||
      "Désolé, je n'ai pas pu générer une réponse."
    );
  } catch (error) {
    console.error("Erreur Groq API:", error);

    if (error instanceof Error) {
      if (
        error.message.includes("401") ||
        error.message.includes("authentication")
      ) {
        return language === "fr"
          ? "❌ Erreur d'authentification: Vérifiez votre clé API Groq"
          : "❌ Authentication error: Check your Groq API key";
      }
      if (error.message.includes("rate limit")) {
        return language === "fr"
          ? "⏳ Limite de requêtes atteinte. Veuillez réessayer dans quelques instants."
          : "⏳ Rate limit reached. Please try again in a few moments.";
      }
    }

    return language === "fr"
      ? "❌ Une erreur s'est produite. Veuillez réessayer."
      : "❌ An error occurred. Please try again.";
  }
};

// Fonction pour le streaming (optionnel, pour une meilleure UX)
export const streamMessageFromGroq = async (
  messages: ChatMessage[],
  language: string = "fr",
  onChunk: (chunk: string) => void
): Promise<void> => {
  try {
    if (!GROQ_API_KEY) {
      onChunk(
        language === "fr"
          ? "⚠️ Configuration requise: Ajoutez VITE_GROQ_API_KEY dans .env"
          : "⚠️ Configuration required: Add VITE_GROQ_API_KEY in .env"
      );
      return;
    }

    const systemMessage: ChatMessage = {
      role: "system",
      content: getMuseumContext(language),
    };

    const stream = await groq.chat.completions.create({
      messages: [systemMessage, ...messages],
      model: "llama-3.3-70b-versatile",
      temperature: 0.7,
      max_tokens: 500,
      stream: true,
    });

    for await (const chunk of stream) {
      const content = chunk.choices[0]?.delta?.content || "";
      if (content) {
        onChunk(content);
      }
    }
  } catch (error) {
    console.error("Erreur streaming Groq:", error);
    onChunk(
      language === "fr" ? "❌ Erreur de streaming" : "❌ Streaming error"
    );
  }
};
