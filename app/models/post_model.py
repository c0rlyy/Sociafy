from sqlalchemy import Boolean, Column, ForeignKey, Integer, String, LargeBinary
from sqlalchemy.orm import relationship
from sqlalchemy.orm.relationships import Relationship


from dbConfig.database import Base


class Post(Base):
    __tablename__ = "posts"

    post_id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    profile_id = Column(Integer, ForeignKey("profiles.profile_id"))
    # file_id = Column(Integer, ForeignKey("files.file_id"))

    post_title = Column(String, nullable=False)
    post_description = Column(String)

    post_profile = relationship("Profile", back_populates="posts", uselist=False)
    post_files = relationship("File", back_populates="file_post", uselist=True, cascade="all, delete-orphan")

    post_user = relationship("User", foreign_keys=user_id, uselist=False)

    post_likes = relationship(
        "Like", back_populates="post", foreign_keys="[Like.post_id]", uselist=True, cascade="all, delete-orphan"
    )
