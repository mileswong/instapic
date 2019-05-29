from flask import Flask
from flask_cors import CORS
from flask_migrate import Migrate
from flask_jwt_extended import JWTManager

from instapic.config import Config
from instapic.models import db

from instapic.api import (
    user,
    post,
    register_error_handlers,
    register_auth_handlers
)

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)
    app.app_context().push()
    CORS(app, supports_credentials=True)

    db.init_app(app)
    migrate = Migrate(app, db)

    from instapic.models import User, Post
    db.create_all()

    jwt = JWTManager(app)

    register_error_handlers(app)
    register_auth_handlers(jwt)

    app.register_blueprint(user, url_prefix='/v1')
    app.register_blueprint(post, url_prefix='/v1')

    return app
