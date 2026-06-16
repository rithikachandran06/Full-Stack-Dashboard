const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mysql = require('mysql2/promise');

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth',      require('./routes/auth'));
app.use('/api/dashboard', require('./routes/dashboard'));
app.use('/api/sales',     require('./routes/sales'));
app.use('/api/users',     require('./routes/users'));

// Health check
app.get('/health', (req, res) => res.json({ status: 'OK', service: 'Node API' }));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Node API running on port ${PORT}`));

module.exports = app;
