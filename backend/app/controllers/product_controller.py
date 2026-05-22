from flask import jsonify, request
from flask import current_app

from services.product_service import ProductService

from utils.auth_middleware import (
    token_required,
    admin_required
)

import os

from werkzeug.utils import secure_filename


class ProductController:

    @staticmethod
    def get_all_products():

        products = ProductService.get_products()

        result = []

        for product in products:

            result.append({
                'id': product.id,
                'name': product.name,
                'brand': product.brand,
                'price': float(product.price),
                'stock': product.stock,
                'image_url': product.image_url,
                'category_id': product.category_id
            })

        return jsonify(result)

    @staticmethod
    def get_product(product_id):

        product = ProductService.get_product(product_id)

        if not product:

            return jsonify({
                'message': 'Product not found'
            }), 404

        return jsonify({
            'id': product.id,
            'name': product.name,
            'brand': product.brand,
            'price': float(product.price),
            'stock': product.stock,
            'description': product.description,
            'image_url': product.image_url
        })

    @staticmethod
    @token_required
    @admin_required
    def create_product():

        try:

            image = request.files['image']

            filename = secure_filename(
                image.filename
            )

            filepath = os.path.join(
                current_app.config['UPLOAD_FOLDER'],
                filename
            )

            image.save(filepath)

            data = {
                'category_id': request.form['category_id'],
                'name': request.form['name'],
                'brand': request.form['brand'],
                'price': request.form['price'],
                'stock': request.form['stock'],
                'description': request.form['description'],
                'image_url': f'/uploads/products/{filename}'
            }

            product = ProductService.create_product(
                data
            )

            return jsonify({
                'message': 'Product created',
                'id': product.id
            }), 201

        except Exception as e:

            return jsonify({
                'message': str(e)
            }), 500

    @staticmethod
    @token_required
    @admin_required
    def update_product(product_id):

        product = ProductService.get_product(
            product_id
        )

        if not product:

            return jsonify({
                'message': 'Product not found'
            }), 404

        data = request.json

        ProductService.update_product(
            product,
            data
        )

        return jsonify({
            'message': 'Product updated'
        })

    @staticmethod
    @token_required
    @admin_required
    def delete_product(product_id):

        product = ProductService.get_product(
            product_id
        )

        if not product:

            return jsonify({
                'message': 'Product not found'
            }), 404

        ProductService.delete_product(
            product
        )

        return jsonify({
            'message': 'Product deleted'
        })