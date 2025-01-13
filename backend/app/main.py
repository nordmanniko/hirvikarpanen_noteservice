from typing import Annotated

# from typing import Union
from pydantic import BaseModel

from fastapi import Depends, FastAPI, APIRouter
from .routers import notes, users, tags, colors
from pydantic import BaseModel

from .dependencies import create_db_and_tables

app = FastAPI()

router = APIRouter(
    prefix="/notes",
    tags=["notes"],
    responses={404: {"description": "Not found"}},
)

class Item(BaseModel):
    name: str
    price: float
    # is_offer: Union[bool, None] = None

app.include_router(users.router)
app.include_router(notes.router)
app.include_router(tags.router)
app.include_router(colors.router)

@app.on_event("startup")
def on_startup():
    create_db_and_tables()

