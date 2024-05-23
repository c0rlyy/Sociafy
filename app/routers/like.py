from typing import Annotated, Literal

from fastapi import BackgroundTasks, Depends, HTTPException, Header, APIRouter

from sqlalchemy import TextClause, text
from sqlalchemy.orm import Session

from crud import file_crud, post_crud, profile_crud, like_crud
from service.web_token import decode
from service.file_utils import FileProccesor
from service.web_token import decode, encode

from crud import user_crud, follow_crud

from models.user_model import User as UserModel
from models.post_model import Post as PostModel
from models.like_model import Like as LikeModel

from models.file_model import File as FileModel
from models.profile_model import Profile as ProfileModel
from models.follow_model import Follow as FollowModel

from schemas import user_schema, token_schema, post_schema, profile_schema, follow_schema
from schemas.token_schema import TokenResponse
from dependencies.user_dependency import get_current_user
from dependencies.db import get_db

router = APIRouter(tags=["likes"])


@router.post("/api/v1/like-post/like/{post_id}")
def like_post(post_id: int, current_user: UserModel = Depends(get_current_user), db: Session = Depends(get_db)):

    db_post: PostModel | None = post_crud.get_post(db, post_id)
    if not db_post:
        raise HTTPException(status_code=404, detail="no post with that id was found ")

    like_relationship: LikeModel | None = like_crud.find_like(db, post_id, current_user)
    if like_relationship:
        raise HTTPException(status_code=400, detail="cannot like the same post twice, GOLANG IS THE WAY")

    like: LikeModel = like_crud.create_like(db, post_id, current_user)

    return {
        "post:id": like.post_id,
        "profile_id": like.profile_id,
    }


@router.get("/api/v1/count-likes/post/{post_id}", response_model=post_schema.PostCountLikes)
def count_post_likes(post_id: int, db: Session = Depends(get_db)):
    post: PostModel | None = post_crud.get_post(db, post_id)
    if not post:
        raise HTTPException(status_code=404, detail="no post with that id was found")

    sql_statement: TextClause = text('SELECT count(*) AS count_1 FROM "likes" WHERE likes.post_id = :value')
    result = db.execute(sql_statement, {"value": post_id})
    count_of_likes: int | None = result.scalar()

    if count_of_likes is None:
        raise HTTPException(status_code=500, detail="Server error while trying to fetch likes")

    number_of_likes = post_schema.PostCountLikes(post_likes_count=count_of_likes)  # type: ignore
    return number_of_likes


@router.delete("/api/v1/unlike-post/like/{post_id}")
def unlike_post(post_id: int, current_user: UserModel = Depends(get_current_user), db: Session = Depends(get_db)):

    db_post: PostModel | None = post_crud.get_post(db, post_id)
    if not db_post:
        raise HTTPException(status_code=404, detail="no post with that id was found ")

    like_relationship: LikeModel | None = like_crud.find_like(db, post_id, current_user)
    if not like_relationship:
        raise HTTPException(status_code=400, detail="cannot unlike not liked post")

    db.delete(like_relationship)
    db.commit()

    return {"succsfuly unliked the post, post_id:": db_post.post_id}
