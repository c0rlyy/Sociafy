from sqlalchemy import Boolean, Column, ForeignKey, Integer, String, LargeBinary
from sqlalchemy.orm import relationship


from dbConfig.database import Base


class File(Base):
    __tablename__ = "files"

    file_id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    post_id = Column(Integer, ForeignKey("posts.post_id"), nullable=False)
    file_name = Column(String, nullable=False, unique=True)
    path = Column(String, nullable=False)
    file_type = Column(String, nullable=False)

    file_post = relationship("Post", back_populates="post_files", uselist=False)
