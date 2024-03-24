from pydantic import BaseModel
from schemas.post_schema import PostAllInfo, PostOut


class ProfileBase(BaseModel):
    description: str | None = "i want my PHP lambo"

    class Config:
        from_attributes = True


class ProfileCreate(ProfileBase):
    pass


class ProfileOut(ProfileBase):
    profile_id: int
    user_id: int


class Profile(ProfileOut):
    profile_pic: str | None


class ProfileWithUser(ProfileBase):
    profile_id: int


class ProfileWithPost(ProfileOut):
    posts: list[PostAllInfo]
