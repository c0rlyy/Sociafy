from typing import Literal
from sqlalchemy.orm import Session
from sqlalchemy import or_, and_, update
from sqlalchemy.sql import text
from fastapi import HTTPException

from service.password_hash import hash_password, verify_password

from models.user_model import User as UserModel
from models.profile_model import Profile as ProfileModel
from schemas.user_schema import UserCredentials, UserUpdate
from schemas.user_schema import UserCreate as UserCreateSchema
from schemas.token_schema import TokenBase
from service.web_token import encode, decode


def get_user(db: Session, user_id: int) -> UserModel | None:
    return db.query(UserModel).filter(UserModel.id == user_id).first()


def get_user_by_email_or_username(db: Session, email: str, username: str) -> UserModel | None:
    return db.query(UserModel).filter(or_(UserModel.email == email, UserModel.user_name == username)).first()


def get_user_by_username(db: Session, username: str) -> UserModel | None:
    return db.query(UserModel).filter(UserModel.user_name == username).first()


def get_user_by_email(db: Session, email: str) -> UserModel | None:
    return db.query(UserModel).filter(UserModel.email == email).first()


def get_users(db: Session, skip: int | None = 0, limit: int = 100) -> list[UserModel]:
    return db.query(UserModel).offset(skip).limit(limit).all()


def create_user_and_profile(db: Session, user_data: UserCreateSchema) -> UserModel | None:
    hashed_password: str = hash_password(user_data.password)

    db_user = UserModel(email=user_data.email, password=hashed_password, user_name=user_data.user_name)
    db.add(db_user)
    db.flush()
    db_profile = ProfileModel(user_id=db_user.id)
    db.add(db_profile)
    db.commit()
    return db_user


def log_in(db: Session, login_credentials: UserCredentials) -> str | None:
    db_user: UserModel | None = db.query(UserModel).filter(UserModel.email == login_credentials.email).first()

    if not db_user:
        return None
    if not verify_password(login_credentials.password, db_user.password):  # type: ignore
        return None

    token: str = encode({"user_id": db_user.id, "profile_id": db_user.profile.profile_id, "user_name": db_user.user_name})
    return token


def deleting_user(db: Session, credentials: UserCredentials, current_user: UserModel) -> bool:
    db_user: UserModel | None = db.query(UserModel).filter(UserModel.id == current_user.id).first()

    if not db_user:
        return False

    if not verify_password(credentials.password, db_user.password):  # type: ignore
        return False

    db.delete(db_user)
    db.commit()
    return True


def update_user(db: Session, user_credentials: UserCredentials, updated_user_data: UserUpdate, current_user: UserModel) -> UserModel | Literal[False]:

    db_user: UserModel | None = db.query(UserModel).filter(UserModel.id == current_user.id).first()

    if not db_user:
        raise HTTPException(status_code=404, detail="no user was found")

    if not verify_password(current_user.password, db_user.password):  # type: ignore
        return False
    if user_credentials.email != db_user.email:
        return False

    user_info_dict = updated_user_data.model_dump()
    if not user_info_dict:
        raise HTTPException(status_code=500, detail="Server error GL next time")

    for key, item in user_info_dict.items():
        if key == "password":
            item = hash_password(item)
        setattr(db_user, key, item)

    db.commit()
    db.refresh(db_user)
    return db_user
