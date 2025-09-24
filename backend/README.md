# Tri-luminatti Backend

- FastAPI based backend (Python) 
- Has the following structure
backend/
	app/
	db/
	models/
	services/
	utils/

- For local testing, run
```
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

- Install the following packages
```
pip install yarn
pip install uvicorn
pip install fastapi
pip install itsdangerous
pip install authlib
pip install httpx
pip install PyJWT
```

- Create a .env in backend directory and set the following variables correctly
```
GOOGLE_CLIENT_ID
GOOGLE_CLIENT_SECRET
JWT_SECRET_KEY
```