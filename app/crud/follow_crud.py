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
from models.profile_model import Profile as ProfileModel
from models.follow_model import Follow as FollowModel

from schemas import user_schema, token_schema, post_schema, profile_schema
from schemas.token_schema import TokenResponse
from dependencies.user_dependency import get_current_user
from dependencies.db import get_db


def get_follow_relationship(db: Session, profile_id: int, current_user: UserModel) -> FollowModel | None:
    return (
        db.query(FollowModel)
        .filter(
            (FollowModel.follower_profile_id == current_user.profile.profile_id)
            & (FollowModel.profile_followed_id == profile_id)
        )
        .first()
    )


def follow_profile(profile_id: int, current_user: UserModel, db: Session) -> FollowModel | None:
    follow_relation = FollowModel(follower_profile_id=current_user.profile.profile_id, profile_followed_id=profile_id)
    db.add(follow_relation)
    db.commit()

    return follow_relation


def unfollow_user(profile_id: int, current_user: UserModel, db: Session):
    db_follow_relation: FollowModel | None = (
        db.query(FollowModel).filter(FollowModel.follower_profile_id == current_user.profile.profile_id).first()
    )


def find_followers(db: Session, profile_id: int, skip: int, limit: int) -> list[FollowModel]:
    return db.query(FollowModel).filter(FollowModel.profile_followed_id == profile_id).offset(skip).limit(limit).all()


def find_followed(db: Session, profile_id: int, skip: int, limit: int) -> list[FollowModel]:
    return db.query(FollowModel).filter(FollowModel.follower_profile_id == profile_id).offset(skip).limit(limit).all()
