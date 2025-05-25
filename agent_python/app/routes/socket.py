from flask_socketio import SocketIO, emit
from app.utils.sevices import get_services
from app.utils.config import load_config_from_yaml
from app.middlewares.socket_middleware import authenticated_only, handle_socket_errors
from app.controllers.log_controller import get_log_lines
from app.controllers.service_controller import update_service_status
from flask_cors import CORS

# Initialize SocketIO with proper configuration
socketio = SocketIO(cors_allowed_origins="*", async_mode='gevent')

@socketio.on('connect', namespace='/')
def handle_connect():
    print('\n\nClient connected\n\n')
    emit('connection_response', {'status': 'connected'}, namespace='/')

@socketio.on('disconnect', namespace='/')
def handle_disconnect():
    print('\n\nClient disconnected\n\n')

@socketio.on('check_authority', namespace='/')
@handle_socket_errors
def handle_check_authority(data):
    try:
        config = load_config_from_yaml()
        app_secret = data.get('app_secret')
        
        if app_secret != config['security']['app_secret']:
            emit('authority_response', {'status': 'error', 'message': 'Unauthorized'}, namespace='/')
            return
            
        emit('authority_response', {'status': 'success', 'message': 'Authorized'}, namespace='/')
    except Exception as e:
        emit('authority_response', {'status': 'error', 'message': str(e)}, namespace='/')

@socketio.on('get_services', namespace='/')
@handle_socket_errors
def handle_get_services():
    try:
        print('\n\nFetching services data\n\n')
        services = get_services()
        emit('get_services_status', {'services': services, 'status': 'success'}, namespace='/')
    except Exception as e:
        print(f"Error in get_services: {str(e)}")
        emit('get_services_status', {'error': str(e), 'status': 'error'}, namespace='/')

@socketio.on('update_service', namespace='/')
@handle_socket_errors
def handle_update_service(data):
    try:
        result = update_service_status(data)
        emit('service_update_response', {'status': 'success', **result}, namespace='/')
    except Exception as e:
        emit('service_update_response', {'status': 'error', 'message': str(e)}, namespace='/')

@socketio.on('get_logs', namespace='/')
@handle_socket_errors
def handle_get_logs(data):
    try:
        logs = get_log_lines(data)
        emit('logs_data', {'status': 'success', 'logs': logs}, namespace='/')
    except Exception as e:
        emit('logs_data', {'status': 'error', 'message': str(e)}, namespace='/')

@socketio.on_error_default
def default_error_handler(e):
    print(f'SocketIO error: {str(e)}')
    return {'error': str(e)}

def init_socketio(app):
    CORS(app, resources={r"/*": {"origins": "*"}})
    socketio.init_app(app,
                     cors_allowed_origins="*",
                     async_mode='gevent',
                     async_handlers=True,
                     ping_timeout=60,
                     ping_interval=25,
                     max_http_buffer_size=1024 * 1024,
                     engineio_logger=True)
    return socketio