
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import ChatAssistant from '@/components/ChatAssistant';
import { useLanguage } from '@/hooks/useLanguage';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react';

const Contact = () => {
  const { language } = useLanguage();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const content = {
    fr: {
      title: "Contactez-nous",
      subtitle: "Notre équipe est à votre disposition pour répondre à toutes vos questions",
      form: {
        name: "Nom complet",
        email: "Adresse e-mail",
        phone: "Téléphone",
        subject: "Sujet",
        message: "Message",
        submit: "Envoyer le message"
      },
      info: {
        title: "Informations de contact",
        address: "Central Park, face Brigade Nationale des Sapeurs-Pompiers, Dakar, Sénégal",
        hours: "Lun-Ven: 8h00-18h00\nSam: 8h00-12h00",
        emergency: "Urgence 24/7"
      }
    },
    en: {
      title: "Contact Us",
      subtitle: "Our team is available to answer all your questions",
      form: {
        name: "Full name",
        email: "Email address",
        phone: "Phone",
        subject: "Subject",
        message: "Message",
        submit: "Send message"
      },
      info: {
        title: "Contact information",
        address: "Central Park, opposite National Fire Brigade HQ, Dakar, Senegal",
        hours: "Mon-Fri: 8:00-18:00\nSat: 8:00-12:00",
        emergency: "24/7 Emergency"
      }
    }
  };

  const currentContent = content[language];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Form submission logic would go here
    setTimeout(() => {
      setIsSubmitting(false);
      // Reset form or show success message
    }, 2000);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-700 to-blue-800 text-white py-20">
        <div className="container mx-auto text-center space-y-4 px-4">
          <motion.h1 
            className="text-3xl md:text-4xl font-bold"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {currentContent.title}
          </motion.h1>
          <motion.p 
            className="text-xl text-blue-100 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {currentContent.subtitle}
          </motion.p>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="text-2xl text-blue-900">
                    {language === 'fr' ? 'Envoyez-nous un message' : 'Send us a message'}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                          {currentContent.form.name}
                        </label>
                        <Input
                          id="name"
                          name="name"
                          type="text"
                          required
                          value={formData.name}
                          onChange={handleInputChange}
                          className="w-full"
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                          {currentContent.form.email}
                        </label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          required
                          value={formData.email}
                          onChange={handleInputChange}
                          className="w-full"
                        />
                      </div>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                          {currentContent.form.phone}
                        </label>
                        <Input
                          id="phone"
                          name="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className="w-full"
                        />
                      </div>
                      <div>
                        <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                          {currentContent.form.subject}
                        </label>
                        <Input
                          id="subject"
                          name="subject"
                          type="text"
                          required
                          value={formData.subject}
                          onChange={handleInputChange}
                          className="w-full"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                        {currentContent.form.message}
                      </label>
                      <Textarea
                        id="message"
                        name="message"
                        rows={5}
                        required
                        value={formData.message}
                        onChange={handleInputChange}
                        className="w-full"
                      />
                    </div>

                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3"
                    >
                      <Send className="w-4 h-4 mr-2" />
                      {isSubmitting ? 
                        (language === 'fr' ? 'Envoi en cours...' : 'Sending...') : 
                        currentContent.form.submit
                      }
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>

            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="text-2xl text-blue-900">
                    {currentContent.info.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <MapPin className="w-6 h-6 text-orange-500 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">
                        {language === 'fr' ? 'Adresse' : 'Address'}
                      </h3>
                      <p className="text-gray-600">{currentContent.info.address}</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <Phone className="w-6 h-6 text-orange-500 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">
                        {language === 'fr' ? 'Téléphone' : 'Phone'}
                      </h3>
                      <p className="text-gray-600">+221 33 822 29 80</p>
                      <p className="text-orange-600 font-medium">
                        {currentContent.info.emergency}: +221 77 402 18 25
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <Mail className="w-6 h-6 text-orange-500 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">E-mail</h3>
                      <p className="text-gray-600">contact@ndoukoumaneshipping.sn</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <Clock className="w-6 h-6 text-orange-500 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">
                        {language === 'fr' ? 'Horaires' : 'Hours'}
                      </h3>
                      <p className="text-gray-600 whitespace-pre-line">{currentContent.info.hours}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      <ChatAssistant />
      <Footer />
    </div>
  );
};

export default Contact;
