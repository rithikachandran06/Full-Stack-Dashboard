const express = require('express');
const router  = express.Router();
const auth    = require('../middleware/auth');
const db      = require('../db');

// GET /api/dashboard/stats  — KPI summary cards
router.get('/stats', auth, async (req, res) => {
  try {
    const [[{ totalRevenue }]] = await db.query(
      'SELECT COALESCE(SUM(amount), 0) AS totalRevenue FROM sales'
    );
    const [[{ totalOrders }]] = await db.query(
      'SELECT COUNT(*) AS totalOrders FROM sales'
    );
    const [[{ totalUsers }]] = await db.query(
      'SELECT COUNT(*) AS totalUsers FROM users'
    );
    const [[{ avgOrderValue }]] = await db.query(
      'SELECT COALESCE(AVG(amount), 0) AS avgOrderValue FROM sales'
    );

    res.json({ totalRevenue, totalOrders, totalUsers, avgOrderValue });
  } catch (err) {
    res.status(500).json({ message: 'Server error.', error: err.message });
  }
});

// GET /api/dashboard/monthly  — Monthly revenue for chart
router.get('/monthly', auth, async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT
        DATE_FORMAT(created_at, '%b %Y') AS month,
        SUM(amount)                      AS revenue,
        COUNT(*)                         AS orders
      FROM sales
      GROUP BY YEAR(created_at), MONTH(created_at)
      ORDER BY YEAR(created_at), MONTH(created_at)
      LIMIT 12
    `);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ message: 'Server error.', error: err.message });
  }
});

// GET /api/dashboard/category  — Revenue by category
router.get('/category', auth, async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT category, SUM(amount) AS revenue
      FROM sales
      GROUP BY category
    `);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ message: 'Server error.', error: err.message });
  }
});

module.exports = router;
