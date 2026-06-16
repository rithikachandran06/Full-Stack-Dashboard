import numpy as np
import pandas as pd
from sklearn.linear_model import LinearRegression

# ── Sample dataset (replace with real DB connection) ─────────────────────────
SAMPLE_DATA = {
    "month":   ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
                 "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    "revenue": [12000, 15000, 13500, 17000, 19000, 21000,
                 18500, 22000, 24000, 21500, 26000, 28000]
}


def _load_dataframe() -> pd.DataFrame:
    """Load data into a Pandas DataFrame."""
    df = pd.DataFrame(SAMPLE_DATA)
    df["month_index"] = range(1, len(df) + 1)
    return df


def get_trends() -> dict:
    """Calculate 3-month moving average and month-over-month growth rate."""
    df = _load_dataframe()
    df["moving_avg"]   = df["revenue"].rolling(window=3, min_periods=1).mean().round(2)
    df["growth_rate"]  = df["revenue"].pct_change().fillna(0).mul(100).round(2)

    return {
        "labels":      df["month"].tolist(),
        "revenue":     df["revenue"].tolist(),
        "moving_avg":  df["moving_avg"].tolist(),
        "growth_rate": df["growth_rate"].tolist(),
    }


def get_prediction(months_ahead: int = 3) -> dict:
    """Predict future revenue using Linear Regression."""
    df = _load_dataframe()

    X = df[["month_index"]].values
    y = df["revenue"].values

    model = LinearRegression()
    model.fit(X, y)

    future_indices = np.array([[len(df) + i + 1] for i in range(months_ahead)])
    predictions    = model.predict(future_indices).round(2).tolist()

    future_months = [f"Month {len(df) + i + 1}" for i in range(months_ahead)]

    return {
        "months_ahead": months_ahead,
        "predicted_months":   future_months,
        "predicted_revenue":  predictions,
        "model_score":        round(model.score(X, y), 4),
    }


def get_summary() -> dict:
    """Statistical summary of revenue data."""
    df = _load_dataframe()
    revenue = df["revenue"]

    return {
        "mean":       round(float(revenue.mean()), 2),
        "median":     round(float(revenue.median()), 2),
        "std_dev":    round(float(revenue.std()), 2),
        "min":        int(revenue.min()),
        "max":        int(revenue.max()),
        "total":      int(revenue.sum()),
        "growth_pct": round(
            ((revenue.iloc[-1] - revenue.iloc[0]) / revenue.iloc[0]) * 100, 2
        ),
    }


def get_anomalies() -> dict:
    """Detect anomalies using Z-score (threshold: abs(z) > 1.5)."""
    df = _load_dataframe()
    revenue = df["revenue"]

    mean   = revenue.mean()
    std    = revenue.std()
    z_scores = ((revenue - mean) / std).round(3)

    anomalies = df[np.abs(z_scores) > 1.5][["month", "revenue"]].to_dict(orient="records")

    return {
        "z_scores": dict(zip(df["month"], z_scores.tolist())),
        "anomalies": anomalies,
        "threshold": 1.5,
    }
