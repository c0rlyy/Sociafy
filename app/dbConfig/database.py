from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from sqlalchemy import event

SQLALCHEMY_DATABASE_URL = "sqlite:///../db/app.db"


engine = create_engine(SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False})


# necessary for enforcing key constrains
def _fk_pragma_on_connect(dbapi_con, con_record):
    dbapi_con.execute("pragma foreign_keys=ON")


event.listen(engine, "connect", _fk_pragma_on_connect)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)


Base = declarative_base()
