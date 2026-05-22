from flask import jsonify, request

from services.category_service import CategoryService

from utils.auth_middleware import (
    token_required,
    admin_required
)


class CategoryController:

    @staticmethod
    def get_categories():

        categories = CategoryService.get_categories()

        result = []

        for category in categories:

            result.append({
                'id': category.id,
                'name': category.name,
                'description': category.description
            })

        return jsonify(result)

    @staticmethod
    @token_required
    @admin_required
    def create_category():

        data = request.json

        category = CategoryService.create_category(data)

        return jsonify({
            'message': 'Category created',
            'id': category.id
        }), 201

    @staticmethod
    @token_required
    @admin_required
    def delete_category(category_id):

        category = CategoryService.get_category(
            category_id
        )

        if not category:

            return jsonify({
                'message': 'Category not found'
            }), 404

        CategoryService.delete_category(
            category
        )

        return jsonify({
            'message': 'Category deleted'
        })