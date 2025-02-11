from typing import Annotated

from fastapi import Depends, HTTPException, Query, APIRouter, status
from sqlmodel import Field, Session, SQLModel, select, Relationship
from typing import Optional

from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm

from ..dependencies import get_session

SessionDep = Annotated[Session, Depends(get_session)]

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

router = APIRouter(
    prefix="/users",
    tags=["users"],
    responses={404: {"description": "Not found"}},
)

# The base model
class UserBase(SQLModel):
    user: str = Field(..., nullable=False)
    email: str = Field(..., nullable=False, unique=True, regex=r'^\S+@\S+\.\S+$')
    password: str = Field(..., nullable=False, min_length=5)

# Model for public visibility
class UserPublic(UserBase):
    id: int

# Model that has every parameter
class User(UserBase, table=True):
    __tablename__ = "user"
    id: Optional[int] = Field(default=None, primary_key=True)

    notes: list["Note"] = Relationship(back_populates="user", cascade_delete=True) #, cascade="all, delete-orphan"
    tag: list["Tag"] = Relationship(back_populates="user")
    
# Model used for creating
class UserCreate(UserBase):
    pass

# Model used for updating
class UserUpdate(SQLModel):
    user: Optional[str] = None
    email: Optional[str] = None
    password: Optional[str] = None

def fake_decode_token(token):
    return User(
        username=token + "fakedecoded", email="john@example.com", user="John Doe"
    )

async def get_current_user(token: Annotated[str, Depends(oauth2_scheme)]):
    user = fake_decode_token(token)
    return user

# POST users
@router.post("/", response_model=UserPublic)
def create_user(user: UserCreate, session: SessionDep):
    db_user = User.model_validate(user)
    session.add(db_user)
    session.commit()
    session.refresh(db_user)
    return db_user

# GET users
@router.get("/", response_model=list[UserPublic])
def read_users(
    session: SessionDep,
    offset: int = 0,
    limit: Annotated[int, Query(le=100)] = 100,
):
    users = session.exec(select(User).offset(offset).limit(limit)).all()
    return users

# GET current user
@router.get("/me", response_model=UserPublic)
def read_current_user(
    current_user: Annotated[User, Depends(get_current_user)],
    session: SessionDep,
):
    user = session.get(User, current_user.id)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user

# GET users by id
@router.get("/{userID}", response_model=UserPublic)
def read_user(userID: int, session: SessionDep):
    user = session.get(User, userID)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user

# UPDATE user by id
@router.patch("/{userID}", response_model=UserPublic)
def update_user(userID: int, user: UserUpdate, session: SessionDep):
    user_db = session.get(User, userID)
    if not user_db:
        raise HTTPException(status_code=404, detail="User not found")
    user_data = user.model_dump(exclude_unset=True)
    user_db.sqlmodel_update(user_data)
    session.add(user_db)
    session.commit()
    session.refresh(user_db)
    return user_db

# DELETE user by id
@router.delete("/{userID}")
def delete_user(userID: int, session: SessionDep):
    user = session.get(User, userID)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    session.delete(user)
    session.commit()
    return {"ok": True}