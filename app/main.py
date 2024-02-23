from fastapi import Depends, FastAPI, HTTPException, Path, Header
from typing import Annotated
from sqlalchemy.orm import Session
from sqlalchemy import or_
from service.web_token import decode, encode


from controllers import user_controller, profile_controller

from models.user_model import User as UserModel
from models import user_model, profile_model
from schemas import user_schema, profile_schema, token_schema


from dbConfig.database import SessionLocal, engine

user_model.Base.metadata.create_all(bind=engine)
profile_model.Base.metadata.create_all(bind=engine)

app = FastAPI()


def get_db():
    db: Session = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@app.get("/users/me", response_model=token_schema.TokenGetUser)
async def read_user_me(token: Annotated[str, Header()]) -> dict[str, str]:
    try:
        user_info = decode(token)
    except Exception as e:
        raise HTTPException(status_code=401, detail=f"{e}")
    return user_info


@app.get("/users/", response_model=list[user_schema.UserOut])
def read_users(skip: int | None = 0, limit: int = 100, db: Session = Depends(get_db)):
    users = user_controller.get_users(db, skip=skip, limit=limit)
    return users


@app.get("/users/{user_id}", response_model=user_schema.User)
def read_user(user_id: Annotated[int, Path(..., title="The ID of the item to get")], db: Session = Depends(get_db)):
    db_user = user_controller.get_user(db, user_id=user_id)
    if db_user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return db_user


# this below is a respone model so how should the response look like, it automaticly filters what you want
@app.post("/users/", response_model=user_schema.UserOut | dict[str, str])
# this below me user is a request model
def create_user(user: user_schema.UserCreate, db: Session = Depends(get_db)):

    user_in_db = db.query(UserModel).filter(or_(UserModel.email == user.email, UserModel.user_name == user.user_name)).first()
    if user_in_db:
        # print(type(user_in_db.email))
        # print(type(user.email))
        # they are both string, i checked so i dont understand why pylance shows me an error
        if user_in_db.email == user.email:  # type: ignore
            raise HTTPException(status_code=400, detail="Email already exists, learn c not react")
        else:
            raise HTTPException(status_code=400, detail="Username already exists, LEARN C NOT REACT")

    created_user = user_controller.create_user(db=db, user=user)

    if created_user is None:
        raise HTTPException(status_code=500, detail="Failed in creating a User Try again")
    user_profile = profile_controller.create_user_profile(db=db, user_id=created_user.id)  # type: ignore
    token: str = encode({"user_id": created_user.id, "profile_id": created_user.profile.profile_id, "user_name": created_user.user_name})
    print(decode(token))
    return {"token": token}


@app.post("/login", response_model=dict[str, str] | user_schema.UserOut)
def log_in(user: user_schema.UserCredentials, db: Session = Depends(get_db)):
    token = user_controller.log_in(db, user=user)
    if token is None:
        raise HTTPException(status_code=401, detail="Wrong Password or email and yes i love react")
    return {"token": token}


@app.delete("/users/", response_model=dict[str, str])
def delete_user(user: user_schema.UserCredentials, token: Annotated[str, Header()], db: Session = Depends(get_db)) -> dict[str, str]:
    user_to_delete: bool = user_controller.deleting_user(db, user, token=token)
    if not user_to_delete:
        raise HTTPException(status_code=401, detail="Try Again, wrong credentials")
    return {"msg": "Sucesfully deleted the User"}


@app.put("/users/", response_model=user_schema.UserOut)
def update_user_model(user_credentials: user_schema.UserCredentials, user_data_update: user_schema.UserUpdate, db: Session = Depends(get_db)):
    pass
