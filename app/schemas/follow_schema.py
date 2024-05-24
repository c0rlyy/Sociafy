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


class FollowedProfile(BaseModel):
    username: str
    user_id: int
    profile_description: str | None
    picture_id: str | None
    profile_id: int
    follower_id: int


class ListFollowedProfiles(BaseModel):
    followed: list[FollowedProfile]
