
import { serve } from "https://deno.land/std@0.224.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

/* ENV ------------------------------------------------------------------ */
const sb = createClient(
  Deno.env.get("SUPABASE_URL")!,
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
  { auth: { persistSession: false } },
);

/* ---------- 1. PAD Source 1: Port Autonome de Dakar (espace-media) ---- */
const PAD_INDEX = "https://www.portdakar.sn/espace-media/actualites";

async function scrapePAD() {
  try {
    console.log('Fetching PAD espace-media articles...');
    const html = await (await fetch(PAD_INDEX)).text();
    const linkRx = /href="(\/actualites\/[^"]+)"/g;
    const links = [...html.matchAll(linkRx)].slice(0, 2).map(m => `https://www.portdakar.sn${m[1]}`);
    console.log(`Found ${links.length} PAD espace-media article links`);
    
    const items = [];

    for (const url of links) {
      try {
        console.log(`Scraping PAD espace-media article: ${url}`);
        const page = await (await fetch(url)).text();
        const title = (page.match(/<h1[^>]*>(.*?)<\/h1>/i)?.[1] || "").replace(/<[^>]+>/g,"").trim();
        const para = (page.match(/<p[^>]*>(.*?)<\/p>/i)?.[1] || "").replace(/<[^>]+>/g,"").trim();
        
        if (title) {
          const titleEn = await translate(title, "en");
          const excerptEn = para ? await translate(para.slice(0,160), "en") : "";
          
          items.push({
            source: "Port Autonome de Dakar",
            title_fr: title,
            title_en: titleEn,
            excerpt_fr: para.slice(0,160),
            excerpt_en: excerptEn,
            url,
            slug: `${url.split("/").pop()}-pad-espace-${Date.now()}`,
            published_at: new Date().toISOString(),
            display_order: 1,
          });
          console.log(`Successfully scraped PAD espace-media article: ${title}`);
        }
      } catch (error) {
        console.error(`Error scraping PAD espace-media article ${url}:`, error);
      }
    }
    
    console.log(`PAD espace-media scraping completed: ${items.length} articles`);
    return items;
  } catch (error) {
    console.error('Error in scrapePAD espace-media:', error);
    return [];
  }
}

/* ---------- 2. PAD Source 2: Port de Dakar (direct site) -------------- */
const PAD_DIRECT = "https://www.portdakar.sn/";

async function scrapePADDirect() {
  try {
    console.log('Fetching PAD direct site articles...');
    const html = await (await fetch(PAD_DIRECT)).text();
    
    // Chercher des liens vers des actualités sur la page d'accueil
    const linkRx = /href="([^"]*(?:actualite|news|article)[^"]*)"[^>]*>/gi;
    const matches = [...html.matchAll(linkRx)];
    
    // Filtrer et construire les URLs complètes
    const links = matches
      .map(m => {
        let url = m[1];
        if (url.startsWith('/')) {
          url = `https://www.portdakar.sn${url}`;
        } else if (!url.startsWith('http')) {
          url = `https://www.portdakar.sn/${url}`;
        }
        return url;
      })
      .filter(url => url.includes('portdakar.sn'))
      .slice(0, 1); // Limité à 1 article pour avoir un total de 3

    console.log(`Found ${links.length} PAD direct article links`);
    
    const items = [];

    for (const url of links) {
      try {
        console.log(`Scraping PAD direct article: ${url}`);
        const page = await (await fetch(url)).text();
        
        // Essayer différents sélecteurs pour le titre
        let title = "";
        const titleSelectors = [
          /<h1[^>]*>(.*?)<\/h1>/i,
          /<title[^>]*>(.*?)<\/title>/i,
          /<h2[^>]*class="[^"]*title[^"]*"[^>]*>(.*?)<\/h2>/i
        ];
        
        for (const selector of titleSelectors) {
          const match = page.match(selector);
          if (match && match[1]) {
            title = match[1].replace(/<[^>]+>/g,"").trim();
            break;
          }
        }
        
        // Essayer différents sélecteurs pour le contenu
        let content = "";
        const contentSelectors = [
          /<p[^>]*class="[^"]*excerpt[^"]*"[^>]*>(.*?)<\/p>/i,
          /<div[^>]*class="[^"]*content[^"]*"[^>]*>.*?<p[^>]*>(.*?)<\/p>/i,
          /<p[^>]*>(.*?)<\/p>/i
        ];
        
        for (const selector of contentSelectors) {
          const match = page.match(selector);
          if (match && match[1]) {
            content = match[1].replace(/<[^>]+>/g,"").trim();
            if (content.length > 20) break;
          }
        }
        
        if (title && title.length > 10) {
          const titleEn = await translate(title, "en");
          const excerptEn = content ? await translate(content.slice(0,160), "en") : "";
          
          items.push({
            source: "Port de Dakar",
            title_fr: title,
            title_en: titleEn,
            excerpt_fr: content.slice(0,160),
            excerpt_en: excerptEn,
            url,
            slug: `${url.split("/").pop() || `pad-direct-${Date.now()}`}-direct-${Date.now()}`,
            published_at: new Date().toISOString(),
            display_order: 1,
          });
          console.log(`Successfully scraped PAD direct article: ${title}`);
        }
      } catch (error) {
        console.error(`Error scraping PAD direct article ${url}:`, error);
      }
    }
    
    console.log(`PAD direct scraping completed: ${items.length} articles`);
    return items;
  } catch (error) {
    console.error('Error in scrapePADDirect:', error);
    return [];
  }
}

/* ---------- 4. Helpers ------------------------------------------------ */
function strip(html: string) { 
  return html.replace(/<[^>]+>/g,"").trim(); 
}

async function translate(text: string, target: "en"|"fr") {
  if (!text || text.trim().length === 0) return "";
  
  try {
    const res = await fetch(`https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=${target}&dt=t&q=${encodeURIComponent(text)}`);
    if (!res.ok) return text;
    
    const json = await res.json();
    const translated = json[0].map((seg: any) => seg[0]).join("");
    return translated || text;
  } catch (error) {
    console.error(`Translation error for "${text}":`, error);
    return text;
  }
}

/* ---------------- MAIN HANDLER --------------------------------------- */
serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log('Starting PAD news sync...');
    
    const [padEspace, padDirect] = await Promise.all([
      scrapePAD(),           // PAD espace-media (2 articles)
      scrapePADDirect(),     // PAD direct site (1 article)
    ]);
    
    // Combiner les sources PAD pour un total de 3 articles maximum
    const rows = [...padEspace, ...padDirect];
    console.log(`Total PAD articles to sync: ${rows.length} (PAD espace: ${padEspace.length}, PAD direct: ${padDirect.length})`);
    
    if (rows.length) {
      const { error } = await sb.from("news").upsert(rows, { 
        onConflict: "slug",
        ignoreDuplicates: false 
      });
      if (error) {
        console.error('Database upsert error:', error);
        throw error;
      }
      console.log(`Successfully synced ${rows.length} PAD articles`);
    }
    
    return new Response(
      JSON.stringify({ 
        success: true, 
        synced: rows.length,
        pad_espace_articles: padEspace.length,
        pad_direct_articles: padDirect.length,
        message: 'PAD news sync completed successfully'
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
        message: e.message 
      }),
      { 
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
