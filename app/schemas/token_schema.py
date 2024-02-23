from pydantic import BaseModel
from schemas import profile_schema


class TokenBase(BaseModel):
    class Config:
        from_attributes = True


class TokenGetUser(BaseModel):
    user_id: int
    profile_id: int
    user_name: str
    exp: int | float
