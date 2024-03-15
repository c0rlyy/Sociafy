from pydantic import BaseModel


class PostBase(BaseModel):
    post_title: str

    class Config:
        from_attributes = True


class PostAllInfo(PostBase):
    id: int
    post_description: str | None
    profile_id: int
    user_id: int

    class Config:
        from_attributes = True


class PostCreate(PostBase):
    post_description: str | None = None


class Post(PostBase):
    post_description: str | None


class PostOut(Post):
    id: int
