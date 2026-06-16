import React, { useEffect, useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
         ResponsiveContainer, ReferenceLine } from 'recharts';
import axios from 'axios';

const PY_API = process.env.REACT_APP_PYTHON_API_URL || 'http://localhost:8000';

export default function Analytics() {
  const [trends,     setTrends]     = useState(null);
  const [summary,    setSummary]    = useState(null);
  const [prediction, setPrediction] = useState(null);
  const [anomalies,  setAnomalies]  = useState(null);
  const [months,     setMonths]     = useState(3);
  const [loading,    setLoading]    = useState(true);

  useEffect(() => {
    Promise.all([
      axios.get(`${PY_API}/analytics/trends`),
      axios.get(`${PY_API}/analytics/summary`),
      axios.get(`${PY_API}/analytics/anomalies`),
    ])
      .then(([t, s, a]) => {
        setTrends(t.data);
        setSummary(s.data);
        setAnomalies(a.data);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const runPrediction = () => {
    axios.post(`${PY_API}/analytics/predict`, { months_ahead: months })
      .then(r => setPrediction(r.data))
      .catch(console.error);
  };

  if (loading) return <div className="loading">Running analytics engine…</div>;

  // Build chart data
  const trendChart = trends?.labels.map((label, i) => ({
    month:       label,
    revenue:     trends.revenue[i],
    moving_avg:  trends.moving_avg[i],
    growth_rate: trends.growth_rate[i],
  })) || [];

  return (
    <div className="page">
      <h1 className="page-title">AI Analytics Engine <span className="badge">Python · FastAPI</span></h1>

      {/* Summary Stats */}
      <div className="kpi-grid">
        {[
          { title: 'Total Revenue',  value: `₹${summary?.total?.toLocaleString()}`,            color: '#6366f1' },
          { title: 'Average/Month',  value: `₹${summary?.mean?.toLocaleString()}`,             color: '#22d3ee' },
          { title: 'Std Deviation',  value: `₹${summary?.std_dev?.toLocaleString()}`,          color: '#f59e0b' },
          { title: 'YTD Growth',     value: `${summary?.growth_pct}%`,                          color: '#10b981' },
        ].map((k, i) => (
          <div key={i} className="kpi-card" style={{ borderTop: `3px solid ${k.color}` }}>
            <p className="kpi-label">{k.title}</p>
            <h2 className="kpi-value">{k.value}</h2>
          </div>
        ))}
      </div>

      {/* Trend Chart */}
      <div className="chart-card">
        <h3 className="chart-title">Revenue Trend + 3-Month Moving Average</h3>
        <ResponsiveContainer width="100%" height={280}>
          <AreaChart data={trendChart}>
            <defs>
              <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%"  stopColor="#6366f1" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#6366f1" stopOpacity={0}   />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
            <XAxis dataKey="month" stroke="#94a3b8" />
            <YAxis stroke="#94a3b8" />
            <Tooltip contentStyle={{ background: '#1e293b', border: 'none' }} />
            <Area type="monotone" dataKey="revenue"    stroke="#6366f1" fill="url(#revGrad)" strokeWidth={2} />
            <Area type="monotone" dataKey="moving_avg" stroke="#22d3ee" fill="none"          strokeWidth={2} strokeDasharray="5 5" />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Prediction */}
      <div className="chart-card">
        <h3 className="chart-title">Revenue Prediction (Linear Regression)</h3>
        <div className="predict-controls">
          <label>Months ahead:</label>
          <input type="number" min="1" max="12" value={months}
            onChange={e => setMonths(Number(e.target.value))}
            className="input-sm" />
          <button className="btn-primary" onClick={runPrediction}>Run Prediction</button>
        </div>
        {prediction && (
          <div className="prediction-results">
            <p className="model-score">Model R² Score: <strong>{prediction.model_score}</strong></p>
            <table className="data-table">
              <thead><tr><th>Month</th><th>Predicted Revenue</th></tr></thead>
              <tbody>
                {prediction.predicted_months.map((m, i) => (
                  <tr key={i}>
                    <td>{m}</td>
                    <td>₹{prediction.predicted_revenue[i].toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Anomalies */}
      <div className="chart-card">
        <h3 className="chart-title">Anomaly Detection (Z-Score)</h3>
        {anomalies?.anomalies?.length === 0
          ? <p className="muted">No anomalies detected.</p>
          : <table className="data-table">
              <thead><tr><th>Month</th><th>Revenue</th><th>Status</th></tr></thead>
              <tbody>
                {anomalies?.anomalies?.map((a, i) => (
                  <tr key={i}>
                    <td>{a.month}</td>
                    <td>₹{a.revenue.toLocaleString()}</td>
                    <td><span className="badge-warn">⚠ Anomaly</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
        }
      </div>
    </div>
  );
}
