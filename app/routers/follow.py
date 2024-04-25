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
from models.file_model import File as FileModel
from models.profile_model import Profile as ProfileModel
from models.follow_model import Follow as FollowModel

from schemas import user_schema, token_schema, post_schema, profile_schema, follow_schema
from schemas.token_schema import TokenResponse
from dependencies.user_dependency import get_current_user
from dependencies.db import get_db

router = APIRouter(tags=["follows"])


@router.post("/api/v1/follow-profile/{profile_id}", response_model=follow_schema.Follow)
def follow_user(profile_id: int, current_user: UserModel = Depends(get_current_user), db: Session = Depends(get_db)):

    if current_user.profile.profile_id == profile_id:
        raise HTTPException(status_code=400, detail="wrong request, trying to follow yourself")

    db_profile: ProfileModel | None = profile_crud.get_profile_by_id(db, profile_id)
    if not db_profile:
        raise HTTPException(status_code=404, detail="no profile with that id was found")

    db_follow_relation: FollowModel | None = follow_crud.get_follow_relationship(db, profile_id, current_user)
    if db_follow_relation:
        raise HTTPException(status_code=400, detail="tryiong to follow already followed user")

    follow_relation: FollowModel | None = follow_crud.follow_profile(profile_id, current_user, db)
    if not follow_relation:
        raise HTTPException(status_code=500, detail="eror while tryhing to follow user, try agin")

    return follow_relation


@router.get("/api/v1/follows")
def read_all_follows(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    follows: list[FollowModel] = db.query(FollowModel).offset(skip).limit(limit).all()
    return follows


@router.get("/api/v1/follows/profile/{profile_id}", response_model=profile_schema.ProfileWithFollows, deprecated=True)
def read_follow_info_profile(profile_id: int, db: Session = Depends(get_db)):
    """reads info about profile and both followers/followed profiles not recomended coz its trash"""

    profile: ProfileModel | None = profile_crud.get_profile_by_id(db, profile_id)
    if not profile:
        raise HTTPException(status_code=404, detail="no profile with that id was found")
    return profile


@router.delete("/api/v1/delete-follow/{profile_id}")
def delete_follow(profile_id: int, current_user: UserModel = Depends(get_current_user), db: Session = Depends(get_db)):

    if current_user.profile.profile_id == profile_id:
        raise HTTPException(status_code=400, detail="wrong request, trying to un-follow yourself")
    db_follow_relation: FollowModel | None = follow_crud.get_follow_relationship(db, profile_id, current_user)

    if not db_follow_relation:
        raise HTTPException(status_code=400, detail="cannot unfollow not followed user")
    # i dont see a reason to make a sepereate function for this since its 2 lines of code,
    # maybe in the future when the logic will get more complex for now its pointless
    db.delete(db_follow_relation)
    db.commit()

    return {"msg": "sucesfully unfollowed the user, LEARN COBAL "}


import logging


@router.get("/api/v1/follows/profile-followers/{profile_id}", response_model=list[user_schema.UserOut])
def read_followers(profile_id: int, skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    user_followers: list[UserModel] = []
    followers: list[FollowModel] = follow_crud.find_followers(db, profile_id, skip, limit)

    if len(followers) < 1:
        raise HTTPException(status_code=404, detail="no followers were found")

    for follower in followers:
        user_followers.append(follower.follower.user)

    return user_followers


logging.basicConfig()
logging.getLogger("sqlalchemy.engine").setLevel(logging.INFO)


@router.get("/api/v1/follows/profile-followed/{profile_id}", response_model=list[user_schema.UserOut])
def read_followed(profile_id: int, skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    users_followed = []

    followed: list[FollowModel] = follow_crud.find_followed(db, profile_id, skip, limit)
    if len(followed) < 1:
        raise HTTPException(status_code=404, detail="no followers were found")

    # folloer is PROfileMOdel
    for follow in followed:
        users_followed.append(follow.followed.user)

    return users_followed
