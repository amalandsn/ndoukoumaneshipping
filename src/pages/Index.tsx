
import React, { Suspense } from 'react';
import Navigation from '@/components/Navigation';
import HeroCarousel from '@/components/HeroCarousel';
import PerformanceOptimizer from '@/components/PerformanceOptimizer';

// Lazy loading des sections non critiques
const ServicesSection = React.lazy(() => import('@/components/ServicesSection'));
const ActivitiesSection = React.lazy(() => import('@/components/ActivitiesSection'));
const WarehousesSection = React.lazy(() => import('@/components/WarehousesSection'));
const ProcessTimeline = React.lazy(() => import('@/components/ProcessTimeline'));
const StatsSection = React.lazy(() => import('@/components/StatsSection'));
const TestimonialsSlider = React.lazy(() => import('@/components/TestimonialsSlider'));
const CTASection = React.lazy(() => import('@/components/CTASection'));
const Footer = React.lazy(() => import('@/components/Footer'));
const ChatAssistant = React.lazy(() => import('@/components/ChatAssistant'));

// Composant de fallback simple
const SectionLoader = () => (
  <div className="w-full h-32 flex items-center justify-center">
    <div className="animate-pulse bg-gray-200 rounded-lg w-full h-16"></div>
  </div>
);

const Index = () => {
  return (
    <div className="min-h-screen bg-white">
      <PerformanceOptimizer />
      <Navigation />
      <HeroCarousel />
      
      <Suspense fallback={<SectionLoader />}>
        <ServicesSection />
      </Suspense>
      
      <Suspense fallback={<SectionLoader />}>
        <ActivitiesSection />
      </Suspense>
      
      <Suspense fallback={<SectionLoader />}>
        <WarehousesSection />
      </Suspense>
      
      <Suspense fallback={<SectionLoader />}>
        <ProcessTimeline />
      </Suspense>
      
      <Suspense fallback={<SectionLoader />}>
        <StatsSection />
      </Suspense>
      
      <Suspense fallback={<SectionLoader />}>
        <TestimonialsSlider />
      </Suspense>
      
      <Suspense fallback={<SectionLoader />}>
        <CTASection />
      </Suspense>
      
      <Suspense fallback={<SectionLoader />}>
        <Footer />
      </Suspense>
      
      <Suspense fallback={null}>
        <ChatAssistant />
      </Suspense>
    </div>
  );
};

export default Index;
