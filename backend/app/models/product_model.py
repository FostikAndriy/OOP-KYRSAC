from config.db import db

class Product(db.Model):
    __tablename__ = 'products'

    id = db.Column(db.Integer, primary_key=True)

    category_id = db.Column(
        db.Integer,
        db.ForeignKey('categories.id'),
        nullable=False
    )

    name = db.Column(
        db.String(150),
        nullable=False
    )

    brand = db.Column(db.String(100))

    price = db.Column(
        db.Numeric(10, 2),
        nullable=False
    )

    stock = db.Column(
        db.Integer,
        default=0
    )

    description = db.Column(db.Text)

    image_url = db.Column(db.String(255))

    order_items = db.relationship(
        'OrderItem',
        lazy=True
    )

    cart_items = db.relationship(
        'CartItem',
        backref='product',
        lazy=True
    )