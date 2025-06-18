import React from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import ChatAssistant from '@/components/ChatAssistant';

const BlogPostPage = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main className="container mx-auto py-6">
        {/* Blog Post Content Here */}
        <h1>Blog Post Title</h1>
        <p>This is the content of the blog post.</p>
      </main>
      <Footer />
      <ChatAssistant />
    </div>
  );
};

export default BlogPostPage;
