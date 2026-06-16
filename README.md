# 📊 AnalytiQ — Full Stack Analytics Dashboard

A production-ready full-stack analytics dashboard built with **React.js**, **Node.js/Express**, and **Python (FastAPI)** for AI-powered data insights.

![Tech Stack](https://img.shields.io/badge/React-18-blue?logo=react) ![Node.js](https://img.shields.io/badge/Node.js-Express-green?logo=node.js) ![Python](https://img.shields.io/badge/Python-FastAPI-orange?logo=python) ![MySQL](https://img.shields.io/badge/Database-MySQL-blue?logo=mysql) ![MongoDB](https://img.shields.io/badge/Database-MongoDB-green?logo=mongodb)

---

## 🚀 Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React.js 18, JavaScript (ES6+), Recharts, Axios |
| Backend API | Node.js, Express.js, JWT Authentication, REST APIs |
| Analytics Engine | Python, FastAPI, Pandas, NumPy, Scikit-learn |
| Databases | MySQL (transactional), MongoDB (logs/analytics) |
| DevOps | Git/GitHub, Docker, CI/CD (GitHub Actions) |
| Auth | JWT, bcrypt |

---

## ✨ Features

- 🔐 **JWT Authentication** — Secure login/register with token-based auth
- 📈 **Real-time Dashboard** — KPI cards, line charts, bar charts, pie charts
- 🤖 **AI Analytics Engine** — Python/FastAPI microservice for trend analysis & predictions
- 📋 **Data Tables** — Sortable, filterable data grid with pagination
- 🌙 **Dark/Light Mode** — Theme toggle with persistent preference
- 📱 **Responsive Design** — Mobile-first layout
- 🔄 **REST API** — Full CRUD operations with Express.js
- 🐳 **Docker Ready** — Containerized services

---

## 📁 Project Structure

```
analytiq-dashboard/
├── frontend/                  # React.js app
│   ├── src/
│   │   ├── components/        # Reusable UI components
│   │   ├── pages/             # Dashboard, Login, Analytics
│   │   ├── hooks/             # Custom React hooks
│   │   └── utils/             # API helpers, auth utils
│   └── package.json
│
├── backend-node/              # Node.js + Express API
│   ├── routes/                # Auth, users, data routes
│   ├── controllers/           # Business logic
│   ├── middleware/            # JWT auth middleware
│   └── server.js
│
├── backend-python/            # Python FastAPI analytics engine
│   ├── main.py                # FastAPI app entry
│   ├── analytics.py           # Pandas/NumPy analysis
│   ├── models.py              # Pydantic schemas
│   └── requirements.txt
│
├── docker-compose.yml         # Multi-service orchestration
├── .github/workflows/         # CI/CD pipeline
└── README.md
```

---

## ⚙️ Setup & Installation

### Prerequisites
- Node.js 18+
- Python 3.10+
- MySQL 8+
- MongoDB 6+
- Docker (optional)

---

### 1. Clone the Repository

```bash
git clone https://github.com/YOUR_USERNAME/analytiq-dashboard.git
cd analytiq-dashboard
```

---

### 2. Frontend Setup

```bash
cd frontend
npm install
cp .env.example .env
# Edit .env: REACT_APP_API_URL=http://localhost:5000
npm start
```

---

### 3. Node.js Backend Setup

```bash
cd backend-node
npm install
cp .env.example .env
# Edit .env with your MySQL credentials and JWT_SECRET
npm run dev
```

---

### 4. Python Analytics Engine Setup

```bash
cd backend-python
python -m venv venv
source venv/bin/activate   # Windows: venv\Scripts\activate
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
```

---

### 5. Docker (All Services)

```bash
docker-compose up --build
```

Services will be available at:
- Frontend: http://localhost:3000
- Node API: http://localhost:5000
- Python API: http://localhost:8000
- API Docs: http://localhost:8000/docs

---

## 🔑 Environment Variables

### backend-node/.env
```
PORT=5000
JWT_SECRET=your_secret_key
MYSQL_HOST=localhost
MYSQL_USER=root
MYSQL_PASSWORD=yourpassword
MYSQL_DB=analytiq
PYTHON_API_URL=http://localhost:8000
```

### frontend/.env
```
REACT_APP_API_URL=http://localhost:5000
REACT_APP_PYTHON_API_URL=http://localhost:8000
```

---

## 📡 API Endpoints

### Node.js API (Port 5000)

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/api/auth/register` | Register user | No |
| POST | `/api/auth/login` | Login, returns JWT | No |
| GET | `/api/dashboard/stats` | KPI summary | Yes |
| GET | `/api/sales` | Sales records | Yes |
| POST | `/api/sales` | Add sale record | Yes |
| GET | `/api/users` | All users | Yes |

### Python API (Port 8000)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/analytics/trends` | Sales trend analysis |
| POST | `/analytics/predict` | Revenue prediction |
| GET | `/analytics/summary` | Statistical summary |

---

## 🧠 AI Analytics Features (Python)

- **Trend Detection** — Moving average and growth rate calculation
- **Revenue Forecasting** — Linear regression model using Scikit-learn
- **Statistical Summary** — Mean, median, std deviation via Pandas/NumPy
- **Anomaly Flags** — Z-score based outlier detection

---

## 🌐 Deployment

- **Frontend** → Vercel / Netlify
- **Node.js API** → Render / Railway
- **Python API** → Render / Railway
- **MySQL** → PlanetScale / Railway
- **MongoDB** → MongoDB Atlas

---

## 👩‍💻 Author

**Rithika R**
- GitHub: [@rithikachandran06](https://github.com/rithikachandran06)
- LinkedIn: [rithika-chandran](https://linkedin.com/in/rithika-chandran-8908552a1/)

---

## 📄 License

MIT License — free to use and modify.
