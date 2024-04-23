from sqlalchemy.orm import Session


from models.user_model import User as UserModel
from models.profile_model import Profile as ProfileModel
from models.post_model import Post as PostModel


def search_users(db: Session, q: str, skip: int, limit: int) -> list[UserModel]:
    users: list[UserModel] = db.query(UserModel).filter(UserModel.user_name.like(f"%{q}%")).offset(skip).limit(limit).all()
    return users


def search_posts(db: Session, q: str, skip: int, limit: int) -> list[PostModel]:
    posts: list[PostModel] = db.query(PostModel).filter(PostModel.post_title.like(f"%{q}%")).offset(skip).limit(limit).all()
    return posts


def search_all(db: Session, q: str, skip: int, limit: int):
    # select * from users,posts where querry like =users.username or posts.title
    posts: list[PostModel] = search_posts(db, q, skip, limit)
    users: list[UserModel] = search_users(db, q, skip, limit)
    results = {"users": users, "posts": posts}
    return results
