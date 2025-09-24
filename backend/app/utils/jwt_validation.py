from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from jose import jwt, JWTError
from starlette.config import Config

from app.db.database import SessionLocal
from app.models.user import User

config = Config('.env')
ALGORITHM = 'HS256'
security = HTTPBearer()

# Dependency to validate JWT token

def verify_jwt(credentials: HTTPAuthorizationCredentials = Depends(security)):
    secret_key = config('JWT_SECRET_KEY')
    try:
        payload = jwt.decode(credentials.credentials, secret_key, algorithms=[ALGORITHM])
        email = payload.get("email")
        if not email:
            raise HTTPException(status_code=401, detail="Invalid token")
    except JWTError:
        raise HTTPException(status_code=401, detail="Invalid token")

    db = SessionLocal()
    user = db.query(User).filter(User.email == email).first()
    db.close()
    if not user:
        raise HTTPException(status_code=401, detail="User not found")
    return user
