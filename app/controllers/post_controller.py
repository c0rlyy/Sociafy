from sqlalchemy.orm import Session
from sqlalchemy import or_, and_, update
from sqlalchemy.sql import text
from fastapi import HTTPException


from models.post_model import Post as PostModel
from schemas.token_schema import TokenBase
from service.web_token import encode, decode

from schemas import post_schema


def create_post(db: Session, post_data: post_schema.PostBase, token: str) -> PostModel:
    # dunno how i shgould handle the errors logic since in the example starting project FastAPi devs did not use any try except for stuff like this
    # but i think it would make sense from frontend perspecvie(they need to know what happend on server side)
    # and also maybe it can provie more usfull inromation to user
    # like for example not bad requuest but session expired log in again
    if token is None:
        raise HTTPException(status_code=403, detail="no token was given")
    try:
        user_info: dict = decode(token=token)
    except Exception as e:
        raise HTTPException(status_code=401, detail="Invalid or expired token")
    # TODO:
    # BEING EBLE TO NOT SEND ALL DATA LIKE I CAN WITH USER, DUNNO WHY SQLALCHEMY IS DOING WHAT ITS DOING
    # I CAN ALWAYS MAKE QUSTOM QUERRY BUT THAT DOES NOT MAKE SENSE AND ITS DUMB

    post = PostModel(
        post_title=post_data.post_title,
        profile_id=user_info["profile_id"],
        user_id=user_info["user_id"],
    )
    db.add(post)
    db.commit()
    return post


def get_posts(db: Session, skip: int | None = 0, limit: int = 100) -> list[PostModel]:
    return db.query(PostModel).offset(skip).limit(limit).all()
