from fastapi import BackgroundTasks, Depends, HTTPException, Header, APIRouter

from sqlalchemy import TextClause, text
from sqlalchemy.orm import Session

from crud import file_crud, post_crud, profile_crud, like_crud, comment_crud


from models.user_model import User as UserModel
from models.comment_model import Comment as CommentModel
from models.post_model import Post as PostModel
from models.like_model import Like as LikeModel
from models.file_model import File as FileModel
from models.profile_model import Profile as ProfileModel
from models.follow_model import Follow as FollowModel

from schemas import user_schema, token_schema, post_schema, profile_schema, follow_schema, comment_schema
from schemas.token_schema import TokenResponse
from dependencies.user_dependency import get_current_user
from dependencies.db import get_db


router = APIRouter(tags=["comments"])


@router.post("/api/v1/comment/post/{post_id}", response_model=comment_schema.Comment)
def create_comment(
    post_id: int,
    reqest: comment_schema.CreateComment,
    current_user=Depends(get_current_user),
    db: Session = Depends(get_db),
) -> CommentModel:

    db_post: PostModel | None = post_crud.get_post(db, post_id)
    if not db_post:
        raise HTTPException(status_code=404, detail="post with that id does not exist")

    comment: CommentModel = comment_crud.add_comment(post_id, current_user, reqest, db)
    if not comment:
        raise HTTPException(status_code=500, detail="server Error while trying to add comment :)")

    return comment


@router.get("/api/v1/comment/post/{post_id}")
def read_post_comments(
    post_id: int,
    skip: int = 0,
    limit: int = 100,
    db: Session = Depends(get_db),
):
    posts_comments = comment_crud.read_post_comments(post_id, skip, limit, db)

    if len(posts_comments) < 1:
        raise HTTPException(status_code=404, detail="this post has no comments")

    return posts_comments


@router.delete("/api/v1/comment/{comment_id}")
def delete_comment(
    comment_id: int,
    curren_user: UserModel = Depends(get_current_user),
    db: Session = Depends(get_db),
):

    db_comment: CommentModel | None = db.query(CommentModel).filter(CommentModel.comment_id == comment_id).first()
    if not db_comment:
        raise HTTPException(status_code=404, detail="no comment was found")

    if db_comment.profile_id != curren_user.profile.profile_id:
        raise HTTPException(status_code=403, detail="tryin to delete comment thats is not yours")

    db.delete(db_comment)
    db.commit()
    return db_comment
