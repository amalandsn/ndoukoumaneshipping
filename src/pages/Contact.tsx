
import React, { useState } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';
import { useLanguage } from '@/hooks/useLanguage';
import { Phone, Mail, MapPin, Calendar, Linkedin, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

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
      callButton: "Appeler 24/7",
      office: "Bureau",
      emergency: "Urgence 24/7",
      email: "E-mail",
      address: "Adresse",
      schedule: "Horaires",
      scheduleText: "Lun-Ven : 8h-18h • Sam : 8h-12h • Dim : Fermé",
      addressText: "Central Park, face BNSP, Dakar",
      formTitle: "Envoyer un message",
      namePlaceholder: "Nom*",
      emailPlaceholder: "E-mail*",
      messagePlaceholder: "Votre message*",
      sendButton: "Envoyer",
      socialTitle: "Réseaux",
      faqTitle: "FAQ",
      stickyCall: "📞 Appeler maintenant"
    },
    en: {
      title: "Contact Us",
      subtitle: "Our team is available 24/7",
      callButton: "Call 24/7",
      office: "Office",
      emergency: "Emergency 24/7",
      email: "E-mail",
      address: "Address",
      schedule: "Schedule",
      scheduleText: "Mon-Fri 8 am-6 pm • Sat 8 am-12 pm • Sun Closed",
      addressText: "Central Park, opposite BNSP, Dakar",
      formTitle: "Send a message",
      namePlaceholder: "Name*",
      emailPlaceholder: "E-mail*",
      messagePlaceholder: "Your message*",
      sendButton: "Send",
      socialTitle: "Social",
      faqTitle: "FAQ",
      stickyCall: "📞 Call now"
    }
  };

  const currentContent = content[language];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement Supabase contact_messages submission
    console.log('Form submitted:', formData);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const faqData = {
    fr: [
      {
        question: "Quels types de marchandises acceptez-vous ?",
        answer: "Nous gérons tous types de marchandises : conteneurs, véhicules, matières premières, produits manufacturés, avec des solutions adaptées à chaque type de cargo."
      },
      {
        question: "Proposez-vous un suivi temps réel ?",
        answer: "Oui, notre plateforme digitale permet un suivi en temps réel de vos expéditions, de l'embarquement jusqu'à la livraison finale."
      },
      {
        question: "Comment obtenir un devis ?",
        answer: "Contactez-nous par téléphone, email ou via ce formulaire. Nous vous fournirons un devis personnalisé sous 24h."
      }
    ],
    en: [
      {
        question: "What cargo do you accept?",
        answer: "We handle all types of cargo: containers, vehicles, raw materials, manufactured goods, with tailored solutions for each cargo type."
      },
      {
        question: "Do you offer real-time tracking?",
        answer: "Yes, our digital platform provides real-time tracking of your shipments, from loading to final delivery."
      },
      {
        question: "How to request a quote?",
        answer: "Contact us by phone, email or via this form. We'll provide you with a personalized quote within 24 hours."
      }
    ]
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
          <motion.a 
            href="tel:+221774021825" 
            className="inline-flex items-center gap-2 bg-white text-blue-700 font-semibold px-6 py-3 rounded-full shadow-lg hover:scale-105 transition-transform"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Phone className="h-5 w-5" />
            {currentContent.callButton}
          </motion.a>
        </div>
      </section>

      {/* Info Grid */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto grid gap-6 md:grid-cols-2 lg:grid-cols-3 px-4">
          
          {/* Office */}
          <motion.div 
            className="bg-gray-50 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="p-3 bg-blue-600 rounded-lg">
                <Phone className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">{currentContent.office}</h3>
            </div>
            <a href="tel:+221338222980" className="text-blue-600 hover:text-blue-700 font-medium">
              +221 33 822 29 80
            </a>
          </motion.div>

          {/* Emergency - Highlighted */}
          <motion.div 
            className="bg-orange-50 border-2 border-orange-200 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="p-3 bg-orange-500 rounded-lg">
                <Phone className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">{currentContent.emergency}</h3>
            </div>
            <a href="tel:+221774021825" className="text-orange-600 hover:text-orange-700 font-medium">
              +221 77 402 18 25
            </a>
          </motion.div>

          {/* Email */}
          <motion.div 
            className="bg-gray-50 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="p-3 bg-blue-600 rounded-lg">
                <Mail className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">{currentContent.email}</h3>
            </div>
            <a href="mailto:info@ndoukoumane-shipping.sn" className="text-blue-600 hover:text-blue-700 font-medium">
              info@ndoukoumane-shipping.sn
            </a>
          </motion.div>

          {/* Address */}
          <motion.div 
            className="bg-gray-50 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="p-3 bg-blue-600 rounded-lg">
                <MapPin className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">{currentContent.address}</h3>
            </div>
            <p className="text-gray-700">{currentContent.addressText}</p>
          </motion.div>

          {/* Schedule */}
          <motion.div 
            className="bg-gray-50 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow md:col-span-2"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="p-3 bg-blue-600 rounded-lg">
                <Calendar className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">{currentContent.schedule}</h3>
            </div>
            <p className="text-gray-700">{currentContent.scheduleText}</p>
          </motion.div>

        </div>
      </section>

      {/* Contact Form */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4">
          <motion.form 
            onSubmit={handleSubmit}
            className="bg-white shadow-lg rounded-xl p-8 space-y-6"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-xl font-semibold text-center text-gray-900">
              {currentContent.formTitle}
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <Input
                placeholder={currentContent.namePlaceholder}
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                required
              />
              <Input
                type="email"
                placeholder={currentContent.emailPlaceholder}
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                required
              />
            </div>
            
            <Textarea
              placeholder={currentContent.messagePlaceholder}
              value={formData.message}
              onChange={(e) => handleInputChange('message', e.target.value)}
              className="h-32"
              required
            />
            
            <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
              {currentContent.sendButton}
            </Button>
          </motion.form>
        </div>
      </section>

      {/* Map */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d489.0595!2d-17.4403087!3d14.6825705!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xec17295e1775ef1%3A0x1ee2e80b10007d39!2sCentral%20Park%20Dakar!5e0!3m2!1sfr!2ssn!4v1734439200000!5m2!1sfr!2ssn"
              loading="lazy"
              className="w-full h-60 md:h-72 rounded-xl shadow-lg"
              title="Ndoukoumane Shipping & Services – Central Park Dakar"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </motion.div>
        </div>
      </section>

      {/* Social & FAQ */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 grid md:grid-cols-2 gap-8">
          
          {/* Social Links */}
          <motion.div 
            className="space-y-4"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h3 className="text-lg font-semibold text-gray-900">{currentContent.socialTitle}</h3>
            <div className="space-y-3">
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

          {/* FAQ */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-4">{currentContent.faqTitle}</h3>
            <Accordion type="single" collapsible className="space-y-2">
              {faqData[language].map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`} className="border rounded-lg px-4">
                  <AccordionTrigger className="text-left text-sm font-medium">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-sm text-gray-600">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>

        </div>
      </section>

      {/* Mobile Sticky CTA */}
      <a 
        href="tel:+221774021825"
        className="fixed bottom-4 left-1/2 -translate-x-1/2 bg-blue-600 text-white py-3 px-6 rounded-full shadow-xl md:hidden z-50 hover:bg-blue-700 transition-colors"
      >
        {currentContent.stickyCall}
      </a>

      <Footer />
    </div>
  );
};

export default Contact;
