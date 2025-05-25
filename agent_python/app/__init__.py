from flask import Flask
from app.middlewares.app_middleware import use_config
from app.routes import init_routes

def create_app():
    app = Flask(__name__)
    
    # Apply middleware and config
    use_config(app)
    
    # Initialize socketio
    socketio = init_routes(app)
    
    return app, socketio