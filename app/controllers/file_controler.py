from fastapi import UploadFile, File
from sqlalchemy.orm import Session
from sqlalchemy import or_, and_, update
from sqlalchemy.sql import text
from fastapi import HTTPException

from models.file_model import File as FileModel


def get_file(db: Session):
    return db.query(FileModel).all()


def upload_file(db: Session, token: str, post_id: int):
    pass
