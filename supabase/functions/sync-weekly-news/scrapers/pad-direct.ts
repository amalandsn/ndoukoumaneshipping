
import { translate } from '../utils/translator.ts';

const PAD_DIRECT = "https://www.portdakar.sn/";

export async function scrapePADDirect() {
  try {
    console.log('Fetching PAD direct site articles...');
    const html = await (await fetch(PAD_DIRECT)).text();
    
    // Patterns plus larges pour capturer les actualités
    const linkPatterns = [
      /href="([^"]*actualite[^"]*)"[^>]*>/gi,
      /href="([^"]*\/actualites\/[^"]*)"[^>]*>/gi,
      /href="([^"]*news[^"]*)"[^>]*>/gi,
      /href="([^"]*article[^"]*)"[^>]*>/gi
    ];
    
    let links = [];
    for (const pattern of linkPatterns) {
      const matches = [...html.matchAll(pattern)];
      links.push(...matches.map(m => {
        let url = m[1];
        if (url.startsWith('/')) {
          url = `https://www.portdakar.sn${url}`;
        } else if (!url.startsWith('http')) {
          url = `https://www.portdakar.sn/${url}`;
        }
        return url;
      }));
    }
    
    // Filtrer et nettoyer les URLs
    links = links
      .filter(url => url.includes('portdakar.sn') && !url.includes('#') && !url.includes('javascript:'))
      .filter((url, index, arr) => arr.indexOf(url) === index) // Éliminer les doublons
      .slice(0, 2); // Limité à 2 articles

    console.log(`Found ${links.length} PAD direct article links:`, links);
    
    const items = [];

    for (const url of links) {
      try {
        console.log(`Scraping PAD direct article: ${url}`);
        const page = await (await fetch(url)).text();
        
        // Essayer différents sélecteurs pour le titre
        let title = "";
        const titleSelectors = [
          /<h1[^>]*>(.*?)<\/h1>/i,
          /<h2[^>]*class="[^"]*title[^"]*"[^>]*>(.*?)<\/h2>/i,
          /<div[^>]*class="[^"]*title[^"]*"[^>]*>(.*?)<\/div>/i,
          /<title[^>]*>(.*?)<\/title>/i
        ];
        
        for (const selector of titleSelectors) {
          const match = page.match(selector);
          if (match && match[1]) {
            title = match[1].replace(/<[^>]+>/g,"").trim();
            // Nettoyer le titre
            title = title.replace(/Port Autonome de Dakar\s*[-|]?\s*/i, '').trim();
            if (title.length > 15) break;
          }
        }
        
        // Essayer différents sélecteurs pour le contenu
        let content = "";
        const contentSelectors = [
          /<p[^>]*class="[^"]*excerpt[^"]*"[^>]*>(.*?)<\/p>/i,
          /<div[^>]*class="[^"]*content[^"]*"[^>]*>.*?<p[^>]*>(.*?)<\/p>/i,
          /<article[^>]*>.*?<p[^>]*>(.*?)<\/p>/i,
          /<main[^>]*>.*?<p[^>]*>(.*?)<\/p>/i,
          /<p[^>]*>(.*?)<\/p>/i
        ];
        
        for (const selector of contentSelectors) {
          const match = page.match(selector);
          if (match && match[1]) {
            content = match[1].replace(/<[^>]+>/g,"").trim();
            if (content.length > 30 && !content.toLowerCase().includes('cookie') && !content.toLowerCase().includes('javascript')) {
              break;
            }
          }
        }
        
        if (title && title.length > 15) {
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
          console.log(`Successfully scraped PAD direct article: ${title.substring(0,50)}...`);
        } else {
          console.log(`Skipped article with insufficient content: ${url}`);
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
