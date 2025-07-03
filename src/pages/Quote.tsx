
import React from 'react';
import Navigation from '@/components/Navigation';
import QuoteHero from '@/components/quote/QuoteHero';
import QuoteBenefits from '@/components/quote/QuoteBenefits';
import QuoteForm from '@/components/quote/QuoteForm';
import Footer from '@/components/Footer';
import ChatAssistant from '@/components/ChatAssistant';
import { useLanguage } from '@/hooks/useLanguage';

const Quote = () => {
  const { language } = useLanguage();

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <QuoteHero />
      
      {/* Benefits and Form Section - Side by Side */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:grid lg:grid-cols-2 gap-10">
            {/* Left Column - Benefits */}
            <div>
              <QuoteBenefits />
            </div>
            
            {/* Right Column - Form */}
            <div>
              <QuoteForm />
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
      <ChatAssistant />
    </div>
  );
};

export default Quote;
