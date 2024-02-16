from fastapi import Depends, FastAPI, HTTPException
from sqlalchemy.orm import Session
from sqlalchemy import or_


from controllers import user_controller, profile_controller

from models.user_model import User as UserModel
from models import user_model, profile_model
from schemas import user_schema, profile_schema


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


@app.get("/users/", response_model=list[user_schema.UserOut])
def read_users(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    users = user_controller.get_users(db, skip=skip, limit=limit)
    return users


@app.get("/users/{user_id}", response_model=user_schema.User)
def read_user(user_id: int, db: Session = Depends(get_db)):
    db_user = user_controller.get_user(db, user_id=user_id)
    if db_user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return db_user


# this below is a respone model so how should the response look like, it automaticly filters what you want
@app.post("/users/", response_model=user_schema.UserOut)
# this below me user is a request model
def create_user(user: user_schema.UserCreate, profile: profile_schema.ProfileCreate, db: Session = Depends(get_db)):

    user_in_db = db.query(UserModel).filter(or_(UserModel.email == user.email, UserModel.user_name == user.user_name)).first()
    if user_in_db:
        # print(type(user_in_db.email))
        # print(type(user.email))
        ##they are both string, i checked so i dont understand why pylance shows me an error
        if user_in_db.email == user.email:  # type: ignore
            raise HTTPException(status_code=400, detail="Email already exists, learn c not react")
        else:
            raise HTTPException(status_code=400, detail="Username already exists, LEARN C NOT REACT")

    created_user = user_controller.create_user(db=db, user=user)
    user_profile = profile_controller.create_user_profile(db=db, profile=profile, user_id=created_user.id)  # type: ignore
    return created_user


@app.post("/login", response_model=user_schema.UserOut)
def log_in(user: user_schema.UserCredentials, db: Session = Depends(get_db)):
    db_user = user_controller.log_in(db, user=user)
    if db_user is None:
        raise HTTPException(status_code=401, detail="Wrong Password or email and yes i love react")
    return db_user


@app.put("/users/", response_model=dict[str, str])
def del_user(user: user_schema.UserCredentials, db: Session = Depends(get_db)):
    user_to_delete = user_controller.delete_user(db, user)
    if user_to_delete is None:
        raise HTTPException(status_code=401, detail="Wrong Password or email, is next.js really the future?")
    return {"message": "user was Succsesfully deleted just like like my hopes for future afer WSIZ"}
