from fastapi import Depends, HTTPException, APIRouter

from sqlalchemy.orm import Session


from controllers import user_controller, profile_controller

from models.profile_model import Profile as ProfileModel

from schemas import profile_schema

from dependencies.db import get_db


router = APIRouter(tags=["profile"])


@router.get("/profile/{user_id}", response_model=profile_schema.ProfileWithUser)
def read_profile(user_id: int, db: Session = Depends(get_db)) -> user_controller.ProfileModel:
    user_profile: user_controller.ProfileModel | None = profile_controller.get_profile(db, user_id)
    if user_profile is None:
        raise HTTPException(status_code=404, detail="No profile was found try again")
    return user_profile


@router.get("/profile/{profile_id}/posts", response_model=profile_schema.ProfileWithPost)
def read_profile_and_posts(profile_id: int, db: Session = Depends(get_db)) -> ProfileModel:
    profile_with_posts: ProfileModel | None = profile_controller.get_profile_with_posts(db, profile_id)
    if profile_with_posts is None:
        raise HTTPException(status_code=404, detail="wrong id, try again")

    return profile_with_posts
