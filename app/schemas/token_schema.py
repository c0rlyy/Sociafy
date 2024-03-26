from pydantic import BaseModel


class TokenBase(BaseModel):
    class Config:
        from_attributes = True


class TokenGetUser(BaseModel):
    user_id: int
    profile_id: int
    user_name: str
    exp: int | float


class TokenResponse(BaseModel):
    access_token: str
    token_type: str


class TokenData(BaseModel):
    username: str | None = None
