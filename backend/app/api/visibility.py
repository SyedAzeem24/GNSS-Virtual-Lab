from fastapi import APIRouter
from app.schemas.visibility_request import VisibilityRequest
from app.services.visibility import compute_visibility

router = APIRouter(
    prefix="/visibility",
    tags=["Visibility"]
)

@router.post("/")
def get_visibility(request: VisibilityRequest):

    return compute_visibility(
        request.latitude,
        request.longitude,
        request.height
    )