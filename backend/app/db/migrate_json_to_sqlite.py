import json
from sqlalchemy.orm import Session
from app.db.database import SessionLocal
from app.models.workout import Workout

# Load workouts from JSON
with open("app/db/workouts.json", "r") as f:
    workouts = json.load(f)

db: Session = SessionLocal()
for w in workouts:
    workout = Workout(
        sport=w["sport"],
        date=w["date"],
        title=w["title"],
        time=w["time"],
        distance=w["distance"],
        elevation=w["elevation"],
        relative_effort=w["relative_effort"],
        description=w.get("description", ""),
        images=",".join(w.get("images", [])),
        videos=",".join(w.get("videos", [])),
        thumbnail=w.get("thumbnail", "")
    )
    db.add(workout)
db.commit()
db.close()
print("Migration complete!")