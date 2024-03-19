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

from schemas.profile_schema import ProfileCreate as ProfileCreateSchema


def get_user(db: Session, user_id: int) -> UserModel | None:
    return db.query(UserModel).filter(UserModel.id == user_id).first()


def get_user_by_email_or_username(db: Session, email_or_username: str) -> UserModel | None:
    return db.query(UserModel).filter(or_(UserModel.email == email_or_username, UserModel.user_name == email_or_username)).first()


def get_users(db: Session, skip: int | None = 0, limit: int = 100) -> list[UserModel]:
    return db.query(UserModel).offset(skip).limit(limit).all()


def create_user_and_profile(db: Session, user: UserCreateSchema) -> UserModel | None:
    hashed_password: str = hash_password(user.password)
    try:
        # chadGPT MADE
        with db.begin_nested():
            db_user = UserModel(email=user.email, password=hashed_password, user_name=user.user_name)
            db.add(db_user)
            db.flush()
            db.refresh(db_user)

            db_profile = ProfileModel(user_id=db_user.id, description="I want my PHP Lambo")
            db.add(db_profile)
            db.commit()
            return db_user
    except Exception as e:
        print(f"An error occurred: {e}")
        db.rollback()
        return None

    # db_user = UserModel(email=user.email, password=hashed_password, user_name=user.user_name)
    # db.add(db_user)
    # db.commit()
    # db.refresh(db_user)
    # profile_controller.create_user_profile(db=db, profile=profile, user_id=db_user.id)  # type: ignore
    # return db_user


def log_in(db: Session, user: UserCredentials) -> str | None:
    db_user: UserModel | None = db.query(UserModel).filter(UserModel.email == user.email).first()
    # i think doing it this way is fine coz if the user is None the if statment will stop executing before
    # fn verify_password so db user password will not be none
    if db_user and verify_password(user.password, db_user.password):  # type: ignore
        token: str = encode({"user_id": db_user.id, "profile_id": db_user.profile.profile_id, "user_name": db_user.user_name})
        return token
    return None


def deleting_user(db: Session, user: UserCredentials, token: str) -> bool:
    db_user = db.query(UserModel).filter(UserModel.email == user.email).first()
    try:
        decoded_token = decode(token)
    except Exception as e:
        raise HTTPException(status_code=401, detail=f":) {e}")
    if db_user and verify_password(user.password, db_user.password) and decoded_token["user_id"] == db_user.id:  # type: ignore
        profile = db.query(ProfileModel).filter(ProfileModel.profile_id == db_user.profile.profile_id).first()
        db.delete(db_user)
        db.delete(profile)
        db.commit()
        return True
    else:
        return False


def update_user(db: Session, user_credentials: UserCredentials, updated_user_data: UserUpdate, token: str) -> UserModel | None:
    # user_to_update = db.query(UserModel).filter(UserModel.id == user_id).first()
    # db.query(UserModel).filter(UserModel.id == user_id).update(updated_user_data)
    # db.commit()
    try:
        current_user: dict = decode(token)
    except Exception as e:
        raise HTTPException(status_code=401, detail=f"{e}")

    db_user: UserModel | None = db.query(UserModel).filter(UserModel.id == current_user["user_id"]).first()

    if db_user and verify_password(user_credentials.password, db_user.password) and user_credentials.email == db_user.email:  # type: ignore

        user_info_dict = updated_user_data.model_dump()
        if user_info_dict:

            for key, item in user_info_dict.items():
                if key == "password":
                    item = hash_password(item)
                setattr(db_user, key, item)

            db.commit()
            db.refresh(db_user)
            return db_user

    return None
