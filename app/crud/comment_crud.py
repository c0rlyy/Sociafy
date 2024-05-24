from typing import Annotated, Literal

from fastapi import BackgroundTasks, Depends, HTTPException, Header, APIRouter

from sqlalchemy import TextClause, text
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


def read_post_comments(post_id: int, skip: int, limit: int, db: Session): 

    s1: TextClause = text(
        """
    SELECT users.user_name ,users.id ,profiles.user_id ,profiles.description, profiles.picture_id , comments.post_id, comments.profile_id, comments.comment_content
    FROM users 
    LEFT JOIN profiles on users.id = profiles.user_id 
    LEFT JOIN comments ON profiles.profile_id = comments.profile_id WHERE comments.post_id = :value 
    LIMIT :limit OFFSET :offset
    """
    )
    result = db.execute(s1, {"value": post_id, "limit": limit, "offset": skip})

    res = []
    for row in result:
        res_dict = {
            "username": row[0],
            "user_id": row[1],
            "profile_id": row[6],
            "profile_description": row[3],
            "profile_picture_id": row[4],
            "post_id": row[5],
            "comment_content": row[7],
        }
        res.append(res_dict)

    return res
