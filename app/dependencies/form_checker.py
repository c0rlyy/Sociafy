from fastapi import Form, HTTPException
from fastapi.encoders import jsonable_encoder
from pydantic import BaseModel, ValidationError
from schemas.post_schema import PostCreate


class Checker:
    def __init__(self, model: BaseModel):
        self.model: BaseModel = model

    def __call__(self, data: str = Form(...)):
        try:
            return self.model.model_validate_json(data)
        except ValidationError as e:
            raise HTTPException(
                detail=jsonable_encoder(e.errors()),
                status_code=422,
            )


def post_checker(data: str = Form(...)):
    try:
        return PostCreate.model_validate_json(data)
    except ValidationError as e:
        raise HTTPException(
            detail=jsonable_encoder(e.errors()),
            status_code=422,
        )
