from typing import Annotated

from fastapi import Depends, HTTPException, Query, APIRouter
from sqlmodel import Field, Session, SQLModel, select, Relationship
from typing import Optional

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
    user_id: int = Field(index=True)
    
# Model for public visibility
class TagPublic(TagBase):
    id: int

# Model that has every parameter
class Tag(TagBase, table=True):
    __tablename__ = "tag"
    id: Optional[int] = Field(default=None, primary_key=True)
    user_id: int = Field(foreign_key="user.id", index=True, ondelete="CASCADE")

    notes: list["Note"] = Relationship(back_populates="tag")
    user: "User" = Relationship(back_populates="tag")

# Model used for creating
class TagCreate(TagBase):
    pass

# Model used for updating
class TagUpdate(SQLModel):
    tag: Optional[str] = None

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

# GET tags by user_id
@router.get("/user/{user_id}", response_model=list[TagPublic])
def read_tag(session: SessionDep, tagID: int = 1, offset: int = 0, limit: Annotated[int, Query(le=100)] = 100):
    logging.info(f"Fetching tags for tagID: {tagID}, offset: {offset}, limit: {limit}")
    start_time = time.time()
    try:
        tag = session.exec(select(Tag).where(Tag.id == tagID).offset(offset).limit(limit)).all()
        logging.info(f"Query executed in {time.time() - start_time} seconds")
        if not tag:
            raise HTTPException(status_code=404, detail="Tag not found")
        return tag
    except Exception as e:
        logging.error(f"Error fetching notes: {e}")
        raise HTTPException(status_code=500, detail="Internal Server Error")


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