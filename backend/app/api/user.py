from fastapi import APIRouter, Depends
from app.utils.jwt_validation import verify_jwt

router = APIRouter()

@router.get("/users")
def list_users(payload=Depends(verify_jwt)):
    # List all users
    pass

@router.post("/users")
def create_user(payload=Depends(verify_jwt)):
    # Create a new user
    pass
