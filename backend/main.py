from typing import Annotated

from fastapi import Depends, FastAPI
from .routers import notes, users , tags, colors

from .dependencies import create_db_and_tables

app = FastAPI()

app.include_router(users.router)
app.include_router(notes.router)
app.include_router(tags.router)
app.include_router(colors.router)

@app.on_event("startup")
def on_startup():
    create_db_and_tables()