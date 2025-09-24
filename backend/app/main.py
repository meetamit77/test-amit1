from fastapi import FastAPI
from starlette.middleware.sessions import SessionMiddleware
from starlette.config import Config

from app.api import google_oauth
from app.api.workout import router as workout_router
from app.api.clubevents import router as clubevents_router

from fastapi.middleware.cors import CORSMiddleware

from app.api import clubevents

config = Config('.env')
app = FastAPI()
app.add_middleware(SessionMiddleware, secret_key=config('JWT_SECRET_KEY'))
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Or ["http://localhost:3000"] for more security
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(google_oauth.router, prefix="/api", tags=["auth"])
app.include_router(workout_router, prefix="/api", tags=["workouts"])
app.include_router(clubevents_router, prefix="/api", tags=["clubevents"])

@app.get('/')
def read_root():
    return {"message": "Welcome to the Triluminatti API!"}
