from sqlalchemy import Boolean, Column, ForeignKey, Integer, String, LargeBinary
from sqlalchemy.orm import relationship


from dbConfig.database import Base


class Post(Base):
    __tablename__ = "posts"

    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    post_title = Column(String, nullable=False)
    post_description = Column(String)
    profile_id = Column(Integer, ForeignKey("profiles.profile_id"))

    post_profile = relationship("Profile", back_populates="posts")
