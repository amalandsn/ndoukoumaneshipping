
export interface BlogPost {
  id: string;
  slug: string;
  title_fr: string;
  title_en: string;
  meta_description_fr: string;
  meta_description_en: string;
  keywords: string[];
  hero_image: string;
  infographic?: string;
  content_fr: string;
  content_en: string;
  key_figure_fr: string;
  key_figure_en: string;
  published_date: string;
  last_updated: string;
  category: string;
}

// Sample blog posts removed - this will be populated by CMS in phase 2
export const blogPosts: BlogPost[] = [];

// Helper functions for blog data management
export const getAllPosts = (): BlogPost[] => {
  return blogPosts.sort((a, b) => new Date(b.published_date).getTime() - new Date(a.published_date).getTime());
};

export const getPostBySlug = (slug: string): BlogPost | undefined => {
  return blogPosts.find(post => post.slug === slug);
};

export const getPaginatedPosts = (page: number, limit: number = 6): { posts: BlogPost[], totalPages: number } => {
  const allPosts = getAllPosts();
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  
  return {
    posts: allPosts.slice(startIndex, endIndex),
    totalPages: Math.ceil(allPosts.length / limit)
  };
};
