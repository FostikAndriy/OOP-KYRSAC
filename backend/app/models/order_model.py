from config.db import db


class Order(db.Model):

    __tablename__ = 'orders'

    id = db.Column(
        db.Integer,
        primary_key=True
    )

    user_id = db.Column(
        db.Integer,
        db.ForeignKey('users.id'),
        nullable=False
    )

    status = db.Column(
        db.Enum(
            'new',
            'processing',
            'shipped',
            'completed',
            'cancelled'
        ),
        default='new'
    )

    total_price = db.Column(
        db.Numeric(10, 2),
        nullable=False
    )

    created_at = db.Column(
        db.DateTime,
        server_default=db.func.now()
    )

    stock_updated = db.Column(
        db.Boolean,
        default=False
    )

    items = db.relationship(
        'OrderItem',
        backref='order',
        lazy=True,
        cascade='all, delete'
    )