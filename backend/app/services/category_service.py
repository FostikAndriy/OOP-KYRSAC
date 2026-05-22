from repositories.category_repository import (
    CategoryRepository
)


class CategoryService:

    @staticmethod
    def get_categories():

        return CategoryRepository.get_all()

    @staticmethod
    def get_category(category_id):

        return CategoryRepository.get_by_id(
            category_id
        )

    @staticmethod
    def create_category(data):

        return CategoryRepository.create(data)

    @staticmethod
    def delete_category(category):

        CategoryRepository.delete(category)