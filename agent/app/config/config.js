const fs = require("fs");
const yaml = require("js-yaml");
const { CONFIG_PATH, DEFAULT_CONFIG } = require("./default");

const EVENTS = {
  SERVICE: "services",
  UPDATE_SERVICE: "update_service",
  FILES: "files",
  FILE_CONTENT: "file_content",
  DASHBOARD: "dashboard",
  PORT_LIST: "port_list",
  CPU_DETAILS: "cpu_details",
  CPU_UTILIZATION: "cpu_utilization",
  MEMORY_UTILIZATION: "memory_utilization",
  INSTALL_NET_TOOLS: "install_net_tools",
};

const getConfig = async () => {
  const config = yaml.load(fs.readFileSync(CONFIG_PATH, "utf8"));
  return {
    server: {
      port: config?.server?.port || DEFAULT_CONFIG.server.port,
      host: config?.server?.host || DEFAULT_CONFIG.server.host,
    },
    log: {
      level: config?.log?.level || DEFAULT_CONFIG.log.level,
      file: config?.log?.file || DEFAULT_CONFIG.log.file,
    },
  };
};

module.exports = { EVENTS, getConfig };
