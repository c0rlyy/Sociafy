from pydantic import BaseModel
from schemas.profile_schema import ProfileOut,ProfileWithUserIn
from schemas.user_schema import UserOut


class Comment(BaseModel):
    post_id: int
    profile_id: int
    comment_content: str


class CreateComment(BaseModel):
    comment_content: str


class CommentWithProfile(Comment):
    profile: ProfileWithUserIn
