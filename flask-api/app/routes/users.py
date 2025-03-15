from flask_restx import Resource
from .schema.user_schema import user_ns




@user_ns.route('/')
class Users(Resource):
    def get(self):
        pass
