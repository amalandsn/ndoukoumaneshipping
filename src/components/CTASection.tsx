
import React from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, FileText } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useLanguage } from '@/hooks/useLanguage';
import { useNavigate } from 'react-router-dom';
import { getQuoteRoute } from '@/lib/routes';

const CTASection = () => {
  const { language } = useLanguage();
  const navigate = useNavigate();

  const handleQuoteClick = () => {
    navigate(getQuoteRoute(language));
  };

  const handleCallClick = () => {
    navigate('/contact');
  };

  const handleEmailClick = () => {
    navigate('/contact');
  };

  return (
    <section className="py-20 bg-blue-deep text-white" id="contact">
      <div className="container mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl lg:text-4xl font-bold mb-6 font-serif">
            {language === 'fr' ?
              'Prêt à optimiser vos opérations maritimes ?' :
              'Ready to optimize your maritime operations?'
            }
          </h2>
          <p className="text-xl mb-8 text-white/80 max-w-2xl mx-auto">
            {language === 'fr' ?
              "Contactez notre équipe d'experts pour un accompagnement personnalisé et des solutions sur mesure." :
              'Contact our team of experts for personalized support and customized solutions.'
            }
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-white text-blue-deep hover:bg-gray-100 border-2 border-white px-8 py-4 transform transition-transform hover:scale-105"
              onClick={handleQuoteClick}
            >
              <FileText className="h-5 w-5 mr-2" />
              {language === 'fr' ? 'Demander un devis' : 'Request a quote'}
            </Button>
            <Button 
              size="lg" 
              className="bg-transparent text-white hover:bg-white/10 border-2 border-white px-8 py-4 transform transition-transform hover:scale-105"
              onClick={handleCallClick}
            >
              <Phone className="h-5 w-5 mr-2" />
              {language === 'fr' ? 'Nous appeler' : 'Call us'}
            </Button>
            <Button
              size="lg"
              className="bg-transparent text-white hover:bg-white/10 border-2 border-white px-8 py-4 transform transition-transform hover:scale-105"
              onClick={handleEmailClick}
            >
              <Mail className="h-5 w-5 mr-2" />
              {language === 'fr' ? 'Nous écrire' : 'Email us'}
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
