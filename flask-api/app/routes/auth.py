from flask import Blueprint
from flask_restx import Api,Resource
from .schema.auth_schema import auth_ns,register_data,login_data
from app.util import response,validate_required_fields
from app.db import User


auth_bp = Blueprint('auth',__name__)
api=Api(auth_bp,doc='/docs')


@auth_ns.route('/register')
class Register(Resource):
    @auth_ns.expect(register_data)    
    def post(self):
        try:
            data = auth_ns.payload
            is_valid,missing_field,valid_data = validate_required_fields(data,register_data)
            if not is_valid:
                return response(status='error',message='Missing fields required',error={'missing fields':missing_field},status_code=400)
            user_exits=User.user_by_email(valid_data['email'])
            if user_exits:
                return response(status='error',message='email already exits',status_code=400)
            print(valid_data)
            result=User.create_user(valid_data)
            if result:
                return response(status="success", message="User registered successfully", data=valid_data,status_code=201)
            return response(status='error',message='error while creating user',status_code=500)
        except Exception as e:
            return response("error", "An error occurred", data=None, error={"detail": str(e)}, status_code=400)

@auth_ns.route('/login')
class Login(Resource):
    @auth_ns.expect(login_data)
    def post(self):
        data=auth_ns.payload
        is_valid,missing_field,valid_field =validate_required_fields(data,login_data)
        if not is_valid:
            return response(status='error',message='Missing field required',error={'Missing Field':missing_field},status_code=400)
        user_exits = User.user_by_email(valid_field['email'])
        if not user_exits:
            return response(status='error',message='User not found')
        if user_exits.verify_password(valid_field['password']):
            return response(status='success',message='Login was success',data=data)
        return response(status='error',message='Login error',error={'message':'password not correct'},status_code=400)
 
api.add_namespace(auth_ns)