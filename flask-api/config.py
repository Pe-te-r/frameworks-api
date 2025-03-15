import os
import dotenv

dotenv.load_dotenv()


class Config:
    """Base configuration class."""
    SECRET_KEY = os.getenv('SECRET_KEY', 'your_default_secret_key')
    SQLALCHEMY_DATABASE_URI = os.getenv('DATABASE_URL')
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    DEBUG = True  # Development mode enabled
    TESTING = False

    # Mail Configuration (if needed)
    MAIL_SERVER = os.getenv('MAIL_SERVER', 'smtp.example.com')
    MAIL_PORT = int(os.getenv('MAIL_PORT', 587))
    MAIL_USE_TLS = os.getenv('MAIL_USE_TLS', 'true').lower() in ['true', '1']
    MAIL_USERNAME = os.getenv('MAIL_USERNAME', 'your_email@example.com')
    MAIL_PASSWORD = os.getenv('MAIL_PASSWORD', 'your_password')

    # JWT Configuration
    JWT_SECRET_KEY = os.getenv('JWT_SECRET_KEY', 'your_jwt_secret')

