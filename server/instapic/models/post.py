from sqlalchemy import desc

from instapic.models import db, Base


class Post(Base):
    __tablename__ = 'post'

    id = db.Column(db.Integer, primary_key=True)
    url = db.Column(db.String(128), nullable=False)
    description = db.Column(db.Text, nullable=False)

    user_id = db.Column(db.Integer,
                        db.ForeignKey('user.id'),
                        nullable=False)
    user = db.relationship('User',
                           backref=db.backref('posts', lazy=True))


    def __init__(self, url, description, user_id):
        self.url = url
        self.description = description
        self.user_id = user_id


    def serialize(self):
        return {
            "id": self.id,
            "url": self.url,
            "description": self.description,
            "created": self.created,
            "author": self.user.serialize()
        }


    @classmethod
    def get_all_posts(cls):
        return cls.query.order_by(desc(cls.created)).all()


    @classmethod
    def get_posts_by_user_id(cls, user_id):
        return cls.query.filter_by(user_id=user_id).order_by(desc(cls.created)).all()


    def __repr__(self):
        return '<Post %r>' % self.title
