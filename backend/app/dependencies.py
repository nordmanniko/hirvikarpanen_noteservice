from typing import Annotated

from sqlmodel import Session, create_engine, SQLModel

engine = create_engine("mysql+mysqldb://root:mypass123@localhost/hirvinotes")

def create_db_and_tables():
    SQLModel.metadata.create_all(engine)

def get_session():
    with Session(engine) as session:
        yield session