from datetime import datetime, timedelta, timezone
from jose import JWSError, jwt
import os
from dotenv import load_dotenv


load_dotenv()
ALGORYTHM = os.getenv("ALGORYTHM")
SECRET_KEY = os.getenv("SECRET_KEY")


def encode(data: dict) -> str:
    TOKEN_EXPIRES_IN_MIN = 15
    to_encode = data.copy()

    expire = datetime.now(timezone.utc) + timedelta(minutes=TOKEN_EXPIRES_IN_MIN)
    to_encode.update({"exp": expire})

    encoded_jwt: str = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORYTHM)  # type: ignore
    return encoded_jwt


def decode(token: str):
    return jwt.decode(token, SECRET_KEY, algorithms=[ALGORYTHM])  # type: ignore
