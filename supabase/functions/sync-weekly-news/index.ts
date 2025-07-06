
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
    console.log('Starting PAD news sync...');
    
    // Nettoyer les anciens articles (plus de 30 jours)
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    
    const { error: deleteError } = await sb
      .from("news")
      .delete()
      .or('source.ilike.%Port Autonome de Dakar%,source.ilike.%Port de Dakar%')
      .lt('published_at', thirtyDaysAgo.toISOString());
    
    if (deleteError) {
      console.error('Error deleting old articles:', deleteError);
    } else {
      console.log('Old articles cleaned up');
    }
    
    const [padEspace, padDirect] = await Promise.all([
      scrapePADEspaceMedia(),     // PAD espace-media (3 articles)
      scrapePADDirect(),          // PAD direct site (2 articles)
    ]);
    
    // Combiner les sources PAD pour un total de 5 articles maximum
    const rows = [...padEspace, ...padDirect];
    console.log(`Total PAD articles to sync: ${rows.length} (PAD espace: ${padEspace.length}, PAD direct: ${padDirect.length})`);
    
    if (rows.length > 0) {
      // Insérer les nouveaux articles
      const { error } = await sb.from("news").upsert(rows, { 
        onConflict: "slug",
        ignoreDuplicates: false 
      });
      if (error) {
        console.error('Database upsert error:', error);
        throw error;
      }
      console.log(`Successfully synced ${rows.length} PAD articles`);
    } else {
      console.log('No articles found to sync');
    }
    
    return new Response(
      JSON.stringify({ 
        success: true, 
        synced: rows.length,
        pad_espace_articles: padEspace.length,
        pad_direct_articles: padDirect.length,
        message: `PAD news sync completed successfully - ${rows.length} articles synced`,
        articles: rows.map(r => ({ title: r.title_fr, url: r.url }))
      }),
      {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (e) {
    console.error('PAD news sync failed:', e);
    return new Response(
      JSON.stringify({ 
        success: false, 
        message: e.message,
        error: e.toString()
      }),
      { 
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
