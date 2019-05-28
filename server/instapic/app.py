from flask import Flask
from flask_cors import CORS
from flask_migrate import Migrate

from instapic.config import Config
from instapic.models import db


def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)
    app.app_context().push()
    CORS(app)

    db.init_app(app)
    migrate = Migrate(app, db)

    from instapic.models import User, Post
    db.create_all()

    return app
