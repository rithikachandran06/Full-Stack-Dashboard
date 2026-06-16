import React from 'react';
import { NavLink } from 'react-router-dom';

const NAV = [
  { to: '/',          icon: '🏠', label: 'Dashboard' },
  { to: '/analytics', icon: '🤖', label: 'AI Analytics' },
  { to: '/sales',     icon: '📋', label: 'Sales' },
];

export default function Sidebar({ onLogout, theme, setTheme }) {
  return (
    <nav className="sidebar">
      <div className="sidebar-brand">
        <span className="brand-icon">📊</span>
        <span className="brand-name">AnalytiQ</span>
      </div>

      <ul className="nav-list">
        {NAV.map(n => (
          <li key={n.to}>
            <NavLink to={n.to} end className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
              <span className="nav-icon">{n.icon}</span>
              <span className="nav-label">{n.label}</span>
            </NavLink>
          </li>
        ))}
      </ul>

      <div className="sidebar-footer">
        <button className="nav-item theme-toggle" onClick={() => setTheme(t => t === 'dark' ? 'light' : 'dark')}>
          <span className="nav-icon">{theme === 'dark' ? '☀️' : '🌙'}</span>
          <span className="nav-label">{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>
        </button>
        <button className="nav-item logout-btn" onClick={onLogout}>
          <span className="nav-icon">🚪</span>
          <span className="nav-label">Logout</span>
        </button>
      </div>
    </nav>
  );
}
