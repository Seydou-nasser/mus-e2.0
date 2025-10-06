import { useTranslation } from "react-i18next";
import { Link } from "react-router";

export default function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="bg-gray-900 text-white py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-6">
          {/* About */}
          <div>
            <h3 className="text-xl font-bold mb-3">🏛️ Musée 2.0</h3>
            <p className="text-gray-400 text-sm">{t("footer.description")}</p>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-lg font-semibold mb-3">{t("footer.links")}</h3>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li>
                <Link to="/" className="hover:text-white transition">
                  {t("nav.home")}
                </Link>
              </li>
              <li>
                <Link to="/collections" className="hover:text-white transition">
                  {t("nav.collections")}
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-white transition">
                  {t("nav.about")}
                </Link>
              </li>
              <li>
                <Link to="/scan" className="hover:text-white transition">
                  {t("nav.scan")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-3">
              {t("footer.contact")}
            </h3>
            <div className="text-gray-400 text-sm space-y-2">
              <p>📧 contact@senstartup.com</p>
              <p>📞 +221 77 106 19 17</p>
              <p>📍 Dakar, Sénégal</p>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-gray-800 pt-6 text-center text-gray-400 text-sm">
          <p>
            &copy; 2025 Musée des Civilisations Noires - {t("footer.rights")}
          </p>
          <p className="mt-2">
            {t("footer.hackathon")}{" "}
            <span className="text-blue-400">Dakar Slush'D 2025</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
