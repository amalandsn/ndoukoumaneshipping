
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { ArrowDown } from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';

const HeroVideo = () => {
  const { language } = useLanguage();
  const [videoLoaded, setVideoLoaded] = useState(false);

  const heroContent = {
    fr: {
      title: "Construisons le futur de la consignation",
      subtitle: "Services portuaires de nouvelle génération au Sénégal",
      cta: "Demander un devis"
    },
    en: {
      title: "Building the future of stevedoring",
      subtitle: "Next-generation port services in Senegal", 
      cta: "Request a quote"
    }
  };

  const content = heroContent[language];

  return (
    <section className="relative h-screen overflow-hidden bg-blue-deep">
      {/* Background Video */}
      <div className="absolute inset-0">
        <video
          className={`w-full h-full object-cover transition-opacity duration-1000 ${
            videoLoaded ? 'opacity-70' : 'opacity-0'
          }`}
          autoPlay
          muted
          loop
          playsInline
          onLoadedData={() => setVideoLoaded(true)}
          poster="/placeholder.svg"
          preload="metadata"
        >
          {/* Placeholder for hero video - in production, replace with actual port video */}
          <source src="/hero-port.mp4" type="video/mp4" />
          <source src="/hero-port.webm" type="video/webm" />
        </video>
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-deep/80 via-blue-deep/70 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex items-center justify-center h-full">
        <div className="container mx-auto px-4 text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="max-w-4xl mx-auto"
          >
            <motion.h1 
              className="text-4xl lg:text-6xl font-bold mb-6 font-serif leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              {content.title}
            </motion.h1>
            
            <motion.p 
              className="text-xl lg:text-2xl mb-8 text-blue-100 font-medium"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
            >
              {content.subtitle}
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.9 }}
            >
              <Button 
                size="lg" 
                className="bg-white text-blue-deep hover:bg-white/90 px-8 py-4 text-lg transform transition-transform hover:scale-105"
              >
                {content.cta}
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
      >
        <motion.div
          animate={{ 
            scale: [0.95, 1, 0.95],
            y: [0, 5, 0]
          }}
          transition={{ 
            duration: 3, 
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="cursor-pointer"
        >
          <ArrowDown className="h-8 w-8 mx-auto" />
          <p className="text-sm mt-2 opacity-80">
            {language === 'fr' ? 'Découvrir' : 'Discover'}
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroVideo;
