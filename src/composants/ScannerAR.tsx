import React from 'react';

interface ScannerARProps {
  onClose: () => void;
  onOeuvreDetectee: (oeuvre: any) => void;
}

const ScannerAR: React.FC<ScannerARProps> = ({ onClose, onOeuvreDetectee }) => {
  return <div>ScannerAR</div>;
};

export default ScannerAR;
