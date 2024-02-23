from sqlalchemy.orm import Session
from sqlalchemy import or_, and_
from fastapi import HTTPException

from service.password_hash import hash_password, verify_password

from models.user_model import User as UserModel
from models.profile_model import Profile as ProfileModel
from schemas.user_schema import UserCredentials, UserUpdate
from schemas.user_schema import UserCreate as UserCreateSchema
from schemas.token_schema import TokenBase
from service.web_token import encode, decode


# from schemas.profile_schema import ProfileCreate as ProfileCreateSchema


def get_user(db: Session, user_id: int):
    return db.query(UserModel).filter(UserModel.id == user_id).first()


def get_user_by_email_or_username(db: Session, email_or_username: str):
    return db.query(UserModel).filter(or_(UserModel.email == email_or_username, UserModel.user_name == email_or_username)).first()


def get_users(db: Session, skip: int | None = 0, limit: int = 100):
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
    # fn verify_password
    if db_user and verify_password(user.password, db_user.password):  # type: ignore
        token: str = encode({"user_id": db_user.id, "profile_id": db_user.profile.profile_id, "user_name": db_user.user_name})
        print(decode(token))
        return token
    return None


def deleting_user(db: Session, user: UserCredentials, token: str):
    db_user = db.query(UserModel).filter(UserModel.email == user.email).first()
    try:
        decoded_token = decode(token)
    except Exception as e:
        raise HTTPException(status_code=401, detail=f":) {e}")
    # print(db_user.id, decoded_token["user_id"])
    if db_user and verify_password(user.password, db_user.password) and decoded_token["user_id"] == db_user.id:  # type: ignore
        profile = db.query(ProfileModel).filter(ProfileModel.profile_id == db_user.profile.profile_id).first()
        db.delete(db_user)
        db.delete(profile)
        db.commit()
        return True
    else:
        return False


def update_user(db: Session, user: UserCredentials, user_to_change_info: UserUpdate, user_id: int):
    user_to_update = db.query(UserModel).filter(UserModel.id == user_id).first()
