import subprocess
from flask import jsonify, request
from app.utils.sevices import get_services
from app.middlewares.rest_middleware import api_key_required

@api_key_required
def get_all_services():
    return jsonify(get_services())


@api_key_required
def upate_service():
    data = request.get_json()

    action = data.get("action")
    service_name = data.get("name")

    try:
        # Execute the systemctl command with the specified action and service name
        result = subprocess.run(
            ["systemctl", action, service_name],
            capture_output=True,
            text=True,
            check=True
        )
        return jsonify({
            "service": service_name,
            "action": action,
            "status": 200,
            "output": result.stdout.strip()
        })

    except subprocess.CalledProcessError as e:
        return jsonify({
            "service": service_name,
            "action": action,
            "status": 403,
            "message": e.stderr.strip()
        }), 500