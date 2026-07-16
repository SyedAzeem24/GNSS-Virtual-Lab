from pydantic import BaseModel
from datetime import datetime


class SessionCreate(BaseModel):
    latitude: float
    longitude: float
    height: float


class SessionResponse(BaseModel):
    id: int
    latitude: float
    longitude: float
    height: float
    status: str
    created_at: datetime

    class Config:
        from_attributes = True