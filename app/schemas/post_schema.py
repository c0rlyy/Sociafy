from pydantic import BaseModel
from schemas import profile_schema


class PostBase(BaseModel):
    post_title: str

    class Config:
        from_attributes = True


class PostAllInfo(PostBase):
    id: int | None
    profile_id: int | None
    user_id: int | None
    post_description: str | None

    profile: profile_schema.ProfileOut


class Post(PostBase):
    profile_pic: str | None
