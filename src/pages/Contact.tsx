
import React from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';
import { useLanguage } from '@/hooks/useLanguage';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Contact = () => {
  const { language } = useLanguage();

  const content = {
    fr: {
      title: "Contactez-nous",
      subtitle: "Notre équipe est à votre disposition 24h/7j",
      office: "Bureau",
      urgent: "Urgence 24/7",
      email: "E-mail",
      address: "Adresse",
      addressText: "Central Park, face Brigade Nationale des Sapeurs-Pompiers, Dakar",
      hours: "Horaires",
      hoursText: "Lun-Ven: 8h00-18h00\nSam: 8h00-12h00\nDimanche: Fermé",
      callButton: "Appeler maintenant"
    },
    en: {
      title: "Contact Us",
      subtitle: "Our team is available 24/7",
      office: "Office",
      urgent: "24/7 Emergency",
      email: "E-mail",
      address: "Address",
      addressText: "Central Park, opposite the National Fire Brigade HQ, Dakar",
      hours: "Hours",
      hoursText: "Mon-Fri: 8:00-18:00\nSat: 8:00-12:00\nSunday: Closed",
      callButton: "Call now"
    }
  };

  const currentContent = content[language];

  const contactInfo = [
    {
      icon: Phone,
      label: currentContent.office,
      value: "+221 33 822 29 80",
      href: "tel:+221338222980"
    },
    {
      icon: Phone,
      label: currentContent.urgent,
      value: "+221 77 402 18 25",
      href: "tel:+221774021825",
      highlight: true
    },
    {
      icon: Mail,
      label: currentContent.email,
      value: "info@ndoukoumane-shipping.sn",
      href: "mailto:info@ndoukoumane-shipping.sn"
    },
    {
      icon: MapPin,
      label: currentContent.address,
      value: currentContent.addressText,
      href: "#"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      {/* Hero Section */}
      <section className="py-20 bg-blue-900 text-white">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl lg:text-5xl font-bold mb-6 font-serif leading-tight">
              {currentContent.title}
            </h1>
            <p className="text-xl lg:text-2xl text-blue-100 font-medium">
              {currentContent.subtitle}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8">
              {contactInfo.map((info, index) => (
                <motion.div
                  key={index}
                  className={`p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow ${
                    info.highlight ? 'bg-orange-50 border-2 border-orange-200' : 'bg-gray-50'
                  }`}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  viewport={{ once: true }}
                >
                  <div className="flex items-start space-x-4">
                    <div className={`p-3 rounded-lg ${
                      info.highlight ? 'bg-orange-500' : 'bg-blue-900'
                    }`}>
                      <info.icon className="h-6 w-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        {info.label}
                      </h3>
                      {info.href.startsWith('tel:') || info.href.startsWith('mailto:') ? (
                        <a
                          href={info.href}
                          className={`text-lg ${
                            info.highlight ? 'text-orange-600 hover:text-orange-700' : 'text-blue-600 hover:text-blue-700'
                          } transition-colors`}
                        >
                          {info.value}
                        </a>
                      ) : (
                        <p className="text-lg text-gray-700 whitespace-pre-line">
                          {info.value}
                        </p>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Hours */}
            <motion.div
              className="mt-12 p-6 bg-blue-50 rounded-xl"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="flex items-start space-x-4">
                <div className="p-3 bg-blue-900 rounded-lg">
                  <Clock className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {currentContent.hours}
                  </h3>
                  <p className="text-lg text-gray-700 whitespace-pre-line">
                    {currentContent.hoursText}
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Emergency Call Button */}
            <motion.div
              className="mt-12 text-center"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Button
                size="lg"
                className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 text-lg"
                asChild
              >
                <a href="tel:+221774021825">
                  <Phone className="h-5 w-5 mr-2" />
                  {currentContent.callButton}
                </a>
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;
