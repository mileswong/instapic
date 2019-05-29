import pytest

from instapic.app import create_app
from instapic.models import db
from instapic.config import Config

@pytest.fixture
def app():
    app = create_app()
    app.config.from_object(Config)
    app.config['TESTING'] = True

    # clean up db items
    db.drop_all()
    from instapic.models import User, Post
    db.create_all()

    return app
