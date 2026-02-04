const express = require('express');
const router = express.Router();

let cachedNews = [];
let lastFetchTime = null;

const shouldRefresh = () => {
  if (!lastFetchTime || cachedNews.length === 0) return true;
  
  const now = new Date();
  const koreaTime = new Date(now.toLocaleString('en-US', { timeZone: 'Asia/Seoul' }));
  const currentHour = koreaTime.getHours();
  
  const lastFetchKorea = new Date(lastFetchTime.toLocaleString('en-US', { timeZone: 'Asia/Seoul' }));
  const lastFetchHour = lastFetchKorea.getHours();
  const lastFetchDate = lastFetchKorea.toDateString();
  const currentDate = koreaTime.toDateString();
  
  if (lastFetchDate !== currentDate) {
    if (currentHour >= 8) return true;
  }
  
  if (currentHour >= 8 && currentHour < 20 && (lastFetchHour < 8 || lastFetchDate !== currentDate)) {
    return true;
  }
  
  if (currentHour >= 20 && (lastFetchHour < 20 || lastFetchDate !== currentDate)) {
    return true;
  }
  
  return false;
};

const fetchNews = async () => {
  try {
    const response = await fetch('https://www.trotmagazine.co.kr/');
    const html = await response.text();
    
    const news = [];
    const seen = new Set();
    
    const itemRegex = /<div class="item">([\s\S]*?)<\/div>\s*<\/div>/g;
    let itemMatch;
    
    while ((itemMatch = itemRegex.exec(html)) !== null && news.length < 5) {
      const itemHtml = itemMatch[1];
      
      const urlMatch = itemHtml.match(/href="(https:\/\/www\.trotmagazine\.co\.kr\/news\/articleView\.html\?idxno=\d+)"/);
      const titleMatch = itemHtml.match(/<H2[^>]*class="auto-titles[^"]*"[^>]*>([^<]+)<\/H2>/);
      const imgMatch = itemHtml.match(/<img[^>]*src="(https:\/\/cdn\.trotmagazine\.co\.kr\/news\/thumbnail\/[^"]+)"[^>]*alt="([^"]*)"[^>]*>/);
      
      if (urlMatch && titleMatch && !seen.has(urlMatch[1])) {
        seen.add(urlMatch[1]);
        news.push({
          title: titleMatch[1].trim(),
          thumbnail: imgMatch ? imgMatch[1] : '',
          url: urlMatch[1],
        });
      }
    }
    
    if (news.length === 0) {
      const altRegex = /<a href="(https:\/\/www\.trotmagazine\.co\.kr\/news\/articleView\.html\?idxno=\d+)"[^>]*>[\s\S]*?<H2[^>]*class="auto-titles[^"]*"[^>]*>([^<]+)<\/H2>/g;
      let altMatch;
      while ((altMatch = altRegex.exec(html)) !== null && news.length < 5) {
        if (!seen.has(altMatch[1])) {
          seen.add(altMatch[1]);
          news.push({
            title: altMatch[2].trim(),
            thumbnail: '',
            url: altMatch[1],
          });
        }
      }
    }
    
    if (news.length > 0) {
      cachedNews = news;
      lastFetchTime = new Date();
      console.log(`News refreshed at ${lastFetchTime.toISOString()}, found ${news.length} articles`);
    }
    
    return news;
  } catch (error) {
    console.error('Error fetching news:', error);
    return cachedNews;
  }
};

router.get('/trotmagazine', async (req, res) => {
  try {
    if (shouldRefresh()) {
      await fetchNews();
    }
    res.json(cachedNews);
  } catch (error) {
    console.error('Error serving news:', error);
    res.status(500).json({ error: 'Failed to fetch news' });
  }
});

module.exports = router;
