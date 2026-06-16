-- AnalytiQ Database Schema
CREATE DATABASE IF NOT EXISTS analytiq;
USE analytiq;

CREATE TABLE IF NOT EXISTS users (
  id         INT AUTO_INCREMENT PRIMARY KEY,
  name       VARCHAR(100) NOT NULL,
  email      VARCHAR(150) NOT NULL UNIQUE,
  password   VARCHAR(255) NOT NULL,
  role       ENUM('admin','user') DEFAULT 'user',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS sales (
  id         INT AUTO_INCREMENT PRIMARY KEY,
  product    VARCHAR(150) NOT NULL,
  category   VARCHAR(100) DEFAULT 'General',
  amount     DECIMAL(10,2) NOT NULL,
  customer   VARCHAR(150) DEFAULT 'Unknown',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Seed data
INSERT INTO sales (product, category, amount, customer) VALUES
  ('Product A', 'Electronics', 1200.00, 'Alice'),
  ('Product B', 'Clothing',     450.00, 'Bob'),
  ('Product C', 'Electronics', 3200.00, 'Charlie'),
  ('Product D', 'Food',         150.00, 'Diana'),
  ('Product E', 'Clothing',     800.00, 'Eve'),
  ('Product F', 'Electronics', 2100.00, 'Frank'),
  ('Product G', 'Food',         220.00, 'Grace'),
  ('Product H', 'Clothing',     670.00, 'Hank');
