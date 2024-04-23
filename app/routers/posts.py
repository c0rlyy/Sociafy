from typing import Annotated

from fastapi import BackgroundTasks, Depends, HTTPException, Header, UploadFile, File, APIRouter

from sqlalchemy.orm import Session

from crud import file_crud
from service.web_token import decode
from service.file_utils import FileProccesor

from crud import post_crud

from models.post_model import Post as PostModel
from models.file_model import File as FileModel
from models.user_model import User as UserModel

from schemas import post_schema

from dependencies.db import get_db
from dependencies.form_checker import post_checker
from dependencies.user_dependency import get_current_user

router = APIRouter(tags=["post"])


@router.get("/api/v1/posts/me", response_model=list[post_schema.PostAllInfo])
def read_posts_me(
    current_user: Annotated[UserModel, Depends(get_current_user)], skip: int | None = 0, limit: int = 100, db: Session = Depends(get_db)
) -> list[PostModel]:
    user_me_posts: list[PostModel] | None = post_crud.get_current_user_posts(db, current_user, skip=skip, limit=limit)
    if not user_me_posts:
        raise HTTPException(status_code=404, detail="no user posts were found")
    return user_me_posts


@router.post("/api/v1/posts/create-optional-file", response_model=post_schema.PostAllInfo)
async def uploading_file_with_post(
    current_user: Annotated[UserModel, Depends(get_current_user)],
    post: Annotated[post_schema.PostCreate, Depends(post_checker)],
    db: Session = Depends(get_db),
    uploaded_files: Annotated[list[UploadFile], File(description="photos/videos sent from FORM object in js")] = None,  # type: ignore #if i make it list[type],None ... it brakes the docs, but works
) -> PostModel:
    """exmaple of data in form
    {"post_title":"send this as a string"}
    """

    if not uploaded_files:
        db_post: PostModel = post_crud.create_post(db, post, current_user)
        return db_post

    if len(uploaded_files) > 3:
        raise HTTPException(status_code=400, detail="exceeded limit of files attached to post")

    file_processor = FileProccesor(uploaded_files)
    files_meta_data: list[dict[str, str]] = await file_processor.process_and_validate_all_files()

    full_post: PostModel = post_crud.create_post_with_files(db, post, current_user, files_meta_data)
    return full_post


@router.get("/api/v1/posts/{post_id}/files", response_model=dict[str, list[int]])
async def get_files_id(post_id: int, db: Session = Depends(get_db)):
    db_files: list[FileModel] | None = file_crud.get_post_files(db, post_id)
    if not db_files:
        raise HTTPException(status_code=404, detail="no file with that post id was found")
    file_id_list: list[int] = []
    for file in db_files:
        file_id_list.append(file.file_id)  # type: ignore

    return {"post's files id's": file_id_list}


# deprecated
# @router.post("/posts-create", response_model=post_schema.PostBase, deprecated=True)
# def create_post(post_data: post_schema.PostCreate, token: Annotated[str, Header()], db: Session = Depends(get_db)) -> PostModel:
#     new_post: PostModel | None = post_controller.create_post(db, post_data=post_data, token=token)
#     if new_post is None:
#         raise HTTPException(status_code=500, detail="failed adding the post")
#     return new_post


@router.get("/api/v1/posts", response_model=list[post_schema.PostAllInfo])
def read_posts(skip: int | None = 0, limit: int = 100, db: Session = Depends(get_db)) -> list[PostModel]:
    posts: list[PostModel] = post_crud.get_posts(skip=skip, limit=limit, db=db)
    if not posts:
        raise HTTPException(status_code=404, detail="no post were found")
    return posts


@router.get("/api/v1/posts/{post_id}", response_model=post_schema.PostAllInfo)
def read_post(post_id: int, db: Session = Depends(get_db)) -> list[PostModel]:
    post: PostModel = post_crud.get_post(db, post_id)
    if not post:
        raise HTTPException(status_code=404, detail="no post was found, golang is the way")
    return post


@router.delete("/api/v1/posts/{post_id}}", response_model=dict)
def delete_post(
    post_id: int, curerent_user: Annotated[UserModel, Depends(get_current_user)], background_tasks: BackgroundTasks, db: Session = Depends(get_db)
):

    post_files: list[FileModel] | None = file_crud.get_post_files(db, post_id)

    if not post_files:
        is_deleted = post_crud.delete_post(db, post_id, curerent_user)

        if not is_deleted:
            raise HTTPException(status_code=500, detail="Error while trying to delete the post")

        return {"deleted post id ": post_id}

    if post_files[0].user_id != curerent_user.id:  # type: ignore
        raise HTTPException(status_code=403, detail="Frobiden!! no acces ")

    is_deleted = post_crud.delete_post(db, post_id, curerent_user)

    if not is_deleted:
        raise HTTPException(status_code=500, detail="Error while trying to delete the post try again")

    file_processor = FileProccesor()
    background_tasks.add_task(file_processor.delete_file_from_storage, post_files)  # type: ignore

    return {"deleted post id ": post_id}
