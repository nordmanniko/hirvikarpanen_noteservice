from typing import Annotated

# from typing import Union

from fastapi import Depends, FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .routers import notes, users, tags, colors

from .dependencies import create_db_and_tables

app = FastAPI()

origins = [
    "http://localhost",
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
app.include_router(colors.router)

@app.on_event("startup")
def on_startup():
    create_db_and_tables() # Skippaa jos on olemassa, drop database muutoksille

