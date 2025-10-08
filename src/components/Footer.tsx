import { useTranslation } from "react-i18next";
import { Link } from "react-router";
import { Mail, Phone, MapPin, ExternalLink, Link2 } from "lucide-react";

export default function Footer() {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          {/* About Section */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-3 mb-3">
              <img
                src="/assets/logoMCN.png"
                alt="Logo MCN"
                className="w-10 h-10 object-contain"
              />
              <div>
                <h3 className="text-xl font-bold bg-gradient-to-r from-orange-400 to-[#D17842] bg-clip-text text-transparent">
                  Musée 2.0
                </h3>
                <p className="text-xs text-gray-400">Musée 2.0</p>
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-3">
              {t("footer.description")}
            </p>
            <div className="flex space-x-3">
              <a
                href="https://senstartup.com"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-[#D17842] hover:bg-[#B85F30] rounded-lg text-sm font-medium transition-all duration-200 flex items-center space-x-2 shadow-md hover:scale-105"
              >
                <ExternalLink size={16} />
                <span>Senstartup</span>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-3 flex items-center">
              <Link2 size={18} className="mr-2 text-[#D17842]" />
              {t("footer.links")}
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/"
                  className="text-gray-400 hover:text-white transition-colors duration-200 text-sm flex items-center group"
                >
                  <span className="mr-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    →
                  </span>
                  {t("nav.home")}
                </Link>
              </li>
              <li>
                <Link
                  to="/collections"
                  className="text-gray-400 hover:text-white transition-colors duration-200 text-sm flex items-center group"
                >
                  <span className="mr-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    →
                  </span>
                  {t("nav.collections")}
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="text-gray-400 hover:text-white transition-colors duration-200 text-sm flex items-center group"
                >
                  <span className="mr-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    →
                  </span>
                  {t("nav.about")}
                </Link>
              </li>
              <li>
                <Link
                  to="/scan"
                  className="text-gray-400 hover:text-white transition-colors duration-200 text-sm flex items-center group"
                >
                  <span className="mr-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    →
                  </span>
                  {t("nav.scan")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-3 flex items-center">
              <Phone size={18} className="mr-2 text-[#D17842]" />
              {t("footer.contact")}
            </h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start space-x-3 text-gray-400 hover:text-white transition-colors duration-200">
                <Mail size={16} className="mt-1 flex-shrink-0" />
                <a href="mailto:contact@senstartup.com">
                  contact@senstartup.com
                </a>
              </li>
              <li className="flex items-start space-x-3 text-gray-400 hover:text-white transition-colors duration-200">
                <Phone size={16} className="mt-1 flex-shrink-0" />
                <a href="tel:+221771061917">+221 77 106 19 17</a>
              </li>
              <li className="flex items-start space-x-3 text-gray-400">
                <MapPin size={16} className="mt-1 flex-shrink-0" />
                <span>Dakar, Sénégal</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700 mb-4" />

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center space-y-3 md:space-y-0">
          <div className="text-center md:text-left">
            <p className="text-gray-400 text-sm">
              © {currentYear} Musée des Civilisations Noires
            </p>
            <p className="text-gray-500 text-xs mt-1">{t("footer.rights")}</p>
          </div>

          <div className="flex items-center space-x-2 text-sm">
            <span className="text-gray-400">{t("footer.hackathon")}</span>
            <div className="px-3 py-1 bg-[#D17842] rounded-full text-white font-semibold text-xs shadow-md">
              Dakar Slush'D 2025
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
