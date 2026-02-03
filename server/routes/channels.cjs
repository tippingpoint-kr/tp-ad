const express = require('express');
const multer = require('multer');
const path = require('path');
const pool = require('../db.cjs');
const { authMiddleware } = require('../middleware/auth.cjs');

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/logos');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ 
  storage,
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg'];
    const ext = path.extname(file.originalname).toLowerCase();
    if (allowedTypes.includes(ext)) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed'), false);
    }
  }
});

router.get('/', async (req, res) => {
  try {
    const { category } = req.query;
    let query = 'SELECT * FROM channels';
    const params = [];
    
    if (category) {
      query += ' WHERE category = $1';
      params.push(category);
    }
    
    query += ' ORDER BY display_order, created_at';
    
    const result = await pool.query(query, params);
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching channels:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('SELECT * FROM channels WHERE id = $1', [id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Channel not found' });
    }
    
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error fetching channel:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

router.post('/', authMiddleware, upload.single('logo'), async (req, res) => {
  try {
    const {
      name, category, hashtags, subscribers, age_demographics,
      gender_ratio, description, reference_url, reference_url_2, display_order
    } = req.body;
    
    const logo_url = req.file ? `/uploads/logos/${req.file.filename}` : null;
    
    const result = await pool.query(
      `INSERT INTO channels (name, category, logo_url, hashtags, subscribers, 
       age_demographics, gender_ratio, description, reference_url, reference_url_2, display_order)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
       RETURNING *`,
      [name, category, logo_url, hashtags, subscribers, age_demographics, 
       gender_ratio, description, reference_url, reference_url_2, display_order || 0]
    );
    
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error creating channel:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

router.put('/:id', authMiddleware, upload.single('logo'), async (req, res) => {
  try {
    const { id } = req.params;
    const {
      name, category, hashtags, subscribers, age_demographics,
      gender_ratio, description, reference_url, reference_url_2, display_order
    } = req.body;
    
    let query = `UPDATE channels SET 
      name = $1, category = $2, hashtags = $3, subscribers = $4,
      age_demographics = $5, gender_ratio = $6, description = $7,
      reference_url = $8, reference_url_2 = $9, display_order = $10, updated_at = NOW()`;
    
    const params = [name, category, hashtags, subscribers, age_demographics,
      gender_ratio, description, reference_url, reference_url_2, display_order || 0];
    
    if (req.file) {
      query += `, logo_url = $11 WHERE id = $12 RETURNING *`;
      params.push(`/uploads/logos/${req.file.filename}`, id);
    } else {
      query += ` WHERE id = $11 RETURNING *`;
      params.push(id);
    }
    
    const result = await pool.query(query, params);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Channel not found' });
    }
    
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error updating channel:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('DELETE FROM channels WHERE id = $1 RETURNING *', [id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Channel not found' });
    }
    
    res.json({ success: true });
  } catch (error) {
    console.error('Error deleting channel:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
