from pydantic import BaseModel


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
