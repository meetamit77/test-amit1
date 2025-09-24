from fastapi import APIRouter, Request
from starlette.responses import RedirectResponse
from app.utils.auth import create_access_token, oauth
import base64
import json
import os

router = APIRouter()


USERS_FILE = "app/db/users.json"

def save_user(email, name):
    # Load existing users
    if os.path.exists(USERS_FILE):
        with open(USERS_FILE, "r") as f:
            users = json.load(f)
    else:
        users = {}
    # Add or update user
    users[email] = {"email": email, "name": name}
    with open(USERS_FILE, "w") as f:
        json.dump(users, f)

@router.get('/auth/google/login')
async def login_via_google(request: Request):
    redirect_uri = request.url_for('auth_google_callback')
    print (redirect_uri)
    return await oauth.google.authorize_redirect(request, redirect_uri)

@router.get('/auth/google/callback')
async def auth_google_callback(request: Request):
    token = await oauth.google.authorize_access_token(request)
    user_info = token.get('userinfo')
    if not user_info:
        user_info = await oauth.google.parse_id_token(request, token)
    email = user_info.get('email')
    name = user_info.get('name')

    # Store user info in local file
    save_user(email, name)

    # Create JWT
    jwt_token = create_access_token({"sub": email, "name": name})

    # Redirect to frontend with JWT
    response = RedirectResponse(url=f"http://localhost:3000/?token={jwt_token}&name={name}&email={email}")
    return response
