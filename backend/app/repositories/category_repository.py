from models.category_model import Category

from config.db import db


class CategoryRepository:

    @staticmethod
    def get_all():

        return Category.query.all()

    @staticmethod
    def get_by_id(category_id):

        return Category.query.get(
            category_id
        )

    @staticmethod
    def create(data):

        category = Category(
            name=data['name'],
            description=data.get(
                'description'
            )
        )

        db.session.add(category)

        db.session.commit()

        return category

    @staticmethod
    def delete(category):

        db.session.delete(category)

        db.session.commit()