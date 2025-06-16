
import React from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import ChatAssistant from '@/components/ChatAssistant';
import HeroCarousel from '@/components/HeroCarousel';
import ProcessTimeline from '@/components/ProcessTimeline';
import TestimonialsSlider from '@/components/TestimonialsSlider';
import ServicesSection from '@/components/ServicesSection';
import StatsSection from '@/components/StatsSection';
import CTASection from '@/components/CTASection';
import TrustIndicators from '@/components/TrustIndicators';

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <HeroCarousel />
      <StatsSection />
      <ServicesSection />
      <ProcessTimeline />
      <TestimonialsSlider />
      <CTASection />
      <TrustIndicators />
      <Footer />
      <ChatAssistant />
    </div>
  );
};

export default Index;
