from sqlalchemy import Column, Integer, Float, Boolean, String, ForeignKey
from sqlalchemy.orm import relationship

from app.database.base import Base


class VisibilityResult(Base):
    __tablename__ = "visibility_results"

    id = Column(Integer, primary_key=True)

    simulation_id = Column(Integer, ForeignKey("simulation_sessions.id"))

    satellite = Column(String(20))

    azimuth = Column(Float)

    elevation = Column(Float)

    visible = Column(Boolean)

    simulation = relationship("SimulationSession", back_populates="visibility")