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

    def __repr__(self):
        return '<Post %r>' % self.title
