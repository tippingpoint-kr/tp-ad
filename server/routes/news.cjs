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
    const regex = /\[!\[(.*?)\]\((https:\/\/cdn\.trotmagazine\.co\.kr\/news\/photo\/\d+\/\d+_\d+_\d+\.png)\)\]\((https:\/\/www\.trotmagazine\.co\.kr\/news\/articleView\.html\?idxno=\d+)\)\s*\[\*\*(.*?)\*\*\]/g;
    
    let match;
    while ((match = regex.exec(html)) !== null && news.length < 5) {
      news.push({
        title: match[4],
        thumbnail: match[2],
        url: match[3],
      });
    }
    
    if (news.length === 0) {
      const altRegex = /\[!\[(.*?)\]\((https:\/\/cdn\.trotmagazine\.co\.kr\/news\/thumbnail\/[^)]+)\)\]\((https:\/\/www\.trotmagazine\.co\.kr\/news\/articleView\.html\?idxno=\d+)\)\s*\[\*\*(.*?)\*\*\]/g;
      while ((match = altRegex.exec(html)) !== null && news.length < 5) {
        news.push({
          title: match[4],
          thumbnail: match[2],
          url: match[3],
        });
      }
    }
    
    if (news.length > 0) {
      cachedNews = news;
      lastFetchTime = new Date();
      console.log(`News refreshed at ${lastFetchTime.toISOString()}`);
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
