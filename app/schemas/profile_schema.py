from pydantic import BaseModel
from schemas.post_schema import PostAllInfo, PostOut
from schemas.file_schema import FileOut


class ProfileBase(BaseModel):
    description: str | None = "i want my PHP lambo"

    class Config:
        from_attributes = True


class ProfileCreate(ProfileBase):
    pass


class ProfileOut(ProfileBase):
    profile_id: int


class Profile(ProfileOut):
    picture_id: int | None


class ProfileWithUser(ProfileBase):
    profile_id: int


class ProfileWithPost(ProfileOut):
    posts: list[PostAllInfo]
