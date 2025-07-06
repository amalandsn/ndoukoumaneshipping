
import { translate } from '../utils/translator.ts';

const PAD_INDEX = "https://www.portdakar.sn/espace-media/actualites";

export async function scrapePADEspaceMedia() {
  try {
    console.log('Fetching PAD espace-media articles...');
    const html = await (await fetch(PAD_INDEX)).text();
    
    // Chercher les liens vers les articles dans les structures HTML typiques
    const linkPatterns = [
      /href="(\/actualites\/[^"]+)"/g,
      /href="([^"]*actualite[^"]*)"[^>]*>/gi,
      /href="([^"]*\/actualites\/[^"]*)"[^>]*>/gi
    ];
    
    let links = [];
    for (const pattern of linkPatterns) {
      const matches = [...html.matchAll(pattern)];
      links.push(...matches.map(m => {
        let url = m[1];
        if (url.startsWith('/')) {
          return `https://www.portdakar.sn${url}`;
        }
        return url;
      }));
      if (links.length >= 3) break;
    }
    
    // Nettoyer et limiter les liens
    links = [...new Set(links)].slice(0, 3);
    console.log(`Found ${links.length} PAD espace-media article links:`, links);
    
    const items = [];

    for (const url of links) {
      try {
        console.log(`Scraping PAD espace-media article: ${url}`);
        const page = await (await fetch(url)).text();
        
        // Essayer différents sélecteurs pour le titre
        let title = "";
        const titleSelectors = [
          /<h1[^>]*>(.*?)<\/h1>/i,
          /<title[^>]*>(.*?)<\/title>/i,
          /<h2[^>]*class="[^"]*title[^"]*"[^>]*>(.*?)<\/h2>/i,
          /<div[^>]*class="[^"]*title[^"]*"[^>]*>(.*?)<\/div>/i
        ];
        
        for (const selector of titleSelectors) {
          const match = page.match(selector);
          if (match && match[1]) {
            title = match[1].replace(/<[^>]+>/g,"").trim();
            if (title.length > 10 && !title.includes('Port Autonome de Dakar') && !title.includes('PAD')) {
              break;
            }
          }
        }
        
        // Essayer différents sélecteurs pour le contenu
        let content = "";
        const contentSelectors = [
          /<p[^>]*class="[^"]*excerpt[^"]*"[^>]*>(.*?)<\/p>/i,
          /<div[^>]*class="[^"]*content[^"]*"[^>]*>.*?<p[^>]*>(.*?)<\/p>/i,
          /<article[^>]*>.*?<p[^>]*>(.*?)<\/p>/i,
          /<p[^>]*>(.*?)<\/p>/i
        ];
        
        for (const selector of contentSelectors) {
          const match = page.match(selector);
          if (match && match[1]) {
            content = match[1].replace(/<[^>]+>/g,"").trim();
            if (content.length > 30) break;
          }
        }
        
        if (title && title.length > 10) {
          const titleEn = await translate(title, "en");
          const excerptEn = content ? await translate(content.slice(0,160), "en") : "";
          
          items.push({
            source: "Port Autonome de Dakar",
            title_fr: title,
            title_en: titleEn,
            excerpt_fr: content.slice(0,160),
            excerpt_en: excerptEn,
            url,
            slug: `${url.split("/").pop()}-espace-${Date.now()}`,
            published_at: new Date().toISOString(),
            display_order: 1,
          });
          console.log(`Successfully scraped PAD espace-media article: ${title.substring(0,50)}...`);
        } else {
          console.log(`Skipped article with insufficient content: ${url}`);
        }
      } catch (error) {
        console.error(`Error scraping PAD espace-media article ${url}:`, error);
      }
    }
    
    console.log(`PAD espace-media scraping completed: ${items.length} articles`);
    return items;
  } catch (error) {
    console.error('Error in scrapePADEspaceMedia:', error);
    return [];
  }
}
