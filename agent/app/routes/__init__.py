from flask import Flask
from app.controllers.log_controller import get_log_data
from app.controllers.service_controller import get_all_services, upate_service

def init_routes(app: Flask):
    # Services
    app.add_url_rule('/api/service', view_func=get_all_services, methods=['GET'])
    app.add_url_rule('/api/update_service', view_func=upate_service, methods=['POST'])

    # Logs
    app.add_url_rule('/api/get_log', view_func=get_log_data, methods=['POST'])