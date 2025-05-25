import os
import yaml
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()


def load_config_from_yaml(file_path = os.getenv('CONFIG_PATH')):
    with open(file_path, 'r') as file:
        config = yaml.safe_load(file)
    return config

def load_app_config(file_path = os.getenv('CONFIG_PATH')):
    with open(file_path, 'r') as file:
        config = yaml.safe_load(file)

    # Access individual keys, with defaults if they aren't found
    host = config.get('host', '127.0.0.1')
    port = config.get('port', 5000)
    debug = config.get('debug', False)
    
    return host, port, debug