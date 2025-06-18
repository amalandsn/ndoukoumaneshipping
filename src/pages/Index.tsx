
import React from 'react';
import Navigation from '@/components/Navigation';
import HeroCarousel from '@/components/HeroCarousel';
import ServicesSection from '@/components/ServicesSection';
import ProcessTimeline from '@/components/ProcessTimeline';
import StatsSection from '@/components/StatsSection';
import TestimonialsSlider from '@/components/TestimonialsSlider';
import CTASection from '@/components/CTASection';
import Footer from '@/components/Footer';
import ChatAssistant from '@/components/ChatAssistant';

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <HeroCarousel />
      <ServicesSection />
      <ProcessTimeline />
      <StatsSection />
      <TestimonialsSlider />
      <CTASection />
      <Footer />
      <ChatAssistant />
    </div>
  );
};

export default Index;
