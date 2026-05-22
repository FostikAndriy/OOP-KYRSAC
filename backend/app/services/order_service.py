from repositories.order_repository import OrderRepository
from models.product_model import Product

from config.db import db
class OrderService:

    @staticmethod
    def get_orders():

        return OrderRepository.get_all()
    
    @staticmethod
    def get_order(order_id):

        return OrderRepository.get_by_id(
            order_id
        )

    @staticmethod
    def create_order(user_id, items, total_price):

        return OrderRepository.create(
            user_id,
            items,
            total_price
        )
        
    @staticmethod
    def update_status(order, status):

        order.status = status

        # COMPLETED → списання товару

        if (
            status == 'completed'
            and not order.stock_updated
        ):

            for item in order.items:

                product = Product.query.get(
                    item.product_id
                )

                if product:

                    product.stock -= item.quantity

            order.stock_updated = True

        # CANCELLED → повернення товару

        elif (
            status == 'cancelled'
            and order.stock_updated
        ):

            for item in order.items:

                product = Product.query.get(
                    item.product_id
                )

                if product:

                    product.stock += item.quantity

            order.stock_updated = False

        db.session.commit()