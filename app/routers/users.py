from typing import Annotated, Literal

from fastapi import BackgroundTasks, Depends, HTTPException, Header, APIRouter

from sqlalchemy.orm import Session

from crud import file_crud, post_crud
from service.web_token import decode
from service.file_utils import FileProccesor
from service.web_token import decode, encode

from crud import user_crud

from models.user_model import User as UserModel
from models.post_model import Post as PostModel
from models.file_model import File as FileModel

from schemas import user_schema, token_schema, post_schema
from schemas.token_schema import TokenResponse
from dependencies.user_dependency import get_current_user
from dependencies.db import get_db

router = APIRouter(tags=["user"])


@router.get("/api/v1/users/me", response_model=user_schema.UserOut)
async def read_user_me(current_user: Annotated[UserModel, Depends(get_current_user)]):
    return current_user


@router.get("/api/v1/users", response_model=list[user_schema.UserOut])
def read_users(skip: int | None = 0, limit: int = 100, db: Session = Depends(get_db)) -> list[UserModel]:
    users: list[UserModel] = user_crud.get_users(db, skip=skip, limit=limit)
    return users


@router.get("/api/v1/users{user_id}", response_model=user_schema.UserOut)
def read_user(user_id: int, db: Session = Depends(get_db)) -> UserModel:
    db_user: UserModel | None = user_crud.get_user(db, user_id=user_id)
    if db_user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return db_user


@router.post("/api/v1/users", response_model=TokenResponse)
def create_user_with_profile(user_data: user_schema.UserCreate, db: Session = Depends(get_db)) -> TokenResponse:
    is_user_data_in_db: UserModel | None = user_crud.get_user_by_email_or_username(db, user_data.email, user_data.user_name)
    if is_user_data_in_db:
        if is_user_data_in_db.email == user_data.email:  # type: ignore
            raise HTTPException(status_code=400, detail="Email already exists, learn c not react")
        else:
            raise HTTPException(status_code=400, detail="Username already exists, LEARN C NOT REACT")

    created_user: UserModel | None = user_crud.create_user_and_profile(db=db, user_data=user_data)

    if not created_user:
        raise HTTPException(status_code=500, detail="creating the account failed, try again")

    data = {"id": created_user.id, "sub": created_user.user_name, "email": created_user.email, "profile_id": created_user.profile.profile_id}
    access_token: str = encode(data=data)

    token_reponse = TokenResponse(access_token=access_token, token_type="bearer")
    return token_reponse


@router.delete("/api/v1/users", response_model=dict[str, str])
async def delete_user_all(
    credentials: user_schema.UserPasswordCred,
    current_user: Annotated[UserModel, Depends(get_current_user)],  # token, and that returns the usre thats assinged to token
    background_tasks: BackgroundTasks,
    db: Session = Depends(get_db),
) -> dict[str, str]:

    user_files: list[FileModel] | None = file_crud.get_all_user_files(db, current_user.id)  # type: ignore
    user_to_delete: bool = user_crud.deleting_user(db, credentials, current_user)

    if not user_to_delete:
        raise HTTPException(status_code=401, detail="The operation failed try again")

    if user_files:
        file_processor = FileProccesor()
        background_tasks.add_task(file_processor.delete_file_from_storage, user_files)
        return {"msg": "Sucesfully deleted the User and his files"}

    return {"msg": "succesfully deleted the User"}


@router.get("/api/v1/user/posts/{user_id}", response_model=list[post_schema.PostAllInfo])
def read_user_posts(user_id: int, db: Session = Depends(get_db)) -> list[PostModel]:
    posts: list[PostModel] | None = post_crud.get_user_posts(db, user_id)
    if posts is None:
        raise HTTPException(status_code=404, detail="no post were found")
    return posts


# @router.patch("/api/v1/users", response_model=user_schema.UserOut)
# def update_user_model(
#     user_credentials: user_schema.UserPasswordCred,
#     updated_user_data: user_schema.UserUpdate,
#     current_user: Annotated[UserModel, Depends(get_current_user)],
#     db: Session = Depends(get_db),
# ) -> UserModel:
#     user_updated: UserModel | None = user_crud.update_user(db, user_credentials, updated_user_data, current_user)

#     if user_updated is None:
#         raise HTTPException(status_code=401, detail="incorrect Credentials")
#     return user_updated


@router.patch("/api/v1/users/change-password", response_model=user_schema.UserOut)
def change_user_password(
    req_data: user_schema.UserPasswordChange,
    current_user: Annotated[UserModel, Depends(get_current_user)],
    db: Session = Depends(get_db),
) -> UserModel:
    user_updated: UserModel | Literal[False] = user_crud.change_password(db, req_data, current_user)

    if not user_updated:
        raise HTTPException(status_code=401, detail="incorrect Credentials")

    return user_updated


@router.patch("/api/v1/users/change-email", response_model=user_schema.UserOut)
def change_user_email(
    req_data: user_schema.UserEmailChange,
    current_user: Annotated[UserModel, Depends(get_current_user)],
    db: Session = Depends(get_db),
) -> UserModel:
    user_updated: UserModel | Literal[False] = user_crud.change_email(db, req_data, current_user)

    if not user_updated:
        raise HTTPException(status_code=401, detail="incorrect Credentials")

    return user_updated


@router.patch("/api/v1/users/change-username", response_model=user_schema.UserOut)
def change_user_name(
    req_data: user_schema.UserNameChange,
    current_user: Annotated[UserModel, Depends(get_current_user)],
    db: Session = Depends(get_db),
) -> UserModel:
    user_updated: UserModel | Literal[False] = user_crud.change_user_name(db, req_data, current_user)

    if not user_updated:
        raise HTTPException(status_code=401, detail="incorrect Credentials")

    return user_updated
