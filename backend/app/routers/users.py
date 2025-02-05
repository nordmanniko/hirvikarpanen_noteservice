from typing import Annotated
from ..dependencies import get_session

from fastapi import Depends, HTTPException, Query, APIRouter, status
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from pydantic import EmailStr
from sqlmodel import Field, Session, SQLModel, select, Relationship
from sqlalchemy.exc import IntegrityError
from typing import Optional

from passlib.context import CryptContext

SessionDep = Annotated[Session, Depends(get_session)]
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

router = APIRouter(
    prefix="/users",
    tags=["users"],
    responses={404: {"description": "Not found"}},
)

# The base model
class UserBase(SQLModel):
    user: str = Field(..., nullable=False)
    email: EmailStr = Field(..., nullable=False, unique=True)
    password: str = Field(..., nullable=False, min_length=5)

# Model for public visibility
class UserPublic(UserBase):
    id: int

# Model that has every parameter
class User(UserBase, table=True):
    __tablename__ = "user"
    id: Optional[int] = Field(default=None, primary_key=True)

    notes: list["Note"] = Relationship(back_populates="user", cascade_delete=True) #, cascade="all, delete-orphan"

# //! TEST
class TokenUser(SQLModel):
    user: User
    token: str

# Model used for creating
class UserCreate(UserBase):
    pass

class UserLogin(SQLModel):
    id: int
    token: str

# Model used for updating
class UserUpdate(SQLModel):
    user: Optional[str] = None
    email: Optional[str] = None
    password: Optional[str] = None 

# POST register user
@router.post("/register", response_model=TokenUser)
def register_user(user: UserCreate, session: SessionDep):
    try:
        db_user = User.model_validate(user)

        db_user.password = pwd_context.hash(db_user.password)

        session.add(db_user)
        session.commit()
        session.refresh(db_user)
        return {"user":db_user,"token":"heregoestoken"}
    except IntegrityError:
        session.rollback()
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=[{"type":"validation_error", "msg":"Email already in use"}],
            headers={"WWW-Authenticate": "Bearer"},
        )

# POST login user
@router.post("/login", response_model=UserLogin) # //TODO
def login_user(user: UserLogin, session: SessionDep):
    pass

# GET users
@router.get("/", response_model=list[UserPublic])
def read_users(
    session: SessionDep,
    offset: int = 0,
    limit: Annotated[int, Query(le=100)] = 100,
):
    users = session.exec(select(User).offset(offset).limit(limit)).all()
    return users

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