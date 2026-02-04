const express = require('express');
const router = express.Router();

const ogCache = new Map();

const fetchOgData = async (url) => {
  if (ogCache.has(url)) {
    return ogCache.get(url);
  }

  try {
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)'
      }
    });
    const html = await response.text();

    const titleMatch = html.match(/<meta[^>]*property=["']og:title["'][^>]*content=["']([^"']+)["']/i) 
      || html.match(/<meta[^>]*content=["']([^"']+)["'][^>]*property=["']og:title["']/i)
      || html.match(/<title[^>]*>([^<]+)<\/title>/i);
    
    const imageMatch = html.match(/<meta[^>]*property=["']og:image["'][^>]*content=["']([^"']+)["']/i)
      || html.match(/<meta[^>]*content=["']([^"']+)["'][^>]*property=["']og:image["']/i);

    const descMatch = html.match(/<meta[^>]*property=["']og:description["'][^>]*content=["']([^"']+)["']/i)
      || html.match(/<meta[^>]*content=["']([^"']+)["'][^>]*property=["']og:description["']/i);

    const data = {
      title: titleMatch ? titleMatch[1].trim() : '',
      image: imageMatch ? imageMatch[1] : '',
      description: descMatch ? descMatch[1].trim() : '',
      url: url
    };

    ogCache.set(url, data);
    return data;
  } catch (error) {
    console.error('Error fetching OG data:', error);
    return { title: '', image: '', description: '', url };
  }
};

router.get('/preview', async (req, res) => {
  const { url } = req.query;
  if (!url) {
    return res.status(400).json({ error: 'URL is required' });
  }

  try {
    const data = await fetchOgData(url);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch preview' });
  }
});

module.exports = router;
