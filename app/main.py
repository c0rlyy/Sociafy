from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from models import user_model, profile_model, post_model, file_model, follow_model, like_model, comment_model

from dbConfig.database import engine

user_model.Base.metadata.create_all(bind=engine)
profile_model.Base.metadata.create_all(bind=engine)
post_model.Base.metadata.create_all(bind=engine)
file_model.Base.metadata.create_all(bind=engine)
follow_model.Base.metadata.create_all(bind=engine)
like_model.Base.metadata.create_all(bind=engine)
comment_model.Base.metadata.create_all(bind=engine)

from routers import users, profiles, files, posts, auth, search, follow, like, comments

app = FastAPI()

app.include_router(users.router)
app.include_router(profiles.router)
app.include_router(files.router)
app.include_router(posts.router)
app.include_router(auth.router)
app.include_router(search.router)
app.include_router(follow.router)
app.include_router(like.router)
app.include_router(comments.router)


origins: list[str] = ["*"]  # i love CORS

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
