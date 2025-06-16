
import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { Calendar, Clock, Tag } from 'lucide-react';
import { getPostBySlug } from '@/data/blogPosts';
import { useLanguage } from '@/hooks/useLanguage';
import KeyFigureBox from './KeyFigureBox';
import { Button } from '@/components/ui/button';

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const { language } = useLanguage();
  
  if (!slug) {
    return <Navigate to={language === 'fr' ? '/actualites' : '/blog'} replace />;
  }

  const post = getPostBySlug(slug);
  
  if (!post) {
    return <Navigate to={language === 'fr' ? '/actualites' : '/blog'} replace />;
  }

  const title = language === 'fr' ? post.title_fr : post.title_en;
  const content = language === 'fr' ? post.content_fr : post.content_en;
  const keyFigure = language === 'fr' ? post.key_figure_fr : post.key_figure_en;
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return language === 'fr' 
      ? date.toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' })
      : date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="relative h-64 md:h-80 overflow-hidden">
        <img 
          src={post.hero_image} 
          alt={title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-end">
          <div className="container mx-auto px-4 pb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">{title}</h1>
            <div className="flex flex-wrap items-center gap-4 text-white text-sm">
              <div className="flex items-center space-x-2">
                <Calendar className="h-4 w-4" />
                <span>{formatDate(post.published_date)}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Tag className="h-4 w-4" />
                <span>{post.category}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <article className="prose prose-lg max-w-none">
            <div className="text-gray-700 leading-relaxed space-y-6">
              {content.split('\n\n').map((paragraph, index) => {
                if (paragraph.startsWith('## ')) {
                  return (
                    <h2 key={index} className="text-2xl font-bold text-blue-900 mt-8 mb-4">
                      {paragraph.replace('## ', '')}
                    </h2>
                  );
                }
                if (paragraph.startsWith('### ')) {
                  return (
                    <h3 key={index} className="text-xl font-semibold text-gray-800 mt-6 mb-3">
                      {paragraph.replace('### ', '')}
                    </h3>
                  );
                }
                if (paragraph.includes('•')) {
                  const items = paragraph.split('•').filter(item => item.trim());
                  return (
                    <ul key={index} className="list-disc list-inside space-y-2 ml-4">
                      {items.map((item, itemIndex) => (
                        <li key={itemIndex} className="text-gray-700">{item.trim()}</li>
                      ))}
                    </ul>
                  );
                }
                return (
                  <p key={index} className="text-gray-700 mb-4">
                    {paragraph}
                  </p>
                );
              })}
            </div>

            <KeyFigureBox figure={keyFigure} language={language} />

            {post.infographic && (
              <div className="my-8">
                <img 
                  src={post.infographic} 
                  alt={language === 'fr' ? 'Infographie' : 'Infographic'}
                  className="w-full max-w-2xl mx-auto rounded-lg shadow-md"
                />
              </div>
            )}

            <div className="mt-12 p-6 bg-blue-50 rounded-lg border border-blue-200">
              <h3 className="text-xl font-bold text-blue-900 mb-4">
                {language === 'fr' 
                  ? 'Besoin d\'accompagnement pour vos expéditions ?' 
                  : 'Need support for your shipments?'
                }
              </h3>
              <p className="text-gray-700 mb-4">
                {language === 'fr'
                  ? 'Notre équipe d\'experts est à votre disposition pour vous accompagner dans vos projets logistiques. Contactez-nous pour un devis personnalisé.'
                  : 'Our team of experts is available to support you in your logistics projects. Contact us for a personalized quote.'
                }
              </p>
              <Button className="bg-orange-500 hover:bg-orange-600 text-white">
                {language === 'fr' ? 'Demander un devis' : 'Request a quote'}
              </Button>
            </div>
          </article>
        </div>
      </div>
    </div>
  );
};

export default BlogPost;
