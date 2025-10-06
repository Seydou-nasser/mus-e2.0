import { Link } from "react-router";
import { useTranslation } from "react-i18next";
import { useState } from "react";

export default function Header() {
  const { t, i18n } = useTranslation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
  };

  return (
    <header className="bg-gradient-to-r from-blue-600 to-purple-600 shadow-lg">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-2xl">🏛️</span>
            <h1 className="text-white text-xl md:text-2xl font-bold">
              Musée 2.0
            </h1>
          </Link>

          {/* Desktop Navigation */}
          <ul className="hidden md:flex space-x-6 items-center">
            <li>
              <Link
                to="/"
                className="text-white hover:text-blue-200 transition font-medium"
              >
                {t("nav.home")}
              </Link>
            </li>
            <li>
              <Link
                to="/collections"
                className="text-white hover:text-blue-200 transition font-medium"
              >
                {t("nav.collections")}
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                className="text-white hover:text-blue-200 transition font-medium"
              >
                {t("nav.about")}
              </Link>
            </li>
            <li>
              <Link
                to="/scan"
                className="bg-white text-blue-600 px-4 py-2 rounded-lg font-semibold hover:bg-blue-50 transition"
              >
                📱 {t("nav.scan")}
              </Link>
            </li>

            {/* Language Selector */}
            <li className="flex space-x-2">
              <button
                onClick={() => changeLanguage("fr")}
                className={`px-3 py-1 rounded transition ${
                  i18n.language === "fr"
                    ? "bg-white text-blue-600 font-bold"
                    : "bg-blue-500 text-white hover:bg-blue-400"
                }`}
              >
                FR
              </button>
              <button
                onClick={() => changeLanguage("en")}
                className={`px-3 py-1 rounded transition ${
                  i18n.language === "en"
                    ? "bg-white text-blue-600 font-bold"
                    : "bg-blue-500 text-white hover:bg-blue-400"
                }`}
              >
                EN
              </button>
              <button
                onClick={() => changeLanguage("wo")}
                className={`px-3 py-1 rounded transition ${
                  i18n.language === "wo"
                    ? "bg-white text-blue-600 font-bold"
                    : "bg-blue-500 text-white hover:bg-blue-400"
                }`}
              >
                WO
              </button>
            </li>
          </ul>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-white text-2xl"
          >
            {mobileMenuOpen ? "✕" : "☰"}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 space-y-3">
            <Link
              to="/"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-white hover:text-blue-200 transition font-medium py-2"
            >
              {t("nav.home")}
            </Link>
            <Link
              to="/collections"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-white hover:text-blue-200 transition font-medium py-2"
            >
              {t("nav.collections")}
            </Link>
            <Link
              to="/about"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-white hover:text-blue-200 transition font-medium py-2"
            >
              {t("nav.about")}
            </Link>
            <Link
              to="/scan"
              onClick={() => setMobileMenuOpen(false)}
              className="block bg-white text-blue-600 px-4 py-2 rounded-lg font-semibold hover:bg-blue-50 transition text-center"
            >
              📱 {t("nav.scan")}
            </Link>

            {/* Mobile Language Selector */}
            <div className="flex space-x-2 pt-2">
              <button
                onClick={() => {
                  changeLanguage("fr");
                  setMobileMenuOpen(false);
                }}
                className={`flex-1 px-3 py-2 rounded transition ${
                  i18n.language === "fr"
                    ? "bg-white text-blue-600 font-bold"
                    : "bg-blue-500 text-white"
                }`}
              >
                FR
              </button>
              <button
                onClick={() => {
                  changeLanguage("en");
                  setMobileMenuOpen(false);
                }}
                className={`flex-1 px-3 py-2 rounded transition ${
                  i18n.language === "en"
                    ? "bg-white text-blue-600 font-bold"
                    : "bg-blue-500 text-white"
                }`}
              >
                EN
              </button>
              <button
                onClick={() => {
                  changeLanguage("wo");
                  setMobileMenuOpen(false);
                }}
                className={`flex-1 px-3 py-2 rounded transition ${
                  i18n.language === "wo"
                    ? "bg-white text-blue-600 font-bold"
                    : "bg-blue-500 text-white"
                }`}
              >
                WO
              </button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
