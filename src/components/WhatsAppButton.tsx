import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MessageCircle } from 'lucide-react';
import { BsWhatsapp } from 'react-icons/bs';
import { useLanguage } from '../hooks/useLanguage';
import { AnalyticsEvents } from '../utils/analytics';

interface WhatsAppButtonProps {
  phoneNumber?: string;
  message?: string;
}

const WhatsAppButton = ({ 
  phoneNumber = '5804123924758',
  message 
}: WhatsAppButtonProps) => {
  const { language } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [customMessage, setCustomMessage] = useState('');

  const defaultMessage = language === 'es' 
    ? '¡Hola Daniel! Me interesa tu trabajo y me gustaría hablar contigo.'
    : 'Hi Daniel! I\'m interested in your work and would like to talk to you.';

  const handleSend = () => {
    const finalMessage = customMessage || message || defaultMessage;
    const encodedMessage = encodeURIComponent(finalMessage);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    
    // Track event
    AnalyticsEvents.socialClick('whatsapp');
    
    window.open(whatsappUrl, '_blank');
    setIsOpen(false);
    setCustomMessage('');
  };

  const quickMessages = language === 'es' 
    ? [
        '¡Hola! Me interesa tu trabajo.',
        'Tengo un proyecto en mente.',
        'Me gustaría una cotización.',
        'Quiero agendar una llamada.'
      ]
    : [
        'Hi! I\'m interested in your work.',
        'I have a project in mind.',
        'I\'d like a quote.',
        'I want to schedule a call.'
      ];

  return (
    <>
      {/* Floating Button */}
      <motion.button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-8 right-8 z-50 w-14 h-14 bg-green-500 hover:bg-green-600 text-white rounded-full shadow-lg flex items-center justify-center transition-colors duration-300"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1, type: 'spring', stiffness: 200 }}
        aria-label="Contactar por WhatsApp"
      >
        <BsWhatsapp className="w-7 h-7" />
        
        {/* Pulse animation */}
        <span className="absolute inset-0 rounded-full bg-green-500 animate-ping opacity-25" />
      </motion.button>

      {/* Tooltip */}
      <motion.div
        className="fixed bottom-24 right-8 z-50 bg-white dark:bg-secondary-800 px-4 py-2 rounded-lg shadow-lg text-sm font-medium text-secondary-900 dark:text-white pointer-events-none"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: isOpen ? 0 : 1, x: isOpen ? 20 : 0 }}
        transition={{ delay: 2 }}
      >
        {language === 'es' ? '¡Escríbeme!' : 'Write me!'}
        <div className="absolute right-4 -bottom-2 w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-white dark:border-t-secondary-800" />
      </motion.div>

      {/* Chat Modal */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 bg-black/50 z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            />

            {/* Modal */}
            <motion.div
              className="fixed bottom-20 right-3 sm:right-6 z-50 w-72 sm:w-80 max-w-[calc(100vw-1.5rem)] bg-white dark:bg-secondary-800 rounded-xl shadow-2xl overflow-hidden"
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 50, scale: 0.9 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            >
              {/* Header */}
              <div className="bg-green-500 p-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                    <BsWhatsapp className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold text-sm">Daniel Jiménez</h3>
                    <p className="text-white/80 text-xs">
                      {language === 'es' ? 'Responde en 1 hora' : 'Replies in 1 hour'}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-white/80 hover:text-white transition-colors p-1"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Content */}
              <div className="p-3 space-y-3">
                {/* Welcome message */}
                <div className="flex gap-2">
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <MessageCircle className="w-3 h-3 text-white" />
                  </div>
                  <div className="bg-gray-100 dark:bg-secondary-700 rounded-xl rounded-tl-none p-2 max-w-[85%]">
                    <p className="text-secondary-900 dark:text-white text-xs">
                      {language === 'es' 
                        ? '¡Hola! 👋 ¿En qué puedo ayudarte?' 
                        : 'Hi! 👋 How can I help you?'}
                    </p>
                  </div>
                </div>

                {/* Quick replies */}
                <div className="space-y-1.5">
                  <p className="text-[10px] text-secondary-500 dark:text-secondary-400">
                    {language === 'es' ? 'Respuestas rápidas:' : 'Quick replies:'}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {quickMessages.slice(0, 3).map((msg, index) => (
                      <button
                        key={index}
                        onClick={() => setCustomMessage(msg)}
                        className={`text-[10px] px-2 py-1 rounded-full transition-colors ${
                          customMessage === msg
                            ? 'bg-green-500 text-white'
                            : 'bg-gray-100 dark:bg-secondary-700 text-secondary-700 dark:text-secondary-300 hover:bg-gray-200 dark:hover:bg-secondary-600'
                        }`}
                      >
                        {msg}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Custom message input */}
                <textarea
                  value={customMessage}
                  onChange={(e) => setCustomMessage(e.target.value)}
                  placeholder={language === 'es' ? 'Escribe tu mensaje...' : 'Write your message...'}
                  className="w-full p-2 bg-gray-100 dark:bg-secondary-700 rounded-lg text-secondary-900 dark:text-white placeholder-secondary-400 resize-none focus:outline-none focus:ring-2 focus:ring-green-500 text-xs"
                  rows={2}
                />

                {/* Send button */}
                <motion.button
                  onClick={handleSend}
                  className="w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg font-semibold flex items-center justify-center gap-2 transition-colors text-sm"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <BsWhatsapp className="w-4 h-4" />
                  {language === 'es' ? 'Enviar por WhatsApp' : 'Send via WhatsApp'}
                </motion.button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default WhatsAppButton;
