from fastapi import APIRouter
from pydantic import BaseModel

from app.services.visibility import compute_visibility

router = APIRouter()


class Receiver(BaseModel):
    latitude: float
    longitude: float
    height: float


@router.post("/")
def skyplot(receiver: Receiver):

    satellites = compute_visibility(
        receiver.latitude,
        receiver.longitude,
        receiver.height
    )

    return [
        {
            "satellite": sat["satellite"],
            "azimuth": sat["azimuth"],
            "elevation": sat["elevation"],
            "visible": sat["visible"]
        }
        for sat in satellites
    ]