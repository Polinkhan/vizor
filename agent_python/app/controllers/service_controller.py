import subprocess
from app.utils.sevices import get_services
from app.utils.config import load_config_from_yaml

def update_service_status(data):
    action = data.get("action")
    service_name = data.get("name")

    config = load_config_from_yaml()
    sudoEnabled = config['sudo']['enabled']
    sudoPassword = config['sudo']['password']

    try:
        if sudoEnabled:
            result = subprocess.run(
                ["sudo", "-S", "systemctl", action, service_name],
                input=sudoPassword + "\n",
                text=True,
                capture_output=True
            )
        else:
            result = subprocess.run(
                ["systemctl", action, service_name],
                capture_output=True,
                text=True,
                check=True
            )

        return {
            "service": service_name,
            "action": action,
            "status": 200,
            "output": result.stdout.strip()
        }

    except subprocess.CalledProcessError as e:
        raise Exception(e.stderr.strip())