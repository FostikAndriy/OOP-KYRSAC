from app import app
from config.db import db

from models.user_model import User
from models.category_model import Category
from models.product_model import Product
from models.order_model import Order
from models.order_item_model import OrderItem
from models.cart_model import Cart
from models.cart_item_model import CartItem

with app.app_context():
    db.create_all()
    print('Database created successfully!')