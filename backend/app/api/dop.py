from fastapi import APIRouter

from app.schemas.visibility_request import VisibilityRequest
from app.services.visibility import compute_visibility
from app.services.receiver_position import llh_to_ecef
from app.services.dop import compute_dop
from app.database.database import get_db

router = APIRouter(
    prefix="/dop",
    tags=["DOP"]
)


@router.post("/")
def get_dop(request: VisibilityRequest):

    satellites = compute_visibility(
        request.latitude,
        request.longitude,
        request.height
    )

    receiver = llh_to_ecef(
        request.latitude,
        request.longitude,
        request.height
    )

    return compute_dop(receiver, satellites)