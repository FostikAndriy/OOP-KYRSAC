from config.db import db

class Cart(db.Model):
    __tablename__ = 'carts'

    id = db.Column(db.Integer, primary_key=True)

    user_id = db.Column(
        db.Integer,
        db.ForeignKey('users.id'),
        unique=True,
        nullable=False
    )

    items = db.relationship(
        'CartItem',
        backref='cart',
        lazy=True,
        cascade='all, delete'
    )