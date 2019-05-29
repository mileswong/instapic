from datetime import timedelta
import os


class Config(object):
    ENV = os.environ.get('FLASK_ENV', 'development')
    IS_DEV = ENV == 'development'

    SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL')
    SQLALCHEMY_TRACK_MODIFICATIONS = False

    JWT_SECRET_KEY = os.environ.get('JWT_SECRET_KEY', 'jwt-secret-string')
    JWT_TOKEN_LOCATION = ['cookies']
    JWT_COOKIE_SECURE = False
    JWT_COOKIE_CSRF_PROTECT = False
    JWT_ACCESS_TOKEN_EXPIRES = timedelta(1)
    JWT_REFRESH_TOKEN_EXPIRES = timedelta(30)

    UPLOAD_FOLDER = '/uploads'
    ALLOWED_EXTENSIONS = set(['png', 'jpg', 'jpeg', 'gif'])
    MAX_CONTENT_LENGTH = 5 * 1024 * 1024 # 5MB
