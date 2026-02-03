const express = require('express');
const router = express.Router();

router.get('/trotmagazine', async (req, res) => {
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
    
    res.json(news);
  } catch (error) {
    console.error('Error fetching news:', error);
    res.status(500).json({ error: 'Failed to fetch news' });
  }
});

module.exports = router;
