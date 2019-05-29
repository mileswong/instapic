import os
import uuid
import shutil

from flask import Blueprint, request, jsonify, current_app, send_from_directory, abort
from werkzeug.utils import secure_filename
from flask_jwt_extended import (
    get_jwt_identity,
    jwt_required
)
import magic

from instapic.models import Post
from instapic.utils.aws import S3


post = Blueprint('post', __name__)


VALID_MIMETYPES = ['image/jpeg', 'image/png', 'image/jpg']
def get_file_extension(path):
    mimetype = magic.from_file(path, mime=True)
    if mimetype in set(VALID_MIMETYPES):
        return mimetype.split('/')[1]
    return None


@post.route('/posts', methods=['GET'])
def get_all_posts():
    posts = Post.get_all_posts()

    return jsonify({
        'posts': [post.serialize() for post in posts]
    })


@post.route('/posts', methods=['POST'])
@jwt_required
def add_post():
    identity = get_jwt_identity()

    user_id = identity.get('id')
    if user_id != int(request.form['userId']):
        abort(500, 'INVALID_OPERATION')


    file = request.files['file']
    temp_path = '/tmp/{filename}'.format(filename=file.filename)
    file.save(temp_path)
    extension = get_file_extension(temp_path)
    if not (file and extension):
        abort(500, 'INVALID_IMAGE_FILE')

    filename = '{filename}.{ext}'.format(filename=uuid.uuid4().hex, ext=extension)
    s3_url = S3().upload_file(Bucket=os.environ.get('S3_BUCKET'),
                              Key=filename,
                              Filename=temp_path)

    post = Post.create(url=s3_url, description=request.form['description'], user_id=user_id)

    return jsonify({
        'post': post.serialize()
    })
