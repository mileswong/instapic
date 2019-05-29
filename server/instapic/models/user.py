from . import db, Base
from werkzeug.security import generate_password_hash, check_password_hash


class User(Base):
    __tablename__ = 'user'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(60), unique=True, nullable=False)
    password_hash = db.Column(db.String(128), nullable=False)


    def __init__(self, username, password):
        self.username = username
        self.password_hash = generate_password_hash(password)


    def serialize(self):
        return {
            "id": self.id,
            "username": self.username
        }


    def check_password(self, password):
        return check_password_hash(self.password_hash, password)


    @classmethod
    def get_by_username(cls, username):
        user = cls.query.filter_by(username=username).first()
        return user


    def __repr__(self):
        return '<User %r>' % self.username
