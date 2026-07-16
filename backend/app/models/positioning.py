from sqlalchemy import Column, Integer, Float, ForeignKey
from sqlalchemy.orm import relationship

from app.database.base import Base


class PositionResult(Base):
    __tablename__ = "position_results"

    id = Column(Integer, primary_key=True)

    simulation_id = Column(Integer, ForeignKey("simulation_sessions.id"))

    actual_lat = Column(Float)

    actual_lon = Column(Float)

    actual_height = Column(Float)

    estimated_lat = Column(Float)

    estimated_lon = Column(Float)

    estimated_height = Column(Float)

    position_error = Column(Float)

    clock_bias = Column(Float)

    simulation = relationship("SimulationSession", back_populates="position")