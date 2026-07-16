from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database.database import get_db
from app.models.session import SimulationSession
from app.schemas.session import SessionCreate, SessionResponse
from app.dependencies.auth import get_current_user
from app.models.user import User

router = APIRouter(
    prefix="/api/session",
    tags=["Simulation Session"]
)


@router.post("/start", response_model=SessionResponse)
def start_session(
    session_data: SessionCreate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):

    session = SimulationSession(
        
        user_id=current_user.id, # Temporary (we'll replace this with JWT user later)
        latitude=session_data.latitude,
        longitude=session_data.longitude,
        height=session_data.height,
        status="Running"
    )

    db.add(session)
    db.commit()
    db.refresh(session)

    return session