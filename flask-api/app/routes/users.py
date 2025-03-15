from flask_restx import Api,Resource
from flask import Blueprint

user_bp = Blueprint('user',__name__,url_prefix='/users')
api = Api(user_bp,doc='/users')


user_ns=api.namespace('users',description='users operations')


user_ns.route('/')
class Users(Resource):
    def get(self):
        pass