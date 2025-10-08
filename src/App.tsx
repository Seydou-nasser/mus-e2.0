import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { I18nextProvider } from "react-i18next";
import i18n from "./translation/i18n";
import { ThemeProvider } from "./composants/ThemeProvider";
import { ContexteIAProvider } from "./composants/ContexteIA";
import LayoutPrincipal from "./composants/LayoutPrincipal";
import PageAccueil from "./composants/PageAccueil";
import PageOeuvre from "./composants/PageOeuvre";
import PageEnDeveloppement from "./composants/PageEnDeveloppement";
import BoutonIAGlobal from "./composants/BoutonIAGlobal";
import ChatbotInterface from "./composants/ChatbotInterface";
import { Palette, Map, Eye, Info } from "lucide-react";

/**
 * Application principale du Musée des Civilisations Noires 2.0
 * Avec routage complet pour les œuvres
 */
function ApplicationMusee() {
  return (
    <BrowserRouter>
      <I18nextProvider i18n={i18n}>
        <ThemeProvider>
          <ContexteIAProvider>
          <Routes>
            {/* Page d'accueil */}
            <Route path="/" element={
              <LayoutPrincipal>
                <PageAccueil />
              </LayoutPrincipal>
            } />
            
            {/* Page spécifique d'une œuvre */}
            <Route path="/oeuvre/:id" element={<PageOeuvre />} />
            
            {/* Routes pour autres pages avec PageEnDeveloppement */}
            <Route path="/collections" element={
              <LayoutPrincipal>
                <PageEnDeveloppement
                  titre="Collections Révolutionnaires"
                  description="Explorez les trésors culturels africains à travers une expérience immersive et interactive"
                  icone={Palette}
                  couleur="from-blue-500 to-purple-600"
                  fonctionnalites={{
                    terminees: [
                      "Interface utilisateur responsive",
                      "Système de filtres avancés",
                      "Recherche intelligente"
                    ],
                    enCours: [
                      "Intégration AR pour les œuvres",
                      "Audio guide multilingue",
                      "Système de recommandations IA"
                    ],
                    aVenir: [
                      "Visite virtuelle 360°",
                      "Reconnaissance d'images",
                      "Partage social"
                    ]
                  }}
                  dateEstimee="Mars 2024"
                  priorite="haute"
                />
              </LayoutPrincipal>
            } />
            
            <Route path="/parcours" element={
              <LayoutPrincipal>
                <PageEnDeveloppement
                  titre="Parcours Interactif"
                  description="Découvrez l'histoire africaine à travers des parcours gamifiés et personnalisés"
                  icone={Map}
                  couleur="from-green-500 to-teal-600"
                  fonctionnalites={{
                    terminees: [
                      "Système de gamification",
                      "Badges et récompenses",
                      "Progression utilisateur"
                    ],
                    enCours: [
                      "Parcours thématiques",
                      "Quiz interactifs",
                      "Système de points"
                    ],
                    aVenir: [
                      "Mode multijoueur",
                      "Défis communautaires",
                      "Certificats de participation"
                    ]
                  }}
                  dateEstimee="Avril 2024"
                  priorite="moyenne"
                />
              </LayoutPrincipal>
            } />
            
            <Route path="/realite-augmentee" element={
              <LayoutPrincipal>
                <PageEnDeveloppement
                  titre="Réalité Augmentée"
                  description="Vivez une expérience immersive unique avec la réalité augmentée"
                  icone={Eye}
                  couleur="from-orange-500 to-red-600"
                  fonctionnalites={{
                    terminees: [
                      "Scanner QR intégré",
                      "Interface AR de base",
                      "Détection d'objets"
                    ],
                    enCours: [
                      "Modèles 3D interactifs",
                      "Animations AR avancées",
                      "Reconnaissance d'images"
                    ],
                    aVenir: [
                      "AR collaborative",
                      "Effets visuels avancés",
                      "Intégration IA"
                    ]
                  }}
                  dateEstimee="Mai 2024"
                  priorite="haute"
                />
              </LayoutPrincipal>
            } />
            
            <Route path="/a-propos" element={
              <LayoutPrincipal>
                <PageEnDeveloppement
                  titre="À Propos du Musée"
                  description="Découvrez l'histoire et la mission du Musée des Civilisations Noires"
                  icone={Info}
                  couleur="from-purple-500 to-pink-600"
                  fonctionnalites={{
                    terminees: [
                      "Informations du musée",
                      "Historique et mission",
                      "Équipe et partenaires"
                    ],
                    enCours: [
                      "Galerie photos",
                      "Vidéos institutionnelles",
                      "Témoignages"
                    ],
                    aVenir: [
                      "Visite virtuelle",
                      "Documentaires interactifs",
                      "Archives numériques"
                    ]
                  }}
                  dateEstimee="Février 2024"
                  priorite="basse"
                />
              </LayoutPrincipal>
            } />
          </Routes>
          
          {/* Bouton IA Global - Vraiment flottant et visible partout */}
          <BoutonIAGlobal />
          
          {/* Interface Chatbot Révolutionnaire */}
          <ChatbotInterface />
          </ContexteIAProvider>
        </ThemeProvider>
      </I18nextProvider>
    </BrowserRouter>
  );
}

export default ApplicationMusee;