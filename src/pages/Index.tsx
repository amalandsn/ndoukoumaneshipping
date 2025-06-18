
import React from 'react';
import Navigation from '@/components/Navigation';
import HeroCarousel from '@/components/HeroCarousel';
import ServicesSection from '@/components/ServicesSection';
import ProcessTimeline from '@/components/ProcessTimeline';
import StatsSection from '@/components/StatsSection';
import TestimonialsSlider from '@/components/TestimonialsSlider';
import CTASection from '@/components/CTASection';
import Footer from '@/components/Footer';
import NewsSection from '@/components/news/NewsSection';

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <HeroCarousel />
      <ServicesSection />
      <ProcessTimeline />
      <StatsSection />
      <TestimonialsSlider />
      <NewsSection />
      <CTASection />
      <Footer />
    </div>
  );
};

export default Index;
