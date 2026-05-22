from flask import Blueprint

from controllers.auth_controller import AuthController

auth_bp = Blueprint(
    'auth_bp',
    __name__
)

auth_bp.route(
    '/auth/register',
    methods=['POST']
)(AuthController.register)

auth_bp.route(
    '/auth/login',
    methods=['POST']
)(AuthController.login)