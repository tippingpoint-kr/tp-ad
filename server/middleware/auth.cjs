const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'tippingpoint-admin-secret-key-2026';

const authMiddleware = (req, res, next) => {
  const token = req.cookies.adminToken || req.headers.authorization?.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ error: 'Authentication required' });
  }
  
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.admin = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Invalid token' });
  }
};

module.exports = { authMiddleware, JWT_SECRET };
