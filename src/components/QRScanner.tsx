import { useEffect, useRef, useState } from "react";
import { Html5Qrcode } from "html5-qrcode";
import { useNavigate } from "react-router";
import { useTranslation } from "react-i18next";
import { getArtworkByQRCode } from "../data/artworkService";

const QRScanner = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const scannerRef = useRef<Html5Qrcode | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const startScanner = async () => {
      try {
        const scanner = new Html5Qrcode("qr-reader");
        scannerRef.current = scanner;

        await scanner.start(
          { facingMode: "environment" },
          {
            fps: 10,
            qrbox: { width: 250, height: 250 },
          },
          (decodedText) => {
            console.log("QR Code détecté:", decodedText);

            const artwork = getArtworkByQRCode(decodedText);

            if (artwork) {
              // Arrêter le scanner
              scanner.stop().then(() => {
                // Rediriger vers la page de l'œuvre
                navigate(`/artwork/${artwork.id}`);
              });
            } else {
              setError(t("qrScanner.artworkNotFound"));
              setTimeout(() => setError(""), 3000);
            }
          },
          (errorMessage) => {
            // Erreurs de scan (normales, on les ignore)
            console.debug("Scan error:", errorMessage);
          }
        );

        setIsScanning(true);
      } catch (err) {
        console.error("Erreur démarrage scanner:", err);
        setError(t("qrScanner.cameraError"));
      }
    };

    startScanner();

    // Cleanup
    return () => {
      if (scannerRef.current && isScanning) {
        scannerRef.current
          .stop()
          .then(() => {
            console.log("Scanner arrêté");
          })
          .catch((err) => {
            console.error("Erreur arrêt scanner:", err);
          });
      }
    };
  }, [navigate, t, isScanning]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-900 dark:text-white">
          {t("qrScanner.title")}
        </h1>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <p className="text-center text-gray-600 dark:text-gray-300 mb-6">
            {t("qrScanner.instruction")}
          </p>

          {error && (
            <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
              {error}
            </div>
          )}

          <div
            id="qr-reader"
            className="w-full rounded-lg overflow-hidden"
          ></div>

          <div className="mt-6 text-center">
            <button
              onClick={() => navigate("/")}
              className="px-6 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition"
            >
              {t("qrScanner.cancel")}
            </button>
          </div>
        </div>

        {/* Guide visuel */}
        <div className="mt-8 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6">
          <h3 className="font-semibold text-blue-900 dark:text-blue-300 mb-3">
            {t("qrScanner.tips.title")}
          </h3>
          <ul className="space-y-2 text-sm text-blue-800 dark:text-blue-400">
            <li>✓ {t("qrScanner.tips.light")}</li>
            <li>✓ {t("qrScanner.tips.stable")}</li>
            <li>✓ {t("qrScanner.tips.distance")}</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default QRScanner;
