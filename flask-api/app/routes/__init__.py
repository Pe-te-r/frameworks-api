from flask import Flask
from flask_restx import Api

def register_blueprint(app: Flask):
    from .users import user_ns
    from .auth import auth_ns
    api=Api(app,doc='/docs')
    # Register blueprints with URL prefixes
    api.add_namespace(auth_ns)
    api.add_namespace(user_ns)
