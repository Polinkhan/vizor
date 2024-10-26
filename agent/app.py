from flask import Flask
from app.routes import init_routes
from app.middlewares.app_middleware import use_config

def create_app():
    app = Flask(__name__)

    # Apply middleware
    use_config(app)

    # Initialize routes
    init_routes(app)

    return app

app = create_app()

if __name__ == '__main__':
    app.run(host=app.config['HOSTS'][0], port=app.config['PORT'], debug=app.config['DEBUG'])