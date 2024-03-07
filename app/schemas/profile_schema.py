from pydantic import BaseModel


def import_post_base():
    from schemas.post_schema import PostBase

    return PostBase


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


class ProfileWithPost(ProfileOut):
    posts: list[import_post_base()]  # type: ignore
