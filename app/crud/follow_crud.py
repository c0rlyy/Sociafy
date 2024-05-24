from typing import Annotated, Literal

from fastapi import BackgroundTasks, Depends, HTTPException, Header, APIRouter

from sqlalchemy import TextClause, text
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

from schemas import user_schema, token_schema, post_schema, profile_schema, follow_schema
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


def get_profiles_followed(db: Session, profile_id: int, skip: int, limit: int):

    s1: TextClause = text(
        """
    SELECT users.user_name ,users.id ,profiles.user_id ,profiles.description, profiles.picture_id ,follows.profile_followed_id,follows.follower_profile_id 
    FROM users 
    LEFT JOIN profiles on users.id = profiles.user_id 
    LEFT JOIN follows ON profiles.profile_id = follows.profile_followed_id WHERE follows.follower_profile_id = :value 
    LIMIT :limit OFFSET :offset
    """
    )
    result = db.execute(s1, {"value": profile_id, "limit": limit, "offset": skip})

    res = []
    for row in result:
        res_dict = {
            "username": row[0],
            "user_id": row[1],
            "profile_description": row[3],
            "picture_id": row[4],
            "profile_id": row[5],
            "follower_id": row[6],
        }
        res.append(res_dict)
    return res


def get_profile_followers(db: Session, profile_id: int, skip: int, limit: int):

    s1: TextClause = text(
        """
    SELECT users.user_name ,users.id ,profiles.user_id ,profiles.description, profiles.picture_id ,follows.profile_followed_id,follows.follower_profile_id 
    FROM users 
    LEFT JOIN profiles on users.id = profiles.user_id 
    LEFT JOIN follows ON profiles.profile_id = follows.follower_profile_id 
    WHERE follows.profile_followed_id= :value 
    LIMIT :limit OFFSET :offset
    """
    )
    result = db.execute(s1, {"value": profile_id, "limit": limit, "offset": skip})
    res = []
    for row in result:

        res_dict = {
            "username": row[0],
            "user_id": row[1],
            "profile_description": row[3],
            "picture_id": row[4],
            "profile_id": row[6],
            "follows_profile_id": row[5],
        }

        res.append(res_dict)
    return res
