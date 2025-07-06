
import { translate } from '../utils/translator.ts';

const PAD_DIRECT = "https://www.portdakar.sn/";

export async function scrapePADDirect() {
  try {
    console.log('🔍 Starting PAD direct site scraping...');
    console.log('📍 Target URL:', PAD_DIRECT);
    
    const response = await fetch(PAD_DIRECT, {
      method: 'GET',
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        'Accept-Language': 'fr-FR,fr;q=0.9,en;q=0.8',
        'Accept-Encoding': 'gzip, deflate, br',
        'Connection': 'keep-alive',
        'Upgrade-Insecure-Requests': '1',
      },
    });
    
    console.log('📊 Response status:', response.status);
    console.log('📊 Response headers:', Object.fromEntries(response.headers.entries()));
    
    if (!response.ok) {
      console.error(`❌ Failed to fetch PAD direct: ${response.status} ${response.statusText}`);
      
      // Articles de test en cas d'échec
      console.log('🧪 Creating test articles instead...');
      return [
        {
          source: "Port de Dakar",
          title_fr: "Expansion des capacités de stockage - Article de test",
          title_en: "Storage Capacity Expansion - Test Article",
          excerpt_fr: "Le port de Dakar étend ses capacités de stockage pour répondre à la demande croissante du commerce international. Article de test généré automatiquement.",
          excerpt_en: "The port of Dakar expands its storage capacities to meet the growing demand of international trade. Automatically generated test article.",
          url: "https://www.portdakar.sn/",
          slug: `pad-direct-test-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          published_at: new Date().toISOString(),
          display_order: 1,
        },
        {
          source: "Port de Dakar",
          title_fr: "Partenariats stratégiques pour le développement - Article de test",
          title_en: "Strategic Partnerships for Development - Test Article",
          excerpt_fr: "Le Port Autonome de Dakar développe de nouveaux partenariats stratégiques pour renforcer sa position en Afrique de l'Ouest. Article de test généré automatiquement.",
          excerpt_en: "The Port Autonome de Dakar develops new strategic partnerships to strengthen its position in West Africa. Automatically generated test article.",
          url: "https://www.portdakar.sn/",
          slug: `pad-direct-test-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          published_at: new Date(Date.now() - 48 * 60 * 60 * 1000).toISOString(), // Il y a 2 jours
          display_order: 1,
        }
      ];
    }
    
    const html = await response.text();
    console.log('📄 HTML content length:', html.length);
    console.log('📄 HTML preview (first 500 chars):', html.substring(0, 500));
    
    // Chercher des liens vers les actualités sur la page d'accueil
    const articles = [];
    
    // Pattern pour les liens d'actualités
    const newsLinkPattern = /<a[^>]*href="([^"]*(?:actualite|news|article)[^"]*)"[^>]*>([^<]+)<\/a>/gi;
    
    console.log('🔍 Searching for news links...');
    const newsMatches = [...html.matchAll(newsLinkPattern)];
    console.log(`📰 Found ${newsMatches.length} potential news links`);
    
    for (let i = 0; i < Math.min(2, newsMatches.length); i++) {
      const match = newsMatches[i];
      let link = match[1];
      let title = match[2].replace(/<[^>]+>/g, '').trim();
      
      if (link && !link.startsWith('http')) {
        link = `https://www.portdakar.sn${link}`;
      }
      
      if (title && title.length > 10 && title.length < 200) {
        try {
          const titleEn = await translate(title, "en");
          const excerpt = `Actualité du Port Autonome de Dakar : ${title.substring(0, 100)}...`;
          const excerptEn = await translate(excerpt, "en");
          
          articles.push({
            source: "Port de Dakar",
            title_fr: title,
            title_en: titleEn,
            excerpt_fr: excerpt,
            excerpt_en: excerptEn,
            url: link,
            slug: `pad-direct-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
            published_at: new Date().toISOString(),
            display_order: 1,
          });
          
          console.log(`✅ Article ${i + 1}: "${title.substring(0, 50)}..."`);
        } catch (translateError) {
          console.error('❌ Translation error:', translateError);
          // Ajouter sans traduction
          articles.push({
            source: "Port de Dakar",
            title_fr: title,
            title_en: title,
            excerpt_fr: `Actualité du Port Autonome de Dakar : ${title.substring(0, 100)}...`,
            excerpt_en: `Port Autonome de Dakar News: ${title.substring(0, 100)}...`,
            url: link,
            slug: `pad-direct-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
            published_at: new Date().toISOString(),
            display_order: 1,
          });
        }
      }
    }
    
    console.log(`🎯 PAD direct scraping completed: ${articles.length} articles extracted`);
    return articles;
    
  } catch (error) {
    console.error('💥 Critical error in scrapePADDirect:', error);
    console.error('💥 Error details:', {
      name: error.name,
      message: error.message,
      stack: error.stack
    });
    
    // En cas d'erreur, retourner des articles de test
    console.log('🧪 Returning test articles due to error...');
    return [
      {
        source: "Port de Dakar",
        title_fr: "Services logistiques de qualité - Article de test",
        title_en: "Quality Logistics Services - Test Article",
        excerpt_fr: "Le Port Autonome de Dakar s'engage à fournir des services logistiques de qualité supérieure à ses clients. Article de test généré suite à une erreur de connexion.",
        excerpt_en: "The Port Autonome de Dakar is committed to providing superior quality logistics services to its clients. Test article generated following connection error.",
        url: "https://www.portdakar.sn/",
        slug: `pad-direct-error-test-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        published_at: new Date().toISOString(),
        display_order: 1,
      }
    ];
  }
}
