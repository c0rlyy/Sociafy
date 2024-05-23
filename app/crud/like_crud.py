from typing import Annotated, Literal

from fastapi import BackgroundTasks, Depends, HTTPException, Header, APIRouter

from sqlalchemy.orm import Session

from crud import file_crud, post_crud, profile_crud
from service.web_token import decode
from service.file_utils import FileProccesor
from service.web_token import decode, encode

from crud import user_crud, follow_crud

from models.user_model import User as UserModel
from models.post_model import Post as PostModel
from models.like_model import Like as LikeModel

from models.file_model import File as FileModel
from models.profile_model import Profile as ProfileModel
from models.follow_model import Follow as FollowModel

from schemas import user_schema, token_schema, post_schema, profile_schema, follow_schema
from schemas.token_schema import TokenResponse
from dependencies.user_dependency import get_current_user
from dependencies.db import get_db


def find_like(db: Session, post_id: int, current_user: UserModel) -> LikeModel | None:

    return (
        db.query(LikeModel)
        .filter((LikeModel.profile_id == current_user.profile.profile_id) & (LikeModel.post_id == post_id))
        .first()
    )


def create_like(db: Session, post_id: int, current_user: UserModel):
    like = LikeModel(post_id=post_id, profile_id=current_user.profile.profile_id)
    db.add(like)
    db.commit()
    return like
