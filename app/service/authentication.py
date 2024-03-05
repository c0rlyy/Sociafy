from sqlalchemy.orm import Session
from sqlalchemy import or_, and_

from service.password_hash import hash_password, verify_password

from models.user_model import User as UserModel
from schemas.user_schema import UserCredentials


# maybe i will start making classes to be part of the cool kids gang, maybe
class UserAuthenthication:

    def user_authetication(self, db: Session, user: UserCredentials) -> UserModel | None:
        db_user: UserModel | None = db.query(UserModel).filter(UserModel.email == user.email).first()
        if db_user and verify_password(user.password, db_user.password):  # type:ignore
            return db_user
        return None
