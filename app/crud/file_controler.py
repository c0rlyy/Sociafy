from typing import List
from fastapi import UploadFile, File
from sqlalchemy.orm import Session
from sqlalchemy import or_, and_, update
from sqlalchemy.sql import text
from fastapi import HTTPException

from schemas.post_schema import PostCreate
from models.user_model import User as UserModel

from models.file_model import File as FileModel


def get_file_by_id(db: Session, file_id: int):
    db_file: FileModel | None = db.query(FileModel).filter(FileModel.file_id == file_id).first()
    return db_file


def get_post_files(db: Session, post_id: int) -> List[FileModel] | None:
    db_files: list[FileModel] | None = db.query(FileModel).filter(FileModel.post_id == post_id).all()
    return db_files


def get_all_user_files(db: Session, user_id: int) -> list[FileModel] | None:
    user_files: list[FileModel] | None = db.query(FileModel).filter(FileModel.user_id == user_id).all()
    return user_files


def upload_files(db: Session, current_user: UserModel, file_meta_data: list, post_id: int | None = None):
    files_uploaded = []
    for file_data in file_meta_data:
        db_file = FileModel(
            user_id=current_user.id,
            file_name=file_data["file_name"],
            path=file_data["path"],
            file_type=file_data["file_type"],
            post_id=post_id,
        )
        db.add(db_file)
        db.commit()
        files_uploaded.append(db_file)

    return files_uploaded
