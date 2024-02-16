from sqlalchemy.orm import Session
from sqlalchemy import or_, and_


# from models.user_model import User as UserModel
from models.profile_model import Profile as ProfileModel

# from schemas.user_schema import UserCredentials

# from schemas import user_schema
from schemas import profile_schema


def create_user_profile(db: Session, profile: profile_schema.ProfileCreate, user_id: int):
    db_profile = ProfileModel(
        user_id=user_id,
        description=profile.description,
    )
    db.add(db_profile)
    db.commit()
    db.refresh(db_profile)
    return db_profile
