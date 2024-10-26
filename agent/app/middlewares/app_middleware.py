
from flask_cors import CORS
from flask_wtf.csrf import CSRFProtect
from app.utils.config import load_config_from_yaml

def use_config(app):
    # Get config from YAML
    config = load_config_from_yaml()

    # Apply secret_key
    app.config['SECRET_KEY'] = config['security']['secret_key']

    # Apply CSRF protection
    if config['security']['csrf_enabled']:
        csrf = CSRFProtect(app)
        csrf.init_app(app)

    # Apply CORS
    allowed_origins = config['cors']['allowed_origins']
    CORS(app, resources={r"/*": {"origins": allowed_origins}})

    # Additional settings
    app.config['HOSTS'] = config.get('hosts', [])
    app.config['PORT'] = config.get('port', 5000)
    app.config['DEBUG'] = config.get('debug', False)

    # Optional: Logging configuration
    app.config['LOGGING_LEVEL'] = config['logging'].get('level', 'INFO')
    app.config['LOGGING_FILE'] = config['logging'].get('file', '/var/log/vezor.log')