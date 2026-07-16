from sqlalchemy import Column, Integer, Float, ForeignKey
from sqlalchemy.orm import relationship

from app.database.base import Base


class DOPResult(Base):
    __tablename__ = "dop_results"

    id = Column(Integer, primary_key=True)

    simulation_id = Column(Integer, ForeignKey("simulation_sessions.id"))

    gdop = Column(Float)

    pdop = Column(Float)

    hdop = Column(Float)

    vdop = Column(Float)

    tdop = Column(Float)

    visible_satellites = Column(Integer)

    simulation = relationship("SimulationSession", back_populates="dop")