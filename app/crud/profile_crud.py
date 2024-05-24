from fastapi import HTTPException, UploadFile
from sqlalchemy.orm import Session
from models.user_model import User as UserModel
from models.profile_model import Profile as ProfileModel
from schemas.profile_schema import ChangeDescription


def get_profile_with_posts(db: Session, profile_id: int) -> ProfileModel | None:
    profile_posts: ProfileModel | None = db.query(ProfileModel).filter(ProfileModel.profile_id == profile_id).first()
    return profile_posts


def get_profile(db: Session, profile_id: int) -> ProfileModel | None:
    return db.query(ProfileModel).filter(ProfileModel.profile_id == profile_id).first()


def get_profile_by_id(db: Session, profile_id: int) -> ProfileModel | None:

    return db.query(ProfileModel).filter(ProfileModel.profile_id == profile_id).first()


def update_profile_desc(db: Session, current_user: UserModel, req: ChangeDescription) -> ProfileModel:
    profile: ProfileModel | None = (
        db.query(ProfileModel).filter(ProfileModel.profile_id == current_user.profile.profile_id).first()
    )
    if not profile:
        raise HTTPException(status_code=401, detail="no profile with that id")

    profile.description = req.new_description  # type: ignore
    db.add(profile)
    db.commit
    return profile
