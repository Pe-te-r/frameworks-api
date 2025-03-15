from flask import Blueprint
from flask_restx import Api,Resource
from .schema.auth_schema import auth_ns,register_data,login_data
from app.util import response,validate_required_fields

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
            
            return response(status="success", message="User registered successfully", data=valid_data,status_code=201)
        except Exception as e:
            return response("error", "An error occurred", data=None, error={"detail": str(e)}, status_code=400)

@auth_ns.route('/login')
class Login(Resource):
    @auth_ns.expect(login_data)
    # @auth_ns.marshal()
    def post(self):
        data=auth_ns.payload
        return response(data)
 
api.add_namespace(auth_ns)