
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, ChevronRight, ChevronLeft } from 'lucide-react';
import { getPaginatedPosts } from '@/data/blogPosts';
import { useLanguage } from '@/hooks/useLanguage';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const BlogIndex = () => {
  const { language } = useLanguage();
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 6;
  
  const { posts, totalPages } = getPaginatedPosts(currentPage, postsPerPage);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return language === 'fr' 
      ? date.toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' })
      : date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  const title = language === 'fr' ? 'Actualités & Blog' : 'News & Blog';
  const subtitle = language === 'fr' 
    ? 'Suivez les dernières actualités du transport maritime et de la logistique au Sénégal'
    : 'Follow the latest news in maritime transport and logistics in Senegal';

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-900 to-blue-800 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{title}</h1>
            <p className="text-xl text-blue-100">{subtitle}</p>
          </div>
        </div>
      </div>

      {/* Posts Grid */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => {
            const title = language === 'fr' ? post.title_fr : post.title_en;
            const metaDescription = language === 'fr' ? post.meta_description_fr : post.meta_description_en;
            
            return (
              <Card key={post.id} className="hover:shadow-lg transition-shadow duration-300">
                <div className="relative h-48 overflow-hidden rounded-t-lg">
                  <img 
                    src={post.hero_image} 
                    alt={title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                      {post.category}
                    </span>
                  </div>
                </div>
                
                <CardHeader>
                  <CardTitle className="text-xl text-blue-900 mb-2 line-clamp-2">
                    {title}
                  </CardTitle>
                  <div className="flex items-center text-gray-500 text-sm">
                    <Calendar className="h-4 w-4 mr-2" />
                    {formatDate(post.published_date)}
                  </div>
                </CardHeader>
                
                <CardContent>
                  <p className="text-gray-600 mb-4 line-clamp-3">{metaDescription}</p>
                  <Link to={`/${language === 'fr' ? 'actualites' : 'blog'}/${post.slug}`}>
                    <Button variant="outline" className="w-full group">
                      {language === 'fr' ? 'Lire l\'article' : 'Read article'}
                      <ChevronRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center space-x-4 mt-12">
            <Button
              variant="outline"
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="flex items-center"
            >
              <ChevronLeft className="h-4 w-4 mr-2" />
              {language === 'fr' ? 'Précédent' : 'Previous'}
            </Button>
            
            <div className="flex space-x-2">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <Button
                  key={page}
                  variant={currentPage === page ? "default" : "outline"}
                  onClick={() => setCurrentPage(page)}
                  className="w-10 h-10"
                >
                  {page}
                </Button>
              ))}
            </div>
            
            <Button
              variant="outline"
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="flex items-center"
            >
              {language === 'fr' ? 'Suivant' : 'Next'}
              <ChevronRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogIndex;
