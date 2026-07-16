from sqlalchemy import Column, Integer, Float, DateTime, ForeignKey, String
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func

from app.database.base import Base


class SimulationSession(Base):

    __tablename__ = "simulation_sessions"

    id = Column(Integer, primary_key=True, index=True)

    user_id = Column(
        Integer,
        ForeignKey("users.id"),
        nullable=False
    )

    latitude = Column(Float, nullable=False)

    longitude = Column(Float, nullable=False)

    height = Column(Float, nullable=False)

    status = Column(
        String(20),
        default="Running"
    )

    created_at = Column(
        DateTime(timezone=True),
        server_default=func.now()
    )

    completed_at = Column(
        DateTime(timezone=True),
        nullable=True
    )

    user = relationship(
        "User",
        back_populates="simulations"
    )

    visibility = relationship(
        "VisibilityResult",
        back_populates="simulation",
        uselist=False,
        cascade="all, delete-orphan"
    )

    dop = relationship(
        "DOPResult",
        back_populates="simulation",
        uselist=False,
        cascade="all, delete-orphan"
    )

    position = relationship(
        "PositionResult",
        back_populates="simulation",
        uselist=False,
        cascade="all, delete-orphan"
    )

    skyplot = relationship(
        "SkyplotResult",
        back_populates="simulation",
        uselist=False,
        cascade="all, delete-orphan"
    )