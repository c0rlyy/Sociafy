from sqlalchemy.orm import Session
from sqlalchemy import or_, and_

from service.password_hash import hash_password, verify_password

from models.user_model import User as UserModel
from models import user_model
from schemas.user_schema import UserCredentials
from schemas.user_schema import UserCreate as UserCreateSchema

# from schemas.profile_schema import ProfileCreate as ProfileCreateSchema


def get_user(db: Session, user_id: int):
    return db.query(UserModel).filter(UserModel.id == user_id).first()


def get_user_by_email_or_username(db: Session, email_or_username: str):
    return db.query(UserModel).filter(or_(UserModel.email == email_or_username, UserModel.user_name == email_or_username)).first()


def get_users(db: Session, skip: int = 0, limit: int = 100):
    return db.query(UserModel).offset(skip).limit(limit).all()


def create_user(db: Session, user: UserCreateSchema):
    hashed_password = hash_password(user.password)

    db_user = UserModel(email=user.email, password=hashed_password, user_name=user.user_name)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    # profile_controller.create_user_profile(db=db, profile=profile, user_id=db_user.id)  # type: ignore

    return db_user


def log_in(db: Session, user: UserCredentials):
    db_user = db.query(UserModel).filter(UserModel.email == user.email).first()
    # i think doing it this way is fine coz if the user is None the if statment will stop executing before
    # verifiying password
    if db_user and verify_password(user.password, db_user.password):  # type: ignore
        return db_user
    return None


def delete_user(db: Session, user: UserCredentials):
    db_user = db.query(UserModel).filter(UserModel.email == user.email).first()
    if db_user and verify_password(user.password, db_user.password):  # type: ignore
        db.delete(db_user)
        db.commit()
        return {"message": "User deleted successfully"}
    else:
        return db_user
