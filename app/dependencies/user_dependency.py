from typing import Annotated

from fastapi import Depends, HTTPException
from fastapi.security import OAuth2PasswordBearer

from service.web_token import decode

from schemas.token_schema import TokenGetUser

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")


def decode_token(token: str) -> TokenGetUser:
    try:
        payload = decode(token)
    except:
        raise HTTPException(status_code=401, detail="unathorized acces JWT")

    return TokenGetUser(user_id=payload["user_id"], profile_id=payload["profile_id"], user_name=payload["user_name"], exp=payload["exp"])


async def get_current_user(token: Annotated[str, Depends(oauth2_scheme)]) -> TokenGetUser:

    current_user: TokenGetUser = decode_token(token)
    return current_user
