from sqlalchemy import Boolean, Column, ForeignKey, Integer, String, LargeBinary
from sqlalchemy.orm import relationship


from dbConfig.database import Base


class Like(Base):
    __tablename__ = "likes"

    post_id = Column(Integer, ForeignKey("posts.post_id"), nullable=False, primary_key=True)
    profile_id = Column(Integer, ForeignKey("profiles.profile_id"), nullable=False, primary_key=True)

    post = relationship("Post", foreign_keys=[post_id], uselist=False)
    profile = relationship("Profile", foreign_keys=[profile_id], uselist=False)
