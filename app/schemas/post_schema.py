from typing import Optional
from pydantic import BaseModel
from schemas.file_schema import FileOut

# from schemas import file_schema


class PostBase(BaseModel):
    post_title: str
    post_description: str | None = "congratulations you are using the best web app out there"

    class Config:
        from_attributes = True


class PostAllInfo(PostBase):
    post_id: int
    post_description: str | None
    profile_id: int
    user_id: int
    post_files: list[FileOut]

    class Config:
        from_attributes = True


class PostCreate(BaseModel):
    post_title: str
    post_description: str | None = "congratulations you are using the best web app out there"

    class Config:
        from_attributes = True


class Post(PostBase):
    pass
    # post_description: Optional[str] = "best web App i ever used"


class PostOut(Post):
    post_id: int


class PostCountLikes(BaseModel):
    post_likes_count: int
