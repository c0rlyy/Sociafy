from sqlalchemy.orm import Session
from sqlalchemy import or_, and_, update
from sqlalchemy.sql import text
from fastapi import HTTPException, UploadFile


from models.file_model import File as FileModel
from models.post_model import Post as PostModel
from schemas.token_schema import TokenBase
from service.web_token import encode, decode

from schemas import post_schema, file_schema

# TODO
# delete post []
# update post []
# your posts [*]
# post of those you folllow []
# most popular posts []


def create_post(db: Session, post_data: post_schema.PostCreate, token: str) -> PostModel:

    if token is None:
        raise HTTPException(status_code=403, detail="no token was given")
    try:
        user_info: dict = decode(token=token)
    except Exception as e:
        raise HTTPException(status_code=401, detail="Invalid or expired token")

    post = PostModel(
        post_description=post_data.post_description,
        post_title=post_data.post_title,
        profile_id=user_info["profile_id"],
        user_id=user_info["user_id"],
    )
    db.add(post)
    db.commit()
    return post


def create_post_with_files(db: Session, post_data: post_schema.PostCreate, token: str, files: list[dict[str, str]] | None = None) -> PostModel:

    if token is None:
        raise HTTPException(status_code=403, detail="no token was given")
    try:
        user_info: dict = decode(token=token)
    except Exception as e:
        raise HTTPException(status_code=401, detail="Invalid or expired token")

    if files is None:
        post_without_file: PostModel = create_post(db, post_data, token)
        return post_without_file

    post: PostModel = create_post(db, post_data, token)
    db.add(post)

    for file in files:
        db_file = FileModel(
            user_id=user_info["user_id"], file_name=file["file_name"], path=file["path"], file_type=file["file_type"], post_id=post.post_id
        )
        db.add(db_file)
    db.commit()
    return post


def get_posts(db: Session, skip: int | None = 0, limit: int = 100) -> list[PostModel]:
    return db.query(PostModel).offset(skip).limit(limit).all()


def get_post(db: Session, user_id: int, skip: int | None = 0, limit: int = 100) -> PostModel | None:
    return db.query(PostModel).filter(PostModel.user_id == user_id).first()


def get_current_user_posts(db: Session, token: str, skip: int | None = 0, limit: int = 100) -> list[PostModel] | None:
    if token is None:
        raise HTTPException(status_code=403, detail="no token was given")
    try:
        user_info: dict = decode(token=token)
    except Exception as e:
        raise HTTPException(status_code=401, detail="Invalid or expired token")

    user_post: list[PostModel] | None = db.query(PostModel).filter(PostModel.user_id == user_info["user_id"]).offset(skip).limit(limit).all()
    return user_post
