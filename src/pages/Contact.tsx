
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
import { MapPin, Phone, Mail, Clock, Send, MessageSquare } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

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
        address: "Central Park ex 4 c Avenue Malick Sy Bureau 3008 Dakar",
        hours: "Disponibles 24h/24 et 7j/7",
        emergency: "Urgence 24/7",
        networks: "Réseaux"
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
        address: "Central Park ex 4 c Avenue Malick Sy Bureau 3008 Dakar",
        hours: "Available 24/7",
        emergency: "24/7 Emergency",
        networks: "Networks"
      }
    }
  };

  const currentContent = content[language];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const { error } = await supabase.functions.invoke('send-contact-email', {
        body: {
          name: formData.name,
          email: formData.email,
          message: `Téléphone: ${formData.phone}\nSujet: ${formData.subject}\n\nMessage:\n${formData.message}`
        }
      });

      if (error) throw error;

      toast.success(
        language === 'fr' 
          ? 'Message envoyé avec succès ! Nous vous répondrons dans les plus brefs délais.' 
          : 'Message sent successfully! We will respond to you as soon as possible.'
      );
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
    } catch (error) {
      console.error('Error sending message:', error);
      toast.error(
        language === 'fr' 
          ? 'Erreur lors de l\'envoi du message. Veuillez réessayer.' 
          : 'Error sending message. Please try again.'
      );
    } finally {
      setIsSubmitting(false);
    }
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
      <section className="bg-primary text-white py-20">
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
            className="text-xl text-white/80 max-w-2xl mx-auto"
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
                  <CardTitle className="text-2xl text-primary">
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
                      className="w-full bg-primary hover:bg-primary/90 text-white py-3"
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
                  <CardTitle className="text-2xl text-primary">
                    {currentContent.info.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <MapPin className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">
                        {language === 'fr' ? 'Adresse' : 'Address'}
                      </h3>
                      <p className="text-gray-600">{currentContent.info.address}</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <Phone className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">
                        {language === 'fr' ? 'Téléphone' : 'Phone'}
                      </h3>
                      <p className="text-gray-600">+221 33 822 29 80</p>
                      <p className="text-primary font-medium">
                        {currentContent.info.emergency}: +221 77 644 96 42
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <Mail className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">E-mail</h3>
                      <p className="text-gray-600">contact@ndoukoumaneshipping.sn</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <Clock className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">
                        {language === 'fr' ? 'Horaires' : 'Hours'}
                      </h3>
                      <p className="text-gray-600">{currentContent.info.hours}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Réseaux Section */}
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="text-2xl text-primary">
                    {currentContent.info.networks}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <a 
                      href="https://www.linkedin.com/company/ndoukoumane-shipping-services" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center space-x-3 text-blue-600 hover:text-blue-800 transition-colors"
                    >
                      <div className="w-6 h-6 text-blue-600">📱</div>
                      <span>LinkedIn</span>
                    </a>
                    <a 
                      href="https://wa.me/221776449642" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center space-x-3 text-green-600 hover:text-green-800 transition-colors"
                    >
                      <MessageSquare className="w-6 h-6" />
                      <span>WhatsApp Business</span>
                    </a>
                  </div>
                </CardContent>
              </Card>

              {/* Map Section */}
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="text-2xl text-primary">
                    {language === 'fr' ? 'Localisation' : 'Location'}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="w-full h-64 bg-gray-200 rounded-lg flex items-center justify-center">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3858.9668423476557!2d-17.44250668513698!3d14.682570589766598!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xec17295e1775ef1%3A0x1ee2e80b10007d39!2sCentral%20Park%20Dakar!5e0!3m2!1sfr!2ssn!4v1734546782152!5m2!1sfr!2ssn"
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      className="rounded-lg"
                    ></iframe>
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
