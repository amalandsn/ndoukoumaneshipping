
import React from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useLanguage } from '@/hooks/useLanguage';

const CTASection = () => {
  const { language } = useLanguage();

  const scrollToContact = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="py-20 bg-gradient-to-r from-orange-500 to-orange-600 text-white" id="contact">
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
          <p className="text-xl mb-8 text-orange-100 max-w-2xl mx-auto">
            {language === 'fr' ?
              "Contactez notre équipe d'experts pour un accompagnement personnalisé et des solutions sur mesure." :
              'Contact our team of experts for personalized support and customized solutions.'
            }
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-white text-orange-600 hover:bg-gray-100 px-8 py-4 transform transition-transform hover:scale-105"
              onClick={() => window.location.href = 'tel:+221774021825'}
            >
              <Phone className="h-5 w-5 mr-2" />
              {language === 'fr' ? 'Nous appeler' : 'Call us'}
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-orange-700 px-8 py-4 transform transition-transform hover:scale-105"
              onClick={() => window.location.href = 'mailto:contact@ndoukoumaneshipping.sn'}
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
