import { useState, useRef, useEffect } from 'react';
import { FaRobot, FaTimes, FaPaperPlane, FaUser, FaMinus } from 'react-icons/fa';
import { useLanguage } from '../hooks/useLanguage';

interface Message {
  id: number;
  text: string;
  isBot: boolean;
  timestamp: Date;
}

interface QuickReply {
  es: string;
  en: string;
  response: {
    es: string;
    en: string;
  };
}

const quickReplies: QuickReply[] = [
  {
    es: '¿Cuál es tu experiencia?',
    en: 'What is your experience?',
    response: {
      es: '¡Tengo más de 5 años de experiencia en desarrollo web! He trabajado con tecnologías como React, Node.js, TypeScript, y he colaborado con empresas de diversos sectores.',
      en: 'I have over 5 years of experience in web development! I have worked with technologies like React, Node.js, TypeScript, and have collaborated with companies from various sectors.',
    },
  },
  {
    es: '¿Qué servicios ofreces?',
    en: 'What services do you offer?',
    response: {
      es: 'Ofrezco desarrollo frontend y backend, creación de APIs RESTful, desarrollo de aplicaciones móviles, consultoría técnica, y optimización de rendimiento. ¿Te interesa alguno en particular?',
      en: 'I offer frontend and backend development, RESTful API creation, mobile app development, technical consulting, and performance optimization. Are you interested in any particular one?',
    },
  },
  {
    es: '¿Cómo puedo contactarte?',
    en: 'How can I contact you?',
    response: {
      es: 'Puedes contactarme a través del formulario en la sección de Contacto, o directamente por email. También puedes encontrarme en LinkedIn y GitHub. ¡Estaré encantado de hablar contigo!',
      en: 'You can contact me through the form in the Contact section, or directly by email. You can also find me on LinkedIn and GitHub. I will be happy to talk with you!',
    },
  },
  {
    es: '¿Estás disponible para proyectos?',
    en: 'Are you available for projects?',
    response: {
      es: '¡Sí! Actualmente estoy abierto a nuevos proyectos y oportunidades. Cuéntame sobre tu proyecto y veamos cómo puedo ayudarte a hacerlo realidad.',
      en: 'Yes! I am currently open to new projects and opportunities. Tell me about your project and let\'s see how I can help you make it a reality.',
    },
  },
];

const botResponses: { [key: string]: { es: string; en: string } } = {
  default: {
    es: 'Gracias por tu mensaje. Para consultas más detalladas, te recomiendo usar el formulario de contacto o enviarme un email directamente. ¿Hay algo específico en lo que pueda ayudarte?',
    en: 'Thank you for your message. For more detailed inquiries, I recommend using the contact form or sending me an email directly. Is there anything specific I can help you with?',
  },
  greeting: {
    es: '¡Hola! 👋 Soy el asistente virtual de este portafolio. ¿En qué puedo ayudarte hoy?',
    en: 'Hello! 👋 I am the virtual assistant of this portfolio. How can I help you today?',
  },
  thanks: {
    es: '¡De nada! Si tienes más preguntas, no dudes en escribirme. También puedes explorar las diferentes secciones del portafolio para conocer más sobre mi trabajo.',
    en: 'You are welcome! If you have more questions, feel free to write me. You can also explore the different sections of the portfolio to learn more about my work.',
  },
  pricing: {
    es: 'Los precios varían según la complejidad y alcance del proyecto. Te invito a contactarme con los detalles de tu proyecto para darte un presupuesto personalizado.',
    en: 'Prices vary depending on the complexity and scope of the project. I invite you to contact me with the details of your project for a personalized quote.',
  },
};

export default function ChatBot() {
  const { language } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [positionTop, setPositionTop] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const chatRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Detectar si el chat debe estar arriba o abajo
  useEffect(() => {
    const handleScroll = () => {
      if (chatRef.current && isOpen) {
        const rect = chatRef.current.getBoundingClientRect();
        // Si el chat está muy cerca del fondo (menos de 100px), mover arriba
        if (window.innerHeight - rect.top < 100) {
          setPositionTop(true);
        } else {
          setPositionTop(false);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleScroll);
    
    // Llamar una vez al abrir
    if (isOpen) {
      setTimeout(handleScroll, 100);
    }

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [isOpen]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      // Send initial greeting
      const greeting: Message = {
        id: 1,
        text: botResponses.greeting[language],
        isBot: true,
        timestamp: new Date(),
      };
      setMessages([greeting]);
    }
  }, [isOpen, language, messages.length]);

  const getBotResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    // Check for greetings
    if (lowerMessage.match(/hola|hello|hi|hey|buenos|buenas/)) {
      return botResponses.greeting[language];
    }
    
    // Check for thanks
    if (lowerMessage.match(/gracias|thank|thanks/)) {
      return botResponses.thanks[language];
    }
    
    // Check for pricing
    if (lowerMessage.match(/precio|cost|cuanto|cuánto|presupuesto|budget|rate/)) {
      return botResponses.pricing[language];
    }
    
    // Check quick replies
    for (const reply of quickReplies) {
      const keywords = reply.es.toLowerCase().split(' ').concat(reply.en.toLowerCase().split(' '));
      if (keywords.some(keyword => lowerMessage.includes(keyword) && keyword.length > 3)) {
        return reply.response[language];
      }
    }
    
    return botResponses.default[language];
  };

  const sendMessage = (text?: string) => {
    const messageText = text || inputValue.trim();
    if (!messageText) return;

    const userMessage: Message = {
      id: Date.now(),
      text: messageText,
      isBot: false,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate bot typing
    setTimeout(() => {
      const botMessage: Message = {
        id: Date.now() + 1,
        text: getBotResponse(messageText),
        isBot: true,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMessage]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000);
  };

  const handleQuickReply = (reply: QuickReply) => {
    sendMessage(reply[language]);
  };

  const toggleChat = () => {
    if (isMinimized) {
      setIsMinimized(false);
    } else {
      setIsOpen(!isOpen);
    }
  };

  return (
    <>
      {/* Chat Button */}
      <button
        onClick={toggleChat}
        className={`fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-110 ${
          isOpen && !isMinimized
            ? 'bg-red-500 hover:bg-red-600'
            : 'bg-primary hover:bg-primary/90'
        }`}
        aria-label={isOpen ? (language === 'es' ? 'Cerrar chat' : 'Close chat') : (language === 'es' ? 'Abrir chat' : 'Open chat')}
      >
        {isOpen && !isMinimized ? (
          <FaTimes className="text-white text-xl" />
        ) : (
          <FaRobot className="text-white text-xl" />
        )}
        
        {/* Notification dot */}
        {!isOpen && (
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full animate-pulse" />
        )}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div
          ref={chatRef}
          className={`fixed z-40 bg-white/85 dark:bg-gray-900/75 backdrop-blur-lg rounded-2xl shadow-2xl overflow-hidden transition-all duration-300 border border-gray-200 dark:border-gray-700
            ${positionTop ? 'top-24 sm:top-32 bottom-auto' : 'bottom-20 sm:bottom-24 top-auto'} right-4 left-4 sm:left-auto sm:right-6
            w-auto sm:w-72 md:w-80
            max-w-[calc(100vw-2rem)] sm:max-w-80
            ${isMinimized ? 'h-14' : 'h-[60vh] sm:h-[380px] max-h-[400px]'}`}
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-primary to-primary/90 text-white p-3 sm:p-4 flex items-center justify-between shadow-md">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/30 flex items-center justify-center">
                <FaRobot className="text-sm sm:text-lg" />
              </div>
              <div>
                <h3 className="font-semibold text-sm sm:text-base">
                  {language === 'es' ? 'Asistente Virtual' : 'Virtual Assistant'}
                </h3>
                <span className="text-[10px] sm:text-xs text-white/80">
                  {isTyping
                    ? (language === 'es' ? 'Escribiendo...' : 'Typing...')
                    : (language === 'es' ? 'Online' : 'Online')}
                </span>
              </div>
            </div>
            <button
              onClick={() => setIsMinimized(!isMinimized)}
              className="p-2 hover:bg-white/20 rounded-lg transition-colors"
              aria-label={isMinimized ? 'Expand' : 'Minimize'}
            >
              <FaMinus />
            </button>
          </div>

          {!isMinimized && (
            <>
              {/* Messages */}
              <div className="h-[calc(60vh-180px)] sm:h-[220px] overflow-y-auto p-3 sm:p-4 space-y-3 sm:space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex items-start gap-2 ${
                      message.isBot ? '' : 'flex-row-reverse'
                    }`}
                  >
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                        message.isBot
                          ? 'bg-primary/10 text-primary'
                          : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
                      }`}
                    >
                      {message.isBot ? <FaRobot /> : <FaUser />}
                    </div>
                    <div
                      className={`max-w-[80%] sm:max-w-[75%] p-2.5 sm:p-3 rounded-2xl ${
                        message.isBot
                          ? 'bg-gray-150 dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-tl-none border border-gray-300 dark:border-gray-600 shadow-sm'
                          : 'bg-primary text-white rounded-tr-none border border-primary/80 shadow-sm'
                      }`}
                    >
                      <p className="text-xs sm:text-sm">{message.text}</p>
                      <span className="text-[10px] opacity-50 mt-1 block">
                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                  </div>
                ))}
                
                {/* Typing Indicator */}
                {isTyping && (
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                      <FaRobot className="text-primary" />
                    </div>
                    <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-2xl rounded-tl-none">
                      <div className="flex gap-1">
                        <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                        <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                        <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                      </div>
                    </div>
                  </div>
                )}
                
                <div ref={messagesEndRef} />
              </div>

              {/* Quick Replies */}
              {messages.length <= 2 && (
                <div className="px-3 sm:px-4 pb-2 flex flex-wrap gap-1.5 sm:gap-2">
                  {quickReplies.slice(0, 2).map((reply, index) => (
                    <button
                      key={index}
                      onClick={() => handleQuickReply(reply)}
                      className="px-2.5 sm:px-3 py-1 sm:py-1.5 text-[10px] sm:text-xs bg-primary/10 text-primary rounded-full hover:bg-primary/20 transition-colors"
                    >
                      {reply[language]}
                    </button>
                  ))}
                </div>
              )}

              {/* Input */}
              <div className="p-3 sm:p-4 border-t border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-gray-800/50">
                <div className="flex gap-2">
                  <input
                    ref={inputRef}
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                    placeholder={language === 'es' ? 'Escribe un mensaje...' : 'Type a message...'}
                    className="flex-1 px-3 sm:px-4 py-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 border border-gray-300 dark:border-gray-600"
                  />
                  <button
                    onClick={() => sendMessage()}
                    disabled={!inputValue.trim()}
                    className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-primary text-white flex items-center justify-center hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex-shrink-0"
                    aria-label={language === 'es' ? 'Enviar' : 'Send'}
                  >
                    <FaPaperPlane className="text-sm" />
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
}
