import React, { useEffect, useState } from 'react';
import axios from 'axios';

const API = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const EMPTY = { product: '', category: 'Electronics', amount: '', customer: '' };
const CATEGORIES = ['Electronics', 'Clothing', 'Food', 'General', 'Services'];

export default function Sales({ token }) {
  const [sales,   setSales]   = useState([]);
  const [form,    setForm]    = useState(EMPTY);
  const [page,    setPage]    = useState(1);
  const [total,   setTotal]   = useState(0);
  const [loading, setLoading] = useState(false);
  const [msg,     setMsg]     = useState('');

  const headers = { Authorization: `Bearer ${token}` };

  const fetchSales = (p = 1) => {
    setLoading(true);
    axios.get(`${API}/api/sales?page=${p}&limit=8`, { headers })
      .then(r => { setSales(r.data.data); setTotal(r.data.totalPages); })
      .catch(console.error)
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetchSales(page); }, [page]);

  const handleAdd = () => {
    if (!form.product || !form.amount) { setMsg('Product and amount required.'); return; }
    axios.post(`${API}/api/sales`, form, { headers })
      .then(() => { setForm(EMPTY); setMsg('Sale added!'); fetchSales(page); })
      .catch(() => setMsg('Error adding sale.'));
  };

  const handleDelete = (id) => {
    axios.delete(`${API}/api/sales/${id}`, { headers })
      .then(() => { setMsg('Deleted.'); fetchSales(page); })
      .catch(() => setMsg('Error deleting.'));
  };

  return (
    <div className="page">
      <h1 className="page-title">Sales Records</h1>

      {/* Add Form */}
      <div className="chart-card">
        <h3 className="chart-title">Add New Sale</h3>
        <div className="form-row">
          {[
            { key: 'product',  placeholder: 'Product name' },
            { key: 'customer', placeholder: 'Customer name' },
            { key: 'amount',   placeholder: 'Amount (₹)', type: 'number' },
          ].map(f => (
            <input key={f.key} className="input-field"
              type={f.type || 'text'} placeholder={f.placeholder}
              value={form[f.key]}
              onChange={e => setForm({ ...form, [f.key]: e.target.value })}
            />
          ))}
          <select className="input-field" value={form.category}
            onChange={e => setForm({ ...form, category: e.target.value })}>
            {CATEGORIES.map(c => <option key={c}>{c}</option>)}
          </select>
          <button className="btn-primary" onClick={handleAdd}>Add Sale</button>
        </div>
        {msg && <p className="msg">{msg}</p>}
      </div>

      {/* Table */}
      <div className="chart-card">
        {loading
          ? <p className="loading">Loading…</p>
          : <table className="data-table">
              <thead>
                <tr>
                  <th>ID</th><th>Product</th><th>Category</th>
                  <th>Amount</th><th>Customer</th><th>Date</th><th>Action</th>
                </tr>
              </thead>
              <tbody>
                {sales.map(s => (
                  <tr key={s.id}>
                    <td>{s.id}</td>
                    <td>{s.product}</td>
                    <td><span className="badge">{s.category}</span></td>
                    <td>₹{Number(s.amount).toLocaleString()}</td>
                    <td>{s.customer}</td>
                    <td>{new Date(s.created_at).toLocaleDateString()}</td>
                    <td>
                      <button className="btn-danger" onClick={() => handleDelete(s.id)}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
        }
        {/* Pagination */}
        <div className="pagination">
          <button disabled={page === 1}     onClick={() => setPage(p => p - 1)} className="btn-sm">← Prev</button>
          <span>Page {page} of {total}</span>
          <button disabled={page === total} onClick={() => setPage(p => p + 1)} className="btn-sm">Next →</button>
        </div>
      </div>
    </div>
  );
}
