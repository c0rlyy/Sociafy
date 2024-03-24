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


router = APIRouter(tags=["profile"])


@router.get("/profile/{user_id}", response_model=profile_schema.ProfileWithUser)
def read_profile(user_id: int, db: Session = Depends(get_db)) -> user_controller.ProfileModel:
    user_profile: user_controller.ProfileModel | None = profile_controller.get_profile(db, user_id)
    if user_profile is None:
        raise HTTPException(status_code=404, detail="No profile was found try again")
    return user_profile


@router.get("/profile/{profile_id}/posts", response_model=profile_schema.ProfileWithPost)
def read_profile_and_posts(profile_id: int, db: Session = Depends(get_db)) -> ProfileModel:
    profile_with_posts: ProfileModel | None = profile_controller.get_profile_with_posts(db, profile_id)
    if profile_with_posts is None:
        raise HTTPException(status_code=404, detail="wrong id, try again")

    return profile_with_posts
