from typing import Annotated, Literal

from fastapi import BackgroundTasks, Depends, HTTPException, Header, APIRouter

from sqlalchemy.orm import Session

from crud import file_crud, post_crud
from service.web_token import decode
from service.file_utils import FileProccesor
from service.web_token import decode, encode

from crud import user_crud

from models.user_model import User as UserModel
from models.post_model import Post as PostModel
from models.file_model import File as FileModel
from models.profile_model import Profile as ProfileModel
from models.follow_model import Follow as FollowModel
from models.comment_model import Comment as CommentModel

from schemas import user_schema, token_schema, post_schema, profile_schema, comment_schema
from schemas.token_schema import TokenResponse
from dependencies.user_dependency import get_current_user
from dependencies.db import get_db


def add_comment(
    post_id: int, current_user: UserModel, request: comment_schema.CreateComment, db: Session
) -> CommentModel:

    comment = CommentModel(
        post_id=post_id, profile_id=current_user.profile.profile_id, comment_content=request.comment_content
    )

    db.add(comment)
    db.commit()
    return comment


def read_post_comments(post_id: int, skip: int, limit: int, db: Session) -> list[CommentModel]:
    post_comments: list[CommentModel] = (
        db.query(CommentModel).filter(CommentModel.post_id == post_id).offset(skip).limit(limit).all()
    )
    return post_comments
