import "./App.css";
import { Route, Routes } from "react-router";
import Home from "./components/Home";
import Collections from "./components/Collections";
import About from "./components/About";
import QRScanner from "./components/QRScanner";
import ArtworkDetail from "./components/ArtworkDetail";
import AIAssistant from "./components/AIAssistant";
import { I18nextProvider } from "react-i18next";
import i18n from "./translation/i18n";
import Layout from "./components/Layout";

function App() {
  return (
    <I18nextProvider i18n={i18n}>
      <Routes>
        <Route
          path="/"
          element={
            <Layout>
              <Home />
            </Layout>
          }
        />
        <Route
          path="/collections"
          element={
            <Layout>
              <Collections />
            </Layout>
          }
        />
        <Route
          path="/about"
          element={
            <Layout>
              <About />
            </Layout>
          }
        />
        <Route
          path="/scan"
          element={
            <Layout>
              <QRScanner />
            </Layout>
          }
        />
        <Route
          path="/artwork/:id"
          element={
            <Layout>
              <ArtworkDetail />
            </Layout>
          }
        />
      </Routes>
      {/* Assistant IA disponible sur toutes les pages */}
      <AIAssistant />
    </I18nextProvider>
  );
}

export default App;
