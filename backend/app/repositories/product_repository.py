from models.product_model import Product
from config.db import db

class ProductRepository:

    @staticmethod
    def get_all():
        return Product.query.all()

    @staticmethod
    def get_by_id(product_id):
        return Product.query.get(product_id)

    @staticmethod
    def create(data):
        product = Product(
            category_id=data['category_id'],
            name=data['name'],
            brand=data.get('brand'),
            price=data['price'],
            stock=data['stock'],
            description=data.get('description'),
            image_url=data.get('image_url')
        )

        db.session.add(product)
        db.session.commit()

        return product

    @staticmethod
    def update(product, data):

        product.name = data['name']
        product.brand = data['brand']
        product.price = data['price']
        product.stock = data['stock']
        product.description = data['description']
        product.image_url = data['image_url']

        db.session.commit()

        return product

    @staticmethod
    def delete(product):
        db.session.delete(product)
        db.session.commit()