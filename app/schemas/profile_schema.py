from pydantic import BaseModel
from schemas.post_schema import PostAllInfo, PostOut
from schemas.file_schema import FileOut
from schemas.follow_schema import Follow, FollowProfileInfo, Followed, Follower


class ProfileBase(BaseModel):
    description: str | None = "i want my PHP lambo"

    class Config:
        from_attributes = True


class ProfileCreate(ProfileBase):
    pass


class ProfileOut(ProfileBase):
    profile_id: int


class Profile(ProfileOut):
    picture_id: int | None


class ProfileWithUser(ProfileBase):
    profile_id: int


class ProfileWithPost(ProfileOut):
    posts: list[PostAllInfo]


class ProfileWithFollows(ProfileOut):
    follows: list[Followed]
    followers: list[Follower]


class ProfileAllInfo(ProfileWithFollows):
    picture_id: int | None
    user_id: int
    posts: list[PostAllInfo]


class ProfileFollowed(ProfileOut):
    picture_id: int | None
    follows: list[Followed]
