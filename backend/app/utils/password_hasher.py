import bcrypt


class PasswordHasher:

    @staticmethod
    def hash_password(password):

        salt = bcrypt.gensalt()

        hashed_password = bcrypt.hashpw(
            password.encode('utf-8'),
            salt
        )

        return hashed_password.decode('utf-8')

    @staticmethod
    def check_password(password, hashed_password):

        return bcrypt.checkpw(
            password.encode('utf-8'),
            hashed_password.encode('utf-8')
        )