
from authlib.integrations.starlette_client import OAuth
from starlette.config import Config
import jwt
from datetime import datetime, timedelta

# Google OAuth setup
config = Config('.env')

# Secret key for JWT encoding/decoding
ALGORITHM = 'HS256'
ACCESS_TOKEN_EXPIRE_MINUTES = 60
def create_access_token(data: dict, expires_delta: int = None):
	to_encode = data.copy()
	if expires_delta is not None:
		expire = datetime.utcnow() + timedelta(minutes=expires_delta)
	else:
		expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
	to_encode.update({"exp": expire})
	secret_key = config('JWT_SECRET_KEY')
	encoded_jwt = jwt.encode(to_encode, secret_key, algorithm=ALGORITHM)
	return encoded_jwt




oauth = OAuth(config)
oauth.register(
	name='google',
	client_id=config('GOOGLE_CLIENT_ID'),
	client_secret=config('GOOGLE_CLIENT_SECRET'),
	server_metadata_url='https://accounts.google.com/.well-known/openid-configuration',
	client_kwargs={
		'scope': 'openid email profile',
		 'response_type': 'code',
        'prompt': 'consent'
	}
)



