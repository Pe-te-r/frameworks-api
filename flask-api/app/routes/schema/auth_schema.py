from flask_restx import Namespace,fields

auth_ns=Namespace('auth',description='auth operations')

register_data=auth_ns.model(
    'register',
    {
    'first_name':fields.String(required=True,description='user first name'),
    'last_name':fields.String(required=True,description='user last name'),
    'email':fields.String(required=True,description='user email'),
    'password':fields.String(required=True,description='user email'),
    'role':fields.String(default='user',description='user role')
    }
)

user_output = auth_ns.model(
    "UserOutput",
    {

    'first_name':fields.String(required=True,description='user first name'),
    'last_name':fields.String(required=True,description='user last name'),
        "email": fields.String(description="User's email"),
    },
)

login_data=auth_ns.model('login',{
     'email':fields.String(required=True,description='user email'),
    'password':fields.String(required=True,description='user email'),
    
})