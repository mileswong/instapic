from datetime import datetime

from . import db


class Base(db.Model):
    __abstract__ = True

    created = db.Column(db.DateTime, default=datetime.utcnow, nullable=False)
    updated = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow, nullable=False)
