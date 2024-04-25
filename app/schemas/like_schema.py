from pydantic import BaseModel
from schemas.post_schema import PostAllInfo, PostOut
from schemas.file_schema import FileOut
from schemas.follow_schema import Follow, FollowProfileInfo, Followed, Follower


class Like(BaseModel):
    post_id: int
    profile_id: int
