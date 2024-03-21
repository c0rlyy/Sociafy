from typing import Any, Generator
from sqlalchemy.orm import Session


from dbConfig.database import SessionLocal, engine


def get_db() -> Generator[Session, Any, None]:
    db: Session = SessionLocal()
    try:
        yield db
    finally:
        db.close()
