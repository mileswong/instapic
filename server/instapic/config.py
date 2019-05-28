from datetime import timedelta
import os


class Config(object):
    ENV = os.environ.get('FLASK_ENV', 'development')
    IS_DEV = ENV == 'development'

    SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL')
    SQLALCHEMY_TRACK_MODIFICATIONS = False
