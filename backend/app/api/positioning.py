from fastapi import APIRouter
from app.schemas.visibility_request import VisibilityRequest
from app.services.positioning import simulate_position
from app.database.database import get_db

router = APIRouter(
    prefix="/positioning",
    tags=["Positioning"]
)

@router.post("/")
def positioning(request: VisibilityRequest):

    return simulate_position(

        request.latitude,
        request.longitude,
        request.height

    )