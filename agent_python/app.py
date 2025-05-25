from flask import Flask
from app.middlewares.app_middleware import use_config
from app.routes import init_routes
from gevent import monkey
monkey.patch_all()

def create_app():
    app = Flask(__name__)
    use_config(app)
    socketio = init_routes(app)
    return app, socketio

if __name__ == '__main__':
    app, socketio = create_app()
    socketio.run(app,
                host=app.config['HOSTS'][0],
                port=app.config['PORT'],
                debug=app.config['DEBUG'],
                allow_unsafe_werkzeug=True)