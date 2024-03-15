from fastapi import Depends, FastAPI, HTTPException, Path, Header
from typing import Annotated
from sqlalchemy.orm import Session
from sqlalchemy import or_
from service.web_token import decode, encode
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware


from controllers import user_controller, profile_controller, post_controller

from models.user_model import User as UserModel
from models import user_model, profile_model, post_model
from schemas import user_schema, profile_schema, token_schema, post_schema
from models.post_model import Post as PostModel
from models.profile_model import Profile as ProfileModel


from dbConfig.database import SessionLocal, engine

user_model.Base.metadata.create_all(bind=engine)
profile_model.Base.metadata.create_all(bind=engine)
post_model.Base.metadata.create_all(bind=engine)

app = FastAPI()


def get_db():
    db: Session = SessionLocal()
    try:
        yield db
    finally:
        db.close()


origins: list[str] = ["*"]  # "http://localhost:5173" i love CORS

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/me/user", response_model=token_schema.TokenGetUser)
async def read_user_me(token: Annotated[str, Header()]) -> dict:
    try:
        user_info = decode(token)
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"{e}")
    return user_info


@app.get("/users/", response_model=list[user_schema.UserOut])
def read_users(skip: int | None = 0, limit: int = 100, db: Session = Depends(get_db)):
    users: list[UserModel] = user_controller.get_users(db, skip=skip, limit=limit)
    return users


@app.get("/users/{user_id}", response_model=user_schema.User)
def read_user(user_id: int, db: Session = Depends(get_db)):
    db_user = user_controller.get_user(db, user_id=user_id)
    if db_user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return db_user


# this below is a respone model so how should the response look like, it automaticly filters what you want
@app.post("/users/", response_model=user_schema.UserOut | dict[str, str])
# this below me user is a request model
def create_user_with_profile(user: user_schema.UserCreate, db: Session = Depends(get_db)) -> dict[str, str]:

    user_in_db = db.query(UserModel).filter(or_(UserModel.email == user.email, UserModel.user_name == user.user_name)).first()
    if user_in_db:  # not None
        # print(type(user_in_db.email))
        # print(type(user.email))
        # they are both string, i checked so i dont understand why pylance shows me an error
        if user_in_db.email == user.email:  # type: ignore
            raise HTTPException(status_code=400, detail="Email already exists, learn c not react")
        else:
            raise HTTPException(status_code=400, detail="Username already exists, LEARN C NOT REACT")

    created_user: UserModel | None = user_controller.create_user_and_profile(db=db, user=user)

    if created_user is None:
        raise HTTPException(status_code=500, detail="Failed in creating a User Try again")
    # user_profile = profile_controller.create_user_profile(db=db, user_id=created_user.id)  # type: ignore
    token: str = encode({"user_id": created_user.id, "profile_id": created_user.profile.profile_id, "user_name": created_user.user_name})
    return {"token": token}


@app.post("/login", response_model=dict[str, str] | user_schema.UserOut)
def log_in(user: user_schema.UserCredentials, db: Session = Depends(get_db)) -> dict[str, str]:
    token = user_controller.log_in(db, user=user)
    if token is None:
        raise HTTPException(status_code=401, detail="Wrong Password or email and yes i love react")
    return {"token": token}


@app.delete("/users/", response_model=dict[str, str])
def delete_user_with_profile(user: user_schema.UserCredentials, token: Annotated[str, Header()], db: Session = Depends(get_db)) -> dict[str, str]:
    user_to_delete: bool = user_controller.deleting_user(db, user, token=token)
    if not user_to_delete:
        raise HTTPException(status_code=401, detail="Try Again, wrong credentials")
    return {"msg": "Sucesfully deleted the User"}


@app.put("/users/", response_model=user_schema.UserOut)
def update_user_model(
    user_credentials: user_schema.UserCredentials,
    updated_user_data: user_schema.UserUpdate,
    token: Annotated[str, Header()],
    db: Session = Depends(get_db),
) -> UserModel:
    user_updated: UserModel | None = user_controller.update_user(db, user_credentials, updated_user_data, token)
    # i know its None if it wont update but i find it more readable this way
    # other way it reads if user_updated raise excetioon
    if user_updated is None:
        raise HTTPException(status_code=401, detail="incorrect Credentials")
    return user_updated


@app.get("/profile/{user_id}", response_model=profile_schema.ProfileWithUser)
def read_profile(user_id: int, db: Session = Depends(get_db)) -> user_controller.ProfileModel:
    user_profile: user_controller.ProfileModel | None = profile_controller.get_profile(db, user_id)
    if user_profile is None:
        raise HTTPException(status_code=404, detail="No profile was found try again")
    return user_profile


@app.get("/profile/{profile_id}/posts", response_model=profile_schema.ProfileWithPost)
def get_profile_and_posts(profile_id: int, db: Session = Depends(get_db)) -> ProfileModel:
    profile_with_posts: ProfileModel | None = profile_controller.get_profile_with_posts(db, profile_id)
    if profile_with_posts is None:
        raise HTTPException(status_code=404, detail="wrong id, try again")

    return profile_with_posts


@app.get("/me/posts", response_model=list[post_schema.PostAllInfo])
def read_posts_me(token: Annotated[str, Header()], skip: int | None = 0, limit: int = 100, db: Session = Depends(get_db)) -> list[PostModel]:
    user_me_posts: list[PostModel] | None = post_controller.get_current_user_posts(db, token=token, skip=skip, limit=limit)
    if user_me_posts is None:
        raise HTTPException(status_code=404, detail="no user posts were found")
    return user_me_posts


@app.post("/posts/", response_model=post_schema.PostBase)
def create_post(post_data: post_schema.PostCreate, token: Annotated[str, Header()], db: Session = Depends(get_db)) -> PostModel:
    new_post: PostModel | None = post_controller.create_post(db, post_data=post_data, token=token)
    if new_post is None:
        raise HTTPException(status_code=500, detail="failed adding the post")
    return new_post


@app.get("/posts", response_model=list[post_schema.PostAllInfo])
def read_posts(skip: int | None = 0, limit: int = 100, db: Session = Depends(get_db)) -> list[PostModel]:
    posts: list[PostModel] = post_controller.get_posts(skip=skip, limit=limit, db=db)
    return posts
