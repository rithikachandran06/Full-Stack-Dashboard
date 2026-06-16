import React, { useState } from 'react';
import axios from 'axios';

const API = process.env.REACT_APP_API_URL || 'http://localhost:5000';

export default function Login({ onLogin }) {
  const [mode,     setMode]     = useState('login');  // 'login' | 'register'
  const [form,     setForm]     = useState({ name: '', email: '', password: '' });
  const [error,    setError]    = useState('');
  const [loading,  setLoading]  = useState(false);

  const handleSubmit = async () => {
    setError(''); setLoading(true);
    try {
      if (mode === 'register') {
        await axios.post(`${API}/api/auth/register`, form);
        setMode('login');
        setError('Registered! Please log in.');
      } else {
        const { data } = await axios.post(`${API}/api/auth/login`, {
          email: form.email, password: form.password,
        });
        onLogin(data.token);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-shell">
      <div className="login-card">
        <div className="login-logo">📊</div>
        <h1 className="login-title">AnalytiQ</h1>
        <p className="login-sub">Full Stack Analytics Dashboard</p>

        <div className="login-tabs">
          {['login', 'register'].map(m => (
            <button key={m} className={`tab ${mode === m ? 'active' : ''}`} onClick={() => setMode(m)}>
              {m === 'login' ? 'Sign In' : 'Register'}
            </button>
          ))}
        </div>

        {mode === 'register' && (
          <input className="input-field full" placeholder="Full Name"
            value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
        )}
        <input className="input-field full" placeholder="Email"
          type="email" value={form.email}
          onChange={e => setForm({ ...form, email: e.target.value })} />
        <input className="input-field full" placeholder="Password"
          type="password" value={form.password}
          onChange={e => setForm({ ...form, password: e.target.value })}
          onKeyDown={e => e.key === 'Enter' && handleSubmit()} />

        {error && <p className="error-msg">{error}</p>}

        <button className="btn-primary full" onClick={handleSubmit} disabled={loading}>
          {loading ? 'Please wait…' : mode === 'login' ? 'Sign In' : 'Create Account'}
        </button>

        <p className="login-footer">
          Built with React · Node.js · Python · MySQL
        </p>
      </div>
    </div>
  );
}
