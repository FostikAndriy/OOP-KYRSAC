from models.order_model import Order
from models.order_item_model import OrderItem

from config.db import db


class OrderRepository:

    @staticmethod
    def get_all():

        return Order.query.all()
    
    @staticmethod
    def save():

        db.session.commit()
    
    @staticmethod
    def get_by_id(order_id):

        return Order.query.get(order_id)

    @staticmethod
    def create(user_id, items, total_price):

        order = Order(
            user_id=user_id,
            total_price=total_price
        )

        db.session.add(order)
        db.session.commit()

        for item in items:

            order_item = OrderItem(
                order_id=order.id,
                product_id=item['product_id'],
                quantity=item['quantity'],
                price=item['price']
            )

            db.session.add(order_item)

        db.session.commit()

        return order