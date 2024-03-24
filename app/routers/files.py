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

router = APIRouter(tags=["file"])


@router.get("/file-retrive/{file_id}", response_class=FileResponse)
async def read_file(file_id: int, db: Session = Depends(get_db)):
    db_file: FileModel | None = file_controler.get_file_by_id(db, file_id)
    if db_file is None:
        raise HTTPException(status_code=404, detail="no file with that id was found")
    # file = db_file.path
    # if file is None
    # error
    # this returns a binary chunk from reading file and its async
    # wow im so smart i read the source code and understood it
    # catch FileNotFoundError
    return db_file.path
