
import { serve } from "https://deno.land/std@0.224.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { translate } from './utils/translator.ts';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

const sb = createClient(
  Deno.env.get("SUPABASE_URL")!,
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
  { auth: { persistSession: false } },
);

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log('🚀 Starting shipping news sync with NewsAPI...');
    console.log('🕐 Current time:', new Date().toISOString());
    
    const newsApiKey = Deno.env.get("NEWSAPI_KEY");
    if (!newsApiKey) {
      throw new Error("NEWSAPI_KEY is not configured");
    }

    // Clean up old articles (older than 30 days)
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    
    console.log('🧹 Cleaning up old articles older than:', thirtyDaysAgo.toISOString());
    
    const { error: deleteError, count: deletedCount } = await sb
      .from("news")
      .delete({ count: 'exact' })
      .eq('source', 'Actualités Maritimes')
      .lt('published_at', thirtyDaysAgo.toISOString());
    
    if (deleteError) {
      console.error('❌ Error deleting old articles:', deleteError);
    } else {
      console.log(`✅ Cleaned up ${deletedCount || 0} old articles`);
    }

    // Fetch news from NewsAPI
    const newsApiUrl = `https://newsapi.org/v2/everything?q="logistique maritime" OR shipping OR "Port de Dakar"&language=fr&pageSize=5&sortBy=publishedAt&apiKey=${newsApiKey}`;
    
    console.log('📡 Fetching news from NewsAPI...');
    
    const response = await fetch(newsApiUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; NewsBot/1.0)',
      },
    });

    if (!response.ok) {
      throw new Error(`NewsAPI request failed: ${response.status} ${response.statusText}`);
    }

    const newsData = await response.json();
    console.log('📊 NewsAPI response:', newsData.status, `- ${newsData.totalResults} total results`);

    if (newsData.status !== 'ok') {
      throw new Error(`NewsAPI error: ${newsData.message || 'Unknown error'}`);
    }

    const articles = newsData.articles || [];
    console.log(`📰 Processing ${articles.length} articles...`);

    const processedArticles = [];

    for (const article of articles) {
      try {
        if (!article.title || !article.url) {
          console.log('⚠️ Skipping article with missing title or URL');
          continue;
        }

        // Generate slug from title and timestamp
        const slug = `shipping-news-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
        
        // Translate title and description to English
        console.log(`🔤 Translating: "${article.title}"`);
        const titleEn = await translate(article.title, 'en');
        const excerptEn = article.description ? await translate(article.description, 'en') : '';

        const processedArticle = {
          source: 'Actualités Maritimes',
          title_fr: article.title,
          title_en: titleEn,
          excerpt_fr: article.description || '',
          excerpt_en: excerptEn,
          url: article.url,
          slug: slug,
          published_at: article.publishedAt || new Date().toISOString(),
          display_order: processedArticles.length + 1,
        };

        processedArticles.push(processedArticle);
        console.log(`✅ Processed: "${article.title}"`);
        
        // Small delay to avoid overwhelming translation service
        await new Promise(resolve => setTimeout(resolve, 500));
        
      } catch (error) {
        console.error('❌ Error processing article:', error);
        continue;
      }
    }

    console.log(`📊 Total processed articles: ${processedArticles.length}`);

    // Insert articles into database
    if (processedArticles.length > 0) {
      console.log('💾 Inserting articles into database...');
      
      const { data: insertedData, error: insertError } = await sb
        .from("news")
        .upsert(processedArticles, { 
          onConflict: "slug",
          ignoreDuplicates: false 
        })
        .select();
      
      if (insertError) {
        console.error('💥 Database upsert error:', insertError);
        throw insertError;
      }
      
      console.log(`✅ Successfully synced ${processedArticles.length} shipping news articles`);
      console.log('📊 Inserted data:', insertedData);
    } else {
      console.log('⚠️ No articles to insert');
    }
    
    const response_data = {
      success: true, 
      synced: processedArticles.length,
      message: `Shipping news sync completed successfully - ${processedArticles.length} articles synced`,
      timestamp: new Date().toISOString(),
      articles: processedArticles.map(a => ({ 
        title: a.title_fr, 
        source: a.source,
        url: a.url,
        slug: a.slug
      }))
    };
    
    console.log('🎉 Sync process completed successfully:', response_data);
    
    return new Response(
      JSON.stringify(response_data),
      {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
    
  } catch (e) {
    console.error('💥 Shipping news sync failed with critical error:', e);
    console.error('💥 Error stack:', e.stack);
    
    const errorResponse = {
      success: false, 
      message: e.message || 'Unknown error occurred',
      error: e.toString(),
      timestamp: new Date().toISOString(),
      synced: 0
    };
    
    return new Response(
      JSON.stringify(errorResponse),
      { 
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
