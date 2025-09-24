from pydantic import BaseModel

class ClubEvent(BaseModel):
    name: str
    sport: str
    date: str   # ISO date string, e.g. "2025-09-20"
    time: str   # e.g. "06:30"