from flask import Flask
from flask_migrate import Migrate
from config import Config
from app.db import db,bcrypt

def create_app():
    app=Flask(__name__)
    
    app.config.from_object(Config)
    bcrypt.init_app(app)
    db.init_app(app)
    Migrate(app,db)
    
    from .routes import register_blueprint
    register_blueprint(app)
    
    return app