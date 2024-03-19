from pydantic import BaseModel
from schemas.post_schema import PostAllInfo


class FileAllInfo(BaseModel):
    file_id: int
    user_id: int
    file_name: str
    path: str
    file_post: PostAllInfo
    file_type: str

    class Config:
        from_attributes = True


class FileBase(BaseModel):
    user_id: int
    file_name: str
    path: str
    file_type: str
