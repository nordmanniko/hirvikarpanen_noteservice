from typing import Annotated

# from typing import Union

from fastapi import Depends, FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .routers import notes, users, tags

from .dependencies import create_db_and_tables

app = FastAPI()

origins = [
    "http://localhost:8082",#Mahdollisesti vaihdettava
    "http://localhost",
    "http://localhost:",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(users.router)
app.include_router(notes.router)
app.include_router(tags.router)
# app.include_router(colors.router) colors poistettu nykyään vain value

@app.on_event("startup")
def on_startup():
    create_db_and_tables() # Skippaa jos on olemassa, drop database muutoksille
# if user.logged_in
    #@app.get("/notes/{user_id}") #parempi turvattu tapa hakea tähän user_idn perusteella huono hakea olisiko username hyvä?
# def read_item(item_id: int, q: Optional[str] = None):
#     return {"item_id": item_id, "q": q}