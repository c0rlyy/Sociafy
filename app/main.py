from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from models import user_model, profile_model, post_model, file_model

from dbConfig.database import engine

user_model.Base.metadata.create_all(bind=engine)
profile_model.Base.metadata.create_all(bind=engine)
post_model.Base.metadata.create_all(bind=engine)
file_model.Base.metadata.create_all(bind=engine)

from routers import users, profiles, files, posts, auth

app = FastAPI()

app.include_router(users.router)
app.include_router(profiles.router)
app.include_router(files.router)
app.include_router(posts.router)
app.include_router(auth.router)

origins: list[str] = ["*"]  # i love CORS

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# @app.get("/users/me/items/")
# async def read_own_items(current_user: Annotated[Users, Depends(get_current_user)]):

#     return [{"item_id": "Foo", "owner": current_user.email}]
