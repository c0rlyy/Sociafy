import jwt
import os
from dotenv import load_dotenv
import time


load_dotenv()
ALGORYTHM = os.getenv("ALGORYTHM")
SECRET_KEY = os.getenv("SECRET_KEY")


def encode(payload: dict) -> str:
    payload["exp"] = time.time() + 1800
    return jwt.encode(payload, SECRET_KEY, algorithm=ALGORYTHM)


def decode(token: str) -> dict:
    return jwt.decode(token, SECRET_KEY, algorithms=[ALGORYTHM])  # type: ignore
