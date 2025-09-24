import json
from sqlalchemy.orm import Session
from app.db.database import SessionLocal
from app.models.user import User

with open("app/db/users.json", "r") as f:
    users = json.load(f)

db: Session = SessionLocal()
for email, u in users.items():
    user = User(
        username=u.get("name", email),
        email=u["email"],
        is_coach=False  # Set as needed
    )
    db.add(user)
db.commit()
db.close()
print("User migration complete!")