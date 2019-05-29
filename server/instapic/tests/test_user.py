import pytest
import logging
import json

from instapic.models import db, User
from instapic.config import Config

from flask_jwt_extended import (
    create_access_token,
    create_refresh_token,
)

def get_test_client(app):
    return app.test_client()


def post_client(client, url, data=None, headers=None):
    return client.post(url,
                       data=json.dumps(data),
                       content_type='application/json',
                       headers=headers)


def signup_user(client, username, password):
    return post_client(client=client,
                       url='/v1/users/signup',
                       data=dict(username=username,
                                 password=password))

def login_user(client, username, password):
    return post_client(client=client,
                       url='/v1/users/login',
                       data=dict(username=username,
                                 password=password))

def refresh_user(client, headers):
    return post_client(client=client,
                       url='v1/users/refresh',
                       headers=headers)


def test_user(app):
    client = get_test_client(app)

    username = 'Edwin'
    password = '123456'

    # First signup
    res = signup_user(client, username, password)
    user = json.loads(res.data)['user']
    user_id = user['id']
    assert user['username'] == username

    # Attempt to signup with the same username
    res = signup_user(client, username, password)
    message = json.loads(res.data)['message']
    assert message == 'ERR_USERNAME_IS_USED'

    # Attempt to signup with invalid type
    res = signup_user(client, username, 500)
    message = json.loads(res.data)['message']
    assert message == 'INVALID_PAYLOAD'

    # Successfully login with the same credentials
    res = login_user(client, username, password)
    user = json.loads(res.data)['user']
    assert user['id'] == user_id
    assert user['username'] == username

    # Attempt to login with incorrect password
    res = login_user(client, username, 'i_am_a_wrong_password')
    message = json.loads(res.data)['message']
    assert message == 'ERR_INVALID_USERNAME_OR_PASSWORD'

    # Successfully refresh user token
    identity = { "id": user_id, "username": "Edwin" }
    refresh_token = create_refresh_token(identity=identity)
    access_token = create_access_token(identity=identity)
    headers = {
        'Authorization': 'Bearer {}'.format(refresh_token)
    }
    res = refresh_user(client, headers)
    assert user_id == json.loads(res.data)['id']
    assert username == json.loads(res.data)['username']

    # Successfully get user post of empty list
    res = client.get('v1/users/{user_id}/posts'.format(user_id=user_id))
    posts = json.loads(res.data)['posts']
    assert len(posts) == 0

    # No posts in db
    res = app.test_client().get('/v1/posts')
    posts = json.loads(res.data)['posts']
    assert len(posts) == 0
