from fastapi import Depends, HTTPException, APIRouter
from fastapi.responses import FileResponse

from sqlalchemy.orm import Session

from controllers import file_controler

from models.file_model import File as FileModel


from dependencies.db import get_db

router = APIRouter(tags=["file"])


@router.get("/file-retrive/{file_id}", response_class=FileResponse)
async def read_file(file_id: int, db: Session = Depends(get_db)):
    db_file: FileModel | None = file_controler.get_file_by_id(db, file_id)
    if not db_file:
        raise HTTPException(status_code=404, detail="no file with that id was found")
    # file = db_file.path
    # if file is None
    # error
    # this returns a binary chunk from reading file and its async
    # wow im so smart i read the source code and understood it
    # catch FileNotFoundError
    # os.stat

    return db_file.path
