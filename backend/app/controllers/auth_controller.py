from flask import request, jsonify

from services.auth_service import AuthService

class AuthController:

    @staticmethod
    def register():

        data = request.json

        user = AuthService.register(data)

        if not user:
            return jsonify({
                'message': 'User already exists'
            }), 400

        return jsonify({
            'message': 'User created successfully'
        }), 201

    @staticmethod
    def login():

        data = request.json

        result = AuthService.login(data)

        if not result:
            return jsonify({
                'message': 'Invalid credentials'
            }), 401

        return jsonify(result)