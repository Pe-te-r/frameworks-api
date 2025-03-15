from flask import Flask

def register_blueprint(app: Flask):
    from .users import user_bp
    from .auth import auth_bp
    
    # Register blueprints with URL prefixes
    app.register_blueprint(auth_bp)
    app.register_blueprint(user_bp)
