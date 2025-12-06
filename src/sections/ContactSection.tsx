import React, { useState, useCallback } from 'react';
import { Phone, MapPin, Send, Github, Linkedin, FileDown } from 'lucide-react';
import { BsTwitterX, BsWhatsapp } from 'react-icons/bs';
import { useLanguage } from '../hooks/useLanguage';
import emailjs from '@emailjs/browser';
import Toast, { ToastType } from '../components/Toast';
import { AnalyticsEvents } from '../utils/analytics';

const ContactSection = () => {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [formStarted, setFormStarted] = useState(false);
  
  // Toast state
  const [toast, setToast] = useState<{ message: string; type: ToastType; visible: boolean }>({
    message: '',
    type: 'info',
    visible: false
  });

  const showToast = useCallback((message: string, type: ToastType) => {
    setToast({ message, type, visible: true });
  }, []);

  const hideToast = useCallback(() => {
    setToast(prev => ({ ...prev, visible: false }));
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // Track form start
    if (!formStarted) {
      setFormStarted(true);
      AnalyticsEvents.contactFormStart();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      showToast(t('contact.alert.required'), 'warning');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      showToast(t('contact.alert.emailInvalid'), 'warning');
      return;
    }

    setIsLoading(true);
    try {
      const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
      const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
      const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

      if (!serviceId || !templateId || !publicKey) {
        showToast(t('contact.alert.configError'), 'error');
        AnalyticsEvents.contactFormError('config_error');
        return;
      }

      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        subject: formData.subject,
        message: formData.message,
        to_name: 'Daniel Jiménez',
        reply_to: formData.email
      };

      const result = await emailjs.send(serviceId, templateId, templateParams, publicKey);
      if (result.status === 200) {
        showToast(t('contact.form.success'), 'success');
        setFormData({ name: '', email: '', subject: '', message: '' });
        setFormStarted(false);
        AnalyticsEvents.contactFormSubmit();
      }
    } catch (error) {
      console.error('Error sending email:', error);
      showToast(t('contact.alert.sendError'), 'error');
      AnalyticsEvents.contactFormError('send_error');
    } finally {
      setIsLoading(false);
    }
  };

  const contactInfo = [
    {
      icon: (
        <div className="flex items-center gap-2">
          <Phone className="w-6 h-6" />
          <BsWhatsapp className="w-5 h-5" />
        </div>
      ),
      title: t('contact.phone'),
      value: '+58 04123924758',
      link: 'tel:+5804123924758',
      whatsappLink: 'https://wa.me/5804123924758'
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      title: t('contact.location'),
      value: 'Venezuela, Caracas',
      link: '#'
    },
    {
      icon: <FileDown className="w-6 h-6" />,
      title: t('contact.cv'),
      value: 'CV Daniel Jiménez',
  link: `${import.meta.env.BASE_URL}cv-daniel-jimenez.pdf`,
      download: true
    }
  ];

  const socialLinks = [
    { icon: <Github className="w-6 h-6" />, name: 'GitHub', url: 'https://github.com/djimenezunihumboldt', color: 'hover:text-gray-900' },
    { icon: <Linkedin className="w-6 h-6" />, name: 'LinkedIn', url: 'https://www.linkedin.com/in/daniel-jim%C3%A9nez-p%C3%A9rez-64b512133/', color: 'hover:text-blue-600' },
    { icon: <BsTwitterX className="w-6 h-6" />, name: 'X', url: 'https://x.com', color: 'hover:text-gray-900' }
  ];

  return (
    <section id="contact" className="py-20 bg-gradient-to-br from-gray-50 to-white dark:from-secondary-900 dark:to-secondary-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-secondary-900 dark:text-white mb-6">{t('contact.title')}</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary-500 to-accent-500 mx-auto rounded-full mb-4"></div>
          <p className="text-lg text-secondary-600 dark:text-secondary-300 max-w-2xl mx-auto">{t('contact.description')}</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-white dark:bg-secondary-800 rounded-2xl shadow-xl p-8">
            <h3 className="text-2xl font-bold text-secondary-900 dark:text-white mb-6">{t('contact.form.title')}</h3>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-secondary-900 dark:text-white mb-2">{t('contact.form.name')}</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 dark:border-secondary-600 bg-white dark:bg-secondary-700 text-secondary-900 dark:text-white rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors duration-200 outline-none"
                    placeholder={t('contact.form.name.placeholder')}
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-secondary-900 dark:text-white mb-2">{t('contact.form.email')}</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 dark:border-secondary-600 bg-white dark:bg-secondary-700 text-secondary-900 dark:text-white rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors duration-200 outline-none"
                    placeholder="canelodaniel1997@gmail.com"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-secondary-900 dark:text-white mb-2">{t('contact.form.subject')}</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 dark:border-secondary-600 bg-white dark:bg-secondary-700 text-secondary-900 dark:text-white rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors duration-200 outline-none"
                  placeholder={t('contact.form.subject.placeholder')}
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-secondary-900 dark:text-white mb-2">{t('contact.form.message')}</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-secondary-600 bg-white dark:bg-secondary-700 text-secondary-900 dark:text-white rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors duration-200 outline-none resize-none"
                  placeholder={t('contact.form.message.placeholder')}
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-primary-600 hover:bg-primary-700 hover:shadow-[0_0_25px_rgba(99,102,241,0.5)] disabled:bg-primary-400 disabled:cursor-not-allowed disabled:shadow-none text-white px-6 py-4 rounded-lg font-semibold text-lg transition-all duration-200 flex items-center justify-center space-x-2 transform hover:scale-105 disabled:hover:scale-100"
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    <span>{t('contact.form.sending')}</span>
                  </>
                ) : (
                  <>
                    <Send size={20} />
                    <span>{t('contact.form.send')}</span>
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            <div className="space-y-4">
              {contactInfo.map((info, index) => (
                <div key={index}>
                  {info.whatsappLink ? (
                    <div className="bg-white dark:bg-secondary-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
                      <div className="flex items-center space-x-4">
                        <div className="flex-shrink-0 w-12 h-12 bg-primary-100 dark:bg-primary-900/20 rounded-full flex items-center justify-center text-primary-600 dark:text-primary-400">
                          {info.icon}
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-secondary-900 dark:text-white">{info.title}</h4>
                          <p className="text-secondary-600 dark:text-secondary-300 mb-2">{info.value}</p>
                          <div className="flex gap-2">
                            <a
                              href={info.link}
                              className="text-sm bg-primary-100 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400 px-3 py-1 rounded-full hover:bg-primary-200 dark:hover:bg-primary-900/40 transition-colors duration-200"
                            >
                              📞 {t('contact.call')}
                            </a>
                            <a
                              href={info.whatsappLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-sm bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400 px-3 py-1 rounded-full hover:bg-green-200 dark:hover:bg-green-900/40 transition-colors duration-200"
                            >
                              💬 WhatsApp
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <a
                      href={info.link}
                      {...(info.download && { download: 'CV-Daniel-Jimenez.pdf' })}
                      className="block bg-white dark:bg-secondary-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="flex-shrink-0 w-12 h-12 bg-primary-100 dark:bg-primary-900/20 rounded-full flex items-center justify-center text-primary-600 dark:text-primary-400">
                          {info.icon}
                        </div>
                        <div>
                          <h4 className="font-semibold text-secondary-900 dark:text-white">{info.title}</h4>
                          <p className="text-secondary-600 dark:text-secondary-300">{info.value}</p>
                        </div>
                      </div>
                    </a>
                  )}
                </div>
              ))}
            </div>

            <div className="bg-white dark:bg-secondary-800 rounded-2xl p-8 shadow-lg">
              <h3 className="text-xl font-bold text-secondary-900 dark:text-white mb-6">{t('contact.social')}</h3>
              <div className="flex space-x-4">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-12 h-12 bg-gray-100 dark:bg-secondary-700 rounded-full flex items-center justify-center text-secondary-600 dark:text-secondary-300 ${social.color} transition-all duration-300 transform hover:scale-110 hover:shadow-lg`}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>

            {/* Bloque "¿Por qué trabajar conmigo?" removido a solicitud del usuario */}
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-gray-200 text-center">
          <p className="text-secondary-600 dark:text-secondary-400">{t('contact.footer')}</p>
          <p className="text-secondary-500 dark:text-secondary-500 text-sm mt-2">📍 {t('contact.location')}</p>
        </div>
      </div>
      
      {/* Toast Notification */}
      <Toast
        message={toast.message}
        type={toast.type}
        isVisible={toast.visible}
        onClose={hideToast}
      />
    </section>
  );
};

export default ContactSection;