
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';

const QuoteHero = () => {
  const { language } = useLanguage();

  const scrollToForm = () => {
    const formSection = document.getElementById('quote-form');
    if (formSection) {
      formSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative h-96 bg-gradient-to-r from-blue-900 to-blue-700 text-white flex items-center">
      <div className="container mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl lg:text-5xl font-bold mb-6 font-serif">
            {language === 'fr' 
              ? 'Obtenez votre devis personnalisé en 24 h'
              : 'Get your tailored quote within 24 h'
            }
          </h1>
          <p className="text-xl text-blue-100 mb-8">
            {language === 'fr' 
              ? 'Réponse rapide, tarifs optimisés'
              : 'Fast reply, optimised rates'
            }
          </p>
          <button 
            onClick={scrollToForm}
            className="text-white hover:text-blue-200 transition-colors animate-bounce"
          >
            <ArrowDown className="h-8 w-8 mx-auto" />
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default QuoteHero;
