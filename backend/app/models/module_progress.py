from sqlalchemy import Column, Integer, String, Boolean, Float, ForeignKey
from sqlalchemy.orm import relationship

from app.database.base import Base


class ModuleProgress(Base):
    __tablename__ = "module_progress"

    id = Column(Integer, primary_key=True)

    user_id = Column(Integer, ForeignKey("users.id"))

    module = Column(String(100))

    completed = Column(Boolean, default=False)

    score = Column(Float, default=0)

    time_spent = Column(Float, default=0)

    user = relationship("User", back_populates="progress")