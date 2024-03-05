from pydantic import BaseModel
from schemas import profile_schema


class UserBase(BaseModel):
    email: str


class UserCreate(UserBase):
    password: str
    user_name: str


class User(UserBase):
    id: int
    # is_active: bool
    user_name: str
    password: str
    profile: profile_schema.ProfileOut

    class Config:
        from_attributes = True


class UserOut(UserBase):
    user_name: str
    id: int
    # is_active: bool
    profile: profile_schema.ProfileOut

    class Config:
        from_attributes = True


class UserCredentials(UserBase):
    password: str


class UserUpdate(BaseModel):
    email: str | None
    password: str | None
    user_name: str | None
