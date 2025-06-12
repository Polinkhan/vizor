const { run } = require("../utils/execute");
const BaseController = require("./base.controller");

class NetworkController extends BaseController {
  async getPortList() {
    try {
      const stdout = await run("sudo netstat -tulpen");

      const lines = stdout.trim().split("\n");
      const headers = lines[1].trim().split(/\s+/);
      const result = [];

      for (let i = 2; i < lines.length; i++) {
        const parts = lines[i].trim().split(/\s+/);
        if (parts.length < 7) continue;

        const protocol = parts[0];
        const localAddress = parts[3];
        const host = localAddress.split(":")[0];
        const port = localAddress.split(":").pop();
        const pid = parts[7]?.split("/")[0] || parts[8]?.split("/")[0];
        const program = parts[7]?.split("/")[1]?.split(":")?.[0] || parts[8]?.split("/")[1]?.split(":")?.[0];

        result.push({
          pid: pid || "--",
          host: host || "--",
          port: port || "--",
          program: program || "--",
          protocol: protocol || "--",
        });
      }

      return result;
    } catch (error) {
      if (error?.includes("command not found")) {
        return {
          success: false,
          error_code: "net-tools_not_installed",
        };
      }
      return { success: false, error: error.message };
    }
  }

  async installNetTools() {
    try {
      const stdout = await run("apt install -y net-tools");
      return { success: true, stdout };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
}

module.exports = NetworkController;
