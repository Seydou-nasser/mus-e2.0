import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useTranslation } from "react-i18next";
import {
  BrowserMultiFormatReader,
  type IScannerControls,
} from "@zxing/browser";
import { BarcodeFormat, DecodeHintType } from "@zxing/library";
import { getArtworkByQRCode } from "../data/artworkService";
import { Camera, X, Lightbulb, Smartphone, Ruler } from "lucide-react";

const QRScanner = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [controls, setControls] = useState<IScannerControls | null>(null);
  const [scanning, setScanning] = useState(false);
  const [error, setError] = useState<string>("");

  // Formats de barcode supportés
  const enabledFormats = [
    BarcodeFormat.QR_CODE,
    BarcodeFormat.EAN_13,
    BarcodeFormat.EAN_8,
    BarcodeFormat.CODE_128,
    BarcodeFormat.CODE_39,
  ];

  const handleScanBarcode = async () => {
    setScanning(true);
    setError("");

    // Vérifier les permissions de la caméra
    try {
      const permissionStatus = await navigator.permissions.query({
        name: "camera" as PermissionName,
      });
      if (permissionStatus.state === "denied") {
        setError(t("qrScanner.cameraError"));
        setScanning(false);
        return;
      }
    } catch {
      console.log("Permission check not supported, continuing...");
    }

    const hints = new Map();
    hints.set(DecodeHintType.POSSIBLE_FORMATS, enabledFormats);

    // Nettoyer les ressources précédentes
    if (controls) {
      controls.stop();
      setControls(null);
    }

    const videoElement = document.getElementById(
      "barcode-video"
    ) as HTMLVideoElement;
    if (videoElement?.srcObject) {
      const tracks = (videoElement.srcObject as MediaStream).getTracks();
      tracks.forEach((track) => track.stop());
      videoElement.srcObject = null;
    }

    const codeReader = new BrowserMultiFormatReader(hints);

    try {
      const ctrls = await codeReader.decodeFromVideoDevice(
        undefined,
        "barcode-video",
        (result) => {
          if (result) {
            const scannedText = result.getText();
            console.log("QR Code détecté:", scannedText);

            let qrCode: string;

            // Vérifier si c'est une URL complète
            if (scannedText.startsWith("http")) {
              // Extraire l'ID de l'œuvre depuis l'URL
              const urlParts = scannedText.split("/artwork/");
              if (urlParts.length > 1) {
                qrCode = urlParts[1]; // Récupérer la partie après /artwork/
              } else {
                setError(t("qrScanner.invalidQR"));
                setTimeout(() => setError(""), 3000);
                return;
              }
            } else {
              // Utiliser directement le code QR
              qrCode = scannedText;
            }

            const artwork = getArtworkByQRCode(qrCode);

            if (artwork) {
              // Arrêter le scanner
              if (ctrls) {
                ctrls.stop();
                if (videoElement?.srcObject) {
                  const tracks = (
                    videoElement.srcObject as MediaStream
                  ).getTracks();
                  tracks.forEach((track) => track.stop());
                  videoElement.srcObject = null;
                }
              }
              // Rediriger vers la page de l'œuvre
              navigate(`/artwork/${artwork.id}`);
            } else {
              setError(t("qrScanner.artworkNotFound"));
              setTimeout(() => setError(""), 3000);
            }
          }
        }
      );
      setControls(ctrls);
    } catch (err) {
      console.error("Erreur démarrage scanner:", err);

      // Messages d'erreur plus spécifiques
      if (err instanceof Error) {
        if (
          err.message.includes("Permission denied") ||
          err.message.includes("permission")
        ) {
          setError(t("qrScanner.cameraError"));
        } else if (
          err.message.includes("NotFoundError") ||
          err.message.includes("not found")
        ) {
          setError(t("qrScanner.noCamera"));
        } else if (err.message.includes("NotAllowedError")) {
          setError(t("qrScanner.cameraDenied"));
        } else {
          setError(t("qrScanner.cameraError"));
        }
      } else {
        setError(t("qrScanner.cameraError"));
      }

      setScanning(false);
    }
  };

  const handleStopScan = () => {
    setScanning(false);

    if (controls) {
      controls.stop();
      setControls(null);
    }

    const videoElement = document.getElementById(
      "barcode-video"
    ) as HTMLVideoElement;
    if (videoElement?.srcObject) {
      const mediaStream = videoElement.srcObject as MediaStream;
      const tracks = mediaStream.getTracks();
      tracks.forEach((track) => track.stop());
      videoElement.srcObject = null;
    }
  };

  useEffect(() => {
    return () => {
      handleStopScan();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-900 dark:text-white flex items-center justify-center gap-3">
          <Camera className="text-[#D17842]" size={32} />
          {t("qrScanner.title")}
        </h1>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <p className="text-center text-gray-600 dark:text-gray-300 mb-6">
            {t("qrScanner.instruction")}
          </p>

          {error && (
            <div className="mb-4 p-4 bg-red-100 dark:bg-red-900/20 border border-red-400 dark:border-red-800 text-red-700 dark:text-red-400 rounded-lg">
              {error}
            </div>
          )}

          {/* Vidéo scanner */}
          <div className="relative w-full rounded-lg overflow-hidden bg-black min-h-64">
            <video id="barcode-video" className="w-full" autoPlay playsInline />
            {scanning && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="border-4 border-[#D17842] w-64 h-64 animate-pulse"></div>
              </div>
            )}
            {!scanning && !error && (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-900 bg-opacity-75">
                <button
                  onClick={handleScanBarcode}
                  className="px-8 py-4 bg-[#D17842] text-white rounded-lg hover:bg-[#B86432] transition flex items-center gap-2 text-lg font-semibold"
                >
                  <Camera size={24} />
                  Démarrer le scan
                </button>
              </div>
            )}
          </div>

          <div className="mt-6 text-center space-y-3">
            {scanning && (
              <button
                onClick={handleStopScan}
                className="px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition flex items-center gap-2 mx-auto"
              >
                <X size={20} />
                Arrêter le scan
              </button>
            )}
            <button
              onClick={() => {
                handleStopScan();
                navigate("/");
              }}
              className="px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition flex items-center gap-2 mx-auto"
            >
              <X size={20} />
              {t("qrScanner.cancel")}
            </button>
          </div>
        </div>

        {/* Guide visuel */}
        <div className="mt-8 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6">
          <h3 className="font-semibold text-blue-900 dark:text-blue-300 mb-3">
            {t("qrScanner.tips.title")}
          </h3>
          <ul className="space-y-3 text-sm text-blue-800 dark:text-blue-400">
            <li className="flex items-center gap-2">
              <Lightbulb size={16} className="text-[#D17842]" />
              {t("qrScanner.tips.light")}
            </li>
            <li className="flex items-center gap-2">
              <Smartphone size={16} className="text-[#D17842]" />
              {t("qrScanner.tips.stable")}
            </li>
            <li className="flex items-center gap-2">
              <Ruler size={16} className="text-[#D17842]" />
              {t("qrScanner.tips.distance")}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default QRScanner;
