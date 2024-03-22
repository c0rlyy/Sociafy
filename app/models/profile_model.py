from sqlalchemy import Boolean, Column, ForeignKey, Integer, String, LargeBinary
from sqlalchemy.orm import relationship


from dbConfig.database import Base


class Profile(Base):
    __tablename__ = "profiles"

    profile_id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey("users.id"), unique=True)
    description = Column(String)
    profile_pic = Column(LargeBinary)

    user = relationship("User", back_populates="profile")
    posts = relationship("Post", back_populates="post_profile", cascade="all, delete-orphan")
