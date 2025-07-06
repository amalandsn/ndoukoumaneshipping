
import React from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import ChatAssistant from '@/components/ChatAssistant';
import IndustryNewsContent from '@/components/news/IndustryNewsContent';

const IndustryNews = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <IndustryNewsContent />
      <Footer />
      <ChatAssistant />
    </div>
  );
};

export default IndustryNews;
