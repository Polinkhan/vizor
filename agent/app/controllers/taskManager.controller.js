const { run } = require("../utils/execute");
const BaseController = require("./base.controller");

class TaskManagerController extends BaseController {
  async getCpuUtilization() {
    try {
      // Get CPU utilization
      const usageStdout = await run("top -bn1 | grep '%Cpu'");
      const usageLine = usageStdout.trim();
      const usageMatch = usageLine.match(/(\d+\.\d+)\s*id/);

      // Get CPU clock speed
      const speedStdout = await run("cat /proc/cpuinfo | grep 'MHz'");
      const speedLine = speedStdout.split("\n")[0].trim();
      const speedMatch = speedLine.match(/(\d+\.\d+)/);

      // Get number of processes and threads
      const processStdout = await run("ps aux | wc -l");
      const processes = parseInt(processStdout.trim()) - 1; // Subtract header line

      const threadStdout = await run("ps -eLf | wc -l");
      const threads = parseInt(threadStdout.trim()) - 1; // Subtract header line

      if (usageMatch && speedMatch) {
        const idle = parseFloat(usageMatch[1]);
        const usage = (100 - idle).toFixed(2);
        const clockSpeed = parseFloat(speedMatch[1]).toFixed(0);

        return {
          usage,
          clockSpeed,
          processes,
          threads,
        };
      }

      return "CPU information not found";
    } catch (error) {
      return error.message;
    }
  }

  async getCpuDetails() {
    try {
      // Only use lscpu for all information
      const lscpu = await run("lscpu");

      // max and min clock speed
      const maxMatch = lscpu.match(/CPU max MHz:\s+([\d.]+)/);
      const minMatch = lscpu.match(/CPU min MHz:\s+([\d.]+)/);
      const cpuMaxMHz = maxMatch ? parseFloat(maxMatch[1]) : null;
      const cpuMinMHz = minMatch ? parseFloat(minMatch[1]) : null;

      // physical cores
      const coreMatch = lscpu.match(/Core\(s\) per socket:\s+(\d+)/);
      const socketMatch = lscpu.match(/Socket\(s\):\s+(\d+)/);
      let totalCores = null;
      if (coreMatch && socketMatch) {
        totalCores = parseInt(coreMatch[1]) * parseInt(socketMatch[1]);
      }

      // logical cores
      const threadMatch = lscpu.match(/CPU\(s\):\s+(\d+)/);
      const totalThreads = threadMatch ? parseInt(threadMatch[1]) : null;

      // virtualization (extracts the value, e.g., "AMD-V" or "VT-x")
      const virtualizationMatch = lscpu.match(/Virtualization:\s+([^\n]+)/);
      const virtualization = virtualizationMatch ? virtualizationMatch[1].trim() : null;

      // cache sizes (e.g., "L1d cache: 192 KiB", "L2 cache: 3 MiB")
      function stripBracket(str) {
        if (!str) return null;
        // Remove anything in brackets and trim
        return str.replace(/\s*\(.*?\)/, "").trim();
      }

      const l1dMatch = lscpu.match(/L1d cache:\s+([^\n]+)/i);
      const l1iMatch = lscpu.match(/L1i cache:\s+([^\n]+)/i);
      const l2Match = lscpu.match(/L2 cache:\s+([^\n]+)/i);
      const l3Match = lscpu.match(/L3 cache:\s+([^\n]+)/i);

      const l1dCache = l1dMatch ? stripBracket(l1dMatch[1]) : null;
      const l1iCache = l1iMatch ? stripBracket(l1iMatch[1]) : null;
      const l1Cache = l1dCache || l1iCache;
      const l2Cache = l2Match ? stripBracket(l2Match[1]) : null;
      const l3Cache = l3Match ? stripBracket(l3Match[1]) : null;

      return {
        cpuMaxMHz,
        cpuMinMHz,
        totalCores,
        totalThreads,
        virtualization,
        l1Cache,
        l2Cache,
        l3Cache,
      };
    } catch (error) {
      return { error: error.message };
    }
  }

  async getMemoryUtilization() {
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
}

module.exports = TaskManagerController;
