from typing import Annotated

from fastapi import Depends, FastAPI, HTTPException, Query, APIRouter
from sqlmodel import Field, Session, SQLModel, select, Relationship
from typing import Optional

from ..dependencies import get_session

SessionDep = Annotated[Session, Depends(get_session)]

router = APIRouter(
    prefix="/notes",
    tags=["notes"],
    responses={404: {"description": "Not found"}},
)

# The base model
class NoteBase(SQLModel):
    note_h1: Optional[str] = Field(default=None)
    note: str = Field(..., nullable=False)
    img: Optional[str] = Field(default=None)
    date: Optional[str] = Field(default=None)
    tag_id: Optional[int] = Field(default=None, index=True)
    color_id: Optional[int] = Field(default=None, index=True)
    user_id: int = Field(index=True)

# Model for public visibility
class NotePublic(NoteBase):
    id: int

# Model that has every parameter
class Note(NoteBase, table=True):
    __tablename__ = "note"
    id: Optional[int] = Field(default=None, primary_key=True)
    tag_id: Optional[int] = Field(default=None, foreign_key="tag.id", index=True, ondelete="SET NULL")
    color_id: Optional[int] = Field(default=None, foreign_key="color.id", index=True, ondelete="SET NULL")
    user_id: int = Field(foreign_key="user.id", index=True, ondelete="CASCADE")#TÄYTYY OLLA OPTIONAL

    tag: Optional["Tag"] = Relationship(back_populates="notes")
    color: Optional["Color"] = Relationship(back_populates="notes")
    user: "User" = Relationship(back_populates="notes")

# Model used for creating
class NoteCreate(NoteBase):
    pass

# Model used for updating
class NoteUpdate(SQLModel):
    note_h1: Optional[str] = None
    note: Optional[str] = None
    img: Optional[str] = None
    date: Optional[str] = None
    tag_id: Optional[int] = None
    color_id: Optional[int] = None

# POST notes
@router.post("/", response_model=NotePublic)
def create_note(note: NoteCreate, session: SessionDep):
    db_note = Note.model_validate(note)
    session.add(db_note)
    session.commit()
    session.refresh(db_note)
    return db_note

# GET notes
@router.get("/", response_model=list[NotePublic])
def read_notes(
        session: SessionDep,
        offset: int = 0,
        limit: Annotated[int, Query(le=100)] = 100,
    ):
    notes = session.exec(select(Note).offset(offset).limit(limit)).all()
    return notes

# GET notes by id
@router.get("/{noteID}", response_model=NotePublic)
def read_note(noteID: int, session: SessionDep):
    note = session.get(Note, noteID)
    if not note:
        raise HTTPException(status_code=404, detail="Note not found")
    return note

# UPDATE note by id
@router.patch("/{noteID}", response_model=NotePublic)
def update_note(noteID: int, note: NoteUpdate, session: SessionDep):
    note_db = session.get(Note, noteID)
    if not note_db:
        raise HTTPException(status_code=404, detail="Note not found")
    note_data = note.model_dump(exclude_unset=True)
    note_db.sqlmodel_update(note_data)
    session.add(note_db)
    session.commit()
    session.refresh(note_db)
    return note_db

# DELETE note by id
@router.delete("/{noteID}")
def delete_note(noteID: int, session: SessionDep):
    note = session.get(Note, noteID)
    if not note:
        raise HTTPException(status_code=404, detail="Note not found")
    session.delete(note)
    session.commit()
    return {"ok": True}