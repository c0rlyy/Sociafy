from typing import Literal
from sqlalchemy.orm import Session
from sqlalchemy import or_, and_

from crud.user_crud import get_user_by_username
from service.password_hash import hash_password, verify_password

from models.user_model import User as UserModel


def authenticate_user(db: Session, username: str, password: str) -> UserModel | Literal[False]:
    db_user: UserModel | None = get_user_by_username(db, username)
    if not db_user:
        return False
    if not verify_password(password, db_user.password):  # type: ignore
        return False
    return db_user
