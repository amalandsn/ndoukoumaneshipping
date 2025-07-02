
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, Variants, Transition } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { ArrowDown, Pause, Play } from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';

interface Slide {
  src: string;
  alt: string;
}

interface HeroSliderProps {
  slides: Slide[];
}

const HeroSlider: React.FC<HeroSliderProps> = ({ slides }) => {
  const { language } = useLanguage();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  const heroContent = {
    fr: {
      title: "Construisons le futur de la consignation",
      subtitle: "Services portuaires de nouvelle génération au Sénégal",
      cta: "Demander un devis",
      discover: "Découvrir",
      stopAnimations: "Arrêter les animations",
      startAnimations: "Démarrer les animations"
    },
    en: {
      title: "Building the future of stevedoring",
      subtitle: "Next-generation port services in Senegal",
      cta: "Request a quote",
      discover: "Discover",
      stopAnimations: "Stop animations",
      startAnimations: "Start animations"
    }
  };

  const content = heroContent[language];

  // Check for reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mediaQuery.matches);
    
    const handleChange = () => setReducedMotion(mediaQuery.matches);
    mediaQuery.addEventListener('change', handleChange);
    
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Auto-advance slides
  useEffect(() => {
    if (!isPlaying || isPaused || reducedMotion) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 7000);

    return () => clearInterval(interval);
  }, [slides.length, isPlaying, isPaused, reducedMotion]);

  // Touch/swipe handling
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const minSwipeDistance = 50;

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    } else if (isRightSwipe) {
      setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    }
  };

  // Fixed Framer Motion variants with proper typing
  const TRANSITION: Transition = { 
    duration: reducedMotion ? 0 : 6, 
    ease: [0.4, 0, 0.2, 1] as const
  };

  const slideVariants: Variants = {
    enter: {
      opacity: 0,
      scale: reducedMotion ? 1 : 1,
    },
    center: {
      opacity: 1,
      scale: reducedMotion ? 1 : 1.05,
      transition: {
        opacity: { duration: 0.8 },
        scale: TRANSITION
      }
    },
    exit: {
      opacity: 0,
      scale: reducedMotion ? 1 : 1.05,
      transition: {
        opacity: { duration: 0.6 }
      }
    }
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
      className="relative h-screen overflow-hidden bg-blue-deep"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      {/* Slides */}
      <div className="absolute inset-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="absolute inset-0"
          >
            <img
              src={slides[currentSlide].src}
              alt={slides[currentSlide].alt}
              className={`w-full h-full object-cover ${reducedMotion ? '' : 'kenburns'}`}
              loading={currentSlide === 0 ? 'eager' : 'lazy'}
            />
          </motion.div>
        </AnimatePresence>
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-deep/80 via-blue-deep/70 to-transparent" />
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
            <motion.h1 
              className="text-4xl lg:text-6xl font-bold mb-6 font-serif leading-tight"
            >
              {content.title}
            </motion.h1>
            
            <motion.p 
              className="text-xl lg:text-2xl mb-8 text-blue-100 font-medium"
            >
              {content.subtitle}
            </motion.p>
            
            <motion.div>
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

      {/* Slide Indicators */}
      <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide 
                ? 'bg-blue-deep scale-125' 
                : 'bg-white/50 hover:bg-white/75'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Animation Control Toggle */}
      <button
        onClick={() => setIsPlaying(!isPlaying)}
        className="absolute top-4 right-4 z-20 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
        aria-label={isPlaying ? content.stopAnimations : content.startAnimations}
        aria-controls="hero-slider"
      >
        {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
      </button>

      {/* Scroll Indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white z-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
      >
        <motion.div
          animate={reducedMotion ? {} : { 
            scale: [0.95, 1, 0.95],
            y: [0, 5, 0]
          }}
          transition={reducedMotion ? {} : { 
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

export default HeroSlider;
