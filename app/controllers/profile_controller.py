from sqlalchemy.orm import Session
from sqlalchemy import or_, and_


from models.user_model import User as UserModel
from models.profile_model import Profile as ProfileModel

from schemas.user_schema import UserCredentials


from schemas import user_schema, post_schema, profile_schema


def get_profile_with_posts(db: Session, profile_id: int) -> ProfileModel | None:
    profile_posts: ProfileModel | None = db.query(ProfileModel).filter(ProfileModel.profile_id == profile_id).first()
    return profile_posts


def get_profile(db: Session, user_id: int) -> ProfileModel | None:
    return db.query(ProfileModel).filter(ProfileModel.user_id == user_id).first()
