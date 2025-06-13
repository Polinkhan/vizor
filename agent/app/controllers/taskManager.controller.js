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
      // Get both Mem and Swap lines
      const stdout = await run("free -m | grep -E 'Mem:|Swap:'");
      const lines = stdout.trim().split("\n");

      // Parse Mem line
      const memLine = lines.find((line) => line.startsWith("Mem:"));
      const memMatch = memLine ? memLine.match(/(\d+)\s+(\d+)\s+(\d+)\s+(\d+)\s+(\d+)\s+(\d+)/) : null;

      // Parse Swap line
      const swapLine = lines.find((line) => line.startsWith("Swap:"));
      const swapMatch = swapLine ? swapLine.match(/(\d+)\s+(\d+)\s+(\d+)/) : null;

      let memResult = {};
      if (memMatch) {
        memResult = {
          total: parseInt(memMatch[1]),
          used: parseInt(memMatch[2]),
          free: parseInt(memMatch[3]),
          shared: parseInt(memMatch[4]),
          buffCache: parseInt(memMatch[5]),
          available: parseInt(memMatch[6]),
        };
      }

      let swapResult = {};
      if (swapMatch) {
        swapResult = {
          swapTotal: parseInt(swapMatch[1]),
          swapUsed: parseInt(swapMatch[2]),
          swapFree: parseInt(swapMatch[3]),
        };
      }

      if (Object.keys(memResult).length > 0) {
        return {
          ...memResult,
          ...swapResult,
        };
      }
      return "Memory usage not found";
    } catch (error) {
      return error.message;
    }
  }

  // This implementation calculates download (rx) and upload (tx) speed in bytes/sec for each interface.
  // It stores previous stats in memory for speed calculation.
  // Note: This will only work correctly if the same instance is used for repeated calls.

  // Store previous stats and timestamps in a static property
  static _prevNetworkStats = {};

  async getNetworkUsage() {
    try {
      // Read /proc/net/dev for network statistics
      const stdout = await run("cat /proc/net/dev");
      const lines = stdout.trim().split("\n");

      // /proc/net/dev format:
      // Inter-|   Receive                                                |  Transmit
      //  face |bytes    packets errs drop fifo frame compressed multicast|bytes    packets errs drop fifo colls carrier compressed
      //   eth0:  1234567  ...   ...   ...   ...   ...   ...   ...         7654321  ...   ...   ...   ...   ...   ...   ...
      const interfaces = [];
      for (let i = 2; i < lines.length; i++) {
        // skip headers
        const line = lines[i].trim();
        if (!line) continue;
        // Split by colon to separate interface name from stats
        const [ifacePart, statsPart] = line.split(":");
        if (!ifacePart || !statsPart) continue;
        const iface = ifacePart.trim();
        const stats = statsPart.trim().split(/\s+/);
        if (stats.length < 16) continue; // Should have at least 16 columns

        // RX bytes is stats[0], TX bytes is stats[8]
        const rx = parseInt(stats[0]);
        const tx = parseInt(stats[8]);
        interfaces.push({ interface: iface, rx, tx });
      }

      // Calculate speeds
      const now = Date.now();
      const result = [];
      for (const iface of interfaces) {
        const prev = TaskManagerController._prevNetworkStats[iface.interface];
        let downloadSpeed = null;
        let uploadSpeed = null;
        if (prev && prev.rx !== null && prev.tx !== null) {
          const timeDiff = (now - prev.timestamp) / 1000; // seconds
          if (timeDiff > 0) {
            downloadSpeed = (iface.rx - prev.rx) / timeDiff;
            uploadSpeed = (iface.tx - prev.tx) / timeDiff;
            // Prevent negative speeds (e.g., counter reset)
            if (downloadSpeed < 0) downloadSpeed = 0;
            if (uploadSpeed < 0) uploadSpeed = 0;
          }
        }
        // Save current stats for next call
        TaskManagerController._prevNetworkStats[iface.interface] = {
          rx: iface.rx,
          tx: iface.tx,
          timestamp: now,
        };

        if (iface.interface === "lo") continue;
        if (iface.rx === 0 && iface.tx === 0) continue;

        result.push({
          interface: iface.interface,
          rx: iface.rx,
          tx: iface.tx,
          downloadSpeed: downloadSpeed !== null ? downloadSpeed : 0, // bytes/sec
          uploadSpeed: uploadSpeed !== null ? uploadSpeed : 0, // bytes/sec
        });
      }

      return result;
    } catch (error) {
      return error.message;
    }
  }
}

module.exports = TaskManagerController;
