from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.db.database import SessionLocal
from app.models.workout import Workout

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.get("/workouts")
def read_workouts(db: Session = Depends(get_db)):
    return db.query(Workout).all()
