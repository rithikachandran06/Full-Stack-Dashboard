import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login     from './pages/Login';
import Dashboard from './pages/Dashboard';
import Analytics from './pages/Analytics';
import Sales     from './pages/Sales';
import Sidebar   from './components/Sidebar';
import './App.css';

export default function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [theme, setTheme] = useState('dark');

  const handleLogin  = (t) => { localStorage.setItem('token', t); setToken(t); };
  const handleLogout = ()  => { localStorage.removeItem('token'); setToken(null); };

  if (!token) return <Login onLogin={handleLogin} />;

  return (
    <BrowserRouter>
      <div className={`app-shell ${theme}`}>
        <Sidebar onLogout={handleLogout} theme={theme} setTheme={setTheme} />
        <main className="main-content">
          <Routes>
            <Route path="/"          element={<Dashboard token={token} />} />
            <Route path="/analytics" element={<Analytics token={token} />} />
            <Route path="/sales"     element={<Sales     token={token} />} />
            <Route path="*"          element={<Navigate to="/" />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}
