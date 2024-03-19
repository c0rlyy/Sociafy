from pydantic import BaseModel


class FileAllInfo(BaseModel):
    file_id: int
    user_id: int
    file_name: str
    path: str

    class Config:
        from_attributes = True
