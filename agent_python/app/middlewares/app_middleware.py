from app.utils.config import load_config_from_yaml

def use_config(app):
    # =========================
    # Load config from YAML
    # =========================
    config = load_config_from_yaml()

    # =========================
    # Basic app settings
    # =========================
    app.config['HOSTS'] = config.get('hosts', [])
    app.config['PORT'] = config.get('port', 5000)
    app.config['DEBUG'] = config.get('debug', False)

    # ===================================
    # Optional: Logging configuration
    # ===================================
    app.config['LOGGING_LEVEL'] = config['logging'].get('level', 'INFO')
    app.config['LOGGING_FILE'] = config['logging'].get('file', '/var/log/vezor.log')