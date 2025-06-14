
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, Variants, Transition } from 'framer-motion';
import { ChevronLeft, ChevronRight, ArrowDown } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useLanguage } from '@/hooks/useLanguage';

type Slide = { src: string; alt: string };

interface HeroCarouselProps {
  slides: Slide[];
}

const HeroCarousel: React.FC<HeroCarouselProps> = ({ slides }) => {
  const { language } = useLanguage();
  const [[currentIndex, direction], setCurrentIndex] = useState<[number, number]>([0, 0]);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const heroContent = {
    fr: {
      title: "Construisons le futur de la consignation",
      subtitle: "Services portuaires de nouvelle génération au Sénégal",
      cta: "Demander un devis",
      discover: "Découvrir",
      prevSlide: "Diapositive précédente",
      nextSlide: "Diapositive suivante"
    },
    en: {
      title: "Building the future of stevedoring",
      subtitle: "Next-generation port services in Senegal",
      cta: "Request a quote",
      discover: "Discover",
      prevSlide: "Previous slide",
      nextSlide: "Next slide"
    }
  };

  const content = heroContent[language];

  // Auto-advance slides every 7 seconds
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex(([index]) => [(index + 1) % slides.length, 1]);
    }, 7000);

    return () => clearInterval(interval);
  }, [slides.length, isAutoPlaying]);

  // Navigation function
  const paginate = (newDirection: number) => {
    const newIndex = (currentIndex + newDirection + slides.length) % slides.length;
    setCurrentIndex([newIndex, newDirection]);
  };

  // Framer Motion variants for smooth transitions
  const slideVariants: Variants = {
    enter: (direction: number) => ({
      opacity: 0,
      scale: 1,
      x: direction > 0 ? 50 : -50
    }),
    center: {
      opacity: 1,
      scale: 1.05,
      x: 0,
      transition: {
        opacity: { duration: 0.8 },
        scale: { duration: 6, ease: [0.4, 0, 0.2, 1] as const },
        x: { duration: 0.8 }
      }
    },
    exit: (direction: number) => ({
      opacity: 0,
      scale: 1.1,
      x: direction > 0 ? -50 : 50,
      transition: {
        opacity: { duration: 0.6 },
        x: { duration: 0.6 }
      }
    })
  };

  const overlayVariants: Variants = {
    hidden: {
      opacity: 0,
      y: 20
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        delay: 0.3
      }
    }
  };

  return (
    <section 
      className="relative h-screen overflow-hidden bg-blue-900"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      {/* Slides */}
      <div className="absolute inset-0">
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="absolute inset-0"
          >
            <img
              src={slides[currentIndex].src}
              alt={slides[currentIndex].alt}
              className="w-full h-full object-cover"
              loading={currentIndex === 0 ? 'eager' : 'lazy'}
            />
          </motion.div>
        </AnimatePresence>
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/80 via-blue-800/70 to-transparent" />
      </div>

      {/* Content Overlay */}
      <div className="relative z-10 flex items-center justify-center h-full">
        <div className="container mx-auto px-4 text-center text-white">
          <motion.div
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            className="max-w-4xl mx-auto"
          >
            <motion.h1 className="text-4xl lg:text-6xl font-bold mb-6 font-serif leading-tight">
              {content.title}
            </motion.h1>
            
            <motion.p className="text-xl lg:text-2xl mb-8 text-blue-100 font-medium">
              {content.subtitle}
            </motion.p>
            
            <motion.div>
              <Button 
                size="lg" 
                className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 text-lg transform transition-transform hover:scale-105"
              >
                {content.cta}
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={() => paginate(-1)}
        aria-label={content.prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/30 text-white p-3 rounded-full backdrop-blur-sm transition-all duration-300 hover:scale-110"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>

      <button
        onClick={() => paginate(1)}
        aria-label={content.nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/30 text-white p-3 rounded-full backdrop-blur-sm transition-all duration-300 hover:scale-110"
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex([index, index > currentIndex ? 1 : -1])}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentIndex 
                ? 'bg-orange-500 scale-125' 
                : 'bg-white/50 hover:bg-white/75'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white z-20"
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
            {content.discover}
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroCarousel;
