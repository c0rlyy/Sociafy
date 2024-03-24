from typing import Annotated

from fastapi import BackgroundTasks, Depends, FastAPI, HTTPException, Header, UploadFile, File
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware


from models import user_model, profile_model, post_model, file_model

from schemas import user_schema, profile_schema, token_schema, post_schema

from dependencies.user_dependency import get_current_user

from dbConfig.database import engine

user_model.Base.metadata.create_all(bind=engine)
profile_model.Base.metadata.create_all(bind=engine)
post_model.Base.metadata.create_all(bind=engine)
file_model.Base.metadata.create_all(bind=engine)
from routers import users, profiles, files, posts

app = FastAPI()
app.include_router(users.router)
app.include_router(profiles.router)
app.include_router(files.router)
app.include_router(posts.router)


origins: list[str] = ["*"]  # "http://localhost:5173" i love CORS

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

from fastapi import FastAPI, Depends, HTTPException
from fastapi.security import OAuth2PasswordBearer


# Create an instance of OAuth2PasswordBearer with the token URL
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")


# Define a route that requires authentication
@app.get("/users/mes")
async def read_users_me(current_user: Annotated[token_schema.TokenGetUser, Depends(get_current_user)]):
    # Token is the access token sent by the client
    # Here you would typically validate the token and extract user information
    # For demonstration purposes, we'll simply return the token
    return {"current_user": current_user}
