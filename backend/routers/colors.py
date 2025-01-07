import sys
from typing import Annotated

from fastapi import Depends, FastAPI, HTTPException, Query, APIRouter
from sqlmodel import Field, Session, SQLModel, create_engine, select

from ..dependencies import get_session

SessionDep = Annotated[Session, Depends(get_session)]

router = APIRouter(
    prefix="/colors",
    tags=["colors"],
    responses={404: {"description": "Not found"}},
)

# The base model
class ColorBase(SQLModel):
    color: str = Field(..., nullable=False)

# Model for public visibility
class ColorPublic(ColorBase):
    id: int

# Model that has every parameter
class Color(ColorBase, table=True):
    __tablename__ = "color"
    id: int | None = Field(default=None, primary_key=True)

# Model used for creating
class ColorCreate(ColorBase):
    pass

# Model used for updating
class ColorUpdate(SQLModel):
    color: str | None = None

# POST colors
@router.post("/", response_model=ColorPublic)
def create_color(color: ColorCreate, session: SessionDep):
    db_color = Color.model_validate(color)
    session.add(db_color)
    session.commit()
    session.refresh(db_color)
    return db_color

# GET colors
@router.get("/", response_model=list[ColorPublic])
def read_colors(
    session: SessionDep,
    offset: int = 0,
    limit: Annotated[int, Query(le=100)] = 100,
):
    colors = session.exec(select(Color).offset(offset).limit(limit)).all()
    return colors

# GET colors by colorID
@router.get("/{colorID}", response_model=ColorPublic)
def read_color(colorID: int, session: SessionDep):
    color = session.get(Color, colorID)
    if not color:
        raise HTTPException(status_code=404, detail="Color not found")
    return color

# UPDATE color by colorID
@router.patch("/{colorID}", response_model=ColorPublic)
def update_color(colorID: int, color: ColorUpdate, session: SessionDep):
    color_db = session.get(Color, colorID)
    if not color_db:
        raise HTTPException(status_code=404, detail="Color not found")
    color_data = color.model_dump(exclude_unset=True)
    color_db.sqlmodel_update(color_data)
    session.add(color_db)
    session.commit()
    session.refresh(color_db)
    return color_db

# DELETE color by colorID
@router.delete("/{colorID}")
def delete_color(colorID: int, session: SessionDep):
    color = session.get(Color, colorID)
    if not color:
        raise HTTPException(status_code=404, detail="Color not found")
    session.delete(color)
    session.commit()
    return {"ok": True}