import re

def get_cpu_brand(file):
    try:
        for line in file:
            if "model name" in line:
                return re.sub(".*model name.*: ", "", line.strip())
    except FileNotFoundError:
        return "CPU info not available on this system."
    

