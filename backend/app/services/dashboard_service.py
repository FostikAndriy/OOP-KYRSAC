from models.product_model import Product
from models.category_model import Category
from models.order_model import Order


class DashboardService:

    @staticmethod
    def get_statistics():

        return {
            'products_count': Product.query.count(),
            'categories_count': Category.query.count(),
            'orders_count': Order.query.count()
        }