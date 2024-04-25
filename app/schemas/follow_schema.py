from pydantic import BaseModel


class Follow(BaseModel):
    profile_followed_id: int
    follower_profile_id: int

    class Config:
        from_attributes = True


class FollowProfileInfo(BaseModel):
    profile_followed_id: int
    follower_profile_id: int


class Follower(BaseModel):
    follower_profile_id: int


class Followed(BaseModel):
    profile_followed_id: int


class Test(BaseModel):
    followed_profiles_ids: list[int]
