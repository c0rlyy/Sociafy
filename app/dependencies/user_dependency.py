from typing import Annotated

from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer

from jose import JWTError
from sqlalchemy.orm import Session

from service.web_token import decode

from schemas.token_schema import TokenData
from schemas.token_schema import TokenData

from controllers.user_controller import get_user_by_username

from dependencies.db import get_db

from models.user_model import User as UserModel

## redirect to "/token" endpoint
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")


##### this functions is sendiong the token to token endpoint and then returning the user from that endpoint alll of him
async def get_current_user(token: Annotated[str, Depends(oauth2_scheme)], db: Session = Depends(get_db)) -> UserModel:

    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )

    try:
        payload: dict = decode(token)
        username: str = payload.get("sub")  # type: ignore

        if username is None:
            raise credentials_exception

        token_data = TokenData(username=username)
    except JWTError:
        raise credentials_exception

    user: UserModel | None = get_user_by_username(db, token_data.username)  # type: ignore
    if user is None:
        raise credentials_exception

    return user
