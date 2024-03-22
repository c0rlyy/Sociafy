from pydantic import BaseModel


class FileAllInfo(BaseModel):
    file_id: int
    user_id: int
    file_name: str
    path: str
    file_type: str

    class Config:
        from_attributes = True


class FileBase(BaseModel):
    file_name: str
    path: str
    file_type: str


class FileCreate(FileBase):
    pass


class FileOut(BaseModel):
    path: str
    file_type: str
    file_id: int
