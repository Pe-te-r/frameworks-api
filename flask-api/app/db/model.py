from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
from datetime import timedelta
from flask_jwt_extended import create_access_token

db=SQLAlchemy()
bcrypt=Bcrypt()

class User(db.Model):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True,autoincrement=True)
    first_name = db.Column(db.String(50), nullable=False)
    last_name = db.Column(db.String(50), nullable=False)
    email = db.Column(db.String(100), unique=True, nullable=False)
    role=db.Column(db.String(10),default='user')

    # Relationships
    password = db.relationship("Password", back_populates="user", uselist=False, cascade="all, delete")
    notes = db.relationship("Notes", back_populates="user", cascade="all, delete")
    def to_json(self):
        return {
            'id':self.id,
            'email':self.email,
            'role':self.role
        }
    @classmethod
    def create_user(cls,user):
        try:
            new_user=cls(first_name=user['first_name'],last_name=user['last_name'],email=user['email'])
            db.session.add(new_user)
            db.session.flush()
            saving_password=Password(id=new_user.id,hashed_password=Password.hash_password(user['password']))
            db.session.add(saving_password)
            db.session.commit()
            return new_user
        except Exception as e:
            db.session.rollback()
            print(f"Error creating user: {str(e)}")
            return False
    
    @classmethod
    def user_by_email(cls,email):
        return cls.query.filter(cls.email==email).first()
    
    def verify_password(self,password):
        return Password.verify_password(self.password.hashed_password,password)

    def generate_token(self,days=1):
        """
        Generates JWT Token based on user ID, email, and role.
        """
        token_payload = {
            "id": self.id,
            "email": self.email,
            "role": self.role
        }
        return create_access_token(identity=token_payload, expires_delta=timedelta(days=days))
class Password(db.Model):
    __tablename__ = 'passwords'

    id = db.Column(db.Integer, db.ForeignKey('users.id'), primary_key=True)
    hashed_password = db.Column(db.String(255), nullable=False)

    # Relationship
    user = db.relationship("User", back_populates="password")
    
    @staticmethod
    def hash_password(password: str) -> str:

        return bcrypt.generate_password_hash(password).decode('utf-8')
    
    @staticmethod
    def verify_password(hashed_password: str, password: str) -> bool:
        return bcrypt.check_password_hash(hashed_password, password)
    
class Notes(db.Model):
    __tablename__ = 'notes'

    id = db.Column(db.Integer, primary_key=True,autoincrement=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    title = db.Column(db.String(100), nullable=False)
    content = db.Column(db.Text, nullable=False)

    # Relationship
    user = db.relationship("User", back_populates="notes")
