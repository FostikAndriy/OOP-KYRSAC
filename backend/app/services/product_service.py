from repositories.product_repository import ProductRepository

class ProductService:

    @staticmethod
    def get_products():
        return ProductRepository.get_all()

    @staticmethod
    def get_product(product_id):
        return ProductRepository.get_by_id(product_id)

    @staticmethod
    def create_product(data):
        return ProductRepository.create(data)

    @staticmethod
    def update_product(product, data):
        return ProductRepository.update(product, data)

    @staticmethod
    def delete_product(product):
        ProductRepository.delete(product)