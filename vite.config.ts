import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // Charger les variables d'environnement
  const env = loadEnv(mode, process.cwd(), '');
  
  return {
    plugins: [react(), tailwindcss()],
    
    // Configuration des variables d'environnement
    define: {
      'import.meta.env': env
    },
  
  // Optimisations pour la production
  build: {
    target: 'esnext',
    minify: 'esbuild',
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          router: ['react-router'],
          motion: ['framer-motion'],
          i18n: ['i18next', 'react-i18next']
        }
      }
    }
  },
  
  // Configuration du serveur de développement
  server: {
    port: 5173,
    host: true,
    open: true
  },
  
  // Optimisations de performance
  optimizeDeps: {
    include: ['react', 'react-dom', 'framer-motion', 'react-router']
  }
  };
});
