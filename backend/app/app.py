from flask import Flask, send_from_directory
from flask_cors import CORS
from dotenv import load_dotenv
import os

from config.db import db

from routes.product_routes import product_bp
from routes.auth_routes import auth_bp

# IMPORT ALL MODELS
from models.user_model import User
from models.category_model import Category
from models.product_model import Product
from models.order_model import Order
from models.order_item_model import OrderItem
from models.cart_model import Cart
from models.cart_item_model import CartItem
from routes.category_routes import category_bp 
from routes.order_routes import order_bp
from routes.dashboard_routes import dashboard_bp


load_dotenv()



app = Flask(__name__)

UPLOAD_FOLDER = '../uploads/products'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

CORS(app)

app.config['SQLALCHEMY_DATABASE_URI'] = (
    f"mysql+pymysql://{os.getenv('DB_USER')}:"
    f"{os.getenv('DB_PASSWORD')}@"
    f"{os.getenv('DB_HOST')}/"
    f"{os.getenv('DB_NAME')}"
)

app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db.init_app(app)

app.register_blueprint(product_bp)
app.register_blueprint(auth_bp)
app.register_blueprint(category_bp)
app.register_blueprint(order_bp)
app.register_blueprint(dashboard_bp)



@app.route('/')
def home():
    return {
        'message': 'PC Store API is running'
    }

@app.route('/uploads/products/<filename>')
def uploaded_file(filename):

    return send_from_directory(
        app.config['UPLOAD_FOLDER'],
        filename
    )


if __name__ == '__main__':
    app.run(debug=True)