
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
      <QuoteBenefits />
      <QuoteForm />
      <Footer />
      <ChatAssistant />
    </div>
  );
};

export default Quote;
