from typing import Annotated, Literal

from fastapi import Depends, HTTPException, Header, APIRouter

from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from sqlalchemy.orm import Session

from service.authentication import authenticate_user
from service.web_token import encode, decode


from models.user_model import User as UserModel


from schemas.token_schema import TokenResponse
from dependencies.db import get_db

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/api/v1/login/access-token")
router = APIRouter(tags=["auth"])


@router.post("/api/v1/login/access-token", response_model=TokenResponse)
async def login_for_access_token(form_data: Annotated[OAuth2PasswordRequestForm, Depends()], db: Session = Depends(get_db)) -> TokenResponse:
    db_user: UserModel | Literal[False] = authenticate_user(db, form_data.username, form_data.password)
    if not db_user:
        raise HTTPException(
            status_code=401,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    data = {"id": db_user.id, "sub": db_user.user_name, "email": db_user.email, "profile_id": db_user.profile.profile_id}

    access_token: str = encode(data=data)

    token_reponse = TokenResponse(access_token=access_token, token_type="bearer")
    return token_reponse


##### this dont make no sense
# @router.post("/api/v1/login", response_model=TokenResponse)
# def log_in(token: Annotated[str, Depends(oauth2_scheme)]) -> TokenResponse:
#     if token is None:
#         raise HTTPException(status_code=401, detail="Wrong Password or email and yes i love react")

#     token_reponse = TokenResponse(access_token=token, token_type="bearer")
#     print(decode(token))
#     return token_reponse
