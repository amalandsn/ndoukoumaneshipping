
import React, { useState } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';
import { useLanguage } from '@/hooks/useLanguage';
import { Phone, Mail, MapPin, Calendar, Linkedin, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

const Contact = () => {
  const { language } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const content = {
    fr: {
      title: "Contactez-nous",
      subtitle: "Notre équipe est disponible 24 h/24 – 7 j/7",
      formTitle: "Comment pouvons-nous vous aider ?",
      namePlaceholder: "Nom*",
      emailPlaceholder: "E-mail*",
      messagePlaceholder: "Votre message*",
      sendButton: "Envoyer",
      office: "Bureau",
      emergency: "Urgence 24/7",
      email: "E-mail",
      address: "Adresse",
      hours: "Horaires",
      hoursText: "Lun–Ven : 8h–18h • Sam–Dim : 8h–12h",
      addressText: "Central Park, face BNSP, Dakar"
    },
    en: {
      title: "Get in touch!",
      subtitle: "Our team is available 24/7",
      formTitle: "How can we help?",
      namePlaceholder: "Name*",
      emailPlaceholder: "E-mail*",
      messagePlaceholder: "Your message*",
      sendButton: "Send",
      office: "Office",
      emergency: "Emergency 24/7",
      email: "E-mail",
      address: "Address",
      hours: "Hours",
      hoursText: "Mon–Fri : 8 am–6 pm • Sat–Sun : 8 am–12 pm",
      addressText: "Central Park, opposite BNSP, Dakar"
    }
  };

  const currentContent = content[language];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Supabase insert or email
    console.log('Form submitted:', formData);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-700 to-blue-800 text-white py-20">
        <div className="max-w-4xl mx-auto text-center space-y-4 px-4">
          <motion.h1 
            className="text-3xl md:text-4xl font-bold"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {currentContent.title}
          </motion.h1>
          <motion.p 
            className="text-lg"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {currentContent.subtitle}
          </motion.p>
        </div>
      </section>

      {/* Main Content - 2 Column Layout */}
      <section className="max-w-7xl mx-auto py-16 px-4">
        <div className="grid lg:grid-cols-2 gap-12">
          
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <form 
              onSubmit={handleSubmit}
              className="space-y-6"
            >
              <h2 className="text-xl font-semibold mb-4 text-gray-900">
                {currentContent.formTitle}
              </h2>
              
              <Input
                placeholder={currentContent.namePlaceholder}
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3 text-sm focus:border-blue-600 focus:ring-1 focus:ring-blue-600 outline-none transition"
                required
              />
              
              <Input
                type="email"
                placeholder={currentContent.emailPlaceholder}
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3 text-sm focus:border-blue-600 focus:ring-1 focus:ring-blue-600 outline-none transition"
                required
              />
              
              <Textarea
                placeholder={currentContent.messagePlaceholder}
                value={formData.message}
                onChange={(e) => handleInputChange('message', e.target.value)}
                className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3 text-sm focus:border-blue-600 focus:ring-1 focus:ring-blue-600 outline-none transition h-32"
                required
              />
              
              <Button 
                type="submit" 
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition"
              >
                {currentContent.sendButton}
              </Button>
            </form>
          </motion.div>

          {/* Contact Info */}
          <motion.div 
            className="space-y-6"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            {/* Office */}
            <div className="flex items-start gap-4 p-4 rounded-xl shadow bg-white">
              <div className="p-3 bg-blue-600 rounded-lg">
                <Phone className="h-6 w-6 text-white" />
              </div>
              <div className="text-sm">
                <p className="font-semibold text-gray-900">{currentContent.office}</p>
                <a href="tel:+221338222980" className="text-blue-600 hover:text-blue-700">
                  +221 33 822 29 80
                </a>
              </div>
            </div>

            {/* Emergency - Highlighted */}
            <div className="flex items-start gap-4 p-4 rounded-xl shadow bg-orange-50 border border-orange-100">
              <div className="p-3 bg-orange-500 rounded-lg">
                <Phone className="h-6 w-6 text-white" />
              </div>
              <div className="text-sm">
                <p className="font-semibold text-gray-900">{currentContent.emergency}</p>
                <a href="tel:+221774021825" className="text-orange-600 hover:text-orange-700">
                  +221 77 402 18 25
                </a>
              </div>
            </div>

            {/* Email */}
            <div className="flex items-start gap-4 p-4 rounded-xl shadow bg-white">
              <div className="p-3 bg-blue-600 rounded-lg">
                <Mail className="h-6 w-6 text-white" />
              </div>
              <div className="text-sm">
                <p className="font-semibold text-gray-900">{currentContent.email}</p>
                <a href="mailto:info@ndoukoumaneshipping.sn" className="text-blue-600 hover:text-blue-700 underline">
                  info@ndoukoumaneshipping.sn
                </a>
              </div>
            </div>

            {/* Address */}
            <div className="flex items-start gap-4 p-4 rounded-xl shadow bg-white">
              <div className="p-3 bg-blue-600 rounded-lg">
                <MapPin className="h-6 w-6 text-white" />
              </div>
              <div className="text-sm">
                <p className="font-semibold text-gray-900">{currentContent.address}</p>
                <p className="text-gray-600">{currentContent.addressText}</p>
              </div>
            </div>

            {/* Hours */}
            <div className="flex items-start gap-4 p-4 rounded-xl shadow bg-white">
              <div className="p-3 bg-blue-600 rounded-lg">
                <Calendar className="h-6 w-6 text-white" />
              </div>
              <div className="text-sm">
                <p className="font-semibold text-gray-900">{currentContent.hours}</p>
                <p className="text-gray-600">{currentContent.hoursText}</p>
              </div>
            </div>

            {/* Social Links */}
            <div className="pt-4 space-y-3">
              <h3 className="text-lg font-semibold text-gray-900">
                {language === 'fr' ? 'Réseaux' : 'Social'}
              </h3>
              <a 
                href="https://www.linkedin.com/company/ndoukoumane" 
                className="flex items-center gap-3 text-blue-600 hover:text-blue-700 transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Linkedin className="h-5 w-5" />
                LinkedIn
              </a>
              <a 
                href="https://wa.me/221774021825" 
                className="flex items-center gap-3 text-green-600 hover:text-green-700 transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle className="h-5 w-5" />
                WhatsApp Business
              </a>
            </div>
          </motion.div>

        </div>
      </section>

      {/* Map */}
      <section className="py-8 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3859.155446!2d-17.4425914!3d14.6825705!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xec17295e1775ef1%3A0x1ee2e80b10007d39!2sCentral%20Park%20Dakar!5e0!3m2!1sfr!2ssn!4v1703069584000!5m2!1sfr!2ssn"
              loading="lazy"
              className="w-full h-60 md:h-72 rounded-xl shadow-lg"
              allowFullScreen
              title="Ndoukoumane Shipping & Services – Central Park Dakar"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </motion.div>
        </div>
      </section>

      {/* Mobile Sticky CTA */}
      <a 
        href="tel:+221774021825"
        className="fixed bottom-4 left-1/2 -translate-x-1/2 bg-blue-600 text-white py-3 px-6 rounded-full shadow-xl md:hidden z-50 hover:bg-blue-700 transition-colors"
      >
        📞 {language === 'fr' ? 'Appeler maintenant' : 'Call now'}
      </a>

      <Footer />
    </div>
  );
};

export default Contact;
