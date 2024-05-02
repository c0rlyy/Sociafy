from sqlalchemy import Boolean, Column, ForeignKey, Integer, String, LargeBinary
from sqlalchemy.orm import relationship


from dbConfig.database import Base


class Comment(Base):
    __tablename__ = "comments"

    comment_id = Column(Integer, primary_key=True)

    post_id = Column(Integer, ForeignKey("posts.post_id"), nullable=False)
    profile_id = Column(Integer, ForeignKey("profiles.profile_id"), nullable=False)
    comment_content = Column(String, nullable=False)

    profile = relationship("Profile", foreign_keys=[profile_id], uselist=False)
    # user = relationship("User", foreign_keys="User.id", uselist=False)
