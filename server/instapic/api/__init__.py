from flask import jsonify
from jsonschema.exceptions import SchemaError, ValidationError

from instapic.api.user import user
from instapic.api.post import post


def register_error_handlers(app):
    def get_jsonschema_error_response(error):
        return jsonify({
            'message': 'INVALID_PAYLOAD'
        }), 500


    @app.errorhandler(SchemaError)
    def handle_params_schema_error(error):
        return get_jsonschema_error_response(error)


    @app.errorhandler(ValidationError)
    def handle_params_validation_error(error):
        return get_jsonschema_error_response(error)


    @app.errorhandler(Exception)
    def handle_internal_server_error(error):
        import logging
        logging.error(error)
        try:
            return jsonify({
                'message': error.description
            }), 500
        except:
            return jsonify({
                'message': 'Internal Server Errror'
            }), 500


    @app.errorhandler(404)
    def handle_not_found_error(error):
        return jsonify({
            'message': 'not found'
        }), 404


def register_auth_handlers(jwt):
    @jwt.unauthorized_loader
    def handle_unauthorized_response(callback):
        return jsonify({
            'message': 'Missing Authorization Header'
        }), 401
