
import { serve } from "https://deno.land/std@0.224.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { parse } from "https://deno.land/x/xml_parser@v0.2.0/mod.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SERVICE_ROLE = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const sb = createClient(SUPABASE_URL, SERVICE_ROLE, { auth: { persistSession: false } });

// Helper function to create slug from text
function createSlug(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
    .substring(0, 100);
}

/* ----------- 1. PAD scraping via jina.ai proxy (HTML → JSON) ----------- */
const PAD_PROXY = "https://r.jina.ai/http://www.portdakar.sn/espace-media/actualites";

async function fetchPad() {
  try {
    console.log('Fetching PAD news via Jina.ai proxy...');
    const res = await fetch(PAD_PROXY);
    if (!res.ok) throw new Error(`PAD proxy fetch failed: ${res.status}`);
    
    const txt = await res.text();
    const items: any[] = [];
    
    // Parse the structured text from jina.ai
    txt.split("\n").slice(0, 10).forEach((line) => {
      const m = line.match(/^\d+\.\s+(.+?)\s+-\s+(https?:\/\/\S+)/);
      if (m) {
        const title = m[1].trim();
        const url = m[2].trim();
        items.push({
          source: "Port Autonome de Dakar",
          title_fr: title,
          title_en: title,
          url: url,
          slug: createSlug(title) + '-pad',
          excerpt_fr: "",
          excerpt_en: "",
          published_at: new Date().toISOString(),
        });
      }
    });
    
    console.log(`Found ${items.length} PAD articles`);
    return items.slice(0, 3);
  } catch (error) {
    console.error('Error fetching PAD:', error);
    return [];
  }
}

/* ----------- 2. Port Technology RSS via fetch + XML parser ----------- */
const PTI_RSS = "https://www.porttechnology.org/feed/";

async function fetchPTI() {
  try {
    console.log('Fetching PTI RSS...');
    const response = await fetch(PTI_RSS);
    if (!response.ok) throw new Error(`PTI RSS fetch failed: ${response.status}`);
    
    const xml = await response.text();
    const doc = parse(xml);
    const items: any[] = [];
    
    // Handle both single item and array of items
    const rssItems = Array.isArray(doc.rss.channel.item) 
      ? doc.rss.channel.item 
      : [doc.rss.channel.item];
    
    for (const item of rssItems.slice(0, 3)) {
      if (item && item.title && item.link) {
        const title = item.title.toString();
        const description = item.description ? item.description.toString() : '';
        const cleanDescription = description.replace(/<[^>]+>/g, "").slice(0, 160);
        
        items.push({
          source: "Port Technology International",
          title_fr: title,
          title_en: title,
          url: item.link.toString(),
          slug: createSlug(title) + '-pti',
          excerpt_fr: cleanDescription,
          excerpt_en: cleanDescription,
          published_at: item.pubDate ? new Date(item.pubDate.toString()).toISOString() : new Date().toISOString(),
        });
      }
    }
    
    console.log(`Found ${items.length} PTI articles`);
    return items;
  } catch (error) {
    console.error('Error fetching PTI:', error);
    return [];
  }
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log('Starting news sync...');
    
    // Fetch news from both sources
    const [padArticles, ptiArticles] = await Promise.all([
      fetchPad(),
      fetchPTI()
    ]);

    const allArticles = [...padArticles, ...ptiArticles];
    console.log(`Total articles to sync: ${allArticles.length}`);

    // Insert or update articles
    if (allArticles.length > 0) {
      const { error } = await sb
        .from('news')
        .upsert(allArticles, { 
          onConflict: 'slug',
          ignoreDuplicates: false 
        });
      
      if (error) {
        console.error('Error inserting articles:', error);
        throw error;
      }
    }

    console.log('News sync completed successfully');
    
    return new Response(
      JSON.stringify({ 
        success: true, 
        synced: allArticles.length,
        message: 'News sync completed successfully' 
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      }
    );
  } catch (error) {
    console.error('News sync failed:', error);
    
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error.message 
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500 
      }
    );
  }
});
