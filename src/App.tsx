import "./App.css";
import { Route, Routes } from "react-router";
import Home from "./components/Home";
import Collections from "./components/Collections";
import About from "./components/About";
import { I18nextProvider } from "react-i18next";
import i18n from "./translation/i18n";
import Layout from "./components/layout";

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
      </Routes>
    </I18nextProvider>
  );
}

export default App;
