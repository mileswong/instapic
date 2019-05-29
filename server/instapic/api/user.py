from flask import Blueprint, request, jsonify, abort, Response
from flask_jwt_extended import (
    create_access_token,
    create_refresh_token,
    get_jwt_identity,
    jwt_refresh_token_required,
    set_access_cookies,
    set_refresh_cookies
)
from jsonschema import validate
from jsonschema.exceptions import ValidationError
from sqlalchemy.orm.exc import NoResultFound

from instapic.models import db, User, Post
from instapic.api.schemas.user import UserSchema


user = Blueprint('user', __name__)


def get_token_identity(user):
    return { "id": user.id, "username": user.username }


@user.route('users/signup', methods=['POST'])
def signup_user():
    """
    Signup new user
    """
    data = request.get_json()
    validate(instance=data, schema=UserSchema.Signup)

    username = data['username']
    user = User.get_by_username(username)

    if user is not None:
        abort(500, 'ERR_USERNAME_IS_USED')

    user = User.create(username=username, password=data['password'])

    response = jsonify({
        'user': user.serialize()
    })
    access_token = create_access_token(identity=get_token_identity(user))
    refresh_token = create_refresh_token(identity=get_token_identity(user))
    set_access_cookies(response, access_token)
    set_refresh_cookies(response, refresh_token)

    return response


@user.route('/users/login', methods=['POST'])
def login_user():
    """
    Login user
    """
    data = request.get_json()
    validate(instance=data, schema=UserSchema.Login)

    username = data['username']
    user = User.get_by_username(username)

    if user is None or user.check_password(data['password']) is False:
        abort(500, 'ERR_INVALID_USERNAME_OR_PASSWORD')

    response = jsonify({
        'user': user.serialize()
    })
    access_token = create_access_token(identity=get_token_identity(user))
    refresh_token = create_refresh_token(identity=get_token_identity(user))
    set_access_cookies(response, access_token)
    set_refresh_cookies(response, refresh_token)

    return response


@user.route('users/refresh', methods=['POST'])
@jwt_refresh_token_required
def refresh_user():
    """
    Refresh user token
    """
    identity = get_jwt_identity()
    user = User.get_by_username(identity.get('username'))

    if user is None:
        abort(500, 'ERR_INVALID_USER')

    access_token = create_access_token(identity=identity)
    response = jsonify(identity)
    set_access_cookies(response, access_token)
    return response, 200


@user.route('/users/<int:user_id>/posts', methods=['GET'])
def get_user_posts(user_id):
    """
    Retrieve list of posts of the user
    """
    posts = Post.get_posts_by_user_id(user_id)

    return jsonify({
        'posts': [post.serialize() for post in posts]
    })
