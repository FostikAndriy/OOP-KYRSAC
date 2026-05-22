from functools import wraps

from flask import request, jsonify

import jwt

SECRET_KEY = 'SUPER_SECRET_KEY'


def token_required(f):

    @wraps(f)
    def decorated(*args, **kwargs):

        token = None

        auth_header = request.headers.get('Authorization')

        if auth_header:

            try:
                token = auth_header.split(' ')[1]
            except:
                return jsonify({
                    'message': 'Invalid token format'
                }), 401

        if not token:
            return jsonify({
                'message': 'Token is missing'
            }), 401

        try:

            data = jwt.decode(
                token,
                SECRET_KEY,
                algorithms=['HS256']
            )

            request.user = data

        except jwt.ExpiredSignatureError:

            return jsonify({
                'message': 'Token expired'
            }), 401

        except jwt.InvalidTokenError:

            return jsonify({
                'message': 'Invalid token'
            }), 401

        return f(*args, **kwargs)

    return decorated


def admin_required(f):

    @wraps(f)
    def decorated(*args, **kwargs):

        user = request.user

        if user['role'] != 'admin':

            return jsonify({
                'message': 'Admin access required'
            }), 403

        return f(*args, **kwargs)

    return decorated