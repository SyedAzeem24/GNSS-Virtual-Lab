from sqlalchemy import Column, Integer, Float, String, ForeignKey
from sqlalchemy.orm import relationship

from app.database.base import Base


class SkyplotResult(Base):
    __tablename__ = "skyplot_results"

    id = Column(Integer, primary_key=True)

    simulation_id = Column(Integer, ForeignKey("simulation_sessions.id"))

    satellite = Column(String(20))

    azimuth = Column(Float)

    elevation = Column(Float)

    simulation = relationship("SimulationSession", back_populates="skyplot")