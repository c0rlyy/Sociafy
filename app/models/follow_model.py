from sqlalchemy import Boolean, Column, ForeignKey, Integer, String, LargeBinary
from sqlalchemy.orm import relationship


from dbConfig.database import Base


class Follow(Base):
    __tablename__ = "follows"

    follow_id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    user_name = Column(String, ForeignKey("users.user_name"), nullable=False)
    profile_id = Column(Integer, ForeignKey("profiles.id"), nullable=False)

    # user = relationship("User", back_populates="file", uselist=False)
