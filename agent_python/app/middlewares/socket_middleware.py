from functools import wraps
from flask_socketio import disconnect

def authenticated_only(f):
    @wraps(f)
    def wrapped(*args, **kwargs):
        if not hasattr(f, 'authenticated') or not f.authenticated:
            return disconnect()
        return f(*args, **kwargs)
    return wrapped

def handle_socket_errors(f):
    @wraps(f)
    def wrapped(*args, **kwargs):
        try:
            return f(*args, **kwargs)
        except Exception as e:
            print(f"Socket error: {str(e)}")
            return {'error': str(e)}
    return wrapped