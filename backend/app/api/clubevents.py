from fastapi import APIRouter, Depends
from app.utils.jwt_validation import verify_jwt
from typing import List
from app.models.clubevent import ClubEvent
import json
import os

router = APIRouter()
DB_PATH = os.path.join(os.path.dirname(__file__), "../db/club_events.json")

def read_events() -> List[ClubEvent]:
    if not os.path.exists(DB_PATH):
        return []
    with open(DB_PATH, "r") as f:
        data = json.load(f)
        return [ClubEvent.parse_obj(item) for item in data]

def write_events(events: List[ClubEvent]):
    with open(DB_PATH, "w") as f:
        json.dump([event.dict() for event in events], f, indent=2)

@router.get("/club-events", response_model=List[ClubEvent])
def club_events(payload=Depends(verify_jwt)):
    return read_events()

@router.post("/club-events", response_model=ClubEvent)
def add_club_event(event: ClubEvent, payload=Depends(verify_jwt)):
    events = read_events()
    events.append(event)
    write_events(events)
    return event

