import jwt
import datetime


SECRET_KEY = 'SUPER_SECRET_KEY'


class JWTManager:

    @staticmethod
    def generate_token(user):

        payload = {
            'id': user.id,
            'email': user.email,
            'role': user.role,
            'exp': datetime.datetime.utcnow() + datetime.timedelta(hours=12)
        }

        token = jwt.encode(
            payload,
            SECRET_KEY,
            algorithm='HS256'
        )

        return token