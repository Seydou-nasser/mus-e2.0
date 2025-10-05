import { Link } from "react-router";
import { useTranslation } from "react-i18next";

export default function Header() {
  const { t, i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <header className="bg-gradient-to-r from-amber-800 to-amber-900 shadow-lg">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="text-white text-2xl font-bold hover:text-amber-200 transition-colors">
            {t('museumTitle')}
          </Link>

          <div className="flex items-center space-x-6">
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

            <div className="relative">
              <select
                onChange={(e) => changeLanguage(e.target.value)}
                value={i18n.language}
                className="bg-white text-gray-800 px-3 py-1 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm"
              >
                <option value="fr">{t('french')}</option>
                <option value="en">{t('english')}</option>
                <option value="wo">{t('wolof')}</option>
              </select>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        <div className="md:hidden mt-4">
          <ul className="flex space-x-4">
            <li>
              <Link to="/" className="text-white hover:text-amber-200 transition-colors text-sm">
                {t('home')}
              </Link>
            </li>
            <li>
              <Link to="/collections" className="text-white hover:text-amber-200 transition-colors text-sm">
                {t('collections')}
              </Link>
            </li>
            <li>
              <Link to="/about" className="text-white hover:text-amber-200 transition-colors text-sm">
                {t('about')}
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}
