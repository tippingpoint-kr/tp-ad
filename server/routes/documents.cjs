const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const pool = require('../db.cjs');
const { authMiddleware } = require('../middleware/auth.cjs');

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/documents');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ 
  storage,
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['.pdf', '.xlsx', '.xls', '.doc', '.docx'];
    const ext = path.extname(file.originalname).toLowerCase();
    if (allowedTypes.includes(ext)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type'), false);
    }
  }
});

router.get('/', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM documents WHERE is_active = true ORDER BY document_type, created_at DESC'
    );
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching documents:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

router.get('/all', authMiddleware, async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM documents ORDER BY document_type, created_at DESC'
    );
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching documents:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

router.post('/', authMiddleware, upload.single('file'), async (req, res) => {
  try {
    const { title, document_type, description } = req.body;
    
    if (!req.file) {
      return res.status(400).json({ error: 'File is required' });
    }
    
    const file_url = `/uploads/documents/${req.file.filename}`;
    const file_name = req.file.originalname;
    
    const result = await pool.query(
      `INSERT INTO documents (title, document_type, description, file_url, file_name)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *`,
      [title, document_type, description, file_url, file_name]
    );
    
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error creating document:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

router.put('/:id', authMiddleware, upload.single('file'), async (req, res) => {
  try {
    const { id } = req.params;
    const { title, document_type, description, is_active } = req.body;
    
    let query, params;
    
    if (req.file) {
      query = `UPDATE documents SET 
        title = $1, document_type = $2, description = $3, 
        file_url = $4, file_name = $5, is_active = $6, updated_at = NOW()
        WHERE id = $7 RETURNING *`;
      params = [title, document_type, description, 
        `/uploads/documents/${req.file.filename}`, req.file.originalname,
        is_active !== 'false', id];
    } else {
      query = `UPDATE documents SET 
        title = $1, document_type = $2, description = $3, 
        is_active = $4, updated_at = NOW()
        WHERE id = $5 RETURNING *`;
      params = [title, document_type, description, is_active !== 'false', id];
    }
    
    const result = await pool.query(query, params);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Document not found' });
    }
    
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error updating document:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('DELETE FROM documents WHERE id = $1 RETURNING *', [id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Document not found' });
    }
    
    res.json({ success: true });
  } catch (error) {
    console.error('Error deleting document:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
