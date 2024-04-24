from sqlalchemy import Boolean, Column, ForeignKey, Integer, String, LargeBinary
from sqlalchemy.orm import relationship


from dbConfig.database import Base


class Follow(Base):
    __tablename__ = "follows"
    # followed_user_id = Column(Integer, ForeignKey("users.id"), nullable=False)

    profile_followed_id = Column(Integer, ForeignKey("profiles.profile_id"), nullable=False, primary_key=True)
    follower_profile_id = Column(Integer, ForeignKey("profiles.profile_id"), nullable=False, primary_key=True)

    followed = relationship("Profile", foreign_keys=[profile_followed_id], uselist=False)
    follower = relationship("Profile", foreign_keys=[follower_profile_id], uselist=False)
