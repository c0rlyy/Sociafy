from sqlalchemy.orm import Session
from sqlalchemy import or_, and_, update
from sqlalchemy.sql import text
from fastapi import HTTPException


from models.post_model import Post as PostModel
from schemas.token_schema import TokenBase
from service.web_token import encode, decode

from schemas import post_schema


def create_post(db: Session, post_data: post_schema.PostBase, token: str):
    user_info = decode(token=token)

    post = PostModel(**post_data.model_dump(), profile_id=user_info["profile_id"], user_id=user_info["user_id"], post_description="aaaa")
    db.add(post)
    db.commit()
    print(post.id)
    return post


def get_posts(db: Session, skip: int | None = 0, limit: int = 100):
    return db.query(PostModel).offset(skip).limit(limit).all()
