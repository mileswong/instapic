from flask_sqlalchemy import SQLAlchemy


db = SQLAlchemy()


from .base import Base
from .post import Post
from .user import User
