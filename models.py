from pydantic import BaseModel, Field

class PredictRequest(BaseModel):
    months_ahead: int = Field(default=3, ge=1, le=12, description="Number of months to predict (1–12)")
