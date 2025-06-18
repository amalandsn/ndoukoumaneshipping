import React from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import ChatAssistant from '@/components/ChatAssistant';

const IndustryNews = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <div className="container mx-auto py-12">
        <h1 className="text-3xl font-bold mb-4">Industry News</h1>
        <p>Stay tuned for the latest industry news and updates.</p>
      </div>
      <Footer />
      <ChatAssistant />
    </div>
  );
};

export default IndustryNews;
