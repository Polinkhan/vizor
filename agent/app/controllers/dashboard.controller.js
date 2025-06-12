const { run } = require("../utils/execute");
const BaseController = require("./base.controller");

class DashboardController extends BaseController {
  async getCpuUtilization() {
    try {
      const stdout = await run("top -bn1 | grep '%Cpu'");
      const line = stdout.trim();
      const match = line.match(/(\d+\.\d+)\s*id/);

      if (match) {
        const idle = parseFloat(match[1]);
        const usage = (100 - idle).toFixed(2);
        return usage;
      }

      return "Cpu usage not found";
    } catch (error) {
      return error.message;
    }
  }

  async getMemoryUsage() {
    try {
      const stdout = await run("free -m | grep 'Mem:'");
      const line = stdout.trim();
      const match = line.match(/(\d+)\s+(\d+)\s+(\d+)\s+(\d+)\s+(\d+)\s+(\d+)/);

      if (match) {
        const total = parseInt(match[1]);
        const used = parseInt(match[2]);
        const free = parseInt(match[3]);
        const shared = parseInt(match[4]);
        const buffCache = parseInt(match[5]);
        const available = parseInt(match[6]);
        return {
          total,
          used,
          free,
          shared,
          buffCache,
          available,
        };
      }
      return "Memory usage not found";
    } catch (error) {
      return error.message;
    }
  }

  async getDashboardInfo() {
    try {
      const cpuUsage = await this.getCpuUtilization();
      const memoryUsage = await this.getMemoryUsage();
      return { cpuUsage, memoryUsage };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
}

module.exports = DashboardController;
