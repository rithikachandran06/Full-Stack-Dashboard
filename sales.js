const express = require('express');
const router  = express.Router();
const auth    = require('../middleware/auth');
const db      = require('../db');

// GET /api/sales  — All sales with pagination
router.get('/', auth, async (req, res) => {
  const page  = parseInt(req.query.page)  || 1;
  const limit = parseInt(req.query.limit) || 10;
  const offset = (page - 1) * limit;

  try {
    const [rows]      = await db.query('SELECT * FROM sales ORDER BY created_at DESC LIMIT ? OFFSET ?', [limit, offset]);
    const [[{ total }]] = await db.query('SELECT COUNT(*) AS total FROM sales');
    res.json({ data: rows, total, page, totalPages: Math.ceil(total / limit) });
  } catch (err) {
    res.status(500).json({ message: 'Server error.', error: err.message });
  }
});

// POST /api/sales  — Create sale
router.post('/', auth, async (req, res) => {
  const { product, category, amount, customer } = req.body;
  if (!product || !amount)
    return res.status(400).json({ message: 'Product and amount are required.' });

  try {
    const [result] = await db.query(
      'INSERT INTO sales (product, category, amount, customer) VALUES (?, ?, ?, ?)',
      [product, category || 'General', amount, customer || 'Unknown']
    );
    res.status(201).json({ id: result.insertId, message: 'Sale created.' });
  } catch (err) {
    res.status(500).json({ message: 'Server error.', error: err.message });
  }
});

// DELETE /api/sales/:id
router.delete('/:id', auth, async (req, res) => {
  try {
    await db.query('DELETE FROM sales WHERE id = ?', [req.params.id]);
    res.json({ message: 'Sale deleted.' });
  } catch (err) {
    res.status(500).json({ message: 'Server error.', error: err.message });
  }
});

module.exports = router;
