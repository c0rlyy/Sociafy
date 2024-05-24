from typing import Annotated
from fastapi import Depends, HTTPException, APIRouter

from sqlalchemy.orm import Session
from fastapi import BackgroundTasks, Depends, HTTPException, Header, UploadFile, File, APIRouter


from crud import file_crud, profile_crud
from crud import user_crud

from models.profile_model import Profile as ProfileModel
from models.file_model import File as FileModel
from models.user_model import User as UserModel
from dependencies.user_dependency import get_current_user

from schemas import profile_schema

from dependencies.db import get_db
from service.file_utils import FileProccesor


router = APIRouter(tags=["profile"])


@router.get("/api/v1/profile/{profile_id}", response_model=profile_schema.ProfileWithUser)
def read_profile(profile_id: int, db: Session = Depends(get_db)) -> user_crud.ProfileModel:
    user_profile: user_crud.ProfileModel | None = profile_crud.get_profile(db, profile_id)
    if user_profile is None:
        raise HTTPException(status_code=404, detail="No profile was found try again")
    return user_profile


@router.get("/api/v1/profile/{profile_id}/posts", response_model=profile_schema.ProfileWithPost)
def read_profile_and_posts(profile_id: int, db: Session = Depends(get_db)) -> ProfileModel:
    profile_with_posts: ProfileModel | None = profile_crud.get_profile_with_posts(db, profile_id)

    if profile_with_posts is None:
        raise HTTPException(status_code=404, detail="wrong id, try again")

    return profile_with_posts


@router.patch("/api/v1/profile/add-profile-pic")
async def add_profile_pic(
    current_user: Annotated[UserModel, Depends(get_current_user)],
    profile_pic: Annotated[list[UploadFile], File(description="photo sent from FORM object in js")],
    db: Session = Depends(get_db),
):

    if len(profile_pic) > 1:
        raise HTTPException(status_code=400, detail="to many files, max allowed is 1")

    file_processor = FileProccesor(profile_pic)
    file_meta_data: list[dict[str, str]] = await file_processor.process_and_validate_all_files()
    db_file: list[FileModel] = file_crud.upload_files(db, current_user, file_meta_data)

    if len(db_file) == 0:
        raise HTTPException(status_code=500, detail="error while trying to add picture try again")

    profile_pic_data: FileModel = db_file[0]

    db.query(ProfileModel).filter(ProfileModel.user_id == current_user.id).update(
        {"picture_id": profile_pic_data.file_id}
    )
    db.commit()
    return {"message": "Profile picture updated successfully.", "profile": current_user.profile}


@router.patch("/api/v1/profile/profile-description", response_model=profile_schema.ProfileOut)
def update_profile_description(
    req_data: profile_schema.ChangeDescription,
    current_user: Annotated[UserModel, Depends(get_current_user)],
    db: Session = Depends(get_db),
) -> ProfileModel:

    profile: ProfileModel = profile_crud.update_profile_desc(db, current_user, req_data)
    return profile
