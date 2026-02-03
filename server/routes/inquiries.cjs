const express = require('express');
const pool = require('../db.cjs');
const { authMiddleware } = require('../middleware/auth.cjs');

const router = express.Router();

router.get('/', authMiddleware, async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM inquiries ORDER BY created_at DESC'
    );
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching inquiries:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

router.post('/', async (req, res) => {
  try {
    const { company_name, contact_name, email, phone, content } = req.body;
    
    const result = await pool.query(
      `INSERT INTO inquiries (company_name, contact_name, email, phone, content)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *`,
      [company_name, contact_name, email, phone, content]
    );
    
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error creating inquiry:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

router.put('/:id/status', authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    
    const result = await pool.query(
      'UPDATE inquiries SET status = $1, updated_at = NOW() WHERE id = $2 RETURNING *',
      [status, id]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Inquiry not found' });
    }
    
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error updating inquiry:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('DELETE FROM inquiries WHERE id = $1 RETURNING *', [id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Inquiry not found' });
    }
    
    res.json({ success: true });
  } catch (error) {
    console.error('Error deleting inquiry:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
