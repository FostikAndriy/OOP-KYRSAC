from flask import jsonify, request

from services.order_service import OrderService

from utils.auth_middleware import (
    token_required,
    admin_required
)


class OrderController:

    @staticmethod
    @token_required
    def get_orders():

        orders = OrderService.get_orders()

        result = []

        for order in orders:

            items = []

            for item in order.items:

                items.append({
                    'product_id': item.product_id,
                    'product_name': item.product.name,
                    'quantity': item.quantity,
                    'price': float(item.price)
                })

            result.append({
                'id': order.id,
                'user_id': order.user_id,
                'status': order.status,
                'total_price': float(order.total_price),
                'items': items
            })

        return jsonify(result)

    @staticmethod
    @token_required
    def create_order():

        data = request.json

        user_id = request.user['id']

        items = data['items']

        total_price = data['total_price']

        order = OrderService.create_order(
            user_id,
            items,
            total_price
        )

        return jsonify({
            'message': 'Order created',
            'order_id': order.id
        }), 201

    @staticmethod
    @token_required
    @admin_required
    def update_status(order_id):

        order = OrderService.get_order(
            order_id
        )

        if not order:

            return jsonify({
                'message': 'Order not found'
            }), 404

        data = request.json

        status = data.get('status')

        OrderService.update_status(
            order,
            status
        )

        return jsonify({
            'message': 'Status updated'
        })