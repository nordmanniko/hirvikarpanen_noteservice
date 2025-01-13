from typing import Annotated

from fastapi import Depends, FastAPI, HTTPException, Query, APIRouter
from sqlmodel import Field, Session, SQLModel, create_engine, select

from ..dependencies import get_session

SessionDep = Annotated[Session, Depends(get_session)]

router = APIRouter(
    prefix="/tags",
    tags=["tags"],
    responses={404: {"description": "Not found"}},
)

# The base model
class TagBase(SQLModel):
    tag: str = Field(..., nullable=False)

# Model for public visibility
class TagPublic(TagBase):
    id: int

# Model that has every parameter
class Tag(TagBase, table=True):
    __tablename__ = "tag"
    id: int | None = Field(default=None, primary_key=True)

# Model used for creating
class TagCreate(TagBase):
    pass

# Model used for updating
class TagUpdate(SQLModel):
    tag: str | None = None

# POST tags
@router.post("/", response_model=TagPublic)
def create_tag(tag: TagCreate, session: SessionDep):
    db_tag = Tag.model_validate(tag)
    session.add(db_tag)
    session.commit()
    session.refresh(db_tag)
    return db_tag

# GET tags
@router.get("/", response_model=list[TagPublic])
def read_tags(
    session: SessionDep,
    offset: int = 0,
    limit: Annotated[int, Query(le=100)] = 100,
):
    tags = session.exec(select(Tag).offset(offset).limit(limit)).all()
    return tags

# GET tags by tagID
@router.get("/{tagID}", response_model=TagPublic)
def read_tag(tagID: int, session: SessionDep):
    tag = session.get(Tag, tagID)
    if not tag:
        raise HTTPException(status_code=404, detail="Tag not found")
    return tag

# UPDATE tag by tagID
@router.patch("/{tagID}", response_model=TagPublic)
def update_tag(tagID: int, tag: TagUpdate, session: SessionDep):
    tag_db = session.get(Tag, tagID)
    if not tag_db:
        raise HTTPException(status_code=404, detail="Tag not found")
    tag_data = tag.model_dump(exclude_unset=True)
    tag_db.sqlmodel_update(tag_data)
    session.add(tag_db)
    session.commit()
    session.refresh(tag_db)
    return tag_db

# DELETE tag by tagID
@router.delete("/{tagID}")
def delete_tag(tagID: int, session: SessionDep):
    tag = session.get(Tag, tagID)
    if not tag:
        raise HTTPException(status_code=404, detail="Tag not found")
    session.delete(tag)
    session.commit()
    return {"ok": True}