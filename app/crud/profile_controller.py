from fastapi import UploadFile
from sqlalchemy.orm import Session

from models.profile_model import Profile as ProfileModel


def get_profile_with_posts(db: Session, profile_id: int) -> ProfileModel | None:
    profile_posts: ProfileModel | None = db.query(ProfileModel).filter(ProfileModel.profile_id == profile_id).first()
    return profile_posts


def get_profile(db: Session, user_id: int) -> ProfileModel | None:
    return db.query(ProfileModel).filter(ProfileModel.user_id == user_id).first()


def add_profile_pic(db: Session, token: str, profile_file: UploadFile):
    pass
