import subprocess
from flask import jsonify, request
from app.middlewares.rest_middleware import api_key_required

@api_key_required
def get_log_data():
    data = request.get_json()

    lines = data.get("lines") or 10
    log_file_path = data.get("file_path")
    filter_keyword = data.get("filter_keyword")

    if log_file_path == '':
        return []

    if filter_keyword:
        # Use tail with grep for filtering
        command = f"tail -n {lines} {log_file_path} | grep {filter_keyword}"
    else:
        # Only tail command if no filter is needed
        command = f"tail -n {lines} {log_file_path}"

    try:
        result = subprocess.run(command, shell=True, check=True, stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True)
        log_lines = result.stdout.strip().split('\n')

        # Convert log lines to a list of dictionaries (array of objects)
        log_entries = []
        for line in log_lines:
            if filter_keyword:
                # Wrap the filter_keyword with <mark> tag
                highlighted_line = line.replace(filter_keyword, f"<mark>{filter_keyword}</mark>")
                log_entries.append({"log": highlighted_line})
            else:
                log_entries.append({"log": line})
        
        return log_entries
    except subprocess.CalledProcessError as e:
        print(f"Error collecting logs: {e.stderr}")
        return []
