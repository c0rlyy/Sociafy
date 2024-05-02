from sqlalchemy import Boolean, Column, ForeignKey, Integer, String, LargeBinary
from sqlalchemy.orm import relationship


from dbConfig.database import Base


class Profile(Base):
    __tablename__ = "profiles"

    profile_id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey("users.id"), unique=True, nullable=False)
    description = Column(String)
    picture_id = Column(Integer, ForeignKey("files.file_id"), unique=True)

    user = relationship("User", back_populates="profile")
    posts = relationship("Post", back_populates="post_profile", cascade="all, delete-orphan")

    followers = relationship(
        "Follow",
        back_populates="followed",
        foreign_keys="[Follow.profile_followed_id]",
        cascade="all, delete-orphan",
        uselist=True,
    )
    follows = relationship(
        "Follow",
        back_populates="follower",
        foreign_keys="[Follow.follower_profile_id]",
        cascade="all, delete-orphan",
        uselist=True,
    )
    comments = relationship(
        "Comment",
        back_populates="profile",
        foreign_keys="[Comment.profile_id]",
        cascade="all, delete-orphan",
        uselist=True,
    )
    # followers = relationship("Follow", foreign_keys="[Follow.profile_followed_id]", cascade="all, delete-orphan", uselist=True)
    # follows = relationship("Follow", foreign_keys="[Follow.follower_profile_id]", cascade="all, delete-orphan", uselist=True)
