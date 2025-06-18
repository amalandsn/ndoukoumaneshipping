import React from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import ChatAssistant from '@/components/ChatAssistant';

const Blog = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main className="container mx-auto py-6">
        <h1 className="text-3xl font-bold mb-4">Blog</h1>
        <p>This is the blog page content.</p>
      </main>
      <Footer />
      <ChatAssistant />
    </div>
  );
};

export default Blog;

