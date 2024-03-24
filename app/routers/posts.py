from typing import Annotated

from fastapi import BackgroundTasks, Depends, FastAPI, HTTPException, Header, UploadFile, File, APIRouter
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse

from sqlalchemy.orm import Session

from service.web_token import decode
from service.file_utils import FileProccesor

from controllers import user_controller, profile_controller, post_controller, file_controler

from models.user_model import User as UserModel
from models import user_model, profile_model, post_model, file_model
from models.post_model import Post as PostModel
from models.profile_model import Profile as ProfileModel
from models.file_model import File as FileModel

from schemas import user_schema, profile_schema, token_schema, post_schema

from dependencies.db import get_db
from dependencies.form_checker import Checker, post_checker
from dependencies.user_dependency import get_current_user

router = APIRouter(tags=["post"])


@router.get("/posts/me", response_model=list[post_schema.PostAllInfo])
def read_posts_me(token: Annotated[str, Header()], skip: int | None = 0, limit: int = 100, db: Session = Depends(get_db)) -> list[PostModel]:
    user_me_posts: list[PostModel] | None = post_controller.get_current_user_posts(db, token=token, skip=skip, limit=limit)
    if user_me_posts is None:
        raise HTTPException(status_code=404, detail="no user posts were found")
    return user_me_posts


@router.post("/posts/create-optional-file", response_model=post_schema.PostAllInfo)
async def uploading_file_with_post(
    token: Annotated[str, Header()],
    post: Annotated[post_schema.PostCreate, Depends(post_checker)],
    db: Session = Depends(get_db),
    uploaded_files: Annotated[list[UploadFile], File(description="photos/videos sent from FORM object in js")] = None,  # type: ignore #if i make it list[type],None ... it brakes the docs, but works
) -> PostModel:

    if uploaded_files is None:
        db_post: PostModel = post_controller.create_post(db, post, token)
        return db_post

    if len(uploaded_files) > 3:
        raise HTTPException(status_code=400, detail="exceeded limit of files attached to post")

    file_processor = FileProccesor(uploaded_files)
    files_meta_data: list[dict[str, str]] = await file_processor.process_and_validate_all_files()

    full_post: PostModel = post_controller.create_post_with_files(db, post, token, files_meta_data)
    return full_post


@router.get("/posts/{post_id}/files", response_model=dict[str, list[int]])
async def get_files_id(post_id: int, db: Session = Depends(get_db)):
    db_files: list[FileModel] | None = file_controler.get_post_files(db, post_id)
    if db_files is None:
        raise HTTPException(status_code=404, detail="no file with that post id was found")
    file_id_list: list[int] = []
    for file in db_files:
        file_id_list.append(file.file_id)  # type: ignore

    return {"post's files id's": file_id_list}


# no need to use this one
@router.post("/posts-create", response_model=post_schema.PostBase, deprecated=True)
def create_post(post_data: post_schema.PostCreate, token: Annotated[str, Header()], db: Session = Depends(get_db)) -> PostModel:
    new_post: PostModel | None = post_controller.create_post(db, post_data=post_data, token=token)
    if new_post is None:
        raise HTTPException(status_code=500, detail="failed adding the post")
    return new_post


@router.get("/posts", response_model=list[post_schema.PostAllInfo])
def read_posts(skip: int | None = 0, limit: int = 100, db: Session = Depends(get_db)) -> list[PostModel]:
    posts: list[PostModel] = post_controller.get_posts(skip=skip, limit=limit, db=db)
    return posts


@router.get("/posts/{post_id}", response_model=post_schema.PostAllInfo)
def read_post(post_id: int, db: Session = Depends(get_db)) -> list[PostModel]:
    post: PostModel = post_controller.get_post(db, post_id)
    if post is None:
        raise HTTPException(status_code=404, detail="no post was found, golang is the way")
    return post


@router.delete("/posts/{post_id}}", response_model=dict)
def delete_post(post_id: int, token: Annotated[str, Header()], background_tasks: BackgroundTasks, db: Session = Depends(get_db)):
    try:
        user_info = decode(token)
    except:
        raise HTTPException(status_code=401, detail="incorrect or expiered token")

    post_files: list[FileModel] | None = file_controler.get_post_files(db, post_id)
    if len(post_files) == 0:  # type: ignore
        raise HTTPException(status_code=404, detail="no post were found with that id")
    if post_files[0].user_id != user_info["user_id"]:  # type: ignore
        raise HTTPException(status_code=403, detail="Frobiden!! no acces ")
    # post_controller.get_post(db,) fix it to many querries also add
    file_processor = FileProccesor()
    background_tasks.add_task(file_processor.delete_file_from_storage, post_files)  # type: ignore

    post_controller.delete_post(db, post_id, user_info)

    return {"deleted post id ": post_id}
