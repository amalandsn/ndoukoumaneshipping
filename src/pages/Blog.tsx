
import React from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import BlogIndex from '@/components/blog/BlogIndex';

const Blog = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <BlogIndex />
      <Footer />
    </div>
  );
};

export default Blog;
