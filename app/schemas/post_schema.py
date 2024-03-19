from pydantic import BaseModel

# from schemas import file_schema


class PostBase(BaseModel):
    post_title: str
    post_description: str | None

    class Config:
        from_attributes = True


class PostAllInfo(PostBase):
    post_id: int
    post_description: str | None
    profile_id: int
    user_id: int

    class Config:
        from_attributes = True


class PostCreate(PostBase):
    post_description: str | None


class Post(PostBase):
    post_description: str | None


class PostOut(Post):
    post_id: int


# class PostWithFile(Post):
#     file: file_schema.FileAllInfo
