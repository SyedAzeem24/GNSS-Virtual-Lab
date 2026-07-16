from sqlalchemy import Column, Integer, String, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func

from app.database.base import Base


class ActivityLog(Base):
    __tablename__ = "activity_logs"

    id = Column(Integer, primary_key=True)

    user_id = Column(Integer, ForeignKey("users.id"))

    activity = Column(String(100))

    module = Column(String(100))

    description = Column(String(255))

    timestamp = Column(DateTime(timezone=True), server_default=func.now())

    user = relationship("User", back_populates="activities")