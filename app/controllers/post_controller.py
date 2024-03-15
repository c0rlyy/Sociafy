from sqlalchemy.orm import Session
from sqlalchemy import or_, and_, update
from sqlalchemy.sql import text
from fastapi import HTTPException


from models.post_model import Post as PostModel
from schemas.token_schema import TokenBase
from service.web_token import encode, decode

from schemas import post_schema

# TODO
# delete post []
# update post []
# your posts [*]
# post of those you folllow []
# most popular posts []


def create_post(db: Session, post_data: post_schema.PostCreate, token: str) -> PostModel:
    # dunno how i shgould handle the errors logic since in the example starting project FastAPi devs did not use any try except for stuff like this
    # but i think it would make sense from frontend perspecvie(they need to know what happend on server side)
    # and also maybe it can provie more usfull inromation to user
    # like for example not  500 error but session expired log in again
    if token is None:
        raise HTTPException(status_code=403, detail="no token was given")
    try:
        user_info: dict = decode(token=token)
    except Exception as e:
        raise HTTPException(status_code=401, detail="Invalid or expired token")

    # TODO:
    # thinking wheaher i should add aditional safe guard to make sure the right user is assinged to user_id
    # finsih post despcritopn stuff

    # cannot use .modelDump if i want to have descrition optional
    # coz sql querries dont adapt to that
    post = PostModel(
        # post_description = post.description | "i love css"
        post_title=post_data.post_title,
        profile_id=user_info["profile_id"],
        user_id=user_info["user_id"],
    )
    db.add(post)
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
