from pydantic import BaseModel
from schemas.post_schema import PostAllInfo, PostOut


# circullar dependency error fix
# def import_post_base():
#     from schemas.post_schema import Post

#     return Post


class ProfileBase(BaseModel):
    description: str | None = None

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
