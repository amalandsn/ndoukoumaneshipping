import React, { useState } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import ChatAssistant from '@/components/ChatAssistant';
import { useLanguage } from '@/hooks/useLanguage';

const Contact = () => {
  const { language } = useLanguage();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Form submission logic would go here
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen">
      <Navigation />
      <main className="container mx-auto py-12">
        <h1 className="text-3xl font-bold mb-6 font-serif">
          {language === 'fr' ? 'Contact' : 'Contact'}
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Contact form fields */}
          <p>Page de contact en développement...</p>
        </form>
      </main>
      <Footer />
      <ChatAssistant />
    </div>
  );
};

export default Contact;
