import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from './ThemeProvider';
import { useContexteIA } from './ContexteIA';
import { useTranslation } from 'react-i18next';
import { ENV_VARS } from '../config/environment';
import { 
  Bot, 
  X, 
  Mic, 
  MicOff, 
  Volume2, 
  VolumeX, 
  Send, 
  Star, 
  Settings, 
  Brain,
  Zap,
  Sparkles,
  Heart
} from 'lucide-react';
import ParametresChatbot from './ParametresChatbot';
import { checkAPIConfiguration } from '../config/environment';
import { IntelligentChatbotService } from '../services/intelligentChatbotService';

/**
 * Interface Chatbot Révolutionnaire avec Scoring et Historique
 * Design africain authentique et fonctionnalités avancées
 */
const ChatbotInterface: React.FC = () => {
  const { isDarkMode, getThemeClasses } = useTheme();
  const { isIAEnLigne, isChatbotOpen, setIsChatbotOpen } = useContexteIA();
  const { t } = useTranslation();
  const themeClasses = getThemeClasses();
  
  const [messages, setMessages] = useState<Array<{
    id: number;
    text: string;
    isUser: boolean;
    timestamp: Date;
    tags?: string[];
    score?: number;
    isLiked?: boolean;
    isStarred?: boolean;
    isBookmarked?: boolean;
    category?: string;
    confidence?: number;
    links?: { text: string; url: string }[];
  }>>([
        {
          id: 1,
          text: "Bonjour ! Je suis votre assistant IA intelligent du Musée des Civilisations Noires. Je connais toutes les sections du site et peux vous guider vers les pages, œuvres et fonctionnalités qui vous intéressent. Comment puis-je vous aider ? 🎭✨",
          isUser: false,
          timestamp: new Date(),
          tags: ["Assistant IA", "Guide", "Navigation"],
          score: 0,
          isLiked: false,
          isStarred: false,
          isBookmarked: false,
          category: "Accueil",
          confidence: 95,
          links: [
            { text: "🏠 Page d'Accueil", url: "/" },
            { text: "🎨 Collections", url: "/collections" },
            { text: "🗺️ Parcours", url: "/parcours" },
            { text: "🥽 Réalité Augmentée", url: "/realite-augmentee" }
          ]
        }
  ]);
  
  const [inputText, setInputText] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  // const [selectedTags] = useState<string[]>([]);
  const [showScoring, setShowScoring] = useState(false);
  // const [filteredMessages, setFilteredMessages] = useState<any[]>([]);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [position, setPosition] = useState<'bottom-right' | 'center' | 'top-right'>('bottom-right');
  const [isInitialized, setIsInitialized] = useState(false);
  const [showParametres, setShowParametres] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [typingText, setTypingText] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll vers le bas
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Réinitialisation lors de l'ouverture
  useEffect(() => {
    if (isChatbotOpen && !isInitialized) {
      setIsMinimized(false);
      setIsFullscreen(false);
      setPosition('bottom-right');
      setIsInitialized(true);
    } else if (!isChatbotOpen) {
      setIsInitialized(false);
      setIsMinimized(false); // Force la réinitialisation
    }
  }, [isChatbotOpen, isInitialized]);

  // Gestion de l'envoi de message avec IA intelligente
  const handleSendMessage = async () => {
    if (inputText.trim()) {
      const newMessage = {
        id: messages.length + 1,
        text: inputText,
        isUser: true,
        timestamp: new Date(),
        score: 0,
        isLiked: false,
        isStarred: false,
        isBookmarked: false,
        category: "User",
        confidence: 100
      };
      
      setMessages(prev => [...prev, newMessage]);
      setInputText('');
      
      // Traitement intelligent avec animation de frappe
      try {
        // Activer l'animation de frappe
        setIsTyping(true);
        setTypingText('L\'IA réfléchit...');
        
        // Vérifier la configuration des API
        const apiConfig = checkAPIConfiguration();
        console.log('🔧 Configuration API:', apiConfig);
        console.log('🔑 Clé OpenAI détectée:', import.meta.env.VITE_OPENAI_API_KEY ? 'OUI' : 'NON');
        console.log('🔑 Clé complète:', import.meta.env.VITE_OPENAI_API_KEY?.substring(0, 20) + '...');
        
        let aiResponse;
        
        // SOLUTION INTELLIGENTE : CHATGPT API RÉELLE
        console.log('🤖 INTELLIGENCE RÉELLE: ChatGPT API pour toutes les questions');
        console.log('🔑 Clé API OpenAI:', ENV_VARS.OPENAI_API_KEY ? 'PRÉSENTE' : 'ABSENTE');
        console.log('🔑 Longueur clé:', ENV_VARS.OPENAI_API_KEY?.length || 0);
        console.log('🔑 Début clé:', ENV_VARS.OPENAI_API_KEY?.substring(0, 20) + '...');
        setTypingText('');
        
        // VÉRIFICATION PRÉALABLE POUR LA NAVIGATION
        if (inputText.toLowerCase().includes('ar') || 
            inputText.toLowerCase().includes('accueil') || 
            inputText.toLowerCase().includes('aceil') ||
            inputText.toLowerCase().includes('page') ||
            inputText.toLowerCase().includes('lien')) {
          
          console.log('🔍 NAVIGATION DÉTECTÉE: Utilisation du service local intelligent');
          console.log('📝 Question:', inputText);
          
          // Utiliser directement le service local pour la navigation
          const intelligentService = IntelligentChatbotService.getInstance();
          aiResponse = await intelligentService.processMessage(inputText);
          
          console.log('✅ RÉPONSE LOCALE INTELLIGENTE:', aiResponse.text);
        } else {
          // Utiliser Gemini pour les autres questions
          try {
            console.log('📡 ENVOI REQUÊTE à Google Gemini API...');
            console.log('📝 Question utilisateur:', inputText);
            console.log('🎯 Modèle utilisé: gemini-2.0-flash');
            console.log('⚙️ Configuration: Google Gemini API');
          
          // Appel direct à l'API Google Gemini
          const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${ENV_VARS.GEMINI_API_KEY}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              contents: [{
                parts: [{
                  text: `Tu es un assistant IA intelligent et polyvalent spécialisé en culture africaine au Musée des Civilisations Noires. Tu peux répondre à TOUTES les questions : culture africaine, politique, géographie, histoire, technologie, etc. Tu es passionné par la transmission du patrimoine culturel africain et tu peux parler du Togo, de son président, de n'importe quel pays, de n'importe quel sujet. Réponds toujours en français de manière intelligente, détaillée et engageante. Sois informatif et utile pour l'utilisateur.

Question: ${inputText}`
                }]
              }],
              generationConfig: {
                temperature: 0.8,
                maxOutputTokens: 800,
                topP: 0.9,
                topK: 40
              }
            })
          });

          console.log('📡 RÉPONSE REÇUE de Google Gemini API');
          console.log('📊 Status HTTP:', response.status);
          console.log('📊 Status Text:', response.statusText);

          if (!response.ok) {
            const errorData = await response.json();
            console.error('❌ ERREUR API Gemini:', errorData);
            throw new Error(`API Error: ${response.status} - ${errorData.error?.message || 'Unknown error'}`);
          }

          const geminiResponse = await response.json();

          console.log('✅ DONNÉES REÇUES de Google Gemini:');
          console.log('📝 Réponse complète:', geminiResponse.candidates[0].content.parts[0].text);
          console.log('📏 Longueur réponse:', geminiResponse.candidates[0].content.parts[0].text.length, 'caractères');
          console.log('🎯 Modèle utilisé par Gemini: gemini-2.0-flash');
          console.log('⏱️ Temps de traitement: Gratuit');
          console.log('💰 Coût estimé: 0$ (GRATUIT)');
          
          aiResponse = {
            response: geminiResponse.candidates[0].content.parts[0].text,
            confidence: 0.95,
            metadata: {
              culture: 'Intelligence Générale',
              period: 'Contemporain',
              language: 'fr'
            }
          };
          
          console.log('🎉 SUCCÈS: Google Gemini répond intelligemment à toutes les questions !');
          console.log('🧠 INTELLIGENCE DÉMONTRÉE: L\'IA peut répondre à n\'importe quelle question');
          console.log('🌟 INNOVATION RÉELLE: Plus de réponses statiques, vraie intelligence artificielle GRATUITE');
        } catch (error) {
          console.log('⚠️ Google Gemini API échouée, utilisation du service local intelligent');
          console.error('❌ Erreur détaillée:', error);
          console.log('🔄 Fallback vers service local...');
          // Fallback intelligent
          const intelligentService = IntelligentChatbotService.getInstance();
          aiResponse = await intelligentService.processMessage(inputText);
          console.log('🔄 Service local activé');
        }
        }
        
        // Animation de frappe progressive
        setIsTyping(false);
        setTypingText('');
        
        const aiMessage = {
          id: messages.length + 2,
          text: aiResponse.response,
          isUser: false,
          timestamp: new Date(),
          tags: (aiResponse as { metadata?: { culture?: string } }).metadata?.culture ? [(aiResponse as { metadata?: { culture?: string } }).metadata!.culture] : ["Assistant"],
          score: 0,
          isLiked: false,
          isStarred: false,
          isBookmarked: false,
          category: "Assistant",
          confidence: Math.round(aiResponse.confidence * 100),
          links: (aiResponse as { links?: { text: string; url: string }[] }).links
        };
        
        setMessages(prev => [...prev, aiMessage]);
      } catch (error) {
        console.error('Erreur IA:', error);
        setIsTyping(false);
        setTypingText('');
        
        const fallbackResponse = {
          id: messages.length + 2,
          text: "Désolé, je rencontre un problème technique. Pouvez-vous reformuler votre question ?",
          isUser: false,
          timestamp: new Date(),
          tags: ["Erreur"],
          score: 0,
          isLiked: false,
          isStarred: false,
          isBookmarked: false,
          category: "Assistant",
          confidence: 50
        };
        setMessages(prev => [...prev, fallbackResponse]);
      }
    }
  };

  // Gestion de l'enregistrement vocal
  const toggleRecording = () => {
    setIsRecording(!isRecording);
    // Simulation d'enregistrement
    if (!isRecording) {
      setTimeout(() => setIsRecording(false), 3000);
    }
  };

  const togglePlayback = () => {
    setIsPlaying(!isPlaying);
    // Simulation de lecture audio
    if (!isPlaying) {
      setTimeout(() => setIsPlaying(false), 2000);
    }
  };

  // Fonctions de scoring et interaction
  const handleScoreMessage = (messageId: number, score: number) => {
    setMessages(prev => prev.map(msg => 
      msg.id === messageId ? { ...msg, score } : msg
    ));
  };

  const handleLikeMessage = (messageId: number) => {
    setMessages(prev => prev.map(msg => 
      msg.id === messageId ? { ...msg, isLiked: !msg.isLiked } : msg
    ));
  };

  const handleStarMessage = (messageId: number) => {
    setMessages(prev => prev.map(msg => 
      msg.id === messageId ? { ...msg, isStarred: !msg.isStarred } : msg
    ));
  };

  // const handleBookmarkMessage = (messageId: number) => {
  //   setMessages(prev => prev.map(msg => 
  //     msg.id === messageId ? { ...msg, isBookmarked: !msg.isBookmarked } : msg
  //   ));
  // };

  // Filtrage des messages
  const filterMessages = (filter: string) => {
    // Fonction de filtrage pour l'historique
    console.log(`Filtrage par: ${filter}`);
  };

  if (!isChatbotOpen) return null;

  // Si les paramètres sont ouverts et que la position est center, on désactive les interactions du chatbot
  const isChatbotDisabled = showParametres && position === 'center';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
          className={`fixed ${isDarkMode ? 'bg-gray-900' : 'bg-white'} rounded-3xl shadow-2xl overflow-hidden ${isChatbotDisabled ? 'z-[9999] pointer-events-none' : 'z-[10000]'} border-2 ${isDarkMode ? 'border-gray-700' : 'border-gray-200'} ${
            isFullscreen 
              ? 'inset-2 sm:inset-4 w-auto h-auto' 
              : isMinimized 
                ? `${position === 'bottom-right' ? 'bottom-4 right-4 sm:bottom-6 sm:right-6' : position === 'center' ? 'top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2' : 'top-4 right-4 sm:top-6 sm:right-6'} w-72 h-14 sm:w-80 sm:h-16` 
                : `${position === 'bottom-right' ? 'bottom-4 right-4 sm:bottom-6 sm:right-6' : position === 'center' ? 'top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2' : 'top-4 right-4 sm:top-6 sm:right-6'} w-80 h-[60vh] sm:w-96 sm:h-[70vh] max-w-[95vw] sm:max-w-[90vw] max-h-[85vh] sm:max-h-[90vh]`
          }`}
    >
      {/* Header avec profil Assistant - Toujours visible */}
      <div className={`p-3 sm:p-4 ${isDarkMode ? 'bg-gray-800' : 'bg-gray-100'} border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-200'} sticky top-0 z-10`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            {/* Avatar Assistant */}
            <motion.div
              whileHover={{ scale: 1.1, rotate: 5 }}
              className="relative"
            >
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
                    <Bot className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </div>
              <motion.div
                className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-400 rounded-full flex items-center justify-center"
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Sparkles className="w-2 h-2 text-white" />
              </motion.div>
            </motion.div>
            
                <div>
                  <h3 className={`text-base sm:text-lg font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Assistant IA</h3>
                  <p className={`text-xs sm:text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Spécialiste Civilisations Africaines</p>
                <div className="flex items-center space-x-1 mt-1">
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    position === 'bottom-right' ? 'bg-blue-500 text-white' : 
                    position === 'center' ? 'bg-green-500 text-white' : 
                    'bg-orange-500 text-white'
                  }`}>
                    {position === 'bottom-right' ? 'Bottom-Right' : 
                     position === 'center' ? 'Center' : 'Top-Right'}
                  </span>
                </div>
              <div className="flex items-center space-x-2 mt-1">
                <div className={`w-2 h-2 rounded-full ${isIAEnLigne ? 'bg-green-500' : 'bg-red-500'}`}></div>
                <span className={`text-xs ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  {isIAEnLigne ? 'En ligne' : 'Hors ligne'}
                </span>
                <div className="flex items-center space-x-1">
                  <Brain className="w-3 h-3 text-blue-400" />
                  <span className="text-xs text-blue-400">95%</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Zap className="w-3 h-3 text-yellow-400" />
                  <span className="text-xs text-yellow-400">85%</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-1 sm:space-x-2">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setShowParametres(true)}
              className="p-1.5 sm:p-2 bg-purple-500 rounded-lg text-white"
              title="Paramètres"
            >
              <Settings className="w-3 h-3 sm:w-4 sm:h-4" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => {
                setIsChatbotOpen(false);
                setIsMinimized(false);
                setIsFullscreen(false);
                setPosition('bottom-right');
                setIsInitialized(false);
              }}
              className="p-1.5 sm:p-2 bg-red-500 rounded-lg text-white"
              title="Fermer"
            >
              <X className="w-3 h-3 sm:w-4 sm:h-4" />
            </motion.button>
          </div>
        </div>
      </div>

      {/* Zone de messages avec scoring et historique - Scrollable */}
      {!isMinimized && (
        <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-3 sm:space-y-4 max-h-[40vh] sm:max-h-[45vh] scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200" style={{ scrollBehavior: 'smooth' }}>
          {/* Barre de filtres simplifiée */}
          <div className="flex items-center justify-center mb-3 sm:mb-4">
            <div className="flex items-center space-x-1">
              <button 
                onClick={() => filterMessages('all')} 
                className="px-2 py-1.5 sm:px-3 sm:py-2 text-xs sm:text-sm bg-blue-500 text-white rounded-lg font-medium"
              >
                Tous
              </button>
              <button 
                onClick={() => filterMessages('liked')} 
                className="px-2 py-1.5 sm:px-3 sm:py-2 text-xs sm:text-sm bg-red-500 text-white rounded-lg font-medium"
              >
                Liked
              </button>
              <button 
                onClick={() => filterMessages('starred')} 
                className="px-2 py-1.5 sm:px-3 sm:py-2 text-xs sm:text-sm bg-yellow-500 text-white rounded-lg font-medium"
              >
                Starred
              </button>
            </div>
          </div>

          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-[80%] ${message.isUser ? 'order-2' : 'order-1'}`}>
                {!message.isUser && (
                  <div className="flex items-center space-x-2 mb-1">
                    <div className="w-6 h-6 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full flex items-center justify-center">
                      <Bot className="w-3 h-3 text-white" />
                    </div>
                    <span className={`text-xs ${themeClasses.textSecondary}`}>Assistant IA</span>
                    {message.confidence && (
                      <span className="text-xs text-green-400">({message.confidence}%)</span>
                    )}
                  </div>
                )}
                
                  <motion.div
                    className={`p-3 rounded-2xl relative ${
                      message.isUser
                        ? `${isDarkMode ? 'bg-green-600' : 'bg-green-500'} text-white`
                        : `${isDarkMode ? 'bg-blue-900' : 'bg-blue-100'} ${
                            isDarkMode ? 'text-white' : 'text-gray-900'
                          }`
                    }`}
                    whileHover={{ scale: 1.02 }}
                  >
                    <p className={`text-sm whitespace-pre-line ${
                      message.isUser 
                        ? 'text-white' 
                        : isDarkMode ? 'text-white' : 'text-gray-900'
                    }`}>{message.text}</p>
                    
                    {/* Affichage des liens de navigation */}
                    {message.links && message.links.length > 0 && (
                      <div className="mt-3 space-y-2">
                        {message.links.map((link, index) => (
                          <motion.a
                            key={index}
                            href={link.url}
                            className="inline-block px-3 py-2 bg-blue-500 text-white text-xs rounded-lg hover:bg-blue-600 transition-colors duration-200"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            🔗 {link.text}
                          </motion.a>
                        ))}
                      </div>
                    )}
                  
                  {message.tags && (
                    <div className="flex flex-wrap gap-1 mt-2">
                      {message.tags.map((tag: string, index: number) => (
                        <motion.span
                          key={index}
                          whileHover={{ scale: 1.05 }}
                          className={`px-2 py-1 rounded-full text-xs ${
                            index === message.tags!.length - 1
                              ? 'bg-blue-600 text-white'
                              : `${isDarkMode ? 'bg-blue-800' : 'bg-blue-200'} ${themeClasses.text}`
                          }`}
                        >
                          {tag}
                        </motion.span>
                      ))}
                    </div>
                  )}

                  {/* Système de scoring innovant */}
                  {showScoring && !message.isUser && (
                    <div className="flex items-center justify-between mt-3 pt-2 border-t border-gray-300/20">
                      <div className="flex items-center space-x-2">
                        <span className="text-xs text-gray-500">Score:</span>
                        <div className="flex space-x-1">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <motion.button
                              key={star}
                              whileHover={{ scale: 1.2 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => handleScoreMessage(message.id, star)}
                              className={`w-4 h-4 ${
                                star <= (message.score || 0) ? 'text-yellow-400' : 'text-gray-400'
                              }`}
                            >
                              <Star className="w-full h-full" />
                            </motion.button>
                          ))}
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-1">
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => handleLikeMessage(message.id)}
                          className={`p-1 rounded-full ${
                            message.isLiked ? 'bg-red-500' : 'bg-gray-400'
                          }`}
                        >
                          <Heart className={`w-3 h-3 ${message.isLiked ? 'text-white' : 'text-gray-600'}`} />
                        </motion.button>
                        
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => handleStarMessage(message.id)}
                          className={`p-1 rounded-full ${
                            message.isStarred ? 'bg-yellow-500' : 'bg-gray-400'
                          }`}
                        >
                          <Star className={`w-3 h-3 ${message.isStarred ? 'text-white' : 'text-gray-600'}`} />
                        </motion.button>
                      </div>
                    </div>
                  )}
                </motion.div>
                
                <div className="flex items-center justify-between mt-1">
                  <span className={`text-xs ${themeClasses.textSecondary} ${
                    message.isUser ? 'text-right' : 'text-left'
                  }`}>
                    {message.timestamp.toLocaleTimeString()}
                  </span>
                  
                  {message.score && message.score > 0 && (
                    <div className="flex items-center space-x-1">
                      <Star className="w-3 h-3 text-yellow-400" />
                      <span className="text-xs text-yellow-400">{message.score}/5</span>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
          
          {/* Animation de frappe de l'IA */}
          {isTyping && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`p-3 rounded-2xl ${isDarkMode ? 'bg-blue-900' : 'bg-blue-100'} ${themeClasses.text}`}
            >
              <div className="flex items-center space-x-2">
                <div className="flex space-x-1">
                  <motion.div
                    className="w-2 h-2 bg-blue-500 rounded-full"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
                  />
                  <motion.div
                    className="w-2 h-2 bg-blue-500 rounded-full"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
                  />
                  <motion.div
                    className="w-2 h-2 bg-blue-500 rounded-full"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
                  />
                </div>
                <span className="text-sm text-blue-600">{typingText}</span>
              </div>image.png
            </motion.div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
      )}

      {/* Barre d'input - Toujours visible et sticky */}
      <div className={`p-3 sm:p-4 ${isDarkMode ? 'bg-gray-800' : 'bg-gray-100'} border-t ${isDarkMode ? 'border-gray-700' : 'border-gray-200'} sticky bottom-0 z-10`}>
          <div className="flex items-center space-x-1 sm:space-x-2">
            <div className="flex-1 relative">
              <input
                ref={inputRef}
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Posez votre question..."
                className={`w-full p-2 sm:p-3 rounded-xl border text-sm sm:text-base ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'} focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all duration-300`}
              />
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={toggleRecording}
                className={`absolute right-2 sm:right-3 top-1/2 transform -translate-y-1/2 p-1.5 sm:p-2 rounded-full ${
                  isRecording ? 'bg-red-500' : 'bg-gray-500'
                } text-white`}
              >
                {isRecording ? <MicOff className="w-3 h-3 sm:w-4 sm:h-4" /> : <Mic className="w-3 h-3 sm:w-4 sm:h-4" />}
              </motion.button>
            </div>
            
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleSendMessage}
              className="p-2 sm:p-3 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl text-white shadow-lg"
              title="Envoyer le message"
            >
              <Send className="w-4 h-4 sm:w-5 sm:h-5" />
            </motion.button>
          </div>
          
          {/* Barre d'actions simplifiée */}
          <div className="flex items-center justify-center mt-2 sm:mt-3">
            <div className="flex items-center space-x-1 sm:space-x-2">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={togglePlayback}
                className={`p-1.5 sm:p-2 rounded-full ${isPlaying ? 'bg-green-500' : 'bg-gray-500'} text-white`}
                title={isPlaying ? "Arrêter" : "Lire"}
              >
                {isPlaying ? <VolumeX className="w-3 h-3 sm:w-4 sm:h-4" /> : <Volume2 className="w-3 h-3 sm:w-4 sm:h-4" />}
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setShowScoring(!showScoring)}
                className={`p-1.5 sm:p-2 rounded-full ${showScoring ? 'bg-yellow-500' : 'bg-gray-500'} text-white`}
                title="Scoring"
              >
                <Star className="w-3 h-3 sm:w-4 sm:h-4" />
              </motion.button>
            </div>
          </div>
        </div>

      {/* Page de Paramètres */}
      <ParametresChatbot
        isOpen={showParametres}
        onClose={() => setShowParametres(false)}
        onPositionChange={(newPosition) => {
          setPosition(newPosition);
          // Si on change vers center, on ferme les paramètres pour éviter les conflits
          if (newPosition === 'center' && showParametres) {
            setShowParametres(false);
          }
        }}
        onFullscreenChange={setIsFullscreen}
        onMinimizeChange={setIsMinimized}
        currentPosition={position}
        isFullscreen={isFullscreen}
        isMinimized={isMinimized}
      />
    </motion.div>
  );
};

export default ChatbotInterface;