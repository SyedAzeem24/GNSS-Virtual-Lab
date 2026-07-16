from sqlalchemy import Column, Integer, String, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func

from app.database.base import Base


class UserSession(Base):
    __tablename__ = "user_sessions"

    id = Column(Integer, primary_key=True)

    user_id = Column(Integer, ForeignKey("users.id"))

    ip_address = Column(String(100))

    device = Column(String(255))

    login_time = Column(DateTime(timezone=True), server_default=func.now())

    logout_time = Column(DateTime(timezone=True), nullable=True)

    status = Column(String(30), default="Active")

    user = relationship("User", back_populates="sessions")