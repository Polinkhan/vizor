from flask import Flask
from .socket import init_socketio

def init_routes(app: Flask):
    # Initialize socket routes only
    socketio = init_socketio(app)
    return socketio
