from fastapi import UploadFile, File
from sqlalchemy.orm import Session
from sqlalchemy import or_, and_, update
from sqlalchemy.sql import text
from fastapi import HTTPException

from schemas.post_schema import PostCreate

from models.file_model import File as FileModel


def get_post_files(db: Session, post_id: int):
    db_file: FileModel | None = db.query(FileModel).filter(FileModel.post_id == post_id).first()
    return db_file
