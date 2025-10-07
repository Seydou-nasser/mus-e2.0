import { Link, useLocation } from "react-router";
import { useTranslation } from "react-i18next";
import { useState, useEffect, useRef } from "react";
import { Menu, X, Globe, QrCode, Home, Palette, Info } from "lucide-react";

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
        ? "bg-white text-[#D17842] shadow-md"
        : "bg-white/20 text-white hover:bg-white/30"
    }`;

  return (
    <>
      {/* <header className=""> */}
      <nav className="sticky md:top-4 top-0 z-50">
        <div className="max-w-6xl bg-white/80 dark:bg-gray-900/80 backdrop-blur md:border md:border-[#D17842] md:rounded-2xl px-4 mx-auto flex h-16 items-center justify-between">
          {/* Logo et nom */}
          <Link
            to="/"
            className="flex items-center text-white text-lg md:text-2xl font-bold hover:text-amber-200 transition-colors"
          >
            <img
              src="/assets/logoMCN.png"
              alt="Logo Musée des Civilisations Noires"
              className="h-8 w-8 mr-3"
            />
            <span className="hidden md:inline">
              Museum of Black Civilizations
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            <Link to="/" className={navLinkClasses("/")}>
              {t("nav.home")}
            </Link>
            <Link to="/collections" className={navLinkClasses("/collections")}>
              {t("nav.collections")}
            </Link>
            <Link to="/about" className={navLinkClasses("/about")}>
              {t("nav.about")}
            </Link>
            <Link
              to="/scan"
              className="ml-2 px-5 py-2 rounded-lg text-sm font-semibold bg-white text-[#D17842] hover:bg-orange-50 transition-all duration-200 shadow-md hover:shadow-lg hover:scale-105 flex items-center gap-2"
            >
              <QrCode size={16} /> {t("nav.scan")}
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
      {/* </header> */}
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
                className={`px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 text-center flex items-center justify-center gap-2 ${
                  isActive("/")
                    ? "bg-[#D17842] text-white shadow-md"
                    : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                }`}
              >
                <Home size={16} /> {t("nav.home")}
              </Link>
              <Link
                to="/collections"
                onClick={() => setMobileMenuOpen(false)}
                className={`px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 text-center flex items-center justify-center gap-2 ${
                  isActive("/collections")
                    ? "bg-[#D17842] text-white shadow-md"
                    : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                }`}
              >
                <Palette size={16} /> {t("nav.collections")}
              </Link>
              <Link
                to="/about"
                onClick={() => setMobileMenuOpen(false)}
                className={`px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 text-center flex items-center justify-center gap-2 ${
                  isActive("/about")
                    ? "bg-[#D17842] text-white shadow-md"
                    : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                }`}
              >
                <Info size={16} /> {t("nav.about")}
              </Link>
              <Link
                to="/scan"
                onClick={() => setMobileMenuOpen(false)}
                className="px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 bg-[#D17842] text-white hover:bg-[#B85F30] shadow-md text-center flex items-center justify-center gap-2"
              >
                <QrCode size={16} /> {t("nav.scan")}
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
                      ? "bg-[#D17842] text-white shadow-md"
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
                      ? "bg-[#D17842] text-white shadow-md"
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
                      ? "bg-[#D17842] text-white shadow-md"
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
    </>
  );
}
