from typing import Annotated

from fastapi import BackgroundTasks, Depends, HTTPException, Header, APIRouter

from sqlalchemy.orm import Session

from service.web_token import decode
from service.file_utils import FileProccesor
from service.web_token import decode, encode

from controllers import user_controller, post_controller, file_controler

from models.user_model import User as UserModel
from models.post_model import Post as PostModel
from models.file_model import File as FileModel

from schemas import user_schema, token_schema, post_schema
from schemas.token_schema import TokenResponse
from dependencies.user_dependency import get_current_user
from dependencies.db import get_db

router = APIRouter(tags=["user"])


@router.get("/users/me", response_model=user_schema.UserOut)
async def read_user_me(current_user: Annotated[UserModel, Depends(get_current_user)]):
    return current_user


@router.get("/users", response_model=list[user_schema.UserOut])
def read_users(skip: int | None = 0, limit: int = 100, db: Session = Depends(get_db)) -> list[UserModel]:
    users: list[UserModel] = user_controller.get_users(db, skip=skip, limit=limit)
    return users


@router.get("/users{user_id}", response_model=user_schema.UserOut)
def read_user(user_id: int, db: Session = Depends(get_db)) -> UserModel:
    db_user: UserModel | None = user_controller.get_user(db, user_id=user_id)
    if db_user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return db_user


@router.post("/users", response_model=TokenResponse)
def create_user_with_profile(user_data: user_schema.UserCreate, db: Session = Depends(get_db)) -> TokenResponse:
    is_user_data_in_db: UserModel | None = user_controller.get_user_by_email_or_username(db, user_data.email, user_data.user_name)
    if is_user_data_in_db:
        if is_user_data_in_db.email == user_data.email:  # type: ignore
            raise HTTPException(status_code=400, detail="Email already exists, learn c not react")
        else:
            raise HTTPException(status_code=400, detail="Username already exists, LEARN C NOT REACT")

    created_user: UserModel | None = user_controller.create_user_and_profile(db=db, user_data=user_data)

    if not created_user:
        raise HTTPException(status_code=500, detail="creating the account failed, try again")

    data = {"id": created_user.id, "sub": created_user.user_name, "email": created_user.email, "profile_id": created_user.profile.profile_id}
    access_token: str = encode(data=data)

    token_reponse = TokenResponse(access_token=access_token, token_type="bearer")
    return token_reponse


@router.delete("/users", response_model=dict[str, str])
async def delete_user_all(
    credentials: user_schema.UserCredentials, token: Annotated[str, Header()], background_tasks: BackgroundTasks, db: Session = Depends(get_db)
) -> dict[str, str]:
    # to be fixed later temp solution
    # i could just pass it as a dict decoded
    try:
        user_info = decode(token)
    except:
        raise HTTPException(status_code=401, detail="Incorrect or expired token !!!!")

    user_files: list[FileModel] | None = file_controler.get_all_user_files(db, user_info["user_id"])
    user_to_delete: bool = user_controller.deleting_user(db, credentials, token=token)

    if not user_to_delete:
        raise HTTPException(status_code=401, detail="Try Again, wrong credentials")

    if user_files:
        file_processor = FileProccesor()
        background_tasks.add_task(file_processor.delete_file_from_storage, user_files)
        return {"msg": "Sucesfully deleted the User and his files"}

    return {"msg": "succesfully deleted the User"}


@router.patch("/users", response_model=user_schema.UserOut)
def update_user_model(
    user_credentials: user_schema.UserCredentials,
    updated_user_data: user_schema.UserUpdate,
    current_user: Annotated[UserModel, Depends(get_current_user)],
    db: Session = Depends(get_db),
) -> UserModel:
    user_updated: UserModel | None = user_controller.update_user(db, user_credentials, updated_user_data, current_user)

    if user_updated is None:
        raise HTTPException(status_code=401, detail="incorrect Credentials")
    return user_updated


@router.get("/user/posts/{user_id}", response_model=list[post_schema.PostAllInfo])
def read_user_posts(user_id: int, db: Session = Depends(get_db)) -> list[PostModel]:
    posts: list[PostModel] | None = post_controller.get_user_posts(db, user_id)
    if posts is None:
        raise HTTPException(status_code=404, detail="no post were found")
    return posts
