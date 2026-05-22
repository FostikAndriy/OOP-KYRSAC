from repositories.user_repository import UserRepository

from utils.password_hasher import PasswordHasher
from utils.jwt_manager import JWTManager


class AuthService:

    @staticmethod
    def register(data):

        existing_user = UserRepository.get_by_email(
            data['email']
        )

        if existing_user:
            return None

        data['password'] = PasswordHasher.hash_password(
            data['password']
        )

        return UserRepository.create(data)

    @staticmethod
    def login(data):

        user = UserRepository.get_by_email(
            data['email']
        )

        if not user:
            return None

        is_correct = PasswordHasher.check_password(
            data['password'],
            user.password
        )

        if not is_correct:
            return None

        token = JWTManager.generate_token(user)

        return {
            'token': token,
            'user': {
                'id': user.id,
                'email': user.email,
                'role': user.role
            }
        }