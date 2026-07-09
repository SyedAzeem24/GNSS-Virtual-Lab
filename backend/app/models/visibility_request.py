from pydantic import BaseModel


class VisibilityRequest(BaseModel):
    latitude: float
    longitude: float
    height: float