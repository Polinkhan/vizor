from flask import request, jsonify
from functools import wraps
import os

def api_key_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        # Get the API key from headers
        api_key = request.headers.get('vezor-api-key')
        expected_api_key = os.getenv('API_SECRET_KEY')  # Load API secret key from environment variables

        # Check if API key is provided and valid
        if api_key is None or api_key != expected_api_key:
            return jsonify({"error": "Unauthorized access, invalid API key."}), 401
        
        return f(*args, **kwargs)
    return decorated_function
