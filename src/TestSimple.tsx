import React from 'react';

const TestSimple: React.FC = () => {
  return (
    <div style={{ 
      padding: '20px', 
      backgroundColor: '#f0f0f0', 
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column'
    }}>
      <h1 style={{ color: '#333', marginBottom: '20px' }}>
        🎉 Application Fonctionnelle !
      </h1>
      <p style={{ color: '#666', fontSize: '18px' }}>
        Le serveur Vite fonctionne correctement sur le port 5173
      </p>
      <div style={{ 
        marginTop: '20px', 
        padding: '10px 20px', 
        backgroundColor: '#4CAF50', 
        color: 'white', 
        borderRadius: '5px' 
      }}>
        ✅ React + TypeScript + Vite
      </div>
    </div>
  );
};

export default TestSimple;
