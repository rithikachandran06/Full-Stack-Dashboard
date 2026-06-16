from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from analytics import get_trends, get_prediction, get_summary, get_anomalies
from models import PredictRequest

app = FastAPI(
    title="AnalytiQ Analytics Engine",
    description="Python-powered AI analytics microservice for trend analysis and revenue prediction.",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/health")
def health():
    return {"status": "OK", "service": "Python Analytics Engine"}

@app.get("/analytics/trends")
def trends():
    """Returns moving average trend data for the last 12 months."""
    try:
        return get_trends()
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/analytics/predict")
def predict(req: PredictRequest):
    """Predicts revenue for the next N months using linear regression."""
    try:
        return get_prediction(req.months_ahead)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/analytics/summary")
def summary():
    """Returns statistical summary: mean, median, std dev, growth rate."""
    try:
        return get_summary()
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/analytics/anomalies")
def anomalies():
    """Detects anomalies in revenue using Z-score method."""
    try:
        return get_anomalies()
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
