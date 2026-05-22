from flask import Blueprint

from controllers.order_controller import OrderController


order_bp = Blueprint(
    'order_bp',
    __name__
)

order_bp.route(
    '/orders',
    methods=['GET']
)(OrderController.get_orders)

order_bp.route(
    '/orders',
    methods=['POST']
)(OrderController.create_order)


order_bp.route(
    '/orders/<int:order_id>/status',
    methods=['PUT']
)(OrderController.update_status)