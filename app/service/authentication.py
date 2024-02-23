from sqlalchemy.orm import Session
from sqlalchemy import or_, and_

from service.password_hash import hash_password, verify_password

from models.user_model import User as UserModel
from models import user_model
from schemas.user_schema import UserCredentials
from schemas.user_schema import UserCreate as UserCreateSchema


def user_authetication(db: Session, user: UserCredentials):
    db_user = db.query(UserModel).filter(UserModel.email == user.email).first()


def deleting_user(db: Session, user: UserCredentials):
    db_user = db.query(UserModel).filter(UserModel.email == user.email).first()
    if db_user and verify_password(user.password, db_user.password):  # type: ignore
        db.delete(db_user)
        db.commit()
        return True
    else:
        return False
