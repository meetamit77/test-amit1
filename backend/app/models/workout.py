from typing import List, Optional
from pydantic import BaseModel
from sqlalchemy import Column, Integer, String, Text
from app.db.database import Base

class MediaItem(BaseModel):
    type: str  # "image" or "video"
    url: str

class Workout(Base):
    __tablename__ = "workouts"
    id = Column(Integer, primary_key=True, index=True)
    sport = Column(String, nullable=False)
    date = Column(String, nullable=False)
    title = Column(String, nullable=False)
    time = Column(String, nullable=False)
    distance = Column(String, nullable=False)
    elevation = Column(String, nullable=False)
    relative_effort = Column(Integer, nullable=False)
    description = Column(Text)
    images = Column(Text)
    videos = Column(Text)
    thumbnail = Column(Text)
