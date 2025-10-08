import { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { X, Send, Loader2, Sparkles } from "lucide-react";
import { sendMessageToGroq, type ChatMessage } from "../services/groqService";

interface Message {
  id: string;
  text: string;
  sender: "user" | "ai";
  timestamp: Date;
}

const AIAssistant = () => {
  const { t, i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: t("aiAssistant.welcomeMessage"),
      sender: "ai",
      timestamp: new Date(),
    },
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [conversationHistory, setConversationHistory] = useState<ChatMessage[]>(
    []
  );

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputMessage,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    const userInput = inputMessage;
    setInputMessage("");
    setIsTyping(true);

    try {
      // Ajouter le message utilisateur à l'historique
      const newHistory: ChatMessage[] = [
        ...conversationHistory,
        { role: "user", content: userInput },
      ];

      // Appeler l'API Groq
      const aiResponseText = await sendMessageToGroq(newHistory, i18n.language);

      // Ajouter la réponse IA à l'historique
      setConversationHistory([
        ...newHistory,
        { role: "assistant", content: aiResponseText },
      ]);

      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: aiResponseText,
        sender: "ai",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiResponse]);
    } catch (error) {
      console.error("Erreur lors de l'envoi du message:", error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text:
          t("aiAssistant.errorMessage") ||
          "Une erreur s'est produite. Veuillez réessayer.",
        sender: "ai",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Bouton flottant */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-4 right-4 md:bottom-6 md:right-6 bg-[#D17842] hover:bg-[#B85F30] text-white rounded-full p-3 md:p-4 shadow-lg transition-all duration-200 hover:scale-110 z-50 flex items-center gap-2"
          aria-label={t("aiAssistant.openChat")}
        >
          <Sparkles size={20} className="md:w-6 md:h-6" />
          <span className="hidden md:inline font-semibold">
            {t("aiAssistant.askAI")}
          </span>
        </button>
      )}

      {/* Fenêtre de chat */}
      {isOpen && (
        <div className="fixed bottom-4 right-4 left-4 md:left-auto md:right-6 w-auto md:w-96 h-[500px] md:h-[600px] bg-white dark:bg-gray-800 rounded-lg shadow-2xl z-50 flex flex-col border border-gray-200 dark:border-gray-700 max-w-[calc(100vw-2rem)] md:max-w-md">
          {/* Header */}
          <div className="bg-gradient-to-r from-[#D17842] to-[#B85F30] text-white p-3 md:p-4 rounded-t-lg flex items-center justify-between">
            <div className="flex items-center gap-2 md:gap-3">
              <div className="bg-white/20 rounded-full p-1.5 md:p-2">
                <Sparkles size={16} className="md:w-5 md:h-5" />
              </div>
              <div>
                <h3 className="font-bold text-base md:text-lg">
                  {t("aiAssistant.title")}
                </h3>
                <p className="text-xs text-white/80 hidden sm:block">
                  {t("aiAssistant.subtitle")}
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="hover:bg-white/20 rounded-full p-1.5 md:p-2 transition"
              aria-label={t("aiAssistant.closeChat")}
            >
              <X size={18} className="md:w-5 md:h-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-3 md:p-4 space-y-3 md:space-y-4 bg-gray-50 dark:bg-gray-900">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[85%] md:max-w-[80%] rounded-lg p-3 ${
                    message.sender === "user"
                      ? "bg-[#D17842] text-white"
                      : "bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700"
                  }`}
                >
                  <p className="text-sm">{message.text}</p>
                  <span className="text-xs opacity-70 mt-1 block">
                    {message.timestamp.toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700 rounded-lg p-3">
                  <div className="flex items-center gap-2">
                    <Loader2
                      size={16}
                      className="animate-spin text-[#D17842]"
                    />
                    <span className="text-sm">{t("aiAssistant.typing")}</span>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-3 md:p-4 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
            <div className="flex gap-2">
              <input
                ref={inputRef}
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder={t("aiAssistant.placeholder")}
                className="flex-1 px-3 md:px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#D17842] text-sm md:text-base"
              />
              <button
                onClick={handleSendMessage}
                disabled={!inputMessage.trim() || isTyping}
                className="bg-[#D17842] hover:bg-[#B85F30] disabled:bg-gray-300 dark:disabled:bg-gray-700 disabled:cursor-not-allowed text-white rounded-lg px-3 md:px-4 py-2 transition flex items-center gap-2"
              >
                <Send size={16} className="md:w-5 md:h-5" />
              </button>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 text-center">
              {t("aiAssistant.disclaimer")}
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default AIAssistant;
