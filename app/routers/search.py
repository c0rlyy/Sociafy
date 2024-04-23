from typing import Annotated, Literal

from fastapi import BackgroundTasks, Depends, HTTPException, Header, APIRouter

from sqlalchemy.orm import Session

from crud import file_crud, post_crud
from service.web_token import decode
from service.file_utils import FileProccesor
from service.web_token import decode, encode

from crud import user_crud, search_engine

from models.user_model import User as UserModel
from models.post_model import Post as PostModel
from models.file_model import File as FileModel


from schemas import user_schema, token_schema, post_schema
from schemas.token_schema import TokenResponse
from dependencies.user_dependency import get_current_user
from dependencies.db import get_db

router = APIRouter(tags=["search"])


@router.get("/api/v1/search/users", response_model=list[user_schema.UserOut])
def search_users(q: str, skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    # fix it
    users: list[UserModel] = search_engine.search_users(db, skip=skip, limit=limit, q=q)
    if len(users) < 1:
        raise HTTPException(status_code=404, detail="no users were found")
    return users


@router.get("/api/v1/search/posts", response_model=list[post_schema.PostAllInfo])
def search_posts(q: str, skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    # fix it
    posts: list[PostModel] = search_engine.search_posts(db, skip=skip, limit=limit, q=q)
    if len(posts) < 1:
        raise HTTPException(status_code=404, detail="no posts were found")
    return posts


@router.get("/api/v1/search")
def search_users_and_posts(q: str, skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    result: dict[str, list] = search_engine.search_all(db, skip=skip, limit=limit, q=q)

    if len(result["users"]) < 1 and len(result["posts"]) < 1:
        raise HTTPException(status_code=404, detail="no results were found")

    return result
