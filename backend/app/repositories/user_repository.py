from models.user_model import User
from config.db import db


class UserRepository:

    @staticmethod
    def get_by_email(email):

        return User.query.filter_by(
            email=email
        ).first()

    @staticmethod
    def create(data):

        user = User(
            full_name=data['full_name'],
            email=data['email'],
            password=data['password'],
            role=data.get('role', 'manager')
        )

        db.session.add(user)
        db.session.commit()

        return user