import { Link } from "react-router";
import { useTranslation } from "react-i18next";
import { useState } from "react";

export default function Header() {
  const { t, i18n } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <header className="bg-gradient-to-r from-amber-800 to-amber-900 shadow-lg">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center text-white text-lg md:text-2xl font-bold hover:text-amber-200 transition-colors">
            <img
              src="/assets/logoMCN.png"
              alt="Logo Musée des Civilisations Noires"
              className="h-8 w-8 mr-3"
            />
            {t('museumTitle')}
          </Link>

          <div className="flex items-center space-x-4 md:space-x-6">
            <ul className="hidden md:flex space-x-6">
              <li>
                <Link to="/" className="text-white hover:text-amber-200 transition-colors">
                  {t('home')}
                </Link>
              </li>
              <li>
                <Link to="/collections" className="text-white hover:text-amber-200 transition-colors">
                  {t('collections')}
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-white hover:text-amber-200 transition-colors">
                  {t('about')}
                </Link>
              </li>
            </ul>

            {/* Hamburger menu button for mobile */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden text-white hover:text-amber-200 transition-colors"
              aria-label="Toggle menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
              </svg>
            </button>

            <div className="relative">
              <select
                onChange={(e) => changeLanguage(e.target.value)}
                value={i18n.language}
                className="bg-white text-gray-800 px-3 py-1 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm"
                aria-label="Select language"
              >
                <option value="fr">{t('french')}</option>
                <option value="en">{t('english')}</option>
                <option value="wo">{t('wolof')}</option>
              </select>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4">
            <ul className="flex flex-col space-y-2">
              <li>
                <Link
                  to="/"
                  className="block text-white hover:text-amber-200 transition-colors text-sm py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {t('home')}
                </Link>
              </li>
              <li>
                <Link
                  to="/collections"
                  className="block text-white hover:text-amber-200 transition-colors text-sm py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {t('collections')}
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="block text-white hover:text-amber-200 transition-colors text-sm py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {t('about')}
                </Link>
              </li>
            </ul>
          </div>
        )}
      </nav>
    </header>
  );
}
