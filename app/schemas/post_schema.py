from typing import Optional
from pydantic import BaseModel

# from schemas import file_schema


class PostBase(BaseModel):
    post_title: str
    post_description: str | None = "best web app ever really"

    class Config:
        from_attributes = True


class PostAllInfo(PostBase):
    post_id: int
    post_description: str | None
    profile_id: int
    user_id: int

    class Config:
        from_attributes = True


class PostCreate(PostBase):
    pass


class Post(PostBase):
    post_description: Optional[str] = "best web App i ever used"


class PostOut(Post):
    post_id: int
