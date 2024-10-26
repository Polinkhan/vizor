import subprocess
import psutil

def get_services():
    try:
        # Use `systemctl list-units --type=service` to get detailed service information
        result = subprocess.run(
            ["systemctl", "list-units", "--type=service", "--all"],
            capture_output=True,
            text=True,
            check=True
        )

        services_info = []

        # Skip the header and iterate over each line
        for line in result.stdout.splitlines()[1:]:
            if line.strip() and '.service' in line:
                parts = line.split(None, 4)  # Split line into 5 parts max
                service_name = parts[0]
                load = parts[1]
                active = parts[2]
                sub = parts[3]
                description = parts[4] if len(parts) > 4 else "No description"

                # Fetch PID using systemctl show
                pid_result = subprocess.run(
                    ["systemctl", "show", service_name, "--property=MainPID"],
                    capture_output=True,
                    text=True
                )
                pid_line = pid_result.stdout.strip()
                pid = pid_line.split('=')[1] if '=' in pid_line and pid_line.split('=')[1] != "0" else "--"

                # Initialize memory and CPU info
                memory_usage = {"rss": "--", "vms": "--"}
                cpu_usage = "--"

                # If the PID is valid, fetch memory and CPU usage
                if pid.isdigit():
                    try:
                        process = psutil.Process(int(pid))
                        memory_info = process.memory_info()
                        cpu_usage = int(process.cpu_percent(interval=0))  # Get current CPU usage
                        memory_usage = {
                            "rss": memory_info.rss / (1024 * 1024),  # Convert RSS to MB
                            "vms": memory_info.vms / (1024 * 1024)   # Convert VMS to MB
                        }
                    except psutil.NoSuchProcess:
                        memory_usage = {"rss": "No PID found", "vms": "No PID found"}

                # Append the service details along with memory and CPU info
                services_info.append({
                    "service_name": service_name,
                    "pid": pid,
                    "load": load,
                    "active": active,
                    "sub": sub,
                    "description": description,
                    **memory_usage,  # Unpack memory info into the dictionary
                    "cpu_usage": cpu_usage  # Add CPU usage
                })

        return services_info

    except subprocess.CalledProcessError as e:
        print("Error while fetching service details:", e)
        return []