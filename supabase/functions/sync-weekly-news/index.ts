
import { serve } from "https://deno.land/std@0.224.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { scrapePADEspaceMedia } from './scrapers/pad-espace-media.ts';
import { scrapePADDirect } from './scrapers/pad-direct.ts';

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
    console.log('🚀 Starting PAD news sync process...');
    console.log('🕐 Current time:', new Date().toISOString());
    
    // Nettoyer les anciens articles (plus de 30 jours)
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    
    console.log('🧹 Cleaning up old articles older than:', thirtyDaysAgo.toISOString());
    
    const { error: deleteError, count: deletedCount } = await sb
      .from("news")
      .delete({ count: 'exact' })
      .or('source.ilike.%Port Autonome de Dakar%,source.ilike.%Port de Dakar%')
      .lt('published_at', thirtyDaysAgo.toISOString());
    
    if (deleteError) {
      console.error('❌ Error deleting old articles:', deleteError);
    } else {
      console.log(`✅ Cleaned up ${deletedCount || 0} old articles`);
    }
    
    console.log('📡 Starting scraping processes...');
    
    // Exécuter les deux scrapers en parallèle avec un timeout
    const [padEspace, padDirect] = await Promise.allSettled([
      Promise.race([
        scrapePADEspaceMedia(),
        new Promise((_, reject) => setTimeout(() => reject(new Error('Timeout')), 30000))
      ]),
      Promise.race([
        scrapePADDirect(),
        new Promise((_, reject) => setTimeout(() => reject(new Error('Timeout')), 30000))
      ])
    ]);
    
    // Traiter les résultats des scrapers
    let padEspaceArticles = [];
    let padDirectArticles = [];
    
    if (padEspace.status === 'fulfilled') {
      padEspaceArticles = Array.isArray(padEspace.value) ? padEspace.value : [];
      console.log(`✅ PAD espace-media: ${padEspaceArticles.length} articles`);
    } else {
      console.error('❌ PAD espace-media failed:', padEspace.reason);
    }
    
    if (padDirect.status === 'fulfilled') {
      padDirectArticles = Array.isArray(padDirect.value) ? padDirect.value : [];
      console.log(`✅ PAD direct: ${padDirectArticles.length} articles`);
    } else {
      console.error('❌ PAD direct failed:', padDirect.reason);
    }
    
    // Combiner tous les articles
    const allArticles = [...padEspaceArticles, ...padDirectArticles];
    console.log(`📊 Total articles to sync: ${allArticles.length}`);
    
    // Vérifier que nous avons des articles à insérer
    if (allArticles.length === 0) {
      console.log('⚠️ No articles found, creating fallback test articles...');
      const fallbackArticles = [
        {
          source: "Port Autonome de Dakar",
          title_fr: "Actualités du Port Autonome de Dakar",
          title_en: "Port Autonome de Dakar News",
          excerpt_fr: "Restez informé des dernières actualités et développements du Port Autonome de Dakar, premier port d'Afrique de l'Ouest.",
          excerpt_en: "Stay informed about the latest news and developments from Port Autonome de Dakar, West Africa's leading port.",
          url: "https://www.portdakar.sn/espace-media/actualites",
          slug: `pad-fallback-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          published_at: new Date().toISOString(),
          display_order: 1,
        }
      ];
      allArticles.push(...fallbackArticles);
    }
    
    if (allArticles.length > 0) {
      console.log('💾 Inserting articles into database...');
      console.log('📄 Articles to insert:', allArticles.map(a => ({ title: a.title_fr, source: a.source, url: a.url })));
      
      const { data: insertedData, error: insertError } = await sb
        .from("news")
        .upsert(allArticles, { 
          onConflict: "slug",
          ignoreDuplicates: false 
        })
        .select();
      
      if (insertError) {
        console.error('💥 Database upsert error:', insertError);
        throw insertError;
      }
      
      console.log(`✅ Successfully synced ${allArticles.length} PAD articles`);
      console.log('📊 Inserted data:', insertedData);
    }
    
    const response = {
      success: true, 
      synced: allArticles.length,
      pad_espace_articles: padEspaceArticles.length,
      pad_direct_articles: padDirectArticles.length,
      message: `PAD news sync completed successfully - ${allArticles.length} articles synced`,
      timestamp: new Date().toISOString(),
      articles: allArticles.map(a => ({ 
        title: a.title_fr, 
        source: a.source,
        url: a.url,
        slug: a.slug
      }))
    };
    
    console.log('🎉 Sync process completed successfully:', response);
    
    return new Response(
      JSON.stringify(response),
      {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
    
  } catch (e) {
    console.error('💥 PAD news sync failed with critical error:', e);
    console.error('💥 Error stack:', e.stack);
    
    const errorResponse = {
      success: false, 
      message: e.message || 'Unknown error occurred',
      error: e.toString(),
      timestamp: new Date().toISOString(),
      synced: 0,
      pad_espace_articles: 0,  
      pad_direct_articles: 0
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
