import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import fr from "./language/fr.json";
import en from "./language/en.json";
import wo from "./language/wo.json";

const fallbackLanguage = "fr";
const resources = {
  en: {
    translation: en,
  },
  fr: {
    translation: fr,
  },
  wo: {
    translation: wo,
  },
};

i18next
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: resources,
    fallbackLng: fallbackLanguage,
    debug: true,
    interpolation: {
      escapeValue: false,
    },
  });
export default i18next;
