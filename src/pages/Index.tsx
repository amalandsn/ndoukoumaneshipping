
import React from 'react';
import Navigation from '@/components/Navigation';
import HeroCarousel from '@/components/HeroCarousel';
import ServicesSection from '@/components/ServicesSection';
import ActivitiesSection from '@/components/ActivitiesSection';
import WarehousesSection from '@/components/WarehousesSection';
import ProcessTimeline from '@/components/ProcessTimeline';
import StatsSection from '@/components/StatsSection';
import TestimonialsSlider from '@/components/TestimonialsSlider';
import CTASection from '@/components/CTASection';
import Footer from '@/components/Footer';
import ChatAssistant from '@/components/ChatAssistant';
import PerformanceOptimizer from '@/components/PerformanceOptimizer';

const Index = () => {
  return (
    <div className="min-h-screen">
      <PerformanceOptimizer />
      <Navigation />
      <HeroCarousel />
      <ServicesSection />
      <ActivitiesSection />
      <WarehousesSection />
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
