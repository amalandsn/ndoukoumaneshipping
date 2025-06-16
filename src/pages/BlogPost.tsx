
import React from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import BlogPostComponent from '@/components/blog/BlogPost';

const BlogPostPage = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <BlogPostComponent />
      <Footer />
    </div>
  );
};

export default BlogPostPage;
