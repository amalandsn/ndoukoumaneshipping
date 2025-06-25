
import { translate } from '../utils/translator.ts';

const PAD_DIRECT = "https://www.portdakar.sn/";

export async function scrapePADDirect() {
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
