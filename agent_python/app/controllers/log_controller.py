import subprocess
from app.utils.common import highlight_search_term

def get_log_lines(data):
    lines = data.get("log_lines", 10)
    log_format = data.get("log_format", 10)
    log_file_path = data.get("log_file_path")
    filter_keyword = data.get("log_filter_keyword")

    if not log_file_path:
        return []

    if filter_keyword:
        command = f"tail -n {lines} {log_file_path} | grep -i {filter_keyword}"
    else:
        command = f"tail -n {lines} {log_file_path}"

    try:
        result = subprocess.run(command, shell=True, check=True, stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True)
        log_lines = result.stdout.strip().split('\n')

        log_entries = []
        for line in log_lines:
            if filter_keyword:
                highlighted_line = highlight_search_term(line, filter_keyword)
                log_entries.append({"log": highlighted_line})
            else:
                log_entries.append({"log": line})
        
        return log_entries
    except subprocess.CalledProcessError as e:
        raise Exception(f"Error collecting logs: {e.stderr}")
