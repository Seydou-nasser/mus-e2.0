import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Volume2, VolumeX, Loader2, Lightbulb, Globe } from "lucide-react";

interface AudioPlayerProps {
  text: string;
  lang: "fr" | "en" | "wo";
  audioUrl?: string;
}

const AudioPlayer = ({ text, lang, audioUrl }: AudioPlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [useTTS, setUseTTS] = useState(!audioUrl);
  const { t } = useTranslation();

  // Mapping des langues
  const langMap = {
    fr: "fr-FR",
    en: "en-US",
    wo: "fr-FR", // Wolof utilise français comme fallback
  };

  const speakText = () => {
    if (!window.speechSynthesis) {
      alert(t("audioPlayer.browserNotSupportedTTS"));
      return;
    }

    // Arrêter la lecture en cours
    if (isPlaying) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
      return;
    }

    setIsLoading(true);
    setIsPlaying(true);

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = langMap[lang];
    utterance.rate = 0.9; // Vitesse légèrement ralentie
    utterance.pitch = 1.0;
    utterance.volume = 1.0;

    // Événements
    utterance.onstart = () => {
      setIsLoading(false);
    };

    utterance.onend = () => {
      setIsPlaying(false);
      setIsLoading(false);
    };

    utterance.onerror = () => {
      setIsPlaying(false);
      setIsLoading(false);
      alert(t("audioPlayer.audioError"));
    };

    window.speechSynthesis.speak(utterance);
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  return (
    <div className="border-t border-gray-200 dark:border-gray-700 pt-4 mt-4">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
        <Volume2 size={24} className="text-[#D17842]" />
        {t("audioPlayer.title")}
      </h2>

      <div className="space-y-4">
        {/* Lecteur MP3 si disponible */}
        {audioUrl && !useTTS && (
          <div>
            <audio controls className="w-full">
              <source src={audioUrl} type="audio/mpeg" />
              {t("audioPlayer.browserNotSupported")}
            </audio>
            <button
              onClick={() => setUseTTS(true)}
              className="mt-2 text-sm text-gray-600 dark:text-gray-400 hover:text-[#D17842] transition cursor-pointer"
            >
              {t("audioPlayer.useTTSInstead")}
            </button>
          </div>
        )}

        {/* Synthèse vocale (Web Speech API) */}
        {(useTTS || !audioUrl) && (
          <div>
            <button
              onClick={speakText}
              disabled={isLoading}
              className={`w-full px-6 py-3 rounded-lg font-semibold flex items-center justify-center gap-3 transition-all ${
                isPlaying
                  ? "bg-red-600 hover:bg-red-700 text-white"
                  : "bg-[#D17842] hover:bg-[#B85F30] text-white"
              } ${
                isLoading ? "opacity-50 cursor-not-allowed" : "hover:scale-102"
              }`}
            >
              {isLoading ? (
                <>
                  <Loader2 size={20} className="animate-spin" />
                  {t("audioPlayer.loading")}
                </>
              ) : isPlaying ? (
                <>
                  <VolumeX size={20} />
                  {t("audioPlayer.stopPlayback")}
                </>
              ) : (
                <>
                  <Volume2 size={20} />
                  {t("audioPlayer.listenWithTTS")}
                </>
              )}
            </button>

            <div className="mt-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <p className="text-xs text-blue-800 dark:text-blue-300 flex items-center gap-2">
                <Lightbulb size={14} className="text-[#D17842]" />
                <strong>{t("audioPlayer.demoMode")}</strong>
              </p>
            </div>

            {audioUrl && (
              <button
                onClick={() => setUseTTS(false)}
                className="mt-2 text-sm text-gray-600 dark:text-gray-400 hover:text-[#D17842] transition"
              >
                {t("audioPlayer.backToAudioPlayer")}
              </button>
            )}
          </div>
        )}

        {/* Info langue */}
        <div className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-2">
          <Globe size={14} className="text-[#D17842]" />
          {t("audioPlayer.language")}{" "}
          {lang === "fr"
            ? t("audioPlayer.french")
            : lang === "en"
            ? t("audioPlayer.english")
            : t("audioPlayer.wolof")}
        </div>
      </div>
    </div>
  );
};

export default AudioPlayer;
