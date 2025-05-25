const pidusage = require("pidusage");
const { run } = require("../utils/execute");
const BaseController = require("./base.controller");

class ServiceController extends BaseController {
  async getAllServices() {
    const services = await run("systemctl list-units --type=service --all");
    const services_lines = services.split("\n").slice(1);

    const response = [];

    for (const line of services_lines) {
      const trimmed = line.trim();
      if (trimmed && trimmed.includes(".service")) {
        // Split into at most 5 parts by whitespace
        const parts = trimmed.split(/\s+/, 5);
        const [service_name, load, active, sub, description = "No description"] = parts;

        if (service_name === "●") continue;

        const pid_result = await run("systemctl show " + service_name + " --property=MainPID");
        const pid_trim = pid_result.split("=")[1].trim();
        const pid = pid_trim === "0" ? null : pid_trim;

        let cpu_usage = null;
        let memory_usage = null;

        if (pid) {
          const stats = await pidusage(pid);
          cpu_usage = stats.cpu;
          memory_usage = stats.memory;
        }

        response.push({
          service_name,
          load,
          active,
          sub,
          pid,
          cpu_usage,
          memory_usage,
          description,
        });
      }
    }

    return response;
  }

  async update_service(action, service_name) {
    if (!["start", "stop", "restart", "reload"].includes(action)) {
      throw new Error("Invalid action. Use start, stop, restart, or reload.");
    }
    const data = await run(`systemctl ${action} ${service_name}`);
    console.log(data);

    try {
    } catch (error) {}
  }
}

module.exports = ServiceController;
