import { Link, useLocation } from "react-router";
import { useTranslation } from "react-i18next";
import { useState, useEffect, useRef } from "react";
import { Menu, X, Globe } from "lucide-react";

export default function Header() {
  const { t, i18n } = useTranslation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const menuRef = useRef<HTMLDivElement>(null);

  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
  };

  // Fermer le menu en cliquant à l'extérieur
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMobileMenuOpen(false);
      }
    };

    if (mobileMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [mobileMenuOpen]);

  const isActive = (path: string) => location.pathname === path;

  const navLinkClasses = (path: string) =>
    `px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
      isActive(path)
        ? "bg-white/20 text-white shadow-md backdrop-blur-sm"
        : "text-white/90 hover:bg-white/10 hover:text-white"
    }`;

  const languageButtonClasses = (lang: string) =>
    `px-3 py-1.5 rounded-md text-xs font-semibold transition-all duration-200 ${
      i18n.language === lang
        ? "bg-white text-blue-600 shadow-md"
        : "bg-white/20 text-white hover:bg-white/30"
    }`;

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 shadow-lg backdrop-blur-md">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="text-3xl transform group-hover:scale-110 transition-transform duration-200">
                🏛️
              </div>
              <div className="flex flex-col">
                <h1 className="text-white text-lg md:text-xl font-bold leading-tight">
                  Musée 2.0
                </h1>
                <span className="text-white/80 text-xs hidden md:block">
                  Museum of Black Civilizations
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-1">
              <Link to="/" className={navLinkClasses("/")}>
                {t("nav.home")}
              </Link>
              <Link
                to="/collections"
                className={navLinkClasses("/collections")}
              >
                {t("nav.collections")}
              </Link>
              <Link to="/about" className={navLinkClasses("/about")}>
                {t("nav.about")}
              </Link>
              <Link
                to="/scan"
                className="ml-2 px-5 py-2 rounded-lg text-sm font-semibold bg-white text-blue-600 hover:bg-blue-50 transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105"
              >
                📱 {t("nav.scan")}
              </Link>

              {/* Language Selector */}
              <div className="ml-4 flex items-center space-x-2 bg-white/10 rounded-lg p-1 backdrop-blur-sm">
                <Globe size={16} className="text-white/70 ml-2" />
                <button
                  onClick={() => changeLanguage("fr")}
                  className={languageButtonClasses("fr")}
                >
                  FR
                </button>
                <button
                  onClick={() => changeLanguage("en")}
                  className={languageButtonClasses("en")}
                >
                  EN
                </button>
                <button
                  onClick={() => changeLanguage("wo")}
                  className={languageButtonClasses("wo")}
                >
                  WO
                </button>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-white hover:bg-white/20 transition-colors duration-200"
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </nav>
      </header>

      {/* Overlay sombre pour mobile */}
      {mobileMenuOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/50 z-30 backdrop-blur-sm"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Menu mobile */}
      {mobileMenuOpen && (
        <div
          ref={menuRef}
          className="md:hidden fixed top-16 left-0 right-0 z-40 bg-white dark:bg-gray-900 shadow-2xl border-b border-gray-200 dark:border-gray-700"
        >
          <div className="px-4 pt-4 pb-6 space-y-3">
            {/* Navigation Links */}
            <div className="grid grid-cols-2 gap-3">
              <Link
                to="/"
                onClick={() => setMobileMenuOpen(false)}
                className={`px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 text-center ${
                  isActive("/")
                    ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md"
                    : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                }`}
              >
                🏠 {t("nav.home")}
              </Link>
              <Link
                to="/collections"
                onClick={() => setMobileMenuOpen(false)}
                className={`px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 text-center ${
                  isActive("/collections")
                    ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md"
                    : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                }`}
              >
                🎨 {t("nav.collections")}
              </Link>
              <Link
                to="/about"
                onClick={() => setMobileMenuOpen(false)}
                className={`px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 text-center ${
                  isActive("/about")
                    ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md"
                    : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                }`}
              >
                ℹ️ {t("nav.about")}
              </Link>
              <Link
                to="/scan"
                onClick={() => setMobileMenuOpen(false)}
                className="px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700 shadow-md text-center"
              >
                📱 {t("nav.scan")}
              </Link>
            </div>

            {/* Language Selector Mobile */}
            <div className="pt-2">
              <div className="flex items-center justify-center space-x-2 mb-2 text-gray-600 dark:text-gray-400 text-sm">
                <Globe size={16} />
                <span>{t("nav.language") || "Language"}</span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                <button
                  onClick={() => {
                    changeLanguage("fr");
                    setMobileMenuOpen(false);
                  }}
                  className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
                    i18n.language === "fr"
                      ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md"
                      : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300"
                  }`}
                >
                  🇫🇷 FR
                </button>
                <button
                  onClick={() => {
                    changeLanguage("en");
                    setMobileMenuOpen(false);
                  }}
                  className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
                    i18n.language === "en"
                      ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md"
                      : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300"
                  }`}
                >
                  🇬🇧 EN
                </button>
                <button
                  onClick={() => {
                    changeLanguage("wo");
                    setMobileMenuOpen(false);
                  }}
                  className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
                    i18n.language === "wo"
                      ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md"
                      : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300"
                  }`}
                >
                  🇸🇳 WO
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Spacer pour compenser le header fixe */}
      <div className="h-16" />
    </>
  );
}
