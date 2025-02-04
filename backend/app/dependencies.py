from typing import Annotated
from sqlmodel import Session, create_engine, SQLModel

import os
from dotenv import load_dotenv

engine = create_engine("mysql+mysqldb://root:mypass123@localhost/hirvinotes")
load_dotenv()

key = os.getenv('SECRET_KEY')
algo = os.getenv('ALGORITHM')
exp = os.getenv('ACCESS_TOKEN_EXPIRE_MINUTES')

def create_db_and_tables():
    SQLModel.metadata.create_all(engine)

def get_session():
    with Session(engine) as session:
        yield session

def get_env(method):
    if method == "key":
        return key
    elif method == "algo":
        return algo
    elif method == "exp":
        return exp