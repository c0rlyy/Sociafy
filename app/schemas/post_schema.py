from pydantic import BaseModel
from schemas import profile_schema


class PostBase(BaseModel):
    post_title: str

    class Config:
        from_attributes = True


class PostAllInfo(PostBase):
    id: int
    profile_id: int
    user_id: int
    post_description: str | None

    post_profile: profile_schema.ProfileOut

    class Config:
        from_attributes = True


class Post(PostBase):
    post_description: str | None


class PostOut(Post):
    id: int
    post_profile: profile_schema.ProfileOut
