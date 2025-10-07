"""
Database Configuration and Session Management
Would use postgres or mongo in production.
"""

from contextlib import contextmanager
from typing import Generator
from sqlmodel import SQLModel, Session, create_engine

# db config
DATABASE_URL = "sqlite:///./restaurants.db"

# Create database engine
engine = create_engine(DATABASE_URL, echo=False)

def init_db() -> None:
    """
    Initialize database by creating all tables.
    """
    SQLModel.metadata.create_all(engine)

def get_session() -> Generator[Session, None, None]:
    """
    Provides a database session per request.
    """
    with Session(engine) as session:
        yield session

@contextmanager
def session_ctx() -> Generator[Session, None, None]:
    """
    Context manager for manual database session handling.
    """
    with Session(engine) as session:
        yield session
