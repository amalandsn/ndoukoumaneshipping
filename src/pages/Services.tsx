
import React from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import ChatAssistant from '@/components/ChatAssistant';
import ServiceCard from '@/components/ServiceCard';
import { motion } from 'framer-motion';
import { useLanguage } from '@/hooks/useLanguage';
import { servicesData } from '@/data/services';
import { Button } from '@/components/ui/button';
import { FileText } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { getQuoteRoute } from '@/lib/routes';

const Services = () => {
  const { language } = useLanguage();
  const navigate = useNavigate();

  const content = {
    fr: {
      title: "Nos Services",
      subtitle: "Solutions logistiques complètes pour vos opérations commerciales",
      ctaButton: "Demander un devis",
      ctaText: "Besoin d'une solution personnalisée ? Contactez-nous pour un devis gratuit adapté à vos besoins."
    },
    en: {
      title: "Our Services",
      subtitle: "Complete logistics solutions for your commercial operations",
      ctaButton: "Request a quote",
      ctaText: "Need a personalized solution? Contact us for a free quote tailored to your needs."
    }
  };

  const currentContent = content[language];

  const handleQuoteClick = () => {
    navigate(getQuoteRoute(language));
  };

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

      {/* Services Grid */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {servicesData.map((service, index) => (
              <motion.div
                key={service.slug}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
              >
                <ServiceCard {...service} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-orange-500">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center text-white max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl lg:text-4xl font-bold mb-6 font-serif">
              {currentContent.ctaText}
            </h2>
            <Button 
              onClick={handleQuoteClick}
              className="bg-white text-orange-500 hover:bg-gray-100 text-lg px-8 py-4 font-semibold"
            >
              <FileText className="h-5 w-5 mr-2" />
              {currentContent.ctaButton}
            </Button>
          </motion.div>
        </div>
      </section>

      <ChatAssistant />
      <Footer />
    </div>
  );
};

export default Services;
